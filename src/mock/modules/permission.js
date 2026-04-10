/**
 * 学习注释：
 * 1. 文件角色：这是某个业务模块的 mock 实现文件，负责用本地假数据模拟接口行为。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：{ findMockAccountByToken } <- src/mock/data/account.js；{ createMockError } <- src/mock/helper.js
 * 4. 当前文件对外暴露：命名导出：mockGetMenuList、mockGetButtonPermissionList
 * 5. 常见上游调用方：src/api/permission.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { findMockAccountByToken } from '@/mock/data/account'
import { createMockError } from '@/mock/helper'

// 模拟获取菜单接口。
// 当前返回的是“动态业务菜单”，静态首页菜单仍由本地静态路由提供。
export function mockGetMenuList(token = '') {
  const matchedAccount = findMockAccountByToken(token)

  if (!matchedAccount) {
    throw createMockError('登录状态已失效，无法获取菜单数据')
  }

  return matchedAccount.asyncMenuList
}

// 模拟获取按钮权限接口。
// 后续做按钮级权限指令时，可以直接复用这份返回结构。
export function mockGetButtonPermissionList(token = '') {
  const matchedAccount = findMockAccountByToken(token)

  if (!matchedAccount) {
    throw createMockError('登录状态已失效，无法获取按钮权限')
  }

  return matchedAccount.buttonPermissionList
}
