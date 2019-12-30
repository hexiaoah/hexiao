// 现金、银行卡、自己发现的储值卡、由客房结算、优惠券、免单、代金券、其他
// all  系统所有支付类型，筛选时使用
// user 用户新建/编辑支付方式使用，只能创建部分类型的支付方式
const payKindList = {
    all: [
        {
            kind: 0,
            name: "现金"
        },
        {
            kind: 1,
            name: "银行卡"
        },
        {
            kind: 2,
            name: "支付宝"
        },
        {
            kind: 3,
            name: "微信"
        },
        {
            kind: 5,
            name: "自己发行的储值卡"
        },
        {
            kind: 10,
            name: "代金券"
        },
        {
            kind: 10,
            name: "饿了么代金券"
        },
        {
            kind: 4,
            name: "免单"
        },
    ],
    user: [
        {
            kind: 0,
            name: "现金"
        },
        {
            kind: 1,
            name: "银行卡"
        },
        {
            kind: 5,
            name: "自己发行的储值卡"
        },
        {
            kind: 10,
            name: "代金券"
        },
        {
            kind: 10,
            name: "饿了么代金券"
        },
        {
            kind: 4,
            name: "免单"
        },
    ]

}

export default payKindList
