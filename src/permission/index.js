/**
 * 学习注释：
 * 1. 文件角色：这是权限路由装配入口，负责把权限 store 生成出来的动态路由真正注入到 Vue Router。
 * 2. 所在分层：权限控制层。
 * 3. 当前文件主要依赖：pinia、router、permission store。
 * 4. 当前文件对外暴露：setupPermissionRoutes、rebuildPermissionRoutes、clearPermissionRoutes。
 * 5. 常见上游调用方：plugins/index.js、permission/guard.js、request/helper.js。
 * 6. 阅读建议：把它看成“store 里的权限结果”和“router 里的真实路由实例”之间的桥梁。
 */
import pinia from '@/store'
import { addDynamicRoutes, resetRouter } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'

export function setupPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  if (permissionStore.dynamicRouteAdded) {
    return permissionStore.accessibleRouteList
  }

  const accessibleRouteList = permissionStore.generatePermissionState()

  if (accessibleRouteList.length > 0) {
    addDynamicRoutes(accessibleRouteList)
  }

  permissionStore.setDynamicRouteAdded(true)

  return accessibleRouteList
}

export function rebuildPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  resetRouter()
  permissionStore.setDynamicRouteAdded(false)

  return setupPermissionRoutes()
}

export function clearPermissionRoutes() {
  const permissionStore = usePermissionStore(pinia)

  resetRouter()
  permissionStore.resetPermissionState()
}
