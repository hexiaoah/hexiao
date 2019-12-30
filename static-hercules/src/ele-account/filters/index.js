import tools from '../utils/tools'
import {payMap, tradeMap, payStatusMap, payStatusSymbolMap, symbolColorMap} from '../constants'
import {dateFormat} from "@2dfire/utils/date";

export default {
    fen2yuan(value, decimals = 2) {
        if (!value) return new Number(0).toFixed(decimals)
        return tools.divide(value, 100, decimals)
    },
    number(value, decimals = 2) {
        if (!value) return new Number(0).toFixed(decimals)
        return tools.number(value, decimals)
    },
    money(value, decimals = 2) {
        if (!value) return new Number(0).toFixed(decimals)
        return tools.number(tools.divide(value, 100), decimals)
    },
    formatPayType(value) {
        return payMap[value] || ''
    },
    formatTradeType(value) {
        return tradeMap[value] || ''
    },
    formatPayStatusStr(value) {
        return payStatusMap[value] || ''
    },
    formatPayStatusSymbol(value) {
        return payStatusSymbolMap[value] || ''
    },
    symbolColor(value) {
        return symbolColorMap[value] || ''
    },
    amountColor(value) {
        if (!tools.isNumber(value)) {
            return 'c-ff0033'
        }
        if (parseFloat(value) >= 0) {
            return 'c-ff0033'
        } else {
            return 'c-00cc33'
        }
    },
    date(value, reg) {
        if (!value) return ""
        return dateFormat(new Date(value), reg)
    }
}


