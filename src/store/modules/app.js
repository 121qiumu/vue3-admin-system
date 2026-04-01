import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  DEFAULT_LAYOUT_MODE,
  DEVICE_TYPE_ENUM,
  LAYOUT_MOBILE_BREAKPOINT,
  LAYOUT_MODE_ENUM
} from '@/constants/layout'
import { APP_STORAGE_KEY } from '@/constants/storage'
import { DEFAULT_THEME } from '@/constants/theme'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'
import { applyTheme } from '@/utils/theme'

function createDefaultAppState() {
  return {
    theme: DEFAULT_THEME,
    layoutMode: DEFAULT_LAYOUT_MODE,
    sidebarCollapsed: false,
    fullscreenActive: false,
    openedMenuPathList: []
  }
}

// 统一规范侧边栏父菜单展开状态。
// 这里只保存“父级菜单的 index/path”，不和当前激活菜单混在一起。
function normalizeOpenedMenuPathList(pathList = []) {
  if (!Array.isArray(pathList)) {
    return []
  }

  return [...new Set(pathList.filter((item) => typeof item === 'string' && item.trim()))]
}

export const useAppStore = defineStore('app', () => {
  const theme = ref(DEFAULT_THEME)
  const layoutMode = ref(DEFAULT_LAYOUT_MODE)
  const sidebarCollapsed = ref(false)
  const fullscreenActive = ref(false)
  const deviceType = ref(DEVICE_TYPE_ENUM.DESKTOP)
  const mobileSidebarVisible = ref(false)
  const openedMenuPathList = ref([])

  const isMobile = computed(() => deviceType.value === DEVICE_TYPE_ENUM.MOBILE)
  const isDesktop = computed(() => deviceType.value === DEVICE_TYPE_ENUM.DESKTOP)
  const isLeftLayout = computed(() => layoutMode.value === LAYOUT_MODE_ENUM.LEFT)
  const isTopLayout = computed(() => layoutMode.value === LAYOUT_MODE_ENUM.TOP)
  const isMixLayout = computed(() => layoutMode.value === LAYOUT_MODE_ENUM.MIX)

  // 持久化应用级设置。
  // 这里只保存“刷新后仍然有意义”的状态，
  // 例如主题、布局模式、侧边栏折叠状态，以及侧边栏父菜单展开状态。
  function persistAppState() {
    setStorage(APP_STORAGE_KEY, {
      theme: theme.value,
      layoutMode: layoutMode.value,
      sidebarCollapsed: sidebarCollapsed.value,
      fullscreenActive: fullscreenActive.value,
      openedMenuPathList: openedMenuPathList.value
    })
  }

  // 同步主题到 DOM。
  // 这一步会把主题值挂到 html 和 body 上。
  function syncThemeToDom() {
    theme.value = applyTheme(theme.value)
  }

  // 设置当前主题。
  // 切换主题时，需要同时更新 store、DOM 和本地缓存。
  function setTheme(nextTheme) {
    theme.value = nextTheme || DEFAULT_THEME
    syncThemeToDom()
    persistAppState()
  }

  // 设置布局模式。
  // 目前虽然只真正实现了左侧布局，
  // 但数据层已经提前支持 left / top / mix 三种模式。
  function setLayoutMode(nextLayoutMode) {
    const validModeList = Object.values(LAYOUT_MODE_ENUM)

    if (!validModeList.includes(nextLayoutMode)) {
      return
    }

    layoutMode.value = nextLayoutMode
    persistAppState()
  }

  // 设置侧边栏折叠状态。
  // 桌面端常用来折叠菜单，提升内容区可视宽度。
  function setSidebarCollapsed(nextCollapsed) {
    sidebarCollapsed.value = Boolean(nextCollapsed)
    persistAppState()
  }

  // 统一设置“父菜单展开状态列表”。
  // 这里保存的是用户主动展开过的父菜单路径，
  // 页面切换和刷新后都从这份状态恢复，而不是根据当前路由反推。
  function setOpenedMenuPathList(nextPathList = []) {
    openedMenuPathList.value = normalizeOpenedMenuPathList(nextPathList)
    persistAppState()
  }

  // 新增一个展开的父菜单。
  // 如果已经存在，就不重复添加。
  function addOpenedMenuPath(path = '') {
    if (!path) {
      return
    }

    if (openedMenuPathList.value.includes(path)) {
      return
    }

    setOpenedMenuPathList([...openedMenuPathList.value, path])
  }

  // 移除一个已展开的父菜单。
  // 只有用户再次点击当前父菜单收起时，才会走这条逻辑。
  function removeOpenedMenuPath(path = '') {
    if (!path) {
      return
    }

    setOpenedMenuPathList(openedMenuPathList.value.filter((item) => item !== path))
  }

  // 切换单个父菜单的展开状态。
  // 这个方法先预留在 store 层，后续如果要做更多菜单交互可以继续复用。
  function toggleOpenedMenuPath(path = '') {
    if (!path) {
      return
    }

    if (openedMenuPathList.value.includes(path)) {
      removeOpenedMenuPath(path)
      return
    }

    addOpenedMenuPath(path)
  }

  // 切换侧边栏状态。
  // 移动端切换的是菜单抽屉显示状态，桌面端切换的是折叠状态。
  function toggleSidebar() {
    if (isMobile.value) {
      mobileSidebarVisible.value = !mobileSidebarVisible.value
      return
    }

    setSidebarCollapsed(!sidebarCollapsed.value)
  }

  // 设置全屏状态。
  // 当前先保留状态入口，后续接入浏览器 Fullscreen API 时直接复用。
  function setFullscreenActive(nextFullscreenActive) {
    fullscreenActive.value = Boolean(nextFullscreenActive)
    persistAppState()
  }

  // 设置设备类型。
  // 一般不手动调用，更多是通过屏幕宽度自动更新。
  function setDeviceType(nextDeviceType) {
    const validTypeList = Object.values(DEVICE_TYPE_ENUM)

    if (!validTypeList.includes(nextDeviceType)) {
      return
    }

    deviceType.value = nextDeviceType
  }

  // 根据窗口宽度更新设备类型。
  // 这样布局层可以统一基于 deviceType 判断当前是桌面端还是移动端。
  function updateDeviceTypeByWidth(width = window.innerWidth) {
    const nextDeviceType =
      width < LAYOUT_MOBILE_BREAKPOINT ? DEVICE_TYPE_ENUM.MOBILE : DEVICE_TYPE_ENUM.DESKTOP

    setDeviceType(nextDeviceType)

    if (nextDeviceType === DEVICE_TYPE_ENUM.DESKTOP) {
      mobileSidebarVisible.value = false
    }
  }

  // 打开移动端侧边栏。
  function openMobileSidebar() {
    if (!isMobile.value) {
      return
    }

    mobileSidebarVisible.value = true
  }

  // 关闭移动端侧边栏。
  function closeMobileSidebar() {
    mobileSidebarVisible.value = false
  }

  // 从本地缓存恢复应用状态。
  // 项目启动时调用一次，让主题、布局模式、折叠状态、已展开菜单在刷新后保持一致。
  function restoreAppState() {
    const defaultState = createDefaultAppState()
    const cachedState = getStorage(APP_STORAGE_KEY, defaultState)

    theme.value = cachedState.theme || defaultState.theme
    layoutMode.value = cachedState.layoutMode || defaultState.layoutMode
    sidebarCollapsed.value = Boolean(cachedState.sidebarCollapsed)
    fullscreenActive.value = Boolean(cachedState.fullscreenActive)
    openedMenuPathList.value = normalizeOpenedMenuPathList(cachedState.openedMenuPathList)

    syncThemeToDom()

    if (typeof window !== 'undefined') {
      updateDeviceTypeByWidth(window.innerWidth)
    }
  }

  // 重置应用状态。
  // 常见场景：切换账号后把个性化状态恢复到默认值。
  function resetAppState() {
    const defaultState = createDefaultAppState()

    theme.value = defaultState.theme
    layoutMode.value = defaultState.layoutMode
    sidebarCollapsed.value = defaultState.sidebarCollapsed
    fullscreenActive.value = defaultState.fullscreenActive
    openedMenuPathList.value = defaultState.openedMenuPathList
    mobileSidebarVisible.value = false

    syncThemeToDom()
    removeStorage(APP_STORAGE_KEY)
  }

  return {
    theme,
    layoutMode,
    sidebarCollapsed,
    fullscreenActive,
    deviceType,
    mobileSidebarVisible,
    openedMenuPathList,
    isMobile,
    isDesktop,
    isLeftLayout,
    isTopLayout,
    isMixLayout,
    setTheme,
    setLayoutMode,
    setSidebarCollapsed,
    setOpenedMenuPathList,
    addOpenedMenuPath,
    removeOpenedMenuPath,
    toggleOpenedMenuPath,
    toggleSidebar,
    setFullscreenActive,
    setDeviceType,
    updateDeviceTypeByWidth,
    openMobileSidebar,
    closeMobileSidebar,
    restoreAppState,
    resetAppState
  }
})
