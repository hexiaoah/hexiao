import types from '../actionTypes'
import { formatCustomPages } from '../formatters/api'


const initialState = {
    loadingStatus: null,    // null: 加载中/待加载, true: 加载成功，false: 加载失败
    list: null,
}


export default function customPagesReducer(state, action) {
    if (!state) state = initialState

    switch (action.type) {
        case types.CUSTOM_PAGES_LOADED:
            return {
                ...initialState,
                loadingStatus: true,
                list: formatCustomPages(action.data),
            }

        case types.CUSTOM_PAGES_LOAD_FAILED:
            return { ...initialState, loadingStatus: false }

        case types.CUSTOM_PAGES_NOT_LOAD:
            return { ...initialState, loadingStatus: true, list: [] }

        case types.CUSTOM_PAGES_RESET:
            return initialState

        default:
            return state
    }
}
