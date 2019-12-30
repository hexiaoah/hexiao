import {
    // SET_VIDEO_LIST,
    // INIT_VIDEO_DATA,
    CHANGE_ORDER_TYPE,
    SET_ORDER_START_VALUE,
    SET_ORDER_END_VALUE,
    SET_ORDER_LIST,
    SHOW_SPIN,
    INIT_ORDER_DATA,
    SET_INVOICE_CODE

} from '../../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case INIT_ORDER_DATA:
            return action.data
        case CHANGE_ORDER_TYPE :
            return Object.assign({},state ,{
                orderType : action.data
            })
        case SET_ORDER_START_VALUE:
            return Object.assign({}, state, {startValue: action.value})
        case SET_ORDER_END_VALUE:
            return Object.assign({}, state, {endValue: action.value})
        case SET_INVOICE_CODE:
            return Object.assign({}, state, {invoiceCode: action.value})
        case SET_ORDER_LIST:
            return Object.assign({}, state, {
                orderList: action.data.records,
                length : action.data.records.length,
                total : action.data.totalRecord
            })
        case SHOW_SPIN:
            return Object.assign({}, state, {showSpin: action.data})
        default:
            return state
    }
}


