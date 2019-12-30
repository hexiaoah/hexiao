import range from './range'

const START_YEAR = 2017
const END_YEAR = 2025

const UNIT_YEAR = ''
const UNIT_MONTH = ''
const UNIT_DAY = ''

function isLeapYear(y) {
    return (y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0)
};

function num2str(val) {
    if (val < 10) {
        return '0' + val
    } else {
        return val + ''
    }
}

function getDays(y, m) {
    y = Number(y)
    m = Number(m)
    let endDay = null
    switch (m) {
        case 2:
            endDay = isLeapYear(y) ? 29 : 28;
            break
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            endDay = 31;
            break
        case 4:
        case 6:
        case 9:
        case 11:
        default:
            endDay = 30;
            break
    }
    const days = range(1, endDay, false, UNIT_DAY)
    return days.map((day) => {
        return {value: num2str(day)}
    })
};

const yearData = range(START_YEAR, END_YEAR, false, UNIT_YEAR)
const monthData = range(1, 12, false, UNIT_MONTH)

const cascadeMonthData = monthData.map((month) => {
    return {
        value:num2str(month),
        children: []
    }
})

const dateData = yearData.map((year) => {
    const item = {
        value: year,
        children: cascadeMonthData.slice()
    }
    item.children.forEach((month) => {
        month.children = getDays(year.slice(0), month.value.slice(0))
    })
    return item
})

const date = new Date()
let month = date.getMonth() + 1
let day = date.getDate()
const dateAnchor = [
    {value: `${date.getFullYear()}${UNIT_YEAR}`},
    {value: `${num2str(month)}${UNIT_MONTH}`},
    {value: `${num2str(day)}${UNIT_DAY}`}
]

export {
    dateAnchor,
    dateData
}
