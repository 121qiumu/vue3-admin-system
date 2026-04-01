<template>
  <FormPageTemplate
    :title="isEditMode ? '编辑角色' : '新增角色'"
    description="角色表单页适合作为后台业务表单模板，后续可以继续接入权限树和数据范围配置。"
    :loading="loading"
    back-path="/system/role"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="96px"
      class="system-form"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="formData.roleCode" placeholder="请输入角色编码" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="数据范围" prop="dataScope">
            <el-select
              v-model="formData.dataScope"
              placeholder="请选择数据范围"
              style="width: 100%"
            >
              <el-option label="全部数据" value="全部数据" />
              <el-option label="本部门数据" value="本部门数据" />
              <el-option label="指定部门数据" value="指定部门数据" />
              <el-option label="仅本人数据" value="仅本人数据" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="角色状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio value="enabled">启用</el-radio>
              <el-radio value="disabled">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :xs="24">
          <el-form-item label="权限说明" prop="permissionSummary">
            <el-input
              v-model="formData.permissionSummary"
              type="textarea"
              :rows="4"
              placeholder="请输入权限说明"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24">
          <el-form-item label="备注说明" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注说明"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="goBack">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ isEditMode ? '保存修改' : '创建角色' }}
      </el-button>
    </template>
  </FormPageTemplate>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import FormPageTemplate from '@/components/common/business/FormPageTemplate.vue'
import { getRoleDetailApi, saveRoleApi } from '@/api/system'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)

const isEditMode = computed(() => Boolean(route.params.id))

const formData = reactive({
  id: '',
  roleName: '',
  roleCode: '',
  dataScope: '本部门数据',
  status: 'enabled',
  memberCount: 0,
  permissionSummary: '',
  remark: ''
})

const formRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  dataScope: [{ required: true, message: '请选择数据范围', trigger: 'change' }],
  status: [{ required: true, message: '请选择角色状态', trigger: 'change' }],
  permissionSummary: [{ required: true, message: '请输入权限说明', trigger: 'blur' }]
}

async function loadRoleDetail() {
  if (!isEditMode.value) {
    return
  }

  loading.value = true

  try {
    const result = await getRoleDetailApi(route.params.id)
    Object.assign(formData, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取角色详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/system/role')
}

async function handleSubmit() {
  const formInstance = formRef.value

  if (!formInstance) {
    return
  }

  try {
    await formInstance.validate()
    submitting.value = true
    await saveRoleApi({ ...formData })
    ElMessage.success(isEditMode.value ? '角色信息已更新' : '角色创建成功')
    router.push('/system/role')
  } catch (error) {
    if (error?.message) {
      ElMessage.error(error.message)
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadRoleDetail()
})
</script>

<style scoped lang="less">
.system-form {
  max-width: 980px;
}
</style>
