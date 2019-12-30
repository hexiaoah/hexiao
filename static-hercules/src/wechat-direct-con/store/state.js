/**
 * Created by huaixi on 2019/3/28.
 */
export default {
    //提交的所有字段信息
    merchantInfo: {
        //商户号
        merchantNum: "",
        //主体类型
        merchantType: "",
        //营业执照照片
        businessLicensePic: "",
        //营业执照注册号
        businessLicenseNum: "",
        //商户名称
        merchantName: "",
        //注册地址
        registerAddress: {
            province: {},
            city: {},
        },
        //法人名称
        corporationName: "",
        //营业期限
        businessDeadLine: true,
        //营业开始时间
        businessStartTime: "",
        //营业结束时间
        businessEndTime: "",
        //营业执照类型
        businessLicenseType: "",
        //个体工商户, 企业商户-三证合一, 企业商户-未三证合一
        merchantKind: 3,

        //组织机构代码证照片
        orgPhoto: "",
        //组织机构代码
        orgNo: "",
        //组织机构有效期开始时间
        orgStartTime: "",
        //组织机构有效期结束时间
        orgEndTime: "",

        wechatAuditType: 1,

        //特殊资质照片
        qualification: [],

        //====企业商户对公收款账号====//
        //开户名称
        businessAccountName: "",
        //开户银行
        businessAccountBank: "",
        businessAccountBankCode: "",
        //银行卡号
        businessAccountNumber: "",
        //开户省市
        businessAccountAddressProvince: "",
        businessAccountAddressProCode: "",
        businessAccountAddressCity: "",
        businessAccountAddressCityCode: "",
        //开户支行
        businessAccountSubBank: "",
        
        //微信审核提交时间
        applyTime: '',
        //小微升级提交时间
        upgradeTime: '',
        //=================================小微商户部分填写信息
        //门店名称
        shopName: "",
        //店铺所在地
        shopAddress: {
            province: {},
            city: {}
        },
        //详细地址
        detailAddress: "",
        //店铺门头照
        shopLicensePic: "",
        //店铺环境照
        shopEnvironmentPic: "",
        //客服电话
        serviceTel: "",
        //服务类型
        serviceType: "",
        //身份证正面
        idCardFront: "",
        //身份证反面
        idCardReverse: "",
        //身份证姓名
        idCardName: "",
        //证件号码
        idCardNumber: "",
        //身份证是否长久有效
        idCardEffLongTime: false,
        //开始时间
        startDate: "",
        //结束时间
        endDate: "",
        //商户简称
        userSimpleName: "",
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
        //手机号码
        userTelNumber: "",
        //联系邮箱
        userEmailNumber: "",

        //是否已启用小微
        isXWEnable: false
    },
    // 保存的id
    saveId: '',
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
    //switch开关
    switchControl: {
        switchName: '',
        switchValue: false,
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
     * first: 第一次提交
     * */
    viewState: 'first',
    //状态，number类型，当为31时代表进件成功报名失败，只可修改部分数据
    subStatus: 0,

    //服务端所需的小微部分字段信息
    paymentWxXwAuthInfo: {
        entityId: "",
        //门店名称
        shopName: "",
        //店铺所在地
        shopProvince: "",
        shopCity: "",
        //详细地址
        detailAddress: "",
        //店铺门头照
        shopPhoto: "",
        //店铺环境照
        indoorPhoto: "",
        //客服电话
        servicePhone: "",
        //服务类型
        industryType: "",
        //身份证正面
        certFront: "",
        //身份证反面
        certBack: "",
        //身份证姓名
        certName: "",
        //证件号码
        certNo: "",
        //开始时间
        certValidStartTime: "",
        //结束时间
        certValidEndTime: "",     
        wxXwBankInfo: {
            //开户名称
            accountName: "",
            //开户银行
            accountBank: "",
            //银行卡号
            accountNo: "",
            //开户省
            accountProvince: "",
            //开户市
            accountCity: "",
            //开户支行
            accountSubBank: "",
        },
        wxXwContactInfo: {
            //商户简称
            merchantShortName: "",
            //手机号码
            contactPhone: "",
            //联系邮箱
            email: "",
        }
    },

    paymentWxXwUpgradeInfo: {
        entityId: "",
        merchantType: "",
        businessLicensePhoto: "",
        businessLicenseNo: "",
        address: "",
        merchantName: "",
        legalPerson: "",
        licenseStartTime: "",
        licenseEndTime: "",
        isIntegrade: "",
        orgPhoto: "",
        orgNo: "",
        orgStartTime: "",
        orgEndTime: "",
        qualification1: "",
        qualification2: "",
        qualification3: "",
        qualification4: "",
        qualification5: "",
        wxXwBankInfo: {
            //开户名称
            accountName: "",
            //开户银行
            accountBank: "",
            //银行卡号
            accountNo: "",
            //开户省
            accountProvince: "",
            //开户市
            accountCity: "",
            //开户支行
            accountSubBank: "",
        }
    },

    accountVerifyInfo: {
        //付款户名
        accountName: "",
        //汇款金额
        payAmount: "",
        //收款卡号
        destinationAccountNumber: "",
        //收款户名
        destinationAccountName: "",
        //开户银行
        destinationAccountBank: "",
        //省市信息
        city: "",
        //备注
        remark: "",
        //截止日期
        deadlineTime: "",
    },

    wxXwContactInfo: {
        //商户简称
        merchantShortName: "",
        //手机号码
        contactPhone: "",
        //联系邮箱
        email: "",
    },

    wxXwBankInfo: {
        accountName: "",
        //开户银行
        accountBank: "",
        //银行卡号
        accountNo: "",
        //开户省
        accountProvince: "",
        //开户市
        accountCity: "",
        //开户支行
        accountSubBank: "",
    },

    merchantInfoString: '', // 保存表单初始的参数内容
    //小微升级页面数据有修改
    xwUpgradeChanged: false,
    // 是否是修改省市区字段
    isEditAddress: false,
    // 是否展示底部弹框
    ispopShow: false,
}