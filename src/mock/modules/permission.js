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
