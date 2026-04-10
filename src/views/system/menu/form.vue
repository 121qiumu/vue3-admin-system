<template>
  <FormPageTemplate
    :title="isEditMode ? '编辑菜单' : '新增菜单'"
    description="菜单表单页适合作为后台配置类页面模板，后续可继续扩展树形选择和图标选择器。当前这一版先统一接入通用图标系统。"
    :loading="loading"
    back-path="/system/menu"
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
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="formData.menuName" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="菜单类型" prop="menuType">
            <el-select v-model="formData.menuType" placeholder="请选择菜单类型" style="width: 100%">
              <el-option label="目录" value="目录" />
              <el-option label="菜单" value="菜单" />
              <el-option label="按钮" value="按钮" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="上级菜单" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级菜单" style="width: 100%">
              <el-option
                v-for="item in parentOptionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="排序值" prop="orderNum">
            <el-input-number v-model="formData.orderNum" :min="1" :max="999" style="width: 100%" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="路由地址" prop="routePath">
            <el-input v-model="formData.routePath" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="formData.component" placeholder="请输入组件路径" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="权限标识" prop="permissionCode">
            <el-input v-model="formData.permissionCode" placeholder="请输入权限标识" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="图标名称" prop="icon">
            <el-select
              v-model="formData.icon"
              placeholder="请选择或输入图标名称"
              filterable
              allow-create
              clearable
              default-first-option
              style="width: 100%"
            >
              <el-option
                v-for="item in iconOptionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div class="system-menu-form__icon-option">
                  <span class="system-menu-form__icon-option-main">
                    <AppIcon :name="item.value" :show-fallback="false" />
                    <span>{{ item.label }}</span>
                  </span>
                  <span class="system-menu-form__icon-option-value">{{ item.value }}</span>
                </div>
              </el-option>
            </el-select>

            <div v-if="formData.icon" class="system-menu-form__icon-preview">
              <span class="system-menu-form__icon-preview-label">当前预览</span>
              <span class="system-menu-form__icon-preview-value">
                <AppIcon :name="formData.icon" size="18" />
                <span>{{ formData.icon }}</span>
              </span>
            </div>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item label="菜单状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio value="enabled">启用</el-radio>
              <el-radio value="disabled">停用</el-radio>
            </el-radio-group>
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
        {{ isEditMode ? '保存修改' : '创建菜单' }}
      </el-button>
    </template>
  </FormPageTemplate>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是系统管理模块的表单页，主要负责新增或编辑某条业务数据。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ computed, onMounted, reactive, ref } <- vue；{ useRoute, useRouter } <- vue-router；{ ElMessage } <- element-plus；{ getMenuDetailApi, getMenuParentOptionListApi, saveMenuApi } <- src/api/system.js；AppIcon <- src/components/common/AppIcon.vue；FormPageTemplate <- src/components/common/business/FormPageTemplate.vue；其余依赖 1 项
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { getMenuDetailApi, getMenuParentOptionListApi, saveMenuApi } from '@/api/system'
import AppIcon from '@/components/common/AppIcon.vue'
import FormPageTemplate from '@/components/common/business/FormPageTemplate.vue'
import { APP_ICON_OPTIONS } from '@/constants/icon'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const parentOptionList = ref([])

const isEditMode = computed(() => Boolean(route.params.id))
const iconOptionList = APP_ICON_OPTIONS

const formData = reactive({
  id: '',
  menuName: '',
  menuType: '菜单',
  parentId: '0',
  routePath: '',
  component: '',
  permissionCode: '',
  icon: '',
  orderNum: 1,
  status: 'enabled',
  remark: ''
})

const formRules = {
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  menuType: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
  routePath: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
  permissionCode: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
  status: [{ required: true, message: '请选择菜单状态', trigger: 'change' }]
}

async function loadParentOptionList() {
  parentOptionList.value = await getMenuParentOptionListApi(route.params.id || '')
}

async function loadMenuDetail() {
  if (!isEditMode.value) {
    return
  }

  loading.value = true

  try {
    const result = await getMenuDetailApi(route.params.id)
    Object.assign(formData, result || {})
  } catch (error) {
    ElMessage.error(error.message || '获取菜单详情失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/system/menu')
}

async function handleSubmit() {
  const formInstance = formRef.value

  if (!formInstance) {
    return
  }

  try {
    await formInstance.validate()
    submitting.value = true
    await saveMenuApi({ ...formData })
    ElMessage.success(isEditMode.value ? '菜单信息已更新' : '菜单创建成功')
    router.push('/system/menu')
  } catch (error) {
    if (error?.message) {
      ElMessage.error(error.message)
    }
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await loadParentOptionList()
  await loadMenuDetail()
})
</script>

<style scoped lang="less">
.system-form {
  max-width: 980px;
}

.system-menu-form__icon-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-sm);
}

.system-menu-form__icon-option-main,
.system-menu-form__icon-preview-value {
  display: inline-flex;
  align-items: center;
  gap: var(--app-space-xs);
}

.system-menu-form__icon-option-value {
  font-size: var(--app-font-size-extra-small);
  color: var(--app-color-text-secondary);
}

.system-menu-form__icon-preview {
  display: flex;
  align-items: center;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-sm);
  padding: var(--app-space-sm);
  background-color: var(--app-color-bg-page);
  border: var(--app-border-width) dashed var(--app-color-border-light);
  border-radius: var(--app-radius-base);
}

.system-menu-form__icon-preview-label {
  color: var(--app-color-text-secondary);
}
</style>
