<template>
  <div class="login-page">
    <div class="login-page__mesh" />
    <div class="login-page__orb login-page__orb--cyan" />
    <div class="login-page__orb login-page__orb--amber" />

    <header class="login-toolbar">
      <div class="login-toolbar__brand">
        <div class="login-toolbar__brand-mark">
          <el-icon>
            <IconEpMonitor />
          </el-icon>
        </div>

        <div class="login-toolbar__brand-text">
          <div class="login-toolbar__brand-title">{{ t('login.badge') }}</div>
          <div class="login-toolbar__brand-subtitle">{{ t('login.hero.toolbarSubtitle') }}</div>
        </div>
      </div>

      <div class="login-toolbar__actions">
        <button
          v-for="item in localeOptions"
          :key="item.value"
          type="button"
          class="login-toolbar__locale-button"
          :class="{ 'is-active': item.value === language }"
          :aria-pressed="item.value === language"
          @click="handleLocaleSwitch(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </header>

    <main class="login-shell">
      <section class="login-story">
        <div class="login-story__eyebrow">{{ t('login.hero.eyebrow') }}</div>
        <h1 class="login-story__title">{{ t('login.title') }}</h1>
        <p class="login-story__description">{{ t('login.description') }}</p>

        <div class="login-story__metrics">
          <article v-for="item in highlightMetricList" :key="item.key" class="login-story__metric">
            <div class="login-story__metric-value">{{ item.value }}</div>
            <div class="login-story__metric-label">{{ item.label }}</div>
          </article>
        </div>

        <section class="login-story__stage">
          <div class="login-story__stage-tag">{{ t('login.hero.stageTag') }}</div>
          <h2 class="login-story__stage-title">{{ t('login.hero.stageTitle') }}</h2>
          <p class="login-story__stage-description">{{ t('login.hero.stageDescription') }}</p>

          <div class="login-story__feature-list">
            <article
              v-for="item in featureCardList"
              :key="item.key"
              class="login-story__feature-card"
            >
              <div class="login-story__feature-index">{{ item.index }}</div>
              <div class="login-story__feature-content">
                <div class="login-story__feature-title">{{ item.title }}</div>
                <p class="login-story__feature-description">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section class="login-auth">
        <div class="login-auth__card">
          <div class="login-auth__header">
            <div class="login-auth__badge">{{ t('login.card.mockTag') }}</div>
            <h2 class="login-auth__title">{{ t('login.card.title') }}</h2>
            <p class="login-auth__subtitle">{{ t('login.card.subtitle') }}</p>
          </div>

          <div class="login-auth__notice">
            <div class="login-auth__notice-icon">
              <el-icon>
                <IconEpInfoFilled />
              </el-icon>
            </div>

            <div class="login-auth__notice-content">
              <div class="login-auth__notice-title">{{ t('login.card.alertTitle') }}</div>
              <p class="login-auth__notice-text">{{ t('login.card.alert') }}</p>
            </div>
          </div>

          <el-form
            ref="loginFormRef"
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
            label-position="top"
            @keyup.enter="handleLogin"
          >
            <el-form-item :label="t('login.form.username')" prop="username">
              <el-input
                v-model.trim="loginForm.username"
                size="large"
                :placeholder="t('login.form.usernamePlaceholder')"
                clearable
              >
                <template #prefix>
                  <el-icon>
                    <IconEpUser />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item :label="t('login.form.password')" prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                size="large"
                :placeholder="t('login.form.passwordPlaceholder')"
                show-password
                clearable
              >
                <template #prefix>
                  <el-icon>
                    <IconEpLock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-button
              class="login-form__submit"
              type="primary"
              size="large"
              :loading="loginLoading"
              @click="handleLogin"
            >
              {{ loginLoading ? t('login.form.submitting') : t('login.form.submit') }}
            </el-button>
          </el-form>

          <div class="login-auth__helper">
            <div class="login-auth__helper-title">{{ t('login.card.helperTitle') }}</div>
            <p class="login-auth__helper-text">{{ t('login.card.helperText') }}</p>
          </div>

          <div class="account-panel">
            <div class="account-panel__header">
              <div>
                <div class="account-panel__title">{{ t('login.accountPanel.title') }}</div>
                <div class="account-panel__tip">{{ t('login.accountPanel.tip') }}</div>
              </div>

              <div v-if="currentAccount" class="account-panel__current">
                <span class="account-panel__current-label">{{
                  t('login.accountPanel.current')
                }}</span>
                <span class="account-panel__current-name">{{ currentAccount.nickname }}</span>
              </div>
            </div>

            <div class="account-list">
              <button
                v-for="account in mockAccountList"
                :key="account.username"
                type="button"
                class="account-card"
                :class="{ 'is-active': account.username === loginForm.username.trim() }"
                :aria-pressed="account.username === loginForm.username.trim()"
                @click="fillAccount(account)"
              >
                <div class="account-card__header">
                  <div class="account-card__identity">
                    <div class="account-card__name-row">
                      <span class="account-card__name">{{ account.nickname }}</span>
                      <span class="account-card__action">{{
                        t('login.accountPanel.fillAction')
                      }}</span>
                    </div>
                    <div class="account-card__account">{{ account.username }}</div>
                  </div>

                  <div class="account-card__tag-list">
                    <el-tag
                      v-for="role in account.roleCodeList"
                      :key="`${account.username}-${role}`"
                      size="small"
                      effect="plain"
                    >
                      {{ getRoleLabel(role, role) }}
                    </el-tag>
                  </div>
                </div>

                <div class="account-card__credentials">
                  <div class="account-card__credential">
                    <span>{{ t('login.accountPanel.account') }}</span>
                    <strong>{{ account.username }}</strong>
                  </div>
                  <div class="account-card__credential">
                    <span>{{ t('login.accountPanel.password') }}</span>
                    <strong>{{ account.password }}</strong>
                  </div>
                </div>

                <div class="account-card__meta">
                  <span class="account-card__meta-item">
                    {{ t('login.accountPanel.asyncMenuCount', { count: account.asyncMenuCount }) }}
                  </span>
                  <span class="account-card__meta-item">
                    {{
                      t('login.accountPanel.buttonPermissionCount', {
                        count: account.buttonPermissionCount
                      })
                    }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { getLoginAccountListApi } from '@/api/auth'
import { getButtonPermissionApi, getMenuListApi } from '@/api/permission'
import { useLocale } from '@/hooks/useLocale'
import { getRoleLabel } from '@/locales/helper'
import { clearPermissionRoutes, rebuildPermissionRoutes } from '@/permission'
import { showAuthMessage } from '@/utils/feedback'
import { usePermissionStore } from '@/store/modules/permission'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { language, localeOptions, changeLocale, toLocalePath } = useLocale()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()

const loginFormRef = ref(null)
const loginLoading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const mockAccountList = ref([])

const loginRules = computed(() => ({
  username: [
    {
      required: true,
      message: t('login.validation.usernameRequired'),
      trigger: 'blur'
    },
    {
      min: 3,
      max: 20,
      message: t('login.validation.usernameLength'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: t('login.validation.passwordRequired'),
      trigger: 'blur'
    },
    {
      min: 6,
      max: 20,
      message: t('login.validation.passwordLength'),
      trigger: 'blur'
    }
  ]
}))

const featureCardList = computed(() => [
  {
    key: 'mockDriven',
    index: '01',
    title: t('login.featureList.mockDriven.title'),
    description: t('login.featureList.mockDriven.description')
  },
  {
    key: 'switchBackend',
    index: '02',
    title: t('login.featureList.switchBackend.title'),
    description: t('login.featureList.switchBackend.description')
  },
  {
    key: 'permission',
    index: '03',
    title: t('login.featureList.permission.title'),
    description: t('login.featureList.permission.description')
  }
])

const highlightMetricList = computed(() => {
  const totalAsyncMenuCount = mockAccountList.value.reduce(
    (sum, item) => sum + (item.asyncMenuCount || 0),
    0
  )
  const totalButtonPermissionCount = mockAccountList.value.reduce(
    (sum, item) => sum + (item.buttonPermissionCount || 0),
    0
  )

  return [
    {
      key: 'accounts',
      value: String(mockAccountList.value.length).padStart(2, '0'),
      label: t('login.hero.metrics.accounts')
    },
    {
      key: 'menus',
      value: String(totalAsyncMenuCount).padStart(2, '0'),
      label: t('login.hero.metrics.menus')
    },
    {
      key: 'permissions',
      value: String(totalButtonPermissionCount).padStart(2, '0'),
      label: t('login.hero.metrics.permissions')
    }
  ]
})

const currentAccount = computed(() => {
  const currentUsername = loginForm.username.trim()
  return mockAccountList.value.find((item) => item.username === currentUsername) || null
})

function getRedirectPath() {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
  return redirect ? toLocalePath(redirect) : toLocalePath('/dashboard')
}

async function loadMockAccountList() {
  try {
    mockAccountList.value = await getLoginAccountListApi()
  } catch (error) {
    mockAccountList.value = []
    console.warn('[login] ' + t('login.messages.loadMockAccountFailed'), error)
  }
}

async function handleLocaleSwitch(nextLocale) {
  if (nextLocale === language.value) {
    return
  }

  await changeLocale(nextLocale)
}

function fillAccount(account) {
  loginForm.username = account.username
  loginForm.password = account.password
}

async function handleLogin() {
  if (!loginFormRef.value || loginLoading.value) {
    return
  }

  const valid = await loginFormRef.value.validate().catch(() => false)

  if (!valid) {
    return
  }

  loginLoading.value = true

  try {
    await userStore.loginAction({
      username: loginForm.username.trim(),
      password: loginForm.password
    })

    const userInfo = await userStore.fetchUserInfoAction()
    const currentToken = userStore.token

    const [menuRouteList, buttonPermissionList] = await Promise.all([
      getMenuListApi(currentToken),
      getButtonPermissionApi(currentToken)
    ])

    permissionStore.buildPermissionState({
      permissionCodeList: userInfo.permissionCodeList || [],
      menuRouteList,
      buttonPermissionList
    })

    rebuildPermissionRoutes()
    tabsStore.resetTabsState()

    showAuthMessage({
      type: 'success',
      title: t('login.messages.loginSuccessTitle'),
      message: t('login.messages.loginSuccess', {
        name: userInfo.nickname || userInfo.username
      })
    })
    await router.replace(getRedirectPath())
  } catch (error) {
    userStore.clearUserState()
    clearPermissionRoutes()
    tabsStore.resetTabsState()

    showAuthMessage({
      type: 'error',
      title: t('login.messages.loginFailedTitle'),
      message: error?.message || t('login.messages.loginFailed')
    })
  } finally {
    loginLoading.value = false
  }
}

onMounted(async () => {
  await loadMockAccountList()

  if (userStore.isLogin) {
    router.replace(getRedirectPath())
  }
})
</script>

<style scoped lang="less">
.login-page {
  --login-text: #f8fafc;
  --login-text-muted: rgba(226, 232, 240, 0.78);
  --login-panel-bg: rgba(8, 21, 38, 0.72);
  --login-panel-border: rgba(148, 163, 184, 0.18);
  --login-surface: rgba(255, 255, 255, 0.96);
  --login-surface-soft: rgba(248, 250, 252, 0.84);
  --login-surface-line: rgba(148, 163, 184, 0.2);
  --login-accent: #38bdf8;
  --login-accent-strong: #f59e0b;
  position: relative;
  min-height: 100vh;
  padding: 28px clamp(20px, 4vw, 40px) 40px;
  overflow: hidden;
  background:
    radial-gradient(circle at 10% 0%, rgba(56, 189, 248, 0.18), transparent 28%),
    radial-gradient(circle at 92% 18%, rgba(245, 158, 11, 0.18), transparent 24%),
    linear-gradient(135deg, #081120 0%, #0f172a 52%, #131e33 100%);
  font-family: 'Avenir Next', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.login-page__mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.96) 36%, transparent 82%);
  pointer-events: none;
  opacity: 0.55;
}

.login-page__orb {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.44;
  pointer-events: none;
}

.login-page__orb--cyan {
  top: -120px;
  left: -100px;
  background: rgba(56, 189, 248, 0.42);
}

.login-page__orb--amber {
  right: -120px;
  bottom: -120px;
  background: rgba(245, 158, 11, 0.32);
}

.login-toolbar,
.login-shell {
  position: relative;
  z-index: 1;
  max-width: 1320px;
  margin-right: auto;
  margin-left: auto;
}

.login-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.login-toolbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.login-toolbar__brand-mark {
  display: inline-flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #ffffff;
  background: linear-gradient(140deg, #0ea5e9 0%, #2563eb 60%, #f59e0b 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.22);
}

.login-toolbar__brand-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--login-text);
}

