import pinia from '@/store'
import { usePermissionStore } from '@/store/modules/permission'

function normalizePermissionValue(permissionValue) {
  if (!permissionValue) {
    return []
  }

  if (Array.isArray(permissionValue)) {
    return permissionValue.filter(Boolean)
  }

  return [permissionValue].filter(Boolean)
}

function getPermissionStore() {
  return usePermissionStore(pinia)
}

// 通用权限判断。
// mode = all 表示“必须同时拥有全部权限码”
// mode = any 表示“只要拥有其中一个权限码即可”
export function checkPermission(permissionValue, mode = 'all') {
  const permissionStore = getPermissionStore()
  const permissionList = normalizePermissionValue(permissionValue)

  if (permissionList.length === 0) {
    return false
  }

  if (mode === 'any') {
    return permissionList.some((code) => permissionStore.hasButtonPermission(code))
  }

  return permissionList.every((code) => permissionStore.hasButtonPermission(code))
}

// 判断是否拥有全部指定按钮权限。
// 常见场景：一个操作依赖多个权限点同时满足。
export function hasPermission(permissionValue) {
  return checkPermission(permissionValue, 'all')
}

// 判断是否拥有任意一个指定按钮权限。
// 常见场景：只要满足“新增 / 编辑 / 删除”中的任意一个，就显示操作列。
export function hasAnyPermission(permissionValue) {
  return checkPermission(permissionValue, 'any')
}

// 判断当前用户是否有访问目标路由的页面级权限。
// 路由守卫会复用这层逻辑，避免页面权限判断散在多个文件里。
export function hasRoutePermission(permissionCodeList = [], route) {
  if (!route) {
    return false
  }

  const requiredCodeList =
    route.matched?.flatMap((item) => {
      return Array.isArray(item.meta?.permissionCodes) ? item.meta.permissionCodes : []
    }) || []

  if (requiredCodeList.length === 0) {
    return true
  }

  return requiredCodeList.every((code) => permissionCodeList.includes(code))
}

// 规范化权限指令的传参。
// 当前支持 3 种写法：
// 1. v-permission="'system:user:create'"
// 2. v-permission="['a', 'b']"
// 3. v-permission="{ mode: 'any', codes: ['a', 'b'] }"
export function normalizePermissionBinding(bindingValue) {
  if (typeof bindingValue === 'string' || Array.isArray(bindingValue)) {
    return {
      mode: 'all',
      codes: normalizePermissionValue(bindingValue)
    }
  }

  if (bindingValue && typeof bindingValue === 'object') {
    return {
      mode: bindingValue.mode === 'any' ? 'any' : 'all',
      codes: normalizePermissionValue(bindingValue.code || bindingValue.codes)
    }
  }

  return {
    mode: 'all',
    codes: []
  }
}
