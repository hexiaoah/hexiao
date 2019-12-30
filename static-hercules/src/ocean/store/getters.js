/**
 * Created by zyj on 2018/4/3.
 */

// 店铺原始基本信息
export const applyInfo = state => {
    return state.applyInfo
}

export const applyStepFirst = state => {
    return [
        'shopName',
        'shopSimpleName',
        'shopKind', 'shopKindName',
        'merchantType',
        'shopPhone',
        'provinceId',
        'provinceName',
        'cityId',
        'cityName',
        'townId',
        'townName',
        'streetId',
        'streetName',
        'detailAddress',
        'contactName',
        'contactMobile',
        'contactEmail'
    ]
}

export const applyStepSecond = state => {
    return [
        'corporationName',
        'corporationLinkTel',
        'certificateType',
        'certificateNum',
        'certificateFrontPic',
        'certificateBackPic',
        'creditCode',
        'businessLicenseName',
        'businessLicensePic',
        'otherCertificationPic',
        'businessCert'
    ]
}
export const applyStepThird = state => {
    return [
        'accountType',
        'accountName',
        'bankName',
        'bankProvince',
        'bankProvinceId',
        'bankCity',
        'bankCityId',
        'bankSubName',
        'idType',
        'idNumber',
        'idCardFrontPic',
        'idCardBackPic',
        'bankCode',
        'bankSubCode',
        'accountMobile',
        'accountNumber'
    ]
}
export const applyStepFourth = state => {
    return [
        // 'needMaterial',
        'doorPic',
        'checkoutCounterPic',
        'shopEvnPic',
        'otherPlatformPic',
        'smsCode'
    ]
}
/**
 * 获取getIdType显示的名字
 * */
export const getAccountType = state => {
    if (state.applyInfo.accountType == 1) {
        return '个人帐户'
    } else if (state.applyInfo.accountType == 2) {
        return '对公帐户'
    } else {
        return ''
    }
}
/**
 * 获取merchantType显示的名字
 * */
export const merchantTypeName = state => {
    if (state.applyInfo.merchantType == 2) {
        return '个体工商户'
    } else if (state.applyInfo.merchantType == 3) {
        return '企业商户'
    } else {
        return ''
    }
}
/**
 * 获取MerchantType
 */

export const getMerchantType = state => {
    return state.applyInfo.merchantType
}
// /**
//  * 获取NeedMaterial，显示值
//  */
//
// export const getNeedMaterial = state => {
//     return state.applyInfo.needMaterial ? '是' : '否'
// }
/**
 * 返回支行选择页面接口需要的bankCode，bankCityId值
 * */
export const bankSub = state => {
    let {bankCode, bankCityId} = state.applyInfo
    return {bankCode, bankCityId}
}
/**
 * 返回rule页面需要的数据
 * */
export const getRule = state => {
    let {shopName, certificateNum, corporationName, accountNumber, accountName, bankSubName} = state.applyInfo
    return {shopName, certificateType: '身份证', certificateNum, corporationName, accountNumber, accountName, bankSubName}
}


