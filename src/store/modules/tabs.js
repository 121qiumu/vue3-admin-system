import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getRouteTitle, translate } from '@/locales/helper'
import { getBaseRoutePath } from '@/locales/resolve'
import { staticAffixTagList } from '@/router/modules/static'
import { TABS_STORAGE_KEY } from '@/constants/storage'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

function getLeafRouteRecord(route) {
  if (Array.isArray(route?.matched) && route.matched.length > 0) {
    return route.matched[route.matched.length - 1]
  }

  return route
}

function createTagFromRoute(route) {
  const currentRouteRecord = getLeafRouteRecord(route)
  const currentRouteMeta = currentRouteRecord?.meta || {}
  const currentRouteName = currentRouteRecord?.name || route?.name

  if (!currentRouteName || currentRouteMeta.hidden) {
    return null
  }

  const basePath = getBaseRoutePath(route.path)

  return {
    fullPath: route.fullPath,
    path: basePath,
    name: currentRouteName,
    titleKey: currentRouteMeta.titleKey || '',
    title: getRouteTitle(route) || currentRouteMeta.title || String(currentRouteName),
    affix: Boolean(currentRouteMeta.affix),
    keepAlive: Boolean(currentRouteMeta.keepAlive)
  }
}

function refreshTagTitle(tag = {}) {
  return {
    ...tag,
    title: tag.titleKey
      ? translate(tag.titleKey, {}, tag.title || String(tag.name || ''))
      : tag.title
  }
}

function createStaticAffixTagList() {
  return staticAffixTagList.map((tag) => refreshTagTitle({ ...tag }))
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

    const normalizedTag = refreshTagTitle({
      ...tag,
      path: getBaseRoutePath(tag.path),
      fullPath: tag.fullPath || tag.path,
      affix: Boolean(tag.affix)
    })

    const existingTag = mergedMap.get(normalizedTag.path)

    if (existingTag) {
      mergedMap.set(normalizedTag.path, {
        ...existingTag,
        ...normalizedTag,
        affix: Boolean(existingTag.affix || normalizedTag.affix)
      })
      return
    }

    mergedMap.set(normalizedTag.path, normalizedTag)
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
  const visitedViewList = ref(createStaticAffixTagList())
  const cachedViewNameList = ref([])

  function updateCachedViewNameList() {
    cachedViewNameList.value = visitedViewList.value
      .filter((item) => item.keepAlive)
      .map((item) => item.name)
  }

  function persistTabsState() {
    setStorage(TABS_STORAGE_KEY, {
      visitedViewList: visitedViewList.value
    })
  }

  function addVisitedView(route) {
    const nextTag = createTagFromRoute(route)

    if (!nextTag) {
      return
    }

    const existingTag = visitedViewList.value.find((item) => item.path === nextTag.path)

    if (existingTag) {
      existingTag.fullPath = nextTag.fullPath
      existingTag.titleKey = nextTag.titleKey
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

  function removeVisitedView(tag) {
    if (!tag || tag.affix) {
      return [...visitedViewList.value]
    }

    visitedViewList.value = visitedViewList.value.filter(
      (item) => item.path !== getBaseRoutePath(tag.path)
    )
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  function removeOtherViews(currentTag) {
    const currentPath = getBaseRoutePath(currentTag?.path)
    const keepTagList = visitedViewList.value.filter(
      (item) => item.affix || item.path === currentPath
    )

    visitedViewList.value = mergeVisitedViewList(keepTagList)
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  function removeAllViews() {
    visitedViewList.value = createStaticAffixTagList()
    updateCachedViewNameList()
    persistTabsState()

    return [...visitedViewList.value]
  }

  function findVisitedViewByPath(path = '') {
    const targetPath = getBaseRoutePath(path)
    return visitedViewList.value.find((item) => item.path === targetPath) || null
  }

  function refreshVisitedViewTitleList() {
    visitedViewList.value = mergeVisitedViewList(visitedViewList.value)
    updateCachedViewNameList()
    persistTabsState()
  }

  function resetTabsState() {
    visitedViewList.value = createStaticAffixTagList()
    updateCachedViewNameList()
    removeStorage(TABS_STORAGE_KEY)
  }

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
    refreshVisitedViewTitleList,
    resetTabsState,
    restoreTabsState
  }
})
