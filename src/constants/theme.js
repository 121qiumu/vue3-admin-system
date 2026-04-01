// 主题相关常量
// 这类值统一放在 constants 中，避免在多个文件里反复手写字符串。

// 主题名称枚举
export const THEME_ENUM = Object.freeze({
  DEFAULT: 'default',
  DARK: 'dark',
  DEEP_BLUE: 'deep-blue'
})

// 默认主题
export const DEFAULT_THEME = THEME_ENUM.DEFAULT

// 暗色体系主题列表
// dark 和 deep-blue 都属于偏深色主题，浏览器原生控件更适合使用 dark color-scheme。
export const DARK_THEME_LIST = [THEME_ENUM.DARK, THEME_ENUM.DEEP_BLUE]

// 主题选项列表
export const THEME_OPTIONS = [
  {
    label: '默认主题',
    value: THEME_ENUM.DEFAULT,
    description: '明亮、干净，最接近常见后台系统默认风格。'
  },
  {
    label: 'Dark 主题',
    value: THEME_ENUM.DARK,
    description: '经典暗黑风格，适合低亮度环境。'
  },
  {
    label: 'Deep Blue 主题',
    value: THEME_ENUM.DEEP_BLUE,
    description: '偏企业后台和大屏风格的深蓝主题。'
  }
]

// 主题值数组
export const THEME_VALUES = THEME_OPTIONS.map((item) => item.value)
