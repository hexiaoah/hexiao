import Vue from 'vue'
import * as types from './mutation-types'

export default {
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

    // 修改商户信息
    [types.MODIFY_MERCHANT](state, payload) {
        Vue.set(state.merchantInfo, payload.type, payload.value)
    },

    //修改当前编辑状态
    [types.CHANGE_EXAMPLE_PHOTO](state, payload) {
        state.examplePhoto =  {...state.examplePhoto, ...payload}
    },
    
    //修改当前编辑状态
    [types.CHANGE_VIEWSTATE](state, payload) {
        state.viewState = payload
    },

}