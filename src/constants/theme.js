/**
 * 学习注释：
 * 1. 文件角色：这是常量文件，统一存放固定枚举、默认值、存储 key、状态码等不会随业务频繁变化的数据。
 * 2. 所在分层：常量层：统一存放固定枚举和配置键值。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：THEME_ENUM、DEFAULT_THEME、DARK_THEME_LIST、THEME_OPTIONS、THEME_VALUES
 * 5. 常见上游调用方：src/hooks/useTheme.js、src/store/modules/app.js、src/utils/theme.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
