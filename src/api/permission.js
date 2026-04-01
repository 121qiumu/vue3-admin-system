import request from '@/request'
import { createMockRequest, isMockEnabled } from '@/mock'
import { mockGetButtonPermissionList, mockGetMenuList } from '@/mock/modules/permission'

// 获取当前账号的动态菜单。
// 当前返回的是“需要根据权限动态显示”的菜单树。
export function getMenuListApi(token = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetMenuList(token), 400)
  }

  return request.get('/permission/menu')
}

// 获取当前账号的按钮权限码列表。
export function getButtonPermissionApi(token = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetButtonPermissionList(token), 300)
  }

  return request.get('/permission/button-codes')
}
