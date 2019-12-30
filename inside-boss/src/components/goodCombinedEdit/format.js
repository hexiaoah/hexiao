import { InitLogDetailData } from '../../action'

const Format = {
    /**
     * skuVOList格式化
     * @param {*} data
     */
    formatSkuVoList(data = []) {
        data.forEach((item, index) => {
            item.key = index
            item.spec = this.getValuesName(item.values)
        })
        return data
    },
    /**
     * 拼接每一个规格组合的所有规格名称
     * @param {*} values
     */
    getValuesName(values) {
        let result = ''
        if (Array.isArray(values)) {
            values.map(item => {
                result = result + item.name + ';'
            })
        } else {
            result = values.name
        }
        return result
    },
    /**
     * 商品分类格式化
     * @param {*} data
     */
    formatCatogoryList(data) {
        let result
        result = JSON.parse(
            JSON.stringify(data)
                .replace(/categoryList/g, 'children')
                .replace(/categoryId/g, 'value')
                .replace(/categoryName/g, 'label')
        )
        return result
    },
    /**
     * 筛选自建分类
     * @param {*} data
     */
    formatSelfCategory(data) {
        const result = data.filter(item => item.chain === false)
        return result
    },
    /**
     * 筛选自建单位
     * @param {*} data
     */
    formatSelfUnit(data) {
        const result = data.filter(item => item.chain === false)
        return result
    },
    /**
     * 过滤出已经选用的规格
     * @param {*} data
     */
    formatSelectedSku(data) {
        const selectdSku = data.filter(item => item.isSelect === 1)
        return selectdSku
    },
    /**
     *筛选当前选择的sku值
     */
    findSelectedSkuValues(selectdSkuList) {
        let result = []
        selectdSkuList.forEach(item => {
            const v = item.skuValueList.filter(t => t.isSelect === 1)
            if (v.length > 0) {
                result.push(v)
            }
        })
        return result
    },
    /**
     * sku组合函数
     * @param {*} skuList
     */
    selectdSkuToTableData(skuList, index, result, id) {
        let tempResult = result
        const nowSelect = skuList[index].skuValueList.filter(
            item => item.isSelect === 1
        )
        const len = nowSelect.length
        const selectedValues = this.findSelectedSkuValues(skuList)
        let newArr = []
        if (len < 2) {
            newArr = selectedValues
            tempResult = []
        } else {
            newArr = this.findSameSku(selectedValues, id)
        }
        const skuMapData = this.skuMap(newArr)
        skuMapData.forEach(item => {
            let tempValues = []
            if (Array.isArray(item)) {
                tempValues = [...item]
            } else {
                tempValues[0] = item
            }
            tempResult.push({
                id: '',
                code: '',
                name: '',
                price: null,
                memberPrice: null,
                inventory: null,
                frozenStock: null,
                values: tempValues
            })
        })
        const endResult = this.setInitValues(tempResult)
        return endResult
    },
    // 判断是否是接口返回的规格组合
    setInitValues(newValues) {
        const initSkuVOList = JSON.parse(localStorage.getItem('initSkuVOList'))
        const nowSkuVOList = this.formatSkuVoList(newValues)
        nowSkuVOList.map((item, index) => {
            const same = initSkuVOList.filter(t => {
                const valuesArr = this.getEachIdForSkuData(item.values)
                const initValuesArr = this.getEachIdForSkuData(t.values)
                const nowLen = valuesArr.length
                const initLen = initValuesArr.length
                let flag = initValuesArr.every(x => {
                    return valuesArr.includes(x)
                })
                if (nowLen === initLen && flag) {
                    return t
                }
            })
            if (same.length) {
                newValues[index] = {
                    id: same[0].id,
                    code: same[0].code,
                    price: same[0].price,
                    memberPrice: same[0].memberPrice,
                    inventory: same[0].inventory,
                    frozenStock: same[0].frozenStock,
                    values: same[0].values
                }
            }
        })
        return newValues
    },
    // 获取每条组合规格下的所有规格值id
    getEachIdForSkuData(data) {
        let result = []
        data.map(item => {
            result.push(item.charId)
        })
        return result
    },
    // 过滤当前所选规格值之下的兄弟规格值
    findSameSku(data, tempId) {
        let tempArr = []
        let tempIndex = 0
        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].length; i++) {
                if (data[j][i].charId === tempId) {
                    tempIndex = j
                    tempArr.push(data[j][i])
                    data[tempIndex] = tempArr
                }
            }
        }
        return data
    },
    /**
     * sku规格组合
     */
    skuMap(skus) {
        let len = skus.length
        if (len >= 2) {
            let len1 = skus[0].length
            let len2 = skus[1].length
            let tempSku = []
            let index = 0
            for (let i = 0; i < len1; i++) {
                for (let j = 0; j < len2; j++) {
                    if (Array.isArray(skus[0][i])) {
                        tempSku[index] = [...skus[0][i], skus[1][j]]
                    } else {
                        tempSku[index] = [skus[0][i], skus[1][j]]
                    }
                    index++
                }
            }
            let newArray = []
            for (let i = 2; i < len; i++) {
                newArray[i - 1] = skus[i]
            }
            newArray[0] = tempSku
            return this.skuMap(newArray)
        } else {
            return skus[0]
        }
    },
    // 取消勾选
    deleteSkuValue(selectedSkuList, data, index, id) {
        const tempData = data
        const nowSelect = selectedSkuList[index].skuValueList.filter(
            item => item.isSelect === 1
        )
        const len = nowSelect.length
        const selectedValues = this.findSelectedSkuValues(selectedSkuList)
        const sLen = selectedValues.length
        for (let i = data.length - 1; i >= 0; i--) {
            if (Array.isArray(tempData[i].values)) {
                tempData[i].values.map((t, tIndex) => {
                    if (t.charId === id) {
                        if (sLen < 1) {
                            tempData.splice(i, 1)
                        } else {
                            if (len >= 1) {
                                tempData.splice(i, 1)
                            } else {
                                tempData[i].values.splice(tIndex, 1)
                            }
                        }
                    }
                })
            } else {
                if (tempData[i].values.charId === id) {
                    tempData.splice(i, 1)
                }
            }
        }
        const endResult = this.setInitValues(tempData)
        return endResult
    },
    /**
     * 商品分类扁平化
     * @param data
     */
    formatCateListFlat(data) {
        let result = []
        if (data.length > 0) {
            result = this.recursionFlat(data, result)
            return result
        }
        return data
    },
    /**
     * 一个递归的函数，用来处理商品分类
     * @param data
     * @param result
     * @returns {*}
     */
    recursionFlat(data, result) {
        data.forEach(item => {
            const { categoryName, categoryId, categoryList = [], chain } = item
            result.push({
                name: categoryName,
                id: categoryId,
                chain
            })
            if (categoryList.length > 0) {
                this.recursionFlat(categoryList, result)
            }
        })
        return result
    },
    revertSkuVOList(data) {
        data.map(item => {
            item.values.map(t => {
                t.id = t.charId
                t.propertyId = t.charPropertyId
            })
        })
        return data
    },
    // 组合明细数据
    formatSelectSpecGoodList(data, currentSelectList) {
        console.log(data, currentSelectList, 'initData')
        const list = []
        for (let j = 0; j < data.spec.length; j++) {
            const res = currentSelectList.filter(
                t => t.skuId === data.spec[j].id
            )
            if (res.length > 0) {
                continue
            }
            const price = data.spec[j].price.toFixed(2)
            const skuId = data.spec[j].id
            const skuDesc = data.spec[j].spec
            const itemName = data.spec[j].name
            const currentStock = parseInt(data.spec[j].frozenStock)
            const num = 1
            const subtotal = 0
            list.push({
                price,
                skuId,
                skuDesc,
                itemId: data.id,
                itemName,
                currentStock,
                subtotal,
                unitName: data.account,
                num
            })
        }
        return list
    },
    formatCombinedDetailList(detailList) {
        let subSum = 0
        let subStock = 0
        let subNum = 0
        for (let i = 0; i < detailList.length; i++) {
            if (detailList[i].skuDesc === ('null' || undefined)) {
                detailList[i].skuDesc = '-'
            }
            if (detailList[i].flag !== 1) {
                detailList[i].num === undefined
                    ? (detailList[i].num = 1)
                    : (detailList[i].num = detailList[i].num)
                detailList[i].subtotal = detailList[i].price * detailList[i].num
                subStock = subStock + detailList[i].currentStock
                subNum = subNum + detailList[i].num
                subSum = subSum + detailList[i].subtotal
            } else {
                detailList[i].num = subNum
                detailList[i].subtotal = subSum
                detailList[i].currentStock = subStock
            }
        }
        return detailList
    },
    formatCombinedDetailSource(data) {
        if (data.length > 0 && data[data.length - 1].flag !== 1) {
            const subSum = 0
            const subNum = 0
            for (let i = 0; i <= data.length - 1; i++) {
                // subStock += data[i].currentStock
                subNum += data[i].num
                subSum += data[i].subtotal
            }
            data.push({
                flag: 1,
                itemName: '合计',
                subtotal: subSum.toFixed(2),
                num: subNum
            })
        }
        return data
    },
    getRequestChildItem(data = []) {
        const list = []
        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i]
                const itemId = element.itemId || element.goodId
                const skuId = element.skuId || element.specId || ''
                const num = element.num || element.combinedNum
                const tempObj = {
                    itemId,
                    skuId,
                    num
                }
                list.push(tempObj)
            }
        }
        return list
    },
    formatCombinedSource(data = [], dispatch, props = [], action) {
        for (let i = 0; i < data.length; i++) {
            let num = 0
            const element = data[i]
            const id = element.id
            const list = props.selectCombinedGoods
            for (let j = 0; j < list.length; j++) {
                const selectedId = list[j].itemId
                if (selectedId === id) {
                    num += 1
                }
            }
            data[i].selectSpecsNum = num
        }
        return data
    }
}

export default Format
