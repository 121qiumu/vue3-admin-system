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
