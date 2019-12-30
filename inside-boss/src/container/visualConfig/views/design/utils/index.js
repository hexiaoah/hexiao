import * as bridge from '@src/utils/bridge'
const { entityId } = bridge.getInfoAsQuery()

// 工具类 金额显示和计算必须先调用此format_number
function formatNumber(pnumber, isNeedFormat) {
    let mark = ''

    if (isNaN(pnumber)) {
        return '0.00'
    }

    if (pnumber == '') {
        return '0.00'
    }
    pnumber = pnumber.toString()
    if (pnumber.charAt(0) == '-') {
        mark = '-'
        pnumber = pnumber.split('-')[1]
    }

    // 新增判断
    if (isNeedFormat && pnumber.indexOf('.') === -1) {
        const priceArr = pnumber.split('')
        if (priceArr.length === 1) {
            priceArr.splice(priceArr.length - 2, 0, '0.0')
            pnumber = priceArr.join('')
            // pnumber += '0.0'
        } else if (priceArr.length === 2) {
            priceArr.splice(priceArr.length - 2, 0, '0.')
            pnumber = priceArr.join('')
            // pnumber += '0.'
        } else {
            priceArr.splice(priceArr.length - 2, 0, '.')
            pnumber = priceArr.join('')
        }
    }

    let whole = new String(pnumber).split('.')[0]
    const snum = new String(pnumber * 1000)
    const sec = snum.split('.')
    const wholeStr = sec[0]
    let result = ''
    let firstDes = '0'
    let secondDes = '0'
    let thirdDes = '0'
    if (wholeStr.length - 2 > 0) {
        firstDes = wholeStr.substring(wholeStr.length - 3, wholeStr.length - 2)
    }

    if (wholeStr.length - 1 > 0) {
        secondDes = wholeStr.substring(wholeStr.length - 2, wholeStr.length - 1)
    }

    if (wholeStr.length > 0) {
        thirdDes = wholeStr.substring(wholeStr.length - 1, wholeStr.length)
    }

    firstDes = parseInt(firstDes)
    secondDes = parseInt(secondDes)
    thirdDes = parseInt(thirdDes)
    if (thirdDes > 4) {
        secondDes += 1
        if (secondDes >= 10) {
            secondDes -= 10
            firstDes += 1
            if (firstDes >= 10) {
                whole = new String(parseInt(whole) + 1)
            }
        }
    }

    if (firstDes == 0 && secondDes == 0) {
        // result = whole + ".00"
        result = `${whole}.00`
    } else {
        result = `${whole}.${new String(firstDes)}${new String(secondDes)}`
    }
    return mark + result
}

export default {
    entityId,
    formatNumber
}

export {
    entityId,
    formatNumber
}
