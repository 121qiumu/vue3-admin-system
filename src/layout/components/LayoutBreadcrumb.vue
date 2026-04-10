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
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ computed } <- vue；{ useRoute, useRouter } <- vue-router；{ getMetaTitle } <- src/locales/helper.js；{ getBaseRoutePath } <- src/locales/resolve.js；{ useLocale } <- src/hooks/useLocale.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/components/LayoutHeader.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
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
