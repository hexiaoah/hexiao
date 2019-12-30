/**
 * 贷款平台基础信息
 * @author zipai
 * @param
 * institutionName: 机构名称
 * productName: 产品名称
 * maxLimit: 最高额度
 * productFeature: 产品特点
 * loanTerm: 借款期限
 * monthRatesRang: 月利率范围
 * productIntroduction: 产品介绍
 * conditionApply: 申请条件
 */
export const $_loanPlatform = [
  {
    code: 'u51',
    institutionName: '51信用卡',
    productName: '51生e金',
    maxLimit: 200000,
    minLimit: 3000,
    productFeature: [
      {
        title: '无需抵押',
        stress: true
      },
      {
        title: '快速审批',
        stress: true
      }
    ],
    loanTerm: [3, 6, 9, 12],
    monthRatesRang: '0.5%-1.5%',
    minRate: '0.5%',
    productIntroduction:
      '51生e金是二维火和51信用卡联合为餐饮商家定制的纯信用贷款，主要以商家的信用和店铺经营为基础，商家无抵押，也无需担保，就能直接获取借款额度，进行借款申请，51生e金，让经营生意更轻松！',
    conditionApply: [
      '1、年龄：22-55周岁（含）大陆籍公民',
      '2、经营地区非偏远地区',
      '3、申请人经营主体工商注册满3个月'
    ]
  },
  {
    code: 'ALLIN_LOAN',
    institutionName: '通华金科',
    productName: '火融e',
    maxLimit: 200000,
    minLimit: 0,
    productFeature: [
      {
        title: '费用低',
        stress: true
      },
      {
        title: '期限灵活',
        stress: true
      },
      {
        title: '线上大额',
        stress: false
      }
    ],
    loanTerm: [1, 3, 6],
    monthRatesRang: '1%-2.5%',
    minRate: '1%',
    productIntroduction:
      '火融e是二维火与通华金科联合为餐饮行业商户定制的纯信用贷款。主要针对二维火平台全部注册客户，注册既有预估额度，有营业执照即可申请；费用低，风险定价，按余额计算年化率；期限灵活，30天内随借随还；3，6期分期还款。',
    conditionApply: [
      '1、年龄：22-60岁持有二代身份证的中华人民共和国公民',
      '2、流水范围：有无流水均可申请',
      '3、申请人经营主体工商注册满3个月3.客户群体：申请人为企业法定代表人或个体工商户负责人，二维火平台全部注册客户，注册既有预估额度，有营业执照即可申请'
    ]
  },
  {
    code: 'jisujie',
    institutionName: '极速云',
    productName: '极速借',
    maxLimit: 2000000,
    minLimit: 10000,
    productFeature: [
      {
        title: '无抵押',
        stress: true
      },
      {
        title: '高额度',
        stress: true
      },
      {
        title: '审核快',
        stress: false
      }
    ],
    loanTerm: [3, 6, 12],
    monthRatesRang: '0.83%-1.8%',
    minRate: '0.83%',
    productIntroduction:
      '极速借是二维火携手极速云上线的借款产品，为商户解决在运营中所遇到的资金难题；无抵押，无面审，审核快，让融资更快更简单。二维火商户专享的借款服务！',
    conditionApply: [
      '1、年龄22-55岁(含),中国大陆籍公民',
      '2、申请人经营主体工商注册满6个月',
      '3、申请人须为公司占股20%以上股东或法人，或者是账号注册人结算银行卡持卡人',
      '4、经营地址非新疆、西藏'
    ]
  },
  {
    code: 'ppdjy',
    institutionName: '拍拍贷',
    productName: '商家经营贷',
    maxLimit: 200000,
    minLimit: 0,
    productFeature: [
      {
        title: '极速特权',
        stress: true
      },
      {
        title: '低息特权',
        stress: true
      },
      {
        title: '官方信赖',
        stress: false
      }
    ],
    loanTerm: [3, 6, 9, 12],
    monthRatesRang: '0.83%-1.5%',
    minRate: '0.83%',
    productIntroduction:
      '商家经营贷是二维火与拍拍贷为二维火商家定制的纯信用贷款。基于商家在平台的经营情况，无需抵押，无需担保，直接获取信用额度，进行借款申请。',
    conditionApply: [
      '1、19岁-55岁中国公民',
      '2、申请人经营主体在二维火掌柜入驻时间满2个月',
      '3、经营地区非偏远地区'
    ]
  },
  {
    code: 'stddataloan',
    institutionName: '宜信普惠',
    productName: '宜信商通贷',
    maxLimit: 1000000,
    minLimit: 30000,
    productFeature: [
      {
        title: '额度高',
        stress: true
      },
      {
        title: '放款快',
        stress: true
      },
      {
        title: '门槛低',
        stress: false
      }
    ],
    loanTerm: [6, 12, 24],
    monthRatesRang: '0.67%-1.5%',
    minRate: '0.67%',
    productIntroduction:
      '本借款产品是宜信商通贷联合二维火为餐饮行业定制的一种全新的金融服务模式，是建立在商户充分授权的基础上，通过宜信金融平台对商户信用及经营数据进行评估，使其原本单一的经营数据具备金融属性，从而解决餐饮行业资金周转难的问题。本产品无需抵押担保，仅在线上即可完成贷款申请，方便快捷。',
    conditionApply: [
      '1、年龄:22岁(含)-55岁(含)',
      '2、申请人为企业法人或股东（占股20%以上）',
      '3、工商注册满一年且使用二维火软件6个月及以上时间',
      '4、经营行业非酒吧、网吧、台球厅、KTV'
    ]
  },
  {
    code: 'dianrong',
    institutionName: '点融',
    productName: '掌柜贷',
    maxLimit: 200000,
    minLimit: 2000,
    productFeature: [
      {
        title: '自动审批',
        stress: true
      },
      {
        title: '无需担保',
        stress: true
      },
      {
        title: '申请便捷',
        stress: false
      }
    ],
    loanTerm: [6, 12],
    monthRatesRang: '0.9%-1.5%',
    minRate: '0.9%',
    productIntroduction:
      '掌柜贷是点融针对合作商户定制的现金预借解决方案，无需抵押品。通过与POS、SAAS软件商或品牌商等合作伙伴及数据提供方的合作，基于商户历史交易量发放信用贷款，通过强大的技术支持每周或双周等额还款，盘活闲散资金，降低还款压力，并通过合作方或支付公司自动代扣还款，省时省力。',
    conditionApply: [
      '1、经营满6个月且在二维火至少有三个月流水记录',
      '2、中国大陆公民',
      '3、申请人年龄22-60周岁',
      '4、申贷人与营业执照上法定代表人为同一人，且申贷人征信良好，且无其他不良记录（未结诉讼、行政处罚等）'
    ]
  },
  {
    code: 'D0001',
    institutionName: '鑫火',
    productName: '鑫火餐饮贷',
    maxLimit: 3000000,
    minLimit: 50000,
    productFeature: [
      {
        title: '银行资金',
        stress: true
      },
      {
        title: '随借随贷',
        stress: true
      },
      {
        title: '快速放款',
        stress: false
      }
    ],
    loanTerm: [3, 6, 12],
    monthRatesRang: '0.6%-1.5%',
    minRate: '0.6%',
    productIntroduction: '',
    conditionApply: []
  }
]

/**
 *
 * 月利率表
 */
export const interestRateArr = function(steps, maxVal) {
  let arr = []
  const multiple = parseInt(maxVal / steps)
  for (let index = 0; index < multiple; index++) {
    arr.push(steps.toFixed(1) + '%')
    steps = steps + 0.1
  }
  return arr
}

//  dev 环境个线上环境 code 不统一
export const getCode = function(code) {
  switch (code) {
    case 'u51_dev':
      return 'u51'
    case 'mi':
      return 'jisujie'
    case 'dianrong_dev':
      return 'dianrong'
    case 'dataloan':
      return 'stddataloan'
    default:
      return code
  }
}

/**
 * 根据code值删选数据
 */
export const filterData = function(arr, code) {
  let res = arr.find(val => {
    return val.code === code
  })
  return res
}
