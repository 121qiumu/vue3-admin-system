/**
 * 学习注释：
 * 1. 文件角色：这是某个业务模块的路由配置文件，负责声明该模块有哪些页面、菜单、权限码和跳转关系。
 * 2. 所在分层：路由层：定义页面访问路径、菜单来源、动态路由装配规则。
 * 3. 当前文件主要依赖：{ DEFAULT_LOCALE, LOCALE_ROUTE_PARAM } <- src/constants/locale.js；{ resolveLocalePath } <- src/locales/resolve.js；{ Layout } <- src/router/helper.js
 * 4. 当前文件对外暴露：命名导出：systemRoute
 * 5. 常见上游调用方：src/router/modules/async.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { DEFAULT_LOCALE, LOCALE_ROUTE_PARAM } from '@/constants/locale'
import { resolveLocalePath } from '@/locales/resolve'
import { Layout } from '../helper'

export const systemRoute = {
  path: `/${LOCALE_ROUTE_PARAM}/system`,
  component: Layout,
  redirect: (to) => resolveLocalePath('/system/user', to.params?.locale || DEFAULT_LOCALE),
  name: 'System',
  meta: {
    title: '系统管理',
    titleKey: 'route.system',
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
        titleKey: 'route.systemUser',
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
        titleKey: 'route.systemUserDetail',
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
        titleKey: 'route.systemUserCreate',
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
        titleKey: 'route.systemUserEdit',
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
        titleKey: 'route.systemRole',
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
        titleKey: 'route.systemRoleDetail',
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
        titleKey: 'route.systemRoleCreate',
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
        titleKey: 'route.systemRoleEdit',
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
        titleKey: 'route.systemMenu',
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
        titleKey: 'route.systemMenuDetail',
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
        titleKey: 'route.systemMenuCreate',
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
        titleKey: 'route.systemMenuEdit',
        hideMenu: true,
        activeMenu: '/system/menu',
        requiresAuth: true,
        permissionCodes: ['system:menu:update']
      }
    }
  ]
}