.login-toolbar__brand-subtitle {
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: rgba(191, 219, 254, 0.72);
  text-transform: uppercase;
}

.login-toolbar__actions {
  display: inline-flex;
  gap: 10px;
}

.login-toolbar__locale-button {
  padding: 9px 14px;
  cursor: pointer;
  font-size: 13px;
  color: rgba(226, 232, 240, 0.82);
  background: rgba(15, 23, 42, 0.34);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  transition:
    transform var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    background-color var(--app-transition-duration) var(--app-transition-timing),
    color var(--app-transition-duration) var(--app-transition-timing);
}

.login-toolbar__locale-button:hover,
.login-toolbar__locale-button.is-active {
  color: #ffffff;
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(125, 211, 252, 0.56);
  transform: translateY(-1px);
}

.login-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(420px, 540px);
  gap: clamp(24px, 3vw, 40px);
  align-items: center;
  min-height: calc(100vh - 118px);
  margin-top: 24px;
}

.login-story {
  display: grid;
  gap: 24px;
  animation: login-fade-up 0.72s ease both;
}

.login-story__eyebrow {
  width: fit-content;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #bfdbfe;
  background: rgba(15, 23, 42, 0.42);
  border: 1px solid rgba(125, 211, 252, 0.24);
  border-radius: 999px;
  text-transform: uppercase;
}

