/**
 * 学习注释：
 * 1. 文件角色：这是常量文件，统一存放固定枚举、默认值、存储 key、状态码等不会随业务频繁变化的数据。
 * 2. 所在分层：常量层：统一存放固定枚举和配置键值。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：LAYOUT_MODE_ENUM、DEVICE_TYPE_ENUM、DEFAULT_LAYOUT_MODE、LAYOUT_MOBILE_BREAKPOINT、LAYOUT_MODE_OPTIONS
 * 5. 常见上游调用方：src/layout/components/LayoutHeader.vue、src/layout/components/LayoutSettingsPanel.vue、src/layout/index.vue、src/store/modules/app.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
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
// 当前默认仍然是左侧布局，它也是后台项目里最常见的一种排布方式。
export const DEFAULT_LAYOUT_MODE = LAYOUT_MODE_ENUM.LEFT

// 移动端判断断点。
// 宽度小于这个值时，布局会切换成移动端交互模式。
export const LAYOUT_MOBILE_BREAKPOINT = 992

// 布局选项。
// 这里同时保留 i18n key 和兜底文案，方便在 JS 和模板里统一复用。
export const LAYOUT_MODE_OPTIONS = [
  {
    value: LAYOUT_MODE_ENUM.LEFT,
    labelKey: 'layout.layoutModeOptions.left.label',
    descriptionKey: 'layout.layoutModeOptions.left.description',
    fallbackLabel: '左侧布局',
    fallbackDescription: '最常见的后台管理布局，菜单在左侧。'
  },
  {
    value: LAYOUT_MODE_ENUM.TOP,
    labelKey: 'layout.layoutModeOptions.top.label',
    descriptionKey: 'layout.layoutModeOptions.top.description',
    fallbackLabel: '顶部布局',
    fallbackDescription: '适合一级菜单较少的系统。'
  },
  {
    value: LAYOUT_MODE_ENUM.MIX,
    labelKey: 'layout.layoutModeOptions.mix.label',
    descriptionKey: 'layout.layoutModeOptions.mix.description',
    fallbackLabel: '混合布局',
    fallbackDescription: '一级菜单在顶部，二级菜单在左侧。'
  }
]
