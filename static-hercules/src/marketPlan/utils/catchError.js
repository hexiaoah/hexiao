import Vue from 'vue'

let ERR_INFO = {
    "0001": "网络暂时开小差了，请稍后重试", 
    "0002": "网络暂时开小差了，请稍后重试", 
    "0003": "网络暂时开小差了，请稍后重试", 
    "0004": "网络暂时开小差了，请稍后重试", 
    "0005": "网络暂时开小差了，请稍后重试",  
}

function catchError(err) {
    // let message = ERR_INFO[err.errorCode] 
    let message=err.message;
    if (message) {
        Vue.prototype.$toast(message)
    } 
}

export default catchError
