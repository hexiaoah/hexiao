export default {
    // 付款方式列表
    payKindList: {
        total: 0,
        list: []
    },
    // 下拉列表用选择
    selectPayKind: [],
    selectPayKindSingle: [],
//    付款方式详情
    payKindInfo: {
        // 支付方式名称
        payKindName: '',
        // 支付类型
        payKind: '',
        // 是否计入实收
        isInclude: true,
        // 是否自动打开钱箱
        isAutoOpen: false,
        // 代金券列表
        couponList: []
    },
    // 所有付款方式列表 下发用
    allPayKindList: [],
    // 付款方式列表
    payKindListSingle: {
        total: 0,
        list: []
    },
//    付款方式详情
    payKindInfoSingle: {
        // 支付方式名称
        payKindName: '',
        // 支付类型
        payKind: '',
        // 是否计入实收
        isInclude: true,
        // 是否自动打开钱箱
        isAutoOpen: false,
        // 代金券列表
        couponList: []
    },
    // 是否是支付宝直连店
    isAlipay: {
        // 享受优惠开关
        alipayIsEnjoyPreferential: true,
        // false: 是直连 true: 不是
        alipayIsOurAccount: true
    }
}
