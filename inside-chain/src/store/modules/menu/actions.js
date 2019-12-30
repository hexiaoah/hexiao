import Cookie from '@2dfire/utils/cookie'
import Obj from '@2dfire/utils/object'
import API from '@/config/api_menu.js'
import catchError from '@/base/catchError'
import Router from "@/router";
import Vue from 'vue';
import iView from "iview";
import Tools from '@/base/tools'

Vue.use(iView);

let Message = iView.Message;

// 获取品牌菜单列表
export const getAllMenus = (context, params) => {
    API.getAllMenus(params).then(data => {
        let res = {
            menus: [],
            total: 0
        }
        if (data.data) {
            res.menus = data.data;
            res.total = data.data.length;
        }
        console.log('menus: ', res)
        context.commit('_getAllMenus', res)
    }).catch(e => {
        catchError(e)
    })
}


// 获取品牌菜单列表--可复用(商品数量 > 0)
export const getReuseMenus = (context, params) => {
    // 首先获取所有菜单，然后在所有菜单中筛选出商品数量>0的菜单并且不是当前菜单
    API.getAllRemenus(params.plateEntityId).then(data => {
        let res = {}
        if (!!data.data) {
            let temp = []
            res = data.data
            res.map(v => {
                if (v.itemCnt > 0 && v.menuId !== params.menuId) {
                    temp.push(v)
                }
            })
            res = temp
        }
        context.commit('_getReuseMenus', res)
    }).catch(e => {
        catchError(e)
    })
}

// 选中一个可以复用的菜单
export const checkReuseMenus = (context, params) => {
    // 首先获取所有菜单，然后在所有菜单中筛选出商品数量>0的菜单
    let tmp = context.state.reuseMenuList.concat();
    if(tmp && tmp.length > 0){
        tmp.map(item =>{
            if(item.menuId === params.menuId) {
                item.checked = true
            }else {
                item.checked = false
            }
        })
    }
    context.commit('_getReuseMenus', tmp)
}
// 重置复用的菜单
export const resetMenuChecked = (context, params) => {

    context.dispatch('checkReuseMenus', {menuId: ''})
}

// 更新菜单
export const updateMenu = (context, params) => {
    API.updateMenu(params).then(data => {
        let res = {}
        if (!!data) {
            res = data
        }
        context.dispatch('getAllMenus', params.plateEntityId)
    }).catch(e => {
        catchError(e)
    })
}
// 新建菜单
export const createMenu = (context, params) => {
    API.createMenu(params).then(data => {
        let res = {}
        if (!!data) {
            res = data
        }
        context.dispatch('getAllMenus', params.plateEntityId)
    }).catch(e => {
        catchError(e)
    })
}

// 删除菜单
export const deleteMenu = (context, params) => {
    API.deleteMenu(params.menuId).then(data => {
        let res = {}
        if (!!data) {
            res = data
        }
        context.dispatch('getAllMenus', params.plateEntityId)
        Message.info("菜单已删除")
    }).catch(e => {
        catchError(e)
    })
}
// 复用菜单
export const multiplexMenu = (context, params) => {
    API.multiplexMenu(params.menu).then(data => {
        let res = {}
        if (!!data) {
            res = data
        }
        context.dispatch('getGoodsByMenuId', params.searchItems)
    }).catch(e => {
        catchError(e)
    })
}

// 获取菜单内商品
export const getGoodsByMenuId = (context, params) => {

    API.getGoodsByMenuId(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
        }
        context.commit('_getGoodsByMenuId', res)
        context.dispatch('setNoSearchItems',params)
    }).catch(e => {
        catchError(e)
    })
}

