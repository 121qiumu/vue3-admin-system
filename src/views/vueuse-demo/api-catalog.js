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
