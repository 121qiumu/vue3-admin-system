<template>
  <div class="error-page">
    <AppStatus type="403">
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
// 如果用户是从别的页面误跳过来的，回退会比直接跳首页更自然。
function goBack() {
  router.back()
}
</script>

<style scoped lang="less">
.error-page {
  min-height: 100%;
  padding: var(--app-space-xl);
}
</style>
