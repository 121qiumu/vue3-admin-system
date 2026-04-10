/**
 * 学习注释：
 * 1. 文件角色：这是自定义指令注册入口，所有全局指令都会先在这里汇总再安装到应用上。
 * 2. 所在分层：指令层：封装 DOM 级别的复用行为。
 * 3. 当前文件主要依赖：{ permissionDirective } <- src/directives/permission.js
 * 4. 当前文件对外暴露：命名导出：setupDirectives
 * 5. 常见上游调用方：src/plugins/index.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { permissionDirective } from './permission'

// 统一注册自定义指令。
// 当前先注册权限指令，后续如果继续扩展防抖、复制、自动聚焦等指令，
// 都可以继续放到这个入口中统一管理。
export function setupDirectives(app) {
  app.directive('permission', permissionDirective)
}
