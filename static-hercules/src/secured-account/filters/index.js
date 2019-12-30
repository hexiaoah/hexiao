import tools from '../utils/tools'
import { withdrawStatusMap, withdrawStatusColorMap } from '../constants'
import { dateFormat } from '@2dfire/utils/date'

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
  subStr(value) {
    return value.substr(-4)
  },
  withdrawStatusStr(value) {
    return withdrawStatusMap[value] || ''
  },
  withdrawStatusColor(value) {
    return withdrawStatusColorMap[value] || ''
  },

  date(value, reg) {
    if (!value) return ''
    return dateFormat(new Date(value), reg)
  },

  replaceStr(value){
      return value.replace( /^(.+)(.{4})$/, "**** **** *** ***** $2" )
  }
}
