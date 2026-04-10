/**
 * 学习注释：
 * 1. 文件角色：这是静态路由清单，项目启动时就会注册这些页面，比如登录页、首页、错误页。
 * 2. 所在分层：路由层：定义页面访问路径、菜单来源、动态路由装配规则。
 * 3. 当前文件主要依赖：{ DEFAULT_LOCALE, LOCALE_ROUTE_PARAM } <- src/constants/locale.js；{ getBaseRoutePath, getPreferredLocale, resolveLocalePath } <- src/locales/resolve.js；{ Layout, resolveRoutePath, transformRoutesToMenu } <- src/router/helper.js
 * 4. 当前文件对外暴露：命名导出：rootRedirectRoute、loginRoute、layoutRoute、forbiddenRoute、serverErrorRoute、notFoundRoute、localizedCatchAllRoute、catchAllRoute、staticRoutes、whiteRoutePathList、staticMenuRoutes、staticAffixTagList
 * 5. 常见上游调用方：src/permission/guard.js、src/router/index.js、src/store/modules/permission.js、src/store/modules/tabs.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { DEFAULT_LOCALE, LOCALE_ROUTE_PARAM } from '@/constants/locale'
import { getBaseRoutePath, getPreferredLocale, resolveLocalePath } from '@/locales/resolve'
import { Layout, resolveRoutePath, transformRoutesToMenu } from '../helper'

function transformRoutesToAffixTags(routes = [], parentPath = '') {
  return routes.reduce((result, route) => {
    const fullPath = resolveRoutePath(parentPath, route.path)
    const baseFullPath = getBaseRoutePath(fullPath)

    if (route.meta?.affix && !route.meta?.hidden && route.name) {
      result.push({
        fullPath: baseFullPath,
        path: baseFullPath,
        name: route.name,
        title: route.meta?.title || String(route.name),
        titleKey: route.meta?.titleKey || '',
        affix: true,
        keepAlive: Boolean(route.meta?.keepAlive)
      })
    }

    if (Array.isArray(route.children) && route.children.length > 0) {
      result.push(...transformRoutesToAffixTags(route.children, fullPath))
    }

    return result
  }, [])
}

export const rootRedirectRoute = {
  path: '/',
  redirect: () => resolveLocalePath('/dashboard', getPreferredLocale())
}

export const loginRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/login`,
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    titleKey: 'route.login',
    hidden: true
  }
}

export const layoutRoute = {
  path: `/${LOCALE_ROUTE_PARAM}`,
  component: Layout,
  redirect: (to) => resolveLocalePath('/dashboard', to.params?.locale || DEFAULT_LOCALE),
  meta: {
    hidden: true
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '首页',
        titleKey: 'route.dashboard',
        icon: 'IconEpHomeFilled',
        affix: true,
        requiresAuth: true
      }
    },
    {
      path: 'vueuse-demo',
      name: 'VueUseDemo',
      component: () => import('@/views/vueuse-demo/index.vue'),
      meta: {
        title: 'VueUse Demo',
        titleKey: 'route.vueuseDemo',
        icon: 'IconEpReading',
        keepAlive: true,
        requiresAuth: true
      }
    }
  ]
}

export const forbiddenRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/403`,
  component: Layout,
  meta: {
    hidden: true
  },
  children: [
    {
      path: '',
      name: 'Forbidden',
      component: () => import('@/views/error/403.vue'),
      meta: {
        title: '403',
        titleKey: 'route.forbidden',
        hidden: true,
        requiresAuth: true
      }
    }
  ]
}

export const serverErrorRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/500`,
  component: Layout,
  meta: {
    hidden: true
  },
  children: [
    {
      path: '',
      name: 'ServerError',
      component: () => import('@/views/error/500.vue'),
      meta: {
        title: '500',
        titleKey: 'route.serverError',
        hidden: true,
        requiresAuth: true
      }
    }
  ]
}

export const notFoundRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/404`,
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    title: '404',
    titleKey: 'route.notFound',
    hidden: true
  }
}

export const localizedCatchAllRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/:pathMatch(.*)*`,
  redirect: (to) => resolveLocalePath('/404', to.params?.locale || DEFAULT_LOCALE),
  meta: {
    hidden: true
  }
}

export const catchAllRoute = {
  path: '/:pathMatch(.*)*',
  redirect: (to) => {
    const pathMatch = Array.isArray(to.params?.pathMatch)
      ? to.params.pathMatch.join('/')
      : to.params?.pathMatch || ''
    const targetPath = pathMatch ? `/${pathMatch}` : '/'

    return resolveLocalePath(targetPath, getPreferredLocale())
  },
  meta: {
    hidden: true
  }
}

export const staticRoutes = [
  rootRedirectRoute,
  loginRoute,
  layoutRoute,
  forbiddenRoute,
  serverErrorRoute,
  notFoundRoute,
  localizedCatchAllRoute,
  catchAllRoute
]

export const whiteRoutePathList = ['/login', '/404']

export const staticMenuRoutes = transformRoutesToMenu(layoutRoute.children, layoutRoute.path)

export const staticAffixTagList = transformRoutesToAffixTags(layoutRoute.children, layoutRoute.path)
