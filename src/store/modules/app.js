/**
 * 学习注释：
 * 1. 文件角色：这是应用级 store，主要管理主题、语言、布局、侧边栏、设备类型等全局 UI 状态。
 * 2. 所在分层：状态管理层：保存跨页面共享的数据状态。
 * 3. 当前文件主要依赖：{ computed, ref } <- vue；{ defineStore } <- pinia；{ DEFAULT_LAYOUT_MODE, DEVICE_TYPE_ENUM, LAYOUT_MOBILE_BREAKPOINT, LAYOUT_MODE_ENUM } <- src/constants/layout.js；{ DEFAULT_LOCALE } <- src/constants/locale.js；{ APP_STORAGE_KEY } <- src/constants/storage.js；{ DEFAULT_THEME } <- src/constants/theme.js；其余依赖 4 项
 * 4. 当前文件对外暴露：命名导出：useAppStore
 * 5. 常见上游调用方：src/hooks/useLayout.js、src/hooks/useLocale.js、src/hooks/useTheme.js、src/permission/guard.js、src/store/index.js
 * 6. 阅读建议：建议按“state -> computed -> action -> 持久化/恢复”这个顺序阅读。
 */
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  DEFAULT_LAYOUT_MODE,
  DEVICE_TYPE_ENUM,
  LAYOUT_MOBILE_BREAKPOINT,
  LAYOUT_MODE_ENUM
} from '@/constants/layout'
import { DEFAULT_LOCALE } from '@/constants/locale'
import { APP_STORAGE_KEY } from '@/constants/storage'
import { DEFAULT_THEME } from '@/constants/theme'
import { applyAppLocale } from '@/locales/helper'
import { getPreferredLocale, normalizeLocale } from '@/locales/resolve'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'
import { applyTheme } from '@/utils/theme'

function createDefaultAppState() {
  return {
    theme: DEFAULT_THEME,
    language: getPreferredLocale() || DEFAULT_LOCALE,
    layoutMode: DEFAULT_LAYOUT_MODE,
    sidebarCollapsed: false,
    fullscreenActive: false,
    openedMenuPathList: []
  }
}

function normalizeOpenedMenuPathList(pathList = []) {
  if (!Array.isArray(pathList)) {
    return []
  }

  return [...new Set(pathList.filter((item) => typeof item === 'string' && item.trim()))]
}

export const useAppStore = defineStore('app', () => {
  const theme = ref(DEFAULT_THEME)
  const language = ref(getPreferredLocale() || DEFAULT_LOCALE)
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

  function persistAppState() {
    setStorage(APP_STORAGE_KEY, {
      theme: theme.value,
      language: language.value,
      layoutMode: layoutMode.value,
      sidebarCollapsed: sidebarCollapsed.value,
      fullscreenActive: fullscreenActive.value,
      openedMenuPathList: openedMenuPathList.value
    })
  }

  function syncThemeToDom() {
    theme.value = applyTheme(theme.value)
  }

  function syncLanguageToDom() {
    language.value = applyAppLocale(language.value)
  }

  function setTheme(nextTheme) {
    theme.value = nextTheme || DEFAULT_THEME
    syncThemeToDom()
    persistAppState()
  }

  function setLanguage(nextLanguage) {
    language.value = normalizeLocale(nextLanguage || DEFAULT_LOCALE)
    syncLanguageToDom()
    persistAppState()
    return language.value
  }

  function setLayoutMode(nextLayoutMode) {
    const validModeList = Object.values(LAYOUT_MODE_ENUM)

    if (!validModeList.includes(nextLayoutMode)) {
      return
    }

    layoutMode.value = nextLayoutMode
    persistAppState()
  }

  function setSidebarCollapsed(nextCollapsed) {
    sidebarCollapsed.value = Boolean(nextCollapsed)
    persistAppState()
  }

  function setOpenedMenuPathList(nextPathList = []) {
    openedMenuPathList.value = normalizeOpenedMenuPathList(nextPathList)
    persistAppState()
  }

  function addOpenedMenuPath(path = '') {
    if (!path || openedMenuPathList.value.includes(path)) {
      return
    }

    setOpenedMenuPathList([...openedMenuPathList.value, path])
  }

  function removeOpenedMenuPath(path = '') {
    if (!path) {
      return
    }

    setOpenedMenuPathList(openedMenuPathList.value.filter((item) => item !== path))
  }

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

  function toggleSidebar() {
    if (isMobile.value) {
      mobileSidebarVisible.value = !mobileSidebarVisible.value
      return
    }

    setSidebarCollapsed(!sidebarCollapsed.value)
  }

  function setFullscreenActive(nextFullscreenActive) {
    fullscreenActive.value = Boolean(nextFullscreenActive)
    persistAppState()
  }

  function setDeviceType(nextDeviceType) {
    const validTypeList = Object.values(DEVICE_TYPE_ENUM)

    if (!validTypeList.includes(nextDeviceType)) {
      return
    }

    deviceType.value = nextDeviceType
  }

  function updateDeviceTypeByWidth(width = window.innerWidth) {
    const nextDeviceType =
      width < LAYOUT_MOBILE_BREAKPOINT ? DEVICE_TYPE_ENUM.MOBILE : DEVICE_TYPE_ENUM.DESKTOP

    setDeviceType(nextDeviceType)

    if (nextDeviceType === DEVICE_TYPE_ENUM.DESKTOP) {
      mobileSidebarVisible.value = false
    }
  }

  function openMobileSidebar() {
    if (!isMobile.value) {
      return
    }

    mobileSidebarVisible.value = true
  }

  function closeMobileSidebar() {
    mobileSidebarVisible.value = false
  }

  function restoreAppState() {
    const defaultState = createDefaultAppState()
    const cachedState = getStorage(APP_STORAGE_KEY, defaultState)

    theme.value = cachedState.theme || defaultState.theme
    language.value = normalizeLocale(cachedState.language || defaultState.language)
    layoutMode.value = cachedState.layoutMode || defaultState.layoutMode
    sidebarCollapsed.value = Boolean(cachedState.sidebarCollapsed)
    fullscreenActive.value = Boolean(cachedState.fullscreenActive)
    openedMenuPathList.value = normalizeOpenedMenuPathList(cachedState.openedMenuPathList)

    syncThemeToDom()
    syncLanguageToDom()

    if (typeof window !== 'undefined') {
      updateDeviceTypeByWidth(window.innerWidth)
    }
  }

  function resetAppState() {
    const defaultState = createDefaultAppState()

    theme.value = defaultState.theme
    language.value = defaultState.language
    layoutMode.value = defaultState.layoutMode
    sidebarCollapsed.value = defaultState.sidebarCollapsed
    fullscreenActive.value = defaultState.fullscreenActive
    openedMenuPathList.value = defaultState.openedMenuPathList
    mobileSidebarVisible.value = false

    syncThemeToDom()
    syncLanguageToDom()
    removeStorage(APP_STORAGE_KEY)
  }

  return {
    theme,
    language,
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
    setLanguage,
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
