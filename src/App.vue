<template>
  <!-- App.vue 只保留根级路由出口。
    这样做有两个好处：
    1. 应用根组件足够干净
    2. 后台框架 Layout 交给路由系统决定，而不是写死在 App.vue 里 -->
  <router-view />
</template>
