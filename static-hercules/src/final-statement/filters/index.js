import {dateFormat} from "@2dfire/utils/date";
import tools from '../utils/tools'
import {saleStatus} from '../constants'

export default {
    date(value, reg = 'yyyy.MM.dd') {
        if (!value) return ""
        return dateFormat(new Date(value), reg)
    },
    fen2yuan(value, decimals = 2) {
        if (!value) return new Number(0).toFixed(decimals)
        return tools.divide(value, 100, decimals)
    },
    number(value, decimals = 2) {
        if (!value) return new Number(0).toFixed(decimals)
        return tools.number(value, decimals)
    },
    money(value, decimals = 2) {
        if (!value) return Number(value)
        if(!decimals) return tools.number(value,decimals)
        return tools.number(tools.divide(value, 100), decimals)
    },
    saleStatusStr(value) {
        return saleStatus[value] || ''
    },
    symbol(value){
        return value>0?'+':'-'
    },
    absolute(value){
        return Math.abs(value)
    }
}