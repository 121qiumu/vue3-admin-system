/**
 * 学习注释：
 * 1. 文件角色：这是动态路由入口，真正的路由定义会按模块拆分，再统一在这里汇总。
 * 2. 所在分层：路由层：定义页面访问路径、菜单来源、动态路由装配规则。
 * 3. 当前文件主要依赖：{ systemRoute } <- src/router/modules/system.js
 * 4. 当前文件对外暴露：命名导出：asyncRoutes
 * 5. 常见上游调用方：src/router/index.js、src/store/modules/permission.js
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import { systemRoute } from './system'

// 动态路由。
// 这部分路由不会在项目启动时直接注册，
// 后续会在“获取用户权限数据”之后再按需动态注入。
export const asyncRoutes = [systemRoute]
