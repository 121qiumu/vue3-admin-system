<template>
  <div class="app-status" :class="[`app-status--${mode}`, `app-status--${resolvedTone}`]">
    <div class="app-status__icon-wrap">
      <div class="app-status__icon-bg">
        <AppIcon :name="resolvedIcon" :size="resolvedIconSize" />
      </div>
    </div>

    <div class="app-status__content">
      <div class="app-status__title">{{ resolvedTitle }}</div>
      <div class="app-status__description">{{ resolvedDescription }}</div>

      <div v-if="resolvedTip" class="app-status__tip">
        {{ resolvedTip }}
      </div>

      <div v-if="$slots.actions" class="app-status__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是全局可复用基础组件，多个页面都会直接或间接使用它。
// 2. 所在分层：通用组件层：页面之间共享的可复用组件。
// 3. 当前组件主要依赖：{ computed } <- vue；{ translate } <- src/locales/helper.js；AppIcon <- src/components/common/AppIcon.vue
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/views/dashboard/components/DashboardNoticePanel.vue、src/views/dashboard/components/DashboardRecentActionPanel.vue、src/views/dashboard/components/DashboardShortcutPanel.vue、src/views/dashboard/index.vue、src/views/error/403.vue、src/views/error/404.vue 等，共 7 个上游引用文件
// 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
import { computed } from 'vue'

import { translate } from '@/locales/helper'
import AppIcon from './AppIcon.vue'

const STATUS_PRESET_MAP = Object.freeze({
  403: {
    titleKey: 'error.403.title',
    descriptionKey: 'error.403.description',
    tipKey: 'error.403.tip',
    title: '403',
    description: '当前账号没有访问该页面的权限',
    tip: '如果你确认自己应该拥有该权限，请联系管理员进行开通。',
    icon: 'IconEpWarningFilled',
    tone: 'warning'
  },
  404: {
    titleKey: 'error.404.title',
    descriptionKey: 'error.404.description',
    tipKey: 'error.404.tip',
    title: '404',
    description: '页面不存在，请检查访问地址是否正确',
    tip: '你可以返回首页，或者从左侧菜单重新进入已有页面。',
    icon: 'IconEpDocument',
    tone: 'info'
  },
  500: {
    titleKey: 'error.500.title',
    descriptionKey: 'error.500.description',
    tipKey: 'error.500.tip',
    title: '500',
    description: '系统开小差了，请稍后重试',
    tip: '如果问题持续出现，请联系管理员排查服务日志或接口服务状态。',
    icon: 'IconEpMonitor',
    tone: 'danger'
  },
  empty: {
    titleKey: 'error.empty.title',
    descriptionKey: 'error.empty.description',
    tipKey: 'error.empty.tip',
    title: '暂无数据',
    description: '当前还没有可展示的数据内容',
    tip: '',
    icon: 'IconEpDocument',
    tone: 'info'
  },
  error: {
    titleKey: 'error.loadFailed.title',
    descriptionKey: 'error.loadFailed.description',
    tipKey: 'error.loadFailed.tip',
    title: '加载失败',
    description: '当前内容加载失败，请稍后重试',
    tip: '',
    icon: 'IconEpWarningFilled',
    tone: 'danger'
  }
})

const props = defineProps({
  type: {
    type: String,
    default: 'empty'
  },
  mode: {
    type: String,
    default: 'page',
    validator(value) {
      return ['page', 'section'].includes(value)
    }
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  tone: {
    type: String,
    default: ''
  }
})

const preset = computed(() => {
  return STATUS_PRESET_MAP[props.type] || STATUS_PRESET_MAP.error
})

const resolvedTitle = computed(() => {
  return props.title || translate(preset.value.titleKey, {}, preset.value.title)
})

const resolvedDescription = computed(() => {
  return props.description || translate(preset.value.descriptionKey, {}, preset.value.description)
})

const resolvedTip = computed(() => {
  return props.tip || translate(preset.value.tipKey, {}, preset.value.tip)
})

const resolvedIcon = computed(() => {
  return props.icon || preset.value.icon
})

const resolvedTone = computed(() => {
  return props.tone || preset.value.tone
})

const resolvedIconSize = computed(() => {
  return props.mode === 'page' ? 42 : 30
})
</script>

<style scoped lang="less">
.app-status {
  --app-status-color: var(--app-color-primary);
  --app-status-bg: color-mix(in srgb, var(--app-color-primary) 12%, transparent);
  --app-status-border: color-mix(
    in srgb,
    var(--app-color-primary) 20%,
    var(--app-color-border-light)
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--app-space-lg);
  padding: var(--app-space-2xl) var(--app-space-xl);
  text-align: center;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--app-status-bg) 55%, transparent), transparent),
    var(--app-color-bg-container);
  border: var(--app-border-width) solid var(--app-status-border);
  border-radius: var(--app-radius-large);
}

.app-status--page {
  min-height: 420px;
}

.app-status--section {
  min-height: 220px;
  padding: var(--app-space-xl) var(--app-space-lg);
  border-style: dashed;
}

.app-status--info {
  --app-status-color: var(--app-color-primary);
  --app-status-bg: color-mix(in srgb, var(--app-color-primary) 12%, transparent);
  --app-status-border: color-mix(
    in srgb,
    var(--app-color-primary) 18%,
    var(--app-color-border-light)
  );
}

.app-status--warning {
  --app-status-color: var(--app-color-warning);
  --app-status-bg: color-mix(in srgb, var(--app-color-warning) 14%, transparent);
  --app-status-border: color-mix(
    in srgb,
    var(--app-color-warning) 18%,
    var(--app-color-border-light)
  );
}

.app-status--danger {
  --app-status-color: var(--app-color-danger);
  --app-status-bg: color-mix(in srgb, var(--app-color-danger) 14%, transparent);
  --app-status-border: color-mix(
    in srgb,
    var(--app-color-danger) 18%,
    var(--app-color-border-light)
  );
}

.app-status__icon-wrap {
  display: flex;
  justify-content: center;
}

.app-status__icon-bg {
  display: inline-flex;
  width: 88px;
  height: 88px;
  align-items: center;
  justify-content: center;
  color: var(--app-status-color);
  background-color: var(--app-status-bg);
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--app-status-color) 8%, transparent);
}

.app-status--section .app-status__icon-bg {
  width: 64px;
  height: 64px;
  border-radius: 20px;
}

.app-status__content {
  display: grid;
  gap: var(--app-space-sm);
  max-width: 560px;
}

.app-status__title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--app-color-text-primary);
}

.app-status--section .app-status__title {
  font-size: 22px;
}

.app-status__description {
  line-height: 1.8;
  color: var(--app-color-text-regular);
}

.app-status__tip {
  font-size: var(--app-font-size-small);
  line-height: 1.8;
  color: var(--app-color-text-secondary);
}

.app-status__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-sm);
}

@media (max-width: 768px) {
  .app-status {
    padding: var(--app-space-xl) var(--app-space-md);
  }

  .app-status--page {
    min-height: 360px;
  }

  .app-status__title {
    font-size: 26px;
  }

  .app-status--section .app-status__title {
    font-size: 20px;
  }
}
</style>
