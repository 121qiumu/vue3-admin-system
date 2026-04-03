<template>
  <aside
    class="layout-sidebar"
    :class="{
      'is-collapse': collapse,
      'is-mobile': isMobile,
      'is-mobile-open': mobileVisible
    }"
  >
    <LayoutLogo
      v-if="showLogo"
      :collapsed="collapse && !isMobile"
      :theme="logoTheme"
      :bordered="logoBordered"
    />

    <el-scrollbar class="layout-sidebar__scrollbar">
      <LayoutMenu :menu-list="menuList" :collapse="collapse && !isMobile" theme="sidebar" />
    </el-scrollbar>
  </aside>
</template>

<script setup>
import LayoutLogo from './LayoutLogo.vue'
import LayoutMenu from './LayoutMenu.vue'

defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  collapse: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  mobileVisible: {
    type: Boolean,
    default: false
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  logoTheme: {
    type: String,
    default: 'sidebar'
  },
  logoBordered: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped lang="less">
.layout-sidebar {
  display: flex;
  width: var(--app-layout-sidebar-width);
  min-height: 0;
  height: 100%;
  flex-shrink: 0;
  flex-direction: column;
  overflow: hidden;
  color: var(--app-color-sidebar-text);
  background-color: var(--app-color-sidebar-bg);
  border-right: var(--app-border-width) solid
    color-mix(in srgb, var(--app-color-sidebar-bg) 78%, #ffffff);
  transition:
    width var(--app-transition-duration) var(--app-transition-timing),
    transform var(--app-transition-duration) var(--app-transition-timing);
}

.layout-sidebar.is-collapse {
  width: var(--app-layout-sidebar-collapse-width);
}

.layout-sidebar__scrollbar {
  flex: 1;
  min-height: 0;
}

:deep(.el-menu) {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--app-color-sidebar-text);
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.08);
  --el-menu-active-color: var(--app-color-sidebar-active-text);
}

:deep(.el-menu-item.is-active),
:deep(.el-sub-menu .el-menu-item.is-active) {
  background-color: var(--app-color-sidebar-active-bg);
}

@media (max-width: 992px) {
  .layout-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--app-z-index-layout);
    width: var(--app-layout-sidebar-width);
    height: 100vh;
    transform: translateX(-100%);
  }

  .layout-sidebar.is-mobile-open {
    transform: translateX(0);
  }

  .layout-sidebar.is-collapse {
    width: var(--app-layout-sidebar-width);
  }
}
</style>
