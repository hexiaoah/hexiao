import axios from './interception'
import {API_BASE_URL, APP_KEY} from "apiConfig";

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
    /*首页-收款明细*/
    getHomeBill() {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IHomeService.getHomeBillCountByEntityId'
        })
    },
    /*首页-折线图*/
    getWeeklyTotal() {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IHomeService.getLastSevenDayTotalFlowsByEntityId'
        })
    },
    /*费率表*/
    getFeeData() {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IPaySceneRateService.getPaymentSceneListByEntityId'
        })
    },
    /*当日收款明细-分页 receipt-info*/
    getTodayFlowList(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.acs.service.IFlowService.queryTodayFlowListByCondition',
            data: data
        })
    },
    /*当日收款明细总额 receipt-info*/
    getTodayTotalAmount(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IFlowService.queryTodayTotalAmountByCondition',
            params: params
        })
    },
    /*结算明细列表-分页 bill-info*/
    getTotalBillList(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.acs.service.IBillService.queryTotalSettleBillListByCondition',
            data: data
        })
    },
    /*结算渠道明细 bill-day-info*/
    getChannelList(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IBillService.queryChannelSettleDetailsByEntityIdAndDate',
            params: params
        })
    },
    /*结算流水明细列表 分页 bill-day-info*/
    getOneDayFlowList(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.acs.service.IFlowService.querySettleFlowListByCondition',
            data: data
        })
    },
    /*首页-最近一次结算数据*/
    getLastDayTotalSettle(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IHomeService.getLastDayTotalSettleByEntityId',
            params: params
        })
    },
    /*首页-折线图-近7天结算*/
    getWeeklySettle(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.acs.service.IHomeService.getLastSevenDayTotalSettleByEntityId',
            params: params
        })
    },
    /*结算明细-金额汇总*/
    getTotalSettleBill(data) {
        return axios({
            method: 'POST',
            url: 'com.dfire.acs.service.IBillService.queryTotalSettleBillByEntityIdAndDate',
            data: data
        })
    }
}

export default API;
