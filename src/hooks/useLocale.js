import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { LOCALE_OPTIONS } from '@/constants/locale'
import { useAppStore } from '@/store/modules/app'
import { getElementPlusLocale, getLocaleLabel } from '@/locales/helper'
import { normalizeLocale, resolveLocalePath } from '@/locales/resolve'

export function useLocale() {
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const { language } = storeToRefs(appStore)

  const localeOptions = computed(() => {
    return LOCALE_OPTIONS.map((item) => ({
      ...item,
      label: getLocaleLabel(item.value, item.fallbackLabel)
    }))
  })

  const currentLocaleLabel = computed(() => {
    return getLocaleLabel(language.value)
  })

  const elementPlusLocale = computed(() => {
    return getElementPlusLocale(language.value)
  })

  function toLocalePath(path = '', locale = language.value) {
    return resolveLocalePath(path, locale)
  }

  async function changeLocale(nextLocale) {
    const normalizedLocale = appStore.setLanguage(nextLocale)
    const targetPath = resolveLocalePath(route.fullPath || route.path, normalizedLocale)

    if (targetPath !== route.fullPath) {
      await router.replace(targetPath)
    }

    return normalizedLocale
  }

  function setLanguage(nextLocale) {
    return appStore.setLanguage(normalizeLocale(nextLocale))
  }

  return {
    language,
    localeOptions,
    currentLocaleLabel,
    elementPlusLocale,
    toLocalePath,
    changeLocale,
    setLanguage
  }
}
