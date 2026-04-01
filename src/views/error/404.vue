<template>
  <div class="error-page">
    <AppStatus type="404">
      <template #actions>
        <el-button type="primary" @click="goDashboard">返回首页</el-button>
        <el-button @click="goBack">返回上一页</el-button>
      </template>
    </AppStatus>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import AppStatus from '@/components/common/AppStatus.vue'

const router = useRouter()

// 返回后台首页。
function goDashboard() {
  router.push('/dashboard')
}

// 返回上一页。
function goBack() {
  router.back()
}
</script>

<style scoped lang="less">
.error-page {
  min-height: 100vh;
  padding: var(--app-space-xl);
}
</style>
