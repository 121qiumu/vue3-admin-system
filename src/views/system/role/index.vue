<template>
  <ListPageTemplate
    title="角色管理"
    description="角色管理页演示了统一列表模板如何承接不同的查询字段和表格列。"
    :loading="loading"
    :pagination="pagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
    <template #query>
      <el-form :model="queryForm" label-width="72px" inline>
        <el-form-item label="角色名称">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" clearable />
        </el-form-item>

        <el-form-item label="角色编码">
          <el-input v-model="queryForm.roleCode" placeholder="请输入角色编码" clearable />
        </el-form-item>

        <el-form-item label="状态">
          <el-select
            v-model="queryForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 160px"
          >
            <el-option label="启用" value="enabled" />
            <el-option label="停用" value="disabled" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #toolbar>
      <el-button v-permission="'system:role:create'" type="primary" @click="goCreate">
        新增角色
      </el-button>
    </template>

    <template #table>
      <el-table :data="tableData" border>
        <el-table-column prop="roleName" label="角色名称" min-width="150" />
        <el-table-column prop="roleCode" label="角色编码" min-width="140" />
        <el-table-column prop="dataScope" label="数据范围" min-width="140" />
        <el-table-column prop="memberCount" label="成员数" width="90" />

        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'info'" effect="light">
              {{ scope.row.status === 'enabled' ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="最近更新" min-width="170" />

        <el-table-column label="操作" width="220" fixed="right">
          <template #default="scope">
            <el-button link type="primary" @click="goDetail(scope.row)">详情</el-button>
            <el-button
              v-permission="'system:role:update'"
              link
              type="primary"
              @click="goEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-permission="'system:role:delete'"
              link
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </ListPageTemplate>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是系统管理模块的列表页入口，一般负责筛选条件、表格展示、跳转详情和新增编辑。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ onMounted, reactive, ref } <- vue；{ useRouter } <- vue-router；{ ElMessage, ElMessageBox } <- element-plus；ListPageTemplate <- src/components/common/business/ListPageTemplate.vue；{ deleteRoleApi, getRolePageApi } <- src/api/system.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import ListPageTemplate from '@/components/common/business/ListPageTemplate.vue'
import { deleteRoleApi, getRolePageApi } from '@/api/system'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const queryForm = reactive({
  roleName: '',
  roleCode: '',
  status: ''
})
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

async function loadRolePageData() {
  loading.value = true

  try {
    const result = await getRolePageApi({
      ...queryForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    tableData.value = Array.isArray(result.list) ? result.list : []
    pagination.total = Number(result.total || 0)
    pagination.pageNum = Number(result.pageNum || pagination.pageNum)
    pagination.pageSize = Number(result.pageSize || pagination.pageSize)
  } catch (error) {
    ElMessage.error(error.message || '获取角色列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.pageNum = 1
  loadRolePageData()
}

function handleReset() {
  queryForm.roleName = ''
  queryForm.roleCode = ''
  queryForm.status = ''
  pagination.pageNum = 1
  loadRolePageData()
}

function handleCurrentChange(pageNum) {
  pagination.pageNum = pageNum
  loadRolePageData()
}

function handleSizeChange(pageSize) {
  pagination.pageSize = pageSize
  pagination.pageNum = 1
  loadRolePageData()
}

function goCreate() {
  router.push('/system/role/create')
}

function goEdit(row) {
  router.push(`/system/role/edit/${row.id}`)
}

function goDetail(row) {
  router.push(`/system/role/detail/${row.id}`)
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(`确认删除角色“${row.roleName}”吗？`, '删除角色', {
      type: 'warning',
      confirmButtonText: '确认删除',
      cancelButtonText: '取消'
    })

    await deleteRoleApi(row.id)
    ElMessage.success('角色已删除')

    if (tableData.value.length === 1 && pagination.pageNum > 1) {
      pagination.pageNum -= 1
    }

    loadRolePageData()
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error.message || '删除角色失败，请稍后重试')
    }
  }
}

onMounted(() => {
  loadRolePageData()
})
</script>
