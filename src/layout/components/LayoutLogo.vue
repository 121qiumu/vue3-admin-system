<template>
  <div
    class="layout-logo"
    :class="[
      `layout-logo--${theme}`,
      {
        'is-collapse': collapsed,
        'is-bordered': bordered
      }
    ]"
    @click="goHome"
  >
    <div class="layout-logo__mark">A</div>

    <div v-show="!collapsed" class="layout-logo__text">
      <div class="layout-logo__title">AI Admin</div>
      <div class="layout-logo__sub-title">{{ t('app.shortTitle') }}</div>
    </div>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是布局子组件文件，属于后台框架壳的一部分，比如 Logo、菜单、面包屑、标签栏、头部工具区。
// 2. 所在分层：布局壳层：负责后台整体骨架结构。
// 3. 当前组件主要依赖：{ useI18n } <- vue-i18n；{ useRouter } <- vue-router；{ useLocale } <- src/hooks/useLocale.js
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/layout/components/LayoutSidebar.vue、src/layout/modes/MixLayout.vue、src/layout/modes/TopLayout.vue
// 6. 阅读建议：建议先看 template 结构，再看 props/computed，最后结合 hook 和 store 理解布局联动。
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useLocale } from '@/hooks/useLocale'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'sidebar'
  },
  bordered: {
    type: Boolean,
    default: true
  }
})

const router = useRouter()
const { t } = useI18n()
const { toLocalePath } = useLocale()

function goHome() {
  router.push(toLocalePath('/dashboard'))
}
</script>

<style scoped lang="less">
.layout-logo {
  --layout-logo-title-color: #ffffff;
  --layout-logo-sub-title-color: rgba(255, 255, 255, 0.68);
  display: flex;
  align-items: center;
  gap: var(--app-space-sm);
  height: var(--app-layout-header-height);
  padding: 0 var(--app-space-md);
  overflow: hidden;
  cursor: pointer;
}

.layout-logo.is-bordered {
  border-bottom: var(--app-border-width) solid rgba(255, 255, 255, 0.08);
}

.layout-logo--header {
  --layout-logo-title-color: var(--app-color-text-primary);
  --layout-logo-sub-title-color: var(--app-color-text-secondary);
  min-width: 180px;
  padding-left: 0;
}

.layout-logo--header.is-bordered {
  border-bottom: none;
}

.layout-logo__mark {
  display: flex;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-size: var(--app-font-size-medium);
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, var(--app-color-primary) 0%, #67c23a 100%);
  border-radius: var(--app-radius-base);
}

.layout-logo__text {
  min-width: 0;
}

.layout-logo__title {
  font-size: var(--app-font-size-base);
  font-weight: 700;
  color: var(--layout-logo-title-color);
  white-space: nowrap;
}

.layout-logo__sub-title {
  margin-top: 2px;
  font-size: var(--app-font-size-extra-small);
  color: var(--layout-logo-sub-title-color);
  white-space: nowrap;
}
</style>
