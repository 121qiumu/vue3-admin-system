/**
 * 学习注释：
 * 1. 文件角色：这是 mock 总入口，负责决定当前是否开启 mock，并统一导出 mock 请求能力。
 * 2. 所在分层：本地模拟数据层：在没有真实后端时提供演示数据。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：createMockRequest、isMockEnabled
 * 5. 常见上游调用方：src/api/auth.js、src/api/dashboard.js、src/api/permission.js、src/api/system.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
export { createMockRequest, isMockEnabled } from './helper'
