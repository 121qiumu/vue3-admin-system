// 动态菜单 mock 数据。
// 为了避免和静态首页菜单重复，
// 这里返回的主要是“需要根据权限动态显示”的业务菜单。

export const adminAsyncMenuList = [
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'IconEpSetting'
    },
    children: [
      {
        path: '/system/user',
        name: 'SystemUser',
        meta: {
          title: '用户管理',
          icon: 'IconEpUser'
        }
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        meta: {
          title: '角色管理',
          icon: 'IconEpUserFilled'
        }
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        meta: {
          title: '菜单管理',
          icon: 'IconEpMenu'
        }
      }
    ]
  }
]

// editor 账号当前只保留静态首页菜单，
// 所以这里返回空数组，侧边栏里不会出现“系统管理”。
export const editorAsyncMenuList = []
