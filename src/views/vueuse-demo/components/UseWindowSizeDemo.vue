<template>
  <VueUseDemoCard
    title="窗口尺寸监听"
    :api-list="['useWindowSize']"
    purpose="把浏览器窗口宽高变成响应式数据，特别适合做后台项目里的响应式布局判断。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
  >
    <template #demo>
      <div class="window-demo">
        <div class="window-demo__stats">
          <div class="window-demo__stat">
            <span class="window-demo__label">窗口宽度</span>
            <strong class="window-demo__value">{{ width }} px</strong>
          </div>

          <div class="window-demo__stat">
            <span class="window-demo__label">窗口高度</span>
            <strong class="window-demo__value">{{ height }} px</strong>
          </div>
        </div>

        <div class="window-demo__tip">
          {{ layoutTip }}
        </div>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const { width, height } = useWindowSize()

const layoutTip = computed(() => {
  if (width.value < 768) {
    return '当前更接近移动端宽度，适合切换成单列内容和折叠菜单。'
  }

  if (width.value < 1200) {
    return '当前更接近平板或小屏桌面，适合把双列面板改成单列。'
  }

  return '当前更接近桌面端宽度，通常可以保留完整侧边栏和多列信息区域。'
})

const usageSteps = [
  '导入 `useWindowSize` 并解构出 `width`、`height`。',
  '把宽高直接用于模板展示，或者交给 `computed` 做断点判断。',
  '当窗口变化时，数据会自动更新，不需要自己监听 `resize`。'
]

const sceneList = ['响应式侧边栏', '表格列数切换', '大屏与小屏布局分支', '面板密度调节']
</script>

<style scoped lang="less">
.window-demo {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-large);
  background: linear-gradient(135deg, rgba(236, 245, 255, 0.9), rgba(248, 250, 252, 0.96));
}

.window-demo__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--app-space-sm);
}

.window-demo__stat {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.88);
}

.window-demo__label {
  display: block;
  color: var(--app-color-text-secondary);
}

.window-demo__value {
  display: block;
  margin-top: var(--app-space-xs);
  font-size: var(--app-font-size-extra-large);
  color: var(--app-color-text-primary);
}

.window-demo__tip {
  margin-top: var(--app-space-md);
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.82);
  color: var(--app-color-text-regular);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .window-demo__stats {
    grid-template-columns: 1fr;
  }
}
</style>
