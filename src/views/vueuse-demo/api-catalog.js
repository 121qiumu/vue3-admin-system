/**
 * 学习注释：
 * 1. 文件角色：这是项目中的一个源码文件，主要承担当前目录对应分层的职责。
 * 2. 所在分层：页面层：真正承载业务展示和用户操作的界面。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：learningStepList、apiCategoryList
 * 5. 常见上游调用方：src/views/vueuse-demo/index.vue
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
export const learningStepList = [
  '先看页面顶部的 API 分类，先建立“这个函数解决什么问题”的整体印象。',
  '再逐个操作下面的实时 Demo，观察响应式数据是怎么自动变化的。',
  '操作完之后回到组件源码，看每个文件开头的中文注释，理解接入步骤。',
  '最后自己改一下 key、延迟时间、初始值，印象会比只看文档更深。'
]

export const apiCategoryList = [
  {
    title: '浏览器感知',
    description: '把鼠标、窗口、元素尺寸这些变化直接转成响应式数据。',
    apiList: ['useMouse', 'useWindowSize', 'useElementSize']
  },
  {
    title: '状态与存储',
    description: '把本地缓存和布尔切换这类高频重复逻辑收拢到组合式函数里。',
    apiList: ['useLocalStorage', 'useToggle']
  },
  {
    title: '交互与效率',
    description: '把复制、防抖、异步请求状态这些常见业务动作写得更短、更清楚。',
    apiList: ['useClipboard', 'useDebounceFn', 'useAsyncState']
  }
]
