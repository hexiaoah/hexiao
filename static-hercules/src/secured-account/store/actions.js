import * as types from './mutation-types'

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

// 修改商户信息
export const modifyInputInfo = ({commit}, params) => {
    commit(types.MODIFY_MERCHANT, params)
}

// 修改示例图片显示状态
export const changeExamplePhoto = ({commit}, params) => {
    commit(types.CHANGE_EXAMPLE_PHOTO, params)
}

// 修改当前编辑状态
export const changeViewState = ({commit}, params) => {
    commit(types.CHANGE_VIEWSTATE, params)
}