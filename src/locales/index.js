/**
 * 学习注释：
 * 1. 文件角色：这是 vue-i18n 实例入口，负责创建国际化实例，并按需加载语言包。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：{ createI18n } <- vue-i18n；{ DEFAULT_LOCALE, FALLBACK_LOCALE } <- src/constants/locale.js；{ getPreferredLocale, normalizeLocale } <- src/locales/resolve.js；import.meta.glob <- Vite
 * 4. 当前文件对外暴露：默认导出 i18n 实例；命名导出：loadLocaleMessages、preloadLocaleMessages、isLocaleMessageLoaded
 * 5. 常见上游调用方：src/locales/helper.js、src/plugins/i18n.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, FALLBACK_LOCALE } from '@/constants/locale'
import { getPreferredLocale, normalizeLocale } from './resolve'

// 让 Vite 为每种语言单独生成异步模块。
// 这样首屏只需要加载当前语言，其他语言等用户切换时再下载。
const localeMessageLoaderMap = import.meta.glob('./messages/*/index.js')
const loadedLocaleSet = new Set()

const i18n = createI18n({
  legacy: false,
  locale: getPreferredLocale() || DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  missingWarn: false,
  fallbackWarn: false,
  messages: {},
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    },
    'en-GB': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  },
  numberFormats: {
    'zh-CN': {
      decimal: {
        style: 'decimal'
      }
    },
    'en-GB': {
      decimal: {
        style: 'decimal'
      }
    }
  }
})

function getLocaleMessageLoader(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale)
  return localeMessageLoaderMap[`./messages/${normalizedLocale}/index.js`]
}

export function isLocaleMessageLoaded(locale = DEFAULT_LOCALE) {
  return loadedLocaleSet.has(normalizeLocale(locale))
}

export async function loadLocaleMessages(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale)

  if (isLocaleMessageLoaded(normalizedLocale)) {
    return i18n.global.getLocaleMessage(normalizedLocale)
  }

  const loader = getLocaleMessageLoader(normalizedLocale)

  if (!loader) {
    return {}
  }

  const localeModule = await loader()
  const localeMessages = localeModule.default || {}

  i18n.global.setLocaleMessage(normalizedLocale, localeMessages)
  loadedLocaleSet.add(normalizedLocale)

  return localeMessages
}

// 预加载当前语言和回退语言。
// 企业项目里这样做更稳妥：当前语言保证立即可用，fallback 语言保证缺词时还能兜底。
export async function preloadLocaleMessages(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale)
  const localeList = [...new Set([normalizedLocale, FALLBACK_LOCALE])]

  await Promise.all(localeList.map((item) => loadLocaleMessages(item)))
}

export default i18n
