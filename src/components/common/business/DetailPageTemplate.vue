<template>
  <div v-loading="loading" class="detail-page-template">
    <div class="detail-page-template__header">
      <div class="detail-page-template__header-main">
        <el-page-header @back="goBack">
          <template #content>
            <div class="detail-page-template__title">{{ title }}</div>
          </template>
        </el-page-header>

        <div v-if="description" class="detail-page-template__desc">{{ description }}</div>
      </div>

      <div v-if="$slots.actions" class="detail-page-template__actions">
        <slot name="actions" />
      </div>
    </div>

    <el-card v-if="$slots.summary" shadow="never" class="detail-page-template__summary-card">
      <slot name="summary" />
    </el-card>

    <div class="detail-page-template__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'
import { translate } from '@/locales/helper'

const props = defineProps({
  title: {
    type: String,
    default: () => translate('common.actions.detail', {}, '详情页面')
  },
  description: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  backPath: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const { toLocalePath } = useLocale()

function goBack() {
  if (props.backPath) {
    router.push(toLocalePath(props.backPath))
    return
  }

  router.back()
}
</script>

<style scoped lang="less">
.detail-page-template {
  display: grid;
  gap: var(--app-space-md);
}

.detail-page-template__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-md);
}

.detail-page-template__header-main {
  min-width: 0;
}

.detail-page-template__title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.detail-page-template__desc {
  margin-top: var(--app-space-sm);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.detail-page-template__actions {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
}

.detail-page-template__content {
  display: grid;
  min-width: 0;
  gap: var(--app-space-md);
}

.detail-page-template__content :deep(.el-descriptions__body),
.detail-page-template__content :deep(.el-table) {
  overflow-x: auto;
}

@media (max-width: 768px) {
  .detail-page-template__header {
    flex-direction: column;
  }
}
</style>
