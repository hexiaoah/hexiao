// 字符串长度2～10
const twoToTen = /^\w{2,10}$/

// 字符串长度1～15
const oneToFifteen = /^\w{1,15}$/

// 字符串1～40
const oneToForty = /^\w{1,40}$/

// 验证手机
const checkTel = /^[1][0-9]{10}$/

/***
 * 修改银行卡部分表单提交
 */
export const ruleUpdateBankList = {
    accountName: {
        isRequired: true,
        types: 'twoToThirty',
        name: '开户人名称'
    },
    idCard: {
        isRequired: true,
        types: 'id',
        name: '身份证号码'
    },
    accountBank: {
        isRequired: true,
        types: 'twoToThirty',
        name: '开户银行'
    },
    accountNumber: {
        isRequired: true,
        types: 'bankCardId',
        name: '银行卡号'
    },
    accountAddressProvince: {
        isRequired: true,
        types: 'twoToThirty',
        name: '开户省份'
    },
    accountAddressCity: {
        isRequired: true,
        types: 'twoToThirty',
        name: '开户城市'
    },
    accountSubBank: {
        isRequired: true,
        types: 'twoToThirty',
        name: '开户支行'
    },
    businessLicensePic: {
        isRequired: true,
        types: 'img',
        name: '绑卡公函'
    },
    userTelNumber: {
        isRequired: true,
        types: 'mobile',
        name: '手机号码'
    },
    authCode: {
        isRequired: true,
        types: 'number',
        name: '验证码'
    }
};

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
        return {data: false, message: '请输入正确的' + name}
    } else {
        return {data: true}
    }
}
