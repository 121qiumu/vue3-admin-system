<template>
  <el-card shadow="never" class="dashboard-panel-card dashboard-notice-panel">
    <template #header>
      <div class="dashboard-panel-card__header">
        <div>
          <div class="dashboard-panel-card__title">{{ t('dashboard.panels.notice.title') }}</div>
          <div class="dashboard-panel-card__desc">
            {{ t('dashboard.panels.notice.description') }}
          </div>
        </div>
      </div>
    </template>

    <AppStatus
      v-if="noticeList.length === 0"
      type="empty"
      mode="section"
      :title="t('dashboard.panels.notice.emptyTitle')"
      :description="t('dashboard.panels.notice.emptyDescription')"
    />

    <div v-else class="dashboard-notice-panel__list">
      <div v-for="item in noticeList" :key="item.id" class="dashboard-notice-panel__item">
        <div class="dashboard-notice-panel__item-top">
          <div class="dashboard-notice-panel__item-title">{{ item.title }}</div>
          <el-tag size="small" :type="item.levelType">{{ item.levelLabel }}</el-tag>
        </div>

        <div class="dashboard-notice-panel__item-desc">{{ item.content }}</div>
        <div class="dashboard-notice-panel__item-time">
          {{ t('dashboard.panels.notice.publishTime', { time: item.publishTime }) }}
        </div>
      </div>
    </div>
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
