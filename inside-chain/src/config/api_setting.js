import {API_BASE_URL} from "apiConfig"
import Requester from '@/base/requester'
import {GW} from '@2dfire/gw-params'
const AND = '&' + GW + '&'

/**
 * 获取开店设置/商品和套餐/ 品牌列表
 * @returns {*|V}
 */
export const apiGetBrandList = () => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.IPlateBossPcService.getAllPlateByBrand" + AND,
        {
            params: {}
        }
    )
}

/**
 * 商品获取下拉框内容
 */
export const apiGetSelectList = (opEntityId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.getInitItem" + AND,
        {
            params: {
                opEntityId,
                initItemReq: JSON.stringify({
                    plateEntityId
                })
            }
        }
    )
}

/**
 * 获取商品/套餐分类列表
 * @param isInclude -1-全部 0-商品 1-套餐
 * @param plateEntityId
 * @param opEntityId
 * @returns {*|V}
 */
export const apiGetCategory = (isInclude, plateEntityId, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.kindMenuTreeSelect" + AND,
        {
            params: {
                isInclude,
                plateEntityId,
                opEntityId
            }
        }
    )
}

/**
 * 修改商品分类
 * @param plateEntityId
 * @param kindId
 * @param idList
 * @param opEntityId
 * @returns {*|V}
 */
export const apiChangeGoodsCategory = (plateEntityId, kindId, idList, opEntityId) => {
    let strIds = JSON.stringify(idList)
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.changeItemCategory" + AND,
        {
            params: {
                changeItemCategoryReq: JSON.stringify({
                    plateEntityId,
                    kindId,
                    idList: strIds
                }),
                opEntityId
            }
        }
    )
}

/**
 * 删除商品
 * @param plateEntityId  品牌id
 * @param idList 商品id 数组
 * @param opEntityId 单店时候从url的entityId里面取
 * @returns {*|V}
 */
export const apiDeleteGoods = (plateEntityId, idList, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.removeItem" + AND,
        {
            params: {
                removeItemReq: JSON.stringify({
                    plateEntityId,
                    idList
                }),
                opEntityId
            }
        }
    )
}

/**
 * 获取商品列表
 * @param opEntityId 单店时候从cookie里面取
 * @param kindId
 * @param keyWord 搜索框内容
 * @param pageNum 第几页
 * @param pageSize 每页数量
 * @param plateEntityId  品牌id
 * @returns {*|V}
 */
export const apiFilterGoodsList = (plateEntityId, kindId, keyWord = '', pageNum = 1, pageSize = 20, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.listItem" + AND,
        {
            params: {
                opEntityId,
                listItemReq: JSON.stringify({
                    kindId,
                    keyWord,
                    pageNum,
                    pageSize,
                    plateEntityId
                })
            }
        }
    )
}

/**
 * 新增商品
 * @param opEntityId
 * @param id
 * @param kindId
 * @param label
 * @param name
 * @param price
 * @param memberPrice
 * @param buyAccount
 * @param account
 * @param accountId
 * @param isTwoAccount
 * @param code
 * @param headPicList
 * @param specDetailList
 * @param makeList
 * @param weight
 * @param specWeightList
 * @param isRatio
 * @param isChangePrice
 * @param isBackAuth
 * @param isGive
 * @param consume
 * @param serviceFeeMode
 * @param serviceFee
 * @param deductKind
 * @param deduct
 * @param startNum
 * @param mealOnly
 * @param stepLength
 * @param isReserve
 * @param isTakeout
 * @param packingBoxId
 * @param packingBoxNum
 * @param memo
 * @param showTop
 * @param detailPicList
 * @param state
 * @param plateEntityId
 * @returns {V|*}
 */
