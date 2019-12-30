/**
 * Created by zyj on 2018/4/3.
 */

// 店铺原始基本信息
export const baseInfo = state => {
  let { shopName, shopCode, businessLicenseName, creditCode,
        contactName, contactMobile, contactEmail, otherPlateformName,
         wechatMerId } = state.shopInfo
  return {
    shopName, // 店铺名称
    shopCode, // 店铺编码
    businessLicenseName,  // 营业执照名称
    creditCode, // 统一社会信用代码
    contactName, // 	联系人名称
    contactMobile, // 联系人手机
    contactEmail, // 	联系人邮箱
    otherPlateformName, // 	其他平台店名
    // needMaterial,  // 是否需要邮寄物料
    wechatMerId // 特约商户id
  }
}

// 店铺原始地址
export const area = state => {
  let { provinceName, provinceId, cityName, cityId,
    townName, townId, streetName, streetId, detailAddress} = state.shopInfo
  return {
    provinceName,
    provinceId,
    cityName,
    cityId,
    townName,
    townId,
    streetName,
    streetId,
    detailAddress
  }
}

// 店铺原始图片
export const photos = state => {
  let { businessLicensePic, checkoutCounterPic,
    idCardBackPic, idCardFrontPic, otherPlateformPic,
    shopEvnPic, doorPic, otherCertificationPic1, otherCertificationPic2, otherCertificationPic3,saleWithDoorPic,saleWithActivityPic } = state.shopInfo
  return {
    businessLicensePic, // 营业执照照片
    checkoutCounterPic, // 收银台照片
    idCardBackPic, // 身份证反面照
    idCardFrontPic, // 身份证正面照
    otherPlateformPic, // 其他平台店名
    shopEvnPic, // 店铺环境照
    doorPic, // 门头照
      saleWithDoorPic,//商户门头照的合照
      saleWithActivityPic,//商户摇摇乐活动合照
    otherCertificationPic1,
    otherCertificationPic2,
    otherCertificationPic3
  }
}

