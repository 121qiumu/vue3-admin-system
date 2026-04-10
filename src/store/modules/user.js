/**
 * 学习注释：
 * 1. 文件角色：这是用户 store，主要管理 token、用户信息、登录退出以及用户状态持久化。
 * 2. 所在分层：状态管理层。
 * 3. 当前文件主要依赖：auth 接口、本地存储工具、国际化提示。
 * 4. 当前文件对外暴露：useUserStore。
 * 5. 常见上游调用方：plugins/index.js、permission/guard.js、request/helper.js、布局头部组件。
 * 6. 阅读建议：先看 state，再看 login/fetch/restore 这些 action，最后看 return 暴露了哪些能力。
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { getUserInfoApi, loginApi, logoutApi } from '@/api/auth'
import { USER_STORAGE_KEY } from '@/constants/storage'
import { translate } from '@/locales/helper'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

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
  const token = ref('')
  const userInfo = ref(createDefaultUserInfo())
  const isLogin = computed(() => Boolean(token.value))

  const displayName = computed(() => {
    return userInfo.value.nickname || userInfo.value.username || translate('common.roles.visitor')
  })

  // 每当 token 或 userInfo 更新后，都同步写回 localStorage。
  // 这样刷新页面后还能恢复登录态。
  function persistUserState() {
    setStorage(USER_STORAGE_KEY, {
      token: token.value,
      userInfo: userInfo.value
    })
  }

  function setToken(nextToken = '') {
    token.value = nextToken
    persistUserState()
  }

  function setUserInfo(nextUserInfo = {}) {
    // 先和默认结构合并，避免接口缺字段时把 store 结构弄乱。
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

  async function loginAction(loginForm = {}) {
    const loginResult = await loginApi(loginForm)
    setToken(loginResult.token || '')
    return loginResult
  }

  // 当守卫发现“有 token 但用户信息为空”时，就会调用这里补拉一次用户资料。
  async function fetchUserInfoAction() {
    if (!token.value) {
      throw new Error(
        translate('permission.messages.expired', {}, '当前没有可用的 token，请先登录')
      )
    }

    const userInfoResult = await getUserInfoApi(token.value)
    setUserInfo(userInfoResult)
    return userInfoResult
  }

  function updateLoginState(payload = {}) {
    setToken(payload.token || '')
    setUserInfo(payload.userInfo || {})
  }

  function clearUserState() {
    token.value = ''
    userInfo.value = createDefaultUserInfo()
    removeStorage(USER_STORAGE_KEY)
  }

  async function logoutAction() {
    try {
      await logoutApi()
    } finally {
      // 无论后端退出接口是否成功，前端都要把本地状态清干净。
      clearUserState()
    }
  }

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
