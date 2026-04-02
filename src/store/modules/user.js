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
