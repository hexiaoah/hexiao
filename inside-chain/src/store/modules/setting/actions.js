import * as types from './mutation-types'
import catchError from '@/base/catchError'
import {
    apiGetBrandList, apiFilterGoodsList, apiGetCategory, apiDeleteGoods, apiFilterSuit,
    apiDeleteSuit, apiGetGoodsDetail, apiGetSelectList, apiGetGoodsLabelList, apiGetSuitBaseInfo,
    apiAddGoodsItem, apiModifyGoodsItem, apiGetOrderUnit, apiGetSuitLabelList, apiGetSuitGoods,
    apiGetSuitItems, apiSaveSuitBaseInfo, apiSaveSuitItems
} from '@/config/api_setting.js'

// 获取品牌列表
export const getBrandList = ({commit}) => {
    apiGetBrandList().then(data => {
        let arr = []
        if (!!data.data && data.data.length) {
            arr = data.data.map(item => {
                return {
                    name: item.name,
                    entityId: item.entityId,
                    canManage: item.canManage,
                    defaultPlate: item.defaultPlate
                }
            })
        }
        commit(types.GET_BRAND_LIST, arr)
    }).catch(e => {
        catchError(e)
    })
}

// 获取商品/套餐 分类列表（下拉选择框）
export const getCategoryList = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        let {isInclude, plateEntityId, opEntityId, type} = params
        console.log(params)
        apiGetCategory(isInclude, plateEntityId, opEntityId).then(data => {
            if (type === 'suitGoods') {
                commit(types.GET_SUIT_GOODS_CATEGORY_LIST, data.data)
            }
            else {
                commit(types.GET_CATEGORY_LIST, data.data)
            }
            resolve(true)
        }).catch(e => {
            catchError(e)
            reject(e)
        })
    })

}

// 获取商品列表
export const getGoodsList = ({commit}, params) => {
    let {plateEntityId, kindId, keyWord, pageNum, pageSize, opEntityId} = params
    // 先置空
    if (!!opEntityId) {
        commit(types.GET_SINGLE_GOODS_LIST, [])
    }
    else {
        commit(types.GET_CHAIN_GOODS_LIST, [])
    }
    apiFilterGoodsList(
        plateEntityId,
        kindId,
        keyWord,
        pageNum,
        pageSize,
        opEntityId
    ).then(data => {
        // 判断是单店还是连锁
        if (!!opEntityId) {
            commit(types.GET_SINGLE_GOODS_LIST, data.data)
        }
        else {
            commit(types.GET_CHAIN_GOODS_LIST, data.data)
        }
    }).catch(e => {
        catchError(e)
    })
}

// 删除商品
export const deleteGoods = ({commit}, params) => {
    let {plateEntityId, idList, opEntityId, kindId, keyWord, pageSize} = params
    apiDeleteGoods(plateEntityId, idList, opEntityId).then(data => {
        !!data.data && getGoodsList({commit}, {plateEntityId, kindId, keyWord, pageNum: 1, pageSize, opEntityId})
    }).catch(e => {
        catchError(e)
    })
}

// 获取新增/编辑商品时候各个select的内容
export const getGoodsSelectList = ({commit}, params) => {
    let {opEntityId, plateEntityId, itemId, type} = params
    apiGetSelectList(opEntityId, plateEntityId).then(data => {
        commit(types.GET_GOODS_SELECT_LIST, data.data)
        // 如果是编辑的话就要去请求商品的默认值
        if (type === 'edit') {
            getGoodsDetail({commit}, {opEntityId, plateEntityId, itemId})
        }
    }).catch(e => {
        catchError(e)
    })
}

