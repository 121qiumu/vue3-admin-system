import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

// 手动声明自动导入的全局 API。
// 由于当前项目启用了 unplugin-auto-import，
// ESLint 需要知道这些名字是“由构建工具自动注入”的，
// 否则会把它们误判成未定义变量。
const autoImportGlobals = {
  computed: 'readonly',
  defineStore: 'readonly',
  ElLoading: 'readonly',
  ElMessage: 'readonly',
  ElMessageBox: 'readonly',
  ElNotification: 'readonly',
  nextTick: 'readonly',
  onBeforeRouteLeave: 'readonly',
  onBeforeRouteUpdate: 'readonly',
  onMounted: 'readonly',
  reactive: 'readonly',
  ref: 'readonly',
  storeToRefs: 'readonly',
  useRoute: 'readonly',
  useRouter: 'readonly',
  watch: 'readonly',
  watchEffect: 'readonly'
}

export default [
  {
    // 先忽略不需要参与 lint 的目录和文件。
    ignores: ['dist/**', 'node_modules/**']
  },

  // JavaScript 官方推荐规则
  js.configs.recommended,

  // Vue 官方推荐规则（Flat Config 写法）
  ...pluginVue.configs['flat/recommended'],

  {
    // src 目录默认运行在浏览器环境中。
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...autoImportGlobals
      }
    }
  },

  {
    // 配置文件运行在 Node 环境中。
    files: ['*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    }
  },

  {
    // 放一些适合学习项目的温和规则。
    files: ['src/**/*.{js,vue}'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },

  {
    // 这些是 Vue 项目里很常见、也比较实用的规则调整。
    files: ['src/**/*.vue'],
    rules: {
      // 后台项目里常见的 index.vue、App.vue、Login.vue 等命名，
      // 如果强制多单词组件名，初学者会比较困惑，所以这里先关闭。
      'vue/multi-word-component-names': 'off'
    }
  },

  // 让 ESLint 与 Prettier 和平共处：
  // 把所有可能和 Prettier 冲突的格式类规则关闭掉。
  eslintConfigPrettier
]
