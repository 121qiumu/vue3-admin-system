<template>
  <el-card shadow="never" class="dashboard-panel-card dashboard-notice-panel">
    <template #header>
      <div class="dashboard-panel-card__header">
        <div>
          <div class="dashboard-panel-card__title">系统公告</div>
          <div class="dashboard-panel-card__desc">放首页是为了让重要提醒更容易被看到。</div>
        </div>
      </div>
    </template>

    <AppStatus
      v-if="noticeList.length === 0"
      type="empty"
      mode="section"
      title="暂无系统公告"
      description="当前没有新的公告或维护提醒需要展示。"
    />

    <div v-else class="dashboard-notice-panel__list">
      <div v-for="item in noticeList" :key="item.id" class="dashboard-notice-panel__item">
        <div class="dashboard-notice-panel__item-top">
          <div class="dashboard-notice-panel__item-title">{{ item.title }}</div>
          <el-tag size="small" :type="item.levelType">{{ item.levelLabel }}</el-tag>
        </div>

        <div class="dashboard-notice-panel__item-desc">{{ item.content }}</div>
        <div class="dashboard-notice-panel__item-time">发布时间：{{ item.publishTime }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import AppStatus from '@/components/common/AppStatus.vue'

// 公告组件专门负责展示通知列表。
// 页面层只需要传入数据，不必再关心每一条公告的样式细节。
defineProps({
  noticeList: {
    type: Array,
    default: () => []
  }
})
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

.dashboard-notice-panel__list {
  display: grid;
  gap: var(--app-space-md);
}

.dashboard-notice-panel__item {
  padding: var(--app-space-md);
  background-color: var(--app-color-bg-elevated);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-large);
}

.dashboard-notice-panel__item-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-sm);
}

.dashboard-notice-panel__item-title {
  font-size: var(--app-font-size-base);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-notice-panel__item-desc {
  margin-top: var(--app-space-sm);
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

.dashboard-notice-panel__item-time {
  margin-top: var(--app-space-sm);
  font-size: var(--app-font-size-small);
  color: var(--app-color-text-secondary);
}
</style>