.login-story__title {
  max-width: 760px;
  margin: 0;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.08;
  color: var(--login-text);
}

.login-story__description {
  max-width: 720px;
  margin: 0;
  font-size: 18px;
  line-height: 1.9;
  color: var(--login-text-muted);
}

.login-story__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.login-story__metric {
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 22px;
  backdrop-filter: blur(16px);
}

.login-story__metric-value {
  font-size: clamp(30px, 3vw, 38px);
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
}

.login-story__metric-label {
  margin-top: 10px;
  font-size: 13px;
  color: rgba(226, 232, 240, 0.72);
}

.login-story__stage {
  padding: 28px;
  background: var(--login-panel-bg);
  border: 1px solid var(--login-panel-border);
  border-radius: 28px;
  backdrop-filter: blur(18px);
  box-shadow: 0 28px 60px rgba(2, 8, 23, 0.18);
}

.login-story__stage-tag {
  width: fit-content;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fef3c7;
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.22);
  border-radius: 999px;
  text-transform: uppercase;
}

.login-story__stage-title {
  margin: 18px 0 0;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  color: var(--login-text);
}

.login-story__stage-description {
  max-width: 720px;
  margin: 14px 0 0;
  line-height: 1.9;
  color: var(--login-text-muted);
}

.login-story__feature-list {
  display: grid;
  gap: 14px;
  margin-top: 24px;
}

