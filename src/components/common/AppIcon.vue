<template>
  <component
    :is="resolvedIconComponent"
    v-if="resolvedIconComponent"
    class="app-icon"
    :class="{ 'is-spin': spin }"
    :style="iconStyle"
    aria-hidden="true"
  />
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是全局可复用基础组件，多个页面都会直接或间接使用它。
// 2. 所在分层：通用组件层：页面之间共享的可复用组件。
// 3. 当前组件主要依赖：{ computed } <- vue；IconEpArrowDown <- ~icons/ep/arrow-down；IconEpBell <- ~icons/ep/bell；IconEpCheck <- ~icons/ep/check；IconEpCircleCheckFilled <- ~icons/ep/circle-check-filled；IconEpClose <- ~icons/ep/close；其余依赖 21 项
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：src/components/common/AppStatus.vue、src/layout/components/LayoutMenuItem.vue、src/layout/components/LayoutTopNav.vue、src/views/system/menu/form.vue、src/views/system/menu/index.vue
// 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
import { computed } from 'vue'

import IconEpArrowDown from '~icons/ep/arrow-down'
import IconEpBell from '~icons/ep/bell'
import IconEpCheck from '~icons/ep/check'
import IconEpCircleCheckFilled from '~icons/ep/circle-check-filled'
import IconEpClose from '~icons/ep/close'
import IconEpDelete from '~icons/ep/delete'
import IconEpDocument from '~icons/ep/document'
import IconEpDownload from '~icons/ep/download'
import IconEpEditPen from '~icons/ep/edit-pen'
import IconEpExpand from '~icons/ep/expand'
import IconEpFold from '~icons/ep/fold'
import IconEpHomeFilled from '~icons/ep/home-filled'
import IconEpInfoFilled from '~icons/ep/info-filled'
import IconEpLock from '~icons/ep/lock'
import IconEpMenu from '~icons/ep/menu'
import IconEpMonitor from '~icons/ep/monitor'
import IconEpPlus from '~icons/ep/plus'
import IconEpRefreshRight from '~icons/ep/refresh-right'
import IconEpSearch from '~icons/ep/search'
import IconEpSetting from '~icons/ep/setting'
import IconEpTickets from '~icons/ep/tickets'
import IconEpUser from '~icons/ep/user'
import IconEpUserFilled from '~icons/ep/user-filled'
import IconEpView from '~icons/ep/view'
import IconEpWarningFilled from '~icons/ep/warning-filled'
import IconEpReading from '~icons/ep/reading'

// 图标组件映射表。
// 当前推荐统一使用“IconEp开头”的字符串作为配置值，
// 这样 route meta、菜单 mock、页面配置都能直接复用同一套写法。
const iconComponentMap = {
  IconEpArrowDown,
  IconEpBell,
  IconEpCheck,
  IconEpCircleCheckFilled,
  IconEpClose,
  IconEpDelete,
  IconEpDocument,
  IconEpDownload,
  IconEpEditPen,
  IconEpExpand,
  IconEpFold,
  IconEpHomeFilled,
  IconEpInfoFilled,
  IconEpLock,
  IconEpMenu,
  IconEpMonitor,
  IconEpPlus,
  IconEpRefreshRight,
  IconEpSearch,
  IconEpSetting,
  IconEpTickets,
  IconEpUser,
  IconEpUserFilled,
  IconEpView,
  IconEpWarningFilled,
  IconEpReading
}

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 16
  },
  color: {
    type: String,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false
  },
  showFallback: {
    type: Boolean,
    default: true
  }
})

const resolvedIconComponent = computed(() => {
  if (!props.name) {
    return props.showFallback ? IconEpInfoFilled : null
  }

  return iconComponentMap[props.name] || (props.showFallback ? IconEpInfoFilled : null)
})

const iconStyle = computed(() => {
  const nextSize = typeof props.size === 'number' ? `${props.size}px` : props.size

  return {
    fontSize: nextSize,
    color: props.color || undefined
  }
})
</script>

<style scoped lang="less">
.app-icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  vertical-align: -0.125em;
}

.app-icon.is-spin {
  animation: app-icon-spin 1s linear infinite;
}

@keyframes app-icon-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
