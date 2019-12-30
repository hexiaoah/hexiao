export const recursionClass = data => {
    const flat = arr => [].concat(...arr)
    const item = arr => {
        return flat(arr.map(i => {
                if (i.subList) {
                    return item(i.subList).map(j => {
                        return {name: i.name + '-' + j.name, id: j.id}
                    })
                }
                else {
                    return {name: i.name, id: i.id}
                }
            }
        ))
    }
    return item(data)
}

const option = {
    packingBox:'packingBoxNum',
    deductKind:'deduct',
    serviceFeeMode:'serviceFee'
}

export const getColumns = (data)=> {
    const newdata = [].concat(data)
    data.map(i=>{
        if(option[i]){
            newdata.push(option[i])
        }
    })
    const col = [
    {
        title: '分类名称',
        dataIndex: 'kindMenuName',
        key: 'kindMenuName',
        width: 150,
    },
    {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 120,
    },
    {
        title: '商品编码',
        dataIndex: 'code',
        key: 'code',
        width: 120,
    },
    {
        title: '商品ID',
        dataIndex: 'id',
        key: 'id',
        width: 120,
    },
    {
        title: '双语名称',
        dataIndex: 'multiLangMenuName',
        key: 'multiLangMenuName',
        width: 120,
    },
    {
        title: '单价（元）',
        dataIndex: 'price',
        key: 'price',
        width: 120,
    },
    {
        title: '会员价（元）',
        dataIndex: 'memberPrice',
        key: 'memberPrice',
        width: 120,
    },
    {
        title: '结账单位',
        dataIndex: 'account',
        key: 'account',
        width: 120,
    },
    {
        title: '点菜单位',
        dataIndex: 'buyAccount',
        key: 'buyAccount',
        width: 120,
    },
    {
        title: '外卖可点',
        dataIndex: 'isTakeout',
        key: 'isTakeout',
        width: 120,
        render: (text, record) => {
            return text == 1?"是":"否";
        },
    },
    {
        title: '餐盒规格',
        dataIndex: 'packingBox',
        key: 'packingBox',
        width: 120,
    },
    {
        title: '餐盒数量',
        dataIndex: 'packingBoxNum',
        key: 'packingBoxNum',
        width: 120,
    },
    {
        title: '堂食可点',
        dataIndex: 'isReserve',
        key: 'isReserve',
        width: 120,
        render: (text, record) => {
            return text == 1?"是":"否";
        },
    },
    {
        title: '商品上下架',
        dataIndex: 'state',
        key: 'state',
        width: 120,
        render: (text,record)=>{
            return text == 1 ? '上架':'下架'
        }
    },
    {
        title: '规格',
        dataIndex: 'hasSpec',
        key: 'hasSpec',
        width: 120,
    },
    {
        title: '做法',
        dataIndex: 'hasMake',
        key: 'hasMake',
        width: 120,
    },
    {
        title: '辣椒指数',
        dataIndex: 'acridLevelString',
        key: 'acridLevelString',
        width: 120,
        render: (text,record)=>{
            let mes = ''
            if (record.label && record.label.acrid && record.label.acrid.acridLevelString){
                mes = record.label.acrid.acridLevelString
            }
            return mes
        }
    },
    {
        title: '特色标签',
        dataIndex: 'specialTagString',
        key: 'specialTagString',
        width: 120,
        render: (text,record)=>{
            let mes = ''
            if (record.label && record.label.specialTag && record.label.specialTag.specialTagString){
                mes = record.label.specialTag.specialTagString
            }
            return mes
        }
    },
    {
        title: '推荐指数',
        dataIndex: 'recommendLevelString',
        key: 'recommendLevelString',
        width: 120,
        render: (text,record)=>{
            let mes = ''
            if (record.label && record.label.recommend && record.label.recommend.recommendLevelString){
                mes = record.label.recommend.recommendLevelString
            }
            return mes
        }
    },
    {
        title: '允许商品金额计入优惠门槛',
        dataIndex: 'discountInclude',
        key: 'discountInclude',
        width: 120,
        render: (text, record) => {
            return record.discountInclude==1?"允许":"不允许";
        },
    },
    {
        title: '允许收银员在收银时打折',
        dataIndex: 'isRatio',
        key: 'isRatio',
        width: 120,
        render: (text, record) => {
            return record.isRatio==1?"允许":"不允许";
        },
    },
    {
        title: '允许收银员在收银时修改价格',
        dataIndex: 'isChangePrice',
        key: 'isChangePrice',
        width: 120,
        render: (text, record) => {
            return record.isChangePrice==1?"允许":"不允许";
        },
    },
    {
        title: '退菜时需要权限验证',
        dataIndex: 'isBackAuth',
        key: 'isBackAuth',
        width: 120,
        render: (text, record) => {
            return record.isBackAuth==1?"是":"否";
        },
    },
    {
        title: '可作为赠菜',
        dataIndex: 'isGive',
        key: 'isGive',
        width: 120,
        render: (text, record) => {
            return record.isGive==1?"是":"否";
        },
    },
    {
        title: '此商品仅在套餐里显示',
        dataIndex: 'mealOnly',
        key: 'mealOnly',
        width: 120,
        render: (text, record) => {
            return record.mealOnly==1?"是":"否";
        },
    },
    {
        title: '加工耗时（分钟）',
        dataIndex: 'consume',
        key: 'consume',
        width: 120,
    },
    {
        title: '起点份数',
        dataIndex: 'startNum',
        key: 'startNum',
        width: 120,
    },

    {
        title: '最小累加单位',
        dataIndex: 'stepLength',
        key: 'stepLength',
        width: 120,
    },
    {
        title: '商品介绍',
        dataIndex: 'memo',
        key: 'memo',
        width: 500,
    },
    {
        title: '销售提成',
        dataIndex: 'deductKind',
        key: 'deductKind',
        width: 120,
        render: (text,record)=>{
            if(text == '1'){
                return '不提成'
            }else if(text == '2'){
                return '按比例'
            }else if(text == '3'){
                return '按固定金额'
            }else{
                return '不提成'
            }
        }
    },
    {
        title: '提成额度或百分比',
        dataIndex: 'deduct',
        key: 'deduct',
        width: 120,
    },
    {
        title: '服务费',
        dataIndex: 'serviceFeeMode',
        key: 'serviceFeeMode',
        width: 120,
        render: (text,record)=>{
            if(text == '0'){
                return '不收取'
            }else if(text == '1'){
                return '固定费用'
            }else if(text == '2'){
                return '商品价格百分比'
            }else{
                return '不收取'
            }
        }
    },
    {
        title: '服务费金额或百分比',
        dataIndex: 'serviceFee',
        key: 'serviceFee',
        width: 120,
    },
    {
        title: '商品库存',
        dataIndex: 'stock',
        key: 'stock',
        width: 120,
    },
    {
        title: '菜肴份量',
        dataIndex: 'weight',
        key: 'weight',
        width: 120,
        render: (text,record)=>{
            if(text == 0){
                return '极小份'
            }else if(text == 1){
                return '标准菜量'
            }else if(text > 1){
                return '特大量'
            }else{
                return ''
            }
        }
    },
]
    return col.filter(item=>{
        return newdata.indexOf(item.key) != -1
    })
}
