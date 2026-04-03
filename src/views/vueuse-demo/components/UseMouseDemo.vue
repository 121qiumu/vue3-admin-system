<template>
  <VueUseDemoCard
    title="鼠标坐标跟踪"
    :api-list="['useMouse']"
    purpose="把页面里的鼠标位置转换成响应式数据，不需要自己再写 mousemove 监听和销毁逻辑。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="如果你只关心鼠标，不关心触摸事件，建议像这个示例一样显式传入 touch: false。"
  >
    <template #demo>
      <div class="mouse-demo">
        <div class="mouse-demo__hint">把鼠标在当前页面里移动，下面的数值会实时变化。</div>

        <div class="mouse-demo__stats">
          <div class="mouse-demo__stat">
            <span class="mouse-demo__label">X</span>
            <strong class="mouse-demo__value">{{ Math.round(x) }}</strong>
          </div>

          <div class="mouse-demo__stat">
            <span class="mouse-demo__label">Y</span>
            <strong class="mouse-demo__value">{{ Math.round(y) }}</strong>
          </div>

          <div class="mouse-demo__stat">
            <span class="mouse-demo__label">来源</span>
            <strong class="mouse-demo__value">{{ sourceType || '尚未触发' }}</strong>
          </div>
        </div>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { useMouse } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

// `useMouse`：用于实时获取鼠标坐标。
// 最常见的使用流程就是：
// 1. 从 `@vueuse/core` 导入 `useMouse`
// 2. 解构出 `x`、`y`、`sourceType`
// 3. 在模板里像普通响应式数据一样直接使用
// 4. 不需要手写 `addEventListener` 和 `removeEventListener`
const { x, y, sourceType } = useMouse({
  touch: false
})

const usageSteps = [
  '导入 `useMouse`，直接调用它拿到 `x`、`y` 等响应式数据。',
  '如果你的业务只处理桌面端鼠标轨迹，可以把 `touch` 设为 `false`。',
  '把返回值直接渲染到模板里，或者拿去做拖拽、跟随提示、坐标调试。'
]

const sceneList = ['拖拽面板', '跟随提示层', '调试坐标区域', '图表交互反馈']
</script>

<style scoped lang="less">
.mouse-demo {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-large);
  background:
    radial-gradient(circle at top left, rgba(64, 158, 255, 0.18), transparent 45%),
    linear-gradient(135deg, rgba(250, 250, 250, 0.96), rgba(245, 247, 250, 0.92));
}

.mouse-demo__hint {
  color: var(--app-color-text-secondary);
}

.mouse-demo__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-sm);
  margin-top: var(--app-space-md);
}

.mouse-demo__stat {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--app-shadow-sm);
}

.mouse-demo__label {
  display: block;
  color: var(--app-color-text-secondary);
}

.mouse-demo__value {
  display: block;
  margin-top: var(--app-space-xs);
  font-size: var(--app-font-size-extra-large);
  color: var(--app-color-text-primary);
}

@media (max-width: 768px) {
  .mouse-demo__stats {
    grid-template-columns: 1fr;
  }
}
</style>
