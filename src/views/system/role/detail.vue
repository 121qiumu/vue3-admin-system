<template>
  <DetailPageTemplate
    title="角色详情"
    description="详情页模板更适合承载结构化信息展示，而不是继续堆在列表弹窗里。"
    :loading="loading"
    back-path="/system/role"
  >
    <template #actions>
      <el-button type="primary" @click="goEdit">编辑角色</el-button>
    </template>

    <template #summary>
      <div class="system-detail-summary">
        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">角色状态</div>
          <el-tag :type="roleDetail.status === 'enabled' ? 'success' : 'info'">
            {{ roleDetail.status === 'enabled' ? '启用' : '停用' }}
          </el-tag>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">数据范围</div>
          <div class="system-detail-summary__value">{{ roleDetail.dataScope || '--' }}</div>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">成员数量</div>
          <div class="system-detail-summary__value">{{ roleDetail.memberCount ?? '--' }}</div>
        </div>
      </div>
    </template>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">基础信息</div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="角色名称">{{
          roleDetail.roleName || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="角色编码">{{
          roleDetail.roleCode || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="数据范围">{{
          roleDetail.dataScope || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          roleDetail.createTime || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="最近更新">{{
          roleDetail.updateTime || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="成员数量">{{
          roleDetail.memberCount ?? '--'
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">权限说明</div>
      </template>

      <div class="system-detail-remark">{{ roleDetail.permissionSummary || '暂无权限说明' }}</div>
      <div class="system-detail-remark system-detail-remark--sub">
        {{ roleDetail.remark || '暂无备注说明' }}
      </div>
    </el-card>
  </DetailPageTemplate>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import DetailPageTemplate from '@/components/common/business/DetailPageTemplate.vue'
import { getRoleDetailApi } from '@/api/system'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const roleDetail = reactive({
  id: '',
  roleName: '',
  roleCode: '',
  dataScope: '',
  status: '',
  memberCount: 0,
  createTime: '',
  updateTime: '',
  permissionSummary: '',
  remark: ''
})

async function loadRoleDetail() {
  loading.value = true

  try {
    const result = await getRoleDetailApi(route.params.id)
    Object.assign(roleDetail, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取角色详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goEdit() {
  if (!roleDetail.id) {
    return
  }

  router.push(`/system/role/edit/${roleDetail.id}`)
}

onMounted(() => {
  loadRoleDetail()
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

.system-detail-remark--sub {
  margin-top: var(--app-space-md);
  color: var(--app-color-text-secondary);
}

@media (max-width: 768px) {
  .system-detail-summary {
    grid-template-columns: 1fr;
  }
}
</style>
