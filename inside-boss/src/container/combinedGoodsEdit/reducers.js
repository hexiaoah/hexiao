import {
    SET_GOOD_CATEGORY_LIST,
    SET_GOOD_HEAD_PICTURE,
    SET_GOOD_ITEM_DETAIL,
    SET_COMBINED_GOOD_DETAIL,
    SET_GOOD_UNIT_LIST,
    SET_ITEM_LIST,
    SET_CHILD_SPEC_ITEMS,
    SET_SELECT_COMBINED_LIST,
    SET_SELECT_GOODS_SPEC,
    SET_FREIGHT_TEMPLATE,
    SET_FORAMT_SPEC_GOODS
} from '../../constants'

const combinedGoodsEdit = (state = {}, action) => {
    switch (action.type) {
        case SET_GOOD_CATEGORY_LIST:
            return Object.assign({}, state, {
                goodCategory: action.data
            })
        case SET_GOOD_HEAD_PICTURE:
            return Object.assign({}, state, {
                headPicture: action.data
            })
        case SET_COMBINED_GOOD_DETAIL:
            return Object.assign({}, state, {
                goodDetail: action.data
            })
        case SET_ITEM_LIST:
            return Object.assign({}, state, {
                itemList: action.data
            })
        case SET_GOOD_UNIT_LIST:
            return Object.assign({}, state, {
                unitList: action.data
            })
        case SET_GOOD_ITEM_DETAIL:
            return Object.assign({}, state, {
                goodItemDetail: action.data
            })
        case SET_SELECT_COMBINED_LIST:
            return Object.assign({}, state, {
                selectCombinedGoods: action.data
            })
        case SET_CHILD_SPEC_ITEMS:
            return Object.assign({}, state, {
                childSpecItems: action.data
            })
        case SET_SELECT_GOODS_SPEC:
            return Object.assign({}, state, {
                selectGoodsSpecList: action.data
            })
        case SET_FREIGHT_TEMPLATE:
            return Object.assign({}, state, {
                freightTemplate: action.data
            })
        case SET_FORAMT_SPEC_GOODS:
            return Object.assign({}, state, {
                formatSpecGoodsList: action.data
            })
        case SET_FREIGHT_TEMPLATE:
            return Object.assign({}, state, {
                freightTemplate: action.data
            })
        // case SET_COMBINED_HEAD_PICTURE:
        //     return Object.assign({}, state, {
        //         detailPicture: action.data
        //     })
        default:
            return state
    }
}
export default combinedGoodsEdit
