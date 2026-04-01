<template>
  <div class="dashboard-page">
    <section v-if="loadErrorMessage" class="dashboard-page__error-section">
      <AppStatus
        type="error"
        mode="page"
        title="首页数据加载失败"
        :description="loadErrorMessage"
        tip="你可以点击下面的按钮重新加载工作台数据。"
      >
        <template #actions>
          <el-button :loading="loading" type="primary" @click="loadDashboardData()">
            重新加载
          </el-button>
        </template>
      </AppStatus>
    </section>

    <template v-else>
      <DashboardWelcomeCard :display-name="displayName" :welcome-data="dashboardData.welcome" />

      <section class="dashboard-page__section">
        <div class="dashboard-page__section-header">
          <div>
            <div class="dashboard-page__section-title">运营概览</div>
            <div class="dashboard-page__section-desc">
              首页数据由 mock 接口返回，不同角色会看到不同统计内容。
            </div>
          </div>

          <el-button
            :loading="loading"
            type="primary"
            plain
            @click="loadDashboardData({ showSuccessMessage: true })"
          >
            刷新首页
          </el-button>
        </div>

        <div class="dashboard-page__stat-grid">
          <DashboardStatCard
            v-for="item in dashboardData.statCardList"
            :key="item.key"
            :item="item"
          />
        </div>
      </section>

      <section class="dashboard-page__content-grid">
        <DashboardShortcutPanel
          :shortcut-list="dashboardData.shortcutList"
          @select="handleShortcutSelect"
        />

        <DashboardNoticePanel :notice-list="dashboardData.noticeList" />
      </section>

      <section class="dashboard-page__bottom-grid">
        <DashboardRecentActionPanel :action-list="dashboardData.recentActionList" />
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { getDashboardDataApi } from '@/api/dashboard'
import AppStatus from '@/components/common/AppStatus.vue'
import { useUserStore } from '@/store/modules/user'

import DashboardNoticePanel from './components/DashboardNoticePanel.vue'
import DashboardRecentActionPanel from './components/DashboardRecentActionPanel.vue'
import DashboardShortcutPanel from './components/DashboardShortcutPanel.vue'
import DashboardStatCard from './components/DashboardStatCard.vue'
import DashboardWelcomeCard from './components/DashboardWelcomeCard.vue'

function createEmptyDashboardData() {
  return {
    welcome: {
      greeting: '欢迎回来',
      subtitle: '首页数据加载中，请稍候。',
      roleLabel: '工作台',
      lastLoginAt: '--',
      workspaceTip: '正在准备今天的工作台信息。',
      focusTagList: [],
      overviewList: []
    },
    statCardList: [],
    shortcutList: [],
    recentActionList: [],
    noticeList: []
  }
}

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const loadErrorMessage = ref('')
const dashboardData = ref(createEmptyDashboardData())

const displayName = computed(() => {
  return userStore.displayName
})

// 拉取首页数据。
// 页面层只关心“拿到数据并渲染”，至于数据来自 mock 还是真实接口，
// 统一交给 api 层决定。
async function loadDashboardData(options = {}) {
  const { showSuccessMessage = false } = options

  if (!userStore.token) {
    return
  }

  loading.value = true
  loadErrorMessage.value = ''

  try {
    const result = await getDashboardDataApi(userStore.token)
    dashboardData.value = {
      ...createEmptyDashboardData(),
      ...result
    }

    if (showSuccessMessage) {
      ElMessage.success('首页数据已刷新')
    }
  } catch (error) {
    dashboardData.value = createEmptyDashboardData()
    loadErrorMessage.value = error.message || '获取首页数据失败，请稍后重试'
    ElMessage.error(loadErrorMessage.value)
  } finally {
    loading.value = false
  }
}

// 首页快捷入口支持两类行为：
// 1. route：直接跳转已有页面
// 2. action：先用消息提示模拟真实业务动作
async function handleShortcutSelect(item = {}) {
  if (item.type === 'route' && item.path) {
    router.push(item.path)
    return
  }

  if (item.actionKey === 'refresh-dashboard') {
    await loadDashboardData({ showSuccessMessage: true })
    return
  }

  const shortcutMessageMap = {
    'permission-audit': '权限巡检页会在后续业务模块中继续补齐，这里先保留快捷入口。',
    'publish-notice': '公告管理通常会在系统管理模块继续扩展，这里先用 mock 说明首页结构。',
    'content-calendar': '内容日历能力当前先做入口预留，后续接真实业务模块时再补页面。',
    'publish-draft': '待发布稿件页通常属于内容管理模块，这里先保留入口位。'
  }

  ElMessage.info(shortcutMessageMap[item.actionKey] || '该快捷入口当前先做结构预留。')
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped lang="less">
.dashboard-page {
  display: grid;
  gap: var(--app-space-lg);
}

.dashboard-page__section,
.dashboard-page__content-grid,
.dashboard-page__bottom-grid,
.dashboard-page__error-section {
  min-width: 0;
}

.dashboard-page__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-md);
  margin-bottom: var(--app-space-md);
}

.dashboard-page__section-title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.dashboard-page__section-desc {
  margin-top: 4px;
  color: var(--app-color-text-secondary);
}

.dashboard-page__stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--app-space-md);
}

.dashboard-page__content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: var(--app-space-md);
}

.dashboard-page__bottom-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (max-width: 1200px) {
  .dashboard-page__stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-page__content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-page__section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-page__stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