// 获取菜单内商品
export const getGoodsByMenuIdSimple = (context, params) => {
    API.getGoodsByMenuIdSimple(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
            if(res.goods && res.goods.length > 0){
                res.goods.map(v => {
                    v.checked = false;
                    v.name = v.itemName;
                })
            }

        }
        context.commit('_getGoodsByMenuIdSimple', res)
    }).catch(e => {
        catchError(e)
    })
}
// 获取所有商品
export const listAllSimpleItem = (context, params) => {
    API.listAllSimpleItem(params).then(data => {
        let res = {}
        if (!!data) {
            res = data.data
        }
        context.commit('_listAllSimpleItem', res)
    }).catch(e => {
        catchError(e)
    })
}
// 获取菜单内商品的价格信息
export const getGoodsPrice = (context, params) => {
    API.getGoodsPrice(params).then(data => {
        let res = {}
        console.log('price info: ', data)
        if (data.data) {
            res = data.data
            res.priceSwitch = !!res.useDefaultPriceSwitch
            if (res.specPrices && res.specPrices.length > 0) {
                res.specPrices.map(v => {
                    v.verify = true
                })
            }
        }
        context.commit('_getGoodsPrice', res)
        context.commit('_priceBackup', {})
    }).catch(e => {
        catchError(e)
    })
}
// 编辑菜单内商品的价格信息
export const updateGoodsPrice = (context, params) => {
    if (params.goodsPrice.priceSwitch) {
        params.goodsPrice.useDefaultPriceSwitch = 1
    } else {
        params.goodsPrice.useDefaultPriceSwitch = 0
    }
    if (!params.goodsPrice.specPrices || params.goodsPrice.specPrices.length < 1) {
        params.goodsPrice.specPrices = '[]'
    }else{
        params.goodsPrice.specPrices = JSON.stringify(params.goodsPrice.specPrices)
    }
    API.updateGoodsPrice(params.goodsPrice).then(data => {
        let res = {}
        console.log('price info: ', data)
        context.dispatch('getGoodsByMenuId', params.searchItems)
    }).catch(e => {
        catchError(e)
    })
}

// 备份商品价格 then 将商品价格设置为默认值
export const setGoodsPrice = (context, params) => {
    // params
    //   true: 备份商品价格并设置为默认值
    //   false: 从备份复原价格
    console.log('a params', params)
    if (params || (!params && Obj.isEmpty(context.state.priceBackup))) {
        let backup = Obj.clone(context.state.goodsPrice);
        let tmp = Obj.clone(context.state.goodsPrice);
        context.commit('_priceBackup', backup);

        // 设置商品价格为默认值
        tmp.price = tmp.defaultPrice;
        tmp.memberPrice = tmp.defaultMemberPrice;
        if (tmp.specPrices && tmp.specPrices.length > 0) {
            tmp.specPrices.map(v => {
                v.price = v.defaultPrice;
            })
        }
        console.log('true params', tmp)

        context.commit('_getGoodsPrice', tmp);
    }
    // 从备份中复原价格
    else {
        let recovery = Obj.clone(context.state.priceBackup);
        recovery.priceSwitch = false;
        console.log('false params', recovery)

        context.commit('_getGoodsPrice', recovery);
    }
}

// 获取菜单内商品分类
export const getGoodsKindsByMenuId = (context, params) => {
    API.getGoodsKindsByMenuId(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
        }
        // 分类处理
        context.commit('_getGoodsKindsByMenuId', res)
    }).catch(e => {
        catchError(e)
    })
}

// 获取菜单内商品分类
export const getGoodsKindsByMenuIdSingle = (context, params) => {
    API.getGoodsKindsByMenuId(params).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
            res.map(v => {
                v.id = v.kindId;
                v.name = v.kindName;
            })
        }
        // 分类处理
        context.commit('_getGoodsKindsByMenuIdSingle', res)
    }).catch(e => {
        catchError(e)
    })
}

// 选中菜单商品中的一个
export const checkOneGoodsOfMenu = (context, params) => {
    console.log('one e', params)
    let tmp_list = context.state.goodsOfMenu.concat();
    tmp_list.map(v => {
        if (v.itemId === params.item.itemId)
            v.checked = params.check
    })
    context.commit('_setGoodsOfMenu', tmp_list)
}

