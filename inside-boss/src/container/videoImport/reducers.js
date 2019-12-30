import {
    SET_VIDEO_LIST,
    INIT_VIDEO_DATA,
    CHANGE_VIDEO_TYPE

} from '../../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_VIDEO_LIST:
            return Object.assign({},state,{
                videolist:action.data.records,
                total : action.data.totalRecord,
                length : action.data.records.length
            })
        case INIT_VIDEO_DATA:
            return action.data
        case CHANGE_VIDEO_TYPE :
            return Object.assign({},state ,{
                videoType : action.data
            })
        default:
            return state
    }
}


