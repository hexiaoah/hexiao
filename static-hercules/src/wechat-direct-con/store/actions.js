/**
 * Created by huaixi on 2019/3/29.
 */
import * as types from './mutation-types'

// 修改商户信息
export const modifyInputInfo = ({commit}, params) => {
    commit(types.MODIFY_MERCHANT, params)
}

//底部弹出选择
export const pickerChange = ({commit}, params) => {
    commit(types.PICKER_CHANGE, params)
}

//底部弹出日期选择
export const openDatePicker = ({commit}, params) => {
    commit(types.DATE_PICKER_CHANGE, params)
}

//底部弹出地址选择器
export const openAddressPicker = ({commit}, params) => {
    commit(types.ADDRESS_PICKER_CHANGE, params)
}

//修改switch开关
export const changeSwitchControl = ({commit}, params) => {
    commit(types.SWITCH_CONTROL, params)
}

// 修改当前编辑状态
export const changeViewState = ({commit}, params) => {
    commit(types.CHANGE_VIEWSTATE, params)
}

 //保存表单初始值
export const saveMerchantInfo = ({commit}, params) => {
    commit(types.SAVE_MERCHANT_INFO, params)
}

 //是否是修改省市区字段
 export const saveIsEditAddress = ({
     commit
 }, params) => {
     commit(types.IS_EDIT_ADDRESS, params)
 }
 
export const saveIsPopShow = ({
    commit
}, params) => {
    commit(types.IS_SHOW_POP, params)
}