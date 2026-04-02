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
