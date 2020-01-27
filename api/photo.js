  
import req  from '@/utils/httpUtil.js'
// 获取列表
export const getPhotoList = data => req.get('/picture',data)

// 获取列表图片详情
export const getPhotoInfo = data => req.get('/picture/listInfo',data)

// 获取音乐列表
export const getMusicListInfo = data => req.get('/music/v1/personalized/newsong')

// 播放地址
export const getPlayUrl = data => req.get('/music/v1/music/url',data)

//单曲详情
export const getMusicInfo = data => req.get('/music/v1/music/detail',data)

// 歌词
export const getMusicLyric = data => req.get('/music/v1/lyric',data)

// 评论
export const getMusicComments = data => req.get('/music/v1/comments',data)
