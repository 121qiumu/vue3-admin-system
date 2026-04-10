/**
 * 学习注释：
 * 1. 文件角色：这是布局状态组合式函数，本质上是把 app store 再封装成更方便模板使用的接口。
 * 2. 所在分层：组合式逻辑层：把可复用状态和行为组合成 hook。
 * 3. 当前文件主要依赖：{ storeToRefs } <- pinia；{ useAppStore } <- src/store/modules/app.js
 * 4. 当前文件对外暴露：命名导出：useLayout
 * 5. 常见上游调用方：src/layout/components/LayoutHeader.vue、src/layout/components/LayoutMenu.vue、src/layout/components/LayoutSettingsPanel.vue、src/layout/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
