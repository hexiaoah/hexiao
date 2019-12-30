// 商品基本信息
export const goodsDetailFromBackBaseInfo = state => {
    let { kindId, kindName, label, name, id, price, memberPrice, account, buyAccount, code, isTwoAccount, discountInclude } = state.common.goods.detailFromBack
    return {
        kindId,
        kindName,
        label,
        name,
        price,
        memberPrice,
        account,
        buyAccount,
        code,
        isTwoAccount,
        id,
        discountInclude
    }
}

// 商品主图
export const goodsdetailFromBackHeadPicList = state => {
    let { headPicList } = state.common.goods.detailFromBack
    return headPicList
}

// 商品规格和做法
export const goodsDetailFromBackSpecAndPractice = state => {
    let { makeList, specDetailList } = state.common.goods.detailFromBack
    return {
        makeList,
        specDetailList
    }
}

// 商品菜肴份量
export const goodsDetailFromBackSpecWeight = state => {
    let { specWeightList, weight} = state.common.goods.detailFromBack
    return {
        specWeightList,
        weight
    }
}

// 商品收银设置
export const goodsDetailToBackCashierSet = state => {
    let { isRatio, isChangePrice, isBackAuth, isGive, consume } = state.common.goods.detailToBack
    return {
        isRatio,
        isChangePrice,
        isBackAuth,
        isGive,
        consume
    }
}

// 商品服务费和提成
export const goodsDetailFromBackServiceFee = state => {
    let { serviceFeeMode, serviceFee, deductKind, deduct } = state.common.goods.detailFromBack
    return {
        serviceFeeMode,
        serviceFee,
        deductKind,
        deduct
    }
}

// 商品展示设置
export const goodsDetailToBackShowSetting = state => {
    let { startNum, mealOnly, stepLength, isTakeout, isReserve, packingBoxName, packingBoxId, packingBoxNum} = state.common.goods.detailToBack
    return {
        startNum,
        mealOnly,
        stepLength,
        isTakeout,
        isReserve,
        packingBoxName,
        packingBoxId,
        packingBoxNum
    }
}

// 商品详情图和视频
export const goodsDetailFromBackMediaStream = state => {
    let { memo, showTop, detailPicList, video } = state.common.goods.detailFromBack
    return {
        memo,
        showTop,
        detailPicList,
        video
    }
}

// 商品状态
export const goodsDetailToBackGoodsState = val => {
    let {state} = val.common.goods.detailToBack
    return state
}

// 套餐基本信息
export const suitDetailToBackBaseInfo = state => {
    let {suitId, suitName, kindMenuId, memberPrice, price, suitCode, account, discountInclude} = state.common.suit.detailBaseInfoToBack
    return {
        suitId,
        suitName,
        kindMenuId: kindMenuId || '',
        memberPrice,
        price,
        suitCode,
        account: account || '',
        discountInclude
    }
}

// 套餐标签
export const suitDetailToBackLabel = state => {
    let {acridLevel, recommendLevel, specialTagId} = state.common.suit.detailBaseInfoToBack
    return {
        acridLevel,
        recommendLevel,
        specialTagId
    }
}

// 套餐主图
export const suitDetailToBackMainImg = state => {
    let {mainPicture} = state.common.suit.detailBaseInfoToBack
    return mainPicture
}

// 编辑时候来自后端的默认图片
export const suitDetailToBackDetailImg = state => {
    let {detailImgList} = state.common.suit.detailBaseInfoToBack
    return detailImgList
}

// 套餐详情图和视频
export const suitDetailToBackDetailAndVideo = state => {
    let {detail, showTop, detailImgList, video} = state.common.suit.detailBaseInfoToBack
    return {
        detail,
        showTop,
        detailImgList,
        video
    }
}

// 套餐收银设置
export const suitDetailToBackCashierSet = state => {
    let {isChangePrice, isAllowDiscount, isBackAuth} = state.common.suit.detailBaseInfoToBack
    return {
        isChangePrice,
        isAllowDiscount,
        isBackAuth
    }
}

// 套餐展示设置
export const suitDetailToBackShowSet = state => {
    let {startNum, isTakeout, isReserve} = state.common.suit.detailBaseInfoToBack
    return {
        startNum,
        isTakeout,
        isReserve
    }
}

// 套餐状态设置
export const suitDetailToBackStateSet = state => {
    let {status} = state.common.suit.detailBaseInfoToBack
    return {status}

}




