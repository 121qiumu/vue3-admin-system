/**
 * 学习注释：
 * 1. 文件角色：这是统一请求实例文件，负责创建 axios 实例，并集中处理 token、业务码、HTTP 异常。
 * 2. 所在分层：请求基础设施层。
 * 3. 当前文件主要依赖：axios、状态码常量、请求辅助方法、Element Plus 消息提示。
 * 4. 当前文件对外暴露：request、getRequest、postRequest、putRequest、deleteRequest。
 * 5. 常见上游调用方：src/api 目录下所有接口文件、src/utils/request.js。
 * 6. 阅读建议：按“创建实例 -> 请求拦截器 -> 响应拦截器 -> 导出常用方法”这个顺序阅读。
 */
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

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

request.interceptors.request.use(
  (config) => {
    const nextConfig = { ...config }
    const accessToken = getAccessToken()

    if (!nextConfig.headers) {
      nextConfig.headers = {}
    }

    if (accessToken && nextConfig.headers.isToken !== false) {
      nextConfig.headers.Authorization = `Bearer ${accessToken}`
    }

    // isToken 是前端自定义控制字段，不应该真正发给后端。
    if ('isToken' in nextConfig.headers) {
      delete nextConfig.headers.isToken
    }

    return nextConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  async (response) => {
    if (shouldReturnRawResponse(response.config)) {
      return response.data
    }

    const responseData = response.data

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
