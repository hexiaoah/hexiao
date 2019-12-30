import {
    INIT_ROUTE_DATA,
    SET_ROUTE_LIST,
    SET_CUR_INDEX
} from '../../constants'

const routeInfoImportReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_ROUTE_DATA:
            return action.data
        case SET_ROUTE_LIST:
            return Object.assign({}, state, {
                routeList: action.data.records,
                routeListTotal : action.data.totalRecord
            })
        case SET_CUR_INDEX:
            return Object.assign({}, state, {
                pageNumber:action.data
            })
        default:
            return state
    }
}

export default routeInfoImportReducer
