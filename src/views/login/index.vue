<template>
  <div class="login-page">
    <div class="login-page__glow login-page__glow--left" />
    <div class="login-page__glow login-page__glow--right" />

    <div class="login-panel">
      <section class="login-brand">
        <div class="login-brand__badge">
          <el-icon>
            <IconEpMonitor />
          </el-icon>
          <span>Vue 3 通用后台模板</span>
        </div>

        <h1 class="login-brand__title">从 0 到 1 搭建一个真正能跑的后台管理系统</h1>
        <p class="login-brand__desc">
          当前第 10 步继续完善本地 mock
          体系，让登录、用户信息、菜单、按钮权限都能在没有真实后端时完整跑通。
        </p>

        <div class="login-brand__feature-list">
          <div class="brand-feature-card">
            <div class="brand-feature-card__title">本地 mock 主导开发</div>
            <div class="brand-feature-card__desc">
              当前开发环境默认启用 mock，方便前端先把页面、状态和权限流程跑顺。
            </div>
          </div>

          <div class="brand-feature-card">
            <div class="brand-feature-card__title">接口层可随时切真后端</div>
            <div class="brand-feature-card__desc">
              API 层按环境决定走 mock 还是走真实 request，不会和某个 mock 工具强耦合。
            </div>
          </div>

          <div class="brand-feature-card">
            <div class="brand-feature-card__title">菜单与按钮权限分离</div>
            <div class="brand-feature-card__desc">
              admin 和 editor 拿到的动态菜单、按钮权限码都不同，后续做按钮级权限会更自然。
            </div>
          </div>
        </div>
      </section>

      <section class="login-card-wrap">
        <div class="login-card">
          <div class="login-card__header">
            <div>
              <div class="login-card__title">账号登录</div>
              <div class="login-card__sub-title">使用 Element Plus 表单完成后台系统登录体验</div>
            </div>

            <el-tag type="primary" effect="light">开发环境默认启用 Mock</el-tag>
          </div>

          <el-alert
            class="login-card__alert"
            type="info"
            :closable="false"
            show-icon
            title="当前阶段先使用本地 mock 接口，后续切真实后端时只需要关闭 VITE_USE_MOCK 并替换接口地址。"
          />

          <el-form
            ref="loginFormRef"
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
            label-position="top"
            @keyup.enter="handleLogin"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model.trim="loginForm.username"
                size="large"
                placeholder="请输入用户名"
                clearable
              >
                <template #prefix>
                  <el-icon>
                    <IconEpUser />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                size="large"
                placeholder="请输入密码"
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
              {{ loginLoading ? '正在登录，请稍候...' : '登录系统' }}
            </el-button>
          </el-form>

          <div class="account-panel">
            <div class="account-panel__header">
              <div class="account-panel__title">可直接体验的 mock 账号</div>
              <div class="account-panel__tip">点击账号卡片可自动填充表单</div>
            </div>

            <div class="account-list">
              <button
                v-for="account in mockAccountList"
                :key="account.username"
                type="button"
                class="account-card"
                @click="fillAccount(account)"
              >
                <div class="account-card__header">
                  <span class="account-card__name">{{ account.nickname }}</span>
                  <el-tag size="small" effect="plain">{{ account.username }}</el-tag>
                </div>

                <div class="account-card__row">账号：{{ account.username }}</div>
                <div class="account-card__row">密码：{{ account.password }}</div>

                <div class="account-card__tag-list">
                  <el-tag
                    v-for="role in account.roleCodeList"
                    :key="`${account.username}-${role}`"
                    size="small"
                    type="success"
                    effect="light"
                  >
                    {{ role }}
                  </el-tag>

                  <el-tag size="small" type="primary" effect="light">
                    动态菜单 {{ account.asyncMenuCount }} 组
                  </el-tag>

                  <el-tag size="small" type="warning" effect="light">
                    按钮权限 {{ account.buttonPermissionCount }} 项
                  </el-tag>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { getLoginAccountListApi } from '@/api/auth'
import { getButtonPermissionApi, getMenuListApi } from '@/api/permission'
import { clearPermissionRoutes, rebuildPermissionRoutes } from '@/permission'
import { usePermissionStore } from '@/store/modules/permission'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()

// 表单实例。
const loginFormRef = ref(null)

// 登录按钮加载状态。
const loginLoading = ref(false)

// 登录表单数据。
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

// 登录页展示的 mock 账号列表。
const mockAccountList = ref([])

// Element Plus 表单校验规则。
const loginRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 20,
      message: '用户名长度建议控制在 3 到 20 个字符之间',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 20,
      message: '密码长度建议控制在 6 到 20 个字符之间',
      trigger: 'blur'
    }
  ]
}

function getRedirectPath() {
  const redirect = route.query.redirect

  if (typeof redirect === 'string' && redirect && redirect !== '/login') {
    return redirect
  }

  return '/dashboard'
}

// 读取演示账号列表。
async function loadMockAccountList() {
  try {
    mockAccountList.value = await getLoginAccountListApi()
  } catch (error) {
    mockAccountList.value = []
    console.warn('[login] 获取 mock 账号列表失败', error)
  }
}

