import AppUtil from './AppUtil'

export default {
  setItem (key, value) {
    AppUtil.setToken(value)
  }
}