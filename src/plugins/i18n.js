import i18n from '@/locales'
import { applyAppLocale, setDocumentTitleByRoute, syncLocaleByRoute } from '@/locales/helper'

export function setupI18n(app) {
  applyAppLocale(i18n.global.locale.value)
  app.use(i18n)
}

export function setupI18nRouterGuard(router) {
  router.afterEach((to) => {
    syncLocaleByRoute(to)
    setDocumentTitleByRoute(to)
  })
}
