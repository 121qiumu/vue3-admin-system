// 兼容旧导入路径。
// 这样即使项目里还有人写的是 @/utils/request，也能继续正常工作。
export { default, deleteRequest, getRequest, postRequest, putRequest } from '@/request'
