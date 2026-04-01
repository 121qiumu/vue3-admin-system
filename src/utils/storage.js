// 本地存储工具方法
// 这里统一封装 localStorage 的常见读写逻辑，
// 这样每个 store 都可以复用同一套持久化方式。

function isClient() {
  return typeof window !== 'undefined'
}

// 读取并解析 JSON 数据。
// 如果数据不存在、解析失败，统一返回默认值。
export function getStorage(key, defaultValue = null) {
  if (!isClient()) {
    return defaultValue
  }

  const rawValue = window.localStorage.getItem(key)

  if (!rawValue) {
    return defaultValue
  }

  try {
    return JSON.parse(rawValue)
  } catch (error) {
    console.warn(`[storage] 读取 ${key} 失败，将回退到默认值`, error)
    return defaultValue
  }
}

// 把数据写入 localStorage。
// 统一使用 JSON 序列化，便于后续保存对象和数组。
export function setStorage(key, value) {
  if (!isClient()) {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

// 删除指定 key 的缓存。
export function removeStorage(key) {
  if (!isClient()) {
    return
  }

  window.localStorage.removeItem(key)
}
