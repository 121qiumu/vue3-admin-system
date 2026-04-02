<template>
  <el-menu
    ref="menuRef"
    :default-active="activeMenu"
    :default-openeds="visibleOpenedMenuPathList"
    :collapse="mode === 'vertical' ? collapse : false"
    :mode="mode"
    :ellipsis="false"
    :class="['layout-menu', `layout-menu--${theme}`, `layout-menu--${mode}`]"
    @open="handleMenuOpen"
    @close="handleMenuClose"
    @select="handleSelect"
  >
    <LayoutMenuItem v-for="item in menuList" :key="item.path" :menu="item" />
  </el-menu>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLayout } from '@/hooks/useLayout'
import { useLocale } from '@/hooks/useLocale'
import { getBaseRoutePath } from '@/locales/resolve'

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
const router = useRouter()
const menuRef = ref(null)
const { toLocalePath } = useLocale()
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

const activeMenu = computed(() => {
  return getBaseRoutePath(route.meta?.activeMenu || route.path)
})

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

  visibleSubMenuPathList.value.forEach((path) => {
    if (expectedOpenedPathSet.has(path)) {
      menuRef.value.open(path)
      return
    }

    menuRef.value.close(path)
  })
}

function handleMenuOpen(index) {
  if (props.mode !== 'vertical') {
    return
  }

  addOpenedMenuPath(index)
}

function handleMenuClose(index) {
  if (props.mode !== 'vertical') {
    return
  }

  removeOpenedMenuPath(index)
}

function handleSelect(index) {
  router.push(toLocalePath(index))
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
