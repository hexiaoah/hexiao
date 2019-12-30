import { SET_GOOD_TAG_IMAGE, SET_MODULE_DETAIL,SET_UPDATE_MODULE_RESULT } from '../../constants'
const priceTagEditReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_GOOD_TAG_IMAGE:
            return Object.assign({}, state, {
                upLoadGoodTagImage: action.data
            })
        case SET_MODULE_DETAIL:
            return Object.assign({}, state, {
                moduleDetail: action.data
            })
        case SET_UPDATE_MODULE_RESULT:
            return Object.assign({}, state, {
                updateModuleResult: action.data
            })
        default:
            return state
    }
}

export default priceTagEditReducer
