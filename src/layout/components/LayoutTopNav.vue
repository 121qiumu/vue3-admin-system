<template>
  <el-menu
    :default-active="activePath"
    mode="horizontal"
    :ellipsis="false"
    class="layout-top-nav"
    @select="handleSelect"
  >
    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
      <span class="layout-top-nav__item">
        <AppIcon
          v-if="item.meta?.icon"
          :name="item.meta.icon"
          :show-fallback="false"
          class="layout-top-nav__icon"
        />
        <span class="layout-top-nav__text">{{ getMetaTitle(item.meta) || 'Unnamed Menu' }}</span>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

import AppIcon from '@/components/common/AppIcon.vue'
import { useLocale } from '@/hooks/useLocale'
import { getMetaTitle } from '@/locales/helper'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  activePath: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const { toLocalePath } = useLocale()

function handleSelect(path) {
  const targetPath = props.menuList.find((item) => item.path === path)?.path || path
  router.push(toLocalePath(targetPath))
}
</script>

<style scoped lang="less">
.layout-top-nav {
  --el-menu-bg-color: transparent;
  --el-menu-text-color: var(--app-color-header-text);
  --el-menu-hover-text-color: var(--app-color-primary);
  --el-menu-active-color: var(--app-color-primary);
  min-width: 0;
  border-bottom: none;
}

.layout-top-nav :deep(.el-menu-item) {
  height: calc(var(--app-layout-header-height) - 2px);
  line-height: calc(var(--app-layout-header-height) - 2px);
}

.layout-top-nav__item {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-xs);
}

.layout-top-nav__icon {
  color: currentColor;
}

.layout-top-nav__text {
  white-space: nowrap;
}
</style>
