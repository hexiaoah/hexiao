/**
 * Created by zipai on 2019/7/11.
 */
import * as types from './mutation-types'

// 修改店铺信息
export const modifyShopInfo = ({ commit }, params) => {
  commit(types.MODIFY_SHOPINFO, params)
}

//底部弹出选择
export const pickerChange = ({ commit }, params) => {
  commit(types.PICKER_CHANGE, params)
}

//查询并更新直连已填写的数据
export const updataShopInfo = ({ commit }, params) => {
  commit(types.UPDATA_SHOPINFO, params)
}
//查询并更新通联已填写的数据
export const updataShopInfoTl = ({ commit }, params) => {
  commit(types.UPDATA_SHOPINFO_TL, params)
}
// 修改当前编辑状态
export const changeViewState = ({ commit }, params) => {
  commit(types.CHANGE_VIEWSTATE, params)
}
// 修改示例图片显示状态
export const changeExamplePhoto = ({ commit }, params) => {
  commit(types.CHANGE_EXAMPLE_PHOTO, params)
}
// 修改编辑状态
export const changeSubStatus = ({ commit }, params) => {
  commit(types.CHANGE_SUB_STATUS, params)
}
