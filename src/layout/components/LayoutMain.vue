<template>
  <main ref="mainRef" class="layout-main">
    <div class="layout-main__inner">
      <RouterView v-slot="{ Component, route: viewRoute }">
        <transition name="fade-slide" mode="out-in">
          <KeepAlive v-if="viewRoute.meta?.keepAlive" :include="cachedViewNameList">
            <component :is="Component" :key="viewRoute.name || viewRoute.fullPath" />
          </KeepAlive>

          <component :is="Component" v-else :key="viewRoute.fullPath" />
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useTagsView } from '@/hooks/useTagsView'

const currentRoute = useRoute()
const mainRef = ref(null)
const { cachedViewNameList } = useTagsView()

watch(
  () => currentRoute.fullPath,
  async () => {
    await nextTick()
    mainRef.value?.scrollTo({
      top: 0,
      left: 0
    })
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="less">
.layout-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overscroll-behavior: contain;
  padding: var(--app-layout-content-padding);
  overflow: auto;
}

.layout-main__inner {
  min-height: 100%;
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
