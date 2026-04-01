<template>
  <el-card shadow="never" class="dashboard-panel-card dashboard-shortcut-panel">
    <template #header>
      <div class="dashboard-panel-card__header">
        <div>
          <div class="dashboard-panel-card__title">快捷入口</div>
          <div class="dashboard-panel-card__desc">把常用操作放在首页，减少重复找菜单的成本。</div>
        </div>
      </div>
    </template>

    <AppStatus
      v-if="shortcutList.length === 0"
      type="empty"
      mode="section"
      title="暂无快捷入口"
      description="当前角色还没有配置可直接使用的快捷入口。"
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
import AppStatus from '@/components/common/AppStatus.vue'

// 快捷入口组件只负责渲染卡片列表，并把点击事件抛给页面层。
// 这样“跳路由”还是“执行动作”都由页面统一决定，组件职责会更单纯。
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
