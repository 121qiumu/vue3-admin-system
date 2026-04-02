<template>
  <div class="error-page">
    <AppStatus type="404">
      <template #actions>
        <el-button type="primary" @click="goDashboard">{{
          t('common.actions.backHome')
        }}</el-button>
        <el-button @click="goBack">{{ t('common.actions.goBack') }}</el-button>
      </template>
    </AppStatus>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'
import AppStatus from '@/components/common/AppStatus.vue'

const router = useRouter()
const { t } = useI18n()
const { toLocalePath } = useLocale()

function goDashboard() {
  router.push(toLocalePath('/dashboard'))
}

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
