import { ElMessage } from 'element-plus'

import router from '@/router'
import pinia from '@/store'
import { clearPermissionRoutes } from '@/permission'
import {
  HTTP_STATUS,
  HTTP_STATUS_MESSAGE_MAP,
  SERVER_EXCEPTION_STATUS_LIST
} from '@/constants/http'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

// 避免多个请求同时 401 时，重复弹提示、重复跳转登录页。
let redirectingToLogin = false

// 避免多个请求同时触发 500 页面跳转时，重复跳转。
let redirectingToServerErrorPage = false

// 统一获取当前登录 token。
// 请求拦截器里会用它把 token 自动加到请求头上。
export function getAccessToken() {
  const userStore = useUserStore(pinia)
  return userStore.token || ''
}

// 把当前登录状态清理掉，并跳转到登录页。
// 这个方法主要给“401 未登录 / token 失效”场景复用。
export async function handleUnauthorized(message = '登录状态已失效，请重新登录') {
  const userStore = useUserStore(pinia)
  const tabsStore = useTabsStore(pinia)

  userStore.clearUserState()
  clearPermissionRoutes()
  tabsStore.resetTabsState()

  if (!redirectingToLogin) {
    redirectingToLogin = true

    const currentRoute = router.currentRoute.value
    const isLoginPage = currentRoute.path === '/login'
    const redirect =
      currentRoute.fullPath && !isLoginPage
        ? `?redirect=${encodeURIComponent(currentRoute.fullPath)}`
        : ''

    ElMessage.error(message)
    await router.replace(`/login${redirect}`)

    window.setTimeout(() => {
      redirectingToLogin = false
    }, 100)
  }
}

// 统一从后端返回数据里提取错误消息。
// 这样无论后端返回的是 message、msg 还是 error，都能尽量兜住。
export function getResponseMessage(responseData = {}, fallbackMessage = '请求失败，请稍后重试') {
  return responseData.message || responseData.msg || responseData.error || fallbackMessage
}

// 根据 HTTP 状态码获取默认错误提示。
export function getHttpStatusMessage(status, responseData = {}) {
  return getResponseMessage(responseData, HTTP_STATUS_MESSAGE_MAP[status] || '请求失败，请稍后重试')
}

// 判断是否需要把响应内容原样返回。
// 常见场景是下载文件、导出 Excel、下载二进制流。
export function shouldReturnRawResponse(config = {}) {
  return ['blob', 'arraybuffer'].includes(config.responseType)
}

// 统一处理服务异常页跳转。
// 当前采用“按需进入 500 页面”的策略，避免所有请求错误都打断页面流程。
export async function handleServerException(message = '系统异常，请稍后重试', config = {}) {
  ElMessage.error(message)

  const hasToken = Boolean(getAccessToken())
  const shouldRedirectToErrorPage = Boolean(config.showErrorPage) && hasToken

  if (
    shouldRedirectToErrorPage &&
    router.currentRoute.value.path !== '/500' &&
    !redirectingToServerErrorPage
  ) {
    redirectingToServerErrorPage = true
    await router.replace('/500')

    window.setTimeout(() => {
      redirectingToServerErrorPage = false
    }, 100)
  }

  throw new Error(message)
}

// 统一处理响应层的业务错误码。
export async function handleBusinessErrorCode(code, message, config = {}) {
  if (code === HTTP_STATUS.UNAUTHORIZED) {
    await handleUnauthorized(message)
    throw new Error(message)
  }

  if (code === HTTP_STATUS.FORBIDDEN) {
    ElMessage.error(message)

    if (router.currentRoute.value.path !== '/403') {
      await router.replace('/403')
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
