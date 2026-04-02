import { storeToRefs } from 'pinia'

import { useTabsStore } from '@/store/modules/tabs'

export function useTagsView() {
  const tabsStore = useTabsStore()
  const { visitedViewList, cachedViewNameList } = storeToRefs(tabsStore)

  return {
    visitedViewList,
    cachedViewNameList,
    addVisitedView: tabsStore.addVisitedView,
    removeVisitedView: tabsStore.removeVisitedView,
    removeOtherViews: tabsStore.removeOtherViews,
    removeAllViews: tabsStore.removeAllViews,
    findVisitedViewByPath: tabsStore.findVisitedViewByPath,
    refreshVisitedViewTitleList: tabsStore.refreshVisitedViewTitleList,
    resetTabsState: tabsStore.resetTabsState
  }
}
