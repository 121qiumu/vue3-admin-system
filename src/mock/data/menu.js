// 动态菜单 mock 数据。
// 为了避免和静态首页菜单重复，这里返回的是“需要根据权限动态显示”的业务菜单。
export const adminAsyncMenuList = [
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      titleKey: 'route.system',
      icon: 'IconEpSetting'
    },
    children: [
      {
        path: '/system/user',
        name: 'SystemUser',
        meta: {
          title: '用户管理',
          titleKey: 'route.systemUser',
          icon: 'IconEpUser'
        }
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          title: '角色管理',
          titleKey: 'route.systemRole',
          icon: 'IconEpUserFilled'
        }
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          title: '菜单管理',
          titleKey: 'route.systemMenu',
          icon: 'IconEpMenu'
        }
      }
    ]
  }
]

export const editorAsyncMenuList = []
