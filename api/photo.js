  
import req  from '@/utils/httpUtil.js'
// 获取列表
export const getPhotoList = data => req.get('/picture',data)
// 获取列表图片详情
export const getPhotoInfo = data => req.get('/picture/listInfo',data)