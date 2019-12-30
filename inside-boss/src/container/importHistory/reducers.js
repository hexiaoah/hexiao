import {
    INIT_DATA_IMPORT_HISTORY,
    SET_IMPORT_HISTORY_LIST,
    SET_IMPORT_PAGE_NUM,
} from '../../constants'



const importReducer = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case INIT_DATA_IMPORT_HISTORY:
            return action.data
        case SET_IMPORT_HISTORY_LIST:
            return Object.assign({},state,
                {records:action.data.records,
                totalRecord:action.data.totalRecord})
        case SET_IMPORT_PAGE_NUM:
            return Object.assign({},state,{pageNum:action.data})
        default:
            return state
    }
}

export default importReducer
