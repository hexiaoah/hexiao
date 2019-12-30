import {API_BASE_URL} from "apiConfig";
import Requester from '@/base/requester'
import {GW} from '@2dfire/gw-params';

const AND = '&' + GW;

const API = {
    //批量删除修改
    batchUpdate(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.boss.center.soa.item.facade.service.IItemFacadeService.batchModifyItem" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //批量移除
    batchChainShopUpdate(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.center.item.facade.service.IItemFacadeService.batchRemoveChainShopItem" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //获取批量删除结果
    getBatchRemoveChainShopItemResult(params){ 
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.center.item.facade.service.IItemFacadeService.getBatchRemoveChainShopItemResult" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //获取分类信息
    getCategory(){
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.getCategory" + AND
        )
    },
    // 增加修改分类
    insertOrUpdateCategory(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.insertOrUpdateCategory" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //获取分组信息
    getBaseGroup(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.getBaseGroup" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //分组查询
    getGroupDetail(params){
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.getGroupDetail" + AND,
            {
                params:
                    {
                        groupId: params.id,
                    }
            }
        )
    },
    //增删改分组
    insertOrUpdateGroup(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.entity.service.IChainShopGroupService.insertOrUpdateGroup" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //获取连锁门店分组下门店的信息
    getShopInGroup(){
        return Requester.get(
            API_BASE_URL + "com.dfire.boss.center.soa.IChainShopGroupService.getShopInGroup" + AND,
            {
                params:
                    {
                        groupId: params.groupId,
                    }
            }
        )
    },
    //收银台监控信息获取
    getCashDeviceInfo(params){
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.cashplatform.device.getCashDeviceInfo" + AND,
            params,
            {emulateJSON: true}
        )
    },
    //获取连锁下所有店铺
    getAllShops(){
        return Requester.get(
            API_BASE_URL + "com.dfire.boss.center.pc.IShopBossPcService.queryAllShopList" + AND,
        )
    }
}

export default API
