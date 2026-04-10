<template>
  <el-menu
    :default-active="activePath"
    mode="horizontal"
    :ellipsis="false"
    class="layout-top-nav"
    @select="handleSelect"
  >
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
      <span class="layout-top-nav__item">
        <AppIcon
          v-if="item.meta?.icon"
          :name="item.meta.icon"
          :show-fallback="false"
          class="layout-top-nav__icon"
        />
        <span class="layout-top-nav__text">{{ getMetaTitle(item.meta) || 'Unnamed Menu' }}</span>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ useRouter } <- vue-router；AppIcon <- src/components/common/AppIcon.vue；{ useLocale } <- src/hooks/useLocale.js；{ getMetaTitle } <- src/locales/helper.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/modes/MixLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { useRouter } from 'vue-router'

import AppIcon from '@/components/common/AppIcon.vue'
import { useLocale } from '@/hooks/useLocale'
import { getMetaTitle } from '@/locales/helper'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  activePath: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const { toLocalePath } = useLocale()

function handleSelect(path) {
  const targetPath = props.menuList.find((item) => item.path === path)?.path || path
  router.push(toLocalePath(targetPath))
}
</script>

<style scoped lang="less">
.layout-top-nav {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--app-color-header-text);
  --el-menu-hover-text-color: var(--app-color-primary);
  --el-menu-active-color: var(--app-color-primary);
  min-width: 0;
  border-bottom: none;
}

.layout-top-nav :deep(.el-menu-item) {
  height: calc(var(--app-layout-header-height) - 2px);
  line-height: calc(var(--app-layout-header-height) - 2px);
}

.layout-top-nav__item {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-xs);
}

.layout-top-nav__icon {
  color: currentColor;
}

.layout-top-nav__text {
  white-space: nowrap;
}
</style>
