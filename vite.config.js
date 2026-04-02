import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// Vite 配置文件。
// 这一版配置遵循两个原则：
// 1. 尽量保持简单，让初学者能看懂每一块在做什么
// 2. 保留后台项目常用能力，避免后续频繁返工
export default defineConfig(({ mode }) => {
  // 读取当前模式下的环境变量。
  // 第 3 个参数传入空字符串，表示把所有环境变量都读取出来，
  // 这样后面扩展自定义变量时会更方便。
  const env = loadEnv(mode, process.cwd(), '')

  // 统一管理开发服务器的基础参数。
  // 优先读取 .env 文件里的配置，没有时再回退到默认值。
  const devHost = env.VITE_DEV_HOST || '0.0.0.0'
  const devPort = Number(env.VITE_DEV_PORT || 5173)
  const shouldOpen = env.VITE_DEV_OPEN === 'true'

  // 统一管理代理相关参数。
  // 当前先把常用代理入口预留好，后面联调真实后端时直接填写环境变量即可。
  const apiPrefix = env.VITE_API_PREFIX || '/api'
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  return {
    plugins: [
      // Vue 官方插件。
      // 这是 Vite + Vue 项目的基础插件，没有它就无法识别 .vue 文件。
      vue(),

      // 自动导入常用 API。
      // 当前主要处理 Vue、Vue Router、Pinia 和 Element Plus 的服务型 API。
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [
          // Element Plus 组件服务函数按需自动导入。
          // 这里显式加上 importStyle: 'css'，让 ElMessage、ElMessageBox、ElNotification
          // 这类服务组件在自动导入时，也能自动带上对应的样式文件。
          // 对当前 JavaScript + Less 项目来说，使用 css 版本最直接、最稳定。
          ElementPlusResolver({
            importStyle: 'css'
          })
        ],
        // 当前项目使用 JavaScript，所以不生成 d.ts 文件。
        dts: false
      }),

      // 自动导入组件。
      // 这里同时处理 Element Plus 组件和图标组件。
      Components({
        resolvers: [
          // Element Plus 组件按需导入，并自动引入对应样式。
          ElementPlusResolver({
            importStyle: 'css'
          }),

          // 图标自动导入方案。
          // 当前采用 unplugin-icons + Iconify 图标集，先启用 ep 图标集合。
          // 使用时可以直接写 <IconEpHomeFilled /> 这种组件形式。
          IconsResolver({
            prefix: 'Icon',
            enabledCollections: ['ep']
          })
        ],
        dts: false
      }),

      // 图标插件本体。
      // 它负责把图标转成 Vue 组件，供模板中直接使用。
      Icons({
        compiler: 'vue3',
        autoInstall: false
      })
    ],

    resolve: {
      alias: {
        // 把 @ 指向 src。
        // 后面导入组件、工具、路由、store 时，路径会清晰很多。
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    server: {
      // 开发服务器监听地址。
      // 使用 0.0.0.0 后，局域网设备也可以访问当前项目。
      host: devHost,

      // 开发服务器端口。
      port: devPort,

      // 是否在启动时自动打开浏览器。
      open: shouldOpen,

      // 是否严格占用当前端口。
      // 开启后，如果端口被占用会直接报错，更容易定位问题。
      strictPort: true,

      // 预留代理配置位置。
      // 只有配置了 VITE_API_PROXY_TARGET 后才会真正启用代理。
      proxy: apiProxyTarget
        ? {
            [apiPrefix]: {
              // 真实后端服务地址。
              target: apiProxyTarget,

              // 修改请求头中的源地址，减少跨域限制问题。
              changeOrigin: true,

              // 如果后端使用的是自签名 HTTPS 证书，可以通过 false 跳过证书校验。
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
          // 某些第三方样式库或复杂主题场景会依赖这个能力。
          javascriptEnabled: true

          // 这里暂时不使用 additionalData 做全局注入。
          // 学习阶段显式引入样式来源，会更容易理解变量来自哪里。
        }
      }
    }

    // 如果后续需要做打包优化，可以在这里继续扩展 build 配置。
    // build: {
    //   sourcemap: false,
    //   chunkSizeWarningLimit: 1500
    // }
  }
})
