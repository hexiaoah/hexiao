
export const addStaffList = {
    userName: {
        isRequired: true,
        types: 'text',
        name: '姓名'
    },
    mobile: {
        isRequired: true,
        types: 'mobile',
        name: '手机号码'
    },
    roleName: {
        isRequired: true,
        types: 'text',
        name: '职级'
    },
    maxLimitSubZero: {
        isRequired: true,
        types: 'numberAndDot',
        name: '最大可去零额度（¥）'
    }
};

/**
 * 表单验证添加员工部分
 * @param val 用户输入的值
 * @param dataVal ruleList对应的key
 * @return  object  {
 *                      data: false,  验证是否通过
 *                     message: data.name + '不能为空'  false的时候需要message值
 *                 }
 * */
export const inputAddStaffIsOk = function (val, dataVal) {
    let data = addStaffList[dataVal]
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
 * 根据类型判断
 */
const getSwitchMatchResult = (val, data) => {
    let returnData;
    switch (data.types) {
        case 'mobile': //验证手机号码
            returnData = getMatchResult(/^[1][0-9]{10}$/, val, data.name)
            break;
        case "numberAndDot": //验证电话(3-20位数字|连字符)
            returnData = getMatchResult(/^([0-9.])*$/, val, data.name)
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
