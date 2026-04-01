import { ref } from 'vue'
import { defineStore } from 'pinia'

import { staticAffixTagList } from '@/router/modules/static'
import { TABS_STORAGE_KEY } from '@/constants/storage'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

function createTagFromRoute(route) {
  if (!route?.name || route.meta?.hidden) {
    return null
  }

  return {
    fullPath: route.fullPath,
    path: route.path,
    name: route.name,
    title: route.meta?.title || String(route.name),
    affix: Boolean(route.meta?.affix),
    keepAlive: Boolean(route.meta?.keepAlive)
  }
}

function createStaticAffixTagList() {
  return staticAffixTagList.map((tag) => ({ ...tag }))
}

function mergeVisitedViewList(routeTagList = []) {
  const mergedMap = new Map()

  createStaticAffixTagList().forEach((tag) => {
    mergedMap.set(tag.path, { ...tag, affix: true })
  })

  routeTagList.forEach((tag) => {
    if (!tag?.path || !tag?.name) {
      return
    }

    const existingTag = mergedMap.get(tag.path)

    if (existingTag) {
      mergedMap.set(tag.path, {
        ...existingTag,
        ...tag,
        affix: Boolean(existingTag.affix || tag.affix)
      })
      return
    }

    mergedMap.set(tag.path, {
      ...tag,
      affix: Boolean(tag.affix)
    })
  })

  const affixPathList = createStaticAffixTagList().map((tag) => tag.path)
  const mergedTagList = Array.from(mergedMap.values())
  const affixTagList = mergedTagList.filter((tag) => affixPathList.includes(tag.path))
  const normalTagList = mergedTagList.filter((tag) => !affixPathList.includes(tag.path))

  affixTagList.sort((prevTag, nextTag) => {
    return affixPathList.indexOf(prevTag.path) - affixPathList.indexOf(nextTag.path)
  })

  return [...affixTagList, ...normalTagList]
}

export const useTabsStore = defineStore('tabs', () => {
  // 已访问标签页列表。
  // 这是标签页导航最核心的一份状态。
  const visitedViewList = ref(createStaticAffixTagList())

  // 需要缓存的页面名称列表。
  // 后续接入 KeepAlive 时，可以直接复用这份数据。
  const cachedViewNameList = ref([])

  // 根据当前标签页列表，重新生成缓存页面名称列表。
  function updateCachedViewNameList() {
    cachedViewNameList.value = visitedViewList.value
      .filter((item) => item.keepAlive)
      .map((item) => item.name)
  }

  // 持久化标签页状态。
  // 这样刷新页面后，用户仍然能看到上一次打开过的标签页。
  function persistTabsState() {
    setStorage(TABS_STORAGE_KEY, {
      visitedViewList: visitedViewList.value
    })
  }

  // 新增一个标签页。
  // 每次路由切换到新的业务页面后，通常都会调用这个方法。
  function addVisitedView(route) {
    const nextTag = createTagFromRoute(route)

    if (!nextTag) {
      return
    }

    const existingTag = visitedViewList.value.find((item) => item.path === nextTag.path)

    if (existingTag) {
      existingTag.fullPath = nextTag.fullPath
      existingTag.title = nextTag.title
      existingTag.keepAlive = nextTag.keepAlive
      updateCachedViewNameList()
      persistTabsState()
      return
    }

    visitedViewList.value = mergeVisitedViewList([...visitedViewList.value, nextTag])
    updateCachedViewNameList()
    persistTabsState()
  }

  // 删除一个标签页。
  // 常见场景：用户点击标签页上的关闭按钮。
  function removeVisitedView(tag) {
    if (!tag || tag.affix) {
      return [...visitedViewList.value]
    }

    visitedViewList.value = visitedViewList.value.filter((item) => item.path !== tag.path)
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  // 关闭其他标签页。
  // 关闭时始终保留固定标签，以及当前操作的目标标签。
  function removeOtherViews(currentTag) {
    const keepTagList = visitedViewList.value.filter((item) => {
      return item.affix || item.path === currentTag?.path
    })

    visitedViewList.value = mergeVisitedViewList(keepTagList)
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  // 关闭全部标签页。
  // 这里会保留固定标签，例如首页。
  function removeAllViews() {
    visitedViewList.value = createStaticAffixTagList()
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  // 根据路径查找标签页。
  // 常见场景：根据当前路由快速拿到“当前标签对象”。
  function findVisitedViewByPath(path = '') {
    return visitedViewList.value.find((item) => item.path === path) || null
  }

  // 重置标签页状态。
  // 常见场景：退出登录或切换账号时清空非固定标签页。
  function resetTabsState() {
    visitedViewList.value = createStaticAffixTagList()
    updateCachedViewNameList()
    removeStorage(TABS_STORAGE_KEY)
  }

  // 从本地缓存恢复标签页状态。
  // 刷新页面后，标签页导航可以按上一次的结果恢复。
  function restoreTabsState() {
    const cachedState = getStorage(TABS_STORAGE_KEY, { visitedViewList: [] })

    visitedViewList.value = mergeVisitedViewList(
      Array.isArray(cachedState.visitedViewList) ? cachedState.visitedViewList : []
    )

    updateCachedViewNameList()
  }

  return {
    visitedViewList,
    cachedViewNameList,
    addVisitedView,
    removeVisitedView,
    removeOtherViews,
    removeAllViews,
    findVisitedViewByPath,
    resetTabsState,
    restoreTabsState
  }
})
