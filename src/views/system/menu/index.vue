<template>
  <ListPageTemplate
    title="菜单管理"
    description="菜单管理页适合演示后台如何维护目录、菜单、权限码以及路由组件信息，也很适合作为图标系统的示例页。"
    :loading="loading"
    :pagination="pagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
    <template #query>
      <el-form :model="queryForm" label-width="84px" inline>
        <el-form-item label="菜单名称">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" clearable />
        </el-form-item>

        <el-form-item label="权限标识">
          <el-input v-model="queryForm.permissionCode" placeholder="请输入权限标识" clearable />
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-select
            v-model="queryForm.menuType"
            placeholder="请选择菜单类型"
            clearable
            style="width: 160px"
          >
            <el-option label="目录" value="目录" />
            <el-option label="菜单" value="菜单" />
            <el-option label="按钮" value="按钮" />
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
          <el-button type="primary" @click="handleSearch">
            <AppIcon :name="BUTTON_ICON_NAME_MAP.search" class="system-menu-page__button-icon" />
            查询
          </el-button>
          <el-button @click="handleReset">
            <AppIcon :name="BUTTON_ICON_NAME_MAP.reset" class="system-menu-page__button-icon" />
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #toolbar>
      <el-button v-permission="'system:menu:create'" type="primary" @click="goCreate">
        <AppIcon :name="BUTTON_ICON_NAME_MAP.create" class="system-menu-page__button-icon" />
        新增菜单
      </el-button>
    </template>

    <template #table>
      <el-table :data="tableData" border>
        <el-table-column prop="menuName" label="菜单名称" min-width="150" />
        <el-table-column prop="parentName" label="上级菜单" min-width="130" />
        <el-table-column prop="menuType" label="类型" width="100" />

        <el-table-column label="图标" min-width="180">
          <template #default="scope">
            <div class="system-menu-page__icon-cell">
              <AppIcon :name="scope.row.icon" :show-fallback="false" />
              <span>{{ scope.row.icon || '未设置图标' }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="routePath" label="路由地址" min-width="180" />
        <el-table-column prop="permissionCode" label="权限标识" min-width="180" />
        <el-table-column prop="orderNum" label="排序" width="80" />

        <el-table-column label="状态" width="110">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'info'" effect="light">
              <span class="system-menu-page__status-text">
                <AppIcon :name="getStatusIconName(scope.row.status)" size="14" />
                <span>{{ scope.row.status === 'enabled' ? '启用' : '停用' }}</span>
              </span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="260" fixed="right">
          <template #default="scope">
            <el-button link type="primary" @click="goDetail(scope.row)">
              <AppIcon :name="BUTTON_ICON_NAME_MAP.detail" class="system-menu-page__button-icon" />
              详情
            </el-button>
            <el-button
              v-permission="'system:menu:update'"
              link
              type="primary"
              @click="goEdit(scope.row)"
            >
              <AppIcon :name="BUTTON_ICON_NAME_MAP.edit" class="system-menu-page__button-icon" />
              编辑
            </el-button>
            <el-button
              v-permission="'system:menu:delete'"
              link
              type="danger"
              @click="handleDelete(scope.row)"
            >
              <AppIcon :name="BUTTON_ICON_NAME_MAP.delete" class="system-menu-page__button-icon" />
              删除
            </el-button>
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

import { deleteMenuApi, getMenuPageApi } from '@/api/system'
import AppIcon from '@/components/common/AppIcon.vue'
import ListPageTemplate from '@/components/common/business/ListPageTemplate.vue'
import { BUTTON_ICON_NAME_MAP, STATUS_ICON_NAME_MAP } from '@/constants/icon'

const router = useRouter()
const loading = ref(false)
const tableData = ref([])
const queryForm = reactive({
  menuName: '',
  permissionCode: '',
  menuType: '',
  status: ''
})
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

async function loadMenuPageData() {
  loading.value = true

  try {
    const result = await getMenuPageApi({
      ...queryForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    tableData.value = Array.isArray(result.list) ? result.list : []
    pagination.total = Number(result.total || 0)
    pagination.pageNum = Number(result.pageNum || pagination.pageNum)
    pagination.pageSize = Number(result.pageSize || pagination.pageSize)
  } catch (error) {
    ElMessage.error(error.message || '获取菜单列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.pageNum = 1
  loadMenuPageData()
}

function handleReset() {
  queryForm.menuName = ''
  queryForm.permissionCode = ''
  queryForm.menuType = ''
  queryForm.status = ''
  pagination.pageNum = 1
  loadMenuPageData()
}

function handleCurrentChange(pageNum) {
  pagination.pageNum = pageNum
  loadMenuPageData()
}

function handleSizeChange(pageSize) {
  pagination.pageSize = pageSize
  pagination.pageNum = 1
  loadMenuPageData()
}

function goCreate() {
  router.push('/system/menu/create')
}

function goEdit(row) {
  router.push(`/system/menu/edit/${row.id}`)
}

function goDetail(row) {
  router.push(`/system/menu/detail/${row.id}`)
}

function getStatusIconName(status) {
  return status === 'enabled' ? STATUS_ICON_NAME_MAP.success : STATUS_ICON_NAME_MAP.info
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(`确认删除菜单“${row.menuName}”吗？`, '删除菜单', {
      type: 'warning',
      confirmButtonText: '确认删除',
      cancelButtonText: '取消'
    })

    await deleteMenuApi(row.id)
    ElMessage.success('菜单已删除')

    if (tableData.value.length === 1 && pagination.pageNum > 1) {
      pagination.pageNum -= 1
    }

    loadMenuPageData()
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error.message || '删除菜单失败，请稍后重试')
    }
  }
}

onMounted(() => {
  loadMenuPageData()
})
</script>

<style scoped lang="less">
.system-menu-page__button-icon {
  margin-right: 4px;
}

.system-menu-page__icon-cell,
.system-menu-page__status-text {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-xs);
}

.system-menu-page__icon-cell {
  color: var(--app-color-text-regular);
}
</style>
