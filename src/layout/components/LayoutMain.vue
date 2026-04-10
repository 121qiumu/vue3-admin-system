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
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ nextTick, ref, watch } <- vue；{ useRoute } <- vue-router；{ useTagsView } <- src/hooks/useTagsView.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/modes/LeftLayout.vue、src/layout/modes/MixLayout.vue、src/layout/modes/TopLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
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
