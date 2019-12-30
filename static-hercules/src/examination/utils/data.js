export const resultData = {
  analyze: {
    detail:
      '本店日均开台率低于行业平均值，整体走势在下降，\n急需提升！开台率低，代表订单数少，营业额不高，\n有亏本的风险！',
    settingIcon: [
      {
        type: 'PASS',
        icon:
          'https://assets.2dfire.com/frontend/6052700408598b1b23934f2a1de684fe.png',
        url: '#',
        name: '点餐提醒与推荐',
        permission: true
      },
      {
        type: 'PASS',
        icon:
          'https://assets.2dfire.com/frontend/d6a649e2fd8bd49e7608ea532c612453.png',
        url: '#',
        name: '菜单装修',
        permission: false
      },
      {
        type: 'PASS',
        icon:
          'https://assets.2dfire.com/frontend/0bab5e204667c6276a9de85a00400c88.png',
        url: '#',
        name: '商品视频',
        permission: false
      },
      {
        type: 'UPDATE',
        icon:
          'https://assets.2dfire.com/frontend/08a13df7b2e38a92a1c028bb2ca3a389.png',
        url: '#',
        name: '二维火收银',
        permission: false
      },
      {
        type: 'UPDATE',
        icon:
          'https://assets.2dfire.com/frontend/08a13df7b2e38a92a1c028bb2ca3a389.png',
        url: '#',
        name: '二维火收银',
        permission: true
      }
    ],
    chart: [
      {
        unit: '元',
        series: [{ simpPoints: [4.0, 1.14] }],
        xData: ['近30天日\n均人均消费', '预期人均消费'],
        type: 'BAR',
        title: '人均消费对比'
      },
      {
        unit: '元',
        series: [
          {
              data: [
              63.0,
              0.0,
              62.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0,
              0.0
            ]
          }
        ],
        xData: [
          '2018-09-24',
          '2018-09-25',
          '2018-09-26',
          '2018-09-27',
          '2018-09-28',
          '2018-09-29',
          '2018-09-30',
          '2018-10-01',
          '2018-10-02',
          '2018-10-03',
          '2018-10-04',
          '2018-10-05',
          '2018-10-06',
          '2018-10-07',
          '2018-10-08',
          '2018-10-09',
          '2018-10-10',
          '2018-10-11',
          '2018-10-12',
          '2018-10-13',
          '2018-10-14',
          '2018-10-15',
          '2018-10-16',
          '2018-10-17',
          '2018-10-18',
          '2018-10-19',
          '2018-10-20',
          '2018-10-21',
          '2018-10-22',
          '2018-10-23'
        ],
        type: 'LINE_GRAPH',
        title: '近30天人均消费走势'
      },
      {
        unit: '元',
        series: [{ data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0] }],
        xData: [
          '2018-04',
          '2018-05',
          '2018-06',
          '2018-07',
          '2018-08',
          '2018-09'
        ],
        type: 'LINE',
        title: '近6个月人均消费走势'
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'LINE',
        xData: [
          '2017.12',
          '2018.01',
          '2018.02',
          '2018.03',
          '2018.04',
          '2018.05'
        ],
        yData: [],
        series: [
          {
            name: '营业额',
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'LINE',
        xData: [
          '2017.12',
          '2018.01',
          '2018.02',
          '2018.03',
          '2018.04',
          '2018.05'
        ],
        yData: [],
        series: [
          {
            name: '新客占比',
            data: [
              {
                value: -1000,
                sum: 20000,
                percent: '10%'
              },
              {
                value: -1000,
                sum: 20000,
                percent: '10%'
              },
              {
                value: -1000,
                sum: 20000,
                percent: '10%'
              },
              {
                value: -500,
                sum: 20000,
                percent: '10%'
              },
              {
                value: -1000,
                sum: 20000,
                percent: '10%'
              },
              {
                value: -1000,
                sum: 20000,
                percent: '10%'
              }
            ]
          }
        ]
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'LINE_GRAPH',
        xData: [
          '2009.6.12',
          '2009.6.13',
          '2009.6.14',
          '2009.6.15',
          '2009.6.16',
          '2009.6.17',
          '2009.6.18',
          '2009.6.19',
          '2009.6.20',
          '2009.6.21',
          '2009.6.22',
          '2009.6.24',
          '2009.6.25',
          '2009.6.26',
          '2009.6.27',
          '2009.6.28',
          '2009.6.29',
          '2009.6.30',
          '2009.7.1',
          '2009.7.2',
          '2009.7.3',
          '2009.7.4',
          '2009.7.5',
          '2009.7.6',
          '2009.7.7',
          '2009.7.8',
          '2009.7.9',
          '2009.7.10',
          '2009.7.11',
          '2009.7.12',
          '2009.7.13',
          '2009.7.14'
        ],
        series: [
          {
            name: '1次',
            data: [
              10000,
              12000,
              13000,
              15000,
              18000,
              15000,
              10000,
              12000,
              13000,
              15000,
              18000,
              15000,
              10000,
              12000,
              -13000,
              -15000,
              -18000,
              -15000,
              -10000,
              12000,
              13000,
              15000,
              18000,
              15000,
              10000,
              12000,
              13000,
              15000,
              18000,
              15000,
              10000,
              12000,
              13000,
              15000,
              18000,
              15000,
              10000,
              12000
            ]
          }
        ],
        interval: 5
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'BAR',
        xData: ['近30天\n111', '预期月'],
        series: [
          {
            name: '营业额',
            data: [40, 30]
          }
        ]
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'BAR_HEAP',
        xData: ['饿了么', '美团', '百度外卖'],
        yData: [],
        series: [
          {
            name: '1次',
            data: [60, 20, 30]
          },
          {
            name: '2-3次',
            data: [30, 30, 40]
          },
          {
            name: '4-5次',
            data: [50, 70, 30]
          }
        ],
        color: ['#44cbff', '#ffd000', '#ff0000']
      },
      {
        title: '营业额对比',
        unit: '(万元)',
        type: 'BAR_CROSSWISE',
        yData: ['菜品名称1菜品名称1菜品名称1', '菜品名称2', '菜品名称3'],
        series: [
          {
            name: '1次',
            data: [
              {
                value: 60,
                utc: 120
              },
              {
                value: 20,
                utc: 130
              },
              {
                value: 60,
                utc: 160
              }
            ]
          }
        ]
      },
      {
        title: '近30天营业额组成',
        unit: '(万元)',
        type: 'PIE',
        series: [
          {
            name: '1次',
            data: [
              { value: 335, name: '老客老客老客老客' },
              { value: 679, name: '新客新客新客新客' },
              { value: 1048, name: '领卡会员领卡会员领卡会员' },
              { value: 1548, name: '充值会员充值会员' },
              { value: 335, name: '1老客老客老客老客' },
              { value: 679, name: '1新客新客新客新客' },
              { value: 1048, name: '1领卡会员领卡会员领卡会员' },
              { value: 1548, name: '1充值会员充值会员' }
            ]
          }
        ]
      },
      {
        title: '回头客占比',
        unit: '',
        type: 'PIE_ANNULAR',
        series: [
          {
            name: '近30天占比',
            data: [{ value: 25, name: '老客' }, { value: 75, name: 'other' }]
          },
          {
            name: '近15天占比',
            data: [{ value: 479, name: '老客' }, { value: 679, name: 'other' }]
          }
        ],
        color: ['#44cbff', '#ffd000', '#ff0000']
      }
    ]
  },
  scheme: [
    {
      title: '1.提升客流量',
      child: [
        {
          title: '1) 拉新',
          detail: '来的人越多，订单数就会越高',
          set: [
            {
              icon:
                'https://assets.2dfire.com/frontend/6052700408598b1b23934f2a1de684fe.png',
              title: '优惠卷',
              url: '',
              isOk: 'NO_PERMISSION'
            },
            {
              icon:
                'https://assets.2dfire.com/frontend/6052700408598b1b23934f2a1de684fe.png',
              title: '优惠卷',
              url: '12333',
              isOk: 'NEED_BUY'
            }
          ]
        },
        {
          title: '2) 拉新',
          detail: '来的人越多，订单数就会越高',
          set: [
            {
              icon:
                'https://assets.2dfire.com/frontend/6052700408598b1b23934f2a1de684fe.png',
              title: '优惠卷',
              url: '',
              isOk: 'PASS'
            }
          ]
        },
        {
          title: '3) 拉新',
          detail: '来的人越多，订单数就会越高'
        }
      ]
    },
    {
      title: '2.提升客流量',
      child: [
        {
          title: '拉新',
          detail: '来的人越多，订单数就会越高',
          btnUrl: '123333',
          btnTitle: '查看解决方案'
        }
      ]
    }
  ],
  video: [
    {
      time: '05:02',
      img:
        'https://assets.2dfire.com/frontend/6ddcca4f6a3d615b404efefd00d5d714.png',
      teacher: '柠檬草柠檬草柠檬草',
      title: '这是标题这是标题这是标题这是标题这是标题这是标题',
      browsing: '35,509',
      url: 'http://www.baidu.com'
    },
    {
      time: '05:02',
      img:
        'https://assets.2dfire.com/frontend/6ddcca4f6a3d615b404efefd00d5d714.png',
      teacher: '柠檬草柠檬草柠檬草',
      title: '这是标题这是标题这是标题这是标题这是标题这是标题',
      browsing: '35,509',
      url: 'http://www.baidu.com'
    },
    {
      time: '05:02',
      img:
        'https://assets.2dfire.com/frontend/6ddcca4f6a3d615b404efefd00d5d714.png',
      teacher: '柠檬草柠檬草柠檬草',
      title: '这是标题这是标题这是标题这是标题这是标题这是标题',
      browsing: '35,509',
      url: 'http://www.baidu.com'
    }
  ],
  releaseCase: [
    {
      time: '2017-08-10',
      img:
        'https://assets.2dfire.com/boss/img/publish/66854376f0d6eb0ad514ca1396805894.jpg',
      title: '西贝莜面1个月10万活跃会员 是怎么做到的？',
      browsing: '35509',
      praise: '12',
      url: 'http://www.baidu.com'
    },
    {
      time: '2017-08-10',
      img:
        'https://assets.2dfire.com/boss/img/publish/66854376f0d6eb0ad514ca1396805894.jpg',
      title: '西贝莜面1个月10万活跃会员 是怎么做到的？',
      browsing: '35509',
      praise: '12',
      url: 'http://www.baidu.com'
    }
  ],
  explain:
    '1.开台率=订单数\n2.因为桌数是相对稳定的2.因为桌数是相对稳定的2.因为桌数是相对稳定的'
}
export const ceshiData = {
  explain: 'nihao',
  scheme: [
    {
      child: [
        {
          set: [
            {
              isOk: 'NO_PERMISSION',
              icon:
                'https://assets.2dfire.com/boss/function/health/pad_shop_qrcode.png',
              title: '快餐点餐二维码',
              url: 'tdf-manager://2dfire.com/qrCode/kabawQrcode'
            },
            {
              isOk: 'NO_PERMISSION',
              title: '卡详情一览',
              url: 'PAD_DETAIL_CARD_REPORT'
            },
            {
              isOk: 'NO_PERMISSION',
              icon:
                'https://assets.2dfire.com/boss/function/functionlist/phone_precise_marketing.png',
              title: '精准营销',
              url:
                'tdf-manager://2dfire.com/memberTemp/activityList?act_type=8&action_code_brand=PHONE_BRADN_PRECISE_MARKETING&action_code_branch=&action_code_shop=PHONE_PRECISE_MARKETING'
            },
            {
              isOk: 'PASS',
              icon:
                'http://assets.2dfire.com/boss/newfunction/homepage/17034a8458afc1e66b7e2c0c137b7790.png',
              title: '营销方案',
              url:
                'tdf-manager://2dfire.com/member/marketingPlanList?action_code_brand=BRAND_PHONE_MARKETING_PLAN&action_code_branch=&action_code_shop=PHONE_MARKETING_PLAN'
            },
            {
              isOk: 'NO_PERMISSION',
              title: '赠分明细报表',
              url: 'CARD_DEGREE_DETAIL_REPORT'
            },
            {
              isOk: 'NO_PERMISSION',
              icon:
                'http://assets.2dfire.com/boss/newfunction/homepage/548d6663b4420a72abc0f65b6fbc0afc.png',
              title: '绑定银行卡',
              url: 'tdf-manager://2dfire.com/payment/detail'
            },
            {
              isOk: 'NO_PERMISSION',
              title: '会员赠分',
              url: 'PHONE_GIVE_DEGREE'
            },
            {
              isOk: 'NO_PERMISSION',
              icon:
                'https://assets.2dfire.com/boss/newfunction/homepage/phone_game_center.png',
              title: '游戏中心',
              url: 'tdf-manager://2dfire.com/gameCenter/index'
            },
            {
              isOk: 'NO_PERMISSION',
              title: '组合促销',
              url: 'PHONE_MULTI_MARKETING'
            },
            {
              isOk: 'PASS',
              icon:
                'https://assets.2dfire.com/boss/newfunction/homepage/phone_mall_employee.png',
              title: '员工',
              url: 'tdf-manager://2dfire.com/employee/index'
            },
            {
              isOk: 'NO_PERMISSION',
              icon:
                'https://assets.2dfire.com/boss/newfunction/homepage/phone_member_card.png',
              title: '会员管理',
              url:
                'tdf-manager://2dfire.com/dynamicMenuPage/index?functionId=01634f06b30d11e79bf9525400a7b87d'
            }
          ],
          detail: '增加效益',
          title: '增益'
        },
        {
          set: [
            {
              isOk: 'NO_PERMISSION',
              title: '卡详情一览',
              url: 'PAD_DETAIL_CARD_REPORT'
            }
          ],
          detail: '就是小外卖',
          title: '外卖aa  '
        }
      ]
    }
  ],
  analyze: {
    detail: '',
    chart: [
      {
        series: [
          {
            name: '近30天占比',
            data: [{ value: 479, name: '老客' }, { value: 679, name: 'other' }]
          },
          {
            name: '近15天占比',
            data: [{ value: 479, name: '老客' }, { value: 679, name: 'other' }]
          }
        ],
        type: 'PIE_ANNULAR',
        title: '新客占比'
      },
      {
        unit: '%',
        series: [
          {
            points: [
              { sum: 0, precent: '0%', value: 0 },
              {
                sum: 0,
                precent: '0%',
                value: 0
              },
              { sum: 0, precent: '0%', value: 0 },
              { sum: 0, precent: '0%', value: 0 },
              {
                sum: 0,
                precent: '0%',
                value: 0
              },
              { sum: 0, precent: '0%', value: 0 },
              { sum: 0, precent: '0%', value: 0 }
            ]
          }
        ],
        xData: [
          '2018-03',
          '2018-04',
          '2018-05',
          '2018-06',
          '2018-07',
          '2018-08',
          '2018-09'
        ],
        type: 'LINE',
        title: '近6个月新客占比走势'
      }
    ]
  },
  releaseCase: [
    {
      browsing: '0',
      img:
        'https://assets.2dfire.com/boss/img/dev/6ee82d27d625f6739e84fbd0a08745f4.png',
      time: '2017-10-13',
      title: '驱蚊器翁群无',
      url:
        'https://assets.2dfire.com/boss/article/dev/0a623f97ebda41d6906e7ce187b240d7.html',
      praise: '0'
    },
    {
      browsing: '0',
      img:
        'https://assets.2dfire.com/boss/img/dev/d0b5e26521f27fd598331e0cec786a3d.png',
      time: '2017-10-16',
      title: '测试案例重复标签',
      url:
        'https://assets.2dfire.com/boss/article/dev/0d4693bdbd5a473e85f5e85367a1c7a9.html',
      praise: '0'
    }
  ],
  video: [
    {
      browsing: '200000064',
      img:
        'https://assets.2dfire.com/boss/img/dev/bcf56b9a7cdf31a2b3a01db585d31ed7.png',
      teacher: '柠檬草',
      time: '00:02:20',
      title: '二维火公众号营销',
      url:
        'https://video.2dfire.com/xiaoermedia/0196af6eebb32459071ac054014a059d.mp4'
    }
  ]
}
