import { brotliCompressSync, constants as zlibConstants, gzipSync } from 'node:zlib'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

function normalizeModulePath(path = '') {
  return String(path || '').replace(/\\/g, '/')
}

function getPackageName(id = '') {
  const normalizedId = normalizeModulePath(id)
  const packagePath = normalizedId.split('/node_modules/').pop() || ''
  const pathSegmentList = packagePath.split('/')

  if (pathSegmentList[0]?.startsWith('@')) {
    return `${pathSegmentList[0] || ''}/${pathSegmentList[1] || ''}`
  }

  return pathSegmentList[0] || ''
}

// 为常驻依赖提供更稳定的 vendor chunk。
// 这样浏览器缓存命中率更高，也能避免所有第三方代码都堆进入口 chunk。
function createManualChunks(id = '') {
  const normalizedId = normalizeModulePath(id)

  // 语言包现在按语言拆分成独立异步 chunk，切换语言时再下载。
  if (normalizedId.includes('/src/locales/messages/zh-CN/')) {
    return 'locale-zh-CN'
  }

  if (normalizedId.includes('/src/locales/messages/en-GB/')) {
    return 'locale-en-GB'
  }

  if (!normalizedId.includes('/node_modules/')) {
    return undefined
  }

  const packageName = getPackageName(normalizedId)

  // Vue 运行时、路由和状态管理属于高频基础依赖，单独拆出来更适合长期缓存。
  if (
    packageName === 'vue' ||
    packageName === 'vue-router' ||
    packageName === 'pinia' ||
    packageName.startsWith('@vue/')
  ) {
    return 'vendor-framework'
  }

  // 国际化和日期格式化经常一起变更，但和业务代码耦合较弱，适合单独缓存。
  if (
    packageName === 'vue-i18n' ||
    packageName === 'dayjs' ||
    packageName.startsWith('@intlify/')
  ) {
    return 'vendor-i18n'
  }

  // 网络请求层依赖通常更新频率低，拆出来后可减少入口文件波动。
  if (packageName === 'axios') {
    return 'vendor-http'
  }

  // VueUse 只在特定页面使用，单独拆包可以避免影响主业务首屏。
  if (packageName === '@vueuse/core') {
    return 'vendor-vueuse'
  }

  // lodash-es 主要来自表格等重组件链路，独立出来后更容易定位和缓存。
  if (packageName === 'lodash-es') {
    return 'vendor-utils'
  }

  return undefined
}

function isCompressibleAsset(fileName = '') {
  return /\.(css|js|mjs|json|html|svg|txt|xml)$/i.test(fileName)
}

function normalizeAssetSource(source) {
  if (source instanceof Uint8Array) {
    return Buffer.from(source)
  }

  return Buffer.from(String(source))
}

// 用 Node 内置 zlib 直接生成 gzip / brotli 产物。
// 这样不用额外引入新的压缩插件依赖，改动更小，也更容易回退。
function createCompressionPlugin({ threshold = 10240 } = {}) {
  return {
    name: 'app:compression',
    apply: 'build',
    generateBundle(_, bundle) {
      Object.entries(bundle).forEach(([fileName, output]) => {
        if (!isCompressibleAsset(fileName)) {
          return
        }

        const sourceBuffer =
          output.type === 'asset'
            ? normalizeAssetSource(output.source)
            : Buffer.from(output.code, 'utf-8')

        // 小文件通常压缩收益有限，保留原文件即可，避免生成过多低价值产物。
        if (sourceBuffer.byteLength < threshold) {
          return
        }

        const gzipBuffer = gzipSync(sourceBuffer)

        if (gzipBuffer.byteLength < sourceBuffer.byteLength) {
          this.emitFile({
            type: 'asset',
            fileName: `${fileName}.gz`,
            source: gzipBuffer
          })
        }

        const brotliBuffer = brotliCompressSync(sourceBuffer, {
          params: {
            [zlibConstants.BROTLI_PARAM_QUALITY]: 11
          }
        })

        if (brotliBuffer.byteLength < sourceBuffer.byteLength) {
          this.emitFile({
            type: 'asset',
            fileName: `${fileName}.br`,
            source: brotliBuffer
          })
        }
      })
    }
  }
}

