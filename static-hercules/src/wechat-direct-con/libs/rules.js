// 字符串长度2～10
const twoToTen = /^\w{2,10}$/

// 字符串长度1～15
const oneToFifteen = /^\w{1,15}$/

// 字符串1～40
const oneToForty = /^\w{1,40}$/

// 验证手机
const checkTel = /^[1][0-9]{10}$/

export const ruleList = {
    /***
     * 小微升级
     */
    merchantNum: {
        isRequired: true,
        types: 'number',
        name: '商户号'
    },
    merchantType: {
        isRequired: true,
        types: 'text',
        name: '主体类型'
    },
    businessLicensePic: {
        isRequired: true,
        types: 'img',
        name: '营业执照照片'
    },
    businessLicenseNum: {
        isRequired: true,
        types: 'text',
        name: '营业执照注册号'
    },
    merchantName: {
        isRequired: true,
        types: 'text',
        name: '商户名称'
    },

    registerAddress: {
        isRequired: true,
        types: 'text',
        name: '注册地址'
    },
    corporationName: {
        isRequired: true,
        types: 'text',
        name: '法人名称'
    },
    businessStartTime: {
        isRequired: true,
        types: 'text',
        name: '开始时间'
    },
    businessEndTime: {
        isRequired: true,
        types: 'text',
        name: '结束时间'
    },
    businessLicenseType: {
        isRequired: true,
        types: 'text',
        name: '营业执照类型'
    },
    qualification: {
        isRequired: true,
        types: 'text',
        name: '特殊资质'
    },
    orgPhoto: {
        isRequired: true,
        types: 'text',
        name: '组织机构代码证照片'
    },
    orgNo: {
        isRequired: true,
        types: 'text',
        name: '组织机构代码'
    },
    orgStartTime: {
        isRequired: true,
        types: 'text',
        name: '组织机构有效期开始时间'
    },
    orgEndTime: {
        isRequired: true,
        types: 'text',
        name: '组织机构有效期结束时间'
    },
    businessAccountName: {
        isRequired: true,
        types: 'text',
        name: '开户名称'
    },
    businessAccountBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行'
    },
    businessAccountNumber: {
        isRequired: true,
        types: 'number',
        name: '银行卡号'
    },
    businessAccountAddressProvince: {
        isRequired: true,
        types: 'text',
        name: '开户省'
    },
    businessAccountAddressCity: {
        isRequired: true,
        types: 'text',
        name: '开户市'
    },
    businessAccountSubBank: {
        isRequired: true,
        types: 'text',
        name: '开户支行'
    },
};

/***
 * 小微商户部分表单提交
 */
export const ruleXwList = {
    shopName: {
        isRequired: true,
        types: 'text',
        name: '门店名称'
    },
    detailAddress: {
        isRequired: true,
        types: 'text',
        name: '详细地址'
    },
    shopLicensePic: {
        isRequired: true,
        types: 'text',
        name: '店铺门头照'
    },
    shopEnvironmentPic: {
        isRequired: true,
        types: 'img',
        name: '店铺环境照'
    },
    serviceTel: {
        isRequired: true,
        types: 'tel',
        name: '客服电话'
    },
    serviceType: {
        isRequired: true,
        types: 'text',
        name: '服务类型'
    },
    idCardFront: {
        isRequired: true,
        types: 'img',
        name: '身份证正面'
    },
    idCardReverse: {
        isRequired: true,
        types: 'img',
        name: '身份证反面'
    },
    idCardName: {
        isRequired: true,
        types: 'text',
        name: '身份证姓名'
    },
    idCardNumber: {
        isRequired: true,
        types: 'id',
        name: '证件号码'
    },
    startDate: {
        isRequired: true,
        types: 'text',
        name: '开始时间'
    },
    endDate: {
        isRequired: true,
        types: 'text',
        name: '结束时间'
    },
    userSimpleName: {
        isRequired: true,
        types: 'twoToThirty',
        name: '商户简称'
    },
    accountName: {
        isRequired: true,
        types: 'text',
        name: '开户名称'
    },
    accountBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行'
    },
    accountNumber: {
        isRequired: true,
        types: 'number',
        name: '银行卡号'
    },
    accountAddressProvince: {
        isRequired: true,
        types: 'text',
        name: '开户省'
    },
    accountAddressCity: {
        isRequired: true,
        types: 'text',
        name: '开户市'
    },
    accountSubBank: {
        isRequired: true,
        types: 'text',
        name: '开户支行'
    },
    userTelNumber: {
        isRequired: true,
        types: 'mobile',
        name: '手机号码'
    },
    userEmailNumber: {
        isRequired: true,
        types: 'email',
        name: '联系邮箱'
    }
};

