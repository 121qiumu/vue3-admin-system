/**
 * 学习注释：
 * 1. 文件角色：这是某个语言包下的一个子模块翻译文件，主要导出给 vue-i18n 使用的文案对象。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：默认导出：1 个
 * 5. 常见上游调用方：src/locales/messages/zh-CN/index.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
export default {
  dashboard: {
    page: {
      overviewTitle: '运营概览',
      overviewDesc: '首页数据由 mock 接口返回，不同角色会看到不同统计内容。',
      refresh: '刷新首页',
      refreshSuccess: '首页数据已刷新',
      loadFailedTitle: '首页数据加载失败',
      loadFailedTip: '你可以点击下面的按钮重新加载工作台数据。'
    },
    welcome: {
      title: '欢迎来到今天的后台工作台',
      lastLogin: '最近登录：{time}'
    },
    panels: {
      shortcut: {
        title: '快捷入口',
        description: '把常用操作放在首页，减少重复找菜单的成本。',
        emptyTitle: '暂无快捷入口',
        emptyDescription: '当前角色还没有配置可直接使用的快捷入口。'
      },
      recent: {
        title: '最近操作',
        description: '帮助你快速回看这位角色最近的工作轨迹。',
        emptyTitle: '暂无操作记录',
        emptyDescription: '当前角色最近还没有生成可展示的操作记录。',
        operator: '操作人：{name}'
      },
      notice: {
        title: '系统公告',
        description: '放首页是为了让重要提醒更容易被看到。',
        emptyTitle: '暂无系统公告',
        emptyDescription: '当前没有新的公告或维护提醒需要展示。',
        publishTime: '发布时间：{time}'
      }
    },
    shortcutMessages: {
      permissionAudit: '权限巡检页会在后续业务模块中继续补齐，这里先保留快捷入口。',
      publishNotice: '公告管理通常会在系统管理模块继续扩展，这里先用 mock 说明首页结构。',
      contentCalendar: '内容日历能力当前先做入口预留，后续接真实业务模块时再补页面。',
      publishDraft: '待发布稿件页通常属于内容管理模块，这里先保留入口位。',
      placeholder: '该快捷入口当前先做结构预留。'
    }
  }
}
