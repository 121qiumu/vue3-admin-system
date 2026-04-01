// 路由辅助工具
// 这里先放一些“和路由结构相关，但不直接属于某一个模块”的公共能力。

// Layout 容器组件采用懒加载写法。
// 这样做有两个好处：
// 1. 可以减少首屏直接加载的内容
// 2. 更重要的是可以避免路由模块和 Layout 组件之间的循环依赖
export const Layout = () => import('@/layout/index.vue')

// 拼接完整路由路径。
// 后续把多级 children 路由转换成菜单数据时，会频繁用到它。
export function resolveRoutePath(parentPath = '', routePath = '') {
  // 外链地址不做拼接，直接返回原值。
  if (/^(https?:|mailto:|tel:)/.test(routePath)) {
    return routePath
  }

  // 已经是绝对路径时，直接返回。
  if (routePath.startsWith('/')) {
    return routePath
  }

  // 根路径下的子路由，直接补一个 / 即可。
  if (!parentPath || parentPath === '/') {
    return `/${routePath}`.replace(/\/+/g, '/')
  }

  return `${parentPath}/${routePath}`.replace(/\/+/g, '/')
}

// 把路由记录转换成菜单数据。
// 当前会过滤掉：
// 1. meta.hidden = true 的路由
// 2. meta.hideMenu = true 的路由
// 这样 detail / form 页面既可以不出现在菜单里，
// 又能保留自己的面包屑和页面结构。
export function transformRoutesToMenu(routes = [], parentPath = '') {
  return routes
    .filter((route) => !route.meta?.hidden && !route.meta?.hideMenu)
    .map((route) => {
      const fullPath = resolveRoutePath(parentPath, route.path)

      return {
        ...route,
        path: fullPath,
        children: Array.isArray(route.children)
          ? transformRoutesToMenu(route.children, fullPath)
          : []
      }
    })
}
