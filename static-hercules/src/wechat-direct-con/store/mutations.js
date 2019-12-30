/**
 * Created by huaixi on 2019/3/29.
 */
import Vue from 'vue'
import * as types from './mutation-types'

export default {
    // 修改商户信息
    [types.MODIFY_MERCHANT](state, payload) {
        Vue.set(state.merchantInfo, payload.type, payload.value)
    },

    //底部弹出选择
    [types.PICKER_CHANGE](state, payload) {
        state.picker = {...state.picker, ...payload}
    },

    //底部弹出日期选择
    [types.DATE_PICKER_CHANGE](state, payload) {
        state.dateNewPicker = {...state.picker, ...payload}
    },

    //底部弹出地址选择器
    [types.ADDRESS_PICKER_CHANGE](state, payload) {
        state.addressPicker = {
            ...state.picker,
            ...payload
        }
    },

    [types.SWITCH_CONTROL](state, payload) {
        state.switchControl = {
            ...state.switchControl,
            ...payload
        }
    },

    //修改当前编辑状态
    [types.CHANGE_VIEWSTATE](state, payload) {
        state.viewState = payload
    },

    //保存表单初始值
    [types.SAVE_MERCHANT_INFO](state, payload) {
        state.merchantInfoString = payload
    },

    //是否是修改省市区字段
    [types.IS_EDIT_ADDRESS](state, payload) {
        state.isEditAddress = payload
    },

    //修改是否展示底部弹框的值
    [types.IS_SHOW_POP](state, payload) {
        state.ispopShow = payload
    },
}