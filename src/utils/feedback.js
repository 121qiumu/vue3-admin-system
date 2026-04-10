/**
 * 学习注释：
 * 1. 文件角色：这是用户反馈工具文件，通常用来统一弹窗、提示、确认框等交互反馈。
 * 2. 所在分层：工具层：放通用函数，避免重复写基础逻辑。
 * 3. 当前文件主要依赖：{ h } <- vue；{ ElMessage } <- element-plus；{ translate } <- src/locales/helper.js
 * 4. 当前文件对外暴露：命名导出：showAuthMessage
 * 5. 常见上游调用方：src/layout/components/LayoutHeader.vue、src/views/login/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { h } from 'vue'
import { ElMessage } from 'element-plus'

import { translate } from '@/locales/helper'

function getAuthMessageMeta(type = 'info') {
  const metaMap = {
    success: {
      rootClass: 'app-auth-message--success',
      titleKey: 'common.feedback.successTitle',
      fallbackTitle: '操作已完成'
    },
    warning: {
      rootClass: 'app-auth-message--warning',
      titleKey: 'common.feedback.warningTitle',
      fallbackTitle: '请注意'
    },
    error: {
      rootClass: 'app-auth-message--error',
      titleKey: 'common.feedback.errorTitle',
      fallbackTitle: '操作未完成'
    },
    info: {
      rootClass: 'app-auth-message--info',
      titleKey: 'common.feedback.infoTitle',
      fallbackTitle: '系统提示'
    }
  }

  return metaMap[type] || metaMap.info
}

export function showAuthMessage(options = {}) {
  const {
    type = 'info',
    title = '',
    message = '',
    duration = type === 'error' ? 3600 : 2600
  } = options
  const meta = getAuthMessageMeta(type)
  const eyebrowText = translate('common.feedback.auth', {}, '认证反馈')
  const resolvedTitle = title || translate(meta.titleKey, {}, meta.fallbackTitle)

  return ElMessage({
    type,
    duration,
    placement: 'top',
    offset: 24,
    grouping: true,
    showClose: false,
    customClass: `app-auth-message ${meta.rootClass}`,
    message: () =>
      h('div', { class: 'app-auth-message__panel' }, [
        h('div', { class: 'app-auth-message__badge', 'aria-hidden': 'true' }),
        h('div', { class: 'app-auth-message__copy' }, [
          h('div', { class: 'app-auth-message__eyebrow' }, eyebrowText),
          h('div', { class: 'app-auth-message__title' }, resolvedTitle),
          h('div', { class: 'app-auth-message__text' }, message)
        ])
      ])
  })
}
