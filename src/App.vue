<template>
  <!--
    根组件自己的模板非常简单，重点不在“长什么样”，而在“给全项目包上一层什么能力”。
    这里统一托管 Element Plus 的国际化配置，
    这样页面里的 el-table、el-pagination、日期组件等内置文案都会跟着当前语言切换。
  -->
  <el-config-provider :locale="elementPlusLocale">
    <!--
      router-view 是“路由页面出口”。
      当前 URL 匹配到哪个页面组件，Vue Router 就会把哪个组件渲染到这里。
    -->
    <router-view />
  </el-config-provider>
</template>

<script setup>
// 学习注释：
// 1. 文件角色：这是根组件，项目里所有页面最终都会被它包在里面，它主要负责提供全局容器能力。
// 2. 所在分层：根组件层，所有页面最终都要经过这里。
// 3. 当前组件主要依赖：useLocale 组合式函数，用来拿到 Element Plus 当前要使用的语言包对象。
// 4. 对外暴露方式：当前文件会作为一个 Vue 组件被 main.js 作为根组件传给 createApp(App)。
// 5. 常见上游调用方：src/main.js。
// 6. 阅读建议：先看 template 里全局包裹了什么能力，再看 script 里这些能力的数据从哪里来。
import { useLocale } from '@/hooks/useLocale'

const { elementPlusLocale } = useLocale()
</script>
