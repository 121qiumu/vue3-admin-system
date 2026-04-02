<template>
  <el-breadcrumb class="layout-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.key">
      <span
        v-if="item.isCurrent || item.meta?.breadcrumb === false"
        class="layout-breadcrumb__current"
      >
        {{ item.title }}
      </span>

      <a v-else href="#" class="layout-breadcrumb__link" @click.prevent="goBreadcrumb(item)">
        {{ item.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getMetaTitle } from '@/locales/helper'
import { getBaseRoutePath } from '@/locales/resolve'
import { useLocale } from '@/hooks/useLocale'

const route = useRoute()
const router = useRouter()
const { toLocalePath } = useLocale()

const breadcrumbList = computed(() => {
  return route.matched
    .filter((item) => {
      return getMetaTitle(item.meta) && !item.meta?.hidden && item.meta?.breadcrumb !== false
    })
    .map((item, index, matchedList) => {
      const redirectPath = typeof item.redirect === 'string' ? item.redirect : ''
      const navigatePath = getBaseRoutePath(redirectPath || item.path)
      const isCurrent = index === matchedList.length - 1

      return {
        key: item.name ? String(item.name) : `${navigatePath}-${index}`,
        path: navigatePath,
        isCurrent,
        title: getMetaTitle(item.meta, route.params),
        meta: item.meta
      }
    })
})

function goBreadcrumb(item) {
  if (!item?.path || item.path === getBaseRoutePath(route.path)) {
    return
  }

  router.push(toLocalePath(item.path))
}
</script>

<style scoped lang="less">
.layout-breadcrumb {
  margin-top: 6px;
}

.layout-breadcrumb__link,
.layout-breadcrumb__current {
  font-size: var(--app-font-size-small);
  line-height: 1;
}

.layout-breadcrumb__link {
  color: var(--app-color-text-secondary);
  text-decoration: none;
  transition: color var(--app-transition-duration) var(--app-transition-timing);
}

.layout-breadcrumb__link:hover {
  color: var(--app-color-primary);
}

.layout-breadcrumb__current {
  color: var(--app-color-text-secondary);
}
</style>
