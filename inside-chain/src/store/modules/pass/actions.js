import API_PUBLISH from '@/config/api_publish'
import catchError from '@/base/catchError'
import Router from "@/router";
import Obj from "@2dfire/utils/object"

import Vue from 'vue';
import iView from "iview";

Vue.use(iView);

let Message = iView.Message;

// 获取 所有 付款方式列表
export const getPassModules = (context, params) => {
    let trueParams = {
        plateEntityId: params.plateEntityId,
        moduleType: 2
    }
    API_PUBLISH.getPublishModules(trueParams).then(data => {
        // 获取 所有 付款方式列表
        let res = data.data[0] || {};
        // mock
        // res = {
        //     name: 'mock品牌',
        //     remarkRight: '2018-09-30 12:22'
        // }
        context.commit('_getPassModules', res)
    }).catch(e => {
        catchError(e)
    })
}
