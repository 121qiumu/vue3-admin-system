/**
 * 学习注释：
 * 1. 文件角色：这是常量文件，统一存放固定枚举、默认值、存储 key、状态码等不会随业务频繁变化的数据。
 * 2. 所在分层：常量层：统一存放固定枚举和配置键值。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：REQUEST_SUCCESS_CODE_LIST、HTTP_STATUS、SERVER_EXCEPTION_STATUS_LIST、HTTP_STATUS_MESSAGE_MAP
 * 5. 常见上游调用方：src/request/helper.js、src/request/index.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
// 请求层相关常量。
// 统一把常见状态码和默认提示语放在这里，
// 这样请求拦截器和业务层都不需要到处手写魔法数字。

// 业务成功码列表。
// 真实项目里常见的成功码通常是 0 或 200，
// 这里都先兼容上，后续接具体后端时再按团队规范收敛。
export const REQUEST_SUCCESS_CODE_LIST = [0, 200]

// 常见 HTTP 状态码。
export const HTTP_STATUS = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
})

// 需要按“服务异常”处理的一组状态码。
// 这类错误通常不是用户输错参数，而是后端服务本身有问题，
// 因此更适合统一展示更强的异常提示，必要时进入 500 页面。
export const SERVER_EXCEPTION_STATUS_LIST = [
  HTTP_STATUS.SERVER_ERROR,
  HTTP_STATUS.BAD_GATEWAY,
  HTTP_STATUS.SERVICE_UNAVAILABLE,
  HTTP_STATUS.GATEWAY_TIMEOUT
]

// 常见 HTTP 错误文案映射。
export const HTTP_STATUS_MESSAGE_MAP = {
  [HTTP_STATUS.BAD_REQUEST]: '请求参数有误，请检查后重试',
  [HTTP_STATUS.UNAUTHORIZED]: '登录状态已失效，请重新登录',
  [HTTP_STATUS.FORBIDDEN]: '当前账号没有访问权限',
  [HTTP_STATUS.NOT_FOUND]: '请求的接口地址不存在',
  [HTTP_STATUS.SERVER_ERROR]: '服务器内部异常，请稍后重试',
  [HTTP_STATUS.BAD_GATEWAY]: '网关异常，请稍后重试',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: '服务暂时不可用，请稍后重试',
  [HTTP_STATUS.GATEWAY_TIMEOUT]: '接口请求超时，请稍后重试'
}
