import Cookie from '@2dfire/utils/cookie'
import Obj from '@2dfire/utils/object'
import API from '@/config/api_publish.js'
import catchError from '@/base/catchError'
import Router from "@/router";
import distType from '../../../const/emu-distType'

import Vue from 'vue';
import iView from "iview";

Vue.use(iView);

let Message = iView.Message;


// 获取下发任务列表
export const getPublishTaskList = (context, params) => {
    if(params.brandId === 'all'){
        params.plateEntityId = ''
    }else{
        params.plateEntityId = params.brandId
    }
    API.getPublishTaskList(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
            res.tasks.map(item=> {
                // 转化为展示需要的类型
                item.typeShow = distType[item.type];
                item.plateName = item.plateName || '-';
            })
        }
        context.commit('_getPublishTaskList', res)
    }).catch(e => {
        catchError(e)
    })
}
// 获取下发任务详情
export const getTaskInfo = (context, params) => {
    API.getTaskInfo(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data;
            res.moduleType = res.detailList[0].moduleType
            switch (res.moduleType) {
                case 13: {
                    res.menuInfo = {
                        menuName: res.detailList[0].chainPublishDetailContent.memo || '',
                        menuCount: res.detailList[0].chainPublishDetailContent.menuCount || 0,
                        menuId: res.detailList[0].chainPublishDetailContent.moduleIdList[0] || ''
                    };
                    break;
                }
                // moduleType: 6 付款方式
                case 6: {
                    res.payKindList = res.detailList[0].moduleDataList || [];
                    break;
                }
                // moduleType: 2 传菜方案
                case 2: {

                    res.passInfo = {
                        // 传菜品牌名称
                        name: res.plateName || '-',
                        // 传菜方案 最后编辑时间
                        time: res.detailList[0].moduleDataList[0] ? res.detailList[0].moduleDataList[0].remarkRight : '-'
                    }
                    break;
                }
            }
            res.publishType = res.detailList[0].chainPublishDetailContent.publishType
        }
        context.commit('_getTaskInfo', res)
    }).catch(e => {
        catchError(e)
    })
}
// 获取所有品牌 筛选下发任务用
export const getAllBrands = (context, params) => {
    API.getAllBrands(params).then(data => {
        let res = {}
        if (!!data.data) {
            res = data.data
        }
        context.commit('_getAllBrands', res)
    }).catch(e => {
        catchError(e)
    })
}
// 取消下发任务
export const cancelTask = (context, params) => {
    API.cancelTask(params).then(data => {
        Message.info('取消下发成功！')
        Router.push({
            path: '/dist_manage'
        })
    }).catch(e => {
        catchError(e)
    })
}

// 重新下发菜单
export const publishMenu = (context, params) => {

    let shopList = params.shops;
    let tmp_list = []
    shopList.map(v => {
        tmp_list.push(v.entityId)
    })
    params.shops = tmp_list.toString();

    console.log('rerere',params)
    API.publishMenu(params).then(data => {
        if (data) {
            // Message.info('重新下发菜单成功！')
            Router.push(
                {
                    path: '/dist_manage',
                }
            )
        }
    }).catch(e => {
        catchError(e)
    })
}
export const setTimeType = (context, params) => {

    context.commit('_setTimeType', params)
}
export const setTaskName = (context, params) => {

    context.commit('_setTaskName', params)
}

// 下发 --- 付款方式

export const publishPayKind = (context, params) => {

    let shopList = params.shops;
    let tmp_list = []
    shopList.map(v => {
        tmp_list.push(v.entityId)
    })
    params.shops = tmp_list;

    let publishParams = {
        chainPublishTaskContent: {
        shopEntityIdList: params.shops,
    },
        detailList: [{
        chainPublishDetailContent: {
            moduleIdList: params.payKindList
        },
        //    付款方式
        moduleType: 6
    }],
        name: params.name,
        plateEntityId: "0",
        publishStartTime: params.publishTime,
        timeType: params.timeType
    }

    publishParams = JSON.stringify(publishParams)

    let trueParams = {
        taskInfoStr: publishParams
    }

    if(params.isRepublish) {
        trueParams.oldTaskId = params.oldTaskId
    }

    API.publishPayKind(trueParams).then(data => {
        if (data) {
            // 从下发中心重发
            // if(params.isRepublish){
                Router.push(
                    {
                        path: '/dist_manage',
                    }
                )
            // }
            // 从付款方式列表下发
            // else{
            //     Router.push({
            //         path: '/pay_kind_manage'
            //     })
            // }

        }
    }).catch(e => {
        catchError(e)
    })
}

// 下发 --- 传菜方案

export const publishTask = (context, params) => {

    let shopList = params.shops;
    let tmp_list = []
    shopList.map(v => {
        tmp_list.push(v.entityId)
    })
    params.shops = tmp_list;

    let publishParams = {
        chainPublishTaskContent: {
        shopEntityIdList: params.shops,
    },
        detailList: [{
        //    下发传菜方案
        moduleType: params.moduleType
    }],
        name: params.name,
        // 品牌id
        plateEntityId: params.plateEntityId,
        publishStartTime: params.publishTime,
        timeType: params.timeType
    }

    publishParams = JSON.stringify(publishParams)

    let trueParams = {
        taskInfoStr: publishParams
    }

    if(params.isRepublish) {
        trueParams.oldTaskId = params.oldTaskId
    }

    API.publishTask(trueParams).then(data => {
        if (data) {
                Router.push(
                    {
                        path: '/dist_manage',
                    }
                )
        }
    }).catch(e => {
        catchError(e)
    })
}


// 获取下发时间类型
export const getPublishTimeType = (context, params) => {
    API.getPublishTimeType(params).then(data => {
        let res = {}
        if (!!data.data) {
            res = data.data
         }
        context.commit('_getPublishTimeType', res)
    }).catch(e => {
        catchError(e)
    })
}
