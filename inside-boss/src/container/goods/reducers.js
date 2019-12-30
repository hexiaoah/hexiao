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
    SET_WHITE,
    SET_LAYER_DEFAULT_VALUES,
    SET_START_VALUE,
    SET_END_VALUE,
    SET_GOODS_LIST,
    SET_PAGE_INDEX,
    SET_IS_SHOW_BRAND,
    SET_BRAND_LIST,
    SET_BRAND_ID,
    SET_SHOW_SPECIFICATION,
    SET_CATEGORY_LIST,
    SET_SPEC_LIST,
    SET_UNIT_LIST,
    SET_ITEM_LIST,
    SET_GOOD_CATEGORY_LIST,
    SET_GOOD_STRATEGY,
    SET_GOOD_FACADE,
    SET_COMBINED_GOODS_LIST,
    SET_COMBINED_GOOD_DETAIL,
    SET_CHILD_GOODS_RESULT,
    SET_TEBLE_FIELDS_LIST,
    SET_TABLE_FIELDS_OPTIONS,
    SET_TABLE_OPTION_KEY,
    SET_MENU_LIST,
    SET_MODAL_VISIBLE,
    SET_RESULT_DATA,
    SET_TABLE_HEADER,
    SET_MENU_LANGUAGE,
    SET_TWINS_FILEDID,
    SET_GOODS_PARAMS,
    SET_HISTORY_DATA,

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


const goodsReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_DATA:
            return action.data
        case SET_GOODS_LIST:
            return Object.assign({}, state, {
                goodsList: action.data.records,
                goodsListTotal : action.data.totalRecord
            })
        case SET_PAGE_INDEX:
            return Object.assign({}, state, {
                pageNumber:action.data
            })
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
        case SET_WHITE:
            return Object.assign({}, state, {inWhite: action.data})
        case SET_START_VALUE:
            return Object.assign({}, state, {startValue: action.value})
        case SET_END_VALUE:
            return Object.assign({}, state, {endValue: action.value})
        case SET_LAYER_DEFAULT_VALUES:
            return Object.assign({}, state, {layerDefaultvalues: action.data})
        case SET_IS_SHOW_BRAND:
            return Object.assign({}, state, {isShowBrand:action.data})
        case SET_BRAND_LIST:
            return Object.assign({}, state, {brandList:action.data})
        case SET_BRAND_ID:
            return Object.assign({},state,{brandId:action.data})
        case SET_SHOW_SPECIFICATION:
            return Object.assign({},state,{showSpecification:action.data})
        case SET_CATEGORY_LIST:
            return Object.assign({}, state, {
                cateList: action.cateList,
                cateFlat: action.cateFlat,
            })
        case SET_SPEC_LIST:
            return Object.assign({}, state, {specList:action.data})
        case SET_UNIT_LIST:
            return Object.assign({}, state, {unitList:action.data})
        case SET_ITEM_LIST:
            return Object.assign({}, state, {item:action.data})
        case SET_GOOD_CATEGORY_LIST:
            return Object.assign({}, state, {goodsCategoryList:action.data})
        case SET_GOOD_STRATEGY:
            return Object.assign({}, state, { strategy: action.data})
        case SET_GOOD_FACADE:
            return Object.assign({}, state, { facadeService: action.data})
        case SET_COMBINED_GOODS_LIST:
            return Object.assign({}, state, { goodCombinedList: action.data })
        case  SET_COMBINED_GOOD_DETAIL:
            return Object.assign({}, state, { goodCombinedDetail: action.data })
        case SET_CHILD_GOODS_RESULT:
            return Object.assign({}, state, { childGoodsList: action.data })
        case SET_TEBLE_FIELDS_LIST:
                return Object.assign({}, state, { tableFieldsList:action.data })
        case SET_TABLE_FIELDS_OPTIONS:
                return Object.assign({}, state, { tableFieldsOptions:action.data })
        case SET_TABLE_OPTION_KEY:
            state.tableFieldsOptions[action.data.key].selectedList = action.data.list
            return Object.assign({}, state)
        case SET_MENU_LIST:
            return Object.assign({},state,{menuList:action.data})
        case SET_MODAL_VISIBLE:
            return Object.assign({},state,{modalVisible:action.data})
        case SET_RESULT_DATA:
            return Object.assign({},state,{resultData:action.data})
        case SET_TABLE_HEADER:
            return Object.assign({},state,{tableHeader:action.data})
        case SET_MENU_LANGUAGE:
                return Object.assign({},state,{menuLanguage:action.data})
        case SET_TWINS_FILEDID:
            return Object.assign({},state,{twinsFiledIdList:action.data})
        case SET_GOODS_PARAMS:
            return Object.assign({},state,{goodsParams:action.data})
        case SET_HISTORY_DATA:
            return Object.assign({},state,{historyDate:action.data})
        default:
            return state
    }
}

export default goodsReducer
