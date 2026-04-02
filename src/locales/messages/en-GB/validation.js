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
