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
