/**
 * Created by zyj on 2018/4/3.
 */
export default {
    //提交的所有字段信息
    applyInfo: {
        // //    审核状态
        // auditStatus: "",
        // //    实体id
        // entityId: "",
        // //    id
        // id: "",
        // //    快递单号
        // expressNo: "",
        //==================================step1
        //      店铺名称
        shopName: "",
        //      店铺简称
        shopSimpleName: "",
        //      营业模式
        shopKind: "",
        //      营业模式名称
        shopKindName: "",
        //      商户类型：02:个体工商户；03:企业商户
        merchantType: "",
        //      店铺电话
        shopPhone: "",


        //      省id
        provinceId: "",
        //      省名称
        provinceName: "",
        //      城市id
        cityId: "",
        //      城市名称
        cityName: "",
        //      区id
        townId: "",
        //      区名称
        townName: "",
        //      街道id
        streetId: "",
        //      街道名称
        streetName: "",
        //      详细地址
        detailAddress: "",


        //      联系人
        contactName: "",
        //      联系人手机号
        contactMobile: "",
        //      联系人邮箱
        contactEmail: "",


//===========================step2

//      法人姓名
        corporationName: "",
        //      法人联系电话
        corporationLinkTel: "",
        //      法人证件类型：01:身份证，只能选择身份证
        certificateType: "01",
        //      法人证件号码
        certificateNum: "",
        //      法人证件图片正面
        certificateFrontPic: "",
        //      法人证件图片反面
        certificateBackPic: "",


        //      统一社会信用代码
        creditCode: "",
        //      营业执照名称
        businessLicenseName: "",
        //      营业执照照片
        businessLicensePic: "",
        //      其他证明
        otherCertificationPic: '',

        //      开户许可证照片(企业商户显示，个体工商户不显示)
        businessCert: "",

// ==========================step3

//      帐户类型
        accountType: "",//01：个人帐户,02：对公帐户 ,不可选择，如果商户类型选择个人，就是个人帐户，如果商户类型选择企业，那就是对公帐户；
        //      开户人名称
        accountName: "",
        //      开户银行
        bankName: "",
        //    银行代码
        bankCode: "",
        //      开户省份
        bankProvince: "",
        //      开户省份id
        bankProvinceId: "",
        //      开户城市
        bankCity: "",
        //      开户城市id
        bankCityId: "",
        //      开户支行
        bankSubName: "",
        //      开户人证件类型
        idType: "01",
        //      开户人证件号码
        idNumber: "",
        //      开户人证件图片正面
        idCardFrontPic: "",
        //      开户人证件图片反面
        idCardBackPic: "",

        //    支行代码
        bankSubCode: "",


        //      收款银行账号预留手机
        accountMobile: "",

        //      收款银行账号
        accountNumber: "",


        // =================================================step4
        //      是否需要支付宝台牌物料
        // needMaterial: true,
        //      门头照
        doorPic: "",
        //      收银台照片
        checkoutCounterPic: "",
        //      店内环境照
        shopEvnPic: "",
        //      其他平台照片
        otherPlatformPic: "",
        //    验证码
        smsCode: ""

    },
    // 保存的id
    saveId:'',
    //底部选择弹出
    picker: {
        showPicker: false,
        pickerName: '',//当前选择的字段
        pickerSlots: [
            {defaultIndex: 0},//默认选中第一个
        ],
        pickerTitle: '',
        other: '',//其他需要设置的值，省份需要设置id的值
    },
    //图片展示
    examplePhoto:{
        img:'',
        isShow:false
    },
    /**
     * 显示状态
     * detail: 查看详情，不可修改；
     * edit: 编辑修改，已提交之后，申请通过，并未可修改状态；
     * first: 第一次提交
     * */
    viewState: 'first' ,
    //状态，number类型，当为31时代表进件成功报名失败，只可修改部分数据
    subStatus:0
}