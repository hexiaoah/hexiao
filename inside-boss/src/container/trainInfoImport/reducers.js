import {
    INIT_TRAIN_DATA,
    SET_TRAIN_LIST,
    SET_CUR_NUM
} from '../../constants'

const routeInfoImportReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_TRAIN_DATA:
            return action.data
        case SET_TRAIN_LIST:
            return Object.assign({}, state, {
                trainList: action.data.records,
                trainListTotal : action.data.totalRecord
            })
        case SET_CUR_NUM:
            return Object.assign({}, state, {
                pageNumber:action.data
            })
        default:
            return state
    }
}

export default routeInfoImportReducer
