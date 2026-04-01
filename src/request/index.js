import axios from 'axios'
import { ElMessage } from 'element-plus'

import {
  HTTP_STATUS,
  REQUEST_SUCCESS_CODE_LIST,
  SERVER_EXCEPTION_STATUS_LIST
} from '@/constants/http'
import {
  getAccessToken,
  getHttpStatusMessage,
  getResponseMessage,
  handleBusinessErrorCode,
  handleServerException,
  handleUnauthorized,
  shouldReturnRawResponse
} from './helper'

// 创建统一的 axios 实例。
// 后续整个项目只要是“真实接口请求”，都建议走这一份实例。
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

// 请求拦截器。
// 这里主要做两件事：
// 1. 统一补充 token
// 2. 统一保留请求扩展位，方便后续加租户信息、语言标识等头部
request.interceptors.request.use(
  (config) => {
    const nextConfig = { ...config }
    const accessToken = getAccessToken()

    if (!nextConfig.headers) {
      nextConfig.headers = {}
    }

    // 默认自动携带 token。
    // 如果某个接口明确不需要 token，可以在业务层传 isToken: false 关闭它。
    if (accessToken && nextConfig.headers.isToken !== false) {
      nextConfig.headers.Authorization = `Bearer ${accessToken}`
    }

    // 这个自定义字段只是给前端拦截器自己用，
    // 不需要真的发给后端，所以这里顺手删掉，避免污染请求头。
    if ('isToken' in nextConfig.headers) {
      delete nextConfig.headers.isToken
    }

    return nextConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器。
// 这里统一处理 3 类情况：
// 1. 文件下载等需要原样返回的响应
// 2. 正常 JSON 业务响应
// 3. HTTP 层异常和 token 失效
request.interceptors.response.use(
  async (response) => {
    if (shouldReturnRawResponse(response.config)) {
      return response.data
    }

    const responseData = response.data

    // 如果后端没有返回 code 字段，就按“普通 JSON 数据”直接返回。
    // 这样可以兼容一些简单接口，避免为了统一格式强行包一层。
    if (!responseData || typeof responseData !== 'object' || !('code' in responseData)) {
      return responseData
    }

    const businessCode = Number(responseData.code)

    if (REQUEST_SUCCESS_CODE_LIST.includes(businessCode)) {
      return responseData.data !== undefined ? responseData.data : responseData
    }

    const errorMessage = getResponseMessage(responseData)
    await handleBusinessErrorCode(businessCode, errorMessage, response.config)
    return Promise.reject(new Error(errorMessage))
  },
  async (error) => {
    const responseStatus = error.response?.status
    const responseData = error.response?.data || {}

    // 网络断开、接口服务没启动、跨域失败这类场景，通常拿不到 response。
    if (!responseStatus) {
      const message = '网络异常，请检查本地服务或接口连接'
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }

    const errorMessage = getHttpStatusMessage(responseStatus, responseData)

    if (responseStatus === HTTP_STATUS.UNAUTHORIZED) {
      await handleUnauthorized(errorMessage)
      return Promise.reject(new Error(errorMessage))
    }

    if (responseStatus === HTTP_STATUS.FORBIDDEN) {
      await handleBusinessErrorCode(HTTP_STATUS.FORBIDDEN, errorMessage, error.config)
      return Promise.reject(new Error(errorMessage))
    }

    if (SERVER_EXCEPTION_STATUS_LIST.includes(responseStatus)) {
      await handleServerException(errorMessage, error.config || {})
      return Promise.reject(new Error(errorMessage))
    }

    ElMessage.error(errorMessage)
    return Promise.reject(error)
  }
)

// 下面这些是最常用的 4 个请求方法。
// 虽然 axios 实例本身已经自带 get/post/put/delete，
// 但这里再单独导出一层，能让学习者更容易理解参数该怎么传。
export function getRequest(url, params = {}, config = {}) {
  return request.get(url, {
    ...config,
    params
  })
}

export function postRequest(url, data = {}, config = {}) {
  return request.post(url, data, config)
}

export function putRequest(url, data = {}, config = {}) {
  return request.put(url, data, config)
}

export function deleteRequest(url, params = {}, config = {}) {
  return request.delete(url, {
    ...config,
    params
  })
}

export default request
