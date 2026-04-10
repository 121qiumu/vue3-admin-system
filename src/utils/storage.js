/**
 * 学习注释：
 * 1. 文件角色：这是本地缓存工具文件，Pinia 的持久化读写会优先复用这里的方法。
 * 2. 所在分层：工具层：放通用函数，避免重复写基础逻辑。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：getStorage、setStorage、removeStorage
 * 5. 常见上游调用方：src/locales/resolve.js、src/store/modules/app.js、src/store/modules/permission.js、src/store/modules/tabs.js、src/store/modules/user.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
