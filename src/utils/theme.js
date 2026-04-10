/**
 * 学习注释：
 * 1. 文件角色：这是主题处理工具文件，负责校验主题值并把主题同步到 DOM。
 * 2. 所在分层：工具层：放通用函数，避免重复写基础逻辑。
 * 3. 当前文件主要依赖：{ DARK_THEME_LIST, DEFAULT_THEME, THEME_VALUES } <- src/constants/theme.js
 * 4. 当前文件对外暴露：命名导出：isValidTheme、mountThemeToDom、applyTheme
 * 5. 常见上游调用方：src/store/modules/app.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { DARK_THEME_LIST, DEFAULT_THEME, THEME_VALUES } from '@/constants/theme'

// 判断当前是否运行在浏览器环境。
function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

// 校验主题值是否合法。
export function isValidTheme(theme) {
  return THEME_VALUES.includes(theme)
}

// 把主题挂到 html 和 body 上。
// 当前项目优先使用 html[data-theme='xxx'] 作为主题选择器，
// 同时同步一份到 body，方便后续某些特殊场景读取。
export function mountThemeToDom(theme) {
  if (!isClient()) {
    return theme
  }

  const nextTheme = isValidTheme(theme) ? theme : DEFAULT_THEME
  const html = document.documentElement
  const body = document.body

  html.setAttribute('data-theme', nextTheme)
  html.style.colorScheme = DARK_THEME_LIST.includes(nextTheme) ? 'dark' : 'light'

  if (body) {
    body.setAttribute('data-theme', nextTheme)
  }

  return nextTheme
}

// 应用主题到 DOM。
// 当前把“主题挂载到页面”这个动作单独抽出来，
// 具体什么时候持久化，交给 app store 来控制。
export function applyTheme(theme) {
  return mountThemeToDom(theme)
}
