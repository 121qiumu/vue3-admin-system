/**
 * 学习注释：
 * 1. 文件角色：这是 vue-i18n 实例入口，负责注册所有语言包以及日期、数字格式化规则。
 * 2. 所在分层：国际化层：管理语言包、语言路由和文案转换逻辑。
 * 3. 当前文件主要依赖：{ createI18n } <- vue-i18n；{ DEFAULT_LOCALE, FALLBACK_LOCALE } <- src/constants/locale.js；{ getPreferredLocale } <- src/locales/resolve.js；enGB <- src/locales/messages/en-GB/index.js；zhCN <- src/locales/messages/zh-CN/index.js
 * 4. 当前文件对外暴露：默认导出：1 个
 * 5. 常见上游调用方：src/locales/helper.js、src/plugins/i18n.js
 * 6. 阅读建议：建议先看 resolve 负责路径，helper 负责文案与标题，最后再看具体语言包。
 */
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
