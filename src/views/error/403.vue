<template>
  <div class="error-page">
    <AppStatus type="403">
      <template #actions>
        <el-button type="primary" @click="goDashboard">{{
          t('common.actions.backHome')
        }}</el-button>
        <el-button @click="goBack">{{ t('common.actions.goBack') }}</el-button>
      </template>
    </AppStatus>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是错误状态页组件，用来承接 403、404、500 这类系统级异常页面。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ useI18n } <- vue-i18n；{ useRouter } <- vue-router；{ useLocale } <- src/hooks/useLocale.js；AppStatus <- src/components/common/AppStatus.vue
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'
import AppStatus from '@/components/common/AppStatus.vue'

const router = useRouter()
const { t } = useI18n()
const { toLocalePath } = useLocale()

function goDashboard() {
  router.push(toLocalePath('/dashboard'))
}

function goBack() {
  router.back()
}
</script>

<style scoped lang="less">
.error-page {
  min-height: 100%;
  padding: var(--app-space-xl);
}
</style>