export const apiAddGoodsItem = (opEntityId, id, kindId, label = {}, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
                                isTwoAccount, code, headPicList = [], specDetailList = [], makeList = [], weight, specWeightList = [],
                                isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
                                deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
                                packingBoxNum, memo, showTop, detailPicList = [], state, plateEntityId, discountInclude) => {
    return Requester.post(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.addItem" + AND,
        {
            opEntityId,
            addOrModifyItemReq: JSON.stringify({
                opEntityId,
                id,
                kindId,
                label,
                name,
                price,
                memberPrice,
                buyAccount,
                buyAccountId,
                account,
                accountId,
                isTwoAccount,
                code,
                headPicList,
                specDetailList,
                makeList,
                weight,
                specWeightList,
                isRatio,
                isChangePrice,
                isBackAuth,
                isGive,
                consume,
                serviceFeeMode,
                serviceFee,
                deductKind,
                deduct,
                startNum,
                mealOnly,
                stepLength,
                isReserve,
                isTakeout,
                packingBoxId,
                packingBoxNum,
                memo,
                showTop,
                detailPicList,
                state,
                plateEntityId,
                discountInclude
            })
        },
        {emulateJSON: true}
    )
}

/**
 * 修改商品
 * @param opEntityId
 * @param id
 * @param kindId
 * @param label
 * @param name
 * @param price
 * @param memberPrice
 * @param buyAccount
 * @param account
 * @param accountId
 * @param isTwoAccount
 * @param code
 * @param headPicList
 * @param specDetailList
 * @param makeList
 * @param weight
 * @param specWeightList
 * @param isRatio
 * @param isChangePrice
 * @param isBackAuth
 * @param isGive
 * @param consume
 * @param serviceFeeMode
 * @param serviceFee
 * @param deductKind
 * @param deduct
 * @param startNum
 * @param mealOnly
 * @param stepLength
 * @param isReserve
 * @param isTakeout
 * @param packingBoxId
 * @param packingBoxNum
 * @param memo
 * @param showTop
 * @param detailPicList
 * @param state
 * @param plateEntityId
 * @returns {V|*}
 */
export const apiModifyGoodsItem = (opEntityId, id, kindId, label = {}, name, price, memberPrice, buyAccount, buyAccountId, account, accountId,
                                   isTwoAccount, code, headPicList = [], specDetailList = [], makeList = [], weight, specWeightList = [],
                                   isRatio, isChangePrice, isBackAuth, isGive, consume, serviceFeeMode, serviceFee,
                                   deductKind, deduct, startNum, mealOnly, stepLength, isReserve, isTakeout, packingBoxId,
                                   packingBoxNum, memo, showTop, detailPicList = [], state, plateEntityId, discountInclude) => {
    return Requester.post(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.modifyItem" + AND,
        {
            opEntityId,
            addOrModifyItemReq: JSON.stringify({
                opEntityId,
                id,
                kindId,
                label,
                name,
                price,
                memberPrice,
                buyAccount,
                buyAccountId,
                account,
                accountId,
                isTwoAccount,
                code,
                headPicList,
                specDetailList,
                makeList,
                weight,
                specWeightList,
                isRatio,
                isChangePrice,
                isBackAuth,
                isGive,
                consume,
                serviceFeeMode,
                serviceFee,
                deductKind,
                deduct,
                startNum,
                mealOnly,
                stepLength,
                isReserve,
                isTakeout,
                packingBoxId,
                packingBoxNum,
                memo,
                showTop,
                detailPicList,
                state,
                plateEntityId,
                discountInclude
            })
        },
        {emulateJSON: true}
    )
}

/**
 * 获取商品打包盒列表
 * @param opEntityId
 * @param plateEntityId
 * @returns {*|V}
 */
export const apiGetPackageList = (opEntityId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.listPackingBox" + AND,
        {
            params: {
                opEntityId,
                listPackingBoxReq: JSON.stringify({plateEntityId})
            }
        }
    )
}

/**
 * 获取商品标签列表
 * @param opEntityId
 * @param plateEntityId
 * @returns {*|V}
 */
export const apiGetGoodsLabelList = (opEntityId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.detailLabel" + AND,
        {
            params: {
                opEntityId,
                detailLabelReq: JSON.stringify({plateEntityId})
            }
        }
    )
}

