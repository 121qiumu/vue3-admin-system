/**
 * 学习注释：
 * 1. 文件角色：这是国际化插件接入层，用来把 vue-i18n、Element Plus、Day.js、浏览器标题联动到同一套语言状态。
 * 2. 所在分层：插件装配层。
 * 3. 当前文件主要依赖：i18n 实例、国际化辅助方法、router.afterEach。
 * 4. 当前文件对外暴露：setupI18n(app)、setupI18nRouterGuard(router)。
 * 5. 常见上游调用方：src/plugins/index.js。
 * 6. 阅读建议：把它理解成“i18n 对外的安装门面”，真正的工具细节在 locales/helper.js。
 */
import i18n from '@/locales'
import { applyAppLocale, setDocumentTitleByRoute, syncLocaleByRoute } from '@/locales/helper'

// 安装 vue-i18n 插件。
// 这里在 app.use(i18n) 之前先调用 applyAppLocale，
// 是为了让语言包、Day.js、document.lang 等非 Vue 部分也先切到正确语言。
export async function setupI18n(app) {
  await applyAppLocale(i18n.global.locale.value)
  app.use(i18n)
}

// 注册国际化相关的路由后置守卫。
// beforeEach 更适合做“是否允许进入”的判断，
// afterEach 更适合做“进入页面后同步标题和语言状态”的副作用处理。
export function setupI18nRouterGuard(router) {
  router.afterEach(async (to) => {
    // 根据当前路由上的语言前缀同步语言状态，例如 /en-GB/... -> 英文。
    await syncLocaleByRoute(to)

    // 进入页面后统一设置浏览器标题。
    setDocumentTitleByRoute(to)
  })
}
