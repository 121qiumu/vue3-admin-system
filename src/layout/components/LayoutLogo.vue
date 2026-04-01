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
      <div class="layout-logo__sub-title">Vue3 后台模板</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

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

function goHome() {
  router.push('/dashboard')
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
