import {
  SET_BILL_STORE_MODAL,
  SET_BILL_STORE_SHOP_LIST,
  SET_BILL_STORE_BRANCH,
  SET_BILL_STORE_PROVINCE,
  SET_BILL_ACTIVE_SHOP,
  SET_USE_STORE_LIST
} from '../../constants'

const updownReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BILL_STORE_MODAL:
      return Object.assign({}, state, { visible: action.data.visible })
    case SET_BILL_STORE_SHOP_LIST:
      return Object.assign({}, state, { shopList: action.data })
    case SET_BILL_STORE_BRANCH:
      return Object.assign({}, state, { branch: action.data })
    case SET_BILL_STORE_PROVINCE:
      return Object.assign({}, state, { province: action.data })
    case SET_BILL_ACTIVE_SHOP:
      return Object.assign({}, state, { activeShopList: action.data })
    case SET_USE_STORE_LIST:
      return Object.assign({}, state, { useShopList: action.data })
    default:
      return Object.assign({}, state, action.data)
  }
}

export default updownReducer
