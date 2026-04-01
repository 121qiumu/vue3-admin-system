import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { getUserInfoApi, loginApi, logoutApi } from '@/api/auth'
import { USER_STORAGE_KEY } from '@/constants/storage'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

// 创建默认用户信息对象。
// 单独抽成方法的好处是：重置状态时可以随时拿到一份干净的新对象。
function createDefaultUserInfo() {
  return {
    userId: '',
    username: '',
    nickname: '',
    avatar: '',
    roleCodeList: [],
    permissionCodeList: []
  }
}

export const useUserStore = defineStore('user', () => {
  // 用户 token。
  // 登录成功后，会把后端返回的 token 存在这里。
  const token = ref('')

  // 用户信息对象。
  // 后续可以继续扩展手机号、邮箱、部门、岗位等字段。
  const userInfo = ref(createDefaultUserInfo())

  // 是否已登录。
  // 这里不额外保存一个布尔值，而是通过 token 直接推导，避免状态重复。
  const isLogin = computed(() => Boolean(token.value))

  // 用户展示名称。
  // 优先显示昵称，没有昵称时再显示用户名。
  const displayName = computed(() => {
    return userInfo.value.nickname || userInfo.value.username || '未登录用户'
  })

  // 持久化当前用户状态。
  // 只保存刷新后仍然有意义的数据，例如 token 和基础用户信息。
  function persistUserState() {
    setStorage(USER_STORAGE_KEY, {
      token: token.value,
      userInfo: userInfo.value
    })
  }

  // 设置 token。
  // 常见调用场景：
  // 1. 登录成功后保存 token
  // 2. 刷新 token 后更新 token
  function setToken(nextToken = '') {
    token.value = nextToken
    persistUserState()
  }

  // 设置用户信息。
  // 常见调用场景：登录后获取用户详情，或更新个人资料后同步到 store。
  function setUserInfo(nextUserInfo = {}) {
    userInfo.value = {
      ...createDefaultUserInfo(),
      ...nextUserInfo,
      roleCodeList: Array.isArray(nextUserInfo.roleCodeList) ? nextUserInfo.roleCodeList : [],
      permissionCodeList: Array.isArray(nextUserInfo.permissionCodeList)
        ? nextUserInfo.permissionCodeList
        : []
    }

    persistUserState()
  }

  // 调用登录接口。
  // 这一层只负责“请求登录并保存 token”，
  // 登录后的权限、菜单、动态路由生成，会在页面流程中继续往下执行。
  async function loginAction(loginForm = {}) {
    const loginResult = await loginApi(loginForm)

    setToken(loginResult.token || '')

    return loginResult
  }

  // 拉取当前登录用户信息。
  // 常见调用场景：
  // 1. 登录成功后立刻获取用户详情
  // 2. 页面刷新后重新恢复用户相关展示信息
  async function fetchUserInfoAction() {
    if (!token.value) {
      throw new Error('当前没有可用的 token，请先登录')
    }

    const userInfoResult = await getUserInfoApi(token.value)

    setUserInfo(userInfoResult)

    return userInfoResult
  }

  // 更新登录态。
  // 这是一个示例 action，用来演示“登录成功后统一更新用户状态”的写法。
  function updateLoginState(payload = {}) {
    setToken(payload.token || '')
    setUserInfo(payload.userInfo || {})
  }

  // 清空用户状态。
  // 常见调用场景：
  // 1. 用户主动退出登录
  // 2. token 失效后强制退出
  function clearUserState() {
    token.value = ''
    userInfo.value = createDefaultUserInfo()
    removeStorage(USER_STORAGE_KEY)
  }

  // 退出登录。
  // 当前先调用 mock 退出接口，然后统一清空本地登录态。
  async function logoutAction() {
    try {
      await logoutApi()
    } finally {
      clearUserState()
    }
  }

  // 从本地缓存恢复用户状态。
  // 页面刷新后，项目启动时会调用它，让 token 和用户信息恢复回来。
  function restoreUserState() {
    const cachedState = getStorage(USER_STORAGE_KEY, null)

    if (!cachedState) {
      clearUserState()
      return
    }

    token.value = cachedState.token || ''
    userInfo.value = {
      ...createDefaultUserInfo(),
      ...(cachedState.userInfo || {}),
      roleCodeList: Array.isArray(cachedState.userInfo?.roleCodeList)
        ? cachedState.userInfo.roleCodeList
        : [],
      permissionCodeList: Array.isArray(cachedState.userInfo?.permissionCodeList)
        ? cachedState.userInfo.permissionCodeList
        : []
    }
  }

  return {
    token,
    userInfo,
    isLogin,
    displayName,
    setToken,
    setUserInfo,
    loginAction,
    fetchUserInfoAction,
    updateLoginState,
    clearUserState,
    logoutAction,
    restoreUserState
  }
})
