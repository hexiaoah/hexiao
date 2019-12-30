/**
 * Created by zipai on 2019/5/20.
 */

// 商户基本信息
export const merchantInfo = state => {
  return state.merchantInfo
}

export const merchantInfoKeys = state => {
  return [
    'entityId',
    'alipayAccount',
    'linkman',
    'mobile',
    'email',
    'industryType',
    'licensePhoto',
    'licenseNo',
    'isLongValid',
    'startTime',
    'endTime',
    'shopPhoto'
  ]
}

export const merchantOrgInfo = state => {
  return ['orgPhoto', 'orgNo', 'orgStartTime', 'orgEndTime']
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
