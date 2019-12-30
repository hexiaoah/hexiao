import {
    INIT_UPLOAD_DATA,
    GET_UPLOAD_RESULT
} from '../../constants'

const uploadCommReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_UPLOAD_DATA:
            return action.data
        case GET_UPLOAD_RESULT:
            return Object.assign({}, state, {batchList: action.list})
        default:
            return state
    }
}

export default uploadCommReducer
