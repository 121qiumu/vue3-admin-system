// 主题相关常量
// 这类值统一放在 constants 中，避免在多个文件里反复手写字符串。

export const THEME_ENUM = Object.freeze({
  DEFAULT: 'default',
  DARK: 'dark',
  DEEP_BLUE: 'deep-blue'
})

export const DEFAULT_THEME = THEME_ENUM.DEFAULT

// 暗色体系主题列表。
// dark 和 deep-blue 都属于偏深色主题，浏览器原生控件更适合使用 dark color-scheme。
export const DARK_THEME_LIST = [THEME_ENUM.DARK, THEME_ENUM.DEEP_BLUE]

// 主题选项列表。
// 和布局选项一样，这里也保留 i18n key + 兜底文案，方便多语言和 JS 环境复用。
export const THEME_OPTIONS = [
  {
    value: THEME_ENUM.DEFAULT,
    labelKey: 'layout.themeOptions.default.label',
    descriptionKey: 'layout.themeOptions.default.description',
    fallbackLabel: '默认主题',
    fallbackDescription: '明亮、干净，最接近常见后台系统默认风格。'
  },
  {
    value: THEME_ENUM.DARK,
    labelKey: 'layout.themeOptions.dark.label',
    descriptionKey: 'layout.themeOptions.dark.description',
    fallbackLabel: 'Dark 主题',
    fallbackDescription: '经典暗黑风格，适合低亮度环境。'
  },
  {
    value: THEME_ENUM.DEEP_BLUE,
    labelKey: 'layout.themeOptions.deep-blue.label',
    descriptionKey: 'layout.themeOptions.deep-blue.description',
    fallbackLabel: 'Deep Blue 主题',
    fallbackDescription: '偏企业后台和大屏风格的深蓝主题。'
  }
]

export const THEME_VALUES = THEME_OPTIONS.map((item) => item.value)
