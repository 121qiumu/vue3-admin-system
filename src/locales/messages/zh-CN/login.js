export default {
  login: {
    badge: 'Vue 3 通用后台模板',
    title: '从 0 到 1 搭建一个真正能跑的后台管理系统',
    description:
      '当前这一步会把本地 mock、权限菜单、按钮权限和登录流程串起来，让学习型项目也能体验真实后台链路。',
    hero: {
      toolbarSubtitle: '登录入口 / Admin Starter',
      eyebrow: 'Mock、权限、路由已经串联',
      stageTag: '当前阶段',
      stageTitle: '先把后台基础链路跑顺，再平滑接真实后端',
      stageDescription:
        '现在这套登录页不是单纯演示表单，而是把用户态、动态菜单、按钮权限和路由守卫一起打通，后续替换接口时不会推倒重来。',
      metrics: {
        accounts: '演示账号',
        menus: '动态菜单',
        permissions: '按钮权限'
      }
    },
    featureList: {
      mockDriven: {
        title: '本地 mock 主导开发',
        description: '当前开发环境默认启用 mock，方便前端先把页面、状态和权限流程跑顺。'
      },
      switchBackend: {
        title: '接口层可随时切真实后端',
        description: 'API 层按环境决定走 mock 还是真实 request，不会和某个 mock 工具强耦合。'
      },
      permission: {
        title: '菜单与按钮权限分离',
        description: 'admin 和 editor 拿到的动态菜单、按钮权限码都不同，后续做按钮级权限会更自然。'
      }
    },
    card: {
      title: '账号登录',
      subtitle: '聚焦当前账号和权限入口，先把登录动作做得清楚、顺手。',
      mockTag: '开发环境默认启用 Mock',
      alertTitle: '开发环境说明',
      alert:
        '当前阶段先使用本地 mock 接口，后续切真实后端时只需要关闭 VITE_USE_MOCK 并替换接口地址。',
      helperTitle: '建议先从演示账号开始',
      helperText: '点击下方账号卡片可自动填充表单，快速体验不同角色下的菜单范围和按钮权限差异。'
    },
    form: {
      username: '用户名',
      password: '密码',
      usernamePlaceholder: '请输入用户名',
      passwordPlaceholder: '请输入密码',
      submit: '登录系统',
      submitting: '正在登录，请稍候...'
    },
    accountPanel: {
      title: '可直接体验的 mock 账号',
      tip: '点击账号卡片可自动填充表单',
      current: '当前填充',
      fillAction: '点击填充',
      account: '账号',
      password: '密码',
      asyncMenuCount: '动态菜单 {count} 组',
      buttonPermissionCount: '按钮权限 {count} 项'
    },
    validation: {
      usernameRequired: '请输入用户名',
      usernameLength: '用户名长度建议控制在 3 到 20 个字符之间',
      passwordRequired: '请输入密码',
      passwordLength: '密码长度建议控制在 6 到 20 个字符之间'
    },
    messages: {
      loadMockAccountFailed: '获取演示账号列表失败',
      loginSuccessTitle: '欢迎进入系统',
      loginSuccess: '登录成功，欢迎回来：{name}',
      loginFailedTitle: '登录未完成',
      loginFailed: '登录失败，请稍后重试'
    }
  }
}
