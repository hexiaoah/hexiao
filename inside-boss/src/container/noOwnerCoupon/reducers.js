/**
 * Created by air on 2018/3/14.
 */
import {
    SET_NO_OWNER_COUPON,
    INIT_NO_OWNER_COUPON,
    SET_NO_OWNER_COUPON_LIST,
    SET_NO_OWNER_PAGE_NUM,
    SET_SEARCH_PARAM,
    IS_SHOW_SET_PAGE,
    SET_NO_OWNER_SET_LIST,
    SET_NO_SET_PAGE_NUM
} from '../../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case INIT_NO_OWNER_COUPON:
            return action.data
        case SET_NO_OWNER_COUPON:
            return Object.assign({}, state, {select: action.data})
        case SET_NO_OWNER_COUPON_LIST:
            return Object.assign({}, state, {
                list: action.data.list,
                listLeg: action.data.goodsListTotal
            })
        case SET_NO_OWNER_PAGE_NUM:
            return Object.assign({}, state, {pageNumber: action.data})
        case SET_SEARCH_PARAM:
            return Object.assign({}, state, {search: action.data})
        case IS_SHOW_SET_PAGE:
            return Object.assign({}, state, {setPageIsShow: action.data})
        case SET_NO_OWNER_SET_LIST:
            return Object.assign({}, state, {
                setList: action.data.list,
                setListLeg: action.data.goodsListTotal,
            })
        case SET_NO_SET_PAGE_NUM:
            return Object.assign({}, state, {setPageNumber: action.data})
        default:
            return state
    }
}


