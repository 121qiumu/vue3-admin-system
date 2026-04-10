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
  locale: {
    current: 'Current language',
    switch: 'Switch language',
    options: {
      'zh-CN': 'Simplified Chinese',
      'en-GB': 'English (UK)'
    }
  },
  common: {
    actions: {
      search: 'Search',
      reset: 'Reset',
      create: 'Create',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
      detail: 'Details',
      export: 'Export',
      refresh: 'Refresh',
      reload: 'Reload',
      backHome: 'Back to home',
      backToList: 'Back to list',
      goBack: 'Go back',
      login: 'Sign in',
      logout: 'Sign out',
      submit: 'Submit',
      closeCurrent: 'Close current',
      closeOthers: 'Close others',
      closeAll: 'Close all'
    },
    status: {
      enabled: 'Enabled',
      disabled: 'Disabled',
      unknown: 'Unknown'
    },
    feedback: {
      auth: 'Authentication',
      successTitle: 'Completed',
      warningTitle: 'Take note',
      errorTitle: 'Not completed',
      infoTitle: 'System notice'
    },
    roles: {
      admin: 'System administrator',
      editor: 'Content editor',
      auditor: 'Operations auditor',
      guest: 'Guest role',
      backendUser: 'Backend user',
      visitor: 'Visitor',
      unassigned: 'Unassigned'
    },
    menuType: {
      directory: 'Directory',
      menu: 'Menu',
      button: 'Button'
    },
    dataScope: {
      all: 'All data',
      department: 'Department data',
      customDepartment: 'Selected departments',
      self: 'Only personal data'
    },
    labels: {
      username: 'Username',
      nickname: 'Display name',
      role: 'Role',
      roleName: 'Role name',
      roleCode: 'Role code',
      status: 'Status',
      department: 'Department',
      phone: 'Mobile',
      email: 'Email',
      remark: 'Remarks',
      permissionCode: 'Permission code',
      menuName: 'Menu name',
      menuType: 'Menu type',
      routePath: 'Route path',
      componentPath: 'Component path',
      parentMenu: 'Parent menu',
      orderNum: 'Order',
      createTime: 'Created at',
      updateTime: 'Updated at',
      lastLogin: 'Last sign-in',
      icon: 'Icon name',
      dataScope: 'Data scope',
      memberCount: 'Members',
      operations: 'Actions'
    },
    messages: {
      unknownLayout: 'Unknown layout',
      unknownTheme: 'Unknown theme',
      noNamedMenu: 'Unnamed menu',
      noRemark: 'No remarks available',
      noPermissionSummary: 'No permission notes available',
      requestFailed: 'Request failed. Please try again later.',
      loadFailed: 'Failed to load. Please try again later.',
      deleteSuccess: 'Deleted successfully.',
      saveSuccess: 'Saved successfully.',
      exportMock: 'This is a template project, so export is simulated with a message for now.'
    }
  }
}
