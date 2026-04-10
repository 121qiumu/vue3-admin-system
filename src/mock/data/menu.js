/**
 * 学习注释：
 * 1. 文件角色：这是 mock 原始数据文件，主要提供数组、对象等静态演示数据。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：adminAsyncMenuList、editorAsyncMenuList
 * 5. 常见上游调用方：src/mock/data/account.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
