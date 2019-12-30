const array2Map = (arr = []) => {
    let result = {}
    arr.map(val => {
        result[val.code] = val.name
    })
    return result
}
const payTypes = [{
    code: 1,
    name: '微信支付'
}, {
    code: 2,
    name: '支付宝支付'
}, {
    code: 4,
    name: '二维火支付'
}, {
    code: 5,
    name: 'QQ钱包支付'
}, {
    code: 6,
    name: '火通卡支付'
}, {
    code: 15,
    name: '云闪付支付'
}]

const tradeTypes = [{
    code: 1,
    name: '消费'
}, {
    code: 2,
    name: '充值'
}]

const payStatus = [{
    code: 0,
    name: '预付'
}, {
    code: 1,
    name: '支付'
}, {
    code: 11,
    name: '退款'
}]

const channelTypes = [{
    code: 0,
    name: '未知'
}, {
    code: 1,
    name: '直连'
}, {
    code: 2,
    name: '间连'
}]

const payStatusSymbol = [{
    code: 0,
    name: ''
}, {
    code: 1,
    name: '+'
}, {
    code: 11,
    name: '-'
}]

const symbolColor = [{
    code: '+',
    name: 'c-ff0033'
}, {
    code: '-',
    name: 'c-00cc33'
}]

module.exports = {
    payTypes,
    tradeTypes,
    payMap: array2Map(payTypes),
    tradeMap: array2Map(tradeTypes),
    payStatusMap: array2Map(payStatus),
    payStatusSymbolMap: array2Map(payStatusSymbol),
    symbolColorMap: array2Map(symbolColor)
}