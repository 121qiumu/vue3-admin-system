<template>
  <main class="layout-main">
    <div class="layout-main__inner">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup>
// 主内容区组件。
// 后续如果要接入 KeepAlive、页面缓存、页面级过渡动画等能力，
// 通常都会继续在这个位置扩展。
</script>

<style scoped lang="less">
.layout-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: var(--app-layout-content-padding);
  overflow: auto;
}

.layout-main__inner {
  min-height: calc(
    100vh - var(--app-layout-header-height) - var(--app-layout-tags-view-height) -
      var(--app-layout-content-padding) * 2
  );
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity var(--app-transition-duration) var(--app-transition-timing),
    transform var(--app-transition-duration) var(--app-transition-timing);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