/***
 * 修改银行卡部分表单提交
 */
export const ruleUpdateBankList = {
    accountBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行'
    },
    accountNumber: {
        isRequired: true,
        types: 'number',
        name: '银行卡号'
    },
    accountAddressProvince: {
        isRequired: true,
        types: 'text',
        name: '开户省'
    },
    accountAddressCity: {
        isRequired: true,
        types: 'text',
        name: '开户市'
    },
    accountSubBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行支行'
    }
};

/***
 * 修改银行卡部分表单提交--企业商户
 */
export const ruleUpdateUpgradeBankList = {
    businessAccountBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行'
    },
    businessAccountNumber: {
        isRequired: true,
        types: 'number',
        name: '银行卡号'
    },
    businessAccountAddressProvince: {
        isRequired: true,
        types: 'text',
        name: '开户省'
    },
    businessAccountAddressCity: {
        isRequired: true,
        types: 'text',
        name: '开户市'
    },
    businessAccountSubBank: {
        isRequired: true,
        types: 'text',
        name: '开户银行支行'
    }
};

/***
 * 修改联系信息部分表单提交
 */
export const ruleUpdateContractList = {
    userSimpleName: {
        isRequired: true,
        types: 'twoToThirty',
        name: '商户简称'
    },
    userTelNumber: {
        isRequired: true,
        types: 'mobile',
        name: '手机号'
    },
    userEmailNumber: {
        isRequired: true,
        types: 'email',
        name: '联系邮箱'
    }
};

/**
 * 表单验证
 * @param val 用户输入的值
 * @param dataVal ruleList对应的key
 * @return  object  {
 *                      data: false,  验证是否通过
  *                     message: data.name + '不能为空'  false的时候需要message值
  *                 }
 * */
export const inputIsOk = function (val, dataVal) {
    let data = ruleList[dataVal]
    //如果不存在，或者isRequired=false，则说明是不需要验证的字段
    if (!data || !data.isRequired) {
        return {data: true}
    }
    if (data.types === 'boolean') {
        if (typeof val !== 'boolean') {
            return {data: false, message: data.name + '不能为空'}
        }
    } else {
        if (!val) {
            return {data: false, message: data.name + '不能为空'}
        }
    }


    //类型判断
    let returnData;
    switch (data.types) {
        case "number"://验证数字
            returnData = getMatchResult(/^[0-9]*$/, val, data.name)
            break;
        case 'mobile'://验证手机号码
            returnData = getMatchResult(/^[1][0-9]{10}$/, val, data.name)
            break;
        case "tel"://验证电话
            returnData = getMatchResult(/^[0-9]{5,15}$/, val, data.name)
            break;
        case 'email':
            returnData = getMatchResult(/(^([a-zA-Z0-9_-]{2,})+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z0-9_-]{2,})+)|(^$)/, val, data.name)
            break;
        case 'img':
            returnData = getMatchResult(/^[http|https]/, val, data.name)
            break;
        default:
            returnData = {data: true}
    }
    return returnData
}

/**
 * 表单验证小微商户部分
 * @param val 用户输入的值
 * @param dataVal ruleList对应的key
 * @return  object  {
 *                      data: false,  验证是否通过
 *                     message: data.name + '不能为空'  false的时候需要message值
 *                 }
 * */
export const inputXwIsOk = function (val, dataVal) {
    let data = ruleXwList[dataVal]
    //如果不存在，或者isRequired=false，则说明是不需要验证的字段
    if (!data || !data.isRequired) {
        return {
            data: true
        }
    }
    if (data.types === 'boolean') {
        if (typeof val !== 'boolean') {
            return {
                data: false,
                message: data.name + '不能为空'
            }
        }
    } else {
        if (!val) {
            return {
                data: false,
                message: data.name + '不能为空'
            }
        }
    }

    //类型判断
    let returnData = getSwitchMatchResult(val, data)
    return returnData
}

