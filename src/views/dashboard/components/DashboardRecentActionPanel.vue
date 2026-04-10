<template>
  <el-card shadow="never" class="dashboard-panel-card dashboard-recent-panel">
    <template #header>
      <div class="dashboard-panel-card__header">
        <div>
          <div class="dashboard-panel-card__title">{{ t('dashboard.panels.recent.title') }}</div>
          <div class="dashboard-panel-card__desc">
            {{ t('dashboard.panels.recent.description') }}
          </div>
        </div>
      </div>
    </template>

    <AppStatus
      v-if="actionList.length === 0"
      type="empty"
      mode="section"
      :title="t('dashboard.panels.recent.emptyTitle')"
      :description="t('dashboard.panels.recent.emptyDescription')"
    />

    <el-timeline v-else>
      <el-timeline-item
        v-for="item in actionList"
        :key="item.id"
        :timestamp="item.time"
        :type="item.type || 'primary'"
      >
        <div class="dashboard-recent-panel__item-title-row">
          <span class="dashboard-recent-panel__item-title">{{ item.title }}</span>
          <el-tag size="small" effect="plain">{{ item.typeLabel }}</el-tag>
        </div>

        <div class="dashboard-recent-panel__item-desc">{{ item.content }}</div>
        <div class="dashboard-recent-panel__item-meta">
          {{ t('dashboard.panels.recent.operator', { name: item.operator }) }}
        </div>
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是首页里的一个可复用面板或卡片组件，专门给 dashboard 页面服务。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ useI18n } <- vue-i18n；AppStatus <- src/components/common/AppStatus.vue
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/views/dashboard/index.vue
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { useI18n } from 'vue-i18n'

import AppStatus from '@/components/common/AppStatus.vue'

const { t } = useI18n()

defineProps({
  actionList: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="less">
.dashboard-panel-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-md);
}

.dashboard-panel-card__title {
  font-size: var(--app-font-size-medium);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-panel-card__desc {
  margin-top: 4px;
  font-size: var(--app-font-size-small);
  color: var(--app-color-text-secondary);
}

.dashboard-recent-panel__item-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--app-space-sm);
}

.dashboard-recent-panel__item-title {
  font-size: var(--app-font-size-base);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-recent-panel__item-desc {
  margin-top: var(--app-space-xs);
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

.dashboard-recent-panel__item-meta {
  margin-top: var(--app-space-xs);
  font-size: var(--app-font-size-small);
  color: var(--app-color-text-secondary);
}
</style>
