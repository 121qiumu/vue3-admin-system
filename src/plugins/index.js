import router from '@/router'
import { setupDirectives } from '@/directives'
import { setupPermissionRoutes } from '@/permission'
import { setupPermissionGuard } from '@/permission/guard'
import pinia, { initializeStore } from '@/store'
import { useUserStore } from '@/store/modules/user'

// 统一注册项目级插件。
// 当前阶段主要做 6 件事：
// 1. 安装 Pinia
// 2. 恢复本地缓存中的全局状态
// 3. 如果用户已登录，则提前恢复动态路由
// 4. 注册全局权限指令
// 5. 注册路由守卫
// 6. 安装 Vue Router
export function setupPlugins(app) {
  app.use(pinia)

  // Pinia 安装完成后，再恢复各模块状态。
  initializeStore()

  // 页面刷新时，如果本地已经保留 token 和权限码，
  // 就在 Router 首次匹配前把动态路由提前挂上。
  const userStore = useUserStore(pinia)

  if (userStore.token) {
    setupPermissionRoutes()
  }

  // 全局指令注册放在这里统一处理。
  setupDirectives(app)

  // 路由守卫要尽量在 Router 安装前完成注册。
  setupPermissionGuard(router)

  app.use(router)
}
