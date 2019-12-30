import axios from './interception'
import {
    API_BASE_URL,
    APP_KEY
} from "apiConfig";

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
    getTicket(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.boss.center.soa.ticket.ITicketService.grantTicket',
            params: {
                appKey: APP_KEY,
                ...params
            }
        })
    },
    getReport(params) {
        return axios({
            method: 'POST',
            url: 'com.dfire.soa.datacenter.maya.service.IReportService.reportGroupForDingTalkMiniProgram',
            params: {
                appKey: APP_KEY,
                ...params
            }
        })
    }
}

export default API;