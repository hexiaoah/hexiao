const array2Map = (arr = []) => {
  let result = {}
  arr.map(val => {
    result[val.code] = val.name
  })
  return result
}
const withdrawStatus = [
  {
    code: 1,
    name: '提现中'
  },
  {
    code: 2,
    //   name: '提现成功',
    name: ''
  },
  {
    code: 3,
    name: '提现失败'
  },
  {
    code: 4,
    name: '提现退票'
  }
]
const withdrawStatusColor = [
  {
    code: 1,
    name: 'c-ff9900'
  },
  {
    code: 2,
    name: 'c-00cc33'
  },
  {
    code: 3,
    name: 'c-ff0033'
  },
  {
    code: 4,
    name: 'c-ff0033'
  }
]

const inOutTypes = [
  {
    code: 0,
    name: '收入'
  },
  {
    code: 1,
    name: '支出'
  }
]

module.exports = {
  inOutTypes,
  withdrawStatusMap: array2Map(withdrawStatus),
  withdrawStatusColorMap: array2Map(withdrawStatusColor),
  payMap: array2Map(inOutTypes)
}
