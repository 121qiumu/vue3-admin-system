<template>
  <ListPageTemplate
    title="用户管理"
    description="这是一个通用后台列表页模板示例，包含查询表单、表格、分页和操作按钮。"
    :loading="loading"
    :pagination="pagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
    <template #query>
      <el-form :model="queryForm" label-width="72px" inline>
        <el-form-item label="用户名">
          <el-input v-model="queryForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="queryForm.nickname" placeholder="请输入昵称" clearable />
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            v-model="queryForm.roleCode"
            placeholder="请选择角色"
            clearable
            style="width: 180px"
          >
            <el-option
              v-for="item in roleOptionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <el-button v-permission="'system:user:create'" type="primary" @click="goCreate">
        新增用户
      </el-button>

      <el-button v-permission="'system:user:export'" plain @click="handleExport">
        导出列表
      </el-button>
    </template>

    <template #table>
      <el-table :data="tableData" border>
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="nickname" label="昵称" min-width="120" />
        <el-table-column prop="roleName" label="角色" min-width="140" />
        <el-table-column prop="departmentName" label="部门" min-width="160" />
        <el-table-column prop="phone" label="手机号" min-width="140" />

        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status)" effect="light">
              {{ getStatusLabel(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" min-width="170" />

        <el-table-column label="操作" width="240" fixed="right">
          <template #default="scope">
            <el-button link type="primary" @click="goDetail(scope.row)">详情</el-button>
            <el-button
              v-permission="'system:user:update'"
              link
              type="primary"
              @click="goEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-permission="'system:user:delete'"
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
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import ListPageTemplate from '@/components/common/business/ListPageTemplate.vue'
import { deleteUserApi, getRoleOptionListApi, getUserPageApi } from '@/api/system'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const roleOptionList = ref([])
const queryForm = reactive({
  username: '',
  nickname: '',
  roleCode: '',
  status: ''
})
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 拉取列表数据。
// 列表页模板只负责结构，真正的查询条件和数据逻辑仍然放在页面层。
async function loadUserPageData() {
  loading.value = true

  try {
    const result = await getUserPageApi({
      ...queryForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    tableData.value = Array.isArray(result.list) ? result.list : []
    pagination.total = Number(result.total || 0)
    pagination.pageNum = Number(result.pageNum || pagination.pageNum)
    pagination.pageSize = Number(result.pageSize || pagination.pageSize)
  } catch (error) {
    ElMessage.error(error.message || '获取用户列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

async function loadRoleOptionList() {
  try {
    roleOptionList.value = await getRoleOptionListApi()
  } catch {
    roleOptionList.value = []
  }
}

function handleSearch() {
  pagination.pageNum = 1
  loadUserPageData()
}

function handleReset() {
  queryForm.username = ''
  queryForm.nickname = ''
  queryForm.roleCode = ''
  queryForm.status = ''
  pagination.pageNum = 1
  loadUserPageData()
}

function handleCurrentChange(pageNum) {
  pagination.pageNum = pageNum
  loadUserPageData()
}

function handleSizeChange(pageSize) {
  pagination.pageSize = pageSize
  pagination.pageNum = 1
  loadUserPageData()
}

function goCreate() {
  router.push('/system/user/create')
}

function goEdit(row) {
  router.push(`/system/user/edit/${row.id}`)
}

function goDetail(row) {
  router.push(`/system/user/detail/${row.id}`)
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(`确认删除用户“${row.nickname || row.username}”吗？`, '删除用户', {
      type: 'warning',
      confirmButtonText: '确认删除',
      cancelButtonText: '取消'
    })

    await deleteUserApi(row.id)
    ElMessage.success('用户已删除')

    if (tableData.value.length === 1 && pagination.pageNum > 1) {
      pagination.pageNum -= 1
    }

    loadUserPageData()
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error.message || '删除用户失败，请稍后重试')
    }
  }
}

function handleExport() {
  ElMessage.success('当前为模板项目，导出功能先用提示模拟。')
}

function getStatusLabel(status) {
  return status === 'enabled' ? '启用' : '停用'
}

function getStatusTagType(status) {
  return status === 'enabled' ? 'success' : 'info'
}

onMounted(async () => {
  await loadRoleOptionList()
  loadUserPageData()
})
</script>
