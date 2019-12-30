/**
 * Created by zyj on 2018/4/3.
 */
import Vue from 'vue'
import * as types from './mutation-types'

export default {
    // 修改店铺信息
    [types.MODIFY_SHOPINFO](state, payload) {
        Vue.set(state.applyInfo, payload.type, payload.value)
    },
    // 修改保存的id
    [types.SAVE_INPUT_ID](state, payload) {
        state.saveId=payload
    },
    // 修改店铺补充信息
    [types.SUPPLEMENT_SHOPINFO](state, payload) {
        Vue.set(state.supplementInfo, payload.type, payload.value)
    },

    //底部弹出选择
    [types.PICKER_CHANGE](state, payload) {
        state.picker = {...state.picker, ...payload}
    },

    //查询并更新已填写的数据
    [types.UPDATA_SHOPINFO](state, payload) {
        state.applyInfo = {...state.applyInfo, ...payload}
        // if(payload.shopKind){
        //     state.supplementInfo.shopKind=payload.shopKind==2?'个体工商户':(payload.shopKind==3?'个体工商户':'')
        // }

    },
    //修改当前编辑状态
    [types.CHANGE_VIEWSTATE](state, payload) {
        state.viewState = payload
    },
    //修改当前编辑状态
    [types.CHANGE_EXAMPLE_PHOTO](state, payload) {
        state.examplePhoto =  {...state.examplePhoto, ...payload}
    },
    //修改编辑状态
    [types.CHANGE_SUB_STATUS](state, payload) {
        state.subStatus =  payload
    }
}