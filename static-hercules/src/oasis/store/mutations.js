/**
 * Created by zyj on 2018/4/3.
 */
import Vue from 'vue'
import * as types from './mutation-types'

export default{
  // 从接口获取到表单的所有信息
  [types.GET_APPLY_MATERIALS](state, payload){
    state.shopInfo = payload
  },
  // 修改店铺信息
  [types.MODIFY_SHOPINFO](state, payload){
    Vue.set(state.shopInfo, payload.type, payload.value)
  },
  // 修改picker里面的内容
  [types.MODIFY_PICKER_SLOT](state, payload){
    state.pickerSlots = payload
  },
  // 保存省列表
  [types.SAVE_PROVINCE_LIST](state, payload){
    state.provinceList = payload
  },
  // 修改 MODIFY_PICKER_CHANGE_VALUE 里面的值
  [types.MODIFY_PICKER_CHANGE_VALUE](state, payload){
    Vue.set(state.pickerChangeValue, payload.type, payload.value)
  },
  // hide 区县
  [types.HIDE_TOWN](state, payload){
    state.isHideDistrict = payload
  },
    //修改示例图片显示状态
    [types.CHANGE_EXAMPLE_PHOTO](state, payload) {
        state.examplePhoto =  {...state.examplePhoto, ...payload}
    },
}