import API from '@/config/api_pay'
import API_PUBLISH from '@/config/api_publish'
import catchError from '@/base/catchError'
import Router from "@/router";
import Obj from "@2dfire/utils/object"

import Vue from 'vue';
import iView from "iview";

Vue.use(iView);

let Message = iView.Message;


// 获取支付方式列表
export const getPayKindListForSelect = (context, params) => {
    API.getPayKindListForSelect(params).then(data => {
        let res = data.data || []
        console.log('list:',res)
        if (params && params.opEntityId) {
            context.commit('_getPayKindListForSelectSingle', res)
        }
        else {
            context.commit('_getPayKindListForSelect', res)
        }
    }).catch(e => {
        catchError(e)
    })
}
// 获取支付方式列表
export const getPayKindList = (context, params) => {
    API.getKindPayList(params).then(data => {
        let resp = data.data || {}
        let res = {};
        if(Obj.isEmpty(resp)){
            res = {
                list: [],
                total: 0
            }
        }else {
            res = {
                list: resp,
                total: resp.length
            }
        }


        if (params && params.opEntityId) {
            context.commit('_getPayKindListSingle', res)
        }
        else {
            context.commit('_getPayKindList', res)
        }
    }).catch(e => {
        catchError(e)
    })
    // let data =
    //     {
    //         total: 4,
    //         list: [
    //             {
    //                 name: '现金',
    //                 id: '1',
    //                 type: '现金',
    //                 isInclude: false,
    //                 isAutoOpen: false
    //             },
    //             {
    //                 name: '美团支付',
    //                 id: '2',
    //                 type: '其他',
    //                 isInclude: false,
    //                 isAutoOpen: false
    //             },
    //             {
    //                 name: '大众点评支付',
    //                 id: '3',
    //                 type: '其他',
    //                 isInclude: false,
    //                 isAutoOpen: false
    //             },
    //             {
    //                 name: '支付宝',
    //                 id: '4',
    //                 type: '支付宝',
    //                 isInclude: false,
    //                 isAutoOpen: false
    //             },
    //         ]
    //     }

}

// 获取支付方式详情
export const getPayKindInfo = (context, params) => {
    API.getPayKindInfo(params).then(data => {
        let res = data.data;
        if(res.voucherVos && res.voucherVos.length > 0){
            res.voucherVos.map(item=> {
                item.isValid = 1
            })
        }
        if(res.kind === 10 && !res.voucherVos) {
            res.voucherVos = []
        }
        if (params && params.opEntityId) {
            context.commit('_getPayKindInfoSingle', res)
        }
        else {
            context.commit('_getPayKindInfo', res)
        }
    }).catch(e => {
        catchError(e)
    })
    // let data = {
    //     // 支付方式名称
    //     payKindName: '支付宝',
    //     // 支付类型
    //     payKind: '2',
    //     // 是否计入实收
    //     isInclude: true,
    //     // 是否自动打开钱箱
    //     isAutoOpen: false,
    //     isAlipay: false,
    //     // 代金券列表
    //     couponList: [
    //         {worth: 12, price: 10}
    //     ]
    // }

}

// 检查是否是支付宝直连店铺
export const checkAlipayPayment = (context, params) => {
    API.checkAlipayPayment(params).then(data => {
        // 重新获取列表
        let res = data.data;
        console.log(res)
        if(Obj.isEmpty(res)){
            res = {
                alipayIsEnjoyPreferential: false,
                alipayIsOurAccount: true
            }
        }
        context.commit('_setIsAlipay', res)

    }).catch(e => {
        catchError(e)
    })
}
// 编辑是否是支付宝直连店铺
export const updateAlipayPayment = (context, params) => {
    API.updateAlipayPayment(params).then(data => {
        // 成功跳转至列表
        Router.push({
            path: 'shop_pay_kind_manage',
            query: params.query
        })
    }).catch(e => {
        context.commit('_setIsAlipay',
            {alipayIsEnjoyPreferential: !params.switchStr,
            alipayIsOurAccount: false}
            )
        catchError(e)
    })
}
// 新建支付方式
export const saveKindPay = (context, params) => {
    API.saveKindPay(params).then(data => {
        // 重新获取列表
        if (params && params.opEntityId) {
            Router.push({
                path: 'shop_pay_kind_manage',
                query: params.query
            })
        }
        else {
            Router.push({
                path: 'pay_kind_manage',
            })
        }
    }).catch(e => {
        catchError(e)
    })
}
// 删除支付方式
export const deletePayKind = (context, params) => {
    API.deleteKindPay(params).then(data => {
        // 重新获取列表
    Message.info('付款方式已删除')
        context.dispatch('getPayKindList', params.searchItems)
    }).catch(e => {
        catchError(e)
    })
}

// 获取 所有 付款方式列表
export const getAllPayKindList = (context, params) => {
    API_PUBLISH.getAllPayKindList(params).then(data => {
        // 获取 所有 付款方式列表
        let res = data.data || [];
        context.commit('_getAllPayKindList', res)
    }).catch(e => {
        catchError(e)
    })
    // let data = [
    //     {
    //         selected: false,
    //         name: '现金',
    //         id: '1',
    //         type: '现金'
    //     },
    //     {
    //         selected: false,
    //         name: '美团支付',
    //         id: '2',
    //         type: '其他'
    //     },
    //     {
    //         selected: false,
    //         name: '大众点评支付',
    //         id: '3',
    //         type: '其他'
    //     },
    //     {
    //         selected: false,
    //         name: '支付宝',
    //         id: '4',
    //         type: '支付宝'
    //     },
    // ]
    // if(params && params.opEntityId) {
    //     context.commit('_getAllPayKindListSingle', data)
    // }
    // else{
    //     context.commit('_getAllPayKindList', data)
    // }
}
// 选择一个付款方式
export const selectOne = (context, params) => {
    let tmp = context.state.allPayKindList.concat();
    tmp.map(item => {
        if (item.moduleId === params.moduleId) {
            item.selected ? item.selected = false : item.selected = true
        }
    })
    context.commit('_getAllPayKindList', tmp)
}
// 选择一个付款方式
export const selectAll = (context, params) => {
    let tmp = context.state.allPayKindList.concat();
    tmp.map(item => {
        item.selected = params
    });
    context.commit('_getAllPayKindList', tmp)
}
