/**
 * 学习注释：
 * 1. 文件角色：这是首页仪表盘相关接口封装文件，页面只跟这里交互，不直接操作 request 实例。
 * 2. 所在分层：接口调用层：把业务接口按模块组织，供页面直接调用。
 * 3. 当前文件主要依赖：request <- src/request/index.js；{ createMockRequest, isMockEnabled } <- src/mock/index.js；{ mockGetDashboardData } <- src/mock/modules/dashboard.js
 * 4. 当前文件对外暴露：命名导出：getDashboardDataApi
 * 5. 常见上游调用方：src/views/dashboard/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
import request from '@/request'
import { createMockRequest, isMockEnabled } from '@/mock'
import { mockGetDashboardData } from '@/mock/modules/dashboard'

// 获取首页工作台数据。
// 当前开发环境默认走本地 mock，后续切真实后端时只需要关闭 VITE_USE_MOCK。
export function getDashboardDataApi(token = '') {
  if (isMockEnabled()) {
    return createMockRequest(() => mockGetDashboardData(token), 450)
  }

  return request.get('/dashboard/home')
}
