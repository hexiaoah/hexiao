import {API_BASE_URL} from 'apiConfig'
import Requester from '@/base/requester-http'
import catchError from '@/base/catchError'
import {GW} from '@2dfire/gw-params'
import router from '@2dfire/utils/router'

function withEntityId() {
    return '&' + GW + '&' + 'entity_id=' + getEntityId()
}

export function getEntityId() {
    return router.route.query.entityId
}

async function http(url, config) {
    try {
        const res = await Requester.get(API_BASE_URL + url, config)
        const {code} = res
        if (code === 1) {
            return {
                ...res.data,
                success: true
            }
        }
    } catch (e) {
        catchError(e)
        return {
            success: false
        }
    }
}

/**
 * 门店桌位/区域相关api
 */
export default {
    //连锁、门店传菜列表
    getAreaList: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.IAreaClientService.listArea' +
            withEntityId(),
            {
                params
            }
        ),
    getAreaAll: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.IAreaClientService.listAllArea' +
            withEntityId(),
            {
                params
            }
        ),
    addArea: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.IAreaClientService.addArea' +
            withEntityId(),
            {
                params
            }
        ),
    updateArea: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.IAreaClientService.updateArea' +
            withEntityId(),
            {
                params
            }
        ),
    delArea: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.IAreaClientService.removeArea' +
            withEntityId(),
            {
                params
            }
        ),
    getTableList: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.listSeat' +
            withEntityId(),
            {
                params
            }
        ),
    updateSeatArea: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.updateSeatArea' +
            withEntityId(),
            {params}
        ),
    delTables: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.removeSeat' +
            withEntityId(),
            {params}
        ),
    importSeatExcel: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.importSeatExcel' +
            withEntityId(),
            {params}
        ),
    addSeat: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.addSeat' +
            withEntityId(),
            {params}
        ),
    updateSeat: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.updateSeat' +
            withEntityId(),
            {params}
        ),
    getSeatDetail: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.getSeatDetail' +
            withEntityId(),
            {params}
        ),
    getStencilUrl: params =>
        http(
            'com.dfire.soa.cashplatform.client.service.ISeatClientService.getStencilUrl' +
            withEntityId(),
            {params}
        )
}
