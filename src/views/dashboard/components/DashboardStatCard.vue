<template>
  <el-card
    shadow="hover"
    class="dashboard-stat-card"
    :style="{ '--dashboard-stat-accent': item.color || 'var(--app-color-primary)' }"
  >
    <div class="dashboard-stat-card__header">
      <div class="dashboard-stat-card__title">{{ item.title }}</div>
      <el-tag size="small" effect="plain" :type="trendTagType">{{ item.trendText }}</el-tag>
    </div>

    <div class="dashboard-stat-card__value-row">
      <span class="dashboard-stat-card__value">{{ item.value }}</span>
      <span v-if="item.unit" class="dashboard-stat-card__unit">{{ item.unit }}</span>
    </div>

    <div class="dashboard-stat-card__desc">{{ item.description }}</div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

// 统计卡片的趋势标签只做轻量区分：上升、下降、提醒、稳定。
const trendTagType = computed(() => {
  const trendType = props.item.trendType

  if (trendType === 'up') {
    return 'success'
  }

  if (trendType === 'down') {
    return 'danger'
  }

  if (trendType === 'warning') {
    return 'warning'
  }

  return 'info'
})
</script>

<style scoped lang="less">
.dashboard-stat-card {
  position: relative;
  overflow: hidden;
  border: var(--app-border-width) solid var(--app-color-border-light);
}

.dashboard-stat-card::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  content: '';
  background: linear-gradient(90deg, var(--dashboard-stat-accent), transparent);
}

.dashboard-stat-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-sm);
}

.dashboard-stat-card__title {
  font-size: var(--app-font-size-base);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-stat-card__value-row {
  display: flex;
  align-items: flex-end;
  gap: var(--app-space-2xs);
  margin-top: var(--app-space-lg);
}

.dashboard-stat-card__value {
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  color: var(--app-color-text-primary);
}

.dashboard-stat-card__unit {
  padding-bottom: 4px;
  color: var(--app-color-text-secondary);
}

.dashboard-stat-card__desc {
  margin-top: var(--app-space-md);
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}
</style>
