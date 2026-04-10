/**
 * 学习注释：
 * 1. 文件角色：这是某个语言包下的一个子模块翻译文件，主要导出给 vue-i18n 使用的文案对象。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：默认导出：1 个
 * 5. 常见上游调用方：src/locales/messages/en-GB/index.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
export default {
  route: {
    login: 'Sign in',
    dashboard: 'Dashboard',
    vueuseDemo: 'VueUse demo',
    forbidden: '403',
    notFound: '404',
    serverError: '500',
    system: 'System management',
    systemUser: 'User management',
    systemUserDetail: 'User details',
    systemUserCreate: 'Create user',
    systemUserEdit: 'Edit user',
    systemRole: 'Role management',
    systemRoleDetail: 'Role details',
    systemRoleCreate: 'Create role',
    systemRoleEdit: 'Edit role',
    systemMenu: 'Menu management',
    systemMenuDetail: 'Menu details',
    systemMenuCreate: 'Create menu',
    systemMenuEdit: 'Edit menu'
  }
}
