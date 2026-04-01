import { createApp } from 'vue'

import App from './App.vue'
import { setupPlugins } from './plugins'
import './styles/index.less'

// 创建应用实例。
const app = createApp(App)

// 注册项目全局能力。
// 当前阶段主要包括：
// 1. 主题初始化
// 2. Pinia 状态管理
// 3. Vue Router 路由系统
setupPlugins(app)

// 挂载应用。
app.mount('#app')
