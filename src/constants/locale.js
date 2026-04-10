/**
 * 学习注释：
 * 1. 文件角色：这是常量文件，统一存放固定枚举、默认值、存储 key、状态码等不会随业务频繁变化的数据。
 * 2. 所在分层：常量层：统一存放固定枚举和配置键值。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：LOCALE_ENUM、SUPPORTED_LOCALE_LIST、DEFAULT_LOCALE、FALLBACK_LOCALE、LOCALE_OPTIONS、LOCALE_ROUTE_PARAM、LOCALE_PATH_PREFIX_REGEXP、LOCALE_PARAM_PREFIX_REGEXP
 * 5. 常见上游调用方：src/hooks/useLocale.js、src/locales/helper.js、src/locales/index.js、src/locales/resolve.js、src/router/modules/static.js、src/router/modules/system.js 等，共 7 个上游引用文件
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
