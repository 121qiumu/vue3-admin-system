<template>
  <VueUseDemoCard
    title="异步状态收拢"
    :api-list="['useAsyncState']"
    purpose="把异步请求里的 data、loading、error、重新执行这些状态统一收拢，少写很多重复的 `try / catch / finally`。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="如果你想在重新执行时保留旧数据，可以像这个示例一样把 `resetOnExecute` 设为 `false`。"
  >
    <template #demo>
      <div class="async-demo">
        <div class="async-demo__toolbar">
          <el-button-group>
            <el-button plain @click="loadTopic('search')">搜索页建议</el-button>
            <el-button plain @click="loadTopic('form')">表单页建议</el-button>
            <el-button plain @click="loadTopic('table')">表格页建议</el-button>
            <el-button plain @click="loadTopic('failure')">模拟失败</el-button>
          </el-button-group>
        </div>

        <div class="async-demo__meta">
          <span>当前主题：{{ currentTopic }}</span>
          <span>加载中：{{ isLoading ? '是' : '否' }}</span>
          <span>已准备：{{ isReady ? '是' : '否' }}</span>
          <span>最近成功时间：{{ loadedAt }}</span>
        </div>

        <div v-if="isLoading && !isReady" class="async-demo__loading">
          <el-skeleton :rows="3" animated />
        </div>

        <el-alert
          v-else-if="errorMessage"
          type="error"
          :closable="false"
          show-icon
          :title="errorMessage"
        />

        <ul v-else class="async-demo__list">
          <li v-for="item in tipList" :key="item.title" class="async-demo__item">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const currentTopic = ref('search')
const loadedAt = ref('--')

const tipMap = {
  search: [
    {
      title: '搜索条件先做防抖',
      desc: '把输入框和筛选项的高频变化先合并，再触发真正请求。'
    },
    {
      title: '把筛选条件写入地址或缓存',
      desc: '回到页面时用户不容易丢失上下文。'
    }
  ],
  form: [
    {
      title: '草稿优先本地缓存',
      desc: '长表单中途刷新后能恢复，用户体验会稳定很多。'
    },
    {
      title: '提交按钮和 loading 状态联动',
      desc: '避免重复点击带来的并发问题。'
    }
  ],
  table: [
    {
      title: '分页、筛选、排序统一管理',
      desc: '方便“重置”和“回到列表页后恢复状态”。'
    },
    {
      title: '大表格优先做局部刷新',
      desc: '减少全页面级的 loading 抖动。'
    }
  ]
}

async function mockLoadTips(topic) {
  await new Promise((resolve) => {
    setTimeout(resolve, 700)
  })

  if (topic === 'failure') {
    throw new Error('这里是模拟失败请求，用来观察 error / isLoading 的变化。')
  }

  return tipMap[topic] || []
}

const {
  state: tipList,
  isReady,
  isLoading,
  error,
  execute
} = useAsyncState(mockLoadTips, [], {
  immediate: false,
  resetOnExecute: false,
  onSuccess() {
    loadedAt.value = new Date().toLocaleTimeString('zh-CN', {
      hour12: false
    })
  }
})

const errorMessage = computed(() => {
  return error.value?.message || ''
})

function loadTopic(topic) {
  currentTopic.value = topic
  execute(0, topic)
}

onMounted(() => {
  loadTopic(currentTopic.value)
})

const usageSteps = [
  '把真实请求写成一个异步函数，返回最终要展示的数据。',
  '调用 `useAsyncState`，统一拿到 `state`、`isLoading`、`error`、`execute`。',
  '在模板里按这几个状态分支渲染页面，重试时直接调用 `execute()`。'
]

const sceneList = ['列表页数据请求', '详情页加载', '仪表盘局部刷新', '按需重新执行请求']
</script>

<style scoped lang="less">
.async-demo {
  display: grid;
  gap: var(--app-space-md);
}

.async-demo__toolbar {
  overflow-x: auto;
}

.async-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
  color: var(--app-color-text-secondary);
}

.async-demo__list {
  display: grid;
  gap: var(--app-space-sm);
  padding: 0;
  margin: 0;
  list-style: none;
}

.async-demo__item {
  display: grid;
  gap: var(--app-space-xs);
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  border: 1px solid var(--app-color-border-light);
  background: rgba(255, 255, 255, 0.92);
}

.async-demo__item span {
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}
</style>
