/**
 * Created by zipai on 2019/7/11.
 */
import Vue from 'vue'
import * as types from './mutation-types'

export default {
  // 修改店铺信息
  [types.MODIFY_SHOPINFO](state, payload) {
    if (payload.formId === 'tl') {
      Vue.set(state.applyInfoTl, payload.type, payload.value)
    } else {
      Vue.set(state.applyInfo, payload.type, payload.value)
    }
  },
  //底部弹出选择
  [types.PICKER_CHANGE](state, payload) {
    state.picker = { ...state.picker, ...payload }
  },
  //查询并更新直连已填写的数据
  [types.UPDATA_SHOPINFO](state, payload) {
    state.applyInfo = { ...state.applyInfo, ...payload }
  },
  //查询并更新通联已填写的数据
  [types.UPDATA_SHOPINFO_TL](state, payload) {
    state.applyInfoTl = { ...state.applyInfoTl, ...payload }
  },
  //修改当前编辑状态
  [types.CHANGE_VIEWSTATE](state, payload) {
    state.viewState = payload
  },
  //修改当前编辑状态
  [types.CHANGE_EXAMPLE_PHOTO](state, payload) {
    state.examplePhoto = { ...state.examplePhoto, ...payload }
  },
  //修改编辑状态
  [types.CHANGE_SUB_STATUS](state, payload) {
    state.subStatus = payload
  }
}
