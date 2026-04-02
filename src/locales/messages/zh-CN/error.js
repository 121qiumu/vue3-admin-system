export default {
  error: {
    403: {
      title: '403',
      description: '当前账号没有访问该页面的权限',
      tip: '如果你确认自己应该拥有该权限，请联系管理员进行开通。'
    },
    404: {
      title: '404',
      description: '页面不存在，请检查访问地址是否正确',
      tip: '你可以返回首页，或者从左侧菜单重新进入已有页面。'
    },
    500: {
      title: '500',
      description: '系统开小差了，请稍后重试',
      tip: '如果问题持续出现，请联系管理员排查服务日志或接口服务状态。'
    },
    empty: {
      title: '暂无数据',
      description: '当前还没有可展示的数据内容'
    },
    loadFailed: {
      title: '加载失败',
      description: '当前内容加载失败，请稍后重试'
    }
  }
}
