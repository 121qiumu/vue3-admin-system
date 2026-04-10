/**
 * 学习注释：
 * 1. 文件角色：这是系统管理模块接口封装文件，用户、角色、菜单等页面都通过这里请求数据。
 * 2. 所在分层：接口调用层：把业务接口按模块组织，供页面直接调用。
 * 3. 当前文件主要依赖：request <- src/request/index.js；{ createMockRequest, isMockEnabled } <- src/mock/index.js；{ mockDeleteMenu, mockDeleteRole, mockDeleteUser, mockGetMenuDetail, mockGetMenuPage, mockGetMenuParentOptionList, mockGetRoleDetail, mockGetRoleOptionList, mockGetRolePage, mockGetUserDetail, mockGetUserPage, mockSaveMenu, mockSaveRole, mockSaveUser } <- src/mock/modules/system.js
 * 4. 当前文件对外暴露：命名导出：getUserPageApi、getUserDetailApi、saveUserApi、deleteUserApi、getRolePageApi、getRoleDetailApi、saveRoleApi、deleteRoleApi、getMenuPageApi、getMenuDetailApi、saveMenuApi、deleteMenuApi、getRoleOptionListApi、getMenuParentOptionListApi
 * 5. 常见上游调用方：src/views/system/menu/detail.vue、src/views/system/menu/form.vue、src/views/system/menu/index.vue、src/views/system/role/detail.vue、src/views/system/role/form.vue、src/views/system/role/index.vue 等，共 9 个上游引用文件
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
