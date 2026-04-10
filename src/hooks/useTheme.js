/**
 * 学习注释：
 * 1. 文件角色：这是组合式函数文件，用来把一类可复用的状态和行为抽成独立逻辑单元。
 * 2. 所在分层：组合式逻辑层：把可复用状态和行为组合成 hook。
 * 3. 当前文件主要依赖：{ computed } <- vue；{ storeToRefs } <- pinia；{ THEME_OPTIONS } <- src/constants/theme.js；{ translate } <- src/locales/helper.js；{ useAppStore } <- src/store/modules/app.js
 * 4. 当前文件对外暴露：命名导出：useTheme
 * 5. 常见上游调用方：src/layout/components/LayoutHeader.vue、src/layout/components/LayoutSettingsPanel.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { THEME_OPTIONS } from '@/constants/theme'
import { translate } from '@/locales/helper'
import { useAppStore } from '@/store/modules/app'

export function useTheme() {
  const appStore = useAppStore()
  const { theme } = storeToRefs(appStore)

  const themeOptions = computed(() => {
    return THEME_OPTIONS.map((item) => ({
      ...item,
      label: translate(item.labelKey, {}, item.fallbackLabel),
      description: translate(item.descriptionKey, {}, item.fallbackDescription)
    }))
  })

  return {
    theme,
    themeOptions,
    setTheme: appStore.setTheme
  }
}
