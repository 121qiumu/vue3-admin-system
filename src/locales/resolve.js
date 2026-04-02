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
  const compactPath = normalizedPath.replace(/\/+/g, '/').replace(/\/$/, '')
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
