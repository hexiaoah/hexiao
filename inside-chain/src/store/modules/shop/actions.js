/**
 * 门店管理相关路由页面store
 */

import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api'
import router from "@/router";
import Obj from '@2dfire/utils/object'
import Num from '@2dfire/utils/number'
import Tool from '@/base/tools'
import joinMode from '@/const/emu-joinMode'
import { joinModeIcon, joinModeText, statusText, statusColor } from '@/const/emu-joinModeIcon'
import joinModeBrand from '@/const/emu-joinModeBrand'
import Cookie from '@2dfire/utils/cookie'

let shopInfo = {
    entityId:''
}
if(Cookie.getItem('entrance') != undefined){
    shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
}

const actions = {
    // 获取商家列表
    getShops(context, params) {
        // 获取筛选项
        let filter = context.state.shop_filter;
        let pageState = context.state.params
        console.log(filter)
        let filter_params = {
            plateEntityId: filter.selected_brand,
            provinceId: filter.selected_provinceId,
            cityId: filter.selected_cityId,
            townId: filter.selected_townId,
            branchEntityId: filter.selected_organ,
            joinMode: filter.selected_join,
            groupIdList:filter.groupIds,
            supplyGroupIdList:filter.select_supplyGroupMap,
            status:filter.shopStatus
            // categoryIds:filter.categoryIds
        }
        console.log(params)
        // 整个参数
        params = Object.assign(pageState, filter_params)
        
        if (filter.keyWord) {
            params.keyWord = filter.keyWord
        }
        if (filter.code) {
            params.code = filter.code
        }
        params.brandEntityId = shopInfo.entityId
        console.log('params',params)
        // Requester.get(API.GET_QUERY_CHAIN_SHOP_LIST, {params: params}).then(data => {
        Requester.post(API.GET_QUERY_CHAIN_SHOP_LIST,{req:JSON.stringify(params)},{emulateJSON: true}).then(data => {
            // 数据处理
            // ...
            console.log('empty?', Obj.isEmpty(data.data),data.data)
            let true_data = {
                total: 0,
                shops: []
            }

            if (!Obj.isEmpty(data.data)) {
                true_data.total = data.data.total;
                if (data.data.list && data.data.list.length > 0) {
                    data.data.list.map(v => {
                        true_data.shops.push({
                            entityId: v.entityId,

                            title: v.name,
                            code: v.code,
                            desc: v.plateName || '-',
                            phone: v.phone1 || '-',
                            linkman: v.linkman || '-',
                            employeeAmount: v.employeeAmount,
                            foundDate: v.foundDate || '-',
                            status: v.status,
                            statusText: statusText[v.status] || '-',
                            statusColor: statusColor[v.status],
                            joinModelText: joinModeText[v.joinMode] || '-',
                            image: v.shopImg || '',
                            type: joinModeIcon[v.joinMode],
                            address: v.address || '-',
                            plateEntityId: v.plateEntityId,
                            customCode: v.customCode || '',
                            shortName: v.shortName || ''
                        })
                    })
                }
                else {
                    true_data.shops = []
                }

            }
            //    提交mutation
            context.commit('_getShops', true_data);
        }).catch(e => {
            catchError(e);
        });
    },
    // 门店列表页第一次加载
    initShops(context) {
        console.log('init');
        // let params = {
        //     pageIndex: 1,
        //     pageSize: 6
        // }
        let { params } = context.state
        context.dispatch('getShops', params);
    },
    // 清空筛选项
    clearFilter(context) {
        context.commit('_clearFilter')
    },
    // 品牌列表页翻页
    changeShops(context, params) {
        console.log('change');
        params.page.pageIndex = params.changed_page;
        const pageState = {
            pageIndex: params.changed_page,
            pageSize: context.state.params.pageSize
        }
        context.commit('_setPageSize',pageState)
        context.dispatch('getShops', params.page);
    },
    // 获取筛选项品牌
    getFilterBrands(context, params) {
        // let data = [
        //     {
        //         name: '外婆家',
        //         entityId: '123'
        //     },
        //     {
        //         name: '炉鱼',
        //         entityId: '223'
        //     },
        // ]

        Requester.get(API.GET_ALL_BRANDS, {params: params}).then(data => {
            console.log('bnrands:', data)

            let true_data = [];
            if (data.data && data.data.length > 0) {
                true_data.push({
                    name: '全部',
                    entityId: ''
                })
                data.data.map(v => {
                    true_data.push({
                        name: v.name,
                        entityId: v.entityId
                    })
                })
            } else {
                true_data.push({
                    name: '全部',
                    entityId: ''
                })
            }

            context.commit('_selectBrand', true_data)


        }).catch(e => {
            catchError(e);
        });

    },
    selectBrand(context, entityId) {
        let brands = context.state.shop_filter.brands.concat();
        brands.map(v => {
            if (v.entityId == entityId) {
                v.active = true;
            }
            else {
                v.active = false;
            }
        });
        context.commit('_selectBrand', brands)
        context.commit('_setBrand', entityId)
        context.dispatch('initShops');

    },
    selectJoin(context, entityId) {
        let modes = context.state.shop_filter.joinModes.concat();
        modes.map(v => {
            if (v.entityId == entityId) {
                v.active = true;
            }
            else {
                v.active = false;
            }
        });
        console.log('modes:', modes)
        context.commit('_selectJoinModes', modes)
        context.commit('_setJoinType', entityId)
        context.dispatch('initShops');
    },
    selectShopStatus(context, entityId) {
        let modes = context.state.shop_filter.shopStatusList.concat();
        modes.map(v => {
            if (v.entityId == entityId) {
                v.active = true;
            }
            else {
                v.active = false;
            }
        });
        console.log('modes:', modes)
        context.commit('_selectShopStatus', modes)
        context.commit('_setShopStatus', entityId)
        context.dispatch('initShops');
    },
    selectSupplyGroup(context, entityId) {
        let modes = context.state.shop_filter.supplyGroupMap.concat();
        modes.map(v => {
            if (v.entityId == entityId) {
                v.active = true;
            }
            else {
                v.active = false;
            }
        });
        console.log('modes:', modes)
        context.commit('_getBrandEntitiesList', modes)
        context.commit('_setSelectSupplyGroup', entityId === '' ? [] : entityId)
        context.dispatch('initShops');
    },
    // 筛选商家 - 选择机构
    selectOrgan(context, item) {
        let organs = context.state.shop_filter.organs_show.concat();
        let organs_checked = context.state.shop_filter.organs_checked.concat();
        let sub_organs = [];
        organs.map(v => {
            // console.log('entityId', v.entityId, item.entityId)
            if (v.entityId == item.entityId) {
                if (v.children && v.children.length > 0) {
                    sub_organs = v.children;
                    organs_checked.push(item)
                    console.log(organs_checked)
                    context.commit('_setOrganChecked', organs_checked)
                } else {
                    v.active = true;
                    sub_organs = organs;
                }
                console.log('sub', sub_organs)
            }
        })
        context.commit('_selectOrgan', sub_organs)
        context.commit('_setOrgan', item.entityId)
        context.dispatch('initShops');

    },
    // 筛选商家 -选择区域
    selectArea(context, item) {
        let areas = context.state.shop_filter.areas.concat();
        let areas_checked = context.state.shop_filter.areas_checked.concat();
        let sub_areas = [];
        areas.map(v => {
            if (v.id == item.id) {
                if (v.subList && v.subList.length > 0) {
                    sub_areas = v.subList;
                    areas_checked.push(item)
                    console.log(areas_checked)
                    context.commit('_setAreasChecked', areas_checked)
                } else {
                    v.active = true;
                    sub_areas = areas;
                }
                console.log('sub', sub_areas)
            }
        });
        context.commit('_selectArea', sub_areas)
        if (item.type == 'province') {
            context.commit('_setProvinceId', item.id)
        } else if (item.type == 'city') {
            context.commit('_setCityId', item.id)
        } else if (item.type == 'town') {
            context.commit('_setTownId', item.id)
        } else {
            context.commit('_setAllArea')
        }
        context.dispatch('initShops');

    },
    // 地区/机构 方法类似
    // 机构筛选项-选择回退
    backOrgan(context, params) {
        let organs_checked = context.state.shop_filter.organs_checked.concat();
        console.log(organs_checked, params)
        let new_organ = organs_checked.splice(0, params.index + 1)
        context.commit('_setOrganChecked', new_organ)
        context.commit('_selectOrgan', params.item.children)
        context.commit('_setOrgan', params.item.entityId)

        context.dispatch('initShops');

    },
    // 地区/机构 方法类似
    // 机构筛选项-选择回退
    backArea(context, params) {
        let areas_checked = context.state.shop_filter.areas_checked.concat();
        let item = params.item;
        console.log(areas_checked.length, params.index)
        let new_organ = areas_checked.splice(0, params.index + 1)
        context.commit('_setAreasChecked', new_organ)
        context.commit('_selectArea', params.item.subList)

        if (item.type == 'province') {
            context.commit('_setProvinceId', item.id)
        } else if (item.type == 'city') {
            context.commit('_setCityId', item.id)
        } else if (item.type == 'town') {
            context.commit('_setTownId', item.id)
        } else {
            context.commit('_setAllArea')
        }

        context.dispatch('initShops');


    },

    // 获取筛选项 - 区域

    getArea(context) {
        // GET_ALL_AREAS
        // let data = [
        //
        //     // 需要在最外层嵌套一个全部字段
        //     {
        //         "id": "0",
        //         "name": "全部",
        //         "type": "all",
        //         "subList": [
        //
        //             {
        //                 "id": "1",
        //                 "name": "北京",
        //                 "type": "province",
        //                 "subList": [
        //                     {
        //                         "id": "1",
        //                         "name": "北京市",
        //                         "type": "city",
        //                         "subList": [
        //                             {
        //                                 "id": "2807",
        //                                 "name": "东城区",
        //                                 "type": "town"
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "2",
        //                 "name": "天津",
        //                 "type": "province",
        //                 "subList": [
        //                     {
        //                         "id": "2",
        //                         "name": "天津市",
        //                         "type": "city",
        //                         "subList": [
        //                             {
        //                                 "id": "10",
        //                                 "name": "东丽区",
        //                                 "type": "town",
        //
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ]
        //     }]

        Requester.get(API.GET_ALL_AREAS).then(data => {
            // 数据处理
            // ...
            // 提交mutation
            console.log('get', data);
            let true_data = [{
                id: '',
                name: '全部',
                type: 'all',
                subList: data.data
            }]
            console.log('地区',data.data)
            context.commit('_setAreas', data.data);
            context.commit('_setAreasChecked', true_data)

        }).catch(e => {
            catchError(e);
        });
    },

    // 门店列表页搜索
    searchShops(context, params) {
        //
        context.dispatch('getShops', params);

    },
    // 获取品牌列表
    getBrands(context, params) {
        Requester.get(API.GET_BRANDS, {params: params}).then(data => {
            let true_data = data.data;
            // let mock_data = {
            //     total: 10, brands: [
            //         {
            //             "spell": "拼音",
            //             "brandEntityId": "连锁总部ID",
            //             "joinMode": 1,
            //             "foundDate": "成立日期",
            //             "avgPrice": "均价",
            //             "shopCount": 19,
            //             "name": "品牌名",
            //             "entityId": "实体ID",
            //             "sortCode": 0,
            //             "img": 'http://ojco3rfvq.bkt.clouddn.com/avatar.png',
            //             "foodStyleList": [
            //                 {
            //                     "spell": "拼音",
            //                     "name": "川菜"
            //                 }
            //             ]
            //         }
            //     ]
            // }

            let new_brands_data = {
                total: 0,
                brands: []
            };

            let new_brands = [];

            if (!Obj.isEmpty(data.data)) {

                new_brands_data.total = true_data.total;

                true_data.list.map(v => {
                    new_brands.push({
                        entityId: v.entityId,
                        name: v.name,
                        defaultPlate: v.defaultPlate,
                        joinMode: joinModeBrand[v.joinMode] || '-',
                        foundDate: v.foundDate || '-',
                        manager: v.linkman || '-',
                        shopCount: '门店总数：' + v.shopCount + '家',
                        cooking: v.foodStyleList,
                        img: v.logo || ''
                    })
                })

                new_brands_data.brands = new_brands
            }
            context.commit('_getBrands', new_brands_data);
        }).catch(e => {
            catchError(e);
        });
    },

    // 设置默认
    setDefaultPlate(context, params) {
        let set_params = {
            plateEntityId: params.plateEntityId
        }
        Requester.get(API.SET_DEFAULT_PLATE, {params: set_params}).then(data => {
            context.dispatch('getBrands', params.searchItems)
        }).catch(e => {
            catchError(e);
        });
    },
    // 设置默认
    canManagePlate(context, params) {
        let plate_params = {
            plateEntityId: params.plateEntityId
        }
        Requester.get(API.CAN_MANAGE_PLATE, {params: plate_params}).then(data => {
            let true_data = data.data
            const item = {
                entityId: params.plateEntityId,
                name: params.name,
                canManage: true_data,
            }
            params.callback(item)

        }).catch(e => {
            catchError(e);
        });
    },
    // 品牌列表页第一次加载
    initBrands(context,params) {
        console.log('init');

        // let params = {
        //     pageIndex: 1,
        //     pageSize: 6
        // }
        context.dispatch('getBrands', params);
    },
    // 品牌列表页翻页
    changeBrands(context, params) {
        console.log('change');

        params.page.pageIndex = params.changed_page;
        context.dispatch('getBrands', params.page);
    },
    // 品牌列表页搜索
    searchBrands(context, params) {
        console.log('search');

        context.dispatch('getBrands', params);
    },
    // 跳转品牌详情
    goBrandInfo(context, params) {
        router.push({
            path: 'shop_brand_info',
            query: {
                entityId: params.entityId,
                crumbName: params.name
            }
        })
    },
    // 获取店铺详情
    getShopInfo(context, params) {
        let nullList = [{"name": '-'}]
        Requester.get(API.GET_SHOP_INFO, {params: params}).then(data => {
            // 用Num.numberFormat(xx/100)来格式化收到的金额
            // let join_mode = 0;
            // let data = {
            //     "consumptionPerCapita": 0,
            //     "isTakeout": 0,
            //     "zipCode": "",
            //     "joinMode": 1,
            //     "couponName": "",
            //     "phone2": "电话2",
            //     "dist": 0,
            //     "featureServiceList": [
            //         {
            //             "spell": "拼音",
            //             "name": "特色服务"
            //         }
            //     ],
            //     "activeId": "",
            //     "cityId": "城市ID",
            //     "townId": "区ID",
            //     "couponId": "",
            //     "phone1": "电话1",
            //     "cashVersion": 0,
            //     "shopImgList": [
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750500.png",
            //             "type": 2,
            //             "sortCode": 0
            //         },
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750375.png",
            //             "type": 2,
            //             "sortCode": 0
            //         },
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750375.png",
            //             "type": 0,
            //             "sortCode": 0
            //         },
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750375.png",
            //             "type": 0,
            //             "sortCode": 0
            //         },
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750375.png",
            //             "type": 0,
            //             "sortCode": 0
            //         },
            //         {
            //             "server": "服务器地址",
            //             "path": "http://ojco3rfvq.bkt.clouddn.com/750375.png",
            //             "type": 0,
            //             "sortCode": 0
            //         }
            //     ],
            //     "plateName": "品牌名",
            //     "merchantId": "",
            //     "businessValue": 0,
            //     "entityId": "ID",
            //     "spell": "拼音",
            //     "brandName": "连锁公司名",
            //     "isEnterpriseCard": 0,
            //     "specialTag": "特色服务",
            //     "isLineOpen": 0,
            //     "shopLevel": 0,
            //     "cashModel": 0,
            //     "provinceId": "省ID",
            //     "version": 0,
            //     "linkman": "联系人",
            //     "logoUrl": "logo",
            //     "foodStyleList": [
            //         {
            //             "spell": "拼音",
            //             "name": "川菜"
            //         }
            //     ],
            //     "hasSpecialActivity": 0,
            //     "customerKind": 0,
            //     "branchEntityId": "分公司ID",
            //     "expire": "",
            //     "name": "店名",
            //     "status": 1,
            //     "statusFlag": 0,
            //     "brandEntityId": "连锁公司ID",
            //     "englishName": "英文名",
            //     "code": "编号",
            //     "avgPrice": "消费均价",
            //     "origin": 0,
            //     "latitude": 0,
            //     "longtitude": 0,
            //     "industry": 0,
            //     "businessTime": "营业时间",
            //     "shopKind": 1,
            //     "countryId": "国家ID",
            //     "foodStyle": "餐饮类型",
            //     "plateEntityId": "品牌实体ID",
            //     "countryCode": "国家区号",
            //     "enterpriseCardRatio": 0,
            //     "cloudCashCreateTime": 0,
            //     "activeLevel": 0,
            //     "employeeAmount": 98,
            //     "activeName": "",
            //     "address": "地址",
            //     "introduce": "介绍",
            //     "scanAmount": 0,
            //     "isValentityId": 0,
            //     "orderCount": 0,
            //     "branchName": "分公司名",
            //     "entityId": "店铺实体ID",
            //     "bindIp": "",
            //     "isTest": 0,
            //     "createTime": 0,
            //     "isInit": 0,
            //     "mapAddress": ""
            // }

            let mainPhoto = '';
            let shopImgs = []

            if (data.data.shopImgList && data.data.shopImgList.length > 0) {
                data.data.shopImgList.map(v => {
                    // 2：门头照
                    if (v.type == 2) {
                        mainPhoto = v.imgUrl || ''
                        //   0：普通照片
                    } else if (v.type == 0) {
                        shopImgs.push(
                            v.imgUrl || ''
                        )
                    }
                })
            }


            // format 参数
            let format_data = {
                base_info: {
                    brand: data.data.plateName || '-',
                    code: data.data.code || '-',
                    manager: data.data.linkman || '-',
                    name: data.data.name || '-',
                    organ: data.data.branchName || '-',
                    phone: data.data.phone1 || '-',
                    type: joinMode[data.data.joinMode],
                },
                business_info: {
                    address: data.data.address || '-',
                    cooking: data.data.foodStyleList || nullList,
                    avgPrice: data.data.avgPrice || '-',
                    intro: data.data.introduce || '-',
                    open_date: data.data.businessTime || '-',
                    service: data.data.featureServiceList || nullList,
                },
                shop_photo: {
                    main: mainPhoto,
                    imgs: shopImgs
                }
            }
            context.commit('_getShopInfo', format_data);
            console.log('formateData', format_data)
        }).catch(e => {
            catchError(e);
        });
    },
    // 获取品牌详情
    getBrandInfo(context, params) {
        Requester.get(API.GET_BRAND_INFO, {params: params}).then(data => {
            // 数据处理
            // ...
            let true_data = data.data
            //     {
            //     "spell": "拼音",
            //     "brandEntityId": "连锁总部ID",
            //     "joinMode": 1,
            //     "foundDate": "成立日期",
            //     "avgPrice": "69",
            //     "shopCount": 56,
            //     "name": "品牌名",
            //     "entityId": "实体ID",
            //     "sortCode": 0
            // }

            let formate_data = {
                name: true_data.name,
                foundDate: true_data.foundDate || '-',
                joinMode: joinModeBrand[true_data.joinMode] || '-',
                cooking: true_data.foodStyleList || [],
                intro: true_data.introduce || '-',
                logo: true_data.logo || ''
            }
            //     // 提交mutation
            context.commit('_getBrandInfo', formate_data);
        }).catch(e => {
            catchError(e);
        });
    },
    // 获取店铺经营数据
    getShopView(context, params) {
        // let view_date = context.state.view_date;
        // let true_params = {
        //     entityId: params.entityId,
        //     startDate: view_date.start,
        //     endDate: view_date.end
        // }
        // Requester.get(API.GET_SHOP_VIEW, {params: true_params}).then(data => {
        //     context.commit('_getShopView', data);
        // }).catch(e => {
        //     catchError(e);
        // });

        let true_data = {
            "boardPieCpbm": [
                {
                    "出品数量": 1,
                    "出品部门": "未分类"
                }
            ],
            "boardTabCpbm": [
                {
                    "出品数量": 1,
                    "出品部门": "合计",
                    "折前金额": 1,
                    "折后金额": 1
                }
            ],
            "boardStickCusNum": {
                "客流量": 1,
                "堂食": 1,
                "外卖": 1
            },
            "boardBarYyezs": [
                {
                    "curr_date": "2018-03-06",
                    "外卖": 1,
                    "堂食": 1
                }
            ],
            "boardTabHotSale": [
                {
                    "菜类": "合计",
                    "折前金额": 1,
                    "销量": 1,
                    "折后金额": 1
                }
            ],
            "boardTabColdSale": [
                {
                    "菜名": "乌龙茶",
                    "销量": 1,
                    "金额": 1
                }
            ],
            "boardStickOrderNum": {
                "堂食": 1,
                "订单数": 1,
                "外卖": 1
            },
            "boardTabClph": [
                {
                    "菜名": "盒饭",
                    "销量": 1,
                    "金额": 1
                }
            ],
            "boardStickCusPrice": {
                "客单价": 1,
                "堂食": 1,
                "外卖": 1
            },
            "boardStickYingye": {
                "实收": 1,
                "堂食": 1,
                "外卖": 1
            },
            "boardTabPayType": [
                {
                    "付款方式": "合计",
                    "实收金额": 1,
                    "不计入实收金额": 1
                }
            ],
            "boardPieOrderSource": [
                {
                    "订单来源": "微信",
                    "订单数": 1
                }
            ],
            "boardPiePayType": [
                {
                    "付款方式": "【微信】",
                    "金额": 1
                }
            ],
            "boardTabOrderSource": [
                {
                    "项目名称": "营业额",
                    "金额或值": 1
                }
            ]
        }
        let view_data = {
            //    饼图-出品部门
            //      图例
            pieCpbm: {},
            pieCpbm_l: [],
            //  数据
            pieCpbm_data: [
                // {value:xx, name:xx}
            ],
            //   饼图-订单来源
            //   图例
            pieOrderSource: {},
            pieOrderSource_l: [],
            //   数据
            pieOrderSource_data: [
                // {value:xx, name:xx}
            ],
            //    饼图-支付方式
            // 图例
            piePayType: {},
            piePayType_l: [],
            // 数据
            piePayType_data: [],
            //    柱状图-营业额指数
            //      x 日期
            barYyezs: {},
            barYyezs_x: [],
            //      y 外卖/堂食
            barYyezs_y: [
                {
                    data: []
                },
                {
                    data: []
                }
            ],

            //    四个小便签统计
            notes: {
                income: {
                    one: {
                        title: '收益（元）',
                        desc: 0
                    },
                    two: {
                        title: '堂食',
                        desc: 0
                    },
                    three: {
                        title: '外卖',
                        desc: 0
                    }
                },
                order: {
                    one: {
                        title: '订单数（单）',
                        desc: 0
                    }, two: {
                        title: '堂食',
                        desc: 0
                    }, three: {
                        title: '外卖',
                        desc: 0
                    }
                },
                flow: {
                    one: {
                        title: '客流量（人）',
                        desc: 0
                    }, two: {
                        title: '堂食',
                        desc: 0
                    }, three: {
                        title: '外卖',
                        desc: 0
                    }
                },
                curPrice: {
                    one: {
                        title: '客单价（元）',
                        desc: 0
                    }, two: {
                        title: '堂食',
                        desc: 0
                    }, three: {
                        title: '外卖',
                        desc: 0
                    }
                },

            },

            // 表格 收入
            listIncome: [],
            // 表格 出品部门
            listPart: [],
            // 表格 热销榜
            listTop: [],
            // 表格 滞销榜
            listLast: [],
            // 表格 支付方式
            listPay: [],
            // 表格 菜类
            listType: [],
        }

        // 饼图-出品部门
        true_data.boardPieCpbm.map(v => {
            // 图例增加
            view_data.pieCpbm_l.push(v['出品部门']);
            // 数据增加
            view_data.pieCpbm_data.push(
                {
                    value: v['出品数量'],
                    name: v['出品部门']
                }
            );
        })

        view_data.pieCpbm.legend = view_data.pieCpbm_l
        view_data.pieCpbm.data = view_data.pieCpbm_data

        // 饼图-支付方式
        true_data.boardPiePayType.map(v => {
            // 图例增加
            view_data.piePayType_l.push(v['付款方式']);
            // 数据增加
            view_data.piePayType_data.push(
                {
                    value: v['金额'],
                    name: v['付款方式']
                }
            );
        })

        view_data.piePayType.legend = view_data.piePayType_l
        view_data.piePayType.data = view_data.piePayType_data
        // 饼图-订单来源
        true_data.boardPieOrderSource.map(v => {
            // 图例增加
            view_data.pieOrderSource_l.push(v['订单来源']);
            // 数据增加
            view_data.pieOrderSource_data.push(
                {
                    value: v['订单数'],
                    name: v['订单来源']
                }
            );
        })

        view_data.pieOrderSource.legend = view_data.pieOrderSource_l
        view_data.pieOrderSource.data = view_data.pieOrderSource_data

        // 柱状图
        true_data.boardBarYyezs.map(v => {
            // 图例增加
            view_data.barYyezs_x.push(v.curr_date);
            // 数据增加
            view_data.barYyezs_y[0].data.push(v['堂食']);
            view_data.barYyezs_y[1].data.push(v['外卖']);
        })

        view_data.barYyezs.x = view_data.barYyezs_x
        view_data.barYyezs.y = view_data.barYyezs_y

        // 四个小便签 数据format
        view_data.notes.income.one.desc = Num.numberFormat(true_data.boardStickYingye['实收']);
        view_data.notes.income.two.desc = Num.numberFormat(true_data.boardStickYingye['堂食']);
        view_data.notes.income.three.desc = Num.numberFormat(true_data.boardStickYingye['外卖']);

        view_data.notes.order.one.desc = Num.numberFormat(true_data.boardStickOrderNum['订单数']);
        view_data.notes.order.two.desc = Num.numberFormat(true_data.boardStickOrderNum['堂食']);
        view_data.notes.order.three.desc = Num.numberFormat(true_data.boardStickOrderNum['外卖']);

        view_data.notes.flow.one.desc = Num.numberFormat(true_data.boardStickCusNum['客流量']);
        view_data.notes.flow.two.desc = Num.numberFormat(true_data.boardStickCusNum['堂食']);
        view_data.notes.flow.three.desc = Num.numberFormat(true_data.boardStickCusNum['外卖']);

        view_data.notes.curPrice.one.desc = Num.numberFormat(true_data.boardStickCusPrice['客单价']);
        view_data.notes.curPrice.two.desc = Num.numberFormat(true_data.boardStickCusPrice['堂食']);
        view_data.notes.curPrice.three.desc = Num.numberFormat(true_data.boardStickCusPrice['外卖']);

        // 六个表格
        true_data.boardTabCpbm.map(v => {
            // 出品部门
            view_data.listPart.push(
                {
                    name: v['出品部门'],
                    num: v['出品数量'],
                    before: v['折前金额'],
                    after: v['折后金额'],
                }
            );
        })
        true_data.boardTabHotSale.map(v => {
            // 热销
            view_data.listTop.push(
                {
                    name: v['菜类'],
                    num: v['销量'],
                    before: v['折前金额'],
                    after: v['折后金额'],
                }
            );
        })
        true_data.boardTabColdSale.map(v => {
            // 滞销
            view_data.listLast.push(
                {
                    name: v['菜名'],
                    num: v['销量'],
                    price: v['金额'],
                }
            );
        })
        true_data.boardTabClph.map(v => {
            // 菜类排行
            view_data.listType.push(
                {
                    name: v['菜名'],
                    num: v['销量'],
                    price: v['金额'],
                }
            );
        })
        true_data.boardTabPayType.map(v => {
            // 付款方式
            view_data.listPay.push(
                {
                    name: v['付款方式'],
                    price: v['实收金额'],
                    noPrice: v['不计入实收金额'],
                }
            );
        })
        true_data.boardTabOrderSource.map(v => {
            // 订单来源
            view_data.listPay.push(
                {
                    name: v['付款方式'],
                    price: v['实收金额'],
                    noPrice: v['不计入实收金额'],
                }
            );
        })


        context.commit('_getShopView', view_data);
    },
    // 获取筛选项 - 分支机构
    getOrganMap(context, params) {
        // let data = [{
        //     title: '上海市',
        //     entityId: '5',
        //     children: [
        //         {
        //             title: '黄埔一号店',
        //             entityId: '66',
        //             children: [
        //                 {
        //                     title: '黄1',
        //                     entityId: '777'
        //                 },
        //                 {
        //                     title: '黄2',
        //                     entityId: '888'
        //                 }
        //             ]
        //         }
        //     ]
        // }]
        Requester.get(API.GET_ORGAN_MAP).then(data => {
            let true_data = data.data;
            let formate_data = [{
                branchName: '全部',
                entityId: '',
                children: true_data
            }]
            if (Obj.isEmpty(data)) {
                context.commit('_setHideOrgan');
            }
            context.commit('_selectOrgan', true_data);
            context.commit('_setOrganChecked', formate_data);
        }).catch(e => {
            catchError(e);
        });
    },

    // 前往店铺的信息页
    goShop(context, params) {
        console.log('go', params)
        router.push({
            path: 'shop_manage_view',
            query: {
                entityId: params.entityId,
                crumbName: params.title,
                // plateEntityId: params.plateEntityId
            }
        })
    },
    initViewDate(context) {
        let date = new Date().getTime() / 1000;
        let startStamp = (date - 30 * 24 * 3600) * 1000;
        let endStamp = date * 1000;

        let start = Tool.formatDateByStamp(startStamp);
        let end = Tool.formatDateByStamp(endStamp);

        console.log('start', start)
        console.log('end', end)

        let newViewDate = {
            start: start,
            end: end
        }

        context.commit('_setViewDate', newViewDate)
    },
    setDateEnd(context, end) {
        context.commit('_setDateEnd', end)

    },
    setDateStart(context, start) {
        context.commit('_setDateStart', start)

    },
    setKeyword(context, params) {
        context.commit('_setKeyword', params.keyWord)
    },
    setCode(context, params) {
        context.commit('_setcode', params.code)
    },

    getBrandEntitiesList({commit}){
        let true_data = []
        Requester.post(API.GET_BRAND_ENTITIES_LIST).then(res=>{
            let supplyGroupMap = res.data.supplyGroupMap
            if( !Obj.isEmpty(supplyGroupMap)){
                true_data.push({
                    name: '全部',
                    entityId: ''
                })
                Object.keys(supplyGroupMap).map(key=>{
                    true_data.push({
                        entityId:key,
                        name:supplyGroupMap[key]
                    })
                })
            }
            commit('_getBrandEntitiesList',true_data)
        }).catch(e=>{
            catchError(e)
        })
    },
    //获取分类分组
    getCategory({commit}){
        // API.getBaseGroup({req:JSON.stringify({})})
        Requester.post(API.GET_BASE_GROUP,{req:JSON.stringify({})},{emulateJSON: true})
        .then((res)=> {
            console.log(res.data)
            let calssList = {}
            res.data.map(item=>{
                if(calssList[item.categoryId]){
                    calssList[item.categoryId].groupList.push({
                        entityId:item.id,
                        name:item.name,
                        categoryId:item.categoryId
                    })
                }else{
                    calssList[item.categoryId] = {
                        categoryId:item.categoryId,
                        categoryName:item.categoryName,
                        activeId:'',
                        groupList:[{
                            entityId:'',
                            name:'全部',
                            categoryId:item.categoryId
                        }].concat([{
                            entityId:item.id,
                            name:item.name,
                            categoryId:item.categoryId
                        }])
                    }
                }
            })
            console.log(Object.values(calssList))
            commit('_category',Object.values(calssList))
        }).catch(e=>{
            catchError(e)
        })
    },
    //筛选分组
    selectFilterGroup({commit,state,dispatch},item){
        console.log(item)
        let categoryIds = []
        let groupIds = []
        let category = state.category.concat()
        console.log(category)
        category.map(i=>{
            if(i.categoryId === item.categoryId){
                i.activeId = item.entityId
            }
            i.activeId !== ''?groupIds.push(i.activeId):''
            i.activeId !== ''?categoryIds.push(i.categoryId):''
            
        })
        commit('_category',category)
        commit('_categoryIds',categoryIds)
        commit('_groupIds',groupIds)
        dispatch('initShops');
    },
    setPageSize({ commit, dispatch },params){
        commit('_setPageSize',params)
        commit('_getShops', []);
        dispatch('initShops');
    },
    setPageState({commit},params){
        commit('_setPageSize',params)
    },
    getCloseShop({commit}){
        //GET_CLASE_SHOP
        const params = {
            brandEntityId:shopInfo.entityId
        }
        Requester.get(API.GET_CLASE_SHOP, {params: params}).then(res => {
            if(Object.prototype.toString.call(res.data).slice(8, -1) === 'Boolean'){
                commit('_setCloseShop',res.data)
            }
        }).catch(e=>{
            catchError(e)
        })
    },
    saveFilters({commit,state}){
        const { shop_filter, params  } = state
        const catchFilter = {
            filters: Object.assign({},shop_filter),
            pageState: Object.assign({},params),
            status:true
        }
        commit('_saveFilters',catchFilter)
    },
    setCatchFilters({commit,state}){
        const { catchFilter } = state
        let data = {
            status:false
        }
        if(catchFilter.status){
            commit('_setShopFilter',catchFilter.filters)
            commit('_setPageSize',catchFilter.pageState)
            commit('_saveFilters',data)
        }
    },
    /**
     *  更新自定义编码和简称
     *  @param { String } entityId 店铺id
     *  @param { String? } customCode
     *  @param { String? } shortName
    */
    updateCustomInfo({ dispatch, commit },params){
        Requester.get(API.UPDATE_SHOP_CODE, {params: params}).then(res => {
            if(res.data){
                dispatch('querySimpleShopList')
            }
        }).catch(e=>{
            catchError(e)
        })
    },
    querySimpleShopList({state,commit},shopCode=''){
        const pageState = state.params
        const params = {
            brandEntityId: shopInfo.entityId,
            pageIndex: pageState.pageIndex,
            pageSize: pageState.pageSize,
            shopCode,
        }
        // Requester.post(API.QUERY_SIMPLE_SHOP_LIST, {request:JSON.stringify(params)},{emulateJSON: true}).then(res => {
        Requester.get(API.QUERY_SIMPLE_SHOP_LIST, {params: params}).then(res => {
            if(res.data){
                // dispatch('initShops')
                let true_data = {
                    total: 0,
                    shops: []
                }
    
                if (!Obj.isEmpty(res.data)) {
                    true_data.total = res.data.total;
                    if (res.data.list && res.data.list.length > 0) {
                        res.data.list.map(v => {
                            true_data.shops.push({
                                entityId: v.entityId,
                                title: v.name,
                                code: v.code,
                                desc: v.plateName || '-',
                                phone: v.phone1 || '-',
                                linkman: v.linkman || '-',
                                employeeAmount: v.employeeAmount,
                                foundDate: v.foundDate || '-',
                                status: v.status,
                                statusText: statusText[v.status] || '-',
                                statusColor: statusColor[v.status],
                                joinModelText: joinModeText[v.joinMode] || '-',
                                image: v.shopImg || '',
                                type: joinModeIcon[v.joinMode],
                                address: v.address || '-',
                                plateEntityId: v.plateEntityId,
                                customCode: v.customCode || '',
                                shortName: v.shortName || ''
                            })
                        })
                    }
                    else {
                        true_data.shops = []
                    }
    
                }
                //    提交mutation
                commit('_getShops', true_data);
            }
        }).catch(e=>{
            catchError(e)
        })
    }
    
}

export default actions;