/**
 * 表单验证修改银行卡部分
 * */
export const inputUpdateBankIsOk = function (val, dataVal) {
    let data = ruleUpdateBankList[dataVal]
    //如果不存在，或者isRequired=false，则说明是不需要验证的字段
    if (!data || !data.isRequired) {
        return {
            data: true
        }
    }
    if (!val) {
        return {
            data: false,
            message: data.name + '不能为空'
        }
    }

    //类型判断
    let returnData = getSwitchMatchResult(val, data)
    return returnData
}

/**
 * 表单验证修改银行卡部分--企业商户
 * */
export const inputUpdateUpgradeBankIsOk = function (val, dataVal) {
    let data = ruleUpdateUpgradeBankList[dataVal]
    //如果不存在，或者isRequired=false，则说明是不需要验证的字段
    if (!data || !data.isRequired) {
        return {
            data: true
        }
    }
    if (!val) {
        return {
            data: false,
            message: data.name + '不能为空'
        }
    }

    //类型判断
    let returnData = getSwitchMatchResult(val, data)
    return returnData
}

/**
 * 表单验证修改联系信息部分
 * */
export const inputUpdateContractIsOk = function (val, dataVal) {
    let data = ruleUpdateContractList[dataVal]
    //如果不存在，或者isRequired=false，则说明是不需要验证的字段
    if (!data || !data.isRequired) {
        return {
            data: true
        }
    }
    if (!val) {
        return {
            data: false,
            message: data.name + '不能为空'
        }
    }

    //类型判断
    let returnData = getSwitchMatchResult(val, data)
    return returnData
}

/**
 * 根据类型判断
 */
const getSwitchMatchResult = (val, data) => {
    let returnData;
    switch (data.types) {
        case "number": //验证数字
            returnData = getMatchResult(/^[0-9]*$/, val, data.name)
            break;
        case 'mobile': //验证手机号码
            returnData = getMatchResult(/^[1][0-9]{10}$/, val, data.name)
            break;
        case "tel": //验证电话(3-20位数字|连字符)
            returnData = getMatchResult(/^([0-9-]){3,20}$/, val, data.name)
            break;
        case 'email':
            returnData = getMatchResult(/(^([a-zA-Z0-9_-]{2,})+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z0-9_-]{2,})+)|(^$)/, val, data.name)
            break;
        case 'img':
            returnData = getMatchResult(/^[http|https]/, val, data.name)
            break;
        case 'id': // 证件号码
            returnData = getMatchResult(/(^[0-9]{15}$)|(^[0-9]{17}([0-9]|X|x)$)/, val, data.name)
            break;
        case 'twoToThirty': // 2-30
            returnData = getMatchResult(/^([A-Za-z0-9]{2,30})|([\u4e00-\u9fa5]{1,15})|([\u4e00-\u9fa5][\w\W]{2})$/, val, data.name)
            break;
        case 'bankCardId': // 银行卡
            returnData = getMatchResult(/^[623501|621468|620522|625191|622384|623078|940034|622150|622151|622181|622188|955100|621095|620062|621285|621798|621799|621797|22199|621096|62215049|62215050|62215051|62218849|62218850|62218851|621622|623219|621674|623218|621599|623698|623699|623686|621098|620529|622180|622182|622187|622189|621582|623676|623677|622812|622810|622811|628310|625919|625368|625367|518905|622835|625603|625605|518905]/, val, data.name)
            break;
        default:
            returnData = {
                data: true
            }
    }
    return returnData
}

/**
 * 返回正则效验结果
 * @param reg 正则效验规则
 * @param val 值
 * @param name 效验字段名字
 * @return  object  {
 *                      data: false,  验证是否通过
  *                     message: data.name + '不能为空'  false的时候需要message值
  *                 }
 * */
const getMatchResult = (reg, val, name) => {
    let r;
    r = val.match(reg);
    if (r == null) {
        return {data: false, message: '请上传正确的' + name}
    } else {
        return {data: true}
    }
}
