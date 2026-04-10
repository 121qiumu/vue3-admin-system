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
  validation: {
    user: {
      usernameRequired: 'Please enter a username',
      usernameLength: 'The username should be between 2 and 20 characters.',
      nicknameRequired: 'Please enter a display name',
      roleRequired: 'Please select a role',
      statusRequired: 'Please select an account status',
      phoneRequired: 'Please enter a mobile number',
      emailRequired: 'Please enter an email address',
      emailInvalid: 'Please enter a valid email address.',
      departmentRequired: 'Please enter a department name'
    },
    role: {
      roleNameRequired: 'Please enter a role name',
      roleCodeRequired: 'Please enter a role code',
      dataScopeRequired: 'Please select a data scope',
      statusRequired: 'Please select a role status',
      permissionSummaryRequired: 'Please enter permission notes'
    },
    menu: {
      menuNameRequired: 'Please enter a menu name',
      menuTypeRequired: 'Please select a menu type',
      routePathRequired: 'Please enter a route path',
      componentPathRequired: 'Please enter a component path',
      permissionCodeRequired: 'Please enter a permission code',
      statusRequired: 'Please select a menu status'
    }
  }
}
