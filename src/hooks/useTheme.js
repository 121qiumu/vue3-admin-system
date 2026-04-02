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
