/**
 * Created by huaixi on 2019/5/7.
 */

import Vue from 'vue'
import * as types from './mutation-types'

export default {
    // 修改权限
    [types.MODIFY_PERMISSION](state, payload) {
        Vue.set(state.permissionList, payload.type, payload.value)
    },
    
    setState(state, payload) {
        state[payload.name] = payload.value
    },

     //底部弹出选择
     [types.PICKER_CHANGE](state, payload) {
         state.picker = {
             ...state.picker,
             ...payload
         }
    },
     
    //修改是否展示top-header的保存按钮
    [types.SHOW_SAVE_BUTTON](state, payload) {
        state.isShowSaveButton=payload
    },

    [types.CHANGE_RANK_INFO](state, payload) {
        Vue.set(state.rank, payload.type, payload.value)
    },

    [types.ASSIGN_RANK_INFO](state, payload) {
        state.rank = payload
    },

    [types.CHANGE_TOTAL_RANK_ACTION_COUNT](state, payload) {
        state.totalRankActionCount = payload
    },
    // 修改员工信息
    [types.CHANGE_STAFF_INFO](state, payload) {
        Vue.set(state.staffInfo, payload.type, payload.value)
    },

    // 修改设置项
    [types.CHANGE_EXTRA_ACTION_INFO](state, payload) {
        Vue.set(state.extraActionInfo, payload.type, payload.value)
    },

}