import { createRouter, createWebHistory } from 'vue-router'

import { asyncRoutes } from './modules/async'
import { staticRoutes } from './modules/static'

// 创建路由实例。
// 当前阶段只先挂载静态路由，保证项目启动后就能正常访问基础页面。
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,

  // 每次切换页面后，统一把滚动条重置到顶部。
  // 这是后台系统里比较常见、也比较友好的默认体验。
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 记录已经动态添加过的路由名称。
// 后续做退出登录、切换账号时，可以根据这些名称把动态路由移除掉。
const dynamicRouteNameSet = new Set()

// 递归收集路由 name。
// Vue Router 移除路由时依赖 name，所以这里提前做一个统一方法。
function collectRouteNames(routes, result = []) {
  routes.forEach((route) => {
    if (route.name) {
      result.push(route.name)
    }

    if (Array.isArray(route.children) && route.children.length > 0) {
      collectRouteNames(route.children, result)
    }
  })

  return result
}

// 添加动态路由。
// 当前这一步先把方法准备好，后续在权限系统里再真正接入调用。
export function addDynamicRoutes(routes = asyncRoutes) {
  const routeNameList = collectRouteNames(routes)

  routes.forEach((route) => {
    router.addRoute(route)
  })

  routeNameList.forEach((routeName) => {
    dynamicRouteNameSet.add(routeName)
  })
}

// 重置动态路由。
// 常见使用场景：退出登录后，把当前账号的动态权限路由清空。
export function resetRouter() {
  dynamicRouteNameSet.forEach((routeName) => {
    if (router.hasRoute(routeName)) {
      router.removeRoute(routeName)
    }
  })

  dynamicRouteNameSet.clear()
}

export default router
