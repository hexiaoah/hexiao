export let data = {
  itemTypeVoList: [
    {
      itemTypeCode: 'IT_BASIC',
      itemTypeName: '基础',
      optionList: [
        { choice: true, itemCode: 'I_SHOP_LOGO', itemName: '店铺Logo店铺Logo店铺Logo店铺Logo店铺Logo店铺Logo店铺Logo' },
        { choice: true, itemCode: 'I_SHOP_NAME', itemName: '店名' },
        { choice: true, itemCode: 'I_PRINT_TITLE', itemName: '打印标题' },
        { choice: true, itemCode: 'I_ORDER_OPEN_TIME', itemName: '开单时间' }
      ]
    },
    {
      itemTypeCode: 'IT_ORDER_INFO',
      itemTypeName: '订单信息',
      optionList: [
        { choice: true, itemCode: 'I_MEAL_MARK', itemName: '牌号' },
        { choice: true, itemCode: 'I_SEAT_CODE', itemName: '桌位' },
        { choice: true, itemCode: 'I_ORDER_NUM', itemName: '单号' },
        { choice: true, itemCode: 'I_BILL_NUM', itemName: '账单号' },
        { choice: true, itemCode: 'I_CONSUMER_NUM', itemName: '人数' },
        { choice: true, itemCode: 'I_WAITER', itemName: '服务员' },
        { choice: true, itemCode: 'I_CURRENCY_UNIT', itemName: '货币单位' },
        { choice: true, itemCode: 'I_ORDER_REMARK', itemName: '整单备注' }
      ]
    },
    {
      itemTypeCode: 'IT_INSTANCE_INFO',
      itemTypeName: '商品信息',
      optionList: [
        { choice: true, itemCode: 'I_INSTANCE_NAME', itemName: '商品名称' },
        { choice: true, itemCode: 'I_INSTANCE_NUM', itemName: '数量' },
        { choice: true, itemCode: 'I_INSTANCE_PRICE', itemName: '单价' },
        { choice: true, itemCode: 'I_ORIGINAL_PRICE', itemName: '优惠前金额' },
        { choice: true, itemCode: 'I_DISCOUNT_PRICE', itemName: '优惠后金额' },
        {
          choice: true,
          itemCode: 'I_INSTANCE_PRACTICE',
          itemName: '商品做法'
        },
        { choice: true, itemCode: 'I_INSTANCE_SPEC', itemName: '商品规格' },
        { choice: true, itemCode: 'I_INSTANCE_REMARK', itemName: '商品备注' },
        { choice: true, itemCode: 'I_INSTANCE_FEED', itemName: '商品加料' },
        {
          choice: true,
          itemCode: 'I_INSTANCE_STATISTIC',
          itemName: '分类统计'
        }
      ]
    }
  ],
  tmplVo: {
    id: 23,
    itemRowVoList: [
      {
        columnList: [
          {
            charNum: 0,
            font: '4_4',
            id: 24,
            index: 1,
            itemCode: 'I_SHOP_NAME',
            name: '店名',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_BASIC',
            value: 'http://www.baidu.com',
            widthPct: 100,
              fixedText:true
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '2_2',
            id: 24,
            index: 1,
            itemCode: 'I_SHOP_NAME',
            name: '店名',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_BASIC',
            value: '二维火测试店铺',
            widthPct: 100,
              fixedText:true
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '2_4',
            id: 24,
            index: 1,
            itemCode: 'I_SHOP_NAME',
            name: '店名',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_BASIC',
            value: '二维火测试店铺',
            widthPct: 100,
              fixedText:true
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '2_1',
            id: 25,
            index: 2,
            itemCode: 'I_PRINT_TITLE',
            name: '打印标题',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_BASIC',
            value: '客户联',
            widthPct: 100,
              fixedText:false
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 26,
            index: 3,
            itemCode: 'I_ORDER_OPEN_TIME',
            name: '开单时间',
            optionList: [{
              name:"标题名字",//名字，编辑右侧内容显示文字
              value:'开单时间：',//值，单据显示的内容
              checked:true,//是否已选择
              isSelect:true,//是否是可选值，主要用于判断是否为默认值，默认值时为false
            },{
              name:"",
              value:'2018-09-12',
              isSelect:false
            },{
              name:"时分秒",
              value:' 12:00:00',
              checked:false,
              isSelect:true
            }],
            parentId: 0,
            prefix: '开单时间：',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_BASIC',
            value: '2018-09-12 12:00:00',
            widthPct: 100
          }
        ],
        nextIsDashed: true
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_2',
            id: 27,
            index: 26,
            itemCode: 'I_DASHED',
            name: '虚线',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_OTHER',
            value: '',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_2',
            id: 28,
            index: 5,
            itemCode: 'I_SEAT_CODE',
            name: '桌位',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_ORDER_INFO',
            value: '大厅-101',
            widthPct: 30
          },
          {
            charNum: 22,
            font: '1_1',
            id: 29,
            index: 6,
            itemCode: 'I_ORDER_NUM',
            name: '单号',
            optionList: [],
            parentId: 0,
            prefix: '单号：',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_ORDER_INFO',
            value: '10001',
            widthPct: 70
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 20,
            font: '1_1',
            id: 30,
            index: 7,
            itemCode: 'I_BILL_NUM',
            name: '账单号',
            optionList: [],
            parentId: 0,
            prefix: '账单号：',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_ORDER_INFO',
            value: '201809120001',
            widthPct: 70
          },
          {
            charNum: 8,
            font: '1_1',
            id: 31,
            index: 8,
            itemCode: 'I_CONSUMER_NUM',
            name: '人数',
            optionList: [],
            parentId: 0,
            prefix: '人数：',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_ORDER_INFO',
            value: '8',
            widthPct: 30
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 32,
            index: 9,
            itemCode: 'I_WAITER',
            name: '服务员',
            optionList: [],
            parentId: 0,
            prefix: '服务员：',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_ORDER_INFO',
            value: '林小夕',
            widthPct: 50
          },
          {
            charNum: 10,
            font: '1_1',
            id: 33,
            index: 10,
            itemCode: 'I_CURRENCY_UNIT',
            name: '货币单位',
            optionList: [],
            parentId: 0,
            prefix: '单位：',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_ORDER_INFO',
            value: '元',
            widthPct: 50
          }
        ],
        nextIsDashed: true
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 27,
            index: 26,
            itemCode: 'I_DASHED',
            name: '虚线',
            optionList: [],
            parentId: 0,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_OTHER',
            value: '',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 28,
            index: 13,
            itemCode: 'I_INSTANCE_NAME',
            name: '商品名称',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '品名',
            widthPct: 40
          },
          {
            charNum: 8,
            font: '1_1',
            id: 29,
            index: 14,
            itemCode: 'I_INSTANCE_NUM',
            name: '数量',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '数量',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 30,
            index: 15,
            itemCode: 'I_INSTANCE_PRICE',
            name: '单价',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '单价',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 31,
            index: 16,
            itemCode: 'I_ORIGINAL_PRICE',
            name: '优惠前金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '金额',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 32,
            index: 17,
            itemCode: 'I_DISCOUNT_PRICE',
            name: '优惠后金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '折后额',
            widthPct: 15
          }
        ],
        nextIsDashed: true
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 33,
            index: 26,
            itemCode: 'I_DASHED',
            name: '虚线',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_OTHER',
            value: '',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 34,
            index: 28,
            itemCode: 'I_DASHED_TITLE',
            name: '虚线标题',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_OTHER',
            value: '---点菜明细---',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 35,
            index: 13,
            itemCode: 'I_INSTANCE_NAME',
            name: '商品名称',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '番茄牛腩',
            widthPct: 40
          },
          {
            charNum: 8,
            font: '1_1',
            id: 36,
            index: 14,
            itemCode: 'I_INSTANCE_NUM',
            name: '数量',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '1份',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 37,
            index: 15,
            itemCode: 'I_INSTANCE_PRICE',
            name: '单价',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '50.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 38,
            index: 16,
            itemCode: 'I_ORIGINAL_PRICE',
            name: '优惠前金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '50.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 39,
            index: 17,
            itemCode: 'I_DISCOUNT_PRICE',
            name: '优惠后金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '45.00',
            widthPct: 15
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 8,
            font: '1_1',
            id: 40,
            index: 18,
            itemCode: 'I_INSTANCE_PRACTICE',
            name: '商品做法',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '疯狂加辣椒',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 41,
            index: 19,
            itemCode: 'I_INSTANCE_SPEC',
            name: '商品规格',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '大份',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 42,
            index: 20,
            itemCode: 'I_INSTANCE_REMARK',
            name: '商品备注',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '不放葱',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 43,
            index: 21,
            itemCode: 'I_INSTANCE_FEED',
            name: '商品加料',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '番茄1份，牛肉1份',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 44,
            index: 28,
            itemCode: 'I_DASHED_TITLE',
            name: '虚线标题',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_OTHER',
            value: '---赠菜明细---',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 45,
            index: 13,
            itemCode: 'I_INSTANCE_NAME',
            name: '商品名称',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '可乐',
            widthPct: 40
          },
          {
            charNum: 8,
            font: '1_1',
            id: 46,
            index: 14,
            itemCode: 'I_INSTANCE_NUM',
            name: '数量',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '1听',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 47,
            index: 15,
            itemCode: 'I_INSTANCE_PRICE',
            name: '单价',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '5.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 48,
            index: 16,
            itemCode: 'I_ORIGINAL_PRICE',
            name: '优惠前金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '5.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 49,
            index: 17,
            itemCode: 'I_DISCOUNT_PRICE',
            name: '优惠后金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '0.00',
            widthPct: 15
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 50,
            index: 28,
            itemCode: 'I_DASHED_TITLE',
            name: '虚线标题',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_OTHER',
            value: '---退菜明细---',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 51,
            index: 13,
            itemCode: 'I_INSTANCE_NAME',
            name: '商品名称',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '雪碧',
            widthPct: 40
          },
          {
            charNum: 8,
            font: '1_1',
            id: 52,
            index: 14,
            itemCode: 'I_INSTANCE_NUM',
            name: '数量',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '1听',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 53,
            index: 15,
            itemCode: 'I_INSTANCE_PRICE',
            name: '单价',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '5.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 54,
            index: 16,
            itemCode: 'I_ORIGINAL_PRICE',
            name: '优惠前金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '5.00',
            widthPct: 15
          },
          {
            charNum: 8,
            font: '1_1',
            id: 55,
            index: 17,
            itemCode: 'I_DISCOUNT_PRICE',
            name: '优惠后金额',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'RIGHT',
            type: 'IT_INSTANCE_INFO',
            value: '0.00',
            widthPct: 15
          }
        ],
        nextIsDashed: true
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 56,
            index: 26,
            itemCode: 'I_DASHED',
            name: '虚线',
            optionList: [],
            parentId: 100,
            prefix: '',
            showType: 'SHOW',
            style: 'CENTER',
            type: 'IT_OTHER',
            value: '',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 57,
            index: 22,
            itemCode: 'I_INSTANCE_STATISTIC',
            name: '分类统计',
            optionList: [
              {
                choice: true,
                itemCode: 'I_INSTANCE_STATISTIC_NAME',
                itemName: '分类名'
              },
              {
                choice: true,
                itemCode: 'I_INSTANCE_STATISTIC_NUM',
                itemName: '分类数量'
              },
              {
                choice: true,
                itemCode: 'I_INSTANCE_STATISTIC_PRICE',
                itemName: '分类金额'
              }
            ],
            parentId: 0,
            prefix: '',
            showType: 'PARENT',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '分类统计',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 59,
            index: 28,
            itemCode: 'I_DASHED_TITLE',
            name: '虚线标题',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_OTHER',
            value: '---分类统计---',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_INSTANCE_STATISTIC_NAME',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '热菜',
            widthPct: 40
          },
          {
            charNum: 0,
            font: '1_1',
            id: 61,
            index: 24,
            itemCode: 'I_INSTANCE_STATISTIC_NUM',
            name: '分类数量',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '1',
            widthPct: 30
          },
          {
            charNum: 0,
            font: '1_1',
            id: 62,
            index: 25,
            itemCode: 'I_INSTANCE_STATISTIC_PRICE',
            name: '分类金额',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '45',
            widthPct: 30
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_EMPTY',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '16',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_EMPTY',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '--------------------------------',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_EMPTY',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '24',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_EMPTY',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '________________________________________________',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_EMPTY',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            style: 'LEFT',
            type: 'IT_INSTANCE_INFO',
            value: '32',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: 'I_SHOP_QRCODE',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            img:'./image/code.png',
            style: 'CENTER',
            type: 'IT_INSTANCE_INFO',
            value: '去去去去去去去去去去去去去去去去',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      },
        {
            columnList: [
                {
                    charNum: 0,
                    font: '1_1',
                    id: 60,
                    index: 23,
                    itemCode: 'I_SHOP_LOGO',
                    name: '分类名',
                    optionList: [],
                    parentId: 57,
                    prefix: '',
                    showType: 'SHOW',
                    img:'./image/code.png',
                    style: 'CENTER',
                    type: 'IT_INSTANCE_INFO',
                    value: '48',
                    widthPct: 100
                }
            ],
            nextIsDashed: false
        },
      {
        columnList: [
          {
            charNum: 0,
            font: '1_1',
            id: 60,
            index: 23,
            itemCode: '',
            name: '分类名',
            optionList: [],
            parentId: 57,
            prefix: '',
            showType: 'SHOW',
            img:'./image/code.png',
            style: 'CENTER',
            type: 'IT_INSTANCE_INFO',
            value: '去去去去去去去去去去去去去去去去去去去去去去去去',
            widthPct: 100
          }
        ],
        nextIsDashed: false
      }
    ],
    name: 'XX模板',
    type: 'T_CHECK_CUSTOMER',
    width: 52
  }
}
