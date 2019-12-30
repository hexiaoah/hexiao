import types from '../actionTypes'
import { formatTemplates } from '../formatters/api'


const initialState = {
    loadingStatus: null,            // null: 加载中/待加载, true: 加载成功，false: 加载失败
    list: null,
}


export default function templatesReducer(state, action) {
    if (!state) state = initialState

    switch (action.type) {
        case types.TEMPLATES_LOADED:
            return {
                ...state,
                loadingStatus: true,
                list: formatTemplates(action.data),
            }

        case types.TEMPLATES_LOAD_FAILED:
            return { ...state, loadingStatus: false }

        case types.TEMPLATES_RESET:
            return initialState

        default:
            return state
    }
}
