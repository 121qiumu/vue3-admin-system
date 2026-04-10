<template>
  <header class="layout-header">
    <div class="layout-header__left">
      <slot name="brand" />

      <el-button
        v-if="showTrigger"
        class="layout-header__trigger"
        text
        @click="$emit('toggle-sidebar')"
      >
        <el-icon>
          <IconEpFold v-if="!isMobile && !sidebarCollapsed" />
          <IconEpExpand v-else />
        </el-icon>
      </el-button>

      <div v-if="showTitle || showBreadcrumb" class="layout-header__info">
        <div v-if="showTitle" class="layout-header__title">{{ pageTitle }}</div>
        <LayoutBreadcrumb v-if="showBreadcrumb" />
      </div>
    </div>

    <div v-if="$slots.center" class="layout-header__center">
      <slot name="center" />
    </div>

    <div class="layout-header__right">
      <button
        v-if="isMobile"
        type="button"
        class="layout-header__settings-button"
        @click="settingsDrawerVisible = true"
      >
        <span class="layout-header__settings-icon-wrap">
          <el-icon>
            <IconEpSetting />
          </el-icon>
        </span>

        <span class="layout-header__settings-meta">
          <span class="layout-header__settings-title">{{ t('layout.header.settings') }}</span>
          <span class="layout-header__settings-summary">{{ settingsSummary }}</span>
        </span>

        <el-icon class="layout-header__action-icon">
          <IconEpArrowRight />
        </el-icon>
      </button>

      <el-popover
        v-else
        placement="bottom-end"
        trigger="click"
        :width="440"
        :teleported="false"
        popper-class="layout-header__settings-popper"
      >
        <template #reference>
          <button type="button" class="layout-header__settings-button">
            <span class="layout-header__settings-icon-wrap">
              <el-icon>
                <IconEpSetting />
              </el-icon>
            </span>

            <span class="layout-header__settings-meta">
              <span class="layout-header__settings-title">{{ t('layout.header.settings') }}</span>
              <span class="layout-header__settings-summary">{{ settingsSummary }}</span>
            </span>

            <el-icon class="layout-header__action-icon">
              <IconEpArrowDown />
            </el-icon>
          </button>
        </template>

        <LayoutSettingsPanel />
      </el-popover>

      <el-dropdown
        trigger="click"
        placement="bottom-end"
        :teleported="false"
        @command="handleUserCommand"
      >
        <button type="button" class="layout-header__user">
          <div class="layout-header__user-avatar">{{ userInitial }}</div>

          <div class="layout-header__user-info">
            <div class="layout-header__user-name">{{ displayName }}</div>
            <div class="layout-header__user-role">{{ currentRoleLabel }}</div>
          </div>

          <el-icon class="layout-header__action-icon">
            <IconEpArrowDown />
          </el-icon>
        </button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="dashboard">{{
              t('layout.header.backHome')
            }}</el-dropdown-item>
            <el-dropdown-item command="logout" divided>{{
              t('layout.header.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>

  <el-drawer
    v-model="settingsDrawerVisible"
    class="layout-header__settings-drawer"
    :title="t('layout.header.settings')"
    direction="rtl"
    size="min(100vw, 440px)"
    append-to-body
  >
    <LayoutSettingsPanel />
  </el-drawer>

  <el-dialog
    v-model="logoutDialogVisible"
    :title="t('layout.header.logoutDialogTitle')"
    width="420px"
    append-to-body
    :close-on-click-modal="false"
  >
    <div class="layout-header__logout-dialog-text">
      {{ t('layout.header.logoutDialogText') }}
    </div>

    <template #footer>
      <div class="layout-header__logout-dialog-footer">
        <el-button @click="logoutDialogVisible = false">{{ t('common.actions.cancel') }}</el-button>
        <el-button type="danger" :loading="logoutLoading" @click="handleConfirmLogout">
          {{ t('layout.header.confirmLogout') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ computed, nextTick, ref } <- vue；{ useI18n } <- vue-i18n；{ useRoute, useRouter } <- vue-router；{ LAYOUT_MODE_OPTIONS } <- src/constants/layout.js；{ useLayout } <- src/hooks/useLayout.js；{ useLocale } <- src/hooks/useLocale.js；其余依赖 8 项
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/modes/LeftLayout.vue、src/layout/modes/MixLayout.vue、src/layout/modes/TopLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { LAYOUT_MODE_OPTIONS } from '@/constants/layout'
import { useLayout } from '@/hooks/useLayout'
import { useLocale } from '@/hooks/useLocale'
import { useTheme } from '@/hooks/useTheme'
import { getRoleLabel, getRouteTitle, translate } from '@/locales/helper'
import { clearPermissionRoutes } from '@/permission'
import { showAuthMessage } from '@/utils/feedback'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

import LayoutBreadcrumb from './LayoutBreadcrumb.vue'
import LayoutSettingsPanel from './LayoutSettingsPanel.vue'

defineProps({
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  showTrigger: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showBreadcrumb: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const tabsStore = useTabsStore()
const { layoutMode } = useLayout()
const { theme, themeOptions } = useTheme()
const { currentLocaleLabel, toLocalePath } = useLocale()
const settingsDrawerVisible = ref(false)
const logoutDialogVisible = ref(false)
const logoutLoading = ref(false)

const layoutModeOptions = computed(() => {
  return LAYOUT_MODE_OPTIONS.map((item) => ({
    ...item,
    label: translate(item.labelKey, {}, item.fallbackLabel),
    description: translate(item.descriptionKey, {}, item.fallbackDescription)
  }))
})

const pageTitle = computed(() => {
  return getRouteTitle(route) || t('app.title')
})

const currentLayoutLabel = computed(() => {
  return (
    layoutModeOptions.value.find((item) => item.value === layoutMode.value)?.label ||
    t('common.messages.unknownLayout')
  )
})

const currentThemeLabel = computed(() => {
  return (
    themeOptions.value.find((item) => item.value === theme.value)?.label ||
    t('common.messages.unknownTheme')
  )
})

const settingsSummary = computed(() => {
  return [currentLayoutLabel.value, currentThemeLabel.value, currentLocaleLabel.value].join(
    t('layout.header.settingsSummarySeparator')
  )
})

const displayName = computed(() => userStore.displayName)

const userInitial = computed(() => {
  return String(displayName.value || 'A')
    .slice(0, 1)
    .toUpperCase()
})

const currentRoleLabel = computed(() => {
  const firstRoleCode = userStore.userInfo.roleCodeList?.[0]
  return getRoleLabel(firstRoleCode, t('common.roles.backendUser'))
})

function handleUserCommand(command) {
  if (command === 'dashboard') {
    router.push(toLocalePath('/dashboard'))
    return
  }

  if (command === 'logout') {
    logoutDialogVisible.value = true
  }
}

async function handleConfirmLogout() {
  logoutLoading.value = true
  let logoutError = null

  try {
    await userStore.logoutAction()
  } catch (error) {
    logoutError = error
  }

  clearPermissionRoutes()
  tabsStore.resetTabsState()
  settingsDrawerVisible.value = false
  logoutDialogVisible.value = false
  logoutLoading.value = false
  await nextTick()

  showAuthMessage({
    type: logoutError ? 'warning' : 'success',
    title: logoutError
      ? t('layout.header.logoutWarningTitle')
      : t('layout.header.logoutSuccessTitle'),
    message: logoutError ? t('layout.header.logoutWarning') : t('layout.header.logoutSuccess')
  })

  await router.replace(toLocalePath('/login'))
}
</script>

<style scoped lang="less">
.layout-header {
  display: flex;
  align-items: center;
  gap: var(--app-space-md);
  min-height: var(--app-layout-header-height);
  padding: 0 var(--app-space-lg);
  color: var(--app-color-header-text);
  background-color: var(--app-color-header-bg);
  border-bottom: var(--app-border-width) solid var(--app-color-border-light);
}

.layout-header__left {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--app-space-sm);
}

.layout-header__center {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
}

.layout-header__right {
  display: flex;
  min-width: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  gap: var(--app-space-sm);
  margin-left: auto;
}

.layout-header__info {
  min-width: 0;
}

.layout-header__title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.layout-header__trigger {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.layout-header__settings-button,
.layout-header__user {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-sm);
  min-width: 0;
  padding: 6px 12px;
  cursor: pointer;
  color: inherit;
  text-align: left;
  background-color: var(--app-color-bg-container);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-round);
  outline: none;
  box-shadow: var(--app-shadow-sm);
  transition:
    background-color var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    box-shadow var(--app-transition-duration) var(--app-transition-timing),
    transform var(--app-transition-duration) var(--app-transition-timing);
}

.layout-header__settings-button:hover,
.layout-header__user:hover {
  border-color: color-mix(in srgb, var(--app-color-primary) 36%, var(--app-color-border-light));
  box-shadow: var(--app-shadow-base);
  transform: translateY(-1px);
}

.layout-header__settings-icon-wrap,
.layout-header__user-avatar {
  display: inline-flex;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.layout-header__settings-icon-wrap {
  font-size: 18px;
  color: var(--app-color-primary);
  background: color-mix(in srgb, var(--app-color-primary) 12%, var(--app-color-bg-page));
}

.layout-header__settings-meta,
.layout-header__user-info {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.layout-header__settings-title,
.layout-header__user-name {
  overflow: hidden;
  font-weight: 600;
  color: var(--app-color-text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-header__settings-summary,
.layout-header__user-role {
  margin-top: 2px;
  font-size: var(--app-font-size-extra-small);
  color: var(--app-color-text-secondary);
  white-space: nowrap;
}

.layout-header__user-avatar {
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, var(--app-color-primary) 0%, #67c23a 100%);
}

.layout-header__action-icon {
  margin-left: 2px;
  color: var(--app-color-text-secondary);
}

.layout-header__logout-dialog-text {
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

.layout-header__logout-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--app-space-sm);
}

:deep(.layout-header__settings-popper.el-popover) {
  padding: var(--app-space-md);
  background-color: var(--app-color-bg-container);
  border-color: var(--app-color-border-light);
  border-radius: var(--app-radius-large);
  box-shadow: var(--app-shadow-lg);
}

:deep(.layout-header__settings-drawer .el-drawer__header) {
  margin-bottom: 0;
  padding: var(--app-space-lg);
  color: var(--app-color-text-primary);
  border-bottom: var(--app-border-width) solid var(--app-color-border-light);
}

:deep(.layout-header__settings-drawer .el-drawer__body) {
  padding: var(--app-space-lg);
  background-color: var(--app-color-bg-container);
}

@media (max-width: 992px) {
  .layout-header {
    padding: 0 var(--app-space-md);
  }
}

@media (max-width: 768px) {
  .layout-header {
    flex-wrap: wrap;
    align-items: flex-start;
    padding: var(--app-space-sm) var(--app-space-md);
  }

  .layout-header__left {
    min-width: 0;
    flex: 1 1 auto;
  }

  .layout-header__center {
    order: 3;
    flex-basis: 100%;
    width: 100%;
  }

  .layout-header__right {
    gap: var(--app-space-xs);
  }

  .layout-header__settings-button,
  .layout-header__user {
    padding: 6px 10px;
  }

  .layout-header__settings-button {
    min-width: 0;
  }

  .layout-header__settings-meta,
  .layout-header__user-info {
    display: none;
  }
}
</style>