/**
 * 获取规格列表
 * @returns {*|V}
 */
export const apiGetSpecList = () => {
    return Requester.get(
        API_BASE_URL + "http://zmfile.2dfire-daily.com/zmfile/imageUpload" + AND,
        {
            params: {}
        }
    )
}

/**
 * 获取商品详请
 * @param itemId
 * @param plateEntityId
 * @param opEntityId
 * @returns {*|V}
 */
export const apiGetGoodsDetail = (itemId, plateEntityId, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.detailItem" + AND,
        {
            params: {
                detailItemReq: JSON.stringify({
                    itemId,
                    plateEntityId
                }),
                opEntityId
            }
        }
    )
}

/**
 * 修改套餐分类
 * @param kindId
 * @param suitIdList
 * @param opEntityId
 * @returns {*|V}
 */
export const apiChangeSuitCateGory = (kindId, suitIdList, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.updateGoodsOrSuitKind" + AND,
        {
            params: {
                kindId,
                suitIdList: JSON.stringify(suitIdList),
                opEntityId
            }
        }
    )
}

/**
 * 修改套餐标签
 * @param opEntityId
 * @param suitId
 * @param acridLevel
 * @param recommendLevel
 * @param specialTagId
 * @param plateEntityId
 * @returns {*|V}
 */
export const apiChangeSuitLabel = (opEntityId, suitId, acridLevel, recommendLevel, specialTagId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.ISuitService.updateSuitTag" + AND,
        {
            params: {
                opEntityId,
                suitId,
                acridLevel,
                recommendLevel,
                specialTagId,
                plateEntityId
            }
        }
    )
}

/**
 * 删除套餐
 * @param opEntityId
 * @param suitId
 * @param plateEntityId
 * @returns {*|V}
 */
export const apiDeleteSuit = (opEntityId, suitId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.ISuitService.deleteSuit" + AND,
        {
            params: {
                opEntityId,
                suitId,
                plateEntityId
            }
        }
    )
}

/**
 * 筛选套餐列表
 * @param opEntityId
 * @param plateEntityId
 * @param keyWord
 * @param kindId
 * @param pageIndex
 * @param pageSize
 * @returns {*|V}
 */
export const apiFilterSuit = (opEntityId, plateEntityId, keyWord, kindId, pageIndex, pageSize) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.ISuitService.getSuitList" + AND,
        {
            params: {
                opEntityId,
                plateEntityId,
                kindId,
                keyWord,
                pageIndex,
                pageSize
            }
        }
    )
}

/**
 * 获取套餐标签
 * @param suitId
 * @returns {*|V}
 */
export const apiGetSuitLabel = (suitId) => {
    return Requester.get(
        API_BASE_URL + "http://zmfile.2dfire-daily.com/zmfile/imageUpload" + AND,
        {
            params: {
                suitId: ''
            }
        }
    )
}

/**
 * 获取点餐单位下拉选项框列表
 * @returns {V|*}
 */
export const apiGetOrderUnit = () => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.pc.IUnitService.getUnitListWithoutConversion" + AND,
        {
            params: {}
        }
    )
}

/**
 * 获取套餐的标签列表
 * @param opEntityId
 * @returns {*|V}
 */
export const apiGetSuitLabelList = (opEntityId) => {
    return Requester.get(
        API_BASE_URL + 'com.dfire.boss.center.centerpc.item.service.ISuitService.getLabelConf' + AND,
        {
            params: {
                opEntityId
            }
        }
    )
}

/**
 * 获取套餐内的商品
 * @param plateEntityId
 * @param kindId
 * @param keyWord
 * @param pageNum
 * @param pageSize
 * @param opEntityId
 * @returns {*|V}
 */
export const apiGetSuitGoods = (plateEntityId, kindId, keyWord = '', pageNum = 1, pageSize = 20, opEntityId) => {
    return Requester.get(
        API_BASE_URL + "com.dfire.boss.center.centerpc.item.service.IItemService.listItemForSuit" + AND,
        {
            params: {
                opEntityId,
                listItemReq: JSON.stringify({
                    kindId,
                    keyWord,
                    pageNum,
                    pageSize,
                    plateEntityId
                })
            }
        }
    )
}

