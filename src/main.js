/**
 * 学习注释：
 * 1. 文件角色：这是整个前端应用的启动入口，负责创建 Vue 应用实例，并把插件系统、全局样式一起挂载起来。
 * 2. 所在分层：入口层，项目启动时最先执行的文件。
 * 3. 当前文件主要依赖：Vue 运行时、根组件 App.vue、插件总装配函数 setupPlugins、全局样式入口。
 * 4. 当前文件对外暴露：当前文件没有显式导出，它的意义就是“启动应用”。
 * 5. 常见上游调用方：它会被 Vite 当作默认入口自动执行，而不是被某个业务文件手动 import。
 * 6. 阅读建议：先看导入了谁，再顺着 setupPlugins 进入整个项目骨架的注册链路。
 */
import { createApp } from 'vue'

import App from './App.vue'
import { setupPlugins } from './plugins'
import './styles/index.less'

// createApp(App) 会基于根组件创建一个 Vue 应用实例。
// 你可以把它理解成“整棵前端应用树的总控制器”。
// 后续的路由、Pinia、国际化、指令，都是往这个实例上继续安装的。
const app = createApp(App)

// setupPlugins(app) 会统一完成项目级能力注册。
// 这样 main.js 自己就只负责“启动顺序”，不需要塞满实现细节。
// 对学习来说，这种拆分很重要：
// 1. 先知道启动顺序。
// 2. 再进入对应模块看具体实现。
setupPlugins(app)

// mount('#app') 表示把整个 Vue 应用挂到 index.html 里的 #app 节点上。
// 只有执行到这一步，浏览器里才会真正把页面渲染出来。
app.mount('#app')
