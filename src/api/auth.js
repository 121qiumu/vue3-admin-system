import request from '@/request'
import { createMockRequest, isMockEnabled } from '@/mock'
import { mockGetUserInfo, mockLogin, mockLoginAccountList, mockLogout } from '@/mock/modules/auth'

// 登录接口。
// 当前开发环境默认走本地 mock，后续切真实后端时只需要关闭 VITE_USE_MOCK。
export function loginApi(loginForm = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockLogin(loginForm), 800)
  }

  return request.post('/auth/login', loginForm, {
    headers: {
      isToken: false
    }
  })
}

// 获取当前登录用户信息接口。
export function getUserInfoApi(token = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetUserInfo(token), 500)
  }

  return request.get('/auth/user-info')
}

// 退出登录接口。
export function logoutApi() {
  if (isMockEnabled()) {
    return createMockRequest(() => mockLogout(), 300)
  }

  return request.post('/auth/logout', {})
}

// 获取登录页演示账号。
// 真实后端一般不需要这个接口，所以切到真实接口时直接返回空数组即可。
export function getLoginAccountListApi() {
  if (isMockEnabled()) {
    return createMockRequest(() => mockLoginAccountList, 200)
  }

  return Promise.resolve([])
}
