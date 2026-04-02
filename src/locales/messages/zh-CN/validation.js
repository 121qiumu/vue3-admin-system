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
