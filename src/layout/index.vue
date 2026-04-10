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
    <!--
      这里使用的是 Vue 的动态组件语法。
      currentLayoutComponent 最终会是 LeftLayout / TopLayout / MixLayout 中的某一个组件，
      所以整个后台壳子的长相会随着布局模式切换而变化。
    -->
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
// 学习注释：
// 1. 文件角色：这是后台整体布局壳组件，会根据当前布局模式决定渲染左侧布局、顶部布局还是混合布局。
// 2. 所在分层：布局壳层，负责后台整体骨架结构。
// 3. 当前组件主要依赖：useLayout、useLayoutMenu、当前路由、三种布局模式组件。
// 4. 对外暴露方式：当前文件会作为 Layout 容器被路由系统懒加载使用。
// 5. 常见上游调用方：src/router/helper.js 里的 Layout 懒加载函数、静态路由与动态路由模块。
// 6. 阅读建议：先看 template 里传给具体布局模式组件的 props，再看这些 props 分别来自哪些 hook。
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
