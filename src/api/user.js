/**
 * 学习注释：
 * 1. 文件角色：这是用户相关的独立接口封装文件，用来集中管理用户维度的请求逻辑。
 * 2. 所在分层：接口调用层：把业务接口按模块组织，供页面直接调用。
 * 3. 当前文件主要依赖：request, { deleteRequest, getRequest, postRequest, putRequest } <- src/request/index.js
 * 4. 当前文件对外暴露：命名导出：getUserListApi、getUserDetailApi、createUserApi、updateUserApi、deleteUserApi
 * 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import request, { deleteRequest, getRequest, postRequest, putRequest } from '@/request'

// 用户列表查询。
// GET 请求里最常见的是把筛选条件放到 params 中。
export function getUserListApi(params = {}) {
  return getRequest('/system/user/list', params)
}

// 获取用户详情。
// 这里演示另一种常见写法：直接使用 request 实例的 get 方法。
export function getUserDetailApi(userId) {
  return request.get(`/system/user/${userId}`)
}

// 新增用户。
// POST 请求通常用于提交创建数据。
export function createUserApi(data = {}) {
  return postRequest('/system/user', data)
}

// 更新用户。
// PUT 请求通常用于提交整体更新内容。
export function updateUserApi(userId, data = {}) {
  return putRequest(`/system/user/${userId}`, data)
}

// 删除用户。
// DELETE 请求常见两种传参方式：路径参数或 query 参数。
// 这里演示“路径 + query”的组合写法。
export function deleteUserApi(userId, params = {}) {
  return deleteRequest(`/system/user/${userId}`, params)
}
