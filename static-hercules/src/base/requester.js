const { getCookie } = require("./utils/AppUtil");
const { warning: warningDialog } = require("./components/dialogs/events");
const Vue = require("vue");
const Promise = require("promise");
const vueResource = require("vue-resource");

Vue.use(vueResource);

/**
 * 创建一个地址附带查询参数
 * @param  {String} baseUrl 基础地址
 * @param  {Object} params  key-value 对象,选填
 * @return {void}
 */
function createUrlWithToken(baseUrl, token) {
	let subStr = "";
	// 没有问号
	if (baseUrl.lastIndexOf("?") === -1) {
		subStr = "?";
	} else {
		// 最后一个字符
		const lastChar = baseUrl.slice(-1);
		// 如果最后接在最后一个字符不是是?并且是&加上一个&
		if (lastChar !== "&" && lastChar === "?") {
			subStr = "&";
		}
	}

	return baseUrl + subStr + "xtoken=" + token;
}

// 上次请求的序号
let lastRequestIndex = 0;

// 请求是否被取消
const requestsCancled = {};

const ERROR_TYPES = {
	UNDEFINED_TOKEN: "undefined_token", // 未定义token
	CANCLED: "cancled", // 被取消
	NETWORK_FAIL: "network_fail", // 网络失败
	RESULT_FAIL: "result_fail" // 结果失败
};

/**
 * 创建请求工厂
 * eg:
 *   const requestGet = requestFactory('get');
 *   requestGet(url, [options]);
 * @param  {String} method 请求http method
 * @return {function}
 */
function requestFactory(method) {
	// 实际请求方法（通过Vue.http插件）
	const realRequest = Vue.http[method].bind(Vue.http);
	if (typeof realRequest !== "function") {
		const e = { msg: `method:${method}不是符合的方法` };
		throw e;
	}
	/**
     * 请求请求参数和Vue.http相同
     * @param  {String}    url  请求api地址
     * @param  {...[type]} args 其余参数
     * @return {Promise}        当请求成功并且code=1，resolve(result.data),其余情况reject
     */
	return function request(url, ...args) {
		const token = getCookie("token");
		// let token ="b8ccf4244a1f03ea3118cf1c14d58f60"
		let needToken = true;
		let lastParam = args[args.length - 1];
		if (typeof (lastParam) == "boolean") {
			needToken = lastParam;
		}
		if (needToken) {
			if (!token) {
				warningDialog.showError("登陆超时，请重新扫码", { canClose: false });
				console.warn("没有token");
				console.warn(url, args);
				return Promise.reject({
					errorType: ERROR_TYPES.UNDEFINED_TOKEN,
					result: null,
					response: null
				});
			}
		}
		// 自增请求序号
		const requestIndex = ++lastRequestIndex;
		return realRequest(createUrlWithToken(url, token), ...args).then(response => {
			let result = response.data;
			if (typeof (result) == "string") result = JSON.parse(response.data);
			const code = +result.code;
			result.code = code;
			// 判断是否被取消，如果被取消，直接reject
			if (requestsCancled[requestIndex]) {
				return Promise.reject({
					errorType: ERROR_TYPES.CANCLED,
					result,
					response
				});
			}

			// 成功情况
			if (code === 1) {
				return result.data;
			}

			// 授权失败
			if (code === -1) {
			  return warningDialog.showError("授权失败，请重新扫码进入", { canClose: false });
			}
			return Promise.reject({
				errorType: ERROR_TYPES.RESULT_FAIL,
				result,
				response
			});
		},
			response => {
				//warningDialog.showError('网络错误，请刷新页面', { canClose: false });
				return Promise.reject({
					errorType: ERROR_TYPES.NETWORK_FAIL,
					result: null,
					response
				});
			}
		);
	};
}

/**
 * get(url, [options])
 * head(url, [options])
 * delete(url, [options])
 * jsonp(url, [options])
 * post(url, [body], [options])
 * put(url, [body], [options])
 * patch(url, [body], [options])
 */
/*
demo:
    const requester = require('base/requester');
    const ERROR_TYPES = requester.ERROR_TYPES;
    requester
        .get('http://api.com/findUser', { params: { id: 123 } })
        .then({ name } => {
            console.log(`hello ${name}`);
        })
        .catch(({ errorType, result }) => {
            // errorType: 错误类型, result: 结果(code + data + ...那一层数据), response: http返回结构
            // 通过ERROR_TYPES来判断错误类型
            if (errorType === ERROR_TYPES.RESULT_FAIL) {
                const { message, code } = result;
                if (code === 2) {
                    console.log(`find user fail: ${message}`);
                }
            }
        });
*/
module.exports = {
	get: requestFactory("get"),
	head: requestFactory("head"),
	delete: requestFactory("delete"),
	jsonp: requestFactory("jsonp"),
	post: requestFactory("post"),
	put: requestFactory("put"),
	patch: requestFactory("patch"),
	ERROR_TYPES: Object.assign({}, ERROR_TYPES),

	/**
     * 获取最近一次请求序号
     * @return {Number} 最近一次请求序号
     */
	getLastRequestIndex() {
		return lastRequestIndex;
	},

	/**
     * 取消请求
     * @param {Number} 请求序号
     */
	cancleRequest(index) {
		requestsCancled[index] = true;
	}
};
