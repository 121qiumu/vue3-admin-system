/**
 * 学习注释：
 * 1. 文件角色：这是某个业务模块的 mock 实现文件，负责用本地假数据模拟接口行为。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：{ findMockAccountByToken } <- src/mock/data/account.js；{ getMockDashboardDataByRole } <- src/mock/data/dashboard.js；{ createMockError } <- src/mock/helper.js
 * 4. 当前文件对外暴露：命名导出：mockGetDashboardData
 * 5. 常见上游调用方：src/api/dashboard.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { findMockAccountByToken } from '@/mock/data/account'
import { getMockDashboardDataByRole } from '@/mock/data/dashboard'
import { createMockError } from '@/mock/helper'

// 模拟获取 Dashboard 首页数据。
// 这里先通过 token 找到当前账号，再根据角色返回不同首页内容。
export function mockGetDashboardData(token = '') {
  const matchedAccount = findMockAccountByToken(token)

  if (!matchedAccount) {
    throw createMockError('登录状态已失效，无法获取首页数据')
  }

  const roleCode = Array.isArray(matchedAccount.userInfo.roleCodeList)
    ? matchedAccount.userInfo.roleCodeList[0]
    : ''

  return getMockDashboardDataByRole(roleCode)
}
