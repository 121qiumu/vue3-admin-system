import pinia from '@/store'
import { clearPermissionRoutes, setupPermissionRoutes } from './index'

import { hasRoutePermission } from './utils'
import { usePermissionStore } from '@/store/modules/permission'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { whiteRoutePathList } from '@/router/modules/static'

// 判断目标路由是否需要登录。
// 这里不直接依赖某一个路由对象上的 meta，而是遍历 matched，
// 这样像 Layout + children 这种嵌套路由结构也能正常识别。
function isAuthRoute(to) {
  return to.matched.some((route) => route.meta?.requiresAuth)
}

// 生成登录页跳转位置。
// 用户登录成功后，就可以按 redirect 参数回到原始目标页。
function buildLoginRedirectLocation(to) {
  return {
    path: '/login',
    query: {
      redirect: to.fullPath || '/dashboard'
    },
    replace: true
  }
}

// 计算已登录用户进入登录页时的默认去向。
function getLoginSuccessRedirect(to) {
  return typeof to.query.redirect === 'string' && to.query.redirect
    ? to.query.redirect
    : '/dashboard'
}

// 注册路由守卫。
// 当前守卫会统一处理：
// 1. 未登录跳登录页
// 2. 已登录访问登录页时跳首页
// 3. 刷新后恢复动态路由
// 4. 权限不足跳 403
// 5. token 失效后清理本地状态
export function setupPermissionGuard(router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore(pinia)
    const permissionStore = usePermissionStore(pinia)
    const tabsStore = useTabsStore(pinia)

    const hasToken = Boolean(userStore.token)
    const isWhiteRoute = whiteRoutePathList.includes(to.path)
    const needLogin = isAuthRoute(to)
    const redirectedFromFullPath = to.redirectedFrom?.fullPath || ''

    // 已登录时，不再允许停留在登录页。
    if (hasToken && to.path === '/login') {
      return {
        path: getLoginSuccessRedirect(to),
        replace: true
      }
    }

    // 未登录时，只允许访问白名单页面。
    if (!hasToken) {
      if (!needLogin || isWhiteRoute) {
        return true
      }

      return buildLoginRedirectLocation(to)
    }

    try {
      // 如果页面刷新后用户信息丢失，就先重新拉一次用户信息。
      if (!userStore.userInfo.username) {
        const userInfo = await userStore.fetchUserInfoAction()
        permissionStore.setPermissionCodeList(userInfo.permissionCodeList || [])
      }

      // 某些情况下，浏览器刷新动态路由页时，会先被静态 404 兜底命中。
      // 这时先把动态路由补注册，再跳回原始地址即可。
      if (to.path === '/404' && redirectedFromFullPath && !permissionStore.dynamicRouteAdded) {
        setupPermissionRoutes()
        return redirectedFromFullPath
      }

      // 首次进入受权限控制的页面前，先确保动态路由已经注册完成。
      if (!permissionStore.dynamicRouteAdded) {
        setupPermissionRoutes()
        return to.fullPath
      }

      // 如果已经登录，但没有当前页面的权限，就统一跳到 403。
      if (needLogin && !hasRoutePermission(permissionStore.permissionCodeList, to)) {
        return {
          path: '/403',
          replace: true
        }
      }

      return true
    } catch (error) {
      // 如果刷新恢复时 token 失效，就把本地状态清掉并送回登录页。
      userStore.clearUserState()
      clearPermissionRoutes()
      tabsStore.resetTabsState()
      ElMessage.error(error?.message || '登录状态已失效，请重新登录')

      return buildLoginRedirectLocation(to)
    }
  })
}
