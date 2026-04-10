<template>
  <FormPageTemplate
    :title="isEditMode ? '编辑用户' : '新增用户'"
    description="通用表单页模板适合承载新增、编辑和表单校验逻辑。"
    :loading="loading"
    back-path="/system/user"
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="formData.nickname" placeholder="请输入昵称" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="所属角色" prop="roleCode">
            <el-select v-model="formData.roleCode" placeholder="请选择角色" style="width: 100%">
              <el-option
                v-for="item in roleOptionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="账号状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio value="enabled">启用</el-radio>
              <el-radio value="disabled">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="所属部门" prop="departmentName">
            <el-input v-model="formData.departmentName" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>

        <el-col :xs="24">
          <el-form-item label="备注说明" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="4"
              placeholder="请输入备注说明"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="goBack">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ isEditMode ? '保存修改' : '创建用户' }}
      </el-button>
    </template>
  </FormPageTemplate>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是系统管理模块的表单页，主要负责新增或编辑某条业务数据。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ computed, onMounted, reactive, ref } <- vue；{ useRoute, useRouter } <- vue-router；{ ElMessage } <- element-plus；FormPageTemplate <- src/components/common/business/FormPageTemplate.vue；{ getRoleOptionListApi, getUserDetailApi, saveUserApi } <- src/api/system.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import FormPageTemplate from '@/components/common/business/FormPageTemplate.vue'
import { getRoleOptionListApi, getUserDetailApi, saveUserApi } from '@/api/system'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const roleOptionList = ref([])

const isEditMode = computed(() => Boolean(route.params.id))

const formData = reactive({
  id: '',
  username: '',
  nickname: '',
  roleCode: '',
  status: 'enabled',
  phone: '',
  email: '',
  departmentName: '',
  remark: ''
})

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度建议控制在 2 到 20 个字符', trigger: 'blur' }
  ],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请选择所属角色', trigger: 'change' }],
  status: [{ required: true, message: '请选择账号状态', trigger: 'change' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  departmentName: [{ required: true, message: '请输入所属部门', trigger: 'blur' }]
}

async function loadRoleOptionList() {
  roleOptionList.value = await getRoleOptionListApi()
}

async function loadUserDetail() {
  if (!isEditMode.value) {
    return
  }

  loading.value = true

  try {
    const result = await getUserDetailApi(route.params.id)
    Object.assign(formData, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取用户详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/system/user')
}

async function handleSubmit() {
  const formInstance = formRef.value

  if (!formInstance) {
    return
  }

  try {
    await formInstance.validate()
    submitting.value = true
    await saveUserApi({ ...formData })
    ElMessage.success(isEditMode.value ? '用户信息已更新' : '用户创建成功')
    router.push('/system/user')
  } catch (error) {
    if (error?.message) {
      ElMessage.error(error.message)
    }
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await loadRoleOptionList()
  await loadUserDetail()
})
</script>

<style scoped lang="less">
.system-form {
  max-width: 980px;
}
</style>
