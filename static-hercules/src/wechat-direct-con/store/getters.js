/**
 * Created by huaixi on 2019/3/29.
 */

// 商户基本信息
export const merchantInfo = state => {
    return state.merchantInfo
}

export const merchantInfoStepFirst = state => {
    return [
        'merchantNum',
        'merchantType',
        'businessLicensePic',
        'businessLicenseNum',
        'merchantName',
        'registerAddress',
        'corporationName',
        'businessDeadLine',
        'businessStartTime',
        'businessEndTime',
        'businessLicense',
        'qualification'
    ]
}


export const merchantOrgInfo = state => {
    return [
        'orgPhoto',
        'orgNo',
        'orgStartTime',
        'orgEndTime'
    ]
}

export const merchantBusinessAccountInfo = state => {
    return [
        'businessAccountName',
        'businessAccountBank',
        'businessAccountBankCode',
        'businessAccountNumber',
        'businessAccountAddressProvince',
        'businessAccountAddressCity',
        'businessAccountSubBank'
    ]
}

 // 小微部分
export const XwMerchantInfoStepFirst = state => {
    return [
        'shopName',
        'detailAddress',
        'shopLicensePic',
        'shopEnvironmentPic',
        'serviceTel',
        'serviceType',
        'idCardFront',
        'idCardReverse',
        'idCardName',
        'idCardNumber',
        'startDate',
        'endDate',
        'userSimpleName',
        'accountName',
        'accountBank',
        'accountNumber',
        'accountAddressProvince',
        'accountAddressCity',
        'accountSubBank',
        'userTelNumber',
        'userEmailNumber'
    ]
}

 // 修改银行卡部分
 export const UpdateBankInfoFirst = state => {
     return [
         'accountName',
         'accountBank',
         'accountNumber',
         'accountAddressProvince',
         'accountAddressCity',
         'accountSubBank'
     ]
 }

 // 企业商户修改银行卡
 export const UpdateUpgradeBankInfoFirst = state => {
     return [
         'businessAccountName',
         'businessAccountBank',
         'businessAccountNumber',
         'businessAccountAddressProvince',
         'businessAccountAddressCity',
         'businessAccountSubBank'
     ]
 }

  // 修改联系信息部分
  export const UpdateContractInfoFirst = state => {
      return [
          'userSimpleName',
          'userTelNumber',
          'userEmailNumber'
      ]
  }
