const Format = {
    /**
     * 格式化规格列表
     * @param data
     */
    formatSpec(data) {
        const result = []
        if(data.length>0) {
            data.forEach( item => {
                const { name, charId='', skuValueList=[], status } = item
                const list = []
                if(skuValueList.length > 0) {
                    skuValueList.forEach(function(item) {
                        const { name, status, charId='', charPropertyId='' } = item
                        list.push({
                            name: name,
                            enable: status,
                            id: charId,
                            propertyId: charPropertyId,
                        })
                    })
                }
                result.push({
                    name,
                    id: charId,
                    list,
                    idFold: false,
                    enable: status,
                })
            })
            return result
        }
        return data
    },
    
    /**
     * 更新规格列表
     * @param data 规格列表
     * @param specId 列表Id
     */
    updateSpecList(data=[], specId) {
        data.forEach( item => {
            const { id, list=[] } = item
            if(list.length > 0) {
                list.forEach(function(value) {
                    let status = value.enable
                    if(value.id === specId) {
                        value.enable = status === 0 ? 1 : 0
                    }
                })
            }
            let status = item.enable
            if(id === specId) {
                status = status === 0 ? 1 : 0
            }
            item.enable = status
        })
        return data
    },
    
    /**
     * 格式化分类列表
     * @param data
     */
    formatCateList(data) {
        let result = []
        let tier = 1
        if(data.length > 0) {
            data.forEach( (item, i) => {
                let list = []
                const {categoryName, categoryId, categoryList = [], code='', groupCategoryId='', parentId='', chain=false } = item
                if(categoryList.length>0) {
                    list = this.recursionCate(categoryList, tier)
                }
                const obj = {
                    tier,
                    code,
                    id: categoryId,
                    key: categoryId,
                    type: '商品分类',
                    name: categoryName,
                    groupCategoryId,
                    parentId,
                    chain,
                }
                if(list.length > 0) {
                    obj.children = list
                }
                result.push(obj)
            })
            return result
        }
        return data
    },
    
    /**
     * 递归分类列表
     * @param data
     * @param tier 级别
     */
    recursionCate(data, tier) {
        const result = []
        tier += 1
        data.forEach( item => {
            let list = []
            const {categoryName, categoryId, categoryList = [], code='', parentId='', groupCategoryId='', chain=false} = item
            if(categoryList.length>0) {
                list = this.recursionCate(categoryList, tier)
            }
            const obj = {
                tier,
                code,
                id: categoryId,
                key: categoryId,
                name: categoryName,
                type: '商品分类',
                groupCategoryId,
                parentId,
                chain,
            }
            if(list.length > 0) {
                obj.children = list
            }
            result.push(obj)
        })
        return result
    },
    
    /**
     * 商品分类扁平化
     * @param data
     */
    formatCateListFlat(data) {
        let result = []
        if(data.length > 0) {
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
        data.forEach( (item, i) => {
            const {categoryName, categoryId, categoryList = [], chain, code=''} = item
            result.push({
                name: categoryName,
                id: categoryId,
                chain,
                code,
            })
            if(categoryList.length>0) {
                this.recursionFlat(categoryList, result)
            }
        })
        return result
    }
}

export default Format
