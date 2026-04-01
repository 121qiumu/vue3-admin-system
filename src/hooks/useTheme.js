import { storeToRefs } from 'pinia'

import { THEME_OPTIONS } from '@/constants/theme'
import { useAppStore } from '@/store/modules/app'

export function useTheme() {
  const appStore = useAppStore()
  const { theme } = storeToRefs(appStore)

  return {
    theme,
    themeOptions: THEME_OPTIONS,
    setTheme: appStore.setTheme
  }
}
