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
  system: {
    user: {
      list: {
        title: 'User management',
        description:
          'This is a reusable admin list-page template that includes a query form, table, pagination and action buttons.',
        create: 'Create user',
        export: 'Export list',
        deleteConfirmTitle: 'Delete user',
        deleteConfirmText: 'Are you sure you want to delete user “{name}”?',
        loadFailed: 'Failed to load the user list. Please try again later.',
        deleteSuccess: 'The user has been deleted.',
        deleteFailed: 'Failed to delete the user. Please try again later.',
        exportMessage:
          'This is a template project, so the export feature is currently simulated with a message.',
        query: {
          usernamePlaceholder: 'Please enter a username',
          nicknamePlaceholder: 'Please enter a display name',
          rolePlaceholder: 'Please select a role',
          statusPlaceholder: 'Please select a status'
        },
        columns: {
          roleName: 'Role',
          departmentName: 'Department'
        }
      },
      form: {
        titleCreate: 'Create user',
        titleEdit: 'Edit user',
        description:
          'The reusable form-page template is suitable for create, edit and validation flows.',
        createSuccess: 'User created successfully.',
        updateSuccess: 'User information has been updated.',
        loadFailed: 'Failed to load the user details. Please try again later.',
        submitCreate: 'Create user',
        submitEdit: 'Save changes',
        placeholders: {
          username: 'Please enter a username',
          nickname: 'Please enter a display name',
          role: 'Please select a role',
          phone: 'Please enter a mobile number',
          email: 'Please enter an email address',
          department: 'Please enter a department name',
          remark: 'Please enter remarks'
        }
      },
      detail: {
        title: 'User details',
        description:
          'The reusable detail-page template is suitable for basic information, business notes and extended actions.',
        edit: 'Edit user',
        baseInfo: 'Basic information',
        remark: 'Remarks',
        status: 'Current status',
        role: 'Assigned role',
        noRemark: 'No remarks available',
        loadFailed: 'Failed to load the user details. Please try again later.'
      }
    },
    role: {
      list: {
        title: 'Role management',
        description:
          'The role page shows how the shared list-page template can support different query fields and table columns.',
        create: 'Create role',
        deleteConfirmTitle: 'Delete role',
        deleteConfirmText: 'Are you sure you want to delete role “{name}”?',
        loadFailed: 'Failed to load the role list. Please try again later.',
        deleteSuccess: 'The role has been deleted.',
        deleteFailed: 'Failed to delete the role. Please try again later.',
        query: {
          roleNamePlaceholder: 'Please enter a role name',
          roleCodePlaceholder: 'Please enter a role code',
          statusPlaceholder: 'Please select a status'
        }
      },
      form: {
        titleCreate: 'Create role',
        titleEdit: 'Edit role',
        description:
          'The role form can serve as a reusable admin business form template, and it can later be extended with permission trees and data-scope configuration.',
        createSuccess: 'Role created successfully.',
        updateSuccess: 'Role information has been updated.',
        loadFailed: 'Failed to load the role details. Please try again later.',
        submitCreate: 'Create role',
        submitEdit: 'Save changes',
        placeholders: {
          roleName: 'Please enter a role name',
          roleCode: 'Please enter a role code',
          dataScope: 'Please select a data scope',
          permissionSummary: 'Please enter permission notes',
          remark: 'Please enter remarks'
        }
      },
      detail: {
        title: 'Role details',
        description:
          'The detail-page template is better suited for structured information instead of continuing to stack content inside list pop-ups.',
        edit: 'Edit role',
        baseInfo: 'Basic information',
        permissionSummary: 'Permission notes',
        roleStatus: 'Role status',
        noPermissionSummary: 'No permission notes available',
        loadFailed: 'Failed to load the role details. Please try again later.'
      }
    },
    menu: {
      list: {
        title: 'Menu management',
        description:
          'The menu page demonstrates how an admin project can maintain directories, menus, permission codes and routed components, and it also works well as an icon-system example page.',
        create: 'Create menu',
        deleteConfirmTitle: 'Delete menu',
        deleteConfirmText: 'Are you sure you want to delete menu “{name}”?',
        loadFailed: 'Failed to load the menu list. Please try again later.',
        deleteSuccess: 'The menu has been deleted.',
        deleteFailed: 'Failed to delete the menu. Please try again later.',
        query: {
          menuNamePlaceholder: 'Please enter a menu name',
          permissionCodePlaceholder: 'Please enter a permission code',
          menuTypePlaceholder: 'Please select a menu type',
          statusPlaceholder: 'Please select a status'
        },
        noIcon: 'No icon set'
      },
      form: {
        titleCreate: 'Create menu',
        titleEdit: 'Edit menu',
        description:
          'The menu form is suitable as a reusable admin configuration-page template. It can later be extended with tree selectors and icon pickers. This version first integrates the shared icon system.',
        createSuccess: 'Menu created successfully.',
        updateSuccess: 'Menu information has been updated.',
        loadFailed: 'Failed to load the menu details. Please try again later.',
        submitCreate: 'Create menu',
        submitEdit: 'Save changes',
        currentPreview: 'Current preview',
        placeholders: {
          menuName: 'Please enter a menu name',
          menuType: 'Please select a menu type',
          parentMenu: 'Please select a parent menu',
          routePath: 'Please enter a route path',
          componentPath: 'Please enter a component path',
          permissionCode: 'Please enter a permission code',
          icon: 'Please select or input an icon name',
          remark: 'Please enter remarks'
        }
      },
      detail: {
        title: 'Menu details',
        description:
          'The menu detail page is suitable for showing route paths, component paths, permission codes and parent relationships.',
        edit: 'Edit menu',
        baseInfo: 'Basic information',
        extra: 'Extra notes',
        menuStatus: 'Menu status',
        noRemark: 'No remarks available',
        loadFailed: 'Failed to load the menu details. Please try again later.'
      }
    }
  }
}
