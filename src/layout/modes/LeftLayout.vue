<template>
  <div class="layout-mode layout-mode--left">
    <div
      v-if="isMobile && mobileSidebarVisible"
      class="layout-mode__mask"
      @click="$emit('close-mobile-sidebar')"
    />

    <LayoutSidebar
      :menu-list="menuList"
      :collapse="sidebarCollapsed"
      :is-mobile="isMobile"
      :mobile-visible="mobileSidebarVisible"
    />

    <section class="layout-mode__main">
      <LayoutHeader
        :sidebar-collapsed="sidebarCollapsed"
        :is-mobile="isMobile"
        @toggle-sidebar="$emit('toggle-sidebar')"
      />
      <LayoutTagsView />
      <LayoutMain />
    </section>
  </div>
</template>

<script setup>
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutMain from '../components/LayoutMain.vue'
import LayoutSidebar from '../components/LayoutSidebar.vue'
import LayoutTagsView from '../components/LayoutTagsView.vue'

defineProps({
  menuList: {
    type: Array,
    default: () => []
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
