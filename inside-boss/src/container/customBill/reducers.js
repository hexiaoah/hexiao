import {
  INIT_DATA_BILL,
  SET_ALL_TMPL_TYPE,
  SET_ENTITY_TYPE,
  SET_TYPE_TMPL_LIST,
  SET_TYPE_TMPL_TITLE,
} from '../../constants'

const updownReducer = (state = {}, action) => {
    switch (action.type) {
      case INIT_DATA_BILL:
        return action.data
        case SET_ALL_TMPL_TYPE:
          return Object.assign({}, state, {allTmplType: action.data})
      case SET_ENTITY_TYPE:
          console.log('eeeee output {entityType: action.data}',state,{entityType: action.data});
          return Object.assign({}, state, {entityType: action.data})
      case SET_TYPE_TMPL_LIST:
          return Object.assign({}, state, {typeTmplList: action.data})
        case SET_TYPE_TMPL_TITLE:
          return Object.assign({}, state, {billTitle: action.data})
        default:
            return state
    }
}

export default updownReducer