// 选中菜单商品中的全部
export const checkAllGoodsOfMenu = (context, params) => {
    let tmp_list = context.state.goodsOfMenu.concat();
    tmp_list.map(v => {
        v.checked = params
    })
    context.commit('_setGoodsOfMenu', tmp_list)
}

// 移除菜单内的商品
export const removeGoodsOfMenu = (context, params) => {
    let tmp_list = []
    let itemIdList = []
    let itemIds = ''
    // delType:1 批量删除
    // delType:0 单个删除
    if (params.delType) {
        let tmp_list = context.state.goodsOfMenu.concat();
        tmp_list.map(v => {
            if (v.checked) {
                itemIdList.push(v.itemId)
            }
        })
    } else {
        console.log('params', params)
        itemIdList.push(params.itemId)
    }

    // list 转换为字符串 ','分割
    itemIds = itemIdList.toString();

    params.itemIds = itemIds;

    console.log('remove itemIds', itemIds, 'params: ', params)
    //    调用接口 移除商品 removeGoodsOfMenu
    API.removeGoodsOfMenu(params).then(data => {
        // 获取简单菜单
        context.dispatch('getGoodsByMenuId', params)
    }).catch(e => {
        catchError(e)
    })
}

export const setMenuInfo = (context, item) => {
    // 选择某菜单操作后，记录菜单信息
    // 存入cookie，刷新时使用
    console.log('1111', item)
    Cookie.setItem("inside_chain", JSON.stringify({
        menuInfo: {
            menuName: item.menuName
        }
    }));
    context.commit('_setMenuInfo', item);
}

export const getMenuInfo = (context) => {
    // store中无菜单信息，尝试冲cookie中获取
    console.log('get cookie')
    if (!context.state.menuInfo.menuName) {
        let chain = JSON.parse(Cookie.getItem("inside_chain"));
        context.dispatch('setMenuInfo', chain.menuInfo)
    }
}

// 商品导入 actions

