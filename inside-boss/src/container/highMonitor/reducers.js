/**
 * Created by air on 2018/3/14.
 */
import {
    SET_HIGH_MONITOR,
    INIT_HIGH_MONITOR,
    SET_PAGE_INDEX
} from '../../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_HIGH_MONITOR:
            return Object.assign({}, state, {
                monitorList: action.data,
                monListLeg:action.data.length
            });
        case INIT_HIGH_MONITOR:
            return Object.assign({}, state, action.data)
        case SET_PAGE_INDEX:
            return Object.assign({}, state, {
                pageNumber: action.data
            })
        default:
            return state
    }
}


