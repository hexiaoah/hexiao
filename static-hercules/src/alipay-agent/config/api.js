import axios from './interception'
import { APP_KEY } from 'apiConfig'
const API = {
	/*获取TOKEN信息*/
	getToken(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket',
			params: {
				appKey: APP_KEY,
				...params
			}
		})
	},
	/**
   * 获取session信息（用于埋点）
   * */
	getSessionInfo(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.boss.center.soa.login.service.ILoginService.getSessionMapFromToken',
			params: params
		})
	},
	/**
   *  首页查看申请状态
   */
	getPaymentStatus(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getPaymentStatus',
			params: params
		})
	},
	/**
   * 查看支付宝开通状态
   */
	getAlipayApplyStatus(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getAlipayApplyStatus',
			params: params
		})
	},
	/**
   * 提交支付宝直连进件资料
   */
	authAlipayDirect(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.authAlipayDirect',
			params
		})
	},
	/**
   *  查看申请资料
   */
	getAlipayAuthInfo(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getAlipayAuthInfo',
			params: params
		})
	},
	/**
   * 启用支付宝直连
   */
	enableAlipay(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.enableAlipay',
			params: params
		})
	},

	/**
* 获取微信直连开通状态 ---后台手动开通的
* 
*/
	getWechatApplyStatusByPeople(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.soa.boss.IAppointedShopService.getAppointedShops',
			params: params
		})
	},
	/**
* 获取微信直连开通状态
* 
*/
	getWechatApplyStatus(params) {
		return axios({
			method: 'GET',
			url: 'com.dfire.fin.thirdpart.merchant.service.IPaymentAuthApplyService.getWechatApplyStatus',
			params: params
		})
	}
}

export default API
