const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
}
const params = {}

class Request {

	_header = {
		token: '23',
		
	}

	_baseUrl = null

	interceptors = []


	constructor() {
		// this.getPushishParams()
	}

	getPushishParams() {
		params.sysType = '4';
		params.appType = '0';
		params.versionNo = '1';
		params.osVersion = '1.0.0';
		params.timestamp = new Date().getTime();
		return new Promise((resolve, reject) => {
			uni.getSystemInfo({
				success: function(res) {
					params.deviceNo = res.system;
					params.phoneModel = res.model;
				}
			})
		})
	}

	intercept(res, resolve, reject) {
		var data = res
		this.interceptors.forEach(f => {
			var temp = f(data)
			if (temp.error) {
				reject(temp.error)
				return
			} else {
				data = temp.data
			}
		})
		resolve(data)
	}

	request({
		url,
		method,
		header = {},
		data = {}
	}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: (this._baseUrl || '') + url,
				method: method || METHOD.GET,
				data: {
					...params,
					...data,
				},
				header: {
					...header,
					...this._header,

				},
				success: res => this.intercept(res, resolve, reject),
				fail: res => {
					reject({
						errorCode: res.statusCode || -1,
						errorMessage: '无网络或配置异常'
					})
				}
			})
		})
	}

	get(url, data, header) {
		return this.request({
			url,
			method: METHOD.GET,
			header,
			data
		})
	}
	post(url, data, header) {
		return this.request({
			url,
			method: METHOD.POST,
			header,
			data
		})
	}
	put(url, data, header) {
		return this.request({
			url,
			method: METHOD.PUT,
			header,
			data
		})
	}
	patch(url, data, header) {
		return this.request({
			url,
			method: METHOD.PATCH,
			header,
			data
		})
	}
	delete(url, data, header) {
		return this.request({
			url,
			method: METHOD.DELETE,
			header,
			data
		})
	}

	params(params) {
		this._header.token = token
		return this
	}

	token(token) {
		this._header.Authorization = token
		return this
	}
	header(header) {
		this._header = header
		return this
	}
	baseUrl(baseUrl) {
		this._baseUrl = baseUrl
		return this
	}
	//{error,data}
	interceptor(f) {
		if (typeof f === 'function') {
			this.interceptors.push(f)
		}
		return this
	}
}
//全局共享一个Request实例，使用这个要求接口高度统一
export default new Request
//export {METHOD}
