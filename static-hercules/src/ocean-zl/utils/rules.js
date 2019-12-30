// 字符串长度2～10
const twoToTen = /^\w{2,10}$/

// 字符串长度1～15
const oneToFifteen = /^\w{1,15}$/

// 字符串1～40
const oneToForty = /^\w{1,40}$/

// 验证手机
const checkTel = /^[1][0-9]{10}$/

export const ruleList = {
  shopName: {
    isRequired: true,
    types: 'text',
    name: '店铺名称'
  },
  alipayAccount: {
    isRequired: true,
    types: 'text',
    name: '支付宝账号'
  },
  detailAddress: {
    isRequired: true,
    types: 'text',
    name: '店铺地址'
  },

  businessLicensePhoto: {
    isRequired: true,
    types: 'img',
    name: '营业执照'
  },
  shopPhoto: {
    isRequired: true,
    types: 'img',
    name: '店铺门头照'
  },
  shopCashierPhoto: {
    isRequired: true,
    types: 'img',
    name: '收银台照片'
  },
  indoorPhoto: {
    isRequired: true,
    types: 'img',
    name: '店内环境'
  },
  otherPlatformPhoto: {
    isRequired: true,
    types: 'img',
    name: '其他平台'
  }
}

export const ruleListTl = {
  shopName: {
    isRequired: true,
    types: 'text',
    name: '店铺名称'
  },
  businessLicenseName: {
    isRequired: true,
    types: 'text',
    name: '营业执照名称'
  },
  provinceName: {
    isRequired: true,
    types: 'text',
    name: '省份'
  },
  cityName: {
    isRequired: true,
    types: 'text',
    name: '城市'
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

  businessLicensePhoto: {
    isRequired: true,
    types: 'img',
    name: '营业执照'
  },
  shopPhoto: {
    isRequired: true,
    types: 'img',
    name: '店铺门头照'
  },
  shopCashierPhoto: {
    isRequired: true,
    types: 'img',
    name: '收银台照片'
  },
  indoorPhoto: {
    isRequired: true,
    types: 'img',
    name: '店内环境'
  },
  otherPlatformPhoto: {
    isRequired: true,
    types: 'img',
    name: '其他平台'
  }
}
/**
 * 表单验证
 * @param val 用户输入的值
 * @param dataVal ruleList对应的key
 * @return  object  {
 *                      data: false,  验证是否通过
 *                     message: data.name + '不能为空'  false的时候需要message值
 *                 }
 * */

export const inputIsOk = function(val, dataVal, source) {
  let data = {}
  if (source === 'tl') {
    data = ruleListTl[dataVal]
  } else {
    data = ruleList[dataVal]
  }

  //如果不存在，或者isRequired=false，则说明是不需要验证的字段
  if (!data || !data.isRequired) {
    return { data: true }
  }
  if (data.types === 'boolean') {
    if (typeof val !== 'boolean') {
      return { data: false, message: data.name + '不能为空' }
    }
  } else {
    if (!val) {
      return { data: false, message: data.name + '不能为空' }
    }
  }

  //类型判断
  let returnData
  switch (data.types) {
    case 'number': //验证数字
      returnData = getMatchResult(/^[0-9]*$/, val, data.name)
      break
    case 'mobile': //验证手机号码
      returnData = getMatchResult(/^[1][0-9]{10}$/, val, data.name)
      break
    case 'tel': //验证电话
      returnData = getMatchResult(/^[0-9]{5,15}$/, val, data.name)
      break
    case 'email':
      returnData = getMatchResult(
        /(^([a-zA-Z0-9_-]{2,})+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z0-9_-]{2,})+)|(^$)/,
        val,
        data.name
      )
      break
    case 'img':
      returnData = getMatchResult(/^[http|https]/, val, data.name)
      break
    default:
      returnData = { data: true }
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
  let r
  r = val.match(reg)
  if (r == null) {
    return { data: false, message: '请上传正确的' + name }
  } else {
    return { data: true }
  }
}
