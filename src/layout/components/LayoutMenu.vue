<template>
  <el-menu
    ref="menuRef"
    :default-active="activeMenu"
    :default-openeds="visibleOpenedMenuPathList"
    :collapse="mode === 'vertical' ? collapse : false"
    :mode="mode"
    :ellipsis="false"
    :class="['layout-menu', `layout-menu--${theme}`, `layout-menu--${mode}`]"
    router
    @open="handleMenuOpen"
    @close="handleMenuClose"
  >
    <LayoutMenuItem v-for="item in menuList" :key="item.path" :menu="item" />
  </el-menu>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useLayout } from '@/hooks/useLayout'

import LayoutMenuItem from './LayoutMenuItem.vue'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  collapse: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'vertical'
  },
  theme: {
    type: String,
    default: 'sidebar'
  }
})

const route = useRoute()
const menuRef = ref(null)
const { openedMenuPathList, addOpenedMenuPath, removeOpenedMenuPath } = useLayout()

function collectSubMenuPathList(menuList = []) {
  return menuList.reduce((result, item) => {
    const childList = Array.isArray(item.children) ? item.children : []

    if (childList.length > 0 && item.path) {
      result.push(item.path)
      result.push(...collectSubMenuPathList(childList))
    }

    return result
  }, [])
}

const visibleSubMenuPathList = computed(() => {
  if (props.mode !== 'vertical') {
    return []
  }

  return collectSubMenuPathList(props.menuList)
})

// 当前激活菜单。
// 如果未来某些详情页希望高亮上级菜单，可以使用 route.meta.activeMenu 覆盖。
const activeMenu = computed(() => {
  return route.meta?.activeMenu || route.path
})

// 当前真正可见且应该保持展开的父菜单列表。
// 这份状态只来源于 store 中持久化的 openedMenuPathList，
// 不根据当前路由反推，从而避免“当前选中菜单”和“当前展开菜单”混在一起。
const visibleOpenedMenuPathList = computed(() => {
  const visiblePathSet = new Set(visibleSubMenuPathList.value)
  return openedMenuPathList.value.filter((path) => visiblePathSet.has(path))
})

async function syncMenuOpenedState() {
  if (props.mode !== 'vertical' || props.collapse || !menuRef.value) {
    return
  }

  await nextTick()

  const expectedOpenedPathSet = new Set(visibleOpenedMenuPathList.value)

  // 这里显式同步展开状态：
  // 1. store 里要求展开的父菜单，用 open 打开
  // 2. 其余当前可见的父菜单，用 close 收起
  // 这样无论是刷新页面、切换路由还是菜单组件内部重渲染，
  // 最终都会回到“以持久化展开状态为准”的结果。
  visibleSubMenuPathList.value.forEach((path) => {
    if (expectedOpenedPathSet.has(path)) {
      menuRef.value.open(path)
      return
    }

    menuRef.value.close(path)
  })
}

// 用户手动展开父菜单时，单独把展开状态写入 store。
// 这里只记录“展开过哪些父菜单”，不影响当前激活菜单。
function handleMenuOpen(index) {
  if (props.mode !== 'vertical') {
    return
  }

  addOpenedMenuPath(index)
}

// 用户手动收起父菜单时，再把对应路径从 store 中移除。
function handleMenuClose(index) {
  if (props.mode !== 'vertical') {
    return
  }

  removeOpenedMenuPath(index)
}

watch(
  () => visibleOpenedMenuPathList.value.join('|'),
  () => {
    syncMenuOpenedState()
  },
  {
    immediate: true
  }
)

watch(
  () => visibleSubMenuPathList.value.join('|'),
  () => {
    syncMenuOpenedState()
  }
)

watch(
  () => props.collapse,
  (collapsed) => {
    if (!collapsed) {
      syncMenuOpenedState()
    }
  }
)

watch(
  () => route.fullPath,
  () => {
    syncMenuOpenedState()
  }
)
</script>

<style scoped lang="less">
.layout-menu {
  border-right: none;
  background-color: transparent;
}

.layout-menu.layout-menu--header {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--app-color-header-text);
  --el-menu-hover-text-color: var(--app-color-primary);
  --el-menu-active-color: var(--app-color-primary);
  --el-menu-hover-bg-color: transparent;
  min-width: 0;
}

.layout-menu.layout-menu--header :deep(.el-menu--horizontal) {
  border-bottom: none;
}

.layout-menu.layout-menu--header :deep(.el-menu-item),
.layout-menu.layout-menu--header :deep(.el-sub-menu__title) {
  height: calc(var(--app-layout-header-height) - 2px);
  line-height: calc(var(--app-layout-header-height) - 2px);
}

.layout-menu.layout-menu--header :deep(.el-menu-item),
.layout-menu.layout-menu--header :deep(.el-sub-menu__title),
.layout-menu.layout-menu--header :deep(.el-sub-menu__icon-arrow) {
  color: var(--app-color-header-text);
}
</style>
