/**
 * 学习注释：
 * 1. 文件角色：这是语言路径解析工具文件，主要解决“语言前缀在 URL 中怎么取、怎么补、怎么移除”的问题。
 * 2. 所在分层：国际化层。
 * 3. 当前文件主要依赖：语言常量、APP_STORAGE_KEY、本地存储工具。
 * 4. 当前文件对外暴露：isSupportedLocale、normalizeLocale、getStoredLocale、getBrowserLocale、getPreferredLocale、stripLocalePrefix、removeLocaleParamPrefix、getBaseRoutePath、resolveLocalePath、getLocaleFromRouteLike。
 * 5. 常见上游调用方：router 模块、权限守卫、国际化 hook、布局菜单逻辑。
 * 6. 阅读建议：先理解“路径去语言前缀”和“路径补语言前缀”，再看路由守卫和菜单为什么都依赖这里。
 */
import { APP_STORAGE_KEY } from '@/constants/storage'
import {
  DEFAULT_LOCALE,
  LOCALE_PARAM_PREFIX_REGEXP,
  LOCALE_PATH_PREFIX_REGEXP,
  SUPPORTED_LOCALE_LIST
} from '@/constants/locale'
import { getStorage } from '@/utils/storage'

function splitPathAndSuffix(path = '') {
  const matched = String(path || '').match(/^([^?#]*)(.*)$/)
  return {
    pathname: matched?.[1] || '',
    suffix: matched?.[2] || ''
  }
}

function normalizePathname(pathname = '') {
  if (!pathname) {
    return '/'
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const compactPath = normalizedPath.replace(/\/+?/g, '/').replace(/\/$/, '')
  return compactPath || '/'
}

export function isSupportedLocale(locale = '') {
  return SUPPORTED_LOCALE_LIST.includes(locale)
}

export function normalizeLocale(locale = '') {
  const nextLocale = String(locale || '').trim()

  if (isSupportedLocale(nextLocale)) {
    return nextLocale
  }

  const lowerCaseLocale = nextLocale.toLowerCase()

  if (lowerCaseLocale.startsWith('zh')) {
    return 'zh-CN'
  }

  if (lowerCaseLocale.startsWith('en')) {
    return 'en-GB'
  }

  return DEFAULT_LOCALE
}

export function getStoredLocale() {
  const cachedAppState = getStorage(APP_STORAGE_KEY, {})
  return normalizeLocale(cachedAppState.language || '')
}

export function getBrowserLocale() {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE
  }

  return normalizeLocale(navigator.language || navigator.userLanguage || '')
}

export function getPreferredLocale() {
  return getStoredLocale() || getBrowserLocale() || DEFAULT_LOCALE
}

export function stripLocalePrefix(path = '') {
  const { pathname, suffix } = splitPathAndSuffix(path)
  const strippedPathname = pathname.replace(LOCALE_PATH_PREFIX_REGEXP, '')
  return `${normalizePathname(strippedPathname)}${suffix}`
}

export function removeLocaleParamPrefix(path = '') {
  const normalizedPath = String(path || '') || '/'
  const strippedPath = normalizedPath.replace(LOCALE_PARAM_PREFIX_REGEXP, '')
  return normalizePathname(strippedPath)
}

export function getBaseRoutePath(path = '') {
  const { pathname } = splitPathAndSuffix(path)
  return normalizePathname(stripLocalePrefix(removeLocaleParamPrefix(pathname)))
}

export function resolveLocalePath(path = '', locale = DEFAULT_LOCALE) {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path
  }

  const normalizedLocale = normalizeLocale(locale)
  const { pathname, suffix } = splitPathAndSuffix(path)
  const basePath = normalizePathname(stripLocalePrefix(pathname))
  const localizedPath =
    basePath === '/' ? `/${normalizedLocale}` : `/${normalizedLocale}${basePath}`

  return `${localizedPath}${suffix}`
}

export function getLocaleFromRouteLike(routeLike = {}) {
  const localeFromParams = routeLike?.params?.locale

  if (isSupportedLocale(localeFromParams)) {
    return localeFromParams
  }

  const path = routeLike?.path || routeLike?.fullPath || ''
  const matchedLocale = String(path).match(LOCALE_PATH_PREFIX_REGEXP)

  return normalizeLocale(matchedLocale?.[1] || '')
}
