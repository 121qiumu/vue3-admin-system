/**
 * 学习注释：
 * 1. 文件角色：这是某个业务模块的 mock 实现文件，负责用本地假数据模拟接口行为。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：{ getMenuDetailData, getMenuParentOptionList, getRoleDetailData, getRoleOptionList, getUserDetailData, queryMenuPageData, queryRolePageData, queryUserPageData, removeMenuData, removeRoleData, removeUserData, saveMenuData, saveRoleData, saveUserData } <- src/mock/data/system.js
 * 4. 当前文件对外暴露：命名导出：mockGetUserPage、mockGetUserDetail、mockSaveUser、mockDeleteUser、mockGetRolePage、mockGetRoleDetail、mockSaveRole、mockDeleteRole、mockGetMenuPage、mockGetMenuDetail、mockSaveMenu、mockDeleteMenu、mockGetRoleOptionList、mockGetMenuParentOptionList
 * 5. 常见上游调用方：src/api/system.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import {
  getMenuDetailData,
  getMenuParentOptionList,
  getRoleDetailData,
  getRoleOptionList,
  getUserDetailData,
  queryMenuPageData,
  queryRolePageData,
  queryUserPageData,
  removeMenuData,
  removeRoleData,
  removeUserData,
  saveMenuData,
  saveRoleData,
  saveUserData
} from '@/mock/data/system'

// 系统管理模块 mock 接口。
// 这里把“数据读取”和“接口出口”分开，后续更容易切真实后端。
export function mockGetUserPage(query = {}) {
  return queryUserPageData(query)
}

export function mockGetUserDetail(userId = '') {
  return getUserDetailData(userId)
}

export function mockSaveUser(payload = {}) {
  return saveUserData(payload)
}

export function mockDeleteUser(userId = '') {
  return removeUserData(userId)
}

export function mockGetRolePage(query = {}) {
  return queryRolePageData(query)
}

export function mockGetRoleDetail(roleId = '') {
  return getRoleDetailData(roleId)
}

export function mockSaveRole(payload = {}) {
  return saveRoleData(payload)
}

export function mockDeleteRole(roleId = '') {
  return removeRoleData(roleId)
}

export function mockGetMenuPage(query = {}) {
  return queryMenuPageData(query)
}

export function mockGetMenuDetail(menuId = '') {
  return getMenuDetailData(menuId)
}

export function mockSaveMenu(payload = {}) {
  return saveMenuData(payload)
}

export function mockDeleteMenu(menuId = '') {
  return removeMenuData(menuId)
}

export function mockGetRoleOptionList() {
  return getRoleOptionList()
}

export function mockGetMenuParentOptionList(currentMenuId = '') {
  return getMenuParentOptionList(currentMenuId)
}