.login-story__feature-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  align-items: flex-start;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 22px;
}

.login-story__feature-index {
  display: inline-flex;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(140deg, rgba(14, 165, 233, 0.32), rgba(37, 99, 235, 0.08));
  border: 1px solid rgba(125, 211, 252, 0.18);
  border-radius: 18px;
}

.login-story__feature-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--login-text);
}

.login-story__feature-description {
  margin: 8px 0 0;
  line-height: 1.85;
  color: var(--login-text-muted);
}

.login-auth {
  display: flex;
  justify-content: flex-end;
  animation: login-fade-up 0.72s ease 0.08s both;
}

.login-auth__card {
  width: 100%;
  padding: 32px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 252, 0.94) 100%);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 30px;
  box-shadow: 0 30px 72px rgba(2, 8, 23, 0.28);
  backdrop-filter: blur(18px);
}

.login-auth__badge {
  display: inline-flex;
  align-items: center;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0f766e;
  background: rgba(15, 118, 110, 0.08);
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 999px;
  text-transform: uppercase;
}

.login-auth__title {
  margin: 16px 0 0;
  font-size: 32px;
  line-height: 1.14;
  color: #0f172a;
}

.login-auth__subtitle {
  margin: 12px 0 0;
  line-height: 1.8;
  color: #475569;
}

