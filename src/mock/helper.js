// 判断当前是否启用 mock。
// 这里不和某个具体 mock 库绑定，而是通过环境变量统一控制。
// 后续如果切到真实后端，只需要把 VITE_USE_MOCK 改成 false 即可。
export function isMockEnabled() {
  return import.meta.env.VITE_USE_MOCK === 'true'
}

// 深拷贝 mock 返回数据。
// 这样页面层或 store 层修改数据时，不会意外污染原始 mock 数据源。
export function cloneMockData(data) {
  return JSON.parse(JSON.stringify(data))
}

// 创建统一的 mock 错误对象。
export function createMockError(message) {
  const error = new Error(message)
  error.message = message
  return error
}

// 统一模拟接口延迟。
// 这样页面在使用本地 mock 时，交互体验也会更接近真实网络请求。
export function createMockRequest(executor, delay = 500) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(cloneMockData(executor()))
      } catch (error) {
        reject(error)
      }
    }, delay)
  })
}
