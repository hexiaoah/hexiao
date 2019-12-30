import types from '../actionTypes'
import { formatShopInfo } from '../formatters/api'


const initialState = {
    // null: 加载中/待加载, true: 加载成功，false: 加载失败
    loadingStatus: null,

    // ... shopInfo properties
}


export default function shopInfoReducer(state, action) {
    if (!state) state = initialState

    switch (action.type) {
        case types.SHOP_INFO_LOADED:
            return {
                ...initialState,
                loadingStatus: true,
                ...formatShopInfo(action.data),
            }

        case types.SHOP_INFO_LOAD_FAILED:
            return { ...initialState, loadingStatus: false }

        case types.SHOP_INFO_RESET:
            return initialState

        default:
            return state
    }
}
