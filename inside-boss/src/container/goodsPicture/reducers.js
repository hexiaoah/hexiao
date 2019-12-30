import { combineReducers } from 'redux'
import {
    INIT_PICTURE_DATA,
    DETAIL_CHANGE,
    SET_PICTURE_LIST,
    LIST_DUPLICATED_ITEMS,
    BACK_TO_PICTURE_LIST,
    GET_DUPLICATED_ITEMS,
    SET_PICTURE_DETAIL_LIST,
    SET_PAGE_NUMBER,
    SET_SEARCH_NAME,
    SET_IS_SHOW_BRAND,
    SET_BRAND_LIST,
    SET_BRAND_ID,
    EDIT_TEMPLATE,
    TEMPLATE_DETAIL_DATA,
    TEMPLATE_LIST
} from '../../constants'

const pictureReducers = (state = {pageNumber:1}, action) => {
    const { data } = action;
    switch (action.type) {
        case INIT_PICTURE_DATA:
            return Object.assign({}, state, action.data)
        case BACK_TO_PICTURE_LIST:
            return {
                ...state,
                duplicated: false,
            }
        case LIST_DUPLICATED_ITEMS:
            return {
                ...state,
                pictureList: state.duplicatedItems,
                duplicated: true,
            }
        case GET_DUPLICATED_ITEMS:
            return {
                ...state,
                duplicatedItems: data,
                hasDuplicatedItems: data && (data.length > 0),
            }
        case SET_PICTURE_LIST:
          const {records={},totalRecord}=action.data||{}
            return Object.assign({}, state, {
                pictureList: records,
                pictureListTotal : totalRecord,
                pictureListLength : records.length,
            })
        case SET_PICTURE_DETAIL_LIST:
            return Object.assign({}, state, {
                pictureDetailList: action.data.detailPicList,
                pictureDetailListLength : action.data.detailPicList.length,
                pictureHeaderList: action.data.headPicList,
                pictureHeaderListLength : action.data.headPicList.length,
            })
        case SET_PAGE_NUMBER:
            return Object.assign({}, state, {
                pageNumber:action.data
            })
        case SET_SEARCH_NAME:
            return Object.assign({}, state, {
                searchName:action.data
            })
        case SET_IS_SHOW_BRAND:
            return Object.assign({},state,{isShowBrand:action.data})
        case SET_BRAND_ID:
            return Object.assign({},state,{brandId:action.data})
        case SET_BRAND_LIST:
            return Object.assign({},state,{brandList:action.data})
        case TEMPLATE_DETAIL_DATA:
            return Object.assign({},state,{
                templateDetail: JSON.parse(action.data.data.itemDetailJson).modules || []
            })
        case TEMPLATE_LIST:
            return Object.assign({}, state, {
                goodsDetailTemplate: action.data.data
            })
        default:
            return state
    }
}
const pictureDetailReducers =(state = {}, action) => {
    switch (action.type) {
        case DETAIL_CHANGE:
            return Object.assign({}, state, {
                 detail : action.data.detail,
                 pictureFileId : action.data.pictureFileId,
            })
        case EDIT_TEMPLATE:
            return Object.assign({}, state, {
                edit: action.data.edit,
                templateId: action.data.templateId,
            })
        default:
            return state
    }
}
const reducer = combineReducers({
    pictureReducers,
    pictureDetailReducers
})
export default reducer
