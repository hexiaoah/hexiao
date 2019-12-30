import {  SET_PRICE_TAG_MODULE } from '../../constants'
const priceTagReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_PRICE_TAG_MODULE:
            return Object.assign({}, state, { priceTagModuleList: action.data })
        default:
            return state
    }
}

export default priceTagReducer
