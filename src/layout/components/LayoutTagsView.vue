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
        标签操作
        <el-icon class="layout-tags-view__action-icon">
          <IconEpArrowDown />
        </el-icon>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeCurrent">关闭当前</el-dropdown-item>
          <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTagsView } from '@/hooks/useTagsView'

const route = useRoute()
const router = useRouter()
const {
  visitedViewList,
  addVisitedView,
  removeVisitedView,
  removeOtherViews,
  removeAllViews,
  findVisitedViewByPath
} = useTagsView()

// 每次路由切换后，把当前页面同步到标签页列表中。
watch(
  () => route.fullPath,
  () => {
    addVisitedView(route)
  },
  {
    immediate: true
  }
)

const currentTag = computed(() => {
  return findVisitedViewByPath(route.path)
})

function isActiveTag(tag) {
  return route.path === tag.path
}

function goTag(tag) {
  router.push(tag.fullPath)
}

function navigateToFallback(tagList = []) {
  const fallbackTag = tagList[tagList.length - 1]

  if (fallbackTag) {
    router.push(fallbackTag.fullPath)
    return
  }

  router.push('/dashboard')
}

function closeTag(tag) {
  const isCurrentTag = tag.path === route.path
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
      router.push(activeTag.fullPath)
      return
    }

    const nextTagList = removeVisitedView(activeTag)
    navigateToFallback(nextTagList)
    return
  }

  if (command === 'closeOthers') {
    const nextTagList = removeOtherViews(activeTag)

    if (!nextTagList.some((tag) => tag.path === route.path)) {
      navigateToFallback(nextTagList)
      return
    }

    router.push(activeTag.fullPath)
    return
  }

  if (command === 'closeAll') {
    removeAllViews()
    router.push('/dashboard')
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
