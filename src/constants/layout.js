// 布局模式常量
// 这一层统一管理“后台壳子”相关的固定配置，避免在多个文件里到处手写字符串。

export const LAYOUT_MODE_ENUM = Object.freeze({
  LEFT: 'left',
  TOP: 'top',
  MIX: 'mix'
})

// 设备类型枚举。
// 这里把设备类型状态抽离出来，后续做移动端适配、菜单折叠、抽屉逻辑时更方便。
export const DEVICE_TYPE_ENUM = Object.freeze({
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
})

// 默认布局模式。
// 当前第 6 步先实现左侧布局，后续再逐步补顶部布局和混合布局。
export const DEFAULT_LAYOUT_MODE = LAYOUT_MODE_ENUM.LEFT

// 移动端判断断点。
// 宽度小于这个值时，布局会切换成移动端交互模式。
export const LAYOUT_MOBILE_BREAKPOINT = 992

// 布局选项。
// 后续做布局切换面板时，可以直接复用这份数据。
export const LAYOUT_MODE_OPTIONS = [
  {
    label: '左侧布局',
    value: LAYOUT_MODE_ENUM.LEFT,
    description: '最常见的后台管理布局，菜单在左侧。'
  },
  {
    label: '顶部布局',
    value: LAYOUT_MODE_ENUM.TOP,
    description: '适合一级菜单较少的系统。'
  },
  {
    label: '混合布局',
    value: LAYOUT_MODE_ENUM.MIX,
    description: '一级菜单在顶部，二级菜单在左侧。'
  }
]
