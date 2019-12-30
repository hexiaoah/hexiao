import axios from './interception'
import qs from 'qs'

const API = {
    // 营销方案列表
    getMarketList(params) {
        return axios({
            method: 'GET',
            url: '/integral-api/market_scheme/v1/scheme_list',
            params: params
        })
    },
    // 营销方案详情
    getMarketDetail(params) {
        return axios({
            method: 'get',
            url: '/integral-api/market_scheme/v1/get_market_detail',
            params: params
        })
    },
    // 是否开通
    marketIsOpen(params) {
        return axios({
            method: 'POST',
            url: '/integral-api/market_scheme/v1/plans_open',
            data: qs.stringify(params)
        })
    },
    // 营销方案列表顶部通知栏信息
    topNotificyData(params) {
        return axios({
            method: 'GET',
            url: '/integral-api/market_scheme/v1/top_notification',
            params: params
        })
    },
    // 预览信息
    previewData(params) {
        return axios({
            method: 'GET',
            url: '/integral-api/market_scheme/v1/get_preview_data',
            params: params
        })
    },
    // 免费模板
    freeUseTemplate(params){
        return axios({
            method: 'POST',
            url: '/integral-api/market_scheme/v1/open_by_present',
            data: qs.stringify(params)
        })
    },
    // 营销方案详情顶部通知栏信息
    topNotificyMarket(params){
        return axios({
            method: 'GET',
            url: '/integral-api/market_scheme/v1/get_rule_member_count',
            params: params
        })
    }
}

export default API;