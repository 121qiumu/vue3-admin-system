import { adminAsyncMenuList, editorAsyncMenuList } from './menu'

// 统一维护 mock 用户数据。
// auth 模块、permission 模块都会复用这里的数据，
// 这样可以避免登录信息、菜单信息、按钮权限信息分散在多个文件里难以维护。
const mockAccountList = [
  {
    username: 'admin',
    password: '123456',
    token: 'mock-token-admin',
    userInfo: {
      userId: '10001',
      username: 'admin',
      nickname: '系统管理员',
      avatar: '',
      roleCodeList: ['admin'],
      permissionCodeList: [
        'system:access',
        'system:user:list',
        'system:user:detail',
        'system:user:create',
        'system:user:update',
        'system:role:list',
        'system:role:detail',
        'system:role:create',
        'system:role:update',
        'system:menu:list',
        'system:menu:detail',
        'system:menu:create',
        'system:menu:update'
      ]
    },
    asyncMenuList: adminAsyncMenuList,
    buttonPermissionList: [
      'dashboard:refresh',
      'system:user:create',
      'system:user:update',
      'system:user:delete',
      'system:user:export',
      'system:role:create',
      'system:role:update',
      'system:role:delete',
      'system:menu:create',
      'system:menu:update',
      'system:menu:delete'
    ]
  },
  {
    username: 'editor',
    password: '123456',
    token: 'mock-token-editor',
    userInfo: {
      userId: '10002',
      username: 'editor',
      nickname: '内容编辑',
      avatar: '',
      roleCodeList: ['editor'],
      permissionCodeList: []
    },
    asyncMenuList: editorAsyncMenuList,
    buttonPermissionList: ['dashboard:refresh']
  }
]

export function getMockAccountList() {
  return mockAccountList
}

export function findMockAccountByLogin(loginForm = {}) {
  return mockAccountList.find((account) => {
    return account.username === loginForm.username && account.password === loginForm.password
  })
}

export function findMockAccountByToken(token = '') {
  return mockAccountList.find((account) => account.token === token)
}

export function getMockLoginAccountList() {
  return mockAccountList.map((account) => ({
    username: account.username,
    password: account.password,
    nickname: account.userInfo.nickname,
    roleCodeList: account.userInfo.roleCodeList,
    permissionCodeList: account.userInfo.permissionCodeList,
    asyncMenuCount: account.asyncMenuList.length,
    buttonPermissionCount: account.buttonPermissionList.length
  }))
}
