
export function toInt(num, min = 0) {
    let res = parseInt(num) || 0
    if (res < min) {
        res = min
    }
    return res
}

export function toBool(n) {
    return n ? 1 : 0
}

export const formatBannerList = (data = []) => {
    const formatedList = data.map((d) => {
        return {
            id: d.id,
            index: d.sequenceNumber,
            mallEntityId: d.mallEntityId,

            title: d.title,
            img: d.imgUrl,
            url: d.link,
            totalNum: d.totalNum,
    
            isSelected: toBool(d.isOnShelf),
            isValid: toBool(d.isValid),
        }
    })

    return formatedList
}

// 目前和banner列表一样 以防接口改动
export const formatActivityList = (data = []) => {
    const formatedList = data.map((d, i) => {
        return {
            id: d.id,
            index: d.sequenceNumber,
            udInde: i + 1,
            mallEntityId: d.mallEntityId,

            title: d.title,
            img: d.imgUrl,
            url: d.link,
            totalNum: d.totalNum,
    
            isSelected: toBool(d.isOnShelf),
            isValid: toBool(d.isValid),
            isTop: toBool(d.isTop)
        }
    })

    return formatedList
}

export const bridgeItem = (data = {}) => {
    return {
        id: data.id,
        sequenceNumber: data.index,
        title: data.title,
        imgUrl: data.img,
        link: data.url,
        isOnShelf: data.isSelected,
    }
}