// 获取商品/套餐 分类列表（下拉选择框）
export const kindMenuTree = (context, params) => {
    API.kindMenuTree(params).then(data => {
        if (data.data) {
            let res = Tools.recursionLeaf(data.data);

            context.commit('_kindMenuTree', res)
        }
    }).catch(e => {
        catchError(e)
    })
}
//导入 待选区全选
export const checkAllGoods = (context, e) => {
    console.log('all!!!', e)
    let tmp_list = context.state.allSimpleItem.concat();
    tmp_list.map(v => {
        v.checked = !e
    })
    context.commit('_listAllSimpleItem', tmp_list)
}
//导入 待选区单选
export const checkOneGoods = (context, params) => {
    console.log('one!!!', params)
    let tmp_list = context.state.allSimpleItem.concat();
    tmp_list.map(v => {
        if (v.id === params.item.id)
            v.checked = params.check
    })
    context.commit('_listAllSimpleItem', tmp_list)
}
//导入 结果区区全选
export const checkAllResult = (context, e) => {
    console.log('all r!!!', e)
    // 2018-07-04  修改为实时操作，数据从后端获取
    // let tmp_list = context.state.unSubmitGoods.concat();
    // let tmp_list_result = context.state.resultBackup.concat();
    // tmp_list.map(v => {
    //     v.checked = !e
    // })
    // tmp_list_result.map(v => {
    //     v.checked = !e
    // })
    // context.commit('_setUnSubmitList', tmp_list)
    // context.commit('_setResultBackup', tmp_list_result)
    let tmp_list = context.state.goodsOfMenuSimple.concat();
    tmp_list.map(v => {
        v.checked = !e
    })
    context.commit('_setGoodsByMenuIdSimple', tmp_list)
}
//导入 结果区全选
export const checkOneResult = (context, e) => {
    console.log('one r!!!', e)
    // 2018-07-04  修改为实时操作，数据从后端获取，前端不备份数据

    // let tmp_list = context.state.unSubmitGoods.concat();
    // let tmp_list_result = context.state.resultBackup.concat();
    //
    // tmp_list.map(v => {
    //     if (v.id === e.item.id)
    //         v.checked = e.check
    // })
    // tmp_list_result.map(v => {
    //     if (v.id === e.item.id)
    //         v.checked = e.check
    // })
    // context.commit('_setUnSubmitList', tmp_list)
    // context.commit('_setResultBackup', tmp_list_result)
    let tmp_list = context.state.goodsOfMenuSimple.concat();

    tmp_list.map(v => {
        if (v.itemId === e.item.itemId)
            v.checked = e.check
    })
    context.commit('_setGoodsByMenuIdSimple', tmp_list)

}
export const removeResultGoods = (context, params) => {
    // console.log('remove res')
    // let noRemove = [];
    // let noRemoveResult = [];
    // let tmp_list = context.state.unSubmitGoods.concat();
    // let tmp_list_result = context.state.resultBackup.concat();
    //
    // tmp_list.map(v => {
    //     if (!v.checked) {
    //         noRemove.push(v)
    //     }
    // })
    // tmp_list_result.map(v => {
    //     if (!v.checked) {
    //         noRemoveResult.push(v)
    //     }
    // })
    // context.commit('_setUnSubmitList', noRemove)
    // context.commit('_setResultBackup', noRemoveResult)

// 移除菜单内的商品
    let tmp_list = []
    let itemIdList = []
    let itemIds = ''
    // delType:1 批量删除
    // delType:0 单个删除
    if (params.delType) {
        let tmp_list = context.state.goodsOfMenuSimple.concat();
        tmp_list.map(v => {
            if (v.checked) {
                itemIdList.push(v.itemId)
            }
        })
    } else {
        console.log('params', params)
        itemIdList.push(params.itemId)
    }

    // list 转换为字符串 ','分割
    itemIds = itemIdList.toString();

    params.itemIds = itemIds;

    console.log('remove itemIds', itemIds, 'params: ', params)
    //    调用接口 移除商品 removeGoodsOfMenu
    API.removeGoodsOfMenu(params).then(data => {
        context.dispatch('getGoodsByMenuIdSimple', params)
        context.dispatch('getGoodsKindsByMenuIdSingle', params)
    }).catch(e => {
        catchError(e)
    })

}
export const backupResult = (context) => {
    let tmp_list = context.state.unSubmitGoods.concat();
    context.commit('_setResultBackup', tmp_list)
    console.log('bb', context.state.resultBackup);
}
// 搜索结果区
export const searchResult = (context, params) => {
    // 操作前先备份
    if (params) {
        context.commit('_setFilterParams', params)
    }
    console.log('search params', params)
    let tmp_list = []
    if (context.state.resultBackup.length > 0) {
        tmp_list = context.state.resultBackup.concat();
    } else {
        tmp_list = context.state.unSubmitGoods.concat();
        context.dispatch('backupResult');
    }
    console.log('s p :', context.state.filterParams)
    let type = context.state.filterParams.selectType;
    let keyword = context.state.filterParams.keyword;
    let result = [];
    // 关键字和类型都存在
    if (keyword.length > 0 && type) {
        console.log('有分类和关键字')

        tmp_list.map(v => {
            if (v.name.indexOf(keyword) > -1 && v.kindId === type) {
                result.push(v)
            }
        })
    } else if (keyword.length === 0 && type) {
        console.log('分类筛选')

        tmp_list.map(v => {
            if (v.kindId === type) {
                result.push(v)
            }
        })
    } else if (keyword.length > 0 && !type) {
        console.log('关键字筛选')

        tmp_list.map(v => {
            if (v.name.indexOf(keyword) > -1) {
                result.push(v)
            }
        })
    } else {
        console.log('无筛选项')

        result = tmp_list
    }
    context.commit('_setUnSubmitList', result)

}

// 穿梭数据交换

