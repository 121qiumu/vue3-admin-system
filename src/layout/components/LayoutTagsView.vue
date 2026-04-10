<template>
  <div class="layout-tags-view">
    <el-scrollbar class="layout-tags-view__scrollbar">
      <div class="layout-tags-view__list">
        <div
          v-for="tag in visitedViewList"
          :key="tag.path"
          class="layout-tag"
          :class="{ 'is-active': isActiveTag(tag) }"
          @click="goTag(tag)"
        >
          <span class="layout-tag__title">{{ tag.title }}</span>

          <el-icon v-if="!tag.affix" class="layout-tag__close" @click.stop="closeTag(tag)">
            <IconEpClose />
          </el-icon>
        </div>
      </div>
    </el-scrollbar>

    <el-dropdown class="layout-tags-view__action" @command="handleCommand">
      <el-button text>
        {{ t('layout.tags.actions') }}
        <el-icon class="layout-tags-view__action-icon">
          <IconEpArrowDown />
        </el-icon>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeCurrent">{{
            t('common.actions.closeCurrent')
          }}</el-dropdown-item>
          <el-dropdown-item command="closeOthers">{{
            t('common.actions.closeOthers')
          }}</el-dropdown-item>
          <el-dropdown-item command="closeAll">{{ t('common.actions.closeAll') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ computed, watch } <- vue；{ useI18n } <- vue-i18n；{ useRoute, useRouter } <- vue-router；{ useLocale } <- src/hooks/useLocale.js；{ useTagsView } <- src/hooks/useTagsView.js；{ getBaseRoutePath } <- src/locales/resolve.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/modes/LeftLayout.vue、src/layout/modes/MixLayout.vue、src/layout/modes/TopLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'
import { useTagsView } from '@/hooks/useTagsView'
import { getBaseRoutePath } from '@/locales/resolve'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { language, toLocalePath } = useLocale()
const {
  visitedViewList,
  addVisitedView,
  removeVisitedView,
  removeOtherViews,
  removeAllViews,
  findVisitedViewByPath,
  refreshVisitedViewTitleList
} = useTagsView()

watch(
  () => route.fullPath,
  () => {
    addVisitedView(route)
  },
  {
    immediate: true
  }
)

watch(
  () => language.value,
  () => {
    refreshVisitedViewTitleList()
  }
)

const currentTag = computed(() => {
  return findVisitedViewByPath(route.path)
})

function isActiveTag(tag) {
  return getBaseRoutePath(route.path) === tag.path
}

function goTag(tag) {
  router.push(toLocalePath(tag.fullPath || tag.path))
}

function navigateToFallback(tagList = []) {
  const fallbackTag = tagList[tagList.length - 1]

  if (fallbackTag) {
    router.push(toLocalePath(fallbackTag.fullPath || fallbackTag.path))
    return
  }

  router.push(toLocalePath('/dashboard'))
}

function closeTag(tag) {
  const isCurrentTag = tag.path === getBaseRoutePath(route.path)
  const nextTagList = removeVisitedView(tag)

  if (!isCurrentTag) {
    return
  }

  navigateToFallback(nextTagList)
}

function handleCommand(command) {
  const activeTag = currentTag.value

  if (!activeTag) {
    return
  }

  if (command === 'closeCurrent') {
    if (activeTag.affix) {
      router.push(toLocalePath(activeTag.fullPath || activeTag.path))
      return
    }

    const nextTagList = removeVisitedView(activeTag)
    navigateToFallback(nextTagList)
    return
  }

  if (command === 'closeOthers') {
    const nextTagList = removeOtherViews(activeTag)

    if (!nextTagList.some((tag) => tag.path === getBaseRoutePath(route.path))) {
      navigateToFallback(nextTagList)
      return
    }

    router.push(toLocalePath(activeTag.fullPath || activeTag.path))
    return
  }

  if (command === 'closeAll') {
    removeAllViews()
    router.push(toLocalePath('/dashboard'))
  }
}
</script>

<style scoped lang="less">
.layout-tags-view {
  display: flex;
  align-items: center;
  gap: var(--app-space-sm);
  min-height: var(--app-layout-tags-view-height);
  padding: 0 var(--app-space-md);
  background-color: var(--app-color-bg-container);
  border-bottom: var(--app-border-width) solid var(--app-color-border-light);
}

.layout-tags-view__scrollbar {
  min-width: 0;
  flex: 1;
}

.layout-tags-view__list {
  display: flex;
  gap: var(--app-space-xs);
  padding: var(--app-space-xs) 0;
}

.layout-tags-view__action {
  flex-shrink: 0;
}

.layout-tags-view__action-icon {
  margin-left: 4px;
}

.layout-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-2xs);
  height: 30px;
  padding: 0 var(--app-space-sm);
  color: var(--app-color-text-regular);
  background-color: var(--app-color-bg-page);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-round);
  cursor: pointer;
  transition:
    color var(--app-transition-duration) var(--app-transition-timing),
    border-color var(--app-transition-duration) var(--app-transition-timing),
    background-color var(--app-transition-duration) var(--app-transition-timing);
}

.layout-tag.is-active {
  color: #ffffff;
  background-color: var(--app-color-primary);
  border-color: var(--app-color-primary);
}

.layout-tag__title {
  white-space: nowrap;
}

.layout-tag__close {
  padding: 2px;
  font-size: 12px;
  border-radius: 50%;
}

.layout-tag__close:hover {
  background-color: rgba(255, 255, 255, 0.18);
}

@media (max-width: 768px) {
  .layout-tags-view {
    padding: 0 var(--app-space-sm);
  }
}
</style>
