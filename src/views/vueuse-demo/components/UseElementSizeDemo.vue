<template>
  <VueUseDemoCard
    title="元素尺寸观察"
    :api-list="['useElementSize']"
    purpose="监听某个具体 DOM 元素的宽高变化，特别适合做图表自适应、容器联动和卡片布局调试。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="这个 API 关注的是元素本身的尺寸变化，不是整个窗口。窗口变了但元素没变，数据也不会乱跳。"
  >
    <template #demo>
      <div class="element-demo">
        <div class="element-demo__controls">
          <span class="element-demo__control-label">拖动滑块改变示例卡片宽度</span>
          <el-slider v-model="previewWidth" :min="180" :max="420" />
        </div>

        <div
          ref="previewCardRef"
          class="element-demo__preview-card"
          :style="{ width: `${previewWidth}px` }"
        >
          <div class="element-demo__preview-title">当前被监听的元素</div>
          <div class="element-demo__preview-desc">
            `useElementSize` 会自动同步这个盒子的宽高变化。
          </div>
        </div>

        <div class="element-demo__result">
          <span>监听结果</span>
          <strong>{{ Math.round(elementWidth) }} x {{ Math.round(elementHeight) }}</strong>
        </div>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const previewCardRef = ref(null)
const previewWidth = ref(280)
const { width: elementWidth, height: elementHeight } = useElementSize(previewCardRef)

const usageSteps = [
  '给目标 DOM 绑定一个 `ref`，让 Vue 能拿到真实元素。',
  '把元素 `ref` 传给 `useElementSize`，解构出 `width`、`height`。',
  '把这些尺寸数据用于图表重算、文字截断策略、面板联动等场景。'
]

const sceneList = ['图表自适应', '卡片拖拽缩放', '弹窗内容重排', '自定义容器布局']
</script>

<style scoped lang="less">
.element-demo {
  display: grid;
  gap: var(--app-space-md);
}

.element-demo__controls {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: var(--app-color-fill-light);
}

.element-demo__control-label {
  display: inline-block;
  margin-bottom: var(--app-space-xs);
  color: var(--app-color-text-secondary);
}

.element-demo__preview-card {
  min-height: 160px;
  padding: var(--app-space-lg);
  border-radius: var(--app-radius-large);
  background:
    linear-gradient(135deg, rgba(24, 144, 255, 0.12), rgba(255, 255, 255, 0.92)),
    rgba(255, 255, 255, 0.9);
  box-shadow: var(--app-shadow-base);
  transition: width var(--app-transition-duration) var(--app-transition-timing);
}

.element-demo__preview-title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.element-demo__preview-desc {
  margin-top: var(--app-space-sm);
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}

.element-demo__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-md);
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--app-color-border-light);
}

.element-demo__result strong {
  font-size: var(--app-font-size-large);
  color: var(--app-color-text-primary);
}
</style>
