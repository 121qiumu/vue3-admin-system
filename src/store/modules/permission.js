/**
 * 学习注释：
 * 1. 文件角色：这是权限 store，主要负责权限码、动态路由、菜单树以及按钮权限状态。
 * 2. 所在分层：状态管理层。
 * 3. 当前文件主要依赖：动态路由、静态菜单、路由转菜单工具、本地存储工具。
 * 4. 当前文件对外暴露：usePermissionStore。
 * 5. 常见上游调用方：permission/index.js、permission/guard.js、layout 菜单组件、按钮权限工具。
 * 6. 阅读建议：把它拆成三件事来看，分别是“保存权限码”“生成路由和菜单”“持久化与恢复”。
 */
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
  const permissionCodeList = ref([])
  const buttonPermissionList = ref([])
  const accessibleRouteList = ref([])
  const menuRouteList = ref([...staticMenuRoutes])
  const dynamicRouteAdded = ref(false)

  function persistPermissionState() {
    // 这里只持久化纯数据，不持久化整棵路由对象。
    setStorage(PERMISSION_STORAGE_KEY, {
      permissionCodeList: permissionCodeList.value,
      buttonPermissionList: buttonPermissionList.value
    })
  }

  function setPermissionCodeList(nextPermissionCodeList = []) {
    permissionCodeList.value = normalizeArray(nextPermissionCodeList)
    persistPermissionState()
  }

  function setButtonPermissionList(nextButtonPermissionList = []) {
    buttonPermissionList.value = normalizeArray(nextButtonPermissionList)
    persistPermissionState()
  }

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

  function hasButtonPermission(buttonCode) {
    if (!buttonCode) {
      return false
    }

    return buttonPermissionList.value.includes(buttonCode)
  }

  function setDynamicRouteAdded(nextDynamicRouteAdded) {
    dynamicRouteAdded.value = Boolean(nextDynamicRouteAdded)
  }

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
