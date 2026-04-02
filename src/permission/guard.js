import { ElMessage } from 'element-plus'

import pinia from '@/store'
import { getBaseRoutePath, getLocaleFromRouteLike, resolveLocalePath } from '@/locales/resolve'
import { translate } from '@/locales/helper'
import { useAppStore } from '@/store/modules/app'
import { clearPermissionRoutes, setupPermissionRoutes } from './index'
import { hasRoutePermission } from './utils'
import { usePermissionStore } from '@/store/modules/permission'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { whiteRoutePathList } from '@/router/modules/static'

function isAuthRoute(to) {
  return to.matched.some((route) => route.meta?.requiresAuth)
}

function buildLoginRedirectLocation(to, locale) {
  return {
    path: resolveLocalePath('/login', locale),
    query: {
      redirect: to.fullPath || resolveLocalePath('/dashboard', locale)
    },
    replace: true
  }
}

function getLoginSuccessRedirect(to, locale) {
  const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : ''
  return redirect ? resolveLocalePath(redirect, locale) : resolveLocalePath('/dashboard', locale)
}

export function setupPermissionGuard(router) {
  router.beforeEach(async (to) => {
    const appStore = useAppStore(pinia)
    const userStore = useUserStore(pinia)
    const permissionStore = usePermissionStore(pinia)
    const tabsStore = useTabsStore(pinia)

    const routeLocale = getLocaleFromRouteLike(to)
    appStore.setLanguage(routeLocale)

    const hasToken = Boolean(userStore.token)
    const baseRoutePath = getBaseRoutePath(to.path)
    const isWhiteRoute = whiteRoutePathList.includes(baseRoutePath)
    const needLogin = isAuthRoute(to)
    const redirectedFromFullPath = to.redirectedFrom?.fullPath || ''

    if (hasToken && baseRoutePath === '/login') {
      return {
        path: getLoginSuccessRedirect(to, routeLocale),
        replace: true
      }
    }

    if (!hasToken) {
      if (!needLogin || isWhiteRoute) {
        return true
      }

      return buildLoginRedirectLocation(to, routeLocale)
    }

    try {
      if (!userStore.userInfo.username) {
        const userInfo = await userStore.fetchUserInfoAction()
        permissionStore.setPermissionCodeList(userInfo.permissionCodeList || [])
      }

      if (
        baseRoutePath === '/404' &&
        redirectedFromFullPath &&
        !permissionStore.dynamicRouteAdded
      ) {
        setupPermissionRoutes()
        return redirectedFromFullPath
      }

      if (!permissionStore.dynamicRouteAdded) {
        setupPermissionRoutes()
        return to.fullPath
      }

      if (needLogin && !hasRoutePermission(permissionStore.permissionCodeList, to)) {
        return {
          path: resolveLocalePath('/403', routeLocale),
          replace: true
        }
      }

      return true
    } catch (error) {
      userStore.clearUserState()
      clearPermissionRoutes()
      tabsStore.resetTabsState()
      ElMessage.error(error?.message || translate('permission.messages.expired'))

      return buildLoginRedirectLocation(to, routeLocale)
    }
  })
}
