/**
 * 学习注释：
 * 1. 文件角色：这是某个语言包下的一个子模块翻译文件，主要导出给 vue-i18n 使用的文案对象。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：默认导出：1 个
 * 5. 常见上游调用方：src/locales/messages/zh-CN/index.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
export default {
  route: {
    login: '登录',
    dashboard: '首页',
    vueuseDemo: 'VueUse 学习 Demo',
    forbidden: '403',
    notFound: '404',
    serverError: '500',
    system: '系统管理',
    systemUser: '用户管理',
    systemUserDetail: '用户详情',
    systemUserCreate: '新增用户',
    systemUserEdit: '编辑用户',
    systemRole: '角色管理',
    systemRoleDetail: '角色详情',
    systemRoleCreate: '新增角色',
    systemRoleEdit: '编辑角色',
    systemMenu: '菜单管理',
    systemMenuDetail: '菜单详情',
    systemMenuCreate: '新增菜单',
    systemMenuEdit: '编辑菜单'
  }
}
