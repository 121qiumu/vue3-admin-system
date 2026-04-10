<template>
  <DetailPageTemplate
    title="菜单详情"
    description="菜单详情页适合展示路由地址、组件路径、权限码和上级关系等信息。"
    :loading="loading"
    back-path="/system/menu"
  >
    <template #actions>
      <el-button type="primary" @click="goEdit">编辑菜单</el-button>
    </template>

    <template #summary>
      <div class="system-detail-summary">
        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">菜单状态</div>
          <el-tag :type="menuDetail.status === 'enabled' ? 'success' : 'info'">
            {{ menuDetail.status === 'enabled' ? '启用' : '停用' }}
          </el-tag>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">菜单类型</div>
          <div class="system-detail-summary__value">{{ menuDetail.menuType || '--' }}</div>
        </div>

        <div class="system-detail-summary__item">
          <div class="system-detail-summary__label">上级菜单</div>
          <div class="system-detail-summary__value">{{ menuDetail.parentName || '--' }}</div>
        </div>
      </div>
    </template>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">基础信息</div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="菜单名称">{{
          menuDetail.menuName || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="菜单类型">{{
          menuDetail.menuType || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="上级菜单">{{
          menuDetail.parentName || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="排序值">{{
          menuDetail.orderNum ?? '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="路由地址">{{
          menuDetail.routePath || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="权限标识">{{
          menuDetail.permissionCode || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="组件路径">{{
          menuDetail.component || '--'
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          menuDetail.createTime || '--'
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="system-section-title">补充说明</div>
      </template>

      <div class="system-detail-remark">{{ menuDetail.remark || '暂无备注说明' }}</div>
    </el-card>
  </DetailPageTemplate>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是系统管理模块的详情页，主要用来展示单条数据的完整信息。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ onMounted, reactive, ref } <- vue；{ useRoute, useRouter } <- vue-router；{ ElMessage } <- element-plus；DetailPageTemplate <- src/components/common/business/DetailPageTemplate.vue；{ getMenuDetailApi } <- src/api/system.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import DetailPageTemplate from '@/components/common/business/DetailPageTemplate.vue'
import { getMenuDetailApi } from '@/api/system'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const menuDetail = reactive({
  id: '',
  menuName: '',
  menuType: '',
  parentName: '',
  routePath: '',
  permissionCode: '',
  component: '',
  orderNum: 0,
  status: '',
  createTime: '',
  remark: ''
})

async function loadMenuDetail() {
  loading.value = true

  try {
    const result = await getMenuDetailApi(route.params.id)
    Object.assign(menuDetail, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取菜单详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goEdit() {
  if (!menuDetail.id) {
    return
  }

  router.push(`/system/menu/edit/${menuDetail.id}`)
}

onMounted(() => {
  loadMenuDetail()
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
