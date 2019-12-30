
import ActionTypes from '../../action/type'
import { formatActivityList } from '../../format/mall'

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ACTIVITY_LIST_SUCCESS:
            const list = formatActivityList(action.data)
            return Object.assign({}, state, {
                activityList: list
            })
        
        default:
            return state
    }
}


