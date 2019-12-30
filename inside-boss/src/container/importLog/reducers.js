import {
    INIT_LOG_DATA,
    INIT_IMPORT_LOG_DATA,
    INIT_LOG_DETAIL_DATA
} from '../../constants'

const goodsReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_IMPORT_LOG_DATA:
            // Object.assign({}, state, {totalCount: action.data.totalCount})
            // console.log('count!!!',action.data.totalCount)
            return Object.assign({}, state, action.data)
        case INIT_LOG_DETAIL_DATA:
            return Object.assign({}, state, {detail: action.data})
        case INIT_LOG_DATA:
            return action.data
        default:
            return state
    }
}

export default goodsReducer
