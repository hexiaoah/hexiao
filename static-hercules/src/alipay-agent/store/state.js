/**
 * Created by zipai on 2019/5/20.
 */
export default {
  //提交的所有字段信息
  merchantInfo: {
    entityId: '', //entityId
    alipayAccount: '', //支护宝账号
    linkman: '', //联系人姓名
    mobile: '', //联系人手机号
    email: '', //常用邮箱
    industryType: '', //经营类目
    licensePhoto: '', //营业执照
    // licensePhoto:
    //   'https://assets.2dfire.com/frontend/9c881aebd52e43ac1b2dfe9baf3637a6.png', //营业执照
    licenseNo: '', //营业执照号码
    isLongValid: false, //营业执照是否长期有效
    startTime: '', //起始时间
    endTime: '', //到期时间
    // shopPhoto:
    //   'https://assets.2dfire.com/frontend/cb3a941bfcdbb74f9bad8e8697a85c66.jpg'
    shopPhoto: '' //店铺门头照
  },
  isEnable: false, //是否启用
  //底部选择弹出
  picker: {
    showPicker: false,
    pickerName: '', //当前选择的字段
    pickerSlots: [
      {
        defaultIndex: 0
      } //默认选中第一个
    ],
    pickerTitle: '',
    other: '' //其他需要设置的值，省份需要设置id的值
  },
  //底部日期选择弹出
  dateNewPicker: {
    showPicker: false,
    pickerName: '', //当前选择的字段
    pickerTitle: '', //当前标题
    pickerValue: '' //当前选中日期值
  },
  //底部地址选择器
  addressPicker: {
    showPicker: false,
    pickerName: '',
    pickerTitle: { province: {}, city: {} },
    topTitle: '选择地址'
  },
  //switch开关
  switchControl: {
    switchName: '',
    switchValue: false
  },
  //图片展示
  examplePhoto: {
    img: '',
    isShow: false
  },
  /**
   * 显示状态
   * detail: 查看详情，不可修改；
   * edit: 编辑修改，已提交之后，申请通过，并为可修改状态；
   * */
  viewState: 'edit', //状态，number类型，当为31时代表进件成功报名失败，只可修改部分数据
  merchantInfoString: '', // 保存表单初始的参数内容
  ispopShow: false // 是否展示底部弹框
}
