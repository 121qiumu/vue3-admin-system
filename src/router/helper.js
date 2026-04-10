/**
 * 学习注释：
 * 1. 文件角色：这是路由辅助工具文件，主要把路由数据进一步加工成菜单、完整路径等更适合页面消费的结构。
 * 2. 所在分层：路由层：定义页面访问路径、菜单来源、动态路由装配规则。
 * 3. 当前文件主要依赖：{ getBaseRoutePath } <- src/locales/resolve.js
 * 4. 当前文件对外暴露：命名导出：Layout、resolveRoutePath、transformRoutesToMenu
 * 5. 常见上游调用方：src/router/modules/static.js、src/router/modules/system.js、src/store/modules/permission.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
