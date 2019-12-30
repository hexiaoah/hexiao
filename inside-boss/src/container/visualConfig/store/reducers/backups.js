import types from '../actionTypes'
import { formatBackups } from '../formatters/api'


const initialState = {
    loadingStatus: null,            // null: 加载中/待加载, true: 加载成功，false: 加载失败
    list: null,
}


export default function backupsReducer(state, action) {
    if (!state) state = initialState

    switch (action.type) {
        case types.BACKUPS_LOADED:
            return {
                ...state,
                loadingStatus: true,
                list: formatBackups(action.data),
            }

        case types.BACKUPS_LOAD_FAILED:
            return { ...state, loadingStatus: false }

        case types.BACKUPS_RESET:
            return initialState

        default:
            return state
    }
}
