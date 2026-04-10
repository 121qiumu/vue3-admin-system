<template>
  <VueUseDemoCard
    title="本地持久化状态"
    :api-list="['useLocalStorage', 'useToggle']"
    purpose="把页面里的本地缓存和布尔开关写成响应式状态，特别适合缓存筛选条件、草稿内容和展示面板开关。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="`useToggle` 返回的是切换函数，模板里要写成 `togglePanelVisible()`，不要直接把函数引用丢给点击事件。"
  >
    <template #demo>
      <div class="storage-demo">
        <div class="storage-demo__toolbar">
          <el-button type="primary" plain @click="togglePanelVisible()">
            {{ panelVisible ? '收起草稿面板' : '展开草稿面板' }}
          </el-button>

          <el-button plain @click="resetDraft">重置草稿</el-button>
        </div>

        <div v-if="panelVisible" class="storage-demo__editor">
          <el-input
            v-model="draftNote"
            type="textarea"
            :rows="5"
            resize="none"
            placeholder="输入一点内容后刷新页面，再回来观察是否还在。"
          />
        </div>

        <div class="storage-demo__result">
          <div class="storage-demo__result-title">当前 localStorage key</div>
          <code class="storage-demo__key">{{ storageKey }}</code>
          <div class="storage-demo__preview">{{ draftNote || '暂无内容' }}</div>
        </div>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是某个 VueUse API 的独立演示组件，方便你分开理解每个 API 的作用。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ useLocalStorage, useToggle } <- @vueuse/core；VueUseDemoCard <- src/views/vueuse-demo/components/VueUseDemoCard.vue
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/views/vueuse-demo/index.vue
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { useLocalStorage, useToggle } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const storageKey = 'vueuse-demo:draft-note'
const defaultDraft =
  '这里演示的是“本地缓存草稿”。你可以修改这段文字，然后刷新页面看看是否还能恢复。'

const draftNote = useLocalStorage(storageKey, defaultDraft)
const [panelVisible, togglePanelVisible] = useToggle(true)

function resetDraft() {
  draftNote.value = defaultDraft
  togglePanelVisible(true)
}

const usageSteps = [
  '给 `useLocalStorage` 一个稳定的 key 和一个初始值，它会返回可直接读写的响应式数据。',
  '如果页面里还需要展示/收起某个局部区域，可以再配合 `useToggle` 管理布尔开关。',
  '刷新页面后，`useLocalStorage` 会自动从浏览器缓存恢复值。'
]

const sceneList = ['筛选条件缓存', '富文本草稿', '搜索历史', '面板显隐偏好']
</script>

<style scoped lang="less">
.storage-demo {
  display: grid;
  gap: var(--app-space-md);
}

.storage-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
}

.storage-demo__editor,
.storage-demo__result {
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--app-color-border-light);
}

.storage-demo__result-title {
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.storage-demo__key {
  display: inline-block;
  margin-top: var(--app-space-xs);
  padding: 4px 8px;
  border-radius: var(--app-radius-small);
  background: var(--app-color-fill-light);
}

.storage-demo__preview {
  margin-top: var(--app-space-md);
  color: var(--app-color-text-secondary);
  white-space: pre-wrap;
  line-height: 1.8;
}
</style>
