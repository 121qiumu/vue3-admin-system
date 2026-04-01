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
