<template>
  <div
    class="layout-shell"
    :class="[
      `layout-shell--${layoutMode}`,
      {
        'is-mobile': isMobile,
        'is-sidebar-collapse': sidebarCollapsed,
        'is-mobile-sidebar-open': mobileSidebarVisible
      }
    ]"
  >
    <component
      :is="currentLayoutComponent"
      :menu-list="menuRouteList"
      :top-menu-list="topMenuList"
      :mix-sidebar-menu-list="mixSidebarMenuList"
      :active-top-menu-path="activeTopMenuPath"
      :sidebar-collapsed="sidebarCollapsed"
      :is-mobile="isMobile"
      :mobile-sidebar-visible="mobileSidebarVisible"
      @toggle-sidebar="toggleSidebar"
      @close-mobile-sidebar="closeMobileSidebar"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { LAYOUT_MODE_ENUM } from '@/constants/layout'
import { useLayout } from '@/hooks/useLayout'
import { useLayoutMenu } from '@/hooks/useLayoutMenu'

import LeftLayout from './modes/LeftLayout.vue'
import MixLayout from './modes/MixLayout.vue'
import TopLayout from './modes/TopLayout.vue'

const {
  layoutMode,
  sidebarCollapsed,
  isMobile,
  mobileSidebarVisible,
  updateDeviceTypeByWidth,
  toggleSidebar,
  closeMobileSidebar
} = useLayout()
const { menuRouteList, topMenuList, activeTopMenuPath, mixSidebarMenuList } = useLayoutMenu()
const route = useRoute()

// 统一由 Layout 根组件决定当前到底渲染哪一种布局模式。
// 这样后续即使继续扩展第四种布局，也只需要在这里补一个映射关系。
const currentLayoutComponent = computed(() => {
  const layoutComponentMap = {
    [LAYOUT_MODE_ENUM.LEFT]: LeftLayout,
    [LAYOUT_MODE_ENUM.TOP]: TopLayout,
    [LAYOUT_MODE_ENUM.MIX]: MixLayout
  }

  return layoutComponentMap[layoutMode.value] || LeftLayout
})

function handleResize() {
  updateDeviceTypeByWidth()
}

onMounted(() => {
  updateDeviceTypeByWidth()
  window.addEventListener('resize', handleResize)
})

// 移动端点击菜单切换页面后，自动把侧边栏收起来。
watch(
  () => route.fullPath,
  () => {
    if (isMobile.value) {
      closeMobileSidebar()
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="less">
.layout-shell {
  position: relative;
  display: flex;
  min-height: 100vh;
  background-color: var(--app-color-bg-page);
}

.layout-shell.is-sidebar-collapse :deep(.layout-sidebar) {
  width: var(--app-layout-sidebar-collapse-width);
}

@media (max-width: 992px) {
  .layout-shell {
    overflow-x: hidden;
  }
}
</style>
