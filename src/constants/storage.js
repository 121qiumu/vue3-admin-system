/**
 * 学习注释：
 * 1. 文件角色：这是常量文件，统一存放固定枚举、默认值、存储 key、状态码等不会随业务频繁变化的数据。
 * 2. 所在分层：常量层：统一存放固定枚举和配置键值。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：APP_STORAGE_KEY、USER_STORAGE_KEY、PERMISSION_STORAGE_KEY、TABS_STORAGE_KEY
 * 5. 常见上游调用方：src/locales/resolve.js、src/store/modules/app.js、src/store/modules/permission.js、src/store/modules/tabs.js、src/store/modules/user.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
// 本地持久化 key 常量
// 所有需要写入 localStorage 的模块，都建议统一在这里管理 key，
// 避免字符串散落在项目各处，后续维护更清晰。

export const APP_STORAGE_KEY = 'vue3-admin-system-app-store'
export const USER_STORAGE_KEY = 'vue3-admin-system-user-store'
export const PERMISSION_STORAGE_KEY = 'vue3-admin-system-permission-store'
export const TABS_STORAGE_KEY = 'vue3-admin-system-tabs-store'
