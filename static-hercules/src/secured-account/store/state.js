export default {
    // 是否是修改省市区字段
    isEditAddress: false,
    merchantInfo:{
        //开户名称
        accountName: "",
        //开户银行
        accountBank: "",
        accountBankCode: "",
        //银行卡号
        accountNumber: "",
        //开户省市
        accountAddressProvince: "",
        accountAddressProCode: "",
        accountAddressCity: "",
        accountAddressCityCode: "",
        //开户支行
        accountSubBank: "",
        accountSubBankCode:"",
        //手机号码
        userTelNumber: "",
        //身份证号
        idCard: "",
        //验证码
        authCode:'',
        //营业执照
        businessLicensePic:''
    },
    //底部选择弹出
    picker: {
        showPicker: false,
        pickerName: '', //当前选择的字段
        pickerSlots: [{
                defaultIndex: 0
            }, //默认选中第一个
        ],
        pickerTitle: '',
        other: '', //其他需要设置的值，省份需要设置id的值
    },
     //底部日期选择弹出
     dateNewPicker: {
        showPicker: false,
        pickerName: '',  //当前选择的字段
        pickerTitle: '', //当前标题
        pickerValue: '', //当前选中日期值
    },
    //底部地址选择器
    addressPicker: {
        showPicker: false,
        pickerName: '',
        pickerTitle: { province: {}, city: {} },
        topTitle: '选择地址'
    },
    /**
     * 显示状态
     * detail: 查看详情，不可修改；
     * edit: 编辑修改，已提交之后，申请通过，并为可修改状态；
     * first: 第一次提交
     * */
    viewState: 'first',
    //图片展示
    examplePhoto:{
        img:'',
        isShow:false
    },
}