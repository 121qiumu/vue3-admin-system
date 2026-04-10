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
  validation: {
    user: {
      usernameRequired: '请输入用户名',
      usernameLength: '用户名长度建议控制在 2 到 20 个字符',
      nicknameRequired: '请输入昵称',
      roleRequired: '请选择所属角色',
      statusRequired: '请选择账号状态',
      phoneRequired: '请输入手机号',
      emailRequired: '请输入邮箱',
      emailInvalid: '请输入正确的邮箱格式',
      departmentRequired: '请输入所属部门'
    },
    role: {
      roleNameRequired: '请输入角色名称',
      roleCodeRequired: '请输入角色编码',
      dataScopeRequired: '请选择数据范围',
      statusRequired: '请选择角色状态',
      permissionSummaryRequired: '请输入权限说明'
    },
    menu: {
      menuNameRequired: '请输入菜单名称',
      menuTypeRequired: '请选择菜单类型',
      routePathRequired: '请输入路由地址',
      componentPathRequired: '请输入组件路径',
      permissionCodeRequired: '请输入权限标识',
      statusRequired: '请选择菜单状态'
    }
  }
}
