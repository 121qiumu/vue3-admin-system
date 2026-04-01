<template>
  <div class="list-page-template">
    <el-card v-if="$slots.query" shadow="never" class="list-page-template__query-card">
      <div class="list-page-template__query-body">
        <slot name="query" />
      </div>
    </el-card>

    <el-card v-loading="loading" shadow="never" class="list-page-template__table-card">
      <template #header>
        <div class="list-page-template__header">
          <div class="list-page-template__header-main">
            <div class="list-page-template__title">{{ title }}</div>
            <div v-if="description" class="list-page-template__desc">{{ description }}</div>
          </div>

          <div v-if="$slots.toolbar" class="list-page-template__toolbar">
            <slot name="toolbar" />
          </div>
        </div>
      </template>

      <div class="list-page-template__table-wrapper">
        <slot name="table" />
      </div>

      <div v-if="showPagination" class="list-page-template__pagination">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="pageSizes"
          :layout="paginationLayout"
          :total="total"
          background
          @size-change="$emit('size-change', $event)"
          @current-change="$emit('current-change', $event)"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '列表页面'
  },
  description: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pagination: {
    type: Object,
    default: () => ({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50]
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  }
})

defineEmits(['size-change', 'current-change'])

// 统一兼容 pageNum / currentPage 两种命名。
// 这样后续团队如果换了分页字段名，也不需要立刻重写模板组件。
const currentPage = computed(() => {
  return Number(props.pagination.pageNum || props.pagination.currentPage || 1)
})

const pageSize = computed(() => {
  return Number(props.pagination.pageSize || 10)
})

const total = computed(() => {
  return Number(props.pagination.total || 0)
})
</script>

<style scoped lang="less">
.list-page-template {
  display: grid;
  gap: var(--app-space-md);
}

.list-page-template__query-body,
.list-page-template__table-wrapper {
  min-width: 0;
}

.list-page-template__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-md);
}

.list-page-template__header-main {
  min-width: 0;
}

.list-page-template__title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.list-page-template__desc {
  margin-top: 4px;
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.list-page-template__toolbar {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
}

.list-page-template__table-wrapper {
  overflow-x: auto;
}

/* 给通用列表页一个基础的最小宽度。
 * 当列较多时，小屏下不会硬挤压，而是允许横向滚动。 */
.list-page-template__table-wrapper :deep(.el-table) {
  min-width: 760px;
}

.list-page-template__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--app-space-lg);
}

@media (max-width: 768px) {
  .list-page-template__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .list-page-template__toolbar {
    width: 100%;
  }

  .list-page-template__query-body :deep(.el-form--inline) {
    display: grid;
    grid-template-columns: 1fr;
  }

  .list-page-template__query-body :deep(.el-form--inline .el-form-item) {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--app-space-sm);
  }

  .list-page-template__query-body :deep(.el-input),
  .list-page-template__query-body :deep(.el-select),
  .list-page-template__query-body :deep(.el-cascader),
  .list-page-template__query-body :deep(.el-date-editor) {
    width: 100% !important;
  }

  .list-page-template__pagination {
    overflow-x: auto;
    justify-content: flex-start;
  }
}
</style>
