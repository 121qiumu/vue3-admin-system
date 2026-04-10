/**
 * 学习注释：
 * 1. 文件角色：这是 mock 原始数据文件，主要提供数组、对象等静态演示数据。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：getMockDashboardDataByRole
 * 5. 常见上游调用方：src/mock/modules/dashboard.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
// Dashboard 首页 mock 数据。
// 这里按角色拆成两套数据：
// 1. admin 更偏“系统管理”和“稳定性巡检”
// 2. editor 更偏“内容生产”和“发布节奏”
//
// 这样页面结构可以保持统一，但首页内容会根据角色自然变化。

const commonNoticeList = [
  {
    id: 'notice-common-1',
    title: '4 月版本提测窗口已开启',
    levelLabel: '重要',
    levelType: 'danger',
    publishTime: '2026-04-01 09:30',
    content: '请在今天 18:00 前补齐变更说明、联调记录和自测结论，避免影响晚间发布。'
  },
  {
    id: 'notice-common-2',
    title: '账号安全策略已更新',
    levelLabel: '提醒',
    levelType: 'warning',
    publishTime: '2026-03-31 16:20',
    content: '本周开始，后台账号需要定期轮换密码，敏感操作建议同时开启二次确认。'
  }
]

const adminDashboardData = {
  welcome: {
    greeting: '早上好',
    subtitle: '今天建议优先关注权限变更、异常工单和晚间发布窗口。',
    roleLabel: '系统管理员',
    lastLoginAt: '2026-04-01 09:12',
    workspaceTip: '当前有 3 项高优先级任务等待处理。',
    focusTagList: ['2 条风险告警待确认', '1 项角色变更待审核', '今晚 20:00 发布窗口已开启'],
    overviewList: [
      {
        label: '待处理事项',
        value: '08'
      },
      {
        label: '本周发布',
        value: '03'
      },
      {
        label: '在线会话',
        value: '1286'
      }
    ]
  },
  statCardList: [
    {
      key: 'admin-login-user',
      title: '今日登录用户',
      value: '286',
      unit: '人',
      trendText: '较昨日 +18%',
      trendType: 'up',
      description: '今天进入后台并产生操作记录的账号数量。',
      color: '#409eff'
    },
    {
      key: 'admin-pending-review',
      title: '待审批变更',
      value: '6',
      unit: '项',
      trendText: '较昨日 +2',
      trendType: 'warning',
      description: '包括角色调整、菜单配置和按钮权限变更。',
      color: '#e6a23c'
    },
    {
      key: 'admin-risk-order',
      title: '异常工单',
      value: '2',
      unit: '单',
      trendText: '较昨日 -1',
      trendType: 'down',
      description: '当前还没有关闭的系统异常和巡检告警。',
      color: '#f56c6c'
    },
    {
      key: 'admin-menu-visit',
      title: '菜单访问热度',
      value: '32',
      unit: '次',
      trendText: '核心菜单保持稳定',
      trendType: 'stable',
      description: '最近 24 小时被访问次数最高的管理菜单。',
      color: '#67c23a'
    }
  ],
  shortcutList: [
    {
      key: 'shortcut-user-manage',
      title: '用户管理',
      description: '查看账号列表，继续处理新增、编辑和导出操作。',
      tag: '系统',
      type: 'route',
      path: '/system/user'
    },
    {
      key: 'shortcut-dashboard-refresh',
      title: '刷新看板',
      description: '重新拉取首页统计、快捷入口和最近操作数据。',
      tag: '概览',
      type: 'action',
      actionKey: 'refresh-dashboard'
    },
    {
      key: 'shortcut-permission-audit',
      title: '权限巡检',
      description: '核对本周权限变更，确认没有多余的菜单和按钮权限。',
      tag: '安全',
      type: 'action',
      actionKey: 'permission-audit'
    },
    {
      key: 'shortcut-publish-notice',
      title: '发布公告',
      description: '整理本周变更说明，面向运维和业务同学同步上线信息。',
      tag: '通知',
      type: 'action',
      actionKey: 'publish-notice'
    }
  ],
  recentActionList: [
    {
      id: 'admin-action-1',
      title: '完成角色权限审核',
      content: '已确认“运营审核员”角色可见菜单和按钮权限，没有发现越权项。',
      operator: '系统管理员',
      typeLabel: '权限变更',
      type: 'primary',
      time: '10:24'
    },
    {
      id: 'admin-action-2',
      title: '导出用户清单',
      content: '导出了最近 30 天活跃账号列表，准备交给业务负责人做账号清理。',
      operator: '系统管理员',
      typeLabel: '账号管理',
      type: 'success',
      time: '09:45'
    },
    {
      id: 'admin-action-3',
      title: '处理系统告警',
      content: '已确认一条数据库连接抖动告警恢复正常，剩余两条待继续追踪。',
      operator: '值班同学',
      typeLabel: '系统巡检',
      type: 'warning',
      time: '09:18'
    }
  ],
  noticeList: [
    {
      id: 'notice-admin-1',
      title: '权限清理任务本周内完成',
      levelLabel: '重点',
      levelType: 'primary',
      publishTime: '2026-04-01 08:50',
      content: '请对 3 月未登录账号进行一次集中清理，并同步确认角色和菜单的回收情况。'
    },
    ...commonNoticeList
  ]
}

const editorDashboardData = {
  welcome: {
    greeting: '欢迎回来',
    subtitle: '今天建议优先处理待发布稿件、专题排期和评论反馈。',
    roleLabel: '内容编辑',
    lastLoginAt: '2026-04-01 08:47',
    workspaceTip: '当前稿件流转平稳，有 2 个专题需要继续跟进。',
    focusTagList: ['今日待发布稿件 12 篇', '专题页文案待二审', '评论巡检请在 17:00 前完成'],
    overviewList: [
      {
        label: '待发布稿件',
        value: '12'
      },
      {
        label: '今日新增草稿',
        value: '09'
      },
      {
        label: '待处理评论',
        value: '18'
      }
    ]
  },
  statCardList: [
    {
      key: 'editor-publish-week',
      title: '本周发布内容',
      value: '48',
      unit: '篇',
      trendText: '较上周 +6 篇',
      trendType: 'up',
      description: '包含专题稿件、资讯快报和运营活动内容。',
      color: '#409eff'
    },
    {
      key: 'editor-draft-pool',
      title: '草稿池总量',
      value: '132',
      unit: '篇',
      trendText: '需要重点整理',
      trendType: 'warning',
      description: '当前还未进入发布流程的草稿和待补充内容。',
      color: '#e6a23c'
    },
    {
      key: 'editor-proofread',
      title: '待校对稿件',
      value: '7',
      unit: '篇',
      trendText: '较昨日 -2 篇',
      trendType: 'down',
      description: '内容主编还未完成终审的稿件数量。',
      color: '#67c23a'
    },
    {
      key: 'editor-feedback',
      title: '互动反馈',
      value: '86',
      unit: '条',
      trendText: '评论讨论度上升',
      trendType: 'stable',
      description: '最近 24 小时需要重点查看的评论和反馈信息。',
      color: '#8b5cf6'
    }
  ],
  shortcutList: [
    {
      key: 'shortcut-editor-refresh',
      title: '刷新看板',
      description: '重新拉取首页统计、公告和最近操作信息。',
      tag: '概览',
      type: 'action',
      actionKey: 'refresh-dashboard'
    },
    {
      key: 'shortcut-content-calendar',
      title: '内容日历',
      description: '查看今天的发布排期和专题进度，当前先预留能力入口。',
      tag: '排期',
      type: 'action',
      actionKey: 'content-calendar'
    },
    {
      key: 'shortcut-publish-draft',
      title: '待发布提醒',
      description: '整理今天需要上线的稿件和封面图素材。',
      tag: '发布',
      type: 'action',
      actionKey: 'publish-draft'
    },
    {
      key: 'shortcut-workbench-guide',
      title: '工作台说明',
      description: '回到首页总览，继续查看内容统计和重点提醒。',
      tag: '帮助',
      type: 'route',
      path: '/dashboard'
    }
  ],
  recentActionList: [
    {
      id: 'editor-action-1',
      title: '提交专题页文案',
      content: '“春季活动专题”首屏文案已提交二审，等待设计同学补图。',
      operator: '内容编辑',
      typeLabel: '专题制作',
      type: 'primary',
      time: '10:08'
    },
    {
      id: 'editor-action-2',
      title: '整理待发布稿件',
      content: '已完成今天上午 6 篇稿件的标签校对和摘要补充。',
      operator: '内容编辑',
      typeLabel: '发布准备',
      type: 'success',
      time: '09:36'
    },
    {
      id: 'editor-action-3',
      title: '处理评论反馈',
      content: '已回复 4 条高优先级评论，并标记 2 条需要产品同学继续跟进。',
      operator: '内容编辑',
      typeLabel: '互动维护',
      type: 'warning',
      time: '09:05'
    }
  ],
  noticeList: [
    {
      id: 'notice-editor-1',
      title: '本周专题封面图规范更新',
      levelLabel: '提示',
      levelType: 'primary',
      publishTime: '2026-04-01 08:40',
      content: '请优先使用新版封面图安全区模板，避免移动端裁切后出现标题偏移。'
    },
    ...commonNoticeList
  ]
}

export function getMockDashboardDataByRole(roleCode = '') {
  if (roleCode === 'admin') {
    return adminDashboardData
  }

  return editorDashboardData
}
