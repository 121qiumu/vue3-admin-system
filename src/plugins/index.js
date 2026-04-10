/**
 * 学习注释：
 * 1. 文件角色：这是项目级插件总入口，负责把 Pinia、路由、国际化、权限路由、全局指令按固定顺序装到应用上。
 * 2. 所在分层：插件装配层，专门负责“把能力挂到应用实例上”。
 * 3. 当前文件主要依赖：router、Pinia、i18n、权限路由装配、权限守卫、全局指令、user store。
 * 4. 当前文件对外暴露：setupPlugins(app)。
 * 5. 常见上游调用方：src/main.js。
 * 6. 阅读建议：按函数内部的执行顺序阅读最容易看懂项目启动链。
 */
import router from '@/router'
import { setupDirectives } from '@/directives'
import { setupI18n, setupI18nRouterGuard } from '@/plugins/i18n'
import { setupPermissionRoutes } from '@/permission'
import { setupPermissionGuard } from '@/permission/guard'
import pinia, { initializeStore } from '@/store'
import { useUserStore } from '@/store/modules/user'

// 统一注册项目级插件。
// 这里相当于是“启动总装配车间”，把原本分散在各处的初始化动作放到一个地方统一执行。
export async function setupPlugins(app) {
  // 先安装 Pinia，这样后面的插件和守卫就都能访问全局 store 了。
  app.use(pinia)

  // 恢复本地缓存里的 store 状态。
  // 这一步会把 token、主题、语言、标签页等信息从 localStorage 读回内存。
  await initializeStore()

  // 注册国际化，并把当前语言同步到 vue-i18n / Element Plus / Day.js / document.lang。
  await setupI18n(app)

  // 这里要显式传入 pinia，是因为当前代码运行在组件外部。
  // 在组件内部可以直接 useUserStore()，但在这里必须告诉 Pinia“使用哪一个实例”。
  const userStore = useUserStore(pinia)

  // 如果本地已经有 token，说明用户很可能是“刷新页面后重新进入应用”。
  // 这时要尽早恢复动态路由，不然刷新后直接访问动态页面时可能先掉到 404。
  if (userStore.token) {
    setupPermissionRoutes()
  }

  // 注册全局自定义指令，例如 v-permission 按钮权限指令。
  setupDirectives(app)

  // 注册“进入页面之前”的权限守卫。
  // 它负责拦截未登录、无权限、首次恢复动态路由等场景。
  setupPermissionGuard(router)

  // 注册“进入页面之后”的国际化联动。
  // 它会根据路由语言前缀同步语言状态，并更新浏览器标题。
  setupI18nRouterGuard(router)

  // 最后再安装 Vue Router。
  // 这样前面的守卫和动态路由准备都已经就绪了。
  app.use(router)
}
