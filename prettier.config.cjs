// Prettier 配置文件
// Prettier 只负责“代码格式统一”，不负责代码质量检查。
// 质量问题交给 ESLint，格式问题交给 Prettier，
// 这是前端项目里非常常见的一种协作方式。
module.exports = {
  // 每行最大长度。超过后会自动换行。
  printWidth: 100,

  // 使用 2 个空格缩进。
  tabWidth: 2,

  // 语句结尾不加分号。
  semi: false,

  // 字符串尽量使用单引号。
  singleQuote: true,

  // 多行对象、数组的最后一项不保留尾随逗号。
  trailingComma: 'none',

  // 统一使用 LF 换行，减少跨平台协作时的换行差异。
  endOfLine: 'lf',

  // Vue 文件的 script 和 style 标签内部不额外缩进。
  vueIndentScriptAndStyle: false,

  // HTML 空白敏感度交给 CSS 语义处理，更适合日常开发。
  htmlWhitespaceSensitivity: 'css'
}
