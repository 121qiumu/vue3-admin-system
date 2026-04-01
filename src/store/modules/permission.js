import { ref } from 'vue'
import { defineStore } from 'pinia'

import { asyncRoutes } from '@/router/modules/async'
import { staticMenuRoutes } from '@/router/modules/static'
import { transformRoutesToMenu } from '@/router/helper'
import { PERMISSION_STORAGE_KEY } from '@/constants/storage'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

function normalizeArray(data = []) {
  return Array.isArray(data) ? data : []
}

function hasRoutePermission(route, permissionCodeList = []) {
  const requiredCodeList = route.meta?.permissionCodes

  if (!Array.isArray(requiredCodeList) || requiredCodeList.length === 0) {
    return true
  }

  return requiredCodeList.every((code) => permissionCodeList.includes(code))
}

function cloneRouteRecord(route) {
  return {
    ...route,
    children: Array.isArray(route.children)
      ? route.children.map((child) => cloneRouteRecord(child))
      : []
  }
}

function filterAsyncRoutes(routeList = [], permissionCodeList = []) {
  return routeList.reduce((result, route) => {
    if (!hasRoutePermission(route, permissionCodeList)) {
      return result
    }

    const nextRoute = cloneRouteRecord(route)

    if (Array.isArray(nextRoute.children) && nextRoute.children.length > 0) {
      nextRoute.children = filterAsyncRoutes(nextRoute.children, permissionCodeList)
    }

    if (
      Array.isArray(route.children) &&
      route.children.length > 0 &&
      nextRoute.children.length === 0
    ) {
      return result
    }

    result.push(nextRoute)
    return result
  }, [])
}

export const usePermissionStore = defineStore('permission', () => {
  // 当前用户拥有的页面级权限码列表。
  // 它通常来自“获取用户信息”接口，用来过滤动态路由。
  const permissionCodeList = ref([])

  // 当前用户拥有的按钮级权限码列表。
  // 后续做 v-permission 按钮权限指令时，会直接复用它。
  const buttonPermissionList = ref([])

  // 当前账号可访问的动态路由列表。
  // 注意：这里存的是路由记录，不适合直接持久化到 localStorage。
  const accessibleRouteList = ref([])

  // 当前展示在侧边栏中的菜单列表。
  // 默认至少会包含静态首页菜单。
  const menuRouteList = ref([...staticMenuRoutes])

  // 是否已经动态注入过权限路由。
  const dynamicRouteAdded = ref(false)

  // 持久化权限状态。
  // 当前只保存“刷新后仍然有意义”的纯数据，例如：
  // 1. 页面级权限码
  // 2. 按钮级权限码
  function persistPermissionState() {
    setStorage(PERMISSION_STORAGE_KEY, {
      permissionCodeList: permissionCodeList.value,
      buttonPermissionList: buttonPermissionList.value
    })
  }

  // 设置页面级权限码。
  function setPermissionCodeList(nextPermissionCodeList = []) {
    permissionCodeList.value = normalizeArray(nextPermissionCodeList)
    persistPermissionState()
  }

  // 设置按钮级权限码。
  function setButtonPermissionList(nextButtonPermissionList = []) {
    buttonPermissionList.value = normalizeArray(nextButtonPermissionList)
    persistPermissionState()
  }

  // 根据当前权限码生成可访问路由和菜单。
  // 如果外部传入了菜单接口返回值，就优先使用接口菜单；
  // 如果没有，则退回到“根据动态路由自动生成菜单”的方案。
  function generatePermissionState(options = {}) {
    const filteredAsyncRouteList = filterAsyncRoutes(asyncRoutes, permissionCodeList.value)
    const fallbackAsyncMenuRouteList = transformRoutesToMenu(filteredAsyncRouteList)
    const nextMenuRouteList = normalizeArray(options.menuRouteList)

    accessibleRouteList.value = filteredAsyncRouteList
    menuRouteList.value =
      nextMenuRouteList.length > 0
        ? [...staticMenuRoutes, ...nextMenuRouteList]
        : [...staticMenuRoutes, ...fallbackAsyncMenuRouteList]

    return filteredAsyncRouteList
  }

  // 根据新的权限数据，统一更新整套权限状态。
  // 登录成功后，页面层通常只需要调用这个方法即可。
  function buildPermissionState(payload = {}) {
    const nextPermissionCodeList = Array.isArray(payload) ? payload : payload.permissionCodeList
    const nextButtonPermissionList = Array.isArray(payload) ? [] : payload.buttonPermissionList
    const nextMenuRouteList = Array.isArray(payload) ? [] : payload.menuRouteList

    permissionCodeList.value = normalizeArray(nextPermissionCodeList)
    buttonPermissionList.value = normalizeArray(nextButtonPermissionList)

    const filteredAsyncRouteList = generatePermissionState({
      menuRouteList: nextMenuRouteList
    })

    persistPermissionState()

    return filteredAsyncRouteList
  }

  // 判断是否拥有某个按钮权限。
  // 后续无论是组合式 hook 还是自定义指令，都可以直接复用它。
  function hasButtonPermission(buttonCode) {
    if (!buttonCode) {
      return false
    }

    return buttonPermissionList.value.includes(buttonCode)
  }

  // 设置动态路由注入状态。
  function setDynamicRouteAdded(nextDynamicRouteAdded) {
    dynamicRouteAdded.value = Boolean(nextDynamicRouteAdded)
  }

  // 从本地缓存恢复权限状态。
  // 页面刷新后，会先恢复权限码，再基于本地路由规则重新生成菜单与动态路由。
  function restorePermissionState() {
    const cachedState = getStorage(PERMISSION_STORAGE_KEY, {
      permissionCodeList: [],
      buttonPermissionList: []
    })

    permissionCodeList.value = normalizeArray(cachedState.permissionCodeList)
    buttonPermissionList.value = normalizeArray(cachedState.buttonPermissionList)
    dynamicRouteAdded.value = false
    generatePermissionState()
  }

  // 清空权限状态。
  // 常见场景：退出登录、切换账号。
  function resetPermissionState() {
    permissionCodeList.value = []
    buttonPermissionList.value = []
    accessibleRouteList.value = []
    menuRouteList.value = [...staticMenuRoutes]
    dynamicRouteAdded.value = false
    removeStorage(PERMISSION_STORAGE_KEY)
  }

  return {
    permissionCodeList,
    buttonPermissionList,
    accessibleRouteList,
    menuRouteList,
    dynamicRouteAdded,
    setPermissionCodeList,
    setButtonPermissionList,
    generatePermissionState,
    buildPermissionState,
    hasButtonPermission,
    setDynamicRouteAdded,
    restorePermissionState,
    resetPermissionState
  }
})
