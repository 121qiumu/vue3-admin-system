<template>
  <el-card shadow="never" class="dashboard-panel-card dashboard-shortcut-panel">
    <template #header>
      <div class="dashboard-panel-card__header">
        <div>
          <div class="dashboard-panel-card__title">{{ t('dashboard.panels.shortcut.title') }}</div>
          <div class="dashboard-panel-card__desc">
            {{ t('dashboard.panels.shortcut.description') }}
          </div>
        </div>
      </div>
    </template>

    <AppStatus
      v-if="shortcutList.length === 0"
      type="empty"
      mode="section"
      :title="t('dashboard.panels.shortcut.emptyTitle')"
      :description="t('dashboard.panels.shortcut.emptyDescription')"
    />

    <div v-else class="dashboard-shortcut-panel__grid">
      <button
        v-for="item in shortcutList"
        :key="item.key"
        type="button"
        class="dashboard-shortcut-panel__item"
        @click="$emit('select', item)"
      >
        <div class="dashboard-shortcut-panel__item-top">
          <div class="dashboard-shortcut-panel__badge">{{ item.title?.slice(0, 1) }}</div>
          <el-tag size="small" effect="plain">{{ item.tag }}</el-tag>
        </div>

        <div class="dashboard-shortcut-panel__item-title">{{ item.title }}</div>
        <div class="dashboard-shortcut-panel__item-desc">{{ item.description }}</div>
      </button>
    </div>
  </el-card>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import AppStatus from '@/components/common/AppStatus.vue'

const { t } = useI18n()

defineProps({
  shortcutList: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])
</script>

<style scoped lang="less">
.dashboard-panel-card {
  height: 100%;
}

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

.dashboard-shortcut-panel__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--app-space-md);
}

.dashboard-shortcut-panel__item {
  padding: var(--app-space-md);
  text-align: left;
  cursor: pointer;
  background-color: var(--app-color-bg-elevated);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-large);
  transition:
    transform var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    box-shadow var(--app-transition-duration) var(--app-transition-timing);
}

.dashboard-shortcut-panel__item:hover {
  border-color: color-mix(in srgb, var(--app-color-primary) 35%, var(--app-color-border-light));
  box-shadow: var(--app-shadow-sm);
  transform: translateY(-2px);
}

.dashboard-shortcut-panel__item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-sm);
}

.dashboard-shortcut-panel__badge {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: var(--app-color-primary);
  background-color: color-mix(in srgb, var(--app-color-primary) 12%, transparent);
  border-radius: var(--app-radius-base);
}

.dashboard-shortcut-panel__item-title {
  margin-top: var(--app-space-md);
  font-size: var(--app-font-size-base);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-shortcut-panel__item-desc {
  margin-top: var(--app-space-xs);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

@media (max-width: 768px) {
  .dashboard-shortcut-panel__grid {
    grid-template-columns: 1fr;
  }
}
</style>
