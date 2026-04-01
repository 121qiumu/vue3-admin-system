import { createPinia } from 'pinia'

import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'
import { useTabsStore } from './modules/tabs'
import { useUserStore } from './modules/user'

// 创建 Pinia 实例。
const pinia = createPinia()

// 初始化所有核心 store。
// 项目启动时调用一次，让本地缓存中的状态尽快恢复到内存中。
export function initializeStore() {
  const userStore = useUserStore(pinia)
  const appStore = useAppStore(pinia)
  const permissionStore = usePermissionStore(pinia)
  const tabsStore = useTabsStore(pinia)

  userStore.restoreUserState()
  appStore.restoreAppState()
  permissionStore.restorePermissionState()
  tabsStore.restoreTabsState()
}

export default pinia
