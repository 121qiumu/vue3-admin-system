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
