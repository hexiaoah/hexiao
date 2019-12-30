const menuList = {
    name:'商品名称',
    kindMenuName:'分类名称',
    code:'商品编码',
    price:'单价(元)',
    memberPrice:'会员价(元)',
    account:'结账单位',
    buyAccount:'点菜单位',
    multiLangMenuName:'双语名称',
    isReserve:'堂食可点',
    isTakeout:'外卖可点',
    packingBox:'规格与数量',
    packingBoxNum:'餐盒数量',
    acridLevelString:'辣椒指数',
    specialTagString:'特色标签',
    recommendLevelString:'推荐指数',
    discountInclude:'允许商品金额计入优惠门槛',
    isRatio:'允许收银员在收银时打折',
    isChangePrice:'允许收银员在收银时修改价格',
    isBackAuth:'退菜时需要权限验证',
    isGive:'可作为赠菜',
    mealOnly:'此商品仅在套餐里显示',
    deductKind:'销售提成',
    deduct:'提成额度或百分比',
    serviceFeeMode:'服务费',
    serviceFee:'服务费金额或百分比',
    consume:'加工耗时(分钟)',
    weight:'菜肴份量',
    startNum:'起点份数',
    stepLength:'最小累加单位',
    memo:'商品介绍',
    stock:'商品库存',
    state:'商品上下架',
    hasMake:'做法',
    hasSpec:'规格',
}
const reversal = (obj = {})=>{
    const data = {}
    Object.keys( obj ).map(key=>{
        data[obj[key]] = key
    })
    return data
}

const formatCheck = (h,plateEntityId)=>{
    if((h.gridFieldDisplayName == '双语名称' || h.gridFieldDisplayName == '商品上下架') && plateEntityId ){
        return true
    }
    return false
}
const promptMes = (h)=>{
    let message = ''
    if(h.gridFieldDisplayName == '分类名称' || h.gridFieldDisplayName == '商品名称' || h.gridFieldDisplayName == '单价(元)' ){
        message = '必填'
    }
    return message
}

export default {
    /**
    * @param data 接口返回数据, 
    * @param {Boolean} MenuLanguage 双语设置 default false
    * @param {Boolean} custom 是否自定义表头 default false
    * @param {String} plateEntityId 品牌id
    */
    formatTableHeader : (data,MenuLanguage=false,custom=false,plateEntityId) =>{
        let newDate = []
        newDate = data.map(i=>{
            const info = {
                groupCaption: i.groupCaption || '',
                groupDisplayOrder: i.groupDisplayOrder || '',
                groupName: i.groupName || '',
                layout: i.layout || '',
                parentGroupCaption: i.parentGroupCaption || '',
                parentGroupName: i.parentGroupName || ''
            }
            if(i.children){
                info.children = i.children.map(j=>{
                    let childrenInfo = {
                        groupCaption: j.groupCaption,
                        groupDisplayOrder: j.groupDisplayOrder,
                        groupName: j.groupName,
                        layout: j.layout,
                        parentGroupCaption: j.parentGroupCaption,
                        parentGroupName: j.parentGroupName
                    }
                    if(j.fields){
                        childrenInfo.fields = j.fields.map(h=>({
                            gridFieldDisplayName: h.gridFieldDisplayName,
                            gridFieldDisplayOrder: h.gridFieldDisplayOrder,
                            gridFieldId: custom ? reversal(menuList)[h.gridFieldDisplayName] || '' : h.gridFieldId,
                            customId: h.gridFieldId,
                            gridName: h.gridName,
                            isChecked: h.isChecked,
                            isDisabled: formatCheck(h,plateEntityId) ? true : h.gridFieldDisplayName == '双语名称'? !MenuLanguage : h.isDisabled ,
                            isSelected: h.isSelected,
                            relGridFieldId: h.relGridFieldId,
                            relType: h.relType,
                            parentFieldId: (h.relGridFieldId != '0' && h.relType == '11') ? h.relGridFieldId : '0',
                            childrenFidldId: (h.relGridFieldId != '0' && h.relType == '0') ? h.relGridFieldId : '0',
                            twinsFiledId: (h.relGridFieldId != '0' && h.relType == '22') ? h.relGridFieldId : '0',
                            custom: custom,
                            promptMes: custom ? '' : promptMes(h),
                            visibleHide: formatCheck(h,plateEntityId)
                        }))
                    }
                    return childrenInfo
                })
            }
            if(i.fields){
                info.fields = i.fields.map(h=>({
                    gridFieldDisplayName: h.gridFieldDisplayName,
                    gridFieldDisplayOrder: h.gridFieldDisplayOrder,
                    gridFieldId: custom ? reversal(menuList)[h.gridFieldDisplayName] || '' : h.gridFieldId,
                    customId: h.gridFieldId,
                    gridName: h.gridName,
                    isChecked: h.isChecked,
                    isDisabled: formatCheck(h,plateEntityId) ? true : h.gridFieldDisplayName == '双语名称'? !MenuLanguage : h.isDisabled ,
                    isSelected: h.isSelected,
                    relGridFieldId: h.relGridFieldId,
                    relType: h.relType,
                    parentFieldId: custom ? '0' : (h.relGridFieldId != '0' && h.relType == '11') ? h.relGridFieldId : '0',
                    childrenFidldId: custom ? '0' : (h.relGridFieldId != '0' && h.relType == '0') ? h.relGridFieldId : '0',
                    twinsFiledId: custom ? '0' : (h.relGridFieldId != '0' && h.relType == '22') ? h.relGridFieldId : '0',
                    custom: custom,
                    promptMes: custom ? '' : promptMes(h),
                    visibleHide: formatCheck(h,plateEntityId)
                }))
            }
            return info
        })
        return newDate
    },
    formatTableMain: data=>{
        const newData = {
            records:[],
            totalRecord: 0
        }
        const itemList = data.itemList ? data.itemList : []
        newData.totalRecord = data.total ? data.total : 0
        itemList.map( records => {
            newData.records.push({
                key: records.id,
                code: records.code,
                consume: records.consume,
                deduct: records.deduct,
                deductKind: records.deductKind,
                discountInclude: records.discountInclude,
                id: records.id,
                isBackAuth: records.isBackAuth,
                isChangePrice: records.isChangePrice,
                isGive: records.isGive,
                isRatio: records.isRatio,
                isReserve: records.isReserve,
                isTakeout: records.isTakeout,
                isTwoAccount: records.isTwoAccount,
                kindId: records.kindId,
                kindMenuName: records.kindName,
                mealOnly: records.mealOnly,
                memberPrice: records.memberPrice,
                name: records.name,
                price: records.price,
                serviceFee: records.serviceFee,
                serviceFeeMode: records.serviceFeeMode,
                showTop: records.showTop,
                startNum: records.startNum,
                state: records.state,
                stepLength: records.stepLength,
                account: records.account,
                accountId: records.accountId,
                buyAccount: records.buyAccount,
                buyAccountId: records.buyAccountId,
                memo: records.memo,
                multiLangMenuName: records.multiLangMenuName,
                packingBox: records.packingBoxName,
                packingBoxNum: records.packingBoxNum,
                acridLevelString: records.acridLevelString,
                specialTagString: records.specialTagString,
                recommendLevelString: records.recommendLevelString,
                weight: records.weight,
                stock: records.stock,
                hasMake: records.hasMake,
                hasSpec: records.hasSpec,
                label: records.label
            })
        })

        return newData
    }
}
