<template>
  <DetailPageTemplate
    title="用户详情"
    description="通用详情页模板适合承载基础信息、业务说明和扩展操作。"
    :loading="loading"
    back-path="/system/user"
  >
    <template #actions>
      <el-button type="primary" @click="goEdit">编辑用户</el-button>
    </template>

    <template #summary>
      <div class="system-detail-summary">
        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">当前状态</div>
          <el-tag :type="userDetail.status === 'enabled' ? 'success' : 'info'">
            {{ userDetail.status === 'enabled' ? '启用' : '停用' }}
          </el-tag>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">所属角色</div>
          <div class="system-detail-summary__value">{{ userDetail.roleName || '--' }}</div>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">最近登录</div>
          <div class="system-detail-summary__value">{{ userDetail.lastLoginTime || '--' }}</div>
        </div>
      </div>
    </template>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">基础信息</div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户名">{{
          userDetail.username || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ userDetail.nickname || '--' }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ userDetail.phone || '--' }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ userDetail.email || '--' }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{
          userDetail.departmentName || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          userDetail.createTime || '--'
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">备注说明</div>
      </template>

      <div class="system-detail-remark">{{ userDetail.remark || '暂无备注说明' }}</div>
    </el-card>
  </DetailPageTemplate>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import DetailPageTemplate from '@/components/common/business/DetailPageTemplate.vue'
import { getUserDetailApi } from '@/api/system'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const userDetail = reactive({
  id: '',
  username: '',
  nickname: '',
  roleName: '',
  status: '',
  phone: '',
  email: '',
  departmentName: '',
  createTime: '',
  lastLoginTime: '',
  remark: ''
})

async function loadUserDetail() {
  loading.value = true

  try {
    const result = await getUserDetailApi(route.params.id)
    Object.assign(userDetail, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取用户详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goEdit() {
  if (!userDetail.id) {
    return
  }

  router.push(`/system/user/edit/${userDetail.id}`)
}

onMounted(() => {
  loadUserDetail()
})
</script>

<style scoped lang="less">
.system-detail-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--app-space-md);
}

.system-detail-summary__item {
  padding: var(--app-space-md);
  background-color: var(--app-color-bg-elevated);
  border: var(--app-border-width) solid var(--app-color-border-light);
  border-radius: var(--app-radius-large);
}

.system-detail-summary__label {
  color: var(--app-color-text-secondary);
}

.system-detail-summary__value {
  margin-top: var(--app-space-sm);
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.system-section-title {
  font-weight: 600;
  color: var(--app-color-text-primary);
}

.system-detail-remark {
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

@media (max-width: 768px) {
  .system-detail-summary {
    grid-template-columns: 1fr;
  }
}
</style>
