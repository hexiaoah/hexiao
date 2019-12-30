import sessionStorage from '@2dfire/utils/sessionStorage'

export default {
  // 将对象转换为接口需要的参数对象
  MerchantInfoToParam(merchantInfo) {
    const {
      alipayAccount,
      linkman,
      mobile,
      email,
      industryType,
      licensePhoto,
      licenseNo,
      isLongValid,
      startTime,
      endTime,
      shopPhoto
    } = merchantInfo
    let paymentAuthInfo = {
      entityId: sessionStorage.getItem('entityId') || '',
      alipayAccount,
      linkman,
      mobile,
      email,
      industryType: industryType === '餐饮' ? 'FOOD' : 'RETAIL',
      licensePhoto,
      licenseNo,
      isLongValid,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : '',
      shopPhoto
    }
    return paymentAuthInfo
  },

  // 将接口返回的对象参数转换为merchantInfo对象
  paramToMerchantInfo(data) {
    const {
      alipayAccount,
      linkman,
      mobile,
      email,
      industryType,
      licensePhoto,
      licenseNo,
      isLongValid,
      startTime,
      endTime,
      shopPhoto
    } = data
    let merchantInfo = {
      alipayAccount,
      linkman,
      mobile,
      email,
      industryType: industryType === 'FOOD' ? '餐饮' : '零售',
      licensePhoto,
      licenseNo,
      isLongValid,
      startTime: startTime ? startTime : '',
      endTime: endTime ? endTime : '',
      shopPhoto
    }
    return merchantInfo
  }
}
