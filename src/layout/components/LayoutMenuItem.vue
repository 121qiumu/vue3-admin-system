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
        <span class="layout-menu-item__text">{{ menu.meta?.title || '未命名菜单' }}</span>
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
      <span class="layout-menu-item__text">{{ menu.meta?.title || '未命名菜单' }}</span>
    </div>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'

import AppIcon from '@/components/common/AppIcon.vue'

defineOptions({
  name: 'LayoutMenuItem'
})

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

// 如果有 children，就按子菜单渲染；否则按普通菜单项渲染。
const hasChildren = computed(() => {
  return Array.isArray(props.menu.children) && props.menu.children.length > 0
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
