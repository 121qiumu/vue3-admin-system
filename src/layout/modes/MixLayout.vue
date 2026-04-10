<template>
  <div class="layout-mode layout-mode--mix">
    <div
      v-if="isMobile && mobileSidebarVisible"
      class="layout-mode__mask"
      @click="$emit('close-mobile-sidebar')"
    />

    <LayoutSidebar
      :menu-list="currentSidebarMenuList"
      :collapse="sidebarCollapsed"
      :is-mobile="isMobile"
      :mobile-visible="mobileSidebarVisible"
      :show-logo="isMobile"
    />

    <section class="layout-mode__main">
      <LayoutHeader
        :sidebar-collapsed="sidebarCollapsed"
        :is-mobile="isMobile"
        :show-trigger="true"
        :show-title="false"
        :show-breadcrumb="true"
        @toggle-sidebar="$emit('toggle-sidebar')"
      >
        <template v-if="!isMobile" #brand>
          <LayoutLogo theme="header" :bordered="false" />
        </template>

        <template v-if="!isMobile" #center>
          <LayoutTopNav :menu-list="topMenuList" :active-path="activeTopMenuPath" />
        </template>
      </LayoutHeader>

      <LayoutTagsView />
      <LayoutMain />
    </section>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是某一种具体布局模式组件，负责决定头部、菜单、主内容区如何组合。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ computed } <- vue；LayoutHeader <- src/layout/components/LayoutHeader.vue；LayoutLogo <- src/layout/components/LayoutLogo.vue；LayoutMain <- src/layout/components/LayoutMain.vue；LayoutSidebar <- src/layout/components/LayoutSidebar.vue；LayoutTagsView <- src/layout/components/LayoutTagsView.vue；其余依赖 1 项
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/index.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { computed } from 'vue'

import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutLogo from '../components/LayoutLogo.vue'
import LayoutMain from '../components/LayoutMain.vue'
import LayoutSidebar from '../components/LayoutSidebar.vue'
import LayoutTagsView from '../components/LayoutTagsView.vue'
import LayoutTopNav from '../components/LayoutTopNav.vue'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  topMenuList: {
    type: Array,
    default: () => []
  },
  mixSidebarMenuList: {
    type: Array,
    default: () => []
  },
  activeTopMenuPath: {
    type: String,
    default: ''
  },
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  mobileSidebarVisible: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-sidebar', 'close-mobile-sidebar'])

// 混合布局在桌面端只显示当前一级菜单对应的二级菜单；
// 但在移动端，为了减少理解成本，直接回退到完整菜单树展示。
const currentSidebarMenuList = computed(() => {
  return props.isMobile ? props.menuList : props.mixSidebarMenuList
})
</script>

<style scoped lang="less">
.layout-mode {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.layout-mode__main {
  display: flex;
  min-width: 0;
  min-height: 100vh;
  flex: 1;
  flex-direction: column;
}

.layout-mode__mask {
  position: fixed;
  inset: 0;
  z-index: calc(var(--app-z-index-layout) - 1);
  background-color: rgba(15, 23, 42, 0.45);
}
</style>
