import {
    SET_UPLOAD
} from '../../constants'

const goodImportReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_UPLOAD:
            return Object.assign({}, state, {upLoadMsg: action.data})
        default:
            return state
    }
}

export default goodImportReducer
