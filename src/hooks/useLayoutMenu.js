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