// 获取商品标签列表
export const getGoodsLableList = ({commit}, params) => {
    let {opEntityId, plateEntityId} = params
    apiGetGoodsLabelList(opEntityId, plateEntityId).then(data => {
        commit(types.GET_GOODS_LABEL_LIST, data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 获取商品详情
export const getGoodsDetail = ({commit}, params) => {
    let {itemId, plateEntityId, opEntityId} = params
    // 先清空之前的数据
    commit(types.CLEAR_GOODS_DETAIL_FROM_BACK)
    apiGetGoodsDetail(itemId, plateEntityId, opEntityId).then(data => {
        commit(types.GET_GOODS_DETAIL, data.data)
        commit(types.MERGE_GOODS_DETAIL, data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 清空商品详情
export const clearGoodsDetail = ({commit}) => {
    commit(types.CLEAR_GOODS_DETAIL_FROM_BACK)
}

// 新增商品
export const addGoodsItem = ({commit}, params) => {
    let {
        opEntityId, id, kindId, label, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
        isTwoAccount, code, headPicList, specDetailList, makeList, weight, specWeightList,
        isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
        deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
        packingBoxNum, memo, showTop, detailPicList, state, plateEntityId, discountInclude, callback
    } = params

    apiAddGoodsItem(opEntityId, id, kindId, label, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
        isTwoAccount, code, headPicList, specDetailList, makeList, weight, specWeightList,
        isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
        deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
        packingBoxNum, memo, showTop, detailPicList, state, plateEntityId, discountInclude).then(data => {
        // 清空传递给后端的参数
        if (data.data) {
            commit(types.CLEAR_GOODS_DETAIL_TO_BACK)
            callback && callback()
        }
    }).catch(e => {
        catchError(e)
    })
}

// 清除detail的数据
export const clearGoodsDetailToBack = ({commit}) => {
    commit(types.CLEAR_GOODS_DETAIL_TO_BACK)
    commit(types.CLEAR_GOODS_DETAIL_FROM_BACK)
}

// 修改商品
export const modifyGoodsItem = ({commit}, params) => {
    let {
        opEntityId, id, kindId, label, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
        isTwoAccount, code, headPicList, specDetailList, makeList, weight, specWeightList,
        isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
        deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
        packingBoxNum, memo, showTop, detailPicList, state, plateEntityId, discountInclude, callback
    } = params

    apiModifyGoodsItem(opEntityId, id, kindId, label, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
        isTwoAccount, code, headPicList, specDetailList, makeList, weight, specWeightList,
        isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
        deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
        packingBoxNum, memo, showTop, detailPicList, state, plateEntityId, discountInclude).then(data => {
        // 清空传递给后端的参数
        commit(types.CLEAR_GOODS_DETAIL_TO_BACK)
        // 清空点击编辑时候从后端拿到的数据
        commit(types.CLEAR_GOODS_DETAIL_FROM_BACK)
        callback && callback()
    }).catch(e => {
        catchError(e)
    })
}

// 修改新增/编辑商品传递给后端的那些参数 detailToBack
export const changeGoodsItemVal = ({commit}, params) => {
    commit(types.CHANGE_GOODS_VAL, params)
}

// 获取套餐列表
export const getSuitList = ({commit}, params) => {
    let {opEntityId, plateEntityId, kindId, keyWord, pageIndex, pageSize} = params
    apiFilterSuit(
        opEntityId,
        plateEntityId,
        keyWord,
        kindId,
        pageIndex,
        pageSize
    ).then(data => {
        if (!!opEntityId) {
            commit(types.GET_SINGLE_SUIT_LIST, data.data)
        }
        else {
            commit(types.GET_CHAIN_SUIT_LIST, data.data)
        }
    }).catch(e => {
        catchError(e)
    })
}

// 删除套餐
export const deleteSuit = ({commit}, params) => {
    let {plateEntityId, kindId, keyWord, pageSize, suitId, opEntityId} = params
    apiDeleteSuit(opEntityId, suitId, plateEntityId).then(data => {
        !!data.data && getSuitList({commit}, {opEntityId, plateEntityId, kindId, keyWord, pageIndex: 1, pageSize})
    }).catch(e => {
        catchError(e)
    })
}

// 获取新增/编辑时候套餐的点菜单位select列表
export const getOrderUnitSelectList = ({commit}) => {
    return new Promise((resolve, reject) => {
        apiGetOrderUnit().then(data => {
            commit(types.GET_ORDER_UNIT_SELECT_LIST, data.data)
            resolve(true)
        }).catch(e => {
            catchError(e)
            reject(e)
        })
    })
}

//  获取套餐的标签列表
export const getSuitLableList = ({commit}, params) => {
    let opEntityId = params.opEntityId
    apiGetSuitLabelList(opEntityId).then(data => {
        commit(types.GET_SUIT_LABEL_LIST, data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 获取套餐内的商品列表
export const getSuitGoodsList = ({commit}, params) => {
    let {plateEntityId, kindId, keyWord, pageNum, pageSize, opEntityId, callback} = params
    commit(types.GET_SUIT_GOODS_LIST, [])
    apiGetSuitGoods(
        plateEntityId,
        kindId,
        keyWord,
        pageNum,
        pageSize,
        opEntityId
    ).then(data => {
        commit(types.GET_SUIT_GOODS_LIST, data.data)
        callback && callback()
    }).catch(e => {
        catchError(e)
        callback && callback()
    })
}

// 修改新增/编辑套餐基本信息的值
export const changeSuitBaseInfoVal = ({commit}, params) => {
    commit(types.CHANGE_SUIT_BASEINFO_VAL, params)
}

// 初始化套餐基本信息
export const clearSuitBaseInfo = ({commit}) => {
    commit(types.CLEAR_SUIT_BASEINFO)
}

// 获取套餐基本信息
export const getSuitBaseInfoDetail = ({commit}, params) => {
    let {opEntityId, suitId} = params
    // 初始化套餐基本信息
    commit(types.CLEAR_SUIT_BASEINFO)
    apiGetSuitBaseInfo(opEntityId, suitId).then(data => {
        commit(types.STORAGE_SUIT_BASEINFO, data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 获取套餐分组信息
export const getSuitGroupList = ({commit}, params) => {
    let {opEntityId, suitId, callback} = params
    apiGetSuitItems(opEntityId, suitId).then(data => {
        callback && callback(data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 新增/编辑套餐基本信息
export const saveSuitBaseInfo = ({commit}, params) => {
    let {
        opEntityId, plateEntityId, suitId, suitName, account, accountId, kindMenuId, memberPrice, price,
        suitCode, acridLevel, recommendLevel, specialTagId, status, mainPicture,
        detail, detailImgList, isChangePrice, isAllowDiscount, isBackAuth, startNum, isTakeout,
        isReserve, discountInclude, callback
    } = params

    mainPicture = mainPicture.map(item => {
        let obj = {
            path: item.path,
            sortCode: item.sortCode,
            isValid: item.isValid
        }
        if(item.id){
            obj.id = item.id
        }
        return obj
    })

    detailImgList = detailImgList.map(item => {
        let obj = {
            path: item.path,
            sortCode: item.sortCode,
            isValid: item.isValid
        }
        if(item.id){
            obj.id = item.id
        }
        return obj
    })

    apiSaveSuitBaseInfo(suitId, suitName, account, accountId, kindMenuId, Number(memberPrice), Number(price), suitCode, acridLevel, recommendLevel,
        specialTagId, status, mainPicture, detail, detailImgList , isChangePrice, isAllowDiscount,
        isBackAuth, startNum, isTakeout, isReserve, discountInclude, opEntityId, plateEntityId, callback).then(data => {
        // 初始化套餐基本信息
        commit(types.CLEAR_SUIT_BASEINFO)
        callback && callback(data.data)
    }).catch(e => {
        catchError(e)
    })
}

// 保存套餐分组信息
export const saveSuitGroupList = ({commit}, params) => {
    let {opEntityId, suitId, groupList, callback} = params
    // 这里是过滤后端不需要的字段
    let arr = groupList.map(item => {
        let itemList = item.itemList && item.itemList.map(data => {
                let obj2 = {
                    itemId: data.itemId,
                    discountValue: data.discountValue,
                    num: data.num || 0,
                    isValid: data.isValid
                }
                if(data.specDetailId){
                    obj2.specDetailId = data.specDetailId
                }
                if(data.id){
                    obj2.id = data.id
                }
                return obj2
            })
        let obj = {
            name: item.name,
            num: item.num,
            isRequired: item.isRequired,
            isValid: item.isValid,
            itemList: itemList || []
        }
        if(item.id){
            obj.id = item.id
        }
        return obj
    })
    apiSaveSuitItems(opEntityId, suitId, arr).then(data => {
        callback && callback()
    }).catch(e => {
        catchError(e)
    })
}
