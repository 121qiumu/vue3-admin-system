/**
 * 学习注释：
 * 1. 文件角色：这是某个语言的总语言包入口，负责把多个子模块的翻译文案合并导出。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：app <- src/locales/messages/en-GB/app.js；common <- src/locales/messages/en-GB/common.js；dashboard <- src/locales/messages/en-GB/dashboard.js；error <- src/locales/messages/en-GB/error.js；layout <- src/locales/messages/en-GB/layout.js；login <- src/locales/messages/en-GB/login.js；其余依赖 4 项
 * 4. 当前文件对外暴露：默认导出：1 个
 * 5. 常见上游调用方：src/locales/index.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
import app from './app'
import common from './common'
import dashboard from './dashboard'
import error from './error'
import layout from './layout'
import login from './login'
import permission from './permission'
import route from './route'
import system from './system'
import validation from './validation'

export default {
  ...app,
  ...common,
  ...dashboard,
  ...error,
  ...layout,
  ...login,
  ...permission,
  ...route,
  ...system,
  ...validation
}
