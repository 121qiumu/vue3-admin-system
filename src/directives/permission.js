/**
 * 学习注释：
 * 1. 文件角色：这是按钮权限指令文件，负责根据权限码决定某个 DOM 元素是否显示。
 * 2. 所在分层：指令层：封装 DOM 级别的复用行为。
 * 3. 当前文件主要依赖：{ checkPermission, normalizePermissionBinding } <- src/permission/utils.js
 * 4. 当前文件对外暴露：命名导出：permissionDirective
 * 5. 常见上游调用方：src/directives/index.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { checkPermission, normalizePermissionBinding } from '@/permission/utils'

function applyPermissionDisplay(el, bindingValue) {
  const { mode, codes } = normalizePermissionBinding(bindingValue)
  const hasCurrentPermission = checkPermission(codes, mode)

  // 初次处理时，先记住元素原本的 display 值。
  // 这样当权限状态发生变化时，还能把元素恢复回原本的展示方式。
  if (el.dataset.permissionDisplay === undefined) {
    el.dataset.permissionDisplay = el.style.display || ''
  }

  el.style.display = hasCurrentPermission ? el.dataset.permissionDisplay : 'none'
}

// 按钮权限指令。
// 它的核心作用是：根据当前账号的按钮权限码，决定元素是否显示。
export const permissionDirective = {
  mounted(el, binding) {
    applyPermissionDisplay(el, binding.value)
  },
  updated(el, binding) {
    applyPermissionDisplay(el, binding.value)
  }
}
