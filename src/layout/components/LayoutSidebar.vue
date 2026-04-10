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
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：LayoutLogo <- src/layout/components/LayoutLogo.vue；LayoutMenu <- src/layout/components/LayoutMenu.vue
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/modes/LeftLayout.vue、src/layout/modes/MixLayout.vue、src/layout/modes/TopLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
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
