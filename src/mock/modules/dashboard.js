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
