
export default {

    // 将接口返回的对象参数转换为staffInfo对象
    paramToStaffInfo(userVo, staffInfo) {
        staffInfo.userName = userVo.name
        staffInfo.mobile = userVo.mobile
        staffInfo.roleName = userVo.roleName
        staffInfo.roleId = userVo.roleId
        staffInfo.isSupper = userVo.isSupper
        
        return staffInfo
    },

    // 清空staffInfo信息
    clearStaffInfo(staffInfo) {
        staffInfo.userName = ''
        staffInfo.mobile = ''
        staffInfo.roleName = ''
        staffInfo.roleId = ''
        staffInfo.isSupper = 0

        return staffInfo
    },

    // 将接口返回的设置项信息转换为extraActionInfo对象
    paramToExtraActionValue(data, extraActionInfo) {
        for (let i = 0; i < data.length; i++) {
            let extraActionVo = data[i]
            if (extraActionVo.code === '0002') { // 允许对可打折商品进行打折开关
                if (extraActionVo.selectMode === 2) {
                    if (extraActionVo.value !== extraActionVo.defaultValue) { // value不等于默认值，打开开关
                        extraActionInfo.allowDiscount = true
                    } else {
                        extraActionInfo.allowDiscount = false
                    }
                } else {
                    extraActionInfo.allowDiscount = true
                }
                extraActionInfo.allowDiscountValue = extraActionVo.value
            }
            if (extraActionVo.code === '0003') { // 允许对不可打折商品进行打折开关
                if (extraActionVo.selectMode === 2) {
                    if (extraActionVo.value !== extraActionVo.defaultValue) {
                        extraActionInfo.noAllowDiscount = true
                    } else {
                        extraActionInfo.noAllowDiscount = false
                    }
                } else {
                    extraActionInfo.noAllowDiscount = true
                }
                extraActionInfo.noAllowDiscountValue = extraActionVo.value
            }
            if (extraActionVo.code === '0005') { // 限制去零额度开关
                if (extraActionVo.value === '1') {
                    extraActionInfo.limitSubZero = true
                } else {
                    extraActionInfo.limitSubZero = false
                }
            }
            if (extraActionVo.code === '0006') { // 最大可去零额度
                extraActionInfo.maxLimitSubZero = extraActionVo.value
            }
        }
        return extraActionInfo
    },

    // 将extraActionInfo对象转换为接口需要的类型
    extraActionValueToParam(extraActionInfo, data) {
        for (let i = 0; i < data.length; i++) {
            let extraActionVo = data[i]
            if (extraActionVo.code === '0002') { // 允许对可打折商品进行打折开关
                if (extraActionInfo.allowDiscount) {
                    extraActionVo.selectMode = 1
                } else {
                    extraActionVo.selectMode = 2
                    extraActionInfo.allowDiscountValue = extraActionVo.defaultValue
                }
                extraActionVo.value = extraActionInfo.allowDiscountValue
            }
            if (extraActionVo.code === '0003') { // 允许对不可打折商品进行打折开关
                if (extraActionInfo.noAllowDiscount) {
                    extraActionVo.selectMode = 1
                } else {
                    extraActionVo.selectMode = 2
                    extraActionInfo.noAllowDiscountValue = extraActionVo.defaultValue
                }
                extraActionVo.value = extraActionInfo.noAllowDiscountValue
            }
            if (extraActionVo.code === '0005') { // 限制去零额度开关
                if (extraActionInfo.limitSubZero) {
                    extraActionVo.value = '1'
                } else {
                    extraActionVo.value = '0'
                }
            }
            if (extraActionVo.code === '0006') { // 最大可去零额度
                if (extraActionInfo.limitSubZero) {
                    extraActionVo.value = extraActionInfo.maxLimitSubZero
                } else {
                    extraActionVo.value = extraActionVo.defaultValue
                }
            }
        }
        return data
    },
}