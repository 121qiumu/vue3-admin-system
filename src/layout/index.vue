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

// Let the layout shell decide which concrete layout component should render.
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

// Close the mobile sidebar after navigation so the next page is immediately visible.
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
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: var(--app-color-bg-page);
}

.layout-shell.is-sidebar-collapse :deep(.layout-sidebar) {
  width: var(--app-layout-sidebar-collapse-width);
}

:deep(.layout-mode) {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

:deep(.layout-mode__main) {
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 992px) {
  .layout-shell {
    overflow-x: hidden;
  }
}
</style>
