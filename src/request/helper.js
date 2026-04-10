/**
 * 学习注释：
 * 1. 文件角色：这是请求层辅助方法文件，负责登录失效跳转、错误文案整理、服务器异常处理等边界逻辑。
 * 2. 所在分层：请求基础设施层。
 * 3. 当前文件主要依赖：router、user/tabs store、权限清理、国际化文案、HTTP 状态码常量。
 * 4. 当前文件对外暴露：getAccessToken、handleUnauthorized、getResponseMessage、getHttpStatusMessage、shouldReturnRawResponse、handleServerException、handleBusinessErrorCode。
 * 5. 常见上游调用方：src/request/index.js。
 * 6. 阅读建议：把它理解成“请求层的收尾工具箱”，专门处理各种异常场景。
 */
import { ElMessage } from 'element-plus'

import router from '@/router'
import pinia from '@/store'
import { clearPermissionRoutes } from '@/permission'
import {
  HTTP_STATUS,
  HTTP_STATUS_MESSAGE_MAP,
  SERVER_EXCEPTION_STATUS_LIST
} from '@/constants/http'
import { getLocaleFromRouteLike, resolveLocalePath } from '@/locales/resolve'
import { translate } from '@/locales/helper'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

let redirectingToLogin = false
let redirectingToServerErrorPage = false

export function getAccessToken() {
  const userStore = useUserStore(pinia)
  return userStore.token || ''
}

export async function handleUnauthorized(
  message = translate('permission.messages.expired', {}, '登录状态已失效，请重新登录')
) {
  const userStore = useUserStore(pinia)
  const tabsStore = useTabsStore(pinia)

  userStore.clearUserState()
  clearPermissionRoutes()
  tabsStore.resetTabsState()

  if (!redirectingToLogin) {
    redirectingToLogin = true

    const currentRoute = router.currentRoute.value
    const currentLocale = getLocaleFromRouteLike(currentRoute)
    const isLoginPage = currentRoute.path === resolveLocalePath('/login', currentLocale)
    const redirect =
      currentRoute.fullPath && !isLoginPage
        ? `?redirect=${encodeURIComponent(currentRoute.fullPath)}`
        : ''

    ElMessage.error(message)
    await router.replace(`${resolveLocalePath('/login', currentLocale)}${redirect}`)

    window.setTimeout(() => {
      redirectingToLogin = false
    }, 100)
  }
}

export function getResponseMessage(
  responseData = {},
  fallbackMessage = translate('common.messages.requestFailed', {}, '请求失败，请稍后重试')
) {
  return responseData.message || responseData.msg || responseData.error || fallbackMessage
}

export function getHttpStatusMessage(status, responseData = {}) {
  return getResponseMessage(
    responseData,
    HTTP_STATUS_MESSAGE_MAP[status] || translate('common.messages.requestFailed')
  )
}

export function shouldReturnRawResponse(config = {}) {
  return ['blob', 'arraybuffer'].includes(config.responseType)
}

export async function handleServerException(
  message = translate('error.500.description', {}, '系统异常，请稍后重试'),
  config = {}
) {
  ElMessage.error(message)

  const hasToken = Boolean(getAccessToken())
  const shouldRedirectToErrorPage = Boolean(config.showErrorPage) && hasToken
  const currentRoute = router.currentRoute.value
  const currentLocale = getLocaleFromRouteLike(currentRoute)

  if (
    shouldRedirectToErrorPage &&
    currentRoute.path !== resolveLocalePath('/500', currentLocale) &&
    !redirectingToServerErrorPage
  ) {
    redirectingToServerErrorPage = true
    await router.replace(resolveLocalePath('/500', currentLocale))

    window.setTimeout(() => {
      redirectingToServerErrorPage = false
    }, 100)
  }

  throw new Error(message)
}

export async function handleBusinessErrorCode(code, message, config = {}) {
  const currentLocale = getLocaleFromRouteLike(router.currentRoute.value)

  if (code === HTTP_STATUS.UNAUTHORIZED) {
    await handleUnauthorized(message)
    throw new Error(message)
  }

  if (code === HTTP_STATUS.FORBIDDEN) {
    ElMessage.error(message)

    if (router.currentRoute.value.path !== resolveLocalePath('/403', currentLocale)) {
      await router.replace(resolveLocalePath('/403', currentLocale))
    }

    throw new Error(message)
  }

  if (SERVER_EXCEPTION_STATUS_LIST.includes(Number(code))) {
    await handleServerException(message, config)
    throw new Error(message)
  }

  ElMessage.error(message)
  throw new Error(message)
}
