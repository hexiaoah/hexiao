/**
 * Created by zipai on 2019/7/11.
 */

export default {
  //支付宝直连 - 提交的所有字段信息
  applyInfo: {
    //    实体id
    entityId: sessionStorage.getItem('entityId') || '',
    //      店铺名称
    shopName: sessionStorage.getItem('shopName') || '',
    //      支付宝账号
    alipayAccount: '',
    //      详细地址
    detailAddress: '',
    //    营业执照
    businessLicensePhoto: '',
    //      店铺门头照
    shopPhoto: '',
    //      收银台照片
    shopCashierPhoto: '',
    //      店内环境
    indoorPhoto: '',
    //      其他平台
    otherPlatformPhoto: ''
  },
  // 支付宝间连-通联
  applyInfoTl: {
    //     实体id
    entityId: sessionStorage.getItem('entityId') || '',
    //      店铺名称
    shopName: sessionStorage.getItem('shopName') || '',
    //      营业执照名称
    businessLicenseName: '',
    //      省id
    provinceId: '',
    //      省名称
    provinceName: '',
    //      城市id
    cityId: '',
    //      城市名称
    cityName: '',
    //      区id
    townId: '',
    //      区名称
    townName: '',
    //      详细地址
    detailAddress: '',

    // businessLicensePhoto:
    //   'https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg',
    // shopPhoto:
    //   'https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg',
    // shopCashierPhoto:
    //   'https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg',
    // indoorPhoto:
    //   'https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg',
    // otherPlatformPhoto:
    //   'https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg'

    //    营业执照
    businessLicensePhoto: '',
    //      店铺门头照
    shopPhoto: '',
    //      收银台照片
    shopCashierPhoto: '',
    //      店内环境
    indoorPhoto: '',
    //      其他平台
    otherPlatformPhoto: ''
  },
  //底部选择弹出
  picker: {
    showPicker: false,
    pickerName: '', //当前选择的字段
    pickerSlots: [
      { defaultIndex: 0 } //默认选中第一个
    ],
    pickerTitle: '',
    other: '' //其他需要设置的值，省份需要设置id的值
  },
  //图片展示
  examplePhoto: {
    img: '',
    isShow: false
  },
  /**
   * 显示状态
   * detail: 查看详情，不可修改；
   * edit: 编辑修改，已提交之后，申请通过，并未可修改状态；
   * first: 第一次提交
   * */
  viewState: 'first'
}
