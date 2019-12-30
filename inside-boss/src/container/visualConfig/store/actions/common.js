import store from '@src/store'
import cookie from '@2dfire/utils/cookie'

export function getShopInfo() {
    let appId = ''
    let appVersionId = ''
    const data = JSON.parse(cookie.getItem('entrance')).shopInfo
    const {entityTypeId, isInLeague} = data // entityTypeId: 3是店铺，10是联盟；isInLeague：1，店铺是属于联盟下的店铺
    if (entityTypeId == '10' || (entityTypeId == '3' && !!isInLeague)){ // 联盟或者是联盟下的店铺
        appId= '455421937959619809'
        appVersionId='455421937959619810'
    }else{
        const getShopInfo = store.getState().visualConfig.shopInfo
        appId = getShopInfo.appId
        appVersionId = getShopInfo.appVersionId
    }
    return { appId, appVersionId }
}
