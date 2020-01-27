import req from './Request.js'
import {
	baseUrl
} from '../config.js'
const statusMap = {
	'100': '继续',
	'101': '转换协议',
	'200': '正常',
	'201': '已创建',
	'202': '接受',
	'203': '非官方信息',
	'204': '无内容',
	'205': '重置内容',
	'206': '局部内容',
	'300': '多重选择',
	'301': '文件已移动',
	'302': '找到',
	'303': '参见其他信息',
	'304': '未修正',
	'305': '使用代理',
	'307': '临时重定向',
	'400': '错误请求',
	'401': '未授权',
	'403': '禁止访问',
	'404': '未找到接口',
	'405': '方法未允许',
	'406': '无法访问',
	'407': '代理服务器认证要求',
	'408': '请求超时',
	'409': '冲突',
	'410': '已经不存在',
	'411': '需要数据长度',
	'412': '先决条件错误',
	'413': '请求实体过大',
	'414': '请求URI过长',
	'415': '不支持的媒体格式',
	'416': '请求范围无法满足',
	'417': '期望失败',
	'500': '服务器错误',
	'501': '未实现',
	'502': '错误的网关',
	'503': '服务无法获得',
	'504': '网关超时',
	'505': '不支持的 HTTP 版本'
}

class HttpUtil {
	constructor() {
		//初始化网络配置
		req.baseUrl(baseUrl)
			.header({
				'Accept': 'application/json,text/plain',
				// "Authorization":uni.getStorageSync('token') || ''
			})
			.interceptor(res => {
				let result = {};
				// if (res && res.header && (res.header.Authorization || res.header.authorization)) {
			// 		uni.setStorageSync('token', res.header.Authorization || res.header.authorization);
			// 		req.token(res.header.Authorization || res.header.authorization)
			// 	}
				if (res && res.statusCode >= 200 && res.statusCode < 300) {
					result.data = res.data;
				} else {
					uni.showToast({
						title: statusMap[res.statusCode + ''] || '',
						icon: 'none',
						duration: 1000
					})
					result.error = {
						errorCode: res.statusCode,
						errorMessage: statusMap[res.statusCode + ''] || ''
					}
				}
				return result;
			})
			// .interceptor(data => {
			// 	let result = {}
			// 	if (data && data.result) {
			// 		result.data = data.result;
			// 	} else {
			// 		if(data && data.data && data.data.status_code == 401){
			// 			uni.clearStorageSync();
			// 			uni.navigateTo({
			// 				url: '/pages/user/login',
			// 			});
			// 		}
			// 		uni.showToast({
			// 			title: data.data.status_code == 401 ? 'token失效，请重新登录':data.data.message,
			// 			icon: 'none',
			// 			duration: 1000
			// 		})
			// 		result.error = {
			// 			errorCode: data.status_code,
			// 			errorMessage: data.message
			// 		}
			// 	}
			// 	
			// 	return result;
			// })
	}


	get(url, data) {
		return req.get(url, data, {
			'content-type': 'application/x-www-form-urlencoded'
		})
	}

	post(url, data) {
		return req.post(url, data, {
			'content-type': 'application/x-www-form-urlencoded'
		})
	}
	put(url, data) {
		return req.put(url, data, {
			'content-type': 'application/json'
		})
	}
	
	delete(url, data) {
		return req.delete(url, data, {
			'content-type': 'application/json'
		})
	}
	
	postJson(url, data) {
		return req.post(url, data, {
			'content-type': 'application/json'
		})
	}

	postQuery(url, query, data) {
		return req.post(url + query, data, {
			'content-type': 'application/json'
		})
	}
	
	postAuth(url,query, data) {
		return req.post(url + query, data, {
			'content-type': 'application/json',
			'Authorization': 'Basic YnJvd3Nlcjo='
		})
	}
	postToken(url, data) {
		let query = ''
		if(uni.getStorageSync('token') !== '') {
			if (url.indexOf('?') != -1) {
				query += '&'
			} else {
				query += '?'
			}
			query += 'access_token=' + uni.getStorageSync('token')
		}
		return req.post(url + query, data, {
			'content-type': 'application/json'
		})
	}
}

export default new HttpUtil
