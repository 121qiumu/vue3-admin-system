import { systemRoute } from './system'

// 动态路由。
// 这部分路由不会在项目启动时直接注册，
// 后续会在“获取用户权限数据”之后再按需动态注入。
export const asyncRoutes = [systemRoute]
