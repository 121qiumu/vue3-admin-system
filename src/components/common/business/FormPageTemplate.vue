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

const props = defineProps({
  title: {
    type: String,
    default: '表单页面'
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

// 表单页面通常需要明确返回列表页。
// 这里保持和详情页同样的回退规则，降低使用成本。
function goBack() {
  if (props.backPath) {
    router.push(props.backPath)
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

/* 这里直接对插槽中的 Element Plus 表单做基础约束。
 * 这样业务页只要使用模板组件，就能默认获得更稳的小屏表现。 */
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
