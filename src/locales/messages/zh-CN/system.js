export default {
  system: {
    user: {
      list: {
        title: '用户管理',
        description: '这是一个通用后台列表页模板示例，包含查询表单、表格、分页和操作按钮。',
        create: '新增用户',
        export: '导出列表',
        deleteConfirmTitle: '删除用户',
        deleteConfirmText: '确认删除用户“{name}”吗？',
        loadFailed: '获取用户列表失败，请稍后重试',
        deleteSuccess: '用户已删除',
        deleteFailed: '删除用户失败，请稍后重试',
        exportMessage: '当前为模板项目，导出功能先用提示模拟。',
        query: {
          usernamePlaceholder: '请输入用户名',
          nicknamePlaceholder: '请输入昵称',
          rolePlaceholder: '请选择角色',
          statusPlaceholder: '请选择状态'
        },
        columns: {
          roleName: '角色',
          departmentName: '部门'
        }
      },
      form: {
        titleCreate: '新增用户',
        titleEdit: '编辑用户',
        description: '通用表单页模板适合承载新增、编辑和表单校验逻辑。',
        createSuccess: '用户创建成功',
        updateSuccess: '用户信息已更新',
        loadFailed: '获取用户详情失败，请稍后重试',
        submitCreate: '创建用户',
        submitEdit: '保存修改',
        placeholders: {
          username: '请输入用户名',
          nickname: '请输入昵称',
          role: '请选择角色',
          phone: '请输入手机号',
          email: '请输入邮箱',
          department: '请输入部门名称',
          remark: '请输入备注说明'
        }
      },
      detail: {
        title: '用户详情',
        description: '通用详情页模板适合承载基础信息、业务说明和扩展操作。',
        edit: '编辑用户',
        baseInfo: '基础信息',
        remark: '备注说明',
        status: '当前状态',
        role: '所属角色',
        noRemark: '暂无备注说明',
        loadFailed: '获取用户详情失败，请稍后重试'
      }
    },
    role: {
      list: {
        title: '角色管理',
        description: '角色管理页演示了统一列表模板如何承接不同的查询字段和表格列。',
        create: '新增角色',
        deleteConfirmTitle: '删除角色',
        deleteConfirmText: '确认删除角色“{name}”吗？',
        loadFailed: '获取角色列表失败，请稍后重试',
        deleteSuccess: '角色已删除',
        deleteFailed: '删除角色失败，请稍后重试',
        query: {
          roleNamePlaceholder: '请输入角色名称',
          roleCodePlaceholder: '请输入角色编码',
          statusPlaceholder: '请选择状态'
        }
      },
      form: {
        titleCreate: '新增角色',
        titleEdit: '编辑角色',
        description: '角色表单页适合作为后台业务表单模板，后续可以继续接入权限树和数据范围配置。',
        createSuccess: '角色创建成功',
        updateSuccess: '角色信息已更新',
        loadFailed: '获取角色详情失败，请稍后重试',
        submitCreate: '创建角色',
        submitEdit: '保存修改',
        placeholders: {
          roleName: '请输入角色名称',
          roleCode: '请输入角色编码',
          dataScope: '请选择数据范围',
          permissionSummary: '请输入权限说明',
          remark: '请输入备注说明'
        }
      },
      detail: {
        title: '角色详情',
        description: '详情页模板更适合承载结构化信息展示，而不是继续堆在列表弹窗里。',
        edit: '编辑角色',
        baseInfo: '基础信息',
        permissionSummary: '权限说明',
        roleStatus: '角色状态',
        noPermissionSummary: '暂无权限说明',
        loadFailed: '获取角色详情失败，请稍后重试'
      }
    },
    menu: {
      list: {
        title: '菜单管理',
        description:
          '菜单管理页适合演示后台如何维护目录、菜单、权限码以及路由组件信息，也很适合作为图标系统的示例页。',
        create: '新增菜单',
        deleteConfirmTitle: '删除菜单',
        deleteConfirmText: '确认删除菜单“{name}”吗？',
        loadFailed: '获取菜单列表失败，请稍后重试',
        deleteSuccess: '菜单已删除',
        deleteFailed: '删除菜单失败，请稍后重试',
        query: {
          menuNamePlaceholder: '请输入菜单名称',
          permissionCodePlaceholder: '请输入权限标识',
          menuTypePlaceholder: '请选择菜单类型',
          statusPlaceholder: '请选择状态'
        },
        noIcon: '未设置图标'
      },
      form: {
        titleCreate: '新增菜单',
        titleEdit: '编辑菜单',
        description:
          '菜单表单页适合作为后台配置类页面模板，后续可继续扩展树形选择和图标选择器。当前这一版先统一接入通用图标系统。',
        createSuccess: '菜单创建成功',
        updateSuccess: '菜单信息已更新',
        loadFailed: '获取菜单详情失败，请稍后重试',
        submitCreate: '创建菜单',
        submitEdit: '保存修改',
        currentPreview: '当前预览',
        placeholders: {
          menuName: '请输入菜单名称',
          menuType: '请选择菜单类型',
          parentMenu: '请选择上级菜单',
          routePath: '请输入路由地址',
          componentPath: '请输入组件路径',
          permissionCode: '请输入权限标识',
          icon: '请选择或输入图标名称',
          remark: '请输入备注说明'
        }
      },
      detail: {
        title: '菜单详情',
        description: '菜单详情页适合展示路由地址、组件路径、权限码和上级关系等信息。',
        edit: '编辑菜单',
        baseInfo: '基础信息',
        extra: '补充说明',
        menuStatus: '菜单状态',
        noRemark: '暂无备注说明',
        loadFailed: '获取菜单详情失败，请稍后重试'
      }
    }
  }
}
