// import {GATEWAY_BASE_URL, ENV} from 'apiConfig'
// import Requester from 'src/base/requester'
import Requester from 'src/base/interception'
import {configUrl} from './configUrl'
import catchError from '../libs/catchError'
import 'url-search-params-polyfill'

const headers = {
    token: sessionStorage.getItem('token'),
    lang: 'zh_CN'
}

const isToken = false

const isGw = true
/**
 * 查询开通状态
 * @returns applyType: 申请类型 openStatus: 申请状态
 * @constructor
 */

export const applyState = () => {
    // return Requester.get(configUrl.APPLY_STATE, {params: {}}, false)
    return Requester.get(configUrl.APPLY_STATE, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}

/**
 * 营业模式
 * @constructor
 */

export const shopKind = () => {
    // return Requester.post(configUrl.SHOP_KIND, {params: {}}, false)
    return Requester.post(configUrl.SHOP_KIND, null, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}


/**
 * 申请资料查询
 * @returns
 */
export const getShopInfo = () => {
    // return Requester.post(configUrl.GET_SHOP_INFO, {params: {}}, false)
    return Requester.post(configUrl.GET_SHOP_INFO, null, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}

/**
 * 获取中国行政区
 * @param sub_area_type 行政区域划分（province, city, town, street）
 * @param id 上级行政区域id
 */
export const getRegion = (sub_area_type, id) => {
    // return Requester.get(configUrl.GET_REGION, {
    //     params: {
    //         sub_area_type,
    //         id,
    //         need_sub_area: true
    //     }
    // }, false)
    return Requester.get(configUrl.GET_REGION, {
        isGw,
        isToken,
        headers,
        handleError: catchError,
        params: {
            sub_area_type,
            id,
            need_sub_area: true
        }
    }).then(data => ({ data }))
}

/**
 * 获取银行
 */
export const getBank = () => {
    // return Requester.get(configUrl.GET_BANK, {params: {}}, false)
    return Requester.get(configUrl.GET_BANK, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}

/**
 * 获取开户省份
 */
export const getBankProvince = (bankName) => {
    // return Requester.get(configUrl.GET_BANK_PROVINCE,
    //     {
    //         params: {
    //             bankName
    //         }
    //     }, false)
    return Requester.get(configUrl.GET_BANK_PROVINCE, {
        isGw,
        isToken,
        headers,
        handleError: catchError,
        params: {
            bankName
        }
    }).then(data => ({ data }))
}

/**
 * 获取开户城市
 */
export const getBankCity = (bankName, provinceNo) => {
    // return Requester.get(configUrl.GET_BANK_CITY, {
    //     params: {
    //         bankName,
    //         provinceNo
    //     }
    // }, false)
    return Requester.get(configUrl.GET_BANK_CITY, {
        isGw,
        isToken,
        headers,
        handleError: catchError,
        params: {
            bankName,
            provinceNo
        }
    }).then(data => ({ data }))
}

/**
 * 获取银行支行
 * @param bankName 银行支行code
 * @param cityNo 城市id
 */
export const getBankSub = (bankName, cityNo) => {
    // return Requester.get(configUrl.GET_BANK_SUB, {
    //     params: {
    //         bankName, cityNo
    //     }
    // }, false)
    return Requester.get(configUrl.GET_BANK_SUB, {
        isGw,
        isToken,
        headers,
        handleError: catchError,
        params: {
            bankName,
            cityNo
        }
    }).then(data => ({ data }))
}
/**
 * 发送验证码
 * @param mobile 手机号码
 */
export const sendCode = (mobile) => {
    // return Requester.get(configUrl.SEND_CODE, {params: {mobile}}, false)
    return Requester.get(configUrl.SEND_CODE, {
        isGw,
        isToken,
        headers,
        handleError: catchError,
        params: {
            mobile
        }
    }).then(data => ({ data }))
}
/**
 * 临时保存申请资料
 * @param  bluePlanInfoVo 审核信息
 * @param id
 */
export const getSaveShopInfo = (bluePlanInfoVo, id = '') => {
    // return Requester.post(configUrl.GET_SAVE_SHOP_INFO, {bluePlanInfoVo, id}, {emulateJSON: true}, false)
    let formdata = new URLSearchParams()
    formdata.append('bluePlanInfoVo', bluePlanInfoVo)
    formdata.append('id', id)

    return Requester.post(configUrl.GET_SAVE_SHOP_INFO, formdata, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}
/**
 * 临时保存申请资料
 * @param  bluePlanInfoVo 审核信息
 */
export const getSubmitShopInfo = (bluePlanInfoVo) => {
    // return Requester.post(configUrl.GET_SUBMIT_SHOP_INFO, {bluePlanInfoVo}, {emulateJSON: true}, false)

    let formdata = new URLSearchParams()
    formdata.append('bluePlanInfoVo', bluePlanInfoVo)

    return Requester.post(configUrl.GET_SUBMIT_SHOP_INFO, formdata, {
        isGw,
        isToken,
        headers,
        handleError: catchError
    }).then(data => ({ data }))
}


