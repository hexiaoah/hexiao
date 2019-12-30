import {
    SET_GOOD_ITEM_DETAIL,
    SET_GOOD_CATEGORY_LIST,
    SET_GOOD_SKU_LIST,
    SET_GOOD_UNIT_LIST,
    SET_FREIGHT_TEMPLATE,
    SET_SELECTED_SKU_LIST,
    SET_SKU_TABLE_DATA,
    SET_GOOD_HEAD_PICTURE,
    SET_GOOD_DETAIL_PICTURE,
    SET_GOOD_STRATEGY
} from '../../constants'
const goodEditReducers = (state = {}, action) => {
    switch(action.type) {
        case SET_GOOD_ITEM_DETAIL:
            return Object.assign({}, state, {
                goodDetail: action.data
            })
        case SET_GOOD_HEAD_PICTURE:
            return Object.assign({}, state, {
                headPicture: action.data
            })
        case SET_GOOD_DETAIL_PICTURE:
            return Object.assign({}, state, {
                detailPicture: action.data
            })
        case SET_GOOD_CATEGORY_LIST:
            return Object.assign({}, state, {
                goodCategory: action.data
            })
        case SET_GOOD_SKU_LIST:
            return Object.assign({}, state, {
                goodSkuList: action.data
            })
        case SET_SELECTED_SKU_LIST:
            return Object.assign({}, state, {
                selectedSkuList: action.data
            })
        case SET_GOOD_UNIT_LIST:
            return Object.assign({}, state, {
                unitList: action.data
            })
        case SET_FREIGHT_TEMPLATE:
            return Object.assign({}, state, {
                freightTemplate: action.data
            })
        case SET_SKU_TABLE_DATA:
            return Object.assign({}, state, {
                skuTableData: action.data
            })
        case SET_GOOD_STRATEGY:
            return Object.assign({}, state, { strategy: action.data})
        default:
            return state
    }
}
export default goodEditReducers
