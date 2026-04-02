import dayjs from 'dayjs'
import elementEn from 'element-plus/es/locale/lang/en'
import elementZhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/zh-cn'

import i18n from './index'
import { DEFAULT_LOCALE, LOCALE_OPTIONS, LOCALE_ENUM } from '@/constants/locale'
import { getLocaleFromRouteLike, normalizeLocale } from './resolve'

const ELEMENT_PLUS_LOCALE_MAP = {
  [LOCALE_ENUM.ZH_CN]: elementZhCn,
  [LOCALE_ENUM.EN_GB]: elementEn
}

const DAYJS_LOCALE_MAP = {
  [LOCALE_ENUM.ZH_CN]: 'zh-cn',
  [LOCALE_ENUM.EN_GB]: 'en-gb'
}

export function translate(messageKey = '', values = {}, fallbackText = '') {
  if (!messageKey) {
    return fallbackText || ''
  }

  if (i18n.global.te(messageKey)) {
    return i18n.global.t(messageKey, values)
  }

  return fallbackText || messageKey
}

export function getElementPlusLocale(locale = DEFAULT_LOCALE) {
  return ELEMENT_PLUS_LOCALE_MAP[normalizeLocale(locale)] || elementZhCn
}

export function applyAppLocale(locale = DEFAULT_LOCALE) {
  const normalizedLocale = normalizeLocale(locale)

  i18n.global.locale.value = normalizedLocale
  dayjs.locale(DAYJS_LOCALE_MAP[normalizedLocale] || DAYJS_LOCALE_MAP[DEFAULT_LOCALE])

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', normalizedLocale)
  }

  return normalizedLocale
}

export function getMetaTitle(meta = {}, values = {}) {
  if (!meta || typeof meta !== 'object') {
    return ''
  }

  if (meta.titleKey) {
    return translate(meta.titleKey, values, meta.title || '')
  }

  return meta.title || ''
}

export function getRouteTitle(routeLike = {}) {
  return getMetaTitle(routeLike.meta || {}, routeLike.params || {})
}

export function getDocumentTitle(routeLike = {}) {
  const pageTitle = getRouteTitle(routeLike)
  const appTitle = translate('app.title', {}, 'Vue 3 通用后台模板')

  return pageTitle ? `${pageTitle} - ${appTitle}` : appTitle
}

export function setDocumentTitleByRoute(routeLike = {}) {
  if (typeof document === 'undefined') {
    return
  }

  document.title = getDocumentTitle(routeLike)
}

export function getLocaleLabel(locale = DEFAULT_LOCALE, fallbackLabel = '') {
  const normalizedLocale = normalizeLocale(locale)
  const option = LOCALE_OPTIONS.find((item) => item.value === normalizedLocale)

  return translate(option?.labelKey || '', {}, option?.fallbackLabel || fallbackLabel)
}

export function getRoleLabel(roleCode = '', fallbackText = '') {
  return translate(`common.roles.${roleCode}`, {}, fallbackText || roleCode)
}

export function getMenuTypeLabel(menuType = '', fallbackText = '') {
  return translate(`common.menuType.${menuType}`, {}, fallbackText || menuType)
}

export function getStatusLabel(status = '', fallbackText = '') {
  return translate(`common.status.${status}`, {}, fallbackText || status)
}

export function syncLocaleByRoute(routeLike = {}) {
  const routeLocale = getLocaleFromRouteLike(routeLike)
  return applyAppLocale(routeLocale)
}
