import { storeToRefs } from 'pinia'

import { useAppStore } from '@/store/modules/app'

export function useLayout() {
  const appStore = useAppStore()
  const {
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
    isMixLayout
  } = storeToRefs(appStore)

  return {
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
    setTheme: appStore.setTheme,
    setLayoutMode: appStore.setLayoutMode,
    setSidebarCollapsed: appStore.setSidebarCollapsed,
    setOpenedMenuPathList: appStore.setOpenedMenuPathList,
    addOpenedMenuPath: appStore.addOpenedMenuPath,
    removeOpenedMenuPath: appStore.removeOpenedMenuPath,
    toggleOpenedMenuPath: appStore.toggleOpenedMenuPath,
    toggleSidebar: appStore.toggleSidebar,
    setFullscreenActive: appStore.setFullscreenActive,
    setDeviceType: appStore.setDeviceType,
    updateDeviceTypeByWidth: appStore.updateDeviceTypeByWidth,
    openMobileSidebar: appStore.openMobileSidebar,
    closeMobileSidebar: appStore.closeMobileSidebar
  }
}
