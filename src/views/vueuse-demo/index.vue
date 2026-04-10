<template>
  <div class="vueuse-demo-page">
    <section class="vueuse-demo-page__hero">
      <div class="vueuse-demo-page__hero-main">
        <div class="vueuse-demo-page__eyebrow">VueUse Learning Playground</div>
        <h1 class="vueuse-demo-page__title">VueUse 常用 API 学习 Demo</h1>
        <p class="vueuse-demo-page__desc">
          这个目录不是为了追求 API 数量，而是专门挑出后台项目里最常见、最容易马上用上的那一批。
          你可以先在页面里动手操作，再回到源码里看注释，理解会更扎实。
        </p>

        <div class="vueuse-demo-page__tag-list">
          <el-tag type="success" effect="plain">安装命令：pnpm add @vueuse/core</el-tag>
          <el-tag type="info" effect="plain">源码目录：src/views/vueuse-demo</el-tag>
          <el-tag type="warning" effect="plain">访问路径：/vueuse-demo</el-tag>
        </div>
      </div>

      <div class="vueuse-demo-page__hero-panel">
        <div class="vueuse-demo-page__panel-title">推荐学习顺序</div>
        <ol class="vueuse-demo-page__panel-list">
          <li v-for="step in learningStepList" :key="step" class="vueuse-demo-page__panel-item">
            {{ step }}
          </li>
        </ol>
      </div>
    </section>

    <section class="vueuse-demo-page__summary-grid">
      <article
        v-for="category in apiCategoryList"
        :key="category.title"
        class="vueuse-demo-page__summary-card"
      >
        <div class="vueuse-demo-page__summary-title">{{ category.title }}</div>
        <p class="vueuse-demo-page__summary-desc">{{ category.description }}</p>

        <div class="vueuse-demo-page__summary-api-list">
          <span
            v-for="api in category.apiList"
            :key="api"
            class="vueuse-demo-page__summary-api-item"
          >
            {{ api }}
          </span>
        </div>
      </article>
    </section>

    <el-alert
      class="vueuse-demo-page__alert"
      type="info"
      :closable="false"
      show-icon
      title="学习建议：先理解‘这个 API 帮你接管了什么重复工作’，再去记它的具体参数。"
    />

    <section class="vueuse-demo-page__demo-grid">
      <UseMouseDemo />
      <UseWindowSizeDemo />
      <UseElementSizeDemo />
      <UseClipboardDemo />
      <UseLocalStorageDemo />
      <UseDebounceFnDemo />
      <UseAsyncStateDemo />
    </section>
  </div>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是 VueUse 学习演示页，用来集中展示多个常用 VueUse API 的实际效果。
// 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
// 3. 当前组件主要依赖：{ apiCategoryList, learningStepList } <- src/views/vueuse-demo/api-catalog.js；UseAsyncStateDemo <- src/views/vueuse-demo/components/UseAsyncStateDemo.vue；UseClipboardDemo <- src/views/vueuse-demo/components/UseClipboardDemo.vue；UseDebounceFnDemo <- src/views/vueuse-demo/components/UseDebounceFnDemo.vue；UseElementSizeDemo <- src/views/vueuse-demo/components/UseElementSizeDemo.vue；UseLocalStorageDemo <- src/views/vueuse-demo/components/UseLocalStorageDemo.vue；其余依赖 2 项
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被路由或父组件加载，不需要手写 export default。
// 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
// 6. 阅读建议：建议先看 template 知道页面长什么样，再看 script 里的数据来源和事件，最后再看样式。
defineOptions({
  name: 'VueUseDemoPage'
})
import { apiCategoryList, learningStepList } from './api-catalog'

import UseAsyncStateDemo from './components/UseAsyncStateDemo.vue'
import UseClipboardDemo from './components/UseClipboardDemo.vue'
import UseDebounceFnDemo from './components/UseDebounceFnDemo.vue'
import UseElementSizeDemo from './components/UseElementSizeDemo.vue'
import UseLocalStorageDemo from './components/UseLocalStorageDemo.vue'
import UseMouseDemo from './components/UseMouseDemo.vue'
import UseWindowSizeDemo from './components/UseWindowSizeDemo.vue'
</script>

<style scoped lang="less">
.vueuse-demo-page {
  display: grid;
  gap: var(--app-space-lg);
}

.vueuse-demo-page__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
  gap: var(--app-space-lg);
  padding: var(--app-space-xl);
  border-radius: var(--app-radius-large);
  background:
    radial-gradient(circle at top left, rgba(64, 158, 255, 0.18), transparent 32%),
    radial-gradient(circle at bottom right, rgba(103, 194, 58, 0.14), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(245, 247, 250, 0.94));
  box-shadow: var(--app-shadow-base);
}

.vueuse-demo-page__eyebrow {
  font-size: var(--app-font-size-small);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--app-color-primary);
}

.vueuse-demo-page__title {
  margin: var(--app-space-sm) 0 0;
  font-size: 32px;
  line-height: 1.2;
  color: var(--app-color-text-primary);
}

.vueuse-demo-page__desc {
  margin: var(--app-space-md) 0 0;
  color: var(--app-color-text-regular);
  line-height: 1.9;
}

.vueuse-demo-page__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-sm);
  margin-top: var(--app-space-lg);
}

.vueuse-demo-page__hero-panel {
  padding: var(--app-space-lg);
  border-radius: var(--app-radius-large);
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.vueuse-demo-page__panel-title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.vueuse-demo-page__panel-list {
  padding-left: 20px;
  margin: var(--app-space-md) 0 0;
}

.vueuse-demo-page__panel-item {
  color: var(--app-color-text-secondary);
  line-height: 1.9;
}

.vueuse-demo-page__summary-grid,
.vueuse-demo-page__demo-grid {
  display: grid;
  gap: var(--app-space-md);
}

.vueuse-demo-page__summary-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.vueuse-demo-page__summary-card {
  padding: var(--app-space-lg);
  border-radius: var(--app-radius-large);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--app-color-border-light);
}

.vueuse-demo-page__summary-title {
  font-size: var(--app-font-size-large);
  font-weight: 700;
  color: var(--app-color-text-primary);
}

.vueuse-demo-page__summary-desc {
  margin: var(--app-space-sm) 0 0;
  color: var(--app-color-text-secondary);
  line-height: 1.8;
}

.vueuse-demo-page__summary-api-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--app-space-xs);
  margin-top: var(--app-space-md);
}

.vueuse-demo-page__summary-api-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: var(--app-radius-round);
  background: var(--app-color-fill-light);
  color: var(--app-color-text-regular);
}

.vueuse-demo-page__demo-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
}

@media (max-width: 1200px) {
  .vueuse-demo-page__hero,
  .vueuse-demo-page__summary-grid,
  .vueuse-demo-page__demo-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .vueuse-demo-page__hero {
    padding: var(--app-space-lg);
  }

  .vueuse-demo-page__title {
    font-size: 26px;
  }
}
</style>
