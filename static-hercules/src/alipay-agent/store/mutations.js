/**
 * Created by zipai on 2019/5/20.
 */
import Vue from 'vue'
import * as types from './mutation-types'

export default {
  // 修改商户信息
  [types.MODIFY_MERCHANT](state, payload) {
    Vue.set(state.merchantInfo, payload.type, payload.value)
  },
  // 修改商户信息
  [types.MODIFY_MERCHANT_INFO](state, payload) {
    Vue.set(state, 'merchantInfo', payload)
  },
  //底部弹出选择
  [types.PICKER_CHANGE](state, payload) {
    state.picker = { ...state.picker, ...payload }
  },

  //底部弹出日期选择
  [types.DATE_PICKER_CHANGE](state, payload) {
    state.dateNewPicker = { ...state.picker, ...payload }
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

  //修改是否展示底部弹框的值
  [types.IS_SHOW_POP](state, payload) {
    state.ispopShow = payload
  }
}
