import {
    INIT_TYPE_DATA,
    CHECKED_TYPE,
    DEL_TABLE_ITEM,
    ADD_CATEGORY

} from '../../constants'


const downCommReducer = (state = {}, action) => {
    switch (action.type) {
        case INIT_TYPE_DATA:
            return action.data
        case CHECKED_TYPE:
            return Object.assign({}, state, {checkedList: action.data})
        case DEL_TABLE_ITEM:
            return Object.assign({}, state, {tableData: action.data})
        case ADD_CATEGORY:
            return Object.assign({}, state, {treeData: action.data})
        // case FETCH_BATCH_LIST:
        //     return Object.assign({}, state, {batchList: action.list})
        // case SHOW_EDIT_LAYER:
        //     return Object.assign({}, state, {showEditLayer: action.data})
        // case SET_SELECTED_COUNTER:
        //     return Object.assign({}, state, {selectedCounter: action.len})
        // case SET_SELECTED_ROW_KEYS:
        //     return Object.assign({}, state, {selectedRowKeys: action.selectedRowKeys})
        // case BTN_LOCK:
        //     return Object.assign({}, state, {btnLocker: action.data})
        // case SHOW_SPIN:
        //     return Object.assign({}, state, {showSpin: action.data})
        // case SET_STATUS:
        //     return Object.assign({}, state, {statusList: action.list})
        // case SET_START_VALUE:
        //     return Object.assign({}, state, {startValue: action.value})
        // case SET_END_VALUE:
        //     return Object.assign({}, state, {endValue: action.value})
        // case SET_LAYER_DEFAULT_VALUES:
        //     return Object.assign({}, state, {layerDefaultvalues: action.data})
        default:
            return state
    }
}

export default downCommReducer
