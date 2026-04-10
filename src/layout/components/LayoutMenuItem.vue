<template>
  <el-sub-menu v-if="hasChildren" :index="menu.path">
    <template #title>
      <div class="layout-menu-item__title">
        <AppIcon
          v-if="menu.meta?.icon"
          :name="menu.meta.icon"
          :show-fallback="false"
          class="layout-menu-item__icon"
        />
        <span class="layout-menu-item__text">{{ menuTitle }}</span>
      </div>
    </template>

    <LayoutMenuItem v-for="child in menu.children" :key="child.path" :menu="child" />
  </el-sub-menu>

  <el-menu-item v-else :index="menu.path">
    <div class="layout-menu-item__title">
      <AppIcon
        v-if="menu.meta?.icon"
        :name="menu.meta.icon"
        :show-fallback="false"
        class="layout-menu-item__icon"
      />
      <span class="layout-menu-item__text">{{ menuTitle }}</span>
    </div>
  </el-menu-item>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ computed } <- vue；AppIcon <- src/components/common/AppIcon.vue；{ getMetaTitle } <- src/locales/helper.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/components/LayoutMenu.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { computed } from 'vue'

import AppIcon from '@/components/common/AppIcon.vue'
import { getMetaTitle } from '@/locales/helper'

defineOptions({
  name: 'LayoutMenuItem'
})

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const hasChildren = computed(() => {
  return Array.isArray(props.menu.children) && props.menu.children.length > 0
})

const menuTitle = computed(() => {
  return getMetaTitle(props.menu.meta, {}) || 'Unnamed Menu'
})
</script>

<style scoped lang="less">
.layout-menu-item__title {
  display: inline-flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--app-space-xs);
}

.layout-menu-item__icon {
  color: currentColor;
}

.layout-menu-item__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
