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
  layout: {
    header: {
      settings: '界面设置',
      settingsSummarySeparator: ' / ',
      layoutMode: '布局模式',
      layoutModeDesc: '切换菜单和导航的整体分布方式。',
      theme: '系统主题',
      themeDesc: '切换后台颜色风格，当前主题会自动持久化。',
      language: '系统语言',
      languageDesc: '切换项目文案、菜单标题、路由标题以及 Element Plus 内置语言。',
      backHome: '返回首页',
      logout: '退出登录',
      logoutDialogTitle: '退出登录',
      logoutDialogText: '确认退出当前登录账号吗？退出后会清空当前登录状态，并返回到登录页。',
      confirmLogout: '确认退出',
      logoutSuccessTitle: '当前会话已退出',
      logoutSuccess: '已退出当前账号',
      logoutWarningTitle: '本地会话已清理',
      logoutWarning: '本地登录状态已清理，但服务端退出接口暂未成功。'
    },
    tags: {
      actions: '标签操作'
    },
    layoutModeOptions: {
      left: {
        label: '左侧布局',
        description: '最常见的后台管理布局，菜单在左侧。'
      },
      top: {
        label: '顶部布局',
        description: '适合一级菜单较少的系统。'
      },
      mix: {
        label: '混合布局',
        description: '一级菜单在顶部，二级菜单在左侧。'
      }
    },
    themeOptions: {
      default: {
        label: '默认主题',
        description: '明亮、干净，最接近常见后台系统默认风格。'
      },
      dark: {
        label: 'Dark 主题',
        description: '经典暗黑风格，适合低亮度环境。'
      },
      'deep-blue': {
        label: 'Deep Blue 主题',
        description: '偏企业后台和大屏风格的深蓝主题。'
      }
    }
  }
}
