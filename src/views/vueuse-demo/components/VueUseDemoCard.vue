<template>
  <el-card class="vueuse-demo-card" shadow="hover">
    <div class="vueuse-demo-card__header">
      <div class="vueuse-demo-card__summary">
        <div class="vueuse-demo-card__title">{{ title }}</div>
        <div class="vueuse-demo-card__purpose">{{ purpose }}</div>
      </div>

      <div class="vueuse-demo-card__api-list">
        <el-tag
          v-for="api in apiList"
          :key="api"
          class="vueuse-demo-card__api-tag"
          size="small"
          effect="plain"
        >
          {{ api }}
        </el-tag>
      </div>
    </div>

    <div class="vueuse-demo-card__section">
      <div class="vueuse-demo-card__section-title">这个 API 是干嘛的</div>
      <p class="vueuse-demo-card__text">{{ purpose }}</p>
    </div>

    <div class="vueuse-demo-card__section">
      <div class="vueuse-demo-card__section-title">如何使用</div>
      <ol class="vueuse-demo-card__step-list">
        <li v-for="step in usageSteps" :key="step" class="vueuse-demo-card__step-item">
          {{ step }}
        </li>
      </ol>
    </div>

    <div v-if="sceneList.length > 0" class="vueuse-demo-card__section">
      <div class="vueuse-demo-card__section-title">适合场景</div>
      <div class="vueuse-demo-card__scene-list">
        <span v-for="scene in sceneList" :key="scene" class="vueuse-demo-card__scene-item">
          {{ scene }}
        </span>
      </div>
    </div>

    <el-alert
      v-if="caution"
      class="vueuse-demo-card__caution"
      type="warning"
      :closable="false"
      show-icon
      :title="caution"
    />

    <div class="vueuse-demo-card__demo">
      <div class="vueuse-demo-card__section-title">运行中的效果</div>
      <slot name="demo" />
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  apiList: {
    type: Array,
    default: () => []
  },
  purpose: {
    type: String,
    default: ''
  },
  usageSteps: {
    type: Array,
    default: () => []
  },
  sceneList: {
    type: Array,
    default: () => []
  },
  caution: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="less">
.vueuse-demo-card {
  height: 100%;
  border-radius: var(--app-radius-large);
}

.vueuse-demo-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--app-space-md);
}

.vueuse-demo-card__summary {
  min-width: 0;
}

.vueuse-demo-card__title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.vueuse-demo-card__purpose {
  margin-top: var(--app-space-xs);
  color: var(--app-color-text-secondary);
  line-height: 1.7;
}

.vueuse-demo-card__api-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--app-space-xs);
}

.vueuse-demo-card__section {
  margin-top: var(--app-space-lg);
}

.vueuse-demo-card__section-title {
  margin-bottom: var(--app-space-sm);
  font-size: var(--app-font-size-base);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.vueuse-demo-card__text,
.vueuse-demo-card__step-item {
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}

.vueuse-demo-card__step-list {
  padding-left: 20px;
  margin: 0;
}

.vueuse-demo-card__scene-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-xs);
}

.vueuse-demo-card__scene-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: var(--app-radius-round);
  background: var(--app-color-fill-light);
  color: var(--app-color-text-regular);
}

.vueuse-demo-card__caution {
  margin-top: var(--app-space-lg);
}

.vueuse-demo-card__demo {
  margin-top: var(--app-space-lg);
  padding-top: var(--app-space-lg);
  border-top: 1px solid var(--app-color-border-light);
}

@media (max-width: 768px) {
  .vueuse-demo-card__header {
    flex-direction: column;
  }

  .vueuse-demo-card__api-list {
    justify-content: flex-start;
  }
}
</style>
