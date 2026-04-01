// 项目图标常量。
// 这一层主要解决两个问题：
// 1. 让菜单配置、页面配置里不要反复手写魔法字符串
// 2. 给初学者一个“项目里到底推荐哪些图标”的明确参考

// 推荐的后台菜单图标列表。
// 当前统一使用 Element Plus 风格图标，名字和 route meta.icon 保持一致。
export const APP_ICON_OPTIONS = [
  {
    label: '首页',
    value: 'IconEpHomeFilled',
    scene: '菜单图标'
  },
  {
    label: '系统设置',
    value: 'IconEpSetting',
    scene: '菜单图标'
  },
  {
    label: '用户',
    value: 'IconEpUser',
    scene: '菜单图标'
  },
  {
    label: '角色',
    value: 'IconEpUserFilled',
    scene: '菜单图标'
  },
  {
    label: '菜单',
    value: 'IconEpMenu',
    scene: '菜单图标'
  },
  {
    label: '监控',
    value: 'IconEpMonitor',
    scene: '菜单图标'
  },
  {
    label: '文档',
    value: 'IconEpDocument',
    scene: '菜单图标'
  },
  {
    label: '工单',
    value: 'IconEpTickets',
    scene: '菜单图标'
  },
  {
    label: '通知',
    value: 'IconEpBell',
    scene: '菜单图标'
  }
]

// 常用按钮图标映射。
// 页面里如果不想每次都重新思考用什么图标，可以直接从这里取。
export const BUTTON_ICON_NAME_MAP = Object.freeze({
  search: 'IconEpSearch',
  reset: 'IconEpRefreshRight',
  create: 'IconEpPlus',
  export: 'IconEpDownload',
  detail: 'IconEpView',
  edit: 'IconEpEditPen',
  delete: 'IconEpDelete'
})

// 常用状态图标映射。
// 这里不和业务状态强耦合，而是先提供一份通用语义映射。
export const STATUS_ICON_NAME_MAP = Object.freeze({
  success: 'IconEpCircleCheckFilled',
  warning: 'IconEpWarningFilled',
  info: 'IconEpInfoFilled'
})
