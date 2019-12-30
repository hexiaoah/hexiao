import {API_BASE_URL} from "apiConfig";
import Requester from '@/base/requester'
import {GW} from '@2dfire/gw-params';

const AND = '&' + GW;

const API = {
    /**
     * 获取品牌下菜单列表
     * params:
     *  plateEntityId: 品牌id
     *
     */
    getAllMenus(plateEntityId) {
        console.log('ll', plateEntityId)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.getAllMenus" + AND,
            {
                params:
                    {
                        plateEntityId: plateEntityId
                    }
            }
        )
    },
    /**
     * 获取品牌下菜单列表
     * params:
     *  plateEntityId: 品牌id
     *
     */
    getAllRemenus(plateEntityId) {
        console.log('ll', plateEntityId)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.center.business.chainmenu.IChainMenuClientService.getAllMenusAndSort" + AND,
            {
                params:
                    {
                        plateEntityId: plateEntityId,
                        sortType: 1
                    }
            }
        )
    },

    /**
     * 编辑菜单
     * params:
     *  menuId: 菜单id
     *  menuName: 菜单名称
     *  menuRemark: 菜单备注
     *
     */
    updateMenu(params) {
        console.log('update menu: ', params)
        return Requester.get(
            // API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.updateMenu" + AND,
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.updateMenuV2" + AND,
            {
                params:
                    {
                        menuId: params.menuId,
                        menuName: params.menuName,
                        menuRemark: params.menuRemark,
                        detailMenuPriceNotPublish: params.detailMenuPriceNotPublish,
                    }
            }
        )
    },

    /**
     * 新建菜单
     * params:
     *  plateEntityId: 品牌id
     *  menuName: 菜单名称
     *  menuRemark: 菜单备注
     *
     */
    createMenu(params) {
        console.log('create menu: ', params)
        return Requester.get(
            // API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.createNewMenu" + AND,
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.createNewMenuV2" + AND,
            {
                params:
                    {
                        plateEntityId: params.plateEntityId,
                        menuName: params.menuName,
                        menuRemark: params.menuRemark,
                        detailMenuPriceNotPublish: false
                    }
            }
        )
    },

    /**
     * 删除菜单
     * params:
     *  menuId: 菜单id
     *
     */
    deleteMenu(id) {
        console.log('del menu: ', id)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.deleteMenu" + AND,
            {
                params:
                    {
                        menuId: id
                    }
            }
        )
    },

    /**
     * 删除菜单中的商品
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 菜单id
     *  itemIds: 商品ids
     *
     */
    removeGoodsOfMenu(params) {
        console.log('del menu goods: ', params)
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.deleteGoods" + AND,
            {

                        plateEntityId: params.plateEntityId,
                        menuId: params.menuId,
                        itemIds: params.itemIds
            },
            {
                emulateJSON: true
            }
        )
    },
    /**
     * 获取菜单中的商品的价格信息
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 菜单id
     *  itemId: 商品id
     *
     */
    getGoodsPrice(params) {
        console.log('get menu goods price: ', params)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.getGoodsPrice" + AND,
            {
                params:
                    {
                        plateEntityId: params.plateEntityId,
                        menuId: params.menuId,
                        itemId: params.itemId
                    }
            }
        )
    },
    /**
     * 更新菜单中的商品的价格信息
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 菜单id
     *  itemId: 商品id
     *  price: 菜单中价格
     *  memberPrice: 菜单中会员价格
     *  useDefaultPriceSwitch: int 是否使用默认价格
     *  specPrices: [] 规格价格
     */
    updateGoodsPrice(params) {
        console.log('update menu goods price: ', params)
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.updateGoodsPrice" + AND,
            {
                plateEntityId: params.plateEntityId,
                menuId: params.menuId,
                itemId: params.itemId,
                price: params.price,
                memberPrice: params.memberPrice,
                useDefaultPriceSwitch: params.useDefaultPriceSwitch,
                specPrices: params.specPrices,
            },
            {emulateJSON: true}
        )
    },
    /**
     * 复用菜单
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 被复用的菜单id
     *  newMenuId: 菜单id
     */
    multiplexMenu(params) {
        console.log('multiplexMenu: ', params)
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.multiplexMenu" + AND,
            {
                plateEntityId: params.plateEntityId,
                menuId: params.menuId,
                newMenuId: params.newMenuId
            },
            {emulateJSON: true}
        )
    },

    /**
     * 获取菜单内商品
     * params:
     *
     * plateEntityId: 品牌Id,
     * menuId: 菜单id
     * kindId: 分类id
     * goodsName: 商品名称,
     * pageIndex: 页码,
     * paging: 1 分页,
     *
     */
    getGoodsByMenuId(params) {
        console.log('getGoodsByMenuId: ', params)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.getGoodsByMenuId" + AND,
            {
                params:
                    {
                        plateEntityId: params.plateEntityId,
                        menuId: params.menuId,
                        kindId: params.kindId,
                        goodsName: params.goodsName,
                        pageIndex: params.pageIndex,
                        paging: 1,
                    }
            }
        )
    },
    /**
     * 获取菜单内商品 （仅商品及套餐简单信息）
     * params:
     *   plateEntityId: 品牌Id,
     *   menuId: 菜单id
     *   kindId: 分类id
     *   goodsName: 商品名称,
     *   paging: 0 不分页,
     *
     */
    getGoodsByMenuIdSimple(params) {
        console.log('getGoodsByMenuIdSimple: ', params)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.getGoodsByMenuId" + AND,
            {
                params:
                    {
                        plateEntityId: params.plateEntityId,
                        menuId: params.menuId,
                        kindId: params.kindId,
                        goodsName: params.goodsName,
                        paging: 0,
                    }
            }
        )
    },

    /**
     * 获取所有商品的简单信息
     * params:
     *  menuId: 菜单id
     *
     */
    listAllSimpleItem(params) {
        console.log('listAllSimpleItem: ', params)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.item.service.IItemService.listAllSimpleItem" + AND,
            {
                params: {
                    opEntityId: params.opEntityId,
                    // 筛选项 json字符串形式
                    listSimpleItemReq: JSON.stringify({
                        plateEntityId: params.plateEntityId,
                        kindId: params.kindId,
                        name: params.name,
                    })
                }
            }
        )
    },


    /**
     * 批量添加商品
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 菜单id
     *  itemIds: 商品id串
     *
     */
    addGoods(params) {
        console.log('listAllSimpleItem: ', params)
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.addGoods" + AND,
            {
                plateEntityId: params.plateEntityId,
                menuId: params.menuId,
                itemIds: params.itemIds
            },
            {
                emulateJSON: true
            }
        )
    },


    /**
     * 获取菜单内商品分类
     * params:
     *  plateEntityId: 品牌id
     *  menuId: 菜单id
     *
     */
    getGoodsKindsByMenuId(params) {
        console.log('getGoodsKindsByMenuId: ', params)
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainmenu.service.IChainMenuClientService.getGoodsKindsByMenuId" + AND,
            {
                params:
                    {
                        plateEntityId: params.plateEntityId,
                        menuId: params.menuId,
                    }
            }
        )
    },

    /**
     * 获取商品/套餐分类列表
     * @param isInclude -1-全部 0-商品 1-套餐
     * @param plateEntityId
     * @param opEntityId
     * @returns {*|V}
     */
    kindMenuTree(params) {
        return Requester.get(
            API_BASE_URL + "com.dfire.boss.center.pc.IKindMenuService.kindMenuTreeSelect" + AND,
            {
                params: {
                    isInclude: -1,
                    plateEntityId: params.plateEntityId,
                    opEntityId: params.opEntityId
                }
            }
        )
    },

    /**
     * 菜单下发
     */

    /**
     * 获取下发类型
     *
     */
    getPublishType() {
        console.log('getPublishType')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.getPublishType" + AND
        )
    },
    /**
     * 获取下发时间类型
     *
     */
    getPublishTimeType() {
        console.log('getPublishTimeType')
        return Requester.get(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.getPublishTimeType" + AND
        )
    },
    /**
     * 下发菜单
     *  plateEntityId: 品牌Id,
     *  menuId: 菜单Id,
     *  publishType: 下发Type,
     *  timeType: 下发时间Type,
     *  publishTime: 下发时间Time, not must
     *  shops: 下发商家
     */
    publishMenu(params) {
        console.log('publishMenu')
        return Requester.post(
            API_BASE_URL + "com.dfire.soa.boss.centerpc.chainpublish.service.IChainPublishClientService.publishMenu" + AND,
            {
                plateEntityId: params.plateEntityId,
                menuId: params.menuId,
                name: params.name,
                publishType: params.publishType,
                timeType: params.timeType,
                publishTime: params.publishTime,
                shops: params.shops
            },
            {emulateJSON: true}
        )
    },
}


export default API;
