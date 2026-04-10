/**
 * 学习注释：
 * 1. 文件角色：这是 Pinia 总入口，负责创建 Pinia 实例，并统一恢复各个 store 的缓存状态。
 * 2. 所在分层：状态管理层。
 * 3. 当前文件主要依赖：四个核心 store 模块 app / user / permission / tabs。
 * 4. 当前文件对外暴露：pinia、initializeStore。
 * 5. 常见上游调用方：plugins/index.js、permission/index.js、permission/guard.js、request/helper.js。
 * 6. 阅读建议：先理解 pinia 是“容器”，再理解 initializeStore 是“恢复缓存状态”的启动动作。
 */
import { createPinia } from 'pinia'

import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permission'
import { useTabsStore } from './modules/tabs'
import { useUserStore } from './modules/user'

// 创建唯一的 Pinia 实例。
const pinia = createPinia()

// 项目启动时统一恢复各个 store 的缓存。
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
