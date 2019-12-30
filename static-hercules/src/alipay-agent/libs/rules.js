export const ruleList = {
  /***
   * 特约商户资料提交
   */
  alipayAccount: {
    isRequired: true,
    types: 'text',
    name: '支护宝账号'
  },
  linkman: {
    isRequired: true,
    types: 'text',
    name: '联系人姓名'
  },
  mobile: {
    isRequired: true,
    types: 'mobile',
    name: '联系人手机号'
  },
  email: {
    isRequired: true,
    types: 'email',
    name: '常用邮箱'
  },
  industryType: {
    isRequired: true,
    types: 'text',
    name: '经营类目'
  },

  shopPhoto: {
    isRequired: true,
    types: 'img',
    name: '店铺门头照'
  }
}
/**
 * 特约商户资料提交表单验证
 * @param val 用户输入的值
 * @param dataVal ruleList对应的key
 * @return  object  {
 *                      data: false,  验证是否通过
 *                     message: data.name + '不能为空'  false的时候需要message值
 *                  }
 * */
export const inputValIsOk = function(val, dataVal) {
  let data = ruleList[dataVal]
  if (typeof val === 'string') {
    val = val.replace(/(^\s*)|(\s*$)/g, '') //去空格
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
  let returnData = getSwitchMatchResult(val, data)
  return returnData
}

/**
 * 表单验证修改联系信息部分
 * */

/**
 * 根据类型判断
 */
const getSwitchMatchResult = (val, data) => {
  let returnData
  switch (data.types) {
    case 'number': //验证数字
      returnData = getMatchResult(/^[0-9]*$/, val, data.name)
      break
    case 'mobile': //验证手机号码
      returnData = getMatchResult(/^[1][0-9]{10}$/, val, data.name)
      break
    case 'tel': //验证电话(3-20位数字|连字符)
      returnData = getMatchResult(/^([0-9-]){3,20}$/, val, data.name)
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
    case 'id': // 证件号码
      returnData = getMatchResult(
        /(^[0-9]{15}$)|(^[0-9]{17}([0-9]|X|x)$)/,
        val,
        data.name
      )
      break
    case 'twoToThirty': // 2-30
      returnData = getMatchResult(
        /^([A-Za-z0-9]{2,30})|([\u4e00-\u9fa5]{1,15})|([\u4e00-\u9fa5][\w\W]{2})$/,
        val,
        data.name
      )
      break
    case 'bankCardId': // 银行卡
      returnData = getMatchResult(
        /^[623501|621468|620522|625191|622384|623078|940034|622150|622151|622181|622188|955100|621095|620062|621285|621798|621799|621797|22199|621096|62215049|62215050|62215051|62218849|62218850|62218851|621622|623219|621674|623218|621599|623698|623699|623686|621098|620529|622180|622182|622187|622189|621582|623676|623677|622812|622810|622811|628310|625919|625368|625367|518905|622835|625603|625605|518905]/,
        val,
        data.name
      )
      break
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
  let r
  r = val.match(reg)
  if (r == null) {
    return { data: false, message: '请上传正确的' + name }
  } else {
    return { data: true }
  }
}
