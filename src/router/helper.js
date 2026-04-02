import { getBaseRoutePath } from '@/locales/resolve'

// Layout 容器组件采用懒加载写法。
// 这样可以减少首屏直接加载的内容，也能避免路由模块和 Layout 之间的循环依赖。
export const Layout = () => import('@/layout/index.vue')

// 拼接完整路由路径。
// 后续把多级 children 路由转换成菜单数据时，会频繁用到它。
export function resolveRoutePath(parentPath = '', routePath = '') {
  if (/^(https?:|mailto:|tel:)/.test(routePath)) {
    return routePath
  }

  if (routePath.startsWith('/')) {
    return routePath
  }

  if (!parentPath || parentPath === '/') {
    return `/${routePath}`.replace(/\/+/g, '/')
  }

  return `${parentPath}/${routePath}`.replace(/\/+/g, '/')
}

// 把路由记录转换成菜单数据。
// 这里刻意把菜单 path 统一转换成“不带语言前缀的基准路径”，例如：
// 1. /zh-CN/system/user -> /system/user
// 2. /en-GB/dashboard -> /dashboard
// 这样做的好处是：
// 1. 菜单展开状态不会因为切换语言而失效
// 2. 标签页、面包屑、顶部菜单可以复用同一份 path 规则
export function transformRoutesToMenu(routes = [], parentPath = '') {
  return routes
    .filter((route) => !route.meta?.hidden && !route.meta?.hideMenu)
    .map((route) => {
      const fullPath = resolveRoutePath(parentPath, route.path)
      const baseFullPath = getBaseRoutePath(fullPath)
      const children = Array.isArray(route.children)
        ? transformRoutesToMenu(route.children, fullPath)
        : []

      return {
        ...route,
        path: baseFullPath,
        redirect:
          typeof route.redirect === 'string' ? getBaseRoutePath(route.redirect) : route.redirect,
        meta: {
          ...route.meta,
          activeMenu: route.meta?.activeMenu ? getBaseRoutePath(route.meta.activeMenu) : ''
        },
        children
      }
    })
}
