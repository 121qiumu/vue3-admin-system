<template>
  <div class="error-page">
    <AppStatus type="500">
      <template #actions>
        <el-button type="primary" @click="reloadPage">{{ t('common.actions.reload') }}</el-button>
        <el-button @click="goDashboard">{{ t('common.actions.backHome') }}</el-button>
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

function reloadPage() {
  window.location.reload()
}

function goDashboard() {
  router.push(toLocalePath('/dashboard'))
}
</script>

<style scoped lang="less">
.error-page {
  min-height: 100%;
  padding: var(--app-space-xl);
}
</style>
