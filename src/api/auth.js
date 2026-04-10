/**
 * 学习注释：
 * 1. 文件角色：这是认证相关接口封装文件，主要负责登录、获取用户信息、退出登录等请求。
 * 2. 所在分层：接口调用层：把业务接口按模块组织，供页面直接调用。
 * 3. 当前文件主要依赖：request <- src/request/index.js；{ createMockRequest, isMockEnabled } <- src/mock/index.js；{ mockGetUserInfo, mockLogin, mockLoginAccountList, mockLogout } <- src/mock/modules/auth.js
 * 4. 当前文件对外暴露：命名导出：loginApi、getUserInfoApi、logoutApi、getLoginAccountListApi
 * 5. 常见上游调用方：src/store/modules/user.js、src/views/login/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
