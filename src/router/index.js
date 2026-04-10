/**
 * 学习注释：
 * 1. 文件角色：这是 Vue Router 的总入口，负责创建路由实例，并提供动态路由的添加与重置能力。
 * 2. 所在分层：路由层。
 * 3. 当前文件主要依赖：createRouter、静态路由 staticRoutes、动态路由 asyncRoutes。
 * 4. 当前文件对外暴露：router、addDynamicRoutes、resetRouter。
 * 5. 常见上游调用方：plugins/index.js、permission/index.js、request/helper.js。
 * 6. 阅读建议：先看 router 是怎么创建的，再看动态路由是怎么被记录、添加、删除的。
 */
import { createRouter, createWebHistory } from 'vue-router'

import { asyncRoutes } from './modules/async'
import { staticRoutes } from './modules/static'

// 先创建一个只有“静态路由”的路由实例。
// 这样应用一启动，登录页、首页、错误页这些基础页面就能立刻访问。
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,

  // 切换页面后统一把滚动条恢复到顶部，
  // 避免从上一个页面滚动到很下面后，进入新页面时仍停在旧位置。
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 这里专门记录“后来动态添加进去的路由 name”。
// 因为 Vue Router 删除路由时依赖的是 name，不是 path。
const dynamicRouteNameSet = new Set()

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

export function addDynamicRoutes(routes = asyncRoutes) {
  const routeNameList = collectRouteNames(routes)

  routes.forEach((route) => {
    router.addRoute(route)
  })

  routeNameList.forEach((routeName) => {
    dynamicRouteNameSet.add(routeName)
  })
}

export function resetRouter() {
  dynamicRouteNameSet.forEach((routeName) => {
    if (router.hasRoute(routeName)) {
      router.removeRoute(routeName)
    }
  })

  dynamicRouteNameSet.clear()
}

export default router
