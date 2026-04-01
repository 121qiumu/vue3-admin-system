// lint-staged 配置
// 只处理“已经 git add 到暂存区”的文件，
// 这样提交速度更快，也不会每次都扫描整个项目。
export default {
  '*.{js,mjs,cjs,vue}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,less,html}': ['prettier --write']
}
