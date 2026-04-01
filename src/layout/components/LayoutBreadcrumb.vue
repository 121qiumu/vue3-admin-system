<template>
  <el-breadcrumb class="layout-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.key">
      <span
        v-if="item.isCurrent || item.meta?.breadcrumb === false"
        class="layout-breadcrumb__current"
      >
        {{ item.meta?.title }}
      </span>

      <a v-else href="#" class="layout-breadcrumb__link" @click.prevent="goBreadcrumb(item)">
        {{ item.meta?.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 根据当前匹配到的路由记录，自动生成面包屑列表。
// 这里会过滤掉：
// 1. 没有 title 的路由
// 2. 被标记为 hidden 的路由
// 3. 主动声明 breadcrumb: false 的路由
//
// 额外说明：
// 这里单独生成 key 字段，而不是直接拿 path 当 key。
// 原因是某些父级路由会把 redirect 指向自己的子路由，
// 如果继续把 redirect 后的 path 当 key，就可能和子路由 path 重复，
// 从而触发 Vue 的 Duplicate keys 警告。
const breadcrumbList = computed(() => {
  return route.matched
    .filter((item) => {
      return item.meta?.title && !item.meta?.hidden && item.meta?.breadcrumb !== false
    })
    .map((item, index, matchedList) => {
      const redirectPath = typeof item.redirect === 'string' ? item.redirect : ''
      const navigatePath = redirectPath || item.path
      const isCurrent = index === matchedList.length - 1

      return {
        key: item.name ? String(item.name) : `${item.path}-${index}`,
        path: navigatePath,
        isCurrent,
        meta: item.meta
      }
    })
})

function goBreadcrumb(item) {
  if (!item?.path || item.path === route.path) {
    return
  }

  router.push(item.path)
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
