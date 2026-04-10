/**
 * 学习注释：
 * 1. 文件角色：这是语言切换相关的组合式函数，页面和布局组件会通过它读取当前语言、切换语言。
 * 2. 所在分层：组合式逻辑层：把可复用状态和行为组合成 hook。
 * 3. 当前文件主要依赖：{ computed } <- vue；{ storeToRefs } <- pinia；{ useRoute, useRouter } <- vue-router；{ LOCALE_OPTIONS } <- src/constants/locale.js；{ useAppStore } <- src/store/modules/app.js；{ getElementPlusLocale, getLocaleLabel } <- src/locales/helper.js；其余依赖 1 项
 * 4. 当前文件对外暴露：命名导出：useLocale
 * 5. 常见上游调用方：src/App.vue、src/components/common/business/DetailPageTemplate.vue、src/components/common/business/FormPageTemplate.vue、src/layout/components/LayoutBreadcrumb.vue、src/layout/components/LayoutHeader.vue、src/layout/components/LayoutLogo.vue 等，共 15 个上游引用文件
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
