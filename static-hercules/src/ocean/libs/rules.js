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
     * step1
     */
    shopName: {
        isRequired: true,
        types: 'text',
        name: '店铺名称'
    },
    shopSimpleName: {
        isRequired: true,
        types: 'text',
        name: '店铺简称'
    },
    shopKind: {
        isRequired: true,
        types: 'text',
        name: '营业模式'
    },
    merchantType: {
        isRequired: true,
        types: 'text',
        name: '商户类型'
    },
    shopPhone: {
        isRequired: true,
        types: 'tel',
        name: '店铺电话'
    },

    provinceName: {
        isRequired: true,
        types: 'text',
        name: '省'
    },
    cityName: {
        isRequired: true,
        types: 'text',
        name: '市'
    },
    townName: {
        isRequired: true,
        types: 'text',
        name: '区'
    },
    detailAddress: {
        isRequired: true,
        types: 'text',
        name: '详细地址'
    },
    contactName: {
        isRequired: true,
        types: 'text',
        name: '联系人姓名'
    },
    contactMobile: {
        isRequired: true,
        types: 'mobile',
        name: '联系人手机号'
    },
    contactEmail: {
        isRequired: true,
        types: 'email',
        name: '邮箱'
    },
//  ======================
    /**
     * step2
     * */
    corporationName: {
        isRequired: true,
        types: 'text',
        name: '法人姓名'
    },
    corporationLinkTel: {
        isRequired: true,
        types: 'mobile',
        name: '联系电话'
    },
    certificateType: {
        isRequired: true,
        types: 'text',
        name: '证件类型'
    },
    certificateNum: {
        isRequired: true,
        types: 'text',
        name: '证件号码'
    },
    certificateFrontPic: {
        isRequired: true,
        types: 'img',
        name: '证件照片正面'
    },
    certificateBackPic: {
        isRequired: true,
        types: 'img',
        name: '证件照片反面'
    },
    creditCode: {
        isRequired: true,
        types: 'text',
        name: '统一社会信用代码'
    },
    businessLicenseName: {
        isRequired: true,
        types: 'text',
        name: '营业执照名称'
    },
    businessLicensePic: {
        isRequired: true,
        types: 'text',
        name: '营业执照'
    },
    otherCertificationPic: {
        isRequired: false,
        types: 'text',
        name: '其他证明'
    },
    businessCert: {
        isRequired: false,
        types: 'img',
        name: '开户许可证照片'
    },
//  ============================
    /**
     * step3
     * */
    accountType: {
        isRequired: true,
        types: 'text',
        name: '账户类型'
    },
    accountName: {
        isRequired: true,
        types: 'text',
        name: '开户人名称'
    },
    bankName: {
        isRequired: true,
        types: 'text',
        name: '开户银行'
    },
    bankProvince: {
        isRequired: true,
        types: 'text',
        name: '开户省份'
    },
    bankProvinceId: {
        isRequired: false,
    },
    bankCity: {
        isRequired: true,
        types: 'text',
        name: '开户城市'
    },
    bankCityId: {
        isRequired: false
    },
    bankSubName: {
        isRequired: true,
        types: 'text',
        name: '开户支行'
    },
    idType: {
        isRequired: true,
        types: 'text',
        name: '开户人证件类型'
    },
    idNumber: {
        isRequired: true,
        types: 'text',
        name: '开户人证件号码'
    },
    idCardFrontPic: {
        isRequired: true,
        types: 'img',
        name: '开户人证件照片正面'
    },
    idCardBackPic: {
        isRequired: true,
        types: 'img',
        name: '开户人证件照片反面'
    },
    bankCode: {
        isRequired: false,
    },
    bankSubCode: {
        isRequired: false,
    },
    accountMobile: {
        isRequired: true,
        types: 'mobile',
        name: '收款银行账号预留手机'
    },
    accountNumber: {
        isRequired: true,
        types: 'text',
        name: '收款银行账号'
    },
    // ==================================
    /**
     * step4
     * */
    // needMaterial: {
    //     isRequired: true,
    //     types: 'boolean',
    //     name: '是否需要支付宝台牌物料'
    // },
    doorPic: {
        isRequired: true,
        types: 'img',
        name: '门头照'
    },
    checkoutCounterPic: {
        isRequired: true,
        types: 'img',
        name: '收银台'
    },
    shopEvnPic: {
        isRequired: true,
        types: 'img',
        name: '店内环境照'
    },
    otherPlatformPic: {
        isRequired: true,
        types: 'img',
        name: '其他平台图片'
    },
    smsCode: {
        isRequired: true,
        types: 'text',
        name: '验证码'
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
