import { isObject, isArray, isUndefined } from './lang'

/*
按照 definition 对 data 进行格式化。
为了保险，data 里出现的未定义的字段不会被删除。

definition 格式：
{
    // key: defaultValue
    normalItem: 123,

    // value 是 plain object 时会递归深入匹配。object 里还可以再嵌套 object
    objectItem: { ... },

    // value 是数组，且里面各 item 是 plain object 时，
    // 会把第一个 item 作为新 item 的默认值，后续 item 作为组件添加进来时默认带的 items
    arrayObjectItem: [{ ... }, { ... }],

    // value 是数组但里面不是 plain object 时，会把数组整体作为 default value
    arrayBaseItem: ['a', 'b']
}

例如：
{
    mode: '大图',                            // normal item
    orderButton: {                           // object item
        mode: '立即下单',
        orderStyle: '1',
        cartStyle: '1',
    },
    showFields: ['名称', '价格', '下单按钮'],   // normal array item
    goodsList: [                             // array object item
        {
            linkType: 'goods',
            linkGoodsId: '',
            linkPage: '',
        },
    ]
}
*/
export default function format(definition, data) {
    if (!definition) return data

    // 避免直接修改 data
    data = { ...data }

    Object.keys(definition).forEach(key => {
        const defineValue = definition[key]
        const dataValue = data[key]

        if (isObject(defineValue)) {
            data[key] = format(defineValue, dataValue || {})
        } else if (isArray(defineValue) && defineValue.length && isObject(defineValue[0])) {
            const baseItem = defineValue[0]
            const defaultItems = defineValue.slice(1)
            data[key] = (dataValue || defaultItems).map(item => format(baseItem, item))
        } else if (isUndefined(dataValue)) {
            data[key] = defineValue
        }
    })

    return data
}





// ============== 测试代码 =========================

/*
var isUndefined = value => typeof value === 'undefined'
var isArray = value => Object.prototype.toString.call(value) === '[object Array]'
var isObject = value => Object.prototype.toString.call(value) === '[object Object]'


var def = {
    normal: 'normal_value',
    obj: {
        k1: 'v1',
        k2: 2,
    },
    arr: ['v1', 'v2', 'v3'],
    arrObj: [
        {
            k1: true,
            k2: -100,
        },
        { k1: false, k2: 1 },
        { k1: true, k2: 2 },
        { k1: false, k2: 3 },
    ],

    nest: {
        subObj: {
            k1: 'kvalue1',
            arr: [
                {
                    key1: 'arr-obj-k1',
                    sub: {
                        key1: [1,2,3],
                        key2: 'hello'
                    }
                }
            ]
        },
        subArr: ['1', 2, 3]
    }
}

var v1 = format(def)
var v2 = format(def, {
    other: 1,
    normal: 'xxx'
})
var v3 = format(def, {
    normal: 'xxx',
    obj: {
        k2: 200
    }
})
var v4 = format(def, {
    normal: 'xxx',
    arr: [1]
})
var v5 = format(def, {
    arrObj: [
        {},
        { k1: false },
        { k1: false, k2: 0 },
    ]
})
var v6 = format(def, {
    arrObj: []
})
var v7 = format(def, {
    nest: {
        subObj: {
            k1: 'v2',
            arr: [
                {},
                {
                    sub: {}
                },
                {
                    sub: { key1: 10 }
                }
            ]
        }
    }
})

*/
