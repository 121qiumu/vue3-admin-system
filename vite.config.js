import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// Vite 配置文件
// 这一版配置遵循两个原则：
// 1. 尽量保持简单，让初学者能看懂每一块在做什么
// 2. 又要保留后台项目常用能力，避免后续频繁返工
export default defineConfig(({ mode }) => {
  // 读取当前模式下的环境变量。
  // 第 3 个参数传入空字符串，表示把所有环境变量都读进来，
  // 这样我们既能读取 VITE_ 开头的变量，也方便后续扩展自定义字段。
  const env = loadEnv(mode, process.cwd(), '')

  // 统一管理开发服务器基础参数。
  // 这些值优先取 .env 文件中的配置，如果没有再回退到默认值。
  const devHost = env.VITE_DEV_HOST || '0.0.0.0'
  const devPort = Number(env.VITE_DEV_PORT || 5173)
  const shouldOpen = env.VITE_DEV_OPEN === 'true'

  // 统一管理代理相关参数。
  // 这里先把“代理入口”和“目标地址”的位置预留好，
  // 当 VITE_API_PROXY_TARGET 有值时才真正启用代理。
  const apiPrefix = env.VITE_API_PREFIX || '/api'
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  return {
    plugins: [
      // Vue 官方插件。
      // 这是 Vite + Vue 项目的基础插件，没有它就无法识别 .vue 文件。
      vue(),

      // 自动导入常用 API。
      // 当前只自动导入 Vue、Vue Router、Pinia 和 Element Plus 服务型 API，
      // 这样既能减少重复 import，又不会让项目显得过度“魔法化”。
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [
          // 让 ElMessage、ElNotification 这类服务函数也能按需自动导入。
          ElementPlusResolver()
        ],
        // 当前是 JavaScript 项目，不生成 d.ts 文件，
        // 避免让初学者误以为项目已经切到了 TypeScript。
        dts: false
      }),

      // 自动导入组件。
      // 这里同时处理两类组件：
      // 1. Element Plus 组件，例如 ElButton、ElTable
      // 2. 图标组件，例如 IconEpHomeFilled、IconEpSetting
      Components({
        resolvers: [
          // Element Plus 官方推荐的按需导入方案之一。
          ElementPlusResolver(),

          // 图标自动导入方案。
          // 这里采用 unplugin-icons + Iconify 图标集，
          // 当前先启用 ep（Element Plus 风格）这一套图标。
          // 使用时可以直接写 <IconEpHomeFilled /> 这样的组件。
          IconsResolver({
            prefix: 'Icon',
            enabledCollections: ['ep']
          })
        ],
        dts: false
      }),

      // 图标插件本体。
      // 它负责把 Iconify 图标转成可以直接在 Vue 中使用的组件。
      // 当前关闭 autoInstall，避免项目在运行时偷偷安装依赖，
      // 对学习型项目来说，这样更可控、更容易理解。
      Icons({
        compiler: 'vue3',
        autoInstall: false
      })
    ],

    resolve: {
      alias: {
        // 把 @ 指向 src。
        // 这是 Vue 项目里最常见、也最实用的路径别名配置。
        // 配置后可以把 ../../../../utils 这种路径改成 @/utils。
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    server: {
      // 开发服务器监听地址。
      // 使用 0.0.0.0 后，局域网设备也可以访问当前项目。
      host: devHost,

      // 开发服务器端口。
      // 端口号从环境变量中读取，方便不同项目或不同同事按需调整。
      port: devPort,

      // 是否在启动时自动打开浏览器。
      // 这个行为不一定人人都喜欢，所以交给环境变量控制。
      open: shouldOpen,

      // 是否严格占用当前端口。
      // 开启后，如果端口被占用会直接报错，
      // 这样更容易发现端口冲突，而不是悄悄切到别的端口。
      strictPort: true,

      // 预留代理配置位置。
      // 如果当前没有配置代理目标地址，就返回空对象，不启用代理。
      proxy: apiProxyTarget
        ? {
            [apiPrefix]: {
              // 真实后端服务地址。
              // 开发环境下，请把它改成你本地或测试环境的接口地址。
              target: apiProxyTarget,

              // 修改请求头中的源地址，减少跨域限制问题。
              changeOrigin: true,

              // 如果后端使用的是自签名 HTTPS 证书，
              // 可以通过 false 跳过证书校验。
              secure: false

              // 如果后端不需要 /api 前缀，可以打开下面这行进行路径重写。
              // rewrite: path => path.replace(new RegExp(`^${apiPrefix}`), '')
            }
          }
        : {}
    },

    css: {
      preprocessorOptions: {
        less: {
          // 允许 Less 中使用 JavaScript 表达式。
          // 某些第三方样式库或复杂主题场景会依赖这个能力，
          // 所以后台项目中通常会把它打开。
          javascriptEnabled: true

          // 这里没有默认开启 additionalData 全局注入。
          // 原因是学习阶段更适合显式引入 less 变量来源，
          // 这样阅读组件样式时更容易知道变量从哪里来。
        }
      }
    }

    // 如果后续需要做打包优化，还可以在这里继续扩展：
    // build: {
    //   sourcemap: false,
    //   chunkSizeWarningLimit: 1500
    // }
  }
})
