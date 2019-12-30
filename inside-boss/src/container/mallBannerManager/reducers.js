
import ActionTypes from '../../action/type'
import { formatBannerList } from '../../format/mall'

export default (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_BANNER_LIST_SUCCESS:
            const list = formatBannerList(action.data)
            return Object.assign({}, state, {
                bannerList: list
            })

        default:
            return state
    }
}