// 创建打包体积分析插件。
// 把分析报告相关配置集中到这里，方便后续统一维护。
async function createBundleVisualizer() {
  // 只有真正开启分析时才动态加载 visualizer。
  // 这样普通 build 不会额外加载分析依赖，也不会影响日常打包流程。
  const { visualizer } = await import('rollup-plugin-visualizer')

  return visualizer({
    // 报告输出文件位置。
    // 固定写到 dist/stats.html，方便和构建产物放在一起查看。
    filename: 'dist/stats.html',

    // 打包结束后自动打开分析报告页面。
    // 这样执行分析命令后可以第一时间看到结果。
    open: true,

    // 在报告中显示 gzip 压缩后的体积。
    // 便于评估资源经过常见压缩后的传输成本。
    gzipSize: true,

    // 在报告中显示 brotli 压缩后的体积。
    // 便于对比现代压缩方案下的真实体积表现。
    brotliSize: true,

    // 使用 treemap 模板展示模块体积分布。
    // 这种视图最适合快速定位哪些依赖或模块占包体积最大。
    template: 'treemap'
  })
}

// Vite 配置文件。
// 这一版配置遵循两个原则：
// 1. 尽量保持简单，让初学者能看懂每一块在做什么
// 2. 保留后台项目常用能力，避免后续频繁返工
export default defineConfig(async ({ mode }) => {
  // 读取当前模式下的环境变量。
  // 第 3 个参数传入空字符串，表示把所有环境变量都读取出来，
  // 这样后面扩展自定义变量时会更方便。
  const env = loadEnv(mode, process.cwd(), '')

  // 统一管理开发服务器的基础参数。
  // 优先读取 .env 文件里的配置，没有时再回退到默认值。
  const devHost = env.VITE_DEV_HOST || '0.0.0.0'
  const devPort = Number(env.VITE_DEV_PORT || 9524)
  const shouldOpen = env.VITE_DEV_OPEN === 'true'

  // 统一管理代理相关参数。
  // 当前先把常用代理入口预留好，后面联调真实后端时直接填写环境变量即可。
  const apiPrefix = env.VITE_API_PREFIX || '/api'
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  // 控制是否开启打包体积分析。
  // 默认普通打包不分析，只有专用命令通过 cross-env 传入 ANALYZE=true 时才开启。
  const shouldAnalyze = process.env.ANALYZE === 'true'

  // 控制是否为生产产物生成 gzip / brotli 压缩文件。
  // 通过环境变量保留显式开关，方便不同环境按需启停和快速回退。
  const shouldCompress = mode !== 'development' && env.VITE_BUILD_COMPRESS !== 'false'
  const compressionThreshold = Number(env.VITE_BUILD_COMPRESS_THRESHOLD || 10240)

  // 先整理基础插件列表。
  // 这样普通开发和普通打包逻辑会保持稳定，分析能力只在需要时额外挂载。
  const plugins = [
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
  ]

  // 生产构建时生成 gzip / brotli 静态压缩文件。
  // 这样部署到支持预压缩资源的服务器后，可以直接减少传输体积。
  if (shouldCompress) {
    plugins.push(
      createCompressionPlugin({
        threshold: compressionThreshold
      })
    )
  }

  // 只有执行专用分析命令时才追加分析插件。
  // 这样普通 build 不会生成额外报告，也不会额外触发打开页面。
  if (shouldAnalyze) {
    plugins.push(await createBundleVisualizer())
  }

  return {
    plugins,

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
    },

    build: {
      // 保留默认的代码压缩策略，同时显式配置拆包规则。
      // 这样既能维持 Vite 默认稳定性，也能让企业项目更容易做长期缓存。
      rollupOptions: {
        output: {
          manualChunks: createManualChunks
        }
      }
    }
  }
})
