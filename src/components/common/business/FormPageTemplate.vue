<template>
  <div v-loading="loading" class="form-page-template">
    <div class="form-page-template__header">
      <div class="form-page-template__header-main">
        <el-page-header @back="goBack">
          <template #content>
            <div class="form-page-template__title">{{ title }}</div>
          </template>
        </el-page-header>

        <div v-if="description" class="form-page-template__desc">{{ description }}</div>
      </div>

      <div v-if="$slots.headerActions" class="form-page-template__header-actions">
        <slot name="headerActions" />
      </div>
    </div>

    <el-card shadow="never" class="form-page-template__card">
      <slot />

      <div v-if="$slots.footer" class="form-page-template__footer">
        <slot name="footer" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'
import { translate } from '@/locales/helper'

const props = defineProps({
  title: {
    type: String,
    default: () => translate('common.actions.submit', {}, '表单页面')
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
.form-page-template {
  display: grid;
  gap: var(--app-space-md);
}

.form-page-template__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-md);
}

.form-page-template__header-main {
  min-width: 0;
}

.form-page-template__title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.form-page-template__desc {
  margin-top: var(--app-space-sm);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.form-page-template__header-actions {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
}

.form-page-template__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-xl);
  padding-top: var(--app-space-lg);
  border-top: var(--app-border-width) solid var(--app-color-border-light);
}

.form-page-template__card :deep(.el-form-item__content),
.form-page-template__card :deep(.el-page-header__content) {
  min-width: 0;
}

.form-page-template__card :deep(.el-select),
.form-page-template__card :deep(.el-cascader),
.form-page-template__card :deep(.el-date-editor) {
  max-width: 100%;
}

.form-page-template__card :deep(.el-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
}

@media (max-width: 768px) {
  .form-page-template__header {
    flex-direction: column;
  }

  .form-page-template__footer {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .form-page-template__card :deep(.el-form-item) {
    margin-bottom: var(--app-space-md);
  }
}
</style>
