import {
    INIT_DATA,
    FETCH_BATCH_LIST,
    FETCH_RECHARGE_LIST,
    RECHARGE_IMPORT_EVENT,
    SHOW_EDIT_LAYER,
    SET_SELECTED_COUNTER,
    SET_SELECTED_ROW_KEYS,
    BTN_LOCK,
    SHOW_SPIN,
    SET_STATUS,
    SET_LAYER_DEFAULT_VALUES,
    SET_START_VALUE,
    SET_END_VALUE
} from '../../constants'

const resetStatusList = (list) => {
    let final = {}
    list.forEach((m, i) => {
        let str = m.substring(0, 3)
        switch (str) {
            case '未充值':
                final.never = '0'
                break
            case '充值成':
                final.success = '1'
                break
            case '充值失':
                final.fail = '2'
                break
            case '已红冲':
                final.refund = '3'
                break
            default:
                return
        }
    })

    let arr = []
    for (let key in final) {
        arr.push(final[key])
    }
    const params = arr.length > 0 ? arr.join(',') : ''
    sessionStorage.setItem('rechargeStatusList', params)
}


const updownReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_DATA:
            return action.data
        case FETCH_BATCH_LIST:
            return Object.assign({}, state, {batchList: action.list})
        case FETCH_RECHARGE_LIST:
            sessionStorage.setItem('selectedList', '[]')
            const data = action.data
            const statusList = data.statusList || []
            resetStatusList(statusList)
            return Object.assign(
                {},
                state,
                {
                    cancelRechargeCount: data.cancelRechargeCount,
                    faiRechargeCount: data.faiRechargeCount,
                    name: data.name,
                    pageCount: data.pageCount,
                    preRechargeCount: data.preRechargeCount,
                    rechargeBatchDetailsViewList: data.rechargeBatchDetailsViewList,
                    rechargeBatchId: data.rechargeBatchId,
                    sucRechargeCount: data.sucRechargeCount,
                    totalCount: data.totalCount,
                    defaultPageSize: data.defaultPageSize,
                    selectedRowKeys: [],
                    currentPage: data.pageIndex || 1,
                    statusList: data.statusList
                }
            )
        case RECHARGE_IMPORT_EVENT:
            const args = action.data
            const obj = args.rechargeBatchVo || {}
            sessionStorage.setItem('oldBatchId', obj.id)
            sessionStorage.setItem('selectedList', '[]')
            const l = args.statusList || []
            resetStatusList(l)
            const list = args.rechargeBatchDetailsVoList || []
            return Object.assign(
                {},
                state,
                {
                    name: obj.name,
                    rechargeBatchId: obj.id,
                    rechargeBatchDetailsViewList: list,
                    cancelRechargeCount: args.cancelRechargeCount,
                    faiRechargeCount: args.faiRechargeCount,
                    pageCount: args.pageCount,
                    preRechargeCount: args.preRechargeCount,
                    sucRechargeCount: args.sucRechargeCount,
                    totalCount: args.totalCount,
                    selectedRowKeys: [],
                    currentPage: args.pageIndex || 1,
                    statusList: args.statusList
                }
            )
        case SHOW_EDIT_LAYER:
            return Object.assign({}, state, {showEditLayer: action.data})
        case SET_SELECTED_COUNTER:
            return Object.assign({}, state, {selectedCounter: action.len})
        case SET_SELECTED_ROW_KEYS:
            return Object.assign({}, state, {selectedRowKeys: action.selectedRowKeys})
        case BTN_LOCK:
            return Object.assign({}, state, {btnLocker: action.data})
        case SHOW_SPIN:
            return Object.assign({}, state, {showSpin: action.data})
        case SET_STATUS:
            return Object.assign({}, state, {statusList: action.list})
        case SET_START_VALUE:
            return Object.assign({}, state, {startValue: action.value})
        case SET_END_VALUE:
            return Object.assign({}, state, {endValue: action.value})
        case SET_LAYER_DEFAULT_VALUES:
            return Object.assign({}, state, {layerDefaultvalues: action.data})
        default:
            return state
    }
}

export default updownReducer
