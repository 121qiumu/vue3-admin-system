import { permissionDirective } from './permission'

// 统一注册自定义指令。
// 当前先注册权限指令，后续如果继续扩展防抖、复制、自动聚焦等指令，
// 都可以继续放到这个入口中统一管理。
export function setupDirectives(app) {
  app.directive('permission', permissionDirective)
}
