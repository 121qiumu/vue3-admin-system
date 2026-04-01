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
