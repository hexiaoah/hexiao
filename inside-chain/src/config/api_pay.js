// 付款方式
import {API_BASE_URL} from "apiConfig";
import Requester from '@/base/requester'
import {GW} from '@2dfire/gw-params';

const AND = '&' + GW;

const API = {
    /**
     * 获取付款方式
     * opEntityId 被操作门店ID
     * kind	支付类型，全部-1
     * name	支付名称
     *
     */

    getKindPayList(params) {
        console.log('getKindPayList')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.getKindPayList" + AND,
            {
                // params: {
                //     opEntityId: params.opEntityId,
                //     kind: params.kind,
                //     name: params.name
                // }
                params: params
            }
        )
    },
    /**
     * 获取付款方式 下拉列表用
     */

    getPayKindListForSelect() {
        console.log('getPayKindListForSelect')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.getKindList" + AND,
        )
    },
    /**
     * 获取付款方式
     */

    checkAlipayPayment(params) {
        console.log('checkAlipayPayment')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.checkAlipayPayment" + AND,
            {
                params: params
            }
        )
    },
    /**
     * 修改支付宝优惠开关
     */

    updateAlipayPayment(params) {
        console.log('updateAlipayPayment')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.updateAlipayPayment" + AND,
            {
                params: params
            }
        )
    },
    /**
     * 保存支付方式-新建/编辑
     *
     * opEntityId         被操作门店ID
     * id                 新增不传，编辑必传
     * kind	              支付类型，全部-1
     * name	              支付名称
     * isInclude          是否计入实收
     * isOpenCashDrawer   是否打开钱箱
     * voucherForms []    代金券
     *   id               新增不传，编辑删除必传
     *   amount           面值
     *   sellPrice        售价
     *   isValid          是否删除。0删除，1不删除
     */
    saveKindPay(params) {
        console.log('saveKindPay')
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.saveKindPay" + AND,
            params,
            {
                emulateJSON: true
            }
        )
    },

    /**
     * 删除付款方式
     *
     *  opEntityId ，门店id
     *  id: 付款方式id
     */
    deleteKindPay(params) {
        console.log('deleteKindPay')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.deleteKindPay" + AND,{
                params: params
            }
        )
    },


    /**
     * 获取付款方式详情
     *
     * opEntityId         被操作门店ID
     * id                 付款方式id
     */
    getPayKindInfo(params) {
        console.log('getPayKindInfo')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.tradeconf.api.pay.service.IKindPayService.getKindPayDetail" + AND,{
                params: params
            }
        )
    }



}


export default API;
