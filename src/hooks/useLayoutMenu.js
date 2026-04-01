import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

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

  // 顶部一级菜单列表。
  // 当前直接取权限菜单的第一层，适合顶部布局和混合布局复用。
  const topMenuList = computed(() => {
    return Array.isArray(menuRouteList.value) ? menuRouteList.value : []
  })

  // 当前激活的顶部菜单路径。
  // 混合布局会基于它决定左侧二级菜单显示哪一组内容。
  const activeTopMenuPath = computed(() => {
    const currentPath = route.meta?.activeMenu || route.path
    const matchedMenu = topMenuList.value.find((item) => isMenuPathMatch(currentPath, item.path))

    return matchedMenu?.path || topMenuList.value[0]?.path || ''
  })

  // 当前激活的顶部菜单对象。
  const activeTopMenu = computed(() => {
    return topMenuList.value.find((item) => item.path === activeTopMenuPath.value) || null
  })

  // 混合布局左侧菜单。
  // 如果当前顶部菜单有 children，就显示 children；
  // 如果没有 children，就退回显示它自己，避免左侧完全空掉。
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
