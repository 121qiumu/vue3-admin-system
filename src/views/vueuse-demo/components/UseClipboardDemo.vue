<template>
  <VueUseDemoCard
    title="复制内容到剪贴板"
    :api-list="['useClipboard']"
    purpose="把“点击按钮复制一段文本”这种高频小功能收拢成组合式函数，省掉兼容和状态提示的重复代码。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="浏览器复制通常要求用户主动触发，所以复制动作最好放在点击按钮、快捷键这类交互里。"
  >
    <template #demo>
      <div class="clipboard-demo">
        <el-input
          v-model="clipboardText"
          type="textarea"
          :rows="4"
          resize="none"
          placeholder="输入你想复制的内容"
        />

        <div class="clipboard-demo__actions">
          <el-button type="primary" :disabled="!isSupported" @click="handleCopy">
            {{ copied ? '已复制' : '复制内容' }}
          </el-button>

          <span class="clipboard-demo__status">
            {{ statusText }}
          </span>
        </div>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const clipboardText = ref('pnpm add @vueuse/core')
const { copy, copied, isSupported } = useClipboard({
  source: clipboardText,
  copiedDuring: 1200,
  legacy: true
})

const statusText = computed(() => {
  if (!isSupported.value) {
    return '当前环境不支持剪贴板复制。'
  }

  return copied.value ? '复制成功，状态会自动复位。' : '点击按钮把上面的内容复制出去。'
})

async function handleCopy() {
  if (!isSupported.value) {
    return
  }

  await copy()
}

const usageSteps = [
  '准备一个响应式文本，通常来自输入框、详情页字段或者命令串。',
  '调用 `useClipboard({ source })`，拿到 `copy`、`copied`、`isSupported`。',
  '在点击事件中执行 `copy()`，再用 `copied` 给出“复制成功”的即时反馈。'
]

const sceneList = ['复制分享链接', '复制接口地址', '复制邀请码', '复制命令行脚本']
</script>

<style scoped lang="less">
.clipboard-demo {
  display: grid;
  gap: var(--app-space-md);
}

.clipboard-demo__actions {
  display: flex;
  align-items: center;
  gap: var(--app-space-md);
}

.clipboard-demo__status {
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .clipboard-demo__actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
