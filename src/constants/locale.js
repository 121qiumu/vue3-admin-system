function escapeRegExp(value = '') {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const LOCALE_ENUM = Object.freeze({
  ZH_CN: 'zh-CN',
  EN_GB: 'en-GB'
})

export const SUPPORTED_LOCALE_LIST = [LOCALE_ENUM.ZH_CN, LOCALE_ENUM.EN_GB]
export const DEFAULT_LOCALE = LOCALE_ENUM.ZH_CN
export const FALLBACK_LOCALE = LOCALE_ENUM.ZH_CN

export const LOCALE_OPTIONS = [
  {
    value: LOCALE_ENUM.ZH_CN,
    labelKey: 'locale.options.zh-CN',
    fallbackLabel: '简体中文'
  },
  {
    value: LOCALE_ENUM.EN_GB,
    labelKey: 'locale.options.en-GB',
    fallbackLabel: 'English (UK)'
  }
]

const supportedLocalePattern = SUPPORTED_LOCALE_LIST.map((item) => escapeRegExp(item)).join('|')

export const LOCALE_ROUTE_PARAM = `:locale(${supportedLocalePattern})`
export const LOCALE_PATH_PREFIX_REGEXP = new RegExp(`^/(${supportedLocalePattern})(?=/|$)`)
export const LOCALE_PARAM_PREFIX_REGEXP = /^\/:locale(?:\([^)]*\))?(?=\/|$)/
