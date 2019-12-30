export default {
  divide(arg1, arg2, num = 2) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    return ((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(num)
  },
  multiply(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {}
    try {
      m += s2.split('.')[1].length
    } catch (e) {}
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
    )
  },
  number(number, decimals = 2, point, thousands) {
    //number	必需，要格式化的数字
    //decimals	可选，规定多少个小数位。
    //point	可选，规定用作小数点的字符串（默认为 . ）。
    //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
      sep = thousands || ',',
      dec = point || '.',
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec)
        return '' + (Math.round(n * k) / k).toFixed(prec)
      }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  },
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },
  getCurrDate(diffDay = 0) {
    const format = value => {
      if (value < 10) {
        return '0' + value
      } else {
        return value.toString()
      }
    }
    let now = new Date()
    let _day = now.getDate() + diffDay
    let target = new Date(now.setDate(_day))
    let year = target.getFullYear()
    let month = target.getMonth() + 1
    let day = target.getDate()

    return [format(year), format(month), format(day)]
  }
}
