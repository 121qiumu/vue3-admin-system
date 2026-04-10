/**
 * 学习注释：
 * 1. 文件角色：这是某个业务模块的 mock 实现文件，负责用本地假数据模拟接口行为。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：{ findMockAccountByLogin, findMockAccountByToken, getMockLoginAccountList } <- src/mock/data/account.js；{ createMockError } <- src/mock/helper.js
 * 4. 当前文件对外暴露：命名导出：mockLogin、mockGetUserInfo、mockLogout、mockLoginAccountList
 * 5. 常见上游调用方：src/api/auth.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import {
  findMockAccountByLogin,
  findMockAccountByToken,
  getMockLoginAccountList
} from '@/mock/data/account'
import { createMockError } from '@/mock/helper'

// 模拟登录接口。
// 正常情况下，登录接口通常只返回 token，不会一次性把全部用户信息都带回来。
export function mockLogin(loginForm = {}) {
  const matchedAccount = findMockAccountByLogin(loginForm)

  if (!matchedAccount) {
    throw createMockError('用户名或密码错误，请重新输入')
  }

  return {
    token: matchedAccount.token,
    tokenType: 'Bearer'
  }
}

// 模拟获取当前登录用户信息接口。
// 这里根据 token 反查账号，再返回用户基础信息和页面级权限码。
export function mockGetUserInfo(token = '') {
  const matchedAccount = findMockAccountByToken(token)

  if (!matchedAccount) {
    throw createMockError('登录状态已失效，请重新登录')
  }

  return matchedAccount.userInfo
}

// 模拟退出登录接口。
export function mockLogout() {
  return {
    success: true
  }
}

// 登录页展示用的演示账号列表。
export const mockLoginAccountList = getMockLoginAccountList()
