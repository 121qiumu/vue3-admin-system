import pinia from '@/store'
import { addDynamicRoutes, resetRouter } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'

// 初始化权限路由。
// 这个方法常见的调用时机有两个：
// 1. 登录成功后，拿到用户权限码之后
// 2. 页面刷新后，从本地缓存恢复权限码之后
export function setupPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  if (permissionStore.dynamicRouteAdded) {
    return permissionStore.accessibleRouteList
  }

  // 先基于当前权限数据生成可访问的动态路由列表。
  // 生成完成后，再统一通过 router.addRoute 注入到应用中。
  const accessibleRouteList = permissionStore.generatePermissionState()

  if (accessibleRouteList.length > 0) {
    addDynamicRoutes(accessibleRouteList)
  }

  permissionStore.setDynamicRouteAdded(true)

  return accessibleRouteList
}

// 重建权限路由。
// 常见场景：
// 1. 登录成功后首次注入动态路由
// 2. 切换账号后按新权限重新生成路由
export function rebuildPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  resetRouter()
  permissionStore.setDynamicRouteAdded(false)

  return setupPermissionRoutes()
}

// 清空权限路由。
// 常见场景：退出登录后把动态路由和权限菜单一并清掉。
export function clearPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  resetRouter()
  permissionStore.resetPermissionState()
}
