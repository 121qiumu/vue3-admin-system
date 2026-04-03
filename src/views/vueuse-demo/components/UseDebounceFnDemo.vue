<template>
  <VueUseDemoCard
    title="输入防抖"
    :api-list="['useDebounceFn']"
    purpose="把输入框频繁触发的逻辑延后执行，避免用户每敲一个字就立刻触发筛选、请求或复杂计算。"
    :usage-steps="usageSteps"
    :scene-list="sceneList"
    caution="防抖适合搜索框和筛选项，不适合要求每次操作都立刻响应的拖拽和实时绘制。"
  >
    <template #demo>
      <div class="debounce-demo">
        <el-input
          v-model="keyword"
          clearable
          placeholder="连续输入关键词，停顿 600ms 后才会真正执行一次筛选"
        />

        <div class="debounce-demo__meta">
          <span>当前生效关键词：{{ appliedKeyword || '未输入' }}</span>
          <span>模拟执行次数：{{ requestCount }}</span>
          <span>最后执行时间：{{ lastTriggeredAt }}</span>
        </div>

        <ul class="debounce-demo__result-list">
          <li v-for="item in filteredApiList" :key="item.name" class="debounce-demo__result-item">
            <strong>{{ item.name }}</strong>
            <span>{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </template>
  </VueUseDemoCard>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import VueUseDemoCard from './VueUseDemoCard.vue'

const searchableApiList = [
  {
    name: 'useLocalStorage',
    desc: '刷新页面后仍然保留查询条件或草稿内容。'
  },
  {
    name: 'useClipboard',
    desc: '快速复制接口地址、命令和分享链接。'
  },
  {
    name: 'useWindowSize',
    desc: '根据窗口宽度切换后台布局策略。'
  },
  {
    name: 'useAsyncState',
    desc: '统一管理 loading、error 和 data。'
  },
  {
    name: 'useElementSize',
    desc: '做图表和卡片容器的尺寸联动。'
  }
]

const keyword = ref('')
const appliedKeyword = ref('')
const requestCount = ref(0)
const lastTriggeredAt = ref('--')

const filteredApiList = computed(() => {
  const normalizedKeyword = appliedKeyword.value.trim().toLowerCase()

  if (!normalizedKeyword) {
    return searchableApiList
  }

  return searchableApiList.filter((item) => {
    return (
      item.name.toLowerCase().includes(normalizedKeyword) ||
      item.desc.toLowerCase().includes(normalizedKeyword)
    )
  })
})

const applySearch = useDebounceFn(
  () => {
    appliedKeyword.value = keyword.value.trim()
    requestCount.value += 1
    lastTriggeredAt.value = new Date().toLocaleTimeString('zh-CN', {
      hour12: false
    })
  },
  600,
  {
    maxWait: 1200
  }
)

watch(keyword, () => {
  applySearch()
})

const usageSteps = [
  '把真正要执行的逻辑写进普通函数里，比如搜索、筛选、请求。',
  '用 `useDebounceFn(fn, 600)` 包装它，得到“延迟执行版函数”。',
  '在 `watch`、输入事件或窗口事件里调用这个新函数，减少无意义触发。'
]

const sceneList = ['搜索框联想', '表格筛选', '高频输入校验', '窗口变化后的重算']
</script>

<style scoped lang="less">
.debounce-demo {
  display: grid;
  gap: var(--app-space-md);
}

.debounce-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
  color: var(--app-color-text-secondary);
}

.debounce-demo__result-list {
  display: grid;
  gap: var(--app-space-sm);
  padding: 0;
  margin: 0;
  list-style: none;
}

.debounce-demo__result-item {
  display: grid;
  gap: var(--app-space-xs);
  padding: var(--app-space-md);
  border-radius: var(--app-radius-base);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--app-color-border-light);
}

.debounce-demo__result-item span {
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}
</style>
