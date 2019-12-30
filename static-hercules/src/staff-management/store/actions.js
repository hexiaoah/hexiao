/**
 * Created by huaixi on 2019/5/6.
 */
import * as types from './mutation-types'  

// 权限
export const modifyPermission = ({commit}, params) => {
    // commit(types.MODIFY_PERMISSION, params)
    commit('setState', {name: 'permissionList', value: params})
}

//底部弹出选择
export const pickerChange = ({
    commit
}, params) => {
    commit(types.PICKER_CHANGE, params)
}

// 修改是否展示top-header的保存按钮
export const modifyShowSaveButton = ({
    commit
}, params) => {
    commit(types.SHOW_SAVE_BUTTON, params)
}

export const changeInfo = ({
    commit
}, params) => {
    commit('setState', {
        name: params.type,
        value: params.value
    })
}

//修改职级相关信息
export const changeRankInfo = ({
    commit
}, params) => {
    commit(types.CHANGE_RANK_INFO, params)
}

export const assignRankInfo = ({
    commit
}, params) => {
    commit(types.ASSIGN_RANK_INFO, params)
}

export const changeTotalRankActionCount = ({
    commit
}, params) => {
    commit(types.CHANGE_TOTAL_RANK_ACTION_COUNT, params)
}


export const changeStaffInfo = ({  // 修改员工信息
    commit
}, params) => {
    commit(types.CHANGE_STAFF_INFO, params)
}

export const changeExtraAction = ({ // 修改设置项
    commit
}, params) => {
    commit(types.CHANGE_EXTRA_ACTION_INFO, params)
}
