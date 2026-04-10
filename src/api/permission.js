/**
 * 学习注释：
 * 1. 文件角色：这是权限数据相关接口封装文件，主要负责菜单、权限码等数据请求。
 * 2. 所在分层：接口调用层：把业务接口按模块组织，供页面直接调用。
 * 3. 当前文件主要依赖：request <- src/request/index.js；{ createMockRequest, isMockEnabled } <- src/mock/index.js；{ mockGetButtonPermissionList, mockGetMenuList } <- src/mock/modules/permission.js
 * 4. 当前文件对外暴露：命名导出：getMenuListApi、getButtonPermissionApi
 * 5. 常见上游调用方：src/views/login/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
