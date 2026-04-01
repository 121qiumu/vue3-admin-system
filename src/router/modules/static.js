import { Layout, resolveRoutePath, transformRoutesToMenu } from '../helper'

// 把 affix 路由转换成固定标签页数据。
// 后续标签页刷新恢复、关闭全部时，都会用它来保证“首页标签不能被清掉”。
function transformRoutesToAffixTags(routes = [], parentPath = '') {
  return routes.reduce((result, route) => {
    const fullPath = resolveRoutePath(parentPath, route.path)

    if (route.meta?.affix && !route.meta?.hidden && route.name) {
      result.push({
        fullPath,
        path: fullPath,
        name: route.name,
        title: route.meta?.title || String(route.name),
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

// 登录页路由。
// 登录页不需要包在 Layout 里面，因为它属于独立的认证页面。
export const loginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
    hidden: true
  }
}

// 首页路由。
// 这里开始引入 Layout 容器，后续后台系统中的大部分业务页面，
// 都会以“Layout + children 子页面”的结构来组织。
export const layoutRoute = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
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
        icon: 'IconEpHomeFilled',
        affix: true,
        requiresAuth: true
      }
    }
  ]
}

// 403 页面。
// 这里仍然放在 Layout 里面，这样用户在系统内无权限时，
// 看到的仍然是完整后台框架，而不是突然跳到一个完全独立的空白页。
export const forbiddenRoute = {
  path: '/403',
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
        hidden: true,
        requiresAuth: true
      }
    }
  ]
}

// 500 页面。
// 这一页主要给“页面级接口异常”做兜底预留。
// 当前不会无脑把所有请求错误都跳转到 500，只有显式传 showErrorPage: true 时才会进入。
export const serverErrorRoute = {
  path: '/500',
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
        hidden: true,
        requiresAuth: true
      }
    }
  ]
}

// 404 页面。
// 先提供一个固定地址 /404，方便主动跳转。
export const notFoundRoute = {
  path: '/404',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    title: '404',
    hidden: true
  }
}

// 兜底路由。
// 当访问的地址不存在时，统一重定向到 /404。
export const catchAllRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  meta: {
    hidden: true
  }
}

// 静态路由。
// 这部分路由在项目启动时就直接注册。
export const staticRoutes = [
  loginRoute,
  layoutRoute,
  forbiddenRoute,
  serverErrorRoute,
  notFoundRoute,
  catchAllRoute
]

// 白名单路由。
// 后续接入路由守卫时，白名单页面不需要登录也能进入。
export const whiteRoutePathList = ['/login', '/404']

// 静态菜单。
// 当前先把 Layout 下的 children 转成菜单数据，
// 后续再和“过滤后的动态路由菜单”一起合并使用。
export const staticMenuRoutes = transformRoutesToMenu(layoutRoute.children)

// 固定标签页列表。
// 当前默认把首页作为固定标签，后续如果有更多 affix 页面，也会自动收集进来。
export const staticAffixTagList = transformRoutesToAffixTags(layoutRoute.children)
