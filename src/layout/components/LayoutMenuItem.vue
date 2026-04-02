<template>
  <el-sub-menu v-if="hasChildren" :index="menu.path">
    <template #title>
      <div class="layout-menu-item__title">
        <AppIcon
          v-if="menu.meta?.icon"
          :name="menu.meta.icon"
          :show-fallback="false"
          class="layout-menu-item__icon"
        />
        <span class="layout-menu-item__text">{{ menuTitle }}</span>
      </div>
    </template>

    <LayoutMenuItem v-for="child in menu.children" :key="child.path" :menu="child" />
  </el-sub-menu>

  <el-menu-item v-else :index="menu.path">
    <div class="layout-menu-item__title">
      <AppIcon
        v-if="menu.meta?.icon"
        :name="menu.meta.icon"
        :show-fallback="false"
        class="layout-menu-item__icon"
      />
      <span class="layout-menu-item__text">{{ menuTitle }}</span>
    </div>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'

import AppIcon from '@/components/common/AppIcon.vue'
import { getMetaTitle } from '@/locales/helper'

defineOptions({
  name: 'LayoutMenuItem'
})

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const hasChildren = computed(() => {
  return Array.isArray(props.menu.children) && props.menu.children.length > 0
})

const menuTitle = computed(() => {
  return getMetaTitle(props.menu.meta, {}) || 'Unnamed Menu'
})
</script>

<style scoped lang="less">
.layout-menu-item__title {
  display: inline-flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: var(--app-space-xs);
}

.layout-menu-item__icon {
  color: currentColor;
}

.layout-menu-item__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
