import { Layout } from '../helper'

// 系统管理模块路由。
// 这一阶段开始把“业务页面模板”真正落成三组示例：
// 1. 用户管理
// 2. 角色管理
// 3. 菜单管理
//
// 这里保留了一个核心原则：
// 列表页负责菜单展示，详情页和表单页只作为业务流程页面，不进入侧边栏菜单。
export const systemRoute = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'IconEpSetting',
    requiresAuth: true,
    permissionCodes: ['system:access']
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'IconEpUser',
        requiresAuth: true,
        permissionCodes: ['system:user:list']
      }
    },
    {
      path: 'user/detail/:id',
      name: 'SystemUserDetail',
      component: () => import('@/views/system/user/detail.vue'),
      meta: {
        title: '用户详情',
        hideMenu: true,
        activeMenu: '/system/user',
        requiresAuth: true,
        permissionCodes: ['system:user:detail']
      }
    },
    {
      path: 'user/create',
      name: 'SystemUserCreate',
      component: () => import('@/views/system/user/form.vue'),
      meta: {
        title: '新增用户',
        hideMenu: true,
        activeMenu: '/system/user',
        requiresAuth: true,
        permissionCodes: ['system:user:create']
      }
    },
    {
      path: 'user/edit/:id',
      name: 'SystemUserEdit',
      component: () => import('@/views/system/user/form.vue'),
      meta: {
        title: '编辑用户',
        hideMenu: true,
        activeMenu: '/system/user',
        requiresAuth: true,
        permissionCodes: ['system:user:update']
      }
    },
    {
      path: 'role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'IconEpUserFilled',
        requiresAuth: true,
        permissionCodes: ['system:role:list']
      }
    },
    {
      path: 'role/detail/:id',
      name: 'SystemRoleDetail',
      component: () => import('@/views/system/role/detail.vue'),
      meta: {
        title: '角色详情',
        hideMenu: true,
        activeMenu: '/system/role',
        requiresAuth: true,
        permissionCodes: ['system:role:detail']
      }
    },
    {
      path: 'role/create',
      name: 'SystemRoleCreate',
      component: () => import('@/views/system/role/form.vue'),
      meta: {
        title: '新增角色',
        hideMenu: true,
        activeMenu: '/system/role',
        requiresAuth: true,
        permissionCodes: ['system:role:create']
      }
    },
    {
      path: 'role/edit/:id',
      name: 'SystemRoleEdit',
      component: () => import('@/views/system/role/form.vue'),
      meta: {
        title: '编辑角色',
        hideMenu: true,
        activeMenu: '/system/role',
        requiresAuth: true,
        permissionCodes: ['system:role:update']
      }
    },
    {
      path: 'menu',
      name: 'SystemMenu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'IconEpMenu',
        requiresAuth: true,
        permissionCodes: ['system:menu:list']
      }
    },
    {
      path: 'menu/detail/:id',
      name: 'SystemMenuDetail',
      component: () => import('@/views/system/menu/detail.vue'),
      meta: {
        title: '菜单详情',
        hideMenu: true,
        activeMenu: '/system/menu',
        requiresAuth: true,
        permissionCodes: ['system:menu:detail']
      }
    },
    {
      path: 'menu/create',
      name: 'SystemMenuCreate',
      component: () => import('@/views/system/menu/form.vue'),
      meta: {
        title: '新增菜单',
        hideMenu: true,
        activeMenu: '/system/menu',
        requiresAuth: true,
        permissionCodes: ['system:menu:create']
      }
    },
    {
      path: 'menu/edit/:id',
      name: 'SystemMenuEdit',
      component: () => import('@/views/system/menu/form.vue'),
      meta: {
        title: '编辑菜单',
        hideMenu: true,
        activeMenu: '/system/menu',
        requiresAuth: true,
        permissionCodes: ['system:menu:update']
      }
    }
  ]
}
