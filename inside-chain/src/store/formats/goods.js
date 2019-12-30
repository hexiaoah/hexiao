/**
 *
 * @param res
 * @author
 *
 */
const goodsFormat = {


    /********************************************商品分类********************************************************/
    //商品分类单条记录 进行格式化
    formatGoodClassSingleList: function (titles, item, deep) {
        // console.log('formatGoodClassSingleList before:',item,titles)
        let title_ = titles;
        let curItem = {
            entityId: item.entityId,
            id: item.id,//
            item: {},//表项内容
            list: item.subList,
            isOpen: false,
            isAddSub: item.addSub,
            isInclude: item.isInclude,
            deep: deep,
        }
        title_.map((title, index) => {

            if (title.type != 'operate') {
                if (title.id == 1) {
                    curItem.item[title.id] = item.name
                }

                if (title.id == 2) {
                    curItem.item[title.id] = (item.isInclude == 0) ? '商品分类' : '套餐分类'
                }
            } else {
                if (curItem.item[title.id] == undefined) {
                    curItem.item[title.id] = {}
                }

                for (let key in title.operates) {

                    //新增子类
                    if (key == 0) {
                        if (!!item.addSub) {
                            curItem.item[title.id][title.operates[key].id] = {
                                disabled: false
                            }

                        } else {
                            curItem.item[title.id][title.operates[key].id] = {
                                disabled: true
                            }
                        }
                        if (deep >= 3) {
                            console.log(item.name, 'deep', deep, title.operates[key]);
                            curItem.item[title.id][title.operates[key].id] = {
                                disabled: true,
                                disableType: 'transparent',
                            }
                            console.log(curItem.item[title.id][title.operates[key].id])
                        }
                    } else if (key == 1) {//编辑
                        // if(curItem.list && curItem.list.length>0){
                        //     curItem.item[title.id][title.operates[key].id] = {
                        //         disabled: true
                        //     }
                        // }
                    } else {//删除
                        // if (curItem.list && curItem.list.length > 0) {
                        //     curItem.item[title.id][title.operates[key].id] = {
                        //         disabled: true,
                        //     }
                        // }
                        // if (!item.addSub) {
                        //     curItem.item[title.id][title.operates[key].id] = {
                        //         disabled: true,
                        //     }
                        // }
                    }
                }
            }
        })
        // console.log('formatGoodClassSingleList after:',item)
        return curItem;
    },

    //格式化商品分类 主要用于界面的列表展示
    formatGoodClassList: function (params) {
        let {titles, arr, deep} = params
        if (arr == undefined) return;
        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.formatGoodClassSingleList(titles, arr[i], deep)
            if (arr[i].list != undefined) {
                var ss = this.formatGoodClassList({
                    titles: titles,
                    arr: arr[i].list,
                    deep: deep + 1
                })
                arr[i].list = ss;
            } else {

            }
        }
        return arr;
    },

    //

    /****************************************商品加料************************************************************/
    formatGoodFeedListItem: function (titles, item) {
        // console.log('formatGoodFeedListItem',item)
        let tmpItem = {
            id: item.kindMenuId,
            entityId: item.entityId,
            parent: {
                contents: {
                    1: {
                        content: item.kindMenuName
                    }
                },
                operations: {
                    11: {//添加
                        disable: false,
                    },
                    12: {//编辑
                        disable: false,
                    },
                    13: {
                        // disable: (item.additionMenuList && item.additionMenuList.length > 0) ? true : false,
                    }
                }
            },
            child: []
        }
        if (!item.additionMenuList) item.additionMenuList = [];
        item.additionMenuList.map(child => {
            // console.log('child',child)
            tmpItem.child.push({
                id: child.menuId,
                entityId: item.entityId,
                contents: {
                    1: {
                        content: child.menuName,
                    },
                    2: {
                        content: child.menuPrice.toFixed(2)
                    }
                },
                operations: {
                    11: {//添加
                        disable: true,
                        disableType: 'transparent',//hidden transparent default
                    },
                    12: {//编辑
                        disable: false,
                        disableType: 'transparent',
                    },
                    14: {
                        disable: false,
                    },
                }
            })
        })
        return tmpItem
    },

    formatGoodFeedList: function (titles, list) {
        // console.log('formatGoodFeedList list')
        for (let i = 0; i < list.length; i++) {
            // console.log('formatGoodFeedList list',i,list[i])
            list[i] = this.formatGoodFeedListItem(titles, list[i]);
        }
        // console.log('formatGoodFeedList list',list)
        return list;
    },

    /****************************************商品备注************************************************************/
    formatGoodRemarkListItem: function (titles, item) {
        let tmpItem = {
            id: item.id,
            entityId: item.entityId,
            parent: {
                contents: {
                    1: {
                        content: item.name
                    }
                },
                operations: {
                    // 11:{
                    //     disable:!item.isAdd,
                    // },
                    // 12:{
                    //     disable:!item.isEdit,
                    // },
                    13: {
                        // disable: (item.tasteList && item.tasteList.length > 0) ? true : false,
                    }
                }
            },
            child: []
        }
        if (!item.tasteList) item.tasteList = [];
        item.tasteList.map(child => {
            // console.log('child',child)
            tmpItem.child.push({
                id: child.id,
                entityId: item.entityId,
                kindTasteId: item.kindTasteId,
                contents: {
                    1: {
                        content: child.name,
                    },
                },
                operations: {
                    11: {
                        disable: true,
                        disableType: 'transparent'
                    },
                    12: {
                        disable: false,
                        disableType: 'transparent'
                    },
                    13: {
                        disable: false
                    },
                }
            })
        })
        // console.log('tmpItem:',tmpItem)
        return tmpItem
    },
    formatGoodRemarkList: function (titles, list) {
        for (let i = 0; i < list.length; i++) {
            list[i] = this.formatGoodRemarkListItem(titles, list[i]);
        }
        // console.log(list)
        return list;
    },
}

export default goodsFormat;
