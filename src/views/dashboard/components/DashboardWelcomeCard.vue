<template>
  <el-card shadow="never" class="dashboard-welcome-card">
    <div class="dashboard-welcome-card__content">
      <div class="dashboard-welcome-card__main">
        <div class="dashboard-welcome-card__eyebrow">
          {{ welcomeData.greeting }}，{{ displayName }}
        </div>

        <div class="dashboard-welcome-card__title">{{ t('dashboard.welcome.title') }}</div>
        <div class="dashboard-welcome-card__desc">{{ welcomeData.subtitle }}</div>

        <div class="dashboard-welcome-card__meta">
          <el-tag type="primary" effect="light">{{ welcomeData.roleLabel }}</el-tag>
          <span class="dashboard-welcome-card__meta-text">
            {{ t('dashboard.welcome.lastLogin', { time: welcomeData.lastLoginAt }) }}
          </span>
        </div>

        <div class="dashboard-welcome-card__tip">{{ welcomeData.workspaceTip }}</div>

        <div class="dashboard-welcome-card__tag-list">
          <el-tag v-for="item in welcomeData.focusTagList" :key="item" effect="plain" round>
            {{ item }}
          </el-tag>
        </div>
      </div>

      <div class="dashboard-welcome-card__overview">
        <div
          v-for="item in welcomeData.overviewList"
          :key="item.label"
          class="dashboard-welcome-card__overview-item"
        >
          <div class="dashboard-welcome-card__overview-label">{{ item.label }}</div>
          <div class="dashboard-welcome-card__overview-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是首页里的一个可复用面板或卡片组件，专门给 dashboard 页面服务。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ useI18n } <- vue-i18n
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/views/dashboard/index.vue
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  displayName: {
    type: String,
    default: '同学'
  },
  welcomeData: {
    type: Object,
    default: () => ({
      greeting: '欢迎回来',
      subtitle: '今天也继续加油。',
      roleLabel: '访客',
      lastLoginAt: '--',
      workspaceTip: '暂无提示信息。',
      focusTagList: [],
      overviewList: []
    })
  }
})
</script>

<style scoped lang="less">
.dashboard-welcome-card {
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(64, 158, 255, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(64, 158, 255, 0.12) 0%, rgba(103, 194, 58, 0.08) 100%),
    var(--app-color-bg-container);
  border: var(--app-border-width) solid
    color-mix(in srgb, var(--app-color-primary) 16%, var(--app-color-border-light));
}

.dashboard-welcome-card__content {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 0.9fr);
  gap: var(--app-space-xl);
}

.dashboard-welcome-card__eyebrow {
  font-size: var(--app-font-size-base);
  font-weight: 600;
  color: var(--app-color-primary);
}

.dashboard-welcome-card__title {
  margin-top: var(--app-space-sm);
  font-size: 28px;
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.dashboard-welcome-card__desc {
  margin-top: var(--app-space-sm);
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

.dashboard-welcome-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-md);
}

.dashboard-welcome-card__meta-text {
  color: var(--app-color-text-secondary);
}

.dashboard-welcome-card__tip {
  margin-top: var(--app-space-md);
  font-size: var(--app-font-size-medium);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.dashboard-welcome-card__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-md);
}

.dashboard-welcome-card__overview {
  display: grid;
  gap: var(--app-space-md);
  align-content: center;
}

.dashboard-welcome-card__overview-item {
  padding: var(--app-space-lg);
  background-color: color-mix(in srgb, var(--app-color-bg-container) 78%, #ffffff);
  border: var(--app-border-width) solid
    color-mix(in srgb, var(--app-color-primary) 12%, var(--app-color-border-light));
  border-radius: var(--app-radius-large);
}

.dashboard-welcome-card__overview-label {
  color: var(--app-color-text-secondary);
}

.dashboard-welcome-card__overview-value {
  margin-top: var(--app-space-sm);
  font-size: 28px;
  font-weight: 700;
  color: var(--app-color-text-primary);
}

@media (max-width: 992px) {
  .dashboard-welcome-card__content {
    grid-template-columns: 1fr;
  }
}
</style>
