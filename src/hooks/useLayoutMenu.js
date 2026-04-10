/**
 * 学习注释：
 * 1. 文件角色：这是布局菜单组合式函数，负责把当前路由和菜单树算成顶部菜单、侧边栏菜单等 UI 数据。
 * 2. 所在分层：组合式逻辑层：把可复用状态和行为组合成 hook。
 * 3. 当前文件主要依赖：{ computed } <- vue；{ storeToRefs } <- pinia；{ useRoute } <- vue-router；{ getBaseRoutePath } <- src/locales/resolve.js；{ usePermissionStore } <- src/store/modules/permission.js
 * 4. 当前文件对外暴露：命名导出：useLayoutMenu
 * 5. 常见上游调用方：src/layout/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { getBaseRoutePath } from '@/locales/resolve'
import { usePermissionStore } from '@/store/modules/permission'

function isMenuPathMatch(routePath = '', menuPath = '') {
  if (!routePath || !menuPath) {
    return false
  }

  return routePath === menuPath || routePath.startsWith(`${menuPath}/`)
}

export function useLayoutMenu() {
  const route = useRoute()
  const permissionStore = usePermissionStore()
  const { menuRouteList } = storeToRefs(permissionStore)

  const topMenuList = computed(() => {
    return Array.isArray(menuRouteList.value) ? menuRouteList.value : []
  })

  const activeTopMenuPath = computed(() => {
    const currentPath = getBaseRoutePath(route.meta?.activeMenu || route.path)
    const matchedMenu = topMenuList.value.find((item) => isMenuPathMatch(currentPath, item.path))

    return matchedMenu?.path || topMenuList.value[0]?.path || ''
  })

  const activeTopMenu = computed(() => {
    return topMenuList.value.find((item) => item.path === activeTopMenuPath.value) || null
  })

  const mixSidebarMenuList = computed(() => {
    const currentTopMenu = activeTopMenu.value

    if (!currentTopMenu) {
      return []
    }

    if (Array.isArray(currentTopMenu.children) && currentTopMenu.children.length > 0) {
      return currentTopMenu.children
    }

    return [currentTopMenu]
  })

  return {
    menuRouteList,
    topMenuList,
    activeTopMenuPath,
    activeTopMenu,
    mixSidebarMenuList
  }
}