// 点击账号卡片后，快速填充表单。
function fillAccount(account) {
  loginForm.username = account.username
  loginForm.password = account.password
}

// 执行登录。
// 当前完整流程分成 6 步：
// 1. 表单校验
// 2. 登录拿 token
// 3. 获取用户信息
// 4. 获取菜单和按钮权限
// 5. 生成权限菜单与动态路由
// 6. 跳转到目标页面
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

    // 把接口返回的权限码、菜单、按钮权限统一交给 permission store。
    permissionStore.buildPermissionState({
      permissionCodeList: userInfo.permissionCodeList || [],
      menuRouteList,
      buttonPermissionList
    })

    rebuildPermissionRoutes()

    // 切换账号时，先把旧标签页清掉，避免把上一个账号的页面状态带过来。
    tabsStore.resetTabsState()

    ElMessage.success(`登录成功，欢迎回来：${userInfo.nickname || userInfo.username}`)
    await router.replace(getRedirectPath())
  } catch (error) {
    // 如果登录流程中间任意一步失败，就把本地登录态和权限状态一起清理干净。
    userStore.clearUserState()
    clearPermissionRoutes()
    tabsStore.resetTabsState()

    ElMessage.error(error?.message || '登录失败，请稍后重试')
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
  position: relative;
  min-height: 100vh;
  padding: 40px;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(64, 158, 255, 0.2), transparent 28%),
    radial-gradient(circle at right bottom, rgba(24, 144, 255, 0.16), transparent 24%),
    linear-gradient(135deg, var(--app-color-bg-page) 0%, var(--app-color-bg-container) 100%);
}

.login-page__glow {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
  opacity: 0.45;
}

.login-page__glow--left {
  top: -120px;
  left: -120px;
  background: rgba(64, 158, 255, 0.35);
}

.login-page__glow--right {
  right: -120px;
  bottom: -120px;
  background: rgba(24, 144, 255, 0.28);
}

.login-panel {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(320px, 1.1fr) minmax(360px, 520px);
  gap: 28px;
  align-items: stretch;
  min-height: calc(100vh - 80px);
}

.login-brand,
.login-card {
  border: 1px solid var(--app-color-border-light);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  box-shadow: var(--app-shadow-lg);
}

.login-brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px;
  color: var(--app-color-text-primary);
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--app-color-primary) 12%, var(--app-color-bg-container)) 0%,
    color-mix(in srgb, var(--app-color-bg-container) 92%, transparent) 100%
  );
}

.login-brand__badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 8px 14px;
  margin-bottom: 24px;
  font-size: var(--app-font-size-small);
  color: var(--app-color-primary);
  background-color: color-mix(in srgb, var(--app-color-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--app-color-primary) 24%, transparent);
  border-radius: 999px;
}

.login-brand__title {
  margin: 0;
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.25;
}

.login-brand__desc {
  margin: 18px 0 0;
  font-size: var(--app-font-size-medium);
  line-height: 1.9;
  color: var(--app-color-text-secondary);
}

.login-brand__feature-list {
  display: grid;
  gap: 16px;
  margin-top: 36px;
}

.brand-feature-card {
  padding: 18px 20px;
  background-color: color-mix(in srgb, var(--app-color-bg-container) 86%, transparent);
  border: 1px solid var(--app-color-border-light);
  border-radius: 18px;
}

.brand-feature-card__title {
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.brand-feature-card__desc {
  margin-top: 10px;
  line-height: 1.8;
  color: var(--app-color-text-secondary);
}

.login-card-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  padding: 30px;
  background-color: color-mix(in srgb, var(--app-color-bg-container) 92%, transparent);
}

.login-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.login-card__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.login-card__sub-title {
  margin-top: 10px;
  line-height: 1.7;
  color: var(--app-color-text-secondary);
}

.login-card__alert {
  margin-top: 22px;
}

.login-form {
  margin-top: 24px;
}

.login-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.login-form__submit {
  width: 100%;
  margin-top: 8px;
}

.account-panel {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid var(--app-color-border-light);
}

.account-panel__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.account-panel__title {
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.account-panel__tip {
  font-size: var(--app-font-size-small);
  color: var(--app-color-text-secondary);
}

.account-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.account-card {
  width: 100%;
  padding: 16px;
  text-align: left;
  color: inherit;
  cursor: pointer;
  background-color: var(--app-color-bg-elevated);
  border: 1px solid var(--app-color-border-light);
  border-radius: 16px;
  transition:
    transform var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    box-shadow var(--app-transition-duration) var(--app-transition-timing);
}

.account-card:hover {
  border-color: color-mix(in srgb, var(--app-color-primary) 38%, transparent);
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
}

.account-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.account-card__name {
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.account-card__row {
  margin-top: 8px;
  font-size: var(--app-font-size-small);
  color: var(--app-color-text-secondary);
}

.account-card__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

@media (max-width: 1100px) {
  .login-page {
    padding: 24px;
  }

  .login-panel {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .login-brand {
    padding: 32px;
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 16px;
  }

  .login-brand,
  .login-card {
    padding: 22px;
    border-radius: 20px;
  }

  .login-card__header,
  .account-panel__header,
  .account-card__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .login-brand__title {
    font-size: 30px;
  }
}
</style>
