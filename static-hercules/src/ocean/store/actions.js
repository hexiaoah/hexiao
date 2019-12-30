/**
 * Created by zyj on 2018/4/3.
 */
import * as types from './mutation-types'
// import errorToast from 'src/oasis/libs/errorToast'
// import {getApplyMaterials, getRegion} from 'src/oasis/config/api'

// 修改店铺信息
export const modifyShopInfo = ({commit}, params) => {
    commit(types.MODIFY_SHOPINFO, params)
}
// 修改保存的id
export const saveInputId = ({commit}, params) => {
    commit(types.SAVE_INPUT_ID, params)
}
// 修改店铺补充信息（表单不需要提交）
export const supplementShopInfo = ({commit}, params) => {
    commit(types.SUPPLEMENT_SHOPINFO, params)
}

//底部弹出选择
export const pickerChange = ({commit}, params) => {
    commit(types.PICKER_CHANGE, params)
}

//查询并更新已填写的数据
export const updataShopInfo = ({commit}, params) => {
    commit(types.UPDATA_SHOPINFO, params)
}

// 修改当前编辑状态
export const changeViewState = ({commit}, params) => {
    commit(types.CHANGE_VIEWSTATE, params)
}
// 修改示例图片显示状态
export const changeExamplePhoto = ({commit}, params) => {
    commit(types.CHANGE_EXAMPLE_PHOTO, params)
}
// 修改编辑状态
export const changeSubStatus = ({commit}, params) => {
    commit(types.CHANGE_SUB_STATUS, params)
}