/**
 * 学习注释：
 * 1. 文件角色：这是 mock 原始数据文件，主要提供数组、对象等静态演示数据。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：{ createMockError } <- src/mock/helper.js
 * 4. 当前文件对外暴露：命名导出：getRoleOptionList、getMenuParentOptionList、queryUserPageData、getUserDetailData、saveUserData、removeUserData、queryRolePageData、getRoleDetailData、saveRoleData、removeRoleData、queryMenuPageData、getMenuDetailData、saveMenuData、removeMenuData
 * 5. 常见上游调用方：src/mock/modules/system.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { createMockError } from '@/mock/helper'

function formatNow() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}

function normalizeKeyword(value = '') {
  return String(value).trim().toLowerCase()
}

function containsText(sourceValue = '', keyword = '') {
  const normalizedKeyword = normalizeKeyword(keyword)

  if (!normalizedKeyword) {
    return true
  }

  return String(sourceValue).toLowerCase().includes(normalizedKeyword)
}

function paginateList(list = [], query = {}) {
  const pageNum = Number(query.pageNum || 1)
  const pageSize = Number(query.pageSize || 10)
  const startIndex = (pageNum - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    list: list.slice(startIndex, endIndex),
    total: list.length,
    pageNum,
    pageSize
  }
}

function createNextId(prefix = 'id', sourceList = []) {
  const maxNumber = sourceList.reduce((result, item) => {
    const matchedNumber = String(item.id || '').match(/(\d+)$/)
    const currentNumber = matchedNumber ? Number(matchedNumber[1]) : 0
    return Math.max(result, currentNumber)
  }, 1000)

  return `${prefix}${maxNumber + 1}`
}

let roleList = [
  {
    id: 'role1001',
    roleName: '系统管理员',
    roleCode: 'admin',
    dataScope: '全部数据',
    status: 'enabled',
    memberCount: 1,
    createTime: '2026-02-01 09:30',
    updateTime: '2026-04-01 09:12',
    permissionSummary: '拥有系统管理、角色配置、菜单配置和核心操作权限。',
    remark: '负责整套后台权限、系统参数和发布前检查。'
  },
  {
    id: 'role1002',
    roleName: '内容编辑',
    roleCode: 'editor',
    dataScope: '本部门数据',
    status: 'enabled',
    memberCount: 3,
    createTime: '2026-02-05 11:20',
    updateTime: '2026-03-30 16:18',
    permissionSummary: '主要负责首页工作台、内容发布和基础内容维护。',
    remark: '适合日常稿件发布、活动专题维护和评论反馈处理。'
  },
  {
    id: 'role1003',
    roleName: '运营审核员',
    roleCode: 'auditor',
    dataScope: '指定部门数据',
    status: 'enabled',
    memberCount: 2,
    createTime: '2026-02-16 15:05',
    updateTime: '2026-03-27 10:32',
    permissionSummary: '负责审批流审核、活动复盘和高优先级通知确认。',
    remark: '偏审核流程，权限范围比管理员更窄。'
  },
  {
    id: 'role1004',
    roleName: '访客角色',
    roleCode: 'guest',
    dataScope: '仅本人数据',
    status: 'disabled',
    memberCount: 0,
    createTime: '2026-02-22 13:40',
    updateTime: '2026-03-12 09:10',
    permissionSummary: '只允许查看有限的演示页面，不开放任何管理能力。',
    remark: '主要作为演示或临时访客角色保留。'
  }
]

let userList = [
  {
    id: 'user1001',
    username: 'admin',
    nickname: '系统管理员',
    roleCode: 'admin',
    roleName: '系统管理员',
    status: 'enabled',
    phone: '13800000001',
    email: 'admin@example.com',
    departmentName: '平台研发组',
    createTime: '2026-03-01 09:00',
    lastLoginTime: '2026-04-01 09:12',
    remark: '负责全站权限、菜单和系统配置。'
  },
  {
    id: 'user1002',
    username: 'editor',
    nickname: '内容编辑',
    roleCode: 'editor',
    roleName: '内容编辑',
    status: 'enabled',
    phone: '13800000002',
    email: 'editor@example.com',
    departmentName: '内容运营组',
    createTime: '2026-03-02 10:20',
    lastLoginTime: '2026-04-01 08:47',
    remark: '负责内容发布、专题维护和评论处理。'
  },
  {
    id: 'user1003',
    username: 'helen',
    nickname: '海伦',
    roleCode: 'auditor',
    roleName: '运营审核员',
    status: 'enabled',
    phone: '13800000003',
    email: 'helen@example.com',
    departmentName: '运营增长组',
    createTime: '2026-03-03 14:10',
    lastLoginTime: '2026-03-31 18:22',
    remark: '主要跟进活动审核与上线前校验。'
  },
  {
    id: 'user1004',
    username: 'liam',
    nickname: '利亚姆',
    roleCode: 'editor',
    roleName: '内容编辑',
    status: 'disabled',
    phone: '13800000004',
    email: 'liam@example.com',
    departmentName: '内容运营组',
    createTime: '2026-03-04 09:45',
    lastLoginTime: '2026-03-28 12:18',
    remark: '当前账号暂停使用，保留历史操作记录。'
  },
  {
    id: 'user1005',
    username: 'sophia',
    nickname: '苏菲娅',
    roleCode: 'auditor',
    roleName: '运营审核员',
    status: 'enabled',
    phone: '13800000005',
    email: 'sophia@example.com',
    departmentName: '品牌运营组',
    createTime: '2026-03-06 11:00',
    lastLoginTime: '2026-03-31 17:06',
    remark: '负责专题活动素材审核与排期确认。'
  },
  {
    id: 'user1006',
    username: 'oliver',
    nickname: '奥利弗',
    roleCode: 'guest',
    roleName: '访客角色',
    status: 'disabled',
    phone: '13800000006',
    email: 'oliver@example.com',
    departmentName: '合作支持组',
    createTime: '2026-03-07 15:20',
    lastLoginTime: '2026-03-20 10:12',
    remark: '用于培训演示，目前已停用。'
  }
]

function syncRoleMemberCount() {
  roleList = roleList.map((role) => ({
    ...role,
    memberCount: userList.filter((user) => user.roleCode === role.roleCode).length
  }))
}

let menuList = [
  {
    id: 'menu1001',
    parentId: '0',
    parentName: '顶级菜单',
    menuName: '工作台',
    menuType: '菜单',
    routePath: '/dashboard',
    component: 'views/dashboard/index.vue',
    permissionCode: 'dashboard:view',
    icon: 'IconEpHomeFilled',
    status: 'enabled',
    orderNum: 1,
    createTime: '2026-02-10 09:20',
    remark: '系统首页工作台。'
  },
  {
    id: 'menu1002',
    parentId: '0',
    parentName: '顶级菜单',
    menuName: '系统管理',
    menuType: '目录',
    routePath: '/system',
    component: 'Layout',
    permissionCode: 'system:access',
    icon: 'IconEpSetting',
    status: 'enabled',
    orderNum: 10,
    createTime: '2026-02-10 09:30',
    remark: '系统基础配置和权限管理入口。'
  },
  {
    id: 'menu1003',
    parentId: 'menu1002',
    parentName: '系统管理',
    menuName: '用户管理',
    menuType: '菜单',
    routePath: '/system/user',
    component: 'views/system/user/index.vue',
    permissionCode: 'system:user:list',
    icon: 'IconEpUser',
    status: 'enabled',
    orderNum: 11,
    createTime: '2026-02-10 09:35',
    remark: '账号、角色和启停状态管理。'
  },
  {
    id: 'menu1004',
    parentId: 'menu1002',
    parentName: '系统管理',
    menuName: '角色管理',
    menuType: '菜单',
    routePath: '/system/role',
    component: 'views/system/role/index.vue',
    permissionCode: 'system:role:list',
    icon: 'IconEpUserFilled',
    status: 'enabled',
    orderNum: 12,
    createTime: '2026-02-10 09:38',
    remark: '角色权限、数据范围和成员数量管理。'
  },
  {
    id: 'menu1005',
    parentId: 'menu1002',
    parentName: '系统管理',
    menuName: '菜单管理',
    menuType: '菜单',
    routePath: '/system/menu',
    component: 'views/system/menu/index.vue',
    permissionCode: 'system:menu:list',
    icon: 'IconEpMenu',
    status: 'enabled',
    orderNum: 13,
    createTime: '2026-02-10 09:40',
    remark: '菜单、目录和权限码统一维护。'
  }
]

function getRoleNameByCode(roleCode = '') {
  return roleList.find((item) => item.roleCode === roleCode)?.roleName || '未分配角色'
}

function getMenuParentNameById(parentId = '0') {
  if (!parentId || parentId === '0') {
    return '顶级菜单'
  }

  return menuList.find((item) => item.id === parentId)?.menuName || '顶级菜单'
}

export function getRoleOptionList() {
  return roleList
    .filter((item) => item.status === 'enabled')
    .map((item) => ({
      label: item.roleName,
      value: item.roleCode
    }))
}

export function getMenuParentOptionList(currentMenuId = '') {
  const optionList = menuList
    .filter((item) => item.id !== currentMenuId && item.menuType !== '按钮')
    .map((item) => ({
      label: item.menuName,
      value: item.id
    }))

  return [
    {
      label: '顶级菜单',
      value: '0'
    },
    ...optionList
  ]
}

export function queryUserPageData(query = {}) {
  const filteredList = userList.filter((item) => {
    return (
      containsText(item.username, query.username) &&
      containsText(item.nickname, query.nickname) &&
      (!query.roleCode || item.roleCode === query.roleCode) &&
      (!query.status || item.status === query.status)
    )
  })

  return paginateList(filteredList, query)
}

export function getUserDetailData(userId = '') {
  const matchedUser = userList.find((item) => item.id === userId)

  if (!matchedUser) {
    throw createMockError('没有找到对应的用户信息')
  }

  return matchedUser
}

export function saveUserData(payload = {}) {
  const now = formatNow()
  const roleName = getRoleNameByCode(payload.roleCode)

  if (payload.id) {
    const currentIndex = userList.findIndex((item) => item.id === payload.id)

    if (currentIndex === -1) {
      throw createMockError('当前用户不存在，无法继续保存')
    }

    userList[currentIndex] = {
      ...userList[currentIndex],
      ...payload,
      roleName
    }

    syncRoleMemberCount()
    return userList[currentIndex]
  }

  const nextUser = {
    id: createNextId('user', userList),
    username: payload.username || `user_${userList.length + 1}`,
    nickname: payload.nickname || '新用户',
    roleCode: payload.roleCode || 'guest',
    roleName,
    status: payload.status || 'enabled',
    phone: payload.phone || '',
    email: payload.email || '',
    departmentName: payload.departmentName || '未分配部门',
    createTime: now,
    lastLoginTime: '--',
    remark: payload.remark || ''
  }

  userList.unshift(nextUser)
  syncRoleMemberCount()
  return nextUser
}

export function removeUserData(userId = '') {
  userList = userList.filter((item) => item.id !== userId)
  syncRoleMemberCount()

  return {
    success: true
  }
}

export function queryRolePageData(query = {}) {
  const filteredList = roleList.filter((item) => {
    return (
      containsText(item.roleName, query.roleName) &&
      containsText(item.roleCode, query.roleCode) &&
      (!query.status || item.status === query.status)
    )
  })

  return paginateList(filteredList, query)
}

export function getRoleDetailData(roleId = '') {
  const matchedRole = roleList.find((item) => item.id === roleId)

  if (!matchedRole) {
    throw createMockError('没有找到对应的角色信息')
  }

  return matchedRole
}

export function saveRoleData(payload = {}) {
  const now = formatNow()

  if (payload.id) {
    const currentIndex = roleList.findIndex((item) => item.id === payload.id)

    if (currentIndex === -1) {
      throw createMockError('当前角色不存在，无法继续保存')
    }

    const previousRole = roleList[currentIndex]
    const nextRole = {
      ...previousRole,
      ...payload,
      updateTime: now,
      memberCount: Number(payload.memberCount ?? previousRole.memberCount ?? 0)
    }

    roleList[currentIndex] = nextRole

    userList = userList.map((item) => {
      if (item.roleCode !== previousRole.roleCode) {
        return item
      }

      return {
        ...item,
        roleCode: nextRole.roleCode,
        roleName: nextRole.roleName
      }
    })

    syncRoleMemberCount()
    return nextRole
  }

  const nextRole = {
    id: createNextId('role', roleList),
    roleName: payload.roleName || '新角色',
    roleCode: payload.roleCode || `role_${roleList.length + 1}`,
    dataScope: payload.dataScope || '本部门数据',
    status: payload.status || 'enabled',
    memberCount: Number(payload.memberCount || 0),
    createTime: now,
    updateTime: now,
    permissionSummary: payload.permissionSummary || '待进一步配置权限说明。',
    remark: payload.remark || ''
  }

  roleList.unshift(nextRole)
  syncRoleMemberCount()
  return nextRole
}

export function removeRoleData(roleId = '') {
  const matchedRole = roleList.find((item) => item.id === roleId)

  roleList = roleList.filter((item) => item.id !== roleId)

  if (matchedRole) {
    userList = userList.map((item) => {
      if (item.roleCode !== matchedRole.roleCode) {
        return item
      }

      return {
        ...item,
        roleCode: 'guest',
        roleName: '访客角色'
      }
    })
  }

  syncRoleMemberCount()

  return {
    success: true
  }
}

export function queryMenuPageData(query = {}) {
  const filteredList = menuList.filter((item) => {
    return (
      containsText(item.menuName, query.menuName) &&
      containsText(item.permissionCode, query.permissionCode) &&
      (!query.menuType || item.menuType === query.menuType) &&
      (!query.status || item.status === query.status)
    )
  })

  return paginateList(filteredList, query)
}

export function getMenuDetailData(menuId = '') {
  const matchedMenu = menuList.find((item) => item.id === menuId)

  if (!matchedMenu) {
    throw createMockError('没有找到对应的菜单信息')
  }

  return matchedMenu
}

export function saveMenuData(payload = {}) {
  const now = formatNow()
  const parentId = payload.parentId || '0'
  const parentName = getMenuParentNameById(parentId)

  if (payload.id) {
    const currentIndex = menuList.findIndex((item) => item.id === payload.id)

    if (currentIndex === -1) {
      throw createMockError('当前菜单不存在，无法继续保存')
    }

    menuList[currentIndex] = {
      ...menuList[currentIndex],
      ...payload,
      parentId,
      parentName,
      orderNum: Number(payload.orderNum || menuList[currentIndex].orderNum || 1)
    }

    return menuList[currentIndex]
  }

  const nextMenu = {
    id: createNextId('menu', menuList),
    parentId,
    parentName,
    menuName: payload.menuName || '新菜单',
    menuType: payload.menuType || '菜单',
    routePath: payload.routePath || '',
    component: payload.component || '',
    permissionCode: payload.permissionCode || '',
    icon: payload.icon || '',
    status: payload.status || 'enabled',
    orderNum: Number(payload.orderNum || 1),
    createTime: now,
    remark: payload.remark || ''
  }

  menuList.unshift(nextMenu)
  return nextMenu
}

export function removeMenuData(menuId = '') {
  menuList = menuList.filter((item) => item.id !== menuId && item.parentId !== menuId)

  return {
    success: true
  }
}
