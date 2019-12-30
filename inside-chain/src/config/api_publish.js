// 下发中心
import {API_BASE_URL} from "apiConfig";
import Requester from '@/base/requester'
import {GW} from '@2dfire/gw-params';

const AND = '&' + GW;

const API = {
    /**
     * 获取下发任务列表
     * params:
     * date: 下发任务时间段 0:全部、1:近7天、2:近30天、3:近半年、4:近一年
     * taskStatus: 任务状态 0:全部、1:等待下发、2:下发失败、3:下发成功
     * plateEntityId: 品牌id null:全部 其他
     * 废弃 type: 下发类型  0:全部、1:综合模块、2:单个模块
     * pageIndex: 页码
     *
     */

    getPublishTaskList(params) {
        console.log('getPublishTaskList')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.getPublishTaskList" + AND,
            {
                params: {
                    date: params.date,
                    pageIndex: params.pageIndex,
                    taskStatus: params.taskStatus,
                    plateEntityId: params.plateEntityId
                }
            }
        )
    },
    /**
     * 获取下发任务详情
     *  taskId: 下发任务id
     */
    getTaskInfo(params) {
        console.log('getTaskInfo')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.getTaskInfo" + AND,
            {
                params: {
                    taskId: params.taskId,
                }
            }
        )
    },
    /**
     * 获取下发任务列表筛选所需的所有品牌
     *  taskId: 下发任务id
     */
    getAllBrands() {
        console.log('getAllBrands')
        return Requester.get(
            API_BASE_URL + "com.dfire.boss.center.pc.IPlateBossPcService.getAllPlateByBrand" + AND,
        )
    },

    /**
     * 取消下发任务
     *  id: 下发任务id
     */
    cancelTask(params) {
        console.log('cancelTask')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.cancelTask" + AND,{
                params: {
                    id: params.taskId
                }
            }
        )
    },

    /**
     * 下发菜单
     *  plateEntityId: 品牌Id,
     *  menuId: 菜单Id,
     *  publishType: 下发Type,
     *  timeType: 下发时间Type,
     *  publishTime: 下发时间Time, not must
     *  shops: 下发商家
     */
    publishMenu(params) {
        console.log('publishMenu')
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.publishMenu" + AND,
            {
                plateEntityId: params.plateEntityId,
                menuId: params.menuId,
                name: params.name,
                publishType: params.publishType,
                timeType: params.timeType,
                publishTime: params.publishTime,
                shops: params.shops,
                oldTaskId: params.oldTaskId
            },
            {emulateJSON: true}
        )
    },
    /**
     * 获取所有可以下发的
     * 下发付款 方式
     *  plateEntityId: 品牌Id,
     *  moduleType: 下发Type, 6: 付款方式
     */
    getAllPayKindList(params) {
        console.log('publishMenu')
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.center.business.chainpublish.IChainPublishClientService.moduleDataList" + AND,
            {
                plateEntityId: '0',
                moduleType: 6
            },
            {emulateJSON: true}
        )
    },
    /**
     * 下发付款 方式
     *  plateEntityId: 品牌Id,
     *  publishType: 下发Type,
     *  timeType: 下发时间Type,
     *  publishTime: 下发时间Time, not must
     *  shops: 下发商家
     */
    publishPayKind(params) {
        console.log('publishMenu')
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.saveTask" + AND,
            params,
            {emulateJSON: true}
        )
    },
    /**
     * 下发任务
     * 统一下发接口
     *
     * 除菜单下发外都可以使用该接口下发
     *
     */
    publishTask(params) {
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.saveTask" + AND,
            params,
            {emulateJSON: true}
        )
    },
    /**
     * 获取下发信息
     * 统一获取下发模块接口
     *
     * 除菜单下发外都可以使用该接口下发
     *
     * params:
     *   plateEntityId: 品牌id,
     *   moduleType: 要获取的模块type
     *
     */
    getPublishModules(params) {
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.center.business.chainpublish.IChainPublishClientService.moduleDataList" + AND,
            {
                plateEntityId: params.plateEntityId,
                moduleType: params.moduleType
            },
            {emulateJSON: true}
        )
    },

    /**
     * 获取下发时间类型
     *
     */
    getPublishTimeType() {
        console.log('getPublishTimeType')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.getPublishTimeType" + AND
        )
    },

}


export default API;