export const moveGoods = (context, params) => {
    console.log('trans')
    let tmp_goods = context.state.allSimpleItem.concat();
    let selected_list = [];
    let resultBackup = context.state.resultBackup.concat()
    tmp_goods.map(v => {
        if (v.checked) {
            selected_list.push({
                name: v.name,
                id: v.id,
                kindId: v.kindId,
                checked: false,
            })
            v.checked = false
        }
    })

    let new_list = resultBackup.concat(selected_list);

    console.log('new_list', new_list)
    // 去重
    let hash = {};
    new_list = new_list.reduce(function (item, next) {
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        console.log('repeat item', item);
        return item
    }, []);
    // })

    context.commit('_listAllSimpleItem', tmp_goods);
    context.commit('_setResultBackup', new_list);
    context.dispatch('searchResult')
}

// 提交导入数据
export const submitGoods = (context, params) => {
    // 替换 数据直接提交至后端
    // let tmp_list = context.state.unSubmitGoods.concat();
    // let itemIds = []
    // tmp_list.map(v => {
    //     itemIds.push(v.id)
    // })
    //
    // params.itemIds = itemIds.toString();
    //
    // console.log('选择的菜品id数字字符串', params.toString())
    //
    // API.addGoods(params).then(data => {
    //     Router.push({
    //         path: '/menu_goods',
    //         query: {
    //             plateEntityId: params.plateEntityId,
    //             menuId: params.menuId,
    //         }
    //     })
    // }).catch(e => {
    //     catchError(e)
    // })
    let tmp_goods = context.state.allSimpleItem.concat();

    let itemIds = []
    tmp_goods.map(v => {
        if (v.checked) {
            itemIds.push(v.id
            )
            v.checked = false
        }
    })
    console.log('itemIds: ', itemIds)
    params.itemIds = itemIds.toString();

    console.log('选择的菜品id数字字符串', params.toString())
    // 复原商品选择
    context.commit('_listAllSimpleItem', tmp_goods);

    API.addGoods(params).then(data => {
        context.dispatch('getGoodsByMenuIdSimple', params)
        context.dispatch('getGoodsKindsByMenuIdSingle', params)
        Message.info('导入成功')
    }).catch(e => {
        catchError(e)
    })
}

// 下发
// 获取下发类型
export const getPublishType = (context, params) => {
    API.getPublishType(params).then(data => {
        let res = {}
        if (!!data.data) {
            res = data.data
        }
        context.commit('_getPublishType', res)
    }).catch(e => {
        catchError(e)
    })
}
// 获取下发时间类型
export const getPublishTimeType = (context, params) => {
    API.getPublishTimeType(params).then(data => {
        let res = {}
        if (!!data.data) {
            res = data.data
        }
        context.commit('_getPublishTimeType', res)
    }).catch(e => {
        catchError(e)
    })
}

// 下发菜单
export const publishMenu = (context, params) => {

    let shopList = params.shops;
    let tmp_list = []
    shopList.map(v => {
        tmp_list.push(v.entityId)
    })
    params.shops = tmp_list.toString();

    API.publishMenu(params).then(data => {
        if (data) {
            // Message.info('下发菜单成功！')
            Router.push(
                {
                    path: '/dist_manage',
                }
            )
        }
    }).catch(e => {
        catchError(e)
    })
}

// 获取品牌菜单列表
export const getAllPublishMenus = (context, params) => {
    API.getAllMenus(params.plateEntityId).then(data => {
        let res = {}
        if (data.data) {
            res = data.data
        }
        context.commit('_getAllPublishMenus', res)
    }).catch(e => {
        catchError(e)
    })
}

// 选择一个菜单
export const selectOne = (context, params) => {
    console.log('params:', params);
    let tmp_list = context.state.publishMenus.concat();
    tmp_list.map(v => {
        if (v.menuId === params.menuId) {
            v.selected = true
        } else {
            v.selected = false
        }
    })

    context.commit('_getAllPublishMenus', tmp_list)
}
// 清空所选门店
export const setNoSearchItems = (context, params) => {
    let noSearchItems = false;
    console.log('setNoSearchItems',params.goodsName, params.goodsName, params)
    if(!params.goodsName && !params.kindId){
        noSearchItems = true;
    }

    context.commit('_setNoSearchItems', noSearchItems);
}