.login-auth__notice {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  gap: 14px;
  margin-top: 24px;
  padding: 18px;
  background: rgba(14, 165, 233, 0.07);
  border: 1px solid rgba(56, 189, 248, 0.14);
  border-radius: 22px;
}

.login-auth__notice-icon {
  display: inline-flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #0ea5e9;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 16px;
}

.login-auth__notice-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.login-auth__notice-text {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.8;
  color: #475569;
}

.login-form {
  margin-top: 28px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.login-form :deep(.el-form-item__label) {
  margin-bottom: 8px;
  font-weight: 700;
  color: #0f172a;
}

.login-form :deep(.el-input__wrapper) {
  min-height: 54px;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.22) inset;
  transition:
    box-shadow var(--app-transition-duration) var(--app-transition-timing),
    transform var(--app-transition-duration) var(--app-transition-timing);
}

.login-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.36) inset;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  box-shadow:
    0 0 0 1px rgba(14, 165, 233, 0.78) inset,
    0 0 0 4px rgba(56, 189, 248, 0.14);
}

.login-form :deep(.el-input__inner) {
  color: #0f172a;
}

.login-form__submit {
  width: 100%;
  height: 54px;
  margin-top: 6px;
  font-weight: 700;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #0f766e 0%, #2563eb 56%, #f59e0b 100%);
  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.22);
}

.login-form__submit:hover,
.login-form__submit:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 22px 42px rgba(37, 99, 235, 0.26);
}

.login-auth__helper {
  margin-top: 24px;
  padding: 16px 18px;
  background: var(--login-surface-soft);
  border: 1px solid var(--login-surface-line);
  border-radius: 20px;
}

.login-auth__helper-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.login-auth__helper-text {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.8;
  color: #64748b;
}

.account-panel {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.account-panel__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.account-panel__title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.account-panel__tip {
  margin-top: 8px;
  font-size: 13px;
  color: #64748b;
}

.account-panel__current {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(15, 118, 110, 0.08);
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 999px;
}

.account-panel__current-label {
  font-size: 12px;
  color: #0f766e;
}

.account-panel__current-name {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}

.account-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.account-card {
  width: 100%;
  padding: 18px;
  color: inherit;
  text-align: left;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.05);
  transition:
    transform var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    box-shadow var(--app-transition-duration) var(--app-transition-timing),
    background-color var(--app-transition-duration) var(--app-transition-timing);
}

.account-card:hover,
.account-card.is-active {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 22px 38px rgba(37, 99, 235, 0.12);
  transform: translateY(-2px);
}

.account-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.account-card__name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.account-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}

.account-card__action {
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
  border-radius: 999px;
  text-transform: uppercase;
}

.account-card__account {
  margin-top: 8px;
  font-size: 13px;
  color: #64748b;
}

.account-card__tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.account-card__credentials {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.account-card__credential {
  display: grid;
  gap: 6px;
  padding: 12px 14px;
  background: rgba(248, 250, 252, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;
}

.account-card__credential span {
  font-size: 12px;
  color: #64748b;
}

.account-card__credential strong {
  font-size: 14px;
  color: #0f172a;
}

.account-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.account-card__meta-item {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  font-size: 12px;
  color: #475569;
  background: rgba(241, 245, 249, 0.88);
  border-radius: 999px;
}

@keyframes login-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1180px) {
  .login-page {
    padding-right: 24px;
    padding-left: 24px;
  }

  .login-shell {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .login-auth {
    justify-content: stretch;
    order: -1;
  }

  .login-auth__card {
    max-width: 760px;
  }

  .account-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 18px 16px 28px;
  }

  .login-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .login-toolbar__actions {
    flex-wrap: wrap;
  }

  .login-story__metrics,
  .account-list,
  .account-card__credentials {
    grid-template-columns: 1fr;
  }

  .login-story__stage,
  .login-auth__card {
    padding: 24px;
    border-radius: 24px;
  }

  .login-story__feature-card,
  .login-auth__notice {
    grid-template-columns: 1fr;
  }

  .account-panel__header,
  .account-card__header,
  .account-card__name-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .account-card__tag-list {
    justify-content: flex-start;
  }
}
</style>
