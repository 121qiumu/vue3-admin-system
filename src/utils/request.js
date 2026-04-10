/**
 * 学习注释：
 * 1. 文件角色：这是兼容层请求工具文件，用来把常用请求方法再包装一层，方便业务调用。
 * 2. 所在分层：工具层：放通用函数，避免重复写基础逻辑。
 * 3. 当前文件主要依赖：当前文件没有显式导入项目内其他源码模块，或者只依赖运行环境与框架默认能力。
 * 4. 当前文件对外暴露：命名导出：default、deleteRequest、getRequest、postRequest、putRequest
 * 5. 常见上游调用方：当前暂时没有扫描到项目内其他源码文件直接引用它，或者它主要通过运行时约定被使用。
 * 6. 阅读建议：建议先看导入来源，再看当前文件导出的内容，这样最容易看懂它在项目中的位置。
 */
// 兼容旧导入路径。
// 这样即使项目里还有人写的是 @/utils/request，也能继续正常工作。
export { default, deleteRequest, getRequest, postRequest, putRequest } from '@/request'
