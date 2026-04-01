<template>
  <div class="error-page">
    <AppStatus type="500">
      <template #actions>
        <el-button type="primary" @click="reloadPage">重新加载</el-button>
        <el-button @click="goDashboard">返回首页</el-button>
      </template>
    </AppStatus>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import AppStatus from '@/components/common/AppStatus.vue'

const router = useRouter()

// 重新加载当前页面。
// 当页面因为接口异常进入 500 状态时，刷新通常是最直接的恢复手段。
function reloadPage() {
  window.location.reload()
}

// 返回后台首页。
function goDashboard() {
  router.push('/dashboard')
}
</script>

<style scoped lang="less">
.error-page {
  min-height: 100%;
  padding: var(--app-space-xl);
}
</style>
