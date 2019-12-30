/**
 * Created by air on 2018/3/14.
 */
import {
    INIT_COUPON_DATA,
    INIT_COUPON_TYPE,
    GET_BATCH_LIST,
    SET_OLD_BATCH_ID,
    RECHARGE_LIST,
    CHANGE_STATUS,
    SHOW_SPIN,
    CHANGE_COUPON_TYPE,
    VISIBLE,
    SHOW
} from '../../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case INIT_COUPON_DATA:
            return Object.assign({}, state, action.data)
        case INIT_COUPON_TYPE:
            return Object.assign({}, state, action.data)
        case GET_BATCH_LIST:
            return Object.assign({}, state, {
                importFileList:action.data ? action.data.importFileList : []
            })
        case SET_OLD_BATCH_ID:
            return Object.assign({}, state, {
                oldBatchId:action.data
            })
        case RECHARGE_LIST:
            return Object.assign({}, state, action.data)
        case CHANGE_STATUS:
            return Object.assign({}, state, {
                status:action.data
            })
        case SHOW_SPIN:
            return Object.assign({}, state, {showSpin: action.data})
        case CHANGE_COUPON_TYPE:
            return Object.assign({}, state, {couponId: action.data})
        case VISIBLE:
            return Object.assign({}, state, {visible:action.data})
        case SHOW:
            return Object.assign({}, state, {show:action.data})
        default:
            return state
    }
}


