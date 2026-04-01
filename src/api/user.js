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
