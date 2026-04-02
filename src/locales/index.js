import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, FALLBACK_LOCALE } from '@/constants/locale'
import { getPreferredLocale } from './resolve'
import enGB from './messages/en-GB'
import zhCN from './messages/zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: getPreferredLocale() || DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    'zh-CN': zhCN,
    'en-GB': enGB
  },
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    },
    'en-GB': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  },
  numberFormats: {
    'zh-CN': {
      decimal: {
        style: 'decimal'
      }
    },
    'en-GB': {
      decimal: {
        style: 'decimal'
      }
    }
  }
})

export default i18n
