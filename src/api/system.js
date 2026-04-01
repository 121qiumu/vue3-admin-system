import request from '@/request'
import { createMockRequest, isMockEnabled } from '@/mock'
import {
  mockDeleteMenu,
  mockDeleteRole,
  mockDeleteUser,
  mockGetMenuDetail,
  mockGetMenuPage,
  mockGetMenuParentOptionList,
  mockGetRoleDetail,
  mockGetRoleOptionList,
  mockGetRolePage,
  mockGetUserDetail,
  mockGetUserPage,
  mockSaveMenu,
  mockSaveRole,
  mockSaveUser
} from '@/mock/modules/system'

// 下面这一组接口统一服务“通用业务页面模板”示例。
// 当前开发环境默认走本地 mock，后续切真实后端时只需要关闭 VITE_USE_MOCK。

export function getUserPageApi(params = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetUserPage(params), 350)
  }

  return request.get('/system/user/page', { params })
}

export function getUserDetailApi(userId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetUserDetail(userId), 300)
  }

  return request.get(`/system/user/${userId}`)
}

export function saveUserApi(payload = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockSaveUser(payload), 350)
  }

  return payload.id
    ? request.put(`/system/user/${payload.id}`, payload)
    : request.post('/system/user', payload)
}

export function deleteUserApi(userId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockDeleteUser(userId), 250)
  }

  return request.delete(`/system/user/${userId}`)
}

export function getRolePageApi(params = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetRolePage(params), 350)
  }

  return request.get('/system/role/page', { params })
}

export function getRoleDetailApi(roleId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetRoleDetail(roleId), 300)
  }

  return request.get(`/system/role/${roleId}`)
}

export function saveRoleApi(payload = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockSaveRole(payload), 350)
  }

  return payload.id
    ? request.put(`/system/role/${payload.id}`, payload)
    : request.post('/system/role', payload)
}

export function deleteRoleApi(roleId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockDeleteRole(roleId), 250)
  }

  return request.delete(`/system/role/${roleId}`)
}

export function getMenuPageApi(params = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetMenuPage(params), 350)
  }

  return request.get('/system/menu/page', { params })
}

export function getMenuDetailApi(menuId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetMenuDetail(menuId), 300)
  }

  return request.get(`/system/menu/${menuId}`)
}

export function saveMenuApi(payload = {}) {
  if (isMockEnabled()) {
    return createMockRequest(() => mockSaveMenu(payload), 350)
  }

  return payload.id
    ? request.put(`/system/menu/${payload.id}`, payload)
    : request.post('/system/menu', payload)
}

export function deleteMenuApi(menuId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockDeleteMenu(menuId), 250)
  }

  return request.delete(`/system/menu/${menuId}`)
}

export function getRoleOptionListApi() {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetRoleOptionList(), 200)
  }

  return request.get('/system/role/options')
}

export function getMenuParentOptionListApi(currentMenuId = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetMenuParentOptionList(currentMenuId), 200)
  }

  return request.get('/system/menu/parent-options', {
    params: {
      currentMenuId
    }
  })
}
