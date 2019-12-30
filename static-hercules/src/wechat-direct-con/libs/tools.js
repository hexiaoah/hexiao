import sessionStorage from '@2dfire/utils/sessionStorage'
import {
    bankList
} from '../constant/address-config'

export default {

    // 将对象转换为接口需要的参数对象
    xwMerchantInfoToParam(merchantInfo,paymentWxXwAuthInfo) {
        paymentWxXwAuthInfo.entityId = sessionStorage.getItem('entityId')
        paymentWxXwAuthInfo.shopName = merchantInfo.shopName
        paymentWxXwAuthInfo.shopProvince = merchantInfo.shopAddress.province.name
        paymentWxXwAuthInfo.shopCity = merchantInfo.shopAddress.city.name
        paymentWxXwAuthInfo.detailAddress = merchantInfo.detailAddress
        paymentWxXwAuthInfo.shopPhoto = merchantInfo.shopLicensePic
        paymentWxXwAuthInfo.indoorPhoto = merchantInfo.shopEnvironmentPic
        paymentWxXwAuthInfo.servicePhone = merchantInfo.serviceTel
        if (merchantInfo.serviceType === '餐饮') {
            paymentWxXwAuthInfo.industryType = 'FOOD'
        } else if(merchantInfo.serviceType === '零售' || merchantInfo.serviceType === '线下零售') {
            paymentWxXwAuthInfo.industryType = 'RETAIL'
        }
        paymentWxXwAuthInfo.certFront = merchantInfo.idCardFront
        paymentWxXwAuthInfo.certBack = merchantInfo.idCardReverse
        paymentWxXwAuthInfo.certName = merchantInfo.idCardName
        paymentWxXwAuthInfo.certNo = merchantInfo.idCardNumber
        paymentWxXwAuthInfo.certValidStartTime = merchantInfo.startDate
        if (merchantInfo.idCardEffLongTime === true) {
            paymentWxXwAuthInfo.certValidEndTime = '长期'
        } else {
            paymentWxXwAuthInfo.certValidEndTime = merchantInfo.endDate
        }
        paymentWxXwAuthInfo.wxXwBankInfo.accountName = merchantInfo.accountName
        paymentWxXwAuthInfo.wxXwBankInfo.accountBank = merchantInfo.accountBank
        paymentWxXwAuthInfo.wxXwBankInfo.accountNo = merchantInfo.accountNumber
        paymentWxXwAuthInfo.wxXwBankInfo.accountProvince = merchantInfo.accountAddressProvince
        paymentWxXwAuthInfo.wxXwBankInfo.accountCity = merchantInfo.accountAddressCity
        paymentWxXwAuthInfo.wxXwBankInfo.accountSubBank = merchantInfo.accountSubBank
        paymentWxXwAuthInfo.wxXwContactInfo.contactPhone = merchantInfo.userTelNumber
        paymentWxXwAuthInfo.wxXwContactInfo.email = merchantInfo.userEmailNumber
        paymentWxXwAuthInfo.wxXwContactInfo.merchantShortName = merchantInfo.userSimpleName
        return paymentWxXwAuthInfo
    },

    // 将接口返回的对象参数转换为merchantInfo对象
    paramToXwMerchantInfo(paymentWxXwAuthInfo, merchantInfo) {
        merchantInfo.shopName = paymentWxXwAuthInfo.shopName
        merchantInfo.detailAddress = paymentWxXwAuthInfo.detailAddress
        merchantInfo.shopLicensePic = paymentWxXwAuthInfo.shopPhoto
        merchantInfo.shopEnvironmentPic = paymentWxXwAuthInfo.indoorPhoto
        merchantInfo.serviceTel = paymentWxXwAuthInfo.servicePhone
        if (paymentWxXwAuthInfo.industryType === 'FOOD') {
            merchantInfo.serviceType = '餐饮'
        } else if ((paymentWxXwAuthInfo.industryType === 'RETAIL')) {
            merchantInfo.serviceType = '线下零售'
        }
        merchantInfo.idCardFront = paymentWxXwAuthInfo.certFront
        merchantInfo.idCardReverse = paymentWxXwAuthInfo.certBack
        merchantInfo.idCardName = paymentWxXwAuthInfo.certName
        merchantInfo.idCardNumber = paymentWxXwAuthInfo.certNo
        merchantInfo.startDate = paymentWxXwAuthInfo.certValidStartTime
        if (paymentWxXwAuthInfo.certValidEndTime === '长期') {  // 身份证是否长久有效
            merchantInfo.idCardEffLongTime = true
            merchantInfo.endDate = ''
        } else {
            merchantInfo.idCardEffLongTime = false
            merchantInfo.endDate = paymentWxXwAuthInfo.certValidEndTime
        }

        merchantInfo.shopAddress = {
            "province": {"name": paymentWxXwAuthInfo.shopProvince},
            "city": {"name": paymentWxXwAuthInfo.shopCity}
        }
            
        merchantInfo.accountAddressProvince = paymentWxXwAuthInfo.wxXwBankInfo.accountProvince
        merchantInfo.accountAddressCity = paymentWxXwAuthInfo.wxXwBankInfo.accountCity
        merchantInfo.accountSubBank = paymentWxXwAuthInfo.wxXwBankInfo.accountSubBank
        merchantInfo.accountAddressProCode = ''
        merchantInfo.accountAddressCityCode = ''

        merchantInfo.accountName = paymentWxXwAuthInfo.wxXwBankInfo.accountName
        merchantInfo.accountBank = paymentWxXwAuthInfo.wxXwBankInfo.accountBank
        merchantInfo.accountBankCode = this.getBankCode(paymentWxXwAuthInfo.wxXwBankInfo.accountBank)
        merchantInfo.accountNumber = paymentWxXwAuthInfo.wxXwBankInfo.accountNo
        merchantInfo.userTelNumber = paymentWxXwAuthInfo.wxXwContactInfo.contactPhone
        merchantInfo.userEmailNumber = paymentWxXwAuthInfo.wxXwContactInfo.email
        merchantInfo.userSimpleName = paymentWxXwAuthInfo.wxXwContactInfo.merchantShortName
        return merchantInfo
    },

    // 将接口返回的升级信息的对象参数转换为merchantInfo对象
    paramToWxXwUpgradeInfo(paymentWxXwUpgradeInfo, merchantInfo) {
        merchantInfo.businessLicensePic = paymentWxXwUpgradeInfo.businessLicensePhoto
        merchantInfo.registerAddress = {
            "province": {"name": paymentWxXwUpgradeInfo.address},
            "city": {"name": ''}
        }
        merchantInfo.corporationName = paymentWxXwUpgradeInfo.legalPerson
        if (paymentWxXwUpgradeInfo.licenseEndTime == '长期') { 
            merchantInfo.businessDeadLine = false
            merchantInfo.businessEndTime = paymentWxXwUpgradeInfo.licenseEndTime
        } else {
            merchantInfo.businessDeadLine = true
            merchantInfo.businessEndTime = paymentWxXwUpgradeInfo.licenseEndTime
        }
        merchantInfo.businessStartTime = paymentWxXwUpgradeInfo.licenseStartTime
        merchantInfo.businessLicenseNum = paymentWxXwUpgradeInfo.businessLicenseNo
        merchantInfo.merchantName = paymentWxXwUpgradeInfo.merchantName
        merchantInfo.orgPhoto = paymentWxXwUpgradeInfo.orgPhoto
        merchantInfo.orgNo = paymentWxXwUpgradeInfo.orgNo
        merchantInfo.orgStartTime = paymentWxXwUpgradeInfo.orgStartTime
        merchantInfo.orgEndTime = paymentWxXwUpgradeInfo.orgEndTime
        if(paymentWxXwUpgradeInfo.isIntegrade == true) {
            merchantInfo.businessLicenseType = '已三证合一'
        } else {
            merchantInfo.businessLicenseType = '未三证合一'
        }

        if (paymentWxXwUpgradeInfo.merchantType == 'INDIVIDUAL') {
            merchantInfo.merchantType = '个体工商户'
        } else if(paymentWxXwUpgradeInfo.merchantType == 'ENTERPRISE') {
            merchantInfo.merchantType =  '企业商户'
        }
        
        merchantInfo.businessAccountName = paymentWxXwUpgradeInfo.wxXwBankInfo.accountName
        merchantInfo.businessAccountBank = paymentWxXwUpgradeInfo.wxXwBankInfo.accountBank
        merchantInfo.businessAccountBankCode = this.getBankCode(paymentWxXwUpgradeInfo.wxXwBankInfo.accountBank)
        merchantInfo.businessAccountNumber = paymentWxXwUpgradeInfo.wxXwBankInfo.accountNo
        merchantInfo.businessAccountAddressProvince = paymentWxXwUpgradeInfo.wxXwBankInfo.accountProvince
        merchantInfo.businessAccountAddressCity = paymentWxXwUpgradeInfo.wxXwBankInfo.accountCity
        merchantInfo.businessAccountSubBank = paymentWxXwUpgradeInfo.wxXwBankInfo.accountSubBank
        merchantInfo.businessAccountAddressProCode = ''
        merchantInfo.businessAccountAddressCityCode = ''

        merchantInfo.qualification.splice(0, merchantInfo.qualification.length)
        if(paymentWxXwUpgradeInfo.qualification1 != null && paymentWxXwUpgradeInfo.qualification1 != '') {
            merchantInfo.qualification.push(paymentWxXwUpgradeInfo.qualification1)
        }
        if(paymentWxXwUpgradeInfo.qualification2 != null && paymentWxXwUpgradeInfo.qualification2!= '') {
            merchantInfo.qualification.push(paymentWxXwUpgradeInfo.qualification2)
        }
        if(paymentWxXwUpgradeInfo.qualification3 != null && paymentWxXwUpgradeInfo.qualification3 != '') {
            merchantInfo.qualification.push(paymentWxXwUpgradeInfo.qualification3)
        }
        if(paymentWxXwUpgradeInfo.qualification4 != null && paymentWxXwUpgradeInfo.qualification4 != '') {
            merchantInfo.qualification.push(paymentWxXwUpgradeInfo.qualification4)
        }
        if(paymentWxXwUpgradeInfo.qualification5 != null && paymentWxXwUpgradeInfo.qualification5 != '') {
            merchantInfo.qualification.push(paymentWxXwUpgradeInfo.qualification5)
        }
        return merchantInfo
    },

    // 将接口返回的小微及升级部分信息的对象参数转换为merchantInfo对象
    paramToWxAllInfo(paymentWxXwAuthInfo, paymentWxXwUpgradeInfo, merchantInfo) {
        let authInfo = this.paramToXwMerchantInfo(paymentWxXwAuthInfo, merchantInfo)
        let upgradeInfo = this.paramToWxXwUpgradeInfo(paymentWxXwUpgradeInfo, authInfo)
        return upgradeInfo
    },

    // 根据银行name获取银行的code
    getBankCode(accountBank) {
        var aa = (accountBank !== '' && accountBank !== 'undefined')
        if (accountBank !== '' && accountBank !== 'undefined') {
            var length = bankList.length
            for (var i = 0; i < length; i++) {
                if (bankList[i].bankDisplayName === accountBank) {
                    return bankList[i].bankName
                }
            }
        }
        return ''
    },

    // 封装成修改收款银行卡接口需要的数据
    modifyWxXwBankInfoParam(merchantInfo, wxXwBankInfo) {
        wxXwBankInfo.accountName = merchantInfo.accountName
        wxXwBankInfo.accountBank = merchantInfo.accountBank
        wxXwBankInfo.accountNo = merchantInfo.accountNumber
        wxXwBankInfo.accountProvince = merchantInfo.accountAddressProvince
        wxXwBankInfo.accountCity = merchantInfo.accountAddressCity
        wxXwBankInfo.accountSubBank = merchantInfo.accountSubBank
        return wxXwBankInfo
    },

    // 封装成修改收款银行卡接口需要的数据--企业商户
    modifyWxXwBankInfoParamFromUpgrade(merchantInfo, wxXwBankInfo) {
        wxXwBankInfo.accountName = merchantInfo.businessAccountName
        wxXwBankInfo.accountBank = merchantInfo.businessAccountBank
        wxXwBankInfo.accountNo = merchantInfo.businessAccountNumber
        wxXwBankInfo.accountProvince = merchantInfo.businessAccountAddressProvince
        wxXwBankInfo.accountCity = merchantInfo.businessAccountAddressCity
        wxXwBankInfo.accountSubBank = merchantInfo.businessAccountSubBank
        return wxXwBankInfo
    },

    // 封装成修改收联系信息接口需要的数据
    modifyWxXwContactInfoParam(merchantInfo, wxXwContactInfo) {
        wxXwContactInfo.merchantShortName = merchantInfo.userSimpleName
        wxXwContactInfo.contactPhone = merchantInfo.userTelNumber
        wxXwContactInfo.email = merchantInfo.userEmailNumber
        return wxXwContactInfo
    },

    // 小微升级请求入参组装
    xwUpgradeInfoParam(merchantInfo, paymentWxXwUpgradeInfo) {
        paymentWxXwUpgradeInfo.entityId = sessionStorage.getItem('entityId')
        paymentWxXwUpgradeInfo.merchantType = merchantInfo.merchantType
        if (merchantInfo.merchantType == '个体工商户') {
            paymentWxXwUpgradeInfo.merchantType = 'INDIVIDUAL'
        } else if(merchantInfo.merchantType == '企业商户' ) {
            paymentWxXwUpgradeInfo.merchantType = 'ENTERPRISE'
        }
        paymentWxXwUpgradeInfo.businessLicensePhoto = merchantInfo.businessLicensePic
        paymentWxXwUpgradeInfo.businessLicenseNo = merchantInfo.businessLicenseNum
        paymentWxXwUpgradeInfo.address = merchantInfo.registerAddress.province.name+merchantInfo.registerAddress.city.name
        paymentWxXwUpgradeInfo.merchantName = merchantInfo.merchantName
        paymentWxXwUpgradeInfo.legalPerson = merchantInfo.corporationName
        paymentWxXwUpgradeInfo.licenseStartTime = merchantInfo.businessStartTime

        if(merchantInfo.businessLicenseType == '已三证合一') {
            paymentWxXwUpgradeInfo.isIntegrade = true
        } else if(merchantInfo.businessLicenseType == '未三证合一') {
            paymentWxXwUpgradeInfo.isIntegrade = false
        }

        if (merchantInfo.businessDeadLine == false) {
            paymentWxXwUpgradeInfo.licenseEndTime = '长期'
        } else {
            paymentWxXwUpgradeInfo.licenseEndTime = merchantInfo.businessEndTime
        }

        if(merchantInfo.businessLicenseType == '未三证合一') {
            paymentWxXwUpgradeInfo.orgPhoto = merchantInfo.orgPhoto
            paymentWxXwUpgradeInfo.orgNo = merchantInfo.orgNo
            paymentWxXwUpgradeInfo.orgStartTime = merchantInfo.orgStartTime
            paymentWxXwUpgradeInfo.orgEndTime = merchantInfo.orgEndTime
        }

        paymentWxXwUpgradeInfo.qualification1 = merchantInfo.qualification[0]
        paymentWxXwUpgradeInfo.qualification2 = merchantInfo.qualification[1]
        paymentWxXwUpgradeInfo.qualification3 = merchantInfo.qualification[2]
        paymentWxXwUpgradeInfo.qualification4 = merchantInfo.qualification[3]
        paymentWxXwUpgradeInfo.qualification5 = merchantInfo.qualification[4]

        if(merchantInfo.merchantType === '企业商户' ) {
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountName = merchantInfo.businessAccountName
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountBank = merchantInfo.businessAccountBank
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountNo = merchantInfo.businessAccountNumber
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountProvince = merchantInfo.businessAccountAddressProvince
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountCity = merchantInfo.businessAccountAddressCity
            paymentWxXwUpgradeInfo.wxXwBankInfo.accountSubBank = merchantInfo.businessAccountSubBank
        }
        // console.log('paymentWxXwUpgradeInfo:'+paymentWxXwUpgradeInfo)
        return paymentWxXwUpgradeInfo
    },

    // 打款信息
    xwUpgradePayParam(merchantInfo, accountVerifyInfo) {
        merchantInfo.accountName = accountVerifyInfo.accountName
        merchantInfo.payAmount = accountVerifyInfo.payAmount
        merchantInfo.destinationAccountNumber = accountVerifyInfo.destinationAccountNumber
        merchantInfo.destinationAccountName = accountVerifyInfo.destinationAccountName
        merchantInfo.destinationAccountBank = accountVerifyInfo.destinationAccountBank
        merchantInfo.city = accountVerifyInfo.city
        merchantInfo.remark = accountVerifyInfo.remark
        merchantInfo.deadlineTime = accountVerifyInfo.deadlineTime
        return merchantInfo
    }
}