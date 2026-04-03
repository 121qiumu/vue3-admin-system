# VueUse 常用 API 学习 Demo

## 1. 文档目标

这份文档配合 src/views/vueuse-demo 目录一起看，目标不是把 VueUse 的所有 API 一次讲完，而是先把后台项目里最常见、最容易马上用上的那一批整理清楚。

希望达到的效果只有三个：

1. 知道这个 API 是干嘛的。
2. 知道应该怎么接进业务代码。
3. 以后自己优化代码，或者看别人项目时，不会对 VueUse 一脸懵。

---

## 2. 当前接入方式

### 2.1 已安装依赖

`ash
pnpm add @vueuse/core
`

### 2.2 Demo 入口

登录项目后可以直接访问：

`	ext
/zh-CN/vueuse-demo
`

或者在左侧菜单里点击：

`	ext
VueUse 学习 Demo
`

### 2.3 源码目录

`	ext
src/views/vueuse-demo/
├─ index.vue
├─ api-catalog.js
└─ components/
   ├─ VueUseDemoCard.vue
   ├─ UseMouseDemo.vue
   ├─ UseWindowSizeDemo.vue
   ├─ UseElementSizeDemo.vue
   ├─ UseClipboardDemo.vue
   ├─ UseLocalStorageDemo.vue
   ├─ UseDebounceFnDemo.vue
   └─ UseAsyncStateDemo.vue
`

## 3. 学习重点

1. 先理解这个 API 帮你省掉了什么重复代码。
2. 再看它返回的值怎么直接接到模板和计算属性里。
3. 最后再记参数和细节，不要一开始就死记 API 名字。

## 4. 当前示例包含的常用 API

1. useMouse：实时拿鼠标坐标，适合拖拽、提示层和坐标调试。
2. useWindowSize：实时拿窗口宽高，适合响应式布局判断。
3. useElementSize：监听某个元素自身尺寸，适合图表和卡片联动。
4. useClipboard：复制内容到剪贴板，适合链接、命令和 token。
5. useLocalStorage：把响应式数据自动同步到本地缓存。
6. useToggle：简化布尔开关切换逻辑。
7. useDebounceFn：把函数改成防抖版，适合搜索和高频输入。
8. useAsyncState：统一管理 data / loading / error / execute。

## 5. 推荐学习顺序

1. 先看 useMouse、useWindowSize、useElementSize。
2. 再看 useClipboard、useLocalStorage、useToggle。
3. 最后看 useDebounceFn、useAsyncState。

## 6. 官方文档入口

1. https://vueuse.org/core/usemouse/
2. https://vueuse.org/core/usewindowsize/
3. https://vueuse.org/core/useelementsize/
4. https://vueuse.org/core/useclipboard/
5. https://vueuse.org/core/uselocalstorage/
6. https://vueuse.org/shared/usetoggle/
7. https://vueuse.org/shared/usedebouncefn/
8. https://vueuse.org/core/useasyncstate/
