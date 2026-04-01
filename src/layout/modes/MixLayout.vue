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
