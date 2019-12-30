import axios from './interception'
import { APP_KEY } from 'apiConfig'
import qs from 'qs'
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
  /*/////////////////////////////////////销售数据上报///////////////////////////////////// */

  /*当月数据合计*/
  getDataTotal(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.getSalesDataPageHeader',
      params: data
    })
  },
  /*上报列表*/
  getDataList(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.getSalesDataPageList',
      params: data
    })
  },
  /* 总的详情页 */
  getDetailsTotal(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.getSalesDataTotalPage',
      params: data
    })
  },
  /*数据上报 */
  getReported() {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.addSalesDataPage'
    })
  },
  /*录入数据*/
  saveInputData(data) {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client..sales.service.ISalesDataClientService.addSalesData',
      data: qs.stringify(data)
    })
  },
  /*编辑页面 */
  getEditData(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.editSalesDataPage',
      params: data
    })
  },
  /*修改销售数据 */
  updataPage(data) {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataClientService.editSalesData',
      data: qs.stringify(data)
    })
  },
  /*/////////////////////////////////////销售数据审核///////////////////////////////////// */

  /*筛选信息 */
  getSelInfo() {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.getFilterFloorAndFormat'
    })
  },
  /*门店列表 */
  getShopList(param) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.getShopList',
      params: param
    })
  },
  /*提交修改数据 */
  saveUpdata(data) {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.editAuditSalesData',
      data: qs.stringify(data)
    })
  },
  /*按天 */
  getAuditDay(data) {
    return axios({
      method: 'POST',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.oneKeyConfirmByDay',
      data: qs.stringify(data)
    })
  },
  /*按店 */
  getAuditShop(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.oneKeyConfirmByShop',
      params: data
    })
  },
  /*审核编辑页面 */
  auditEdit(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.editAuditSalesDataPage',
      params: data
    })
  },
  /*按天审核列表页 */
  auditDayList(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.selectByDayList',
      params: data
    })
  },
  /*按店审核列表页 */
  auditShopList(data) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.selectByShopList',
      params: data
    })
  },
  /**
   * 按天导出销售数据
   * @param {object} payload
   * @property {string} email
   * @property {string} time
   */
  exportSaleDataByDay(payload) {
    return axios({
      method: 'GET',
      url:
        'com.dfire.soa.mis.center.client.sales.service.ISalesDataAuditClientService.exportSaleDataByDay',
      params: payload
    })
  }
}

export default API
// 34412 99227031
