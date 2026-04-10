/**
 * 学习注释：
 * 1. 文件角色：这是组合式函数文件，用来把一类可复用的状态和行为抽成独立逻辑单元。
 * 2. 所在分层：组合式逻辑层：把可复用状态和行为组合成 hook。
 * 3. 当前文件主要依赖：{ storeToRefs } <- pinia；{ useTabsStore } <- src/store/modules/tabs.js
 * 4. 当前文件对外暴露：命名导出：useTagsView
 * 5. 常见上游调用方：src/layout/components/LayoutMain.vue、src/layout/components/LayoutTagsView.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
