<template>
  <!-- 根组件统一托管 Element Plus 国际化配置。
    这样路由切换、语言切换后，组件库内置文案也会一起联动。 -->
  <el-config-provider :locale="elementPlusLocale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { useLocale } from '@/hooks/useLocale'

const { elementPlusLocale } = useLocale()
</script>
