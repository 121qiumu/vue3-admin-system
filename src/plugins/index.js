import router from '@/router'
import { setupDirectives } from '@/directives'
import { setupI18n, setupI18nRouterGuard } from '@/plugins/i18n'
import { setupPermissionRoutes } from '@/permission'
import { setupPermissionGuard } from '@/permission/guard'
import pinia, { initializeStore } from '@/store'
import { useUserStore } from '@/store/modules/user'

// 统一注册项目级插件。
// 当前阶段主要做 7 件事：
// 1. 安装 Pinia
// 2. 恢复本地缓存中的全局状态
// 3. 安装 i18n，并同步语言到 Element Plus / Day.js / document
// 4. 如果用户已登录，则提前恢复动态路由
// 5. 注册全局指令
// 6. 注册路由守卫和 i18n 的路由联动
// 7. 安装 Vue Router
export function setupPlugins(app) {
  app.use(pinia)

  initializeStore()
  setupI18n(app)

  const userStore = useUserStore(pinia)

  if (userStore.token) {
    setupPermissionRoutes()
  }

  setupDirectives(app)
  setupPermissionGuard(router)
  setupI18nRouterGuard(router)

  app.use(router)
}