/**
 * 获取商品/套餐的菜单列表
 * @param itemId
 * @param plateEntityId
 */
export const apiGetBelongsMenuList = (itemId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + 'com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.listChainMenu' + AND,
        {
            params: {
                listChainMenuReq: JSON.stringify({
                    itemId,
                    plateEntityId
                })
            }
        }
    )
}

/**
 * 获取商品/套餐门店列表
 * @param itemId
 * @param plateEntityId
 */
export const apiGetBelongsShopList = (itemId, plateEntityId) => {
    return Requester.get(
        API_BASE_URL + 'com.dfire.boss.center.centerpc.chainmenu.service.IChainMenuClientService.listIssueShop' + AND,
        {
            params: {
                listIssueShopReq: JSON.stringify({
                    itemId,
                    plateEntityId
                })
            }
        }
    )
}

/**
 * 获取套餐详情的的基本信息（第一步）
 * @param opEntityId
 * @param suitId
 */
export const apiGetSuitBaseInfo = (opEntityId, suitId) => {
    return Requester.get(
        API_BASE_URL + 'com.dfire.boss.center.pc.ISuitService.getSuitDetail' + AND,
        {
            params: {
                opEntityId,
                suitId
            }
        }
    )
}

/**
 * 获取套餐分组详情
 * @param opEntityId
 * @param suitId
 */
export const apiGetSuitItems = (opEntityId, suitId) => {
    return Requester.get(
        API_BASE_URL + 'com.dfire.boss.center.pc.ISuitService.getSuitItems' + AND,
        {
            params: {
                opEntityId,
                suitId
            }
        }
    )
}

/**
 * 保存套餐基本信息（第一步）
 * @param suitId
 * @param suitName
 * @param account
 * @param accountId
 * @param kindMenuId
 * @param memberPrice
 * @param price
 * @param suitCode
 * @param acridLevel
 * @param recommendLevel
 * @param specialTagId
 * @param status
 * @param mainPicture
 * @param detail
 * @param detailImgList
 * @param isChangePrice
 * @param isAllowDiscount
 * @param isBackAuth
 * @param startNum
 * @param isTakeout
 * @param isReserve
 * @param discountInclude
 * @param opEntityId
 * @param plateEntityId
 */
export const apiSaveSuitBaseInfo = (suitId, suitName, account, accountId, kindMenuId, memberPrice, price, suitCode, acridLevel, recommendLevel,
                                    specialTagId, status, mainPicture = [], detail, detailImgList = [], isChangePrice, isAllowDiscount,
                                    isBackAuth, startNum, isTakeout, isReserve, discountInclude, opEntityId, plateEntityId) => {
    return Requester.post(
        API_BASE_URL + 'com.dfire.boss.center.pc.ISuitService.saveSuit' + AND,
        {
            suitId, suitName: suitName.trim(), account, accountId, kindMenuId, memberPrice, price, suitCode, acridLevel, recommendLevel,
            specialTagId, status, mainPicture: JSON.stringify(mainPicture), detail, detailImgList: JSON.stringify(detailImgList), isChangePrice, isAllowDiscount,
            isBackAuth, startNum, isTakeout, isReserve, discountInclude, opEntityId, plateEntityId
        },
        {emulateJSON: true}
    )
}

/**
 * 保存套餐信息第二步
 * @param opEntityId
 * @param suitId
 * @param groupList
 */
export const apiSaveSuitItems = (opEntityId, suitId, groupList) => {
    return  Requester.post(
        API_BASE_URL + 'com.dfire.boss.center.pc.ISuitService.saveSuitItems' + AND,
        {
            opEntityId,
            suitId,
            groupList: JSON.stringify(groupList)
        },
        {emulateJSON: true}
    )
}

