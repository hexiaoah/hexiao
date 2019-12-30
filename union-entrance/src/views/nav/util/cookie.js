import cookie from '@2dfire/utils/cookie'
const getCookie = function(name, isParse = true) {
    let res = cookie.getItem(name)
    if (isParse) {
        try {
            res = JSON.parse(res) || {}
        } catch (e) {
            return {}
        }
    }
    return res
}
const setCookie = (name, value) => {
    cookie.setItem(name, value)
}
const clearCookies = function() {
    cookie.clear()
}
export default {
    getCookie,
    setCookie,
    clearCookies,
    delCookie: cookie.removeItem
}
