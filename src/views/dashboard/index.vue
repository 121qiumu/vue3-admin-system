<template>
  <div class="dashboard-page">
    <section v-if="loadErrorMessage" class="dashboard-page__error-section">
      <AppStatus
        type="error"
        mode="page"
        :title="t('dashboard.page.loadFailedTitle')"
        :description="loadErrorMessage"
        :tip="t('dashboard.page.loadFailedTip')"
      >
        <template #actions>
          <el-button :loading="loading" type="primary" @click="loadDashboardData()">
            {{ t('common.actions.reload') }}
          </el-button>
        </template>
      </AppStatus>
    </section>

    <template v-else>
      <DashboardWelcomeCard :display-name="displayName" :welcome-data="dashboardData.welcome" />

      <section class="dashboard-page__section">
        <div class="dashboard-page__section-header">
          <div>
            <div class="dashboard-page__section-title">{{ t('dashboard.page.overviewTitle') }}</div>
            <div class="dashboard-page__section-desc">{{ t('dashboard.page.overviewDesc') }}</div>
          </div>

          <el-button
            :loading="loading"
            type="primary"
            plain
            @click="loadDashboardData({ showSuccessMessage: true })"
          >
            {{ t('dashboard.page.refresh') }}
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
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { getDashboardDataApi } from '@/api/dashboard'
import { useLocale } from '@/hooks/useLocale'
import AppStatus from '@/components/common/AppStatus.vue'
import { useUserStore } from '@/store/modules/user'

import DashboardNoticePanel from './components/DashboardNoticePanel.vue'
import DashboardRecentActionPanel from './components/DashboardRecentActionPanel.vue'
import DashboardShortcutPanel from './components/DashboardShortcutPanel.vue'
import DashboardStatCard from './components/DashboardStatCard.vue'
import DashboardWelcomeCard from './components/DashboardWelcomeCard.vue'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()
const { toLocalePath } = useLocale()
const loading = ref(false)
const loadErrorMessage = ref('')
const dashboardData = ref(createEmptyDashboardData())

function createEmptyDashboardData() {
  return {
    welcome: {
      greeting: t('common.actions.backHome', {}, '娆㈣繋鍥炴潵'),
      subtitle: '',
      roleLabel: '',
      lastLoginAt: '--',
      workspaceTip: '',
      focusTagList: [],
      overviewList: []
    },
    statCardList: [],
    shortcutList: [],
    recentActionList: [],
    noticeList: []
  }
}

const displayName = computed(() => {
  return userStore.displayName
})

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
      ElMessage.success(t('dashboard.page.refreshSuccess'))
    }
  } catch (error) {
    dashboardData.value = createEmptyDashboardData()
    loadErrorMessage.value = error.message || t('common.messages.loadFailed')
    ElMessage.error(loadErrorMessage.value)
  } finally {
    loading.value = false
  }
}

async function handleShortcutSelect(item = {}) {
  if (item.type === 'route' && item.path) {
    router.push(toLocalePath(item.path))
    return
  }

  if (item.actionKey === 'refresh-dashboard') {
    await loadDashboardData({ showSuccessMessage: true })
    return
  }

  const shortcutMessageMap = {
    'permission-audit': t('dashboard.shortcutMessages.permissionAudit'),
    'publish-notice': t('dashboard.shortcutMessages.publishNotice'),
    'content-calendar': t('dashboard.shortcutMessages.contentCalendar'),
    'publish-draft': t('dashboard.shortcutMessages.publishDraft')
  }

  ElMessage.info(shortcutMessageMap[item.actionKey] || t('dashboard.shortcutMessages.placeholder'))
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
