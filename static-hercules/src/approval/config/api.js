import axios from './interception'
import {
    API_BASE_URL,
    APP_KEY
} from "apiConfig";
import router from "@2dfire/utils/router"

const API = {
    getData(params) {
        return axios({
            method: 'GET',
            url: 'com.dfire.boss.center.soa.activiti.service.IApprovalClientService.getApprovalAttachment',
            params: {
                appKey: APP_KEY,
                process_instance_id: router.route.query["process_instance_id"],
                ...params
            }
        })
    }
}

export default API;