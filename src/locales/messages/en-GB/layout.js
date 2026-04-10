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
  layout: {
    header: {
      settings: 'Interface settings',
      settingsSummarySeparator: ' / ',
      layoutMode: 'Layout mode',
      layoutModeDesc: 'Switch the overall arrangement of navigation and menus.',
      theme: 'Theme',
      themeDesc: 'Change the overall colour style and keep the current theme persisted.',
      language: 'Language',
      languageDesc:
        'Switch project texts, route titles, menu labels and Element Plus built-in locale.',
      backHome: 'Back to home',
      logout: 'Sign out',
      logoutDialogTitle: 'Sign out',
      logoutDialogText:
        'Do you want to sign out of the current account? The current session will be cleared and you will return to the sign-in page.',
      confirmLogout: 'Confirm sign out',
      logoutSuccessTitle: 'The current session has ended',
      logoutSuccess: 'Signed out successfully.',
      logoutWarningTitle: 'The local session is already cleared',
      logoutWarning:
        'The local session has been cleared, but the server-side sign-out request did not complete.'
    },
    tags: {
      actions: 'Tag actions'
    },
    layoutModeOptions: {
      left: {
        label: 'Left layout',
        description: 'The most common admin layout with the menu on the left.'
      },
      top: {
        label: 'Top layout',
        description: 'Best for systems with only a few top-level menus.'
      },
      mix: {
        label: 'Mixed layout',
        description: 'Top-level menus stay on top and sub-menus stay on the left.'
      }
    },
    themeOptions: {
      default: {
        label: 'Default theme',
        description: 'Bright, clean and close to the common admin look.'
      },
      dark: {
        label: 'Dark theme',
        description: 'A classic dark style for low-light environments.'
      },
      'deep-blue': {
        label: 'Deep Blue theme',
        description: 'A deep blue style that suits enterprise dashboards and large-screen systems.'
      }
    }
  }
}
