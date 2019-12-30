import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";
import Cookie from '@2dfire/utils/cookie'


Vue.use(iView);
let shopInfo = {
    entityId:''
}
if(Cookie.getItem('entrance') != undefined){
    shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
}

let Message = iView.Message;

const shopSelect = {
    namespaced: true,
    state: {
        shops:[],
        shopFilter: {
            keyword: '',
            areas: [],
            area_show: [],
            brands: [],
            joinModes: [
                {
                    name: '全部',
                    entityId: '-1',
                },
                {
                    name: '加盟',
                    entityId: 0,
                },
                {
                    name: '直营',
                    entityId: 1,
                },
                {
                    name: '合作',
                    entityId: 2,
                },
                {
                    name: '合营',
                    entityId: 3,
                },
            ],

            organs: [],
            organs_show: [],
            organs_checked: [],
            areas_checked: [],

            showFilterOrgan: true,

            // 选中的品牌id
            selected_brand: '',
            // 选中的加盟类型 默认全部 -1
            selected_join: '-1',
            // 选中的组织id
            selected_organ: '',
            // 省id
            selected_provinceId: '',
            // 城市id
            selected_cityId: '',
            // 区县id
            selected_townId: '',
            //applyType
            applyType:'',
            //类别ID
            categoryIds:[],
            //分组ID
            groupIds:[],
            excludeCategoryId:'',
            currentGroupId:''
        },
        shopList: [],
        category:[]

    },
    mutations: {
        _getShops(state, shops) {
            state.shops = [].concat(shops)
        },
        _selectBrand(state, brands) {
            state.shopFilter.brands = brands
        },
        _setBrand(state, selected_brand) {
            state.shopFilter.selected_brand = selected_brand
        },
        _selectJoinModes(state, joinModes) {
            state.shopFilter.joinModes = joinModes
        },
        _setJoinType(state, selected_join) {
            state.shopFilter.selected_join = selected_join
        },
        _selectOrgan(state, organs) {
            state.shopFilter.organs_show = organs
        },
        _selectArea(state, areas) {
            state.shopFilter.areas = areas
        },
        _setOrgan(state, organ) {
            state.shopFilter.selected_organ = organ
        },
        _setOrganChecked(state, organs_checked) {
            state.shopFilter.organs_checked = organs_checked
        },
        _setAreasChecked(state, areas_checked) {
            state.shopFilter.areas_checked = areas_checked
        },
        _setAreas(state, areas) {
            state.shopFilter.areas = areas
        },
        _setAllArea(state) {
            state.shopFilter.selected_provinceId = '';
            state.shopFilter.selected_cityId = '';
            state.shopFilter.selected_townId = '';
        },
        _setProvinceId(state, id) {
            state.shopFilter.selected_provinceId = id;
            state.shopFilter.selected_cityId = '';
            state.shopFilter.selected_townId = '';
        },
        _setCityId(state, id) {
            state.shopFilter.selected_cityId = id;
            state.shopFilter.selected_townId = '';
        },
        _setTownId(state, id) {
            state.shopFilter.selected_townId = id
        },
        _setKeyword(state, word) {
            state.shopFilter.keyword = word;
        },
        _clearFilter(state) {
            state.shopFilter.selected_brand = '';
            state.shopFilter.selected_organ = '';
            state.shopFilter.selected_provinceId = '';
            state.shopFilter.selected_cityId = '';
            state.shopFilter.selected_townId = '';
            state.shopFilter.selected_join = '-1';
            state.shopFilter.applyType = '';
            state.shopFilter.categoryIds = [];
            state.shopFilter.groupIds = [];
        },
        _setHideOrgan(state) {
            state.shopFilter.showFilterOrgan = false;

        },
        _setAllShops(state, shops) {
            state.shops = shops
        },
        _setShopList(state, list) {
            state.shopList = list
        },
        _clearShopList(state) {
            state.shopList = []
        },
        _setNoSearchItems(state, res) {
            state.noSearchItems = res
        },
        _setApplyType(state,data){
            state.shopFilter.applyType = data
        },
        _category(state,data){
            state.category = [].concat(data)
        },
        _categoryIds(state,data){
            state.shopFilter.categoryIds = [].concat(data)
        },
        _groupIds(state,data){
            state.shopFilter.groupIds = [].concat(data)
        },
        _excludeids(state,data){
            console.log(data)
            state.shopFilter.excludeCategoryId=data.itemClassId
            state.shopFilter.currentGroupId=data.itemId
        }
    },
    actions: {
        // 选择品牌
        selectBrand(context, entityId) {
            let brands = context.state.shopFilter.brands.concat();
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
        // 选择品牌
        selectJoin(context, entityId) {
            let modes = context.state.shopFilter.joinModes.concat();
            modes.map(v => {
                if (v.entityId == entityId) {
                    v.active = true;
                }
                else {
                    v.active = false;
                }
            });
            console.log('modes:',modes)
            context.commit('_selectJoinModes', modes)
            context.commit('_setJoinType', entityId)
            context.dispatch('initShops');
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
        setApplyType({commit},params){
            commit('_setApplyType',params)
        },
        // 获取筛选项 - 分支机构
        getOrganMap(context, params) {
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
        //获取分类分组
        getCategory({commit},params){
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
                if(params.itemClassId){
                    delete calssList[params.itemClassId]
                }
                console.log(Object.values(calssList))
                commit('_category',Object.values(calssList))
            }).catch(e=>{
                catchError(e)
            })
        },
        // 获取筛选项 - 区域

        getArea(context) {
            Requester.get(API.GET_ALL_AREAS).then(data => {
                console.log('get', data);
                let true_data = [{
                    id: '',
                    name: '全部',
                    type: 'all',
                    subList: data.data
                }]

                context.commit('_setAreas', data.data);
                context.commit('_setAreasChecked', true_data)

            }).catch(e => {
                catchError(e);
            });
        },
        // 筛选商家 - 选择机构
        selectOrgan(context, item) {
            let organs = context.state.shopFilter.organs_show.concat();
            let organs_checked = context.state.shopFilter.organs_checked.concat();
            let sub_organs = [];
            organs.map(v => {
                console.log('entityId', v.entityId, item.entityId)
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
            let areas = context.state.shopFilter.areas.concat();
            let areas_checked = context.state.shopFilter.areas_checked.concat();
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
        //筛选分组
        selectFilterGroup({commit,state,dispatch},item){
            let categoryIds = []
            let groupIds = []
            let category = state.category.concat()

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

        excludeids({commit},params){
            commit('_excludeids',params)
        },
        // 地区/机构 方法类似
        // 机构筛选项-选择回退
        backOrgan(context, params) {
            let organs_checked = context.state.shopFilter.organs_checked.concat();
            console.log(organs_checked.length, params.index)
            let new_organ = organs_checked.splice(0, params.index + 1)
            context.commit('_setOrganChecked', new_organ)
            context.commit('_selectOrgan', params.item.children)
            context.commit('_setOrgan', params.item.entityId)

            context.dispatch('initShops');

        },
        // 地区/机构 方法类似
        // 机构筛选项-选择回退
        backArea(context, params) {
            let areas_checked = context.state.shopFilter.areas_checked.concat();
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
        // 清空筛选项
        clearFilter(context) {
            context.commit('_clearFilter')
            context.commit('_getShops',[])
        },

        initShops(context) {
            console.log('init shops')

            context.dispatch('getShops', {});
        },
        // 获取商家列表
        getShops(context, params) {
            console.log('get shops')

            // 获取筛选项
            let filter = context.state.shopFilter;

            let filter_params = {
                plateEntityId: filter.selected_brand,
                provinceId: filter.selected_provinceId,
                cityId: filter.selected_cityId,
                townId: filter.selected_townId,
                branchEntityId: filter.selected_organ,
                joinMode: filter.selected_join,
                applyType: filter.applyType,
                // categoryIds:filter.categoryIds,
                groupIdList:filter.groupIds,
                excludeCategoryId:filter.excludeCategoryId,
                currentGroupId:filter.currentGroupId,
            }
            console.log('filter_params: ',params,filter_params)
            // 整个参数
            params = Object.assign(params, filter_params,{brandEntityId:shopInfo.entityId})

            if (filter.keyword) {
                params.keyword = filter.keyword
            }
            console.log(params)
            Requester.post(API.QUERY_ALL_CHAIN_SHOP_LIST, {req: JSON.stringify(params)},{emulateJSON: true}).then(data => {
                // 数据处理
                // ...
                console.log('empty?', Obj.isEmpty(data.data))
                let true_data = {
                    total: 0,
                    shops: []
                }
                // if (!Obj.isEmpty(data.data)) {
                    //     let dealImg = new Img.imageUtil()
                    //     true_data.total = data.data.total;
                    //     data.data.list.map(v => {
                        //         true_data.shops.push({
                            //             entityId: v.entityId,
                            //
                            //             title: v.name,
                            //             code: v.code,
                            //             desc: v.plateName || '-',
                            //             phone: v.phone1 || '-',
                            //             linkman: v.linkman || '-',
                            //             employeeAmount: v.employeeAmount,
                            //             foundDate: v.foundDate || '-',
                            //             status: '',
                            //             image: v.shopImg || '',
                            //             // image: v.shopImg && dealImg.getRectImageUrl({imageUrl: v.shopImg}) || '',
                            //             // type: joinModeIcon[v.joinMode],
                            //             address: v.address || '-',
                            //         })
                            //     })
                            // }
                if(!Obj.isEmpty(data.data)){
                    context.commit('_getShops', data.data);
                }else{
                    context.commit('_getShops', []);
                }
                //    提交mutation
            }).catch(e => {
                catchError(e);
            });
        },
        checkAllShop(context, type) {
            let shopList = context.state.shops.concat();
            if(type){
                shopList.map(item=>{
                    if(item.isExclude == '-1'){
                        item.checked = true
                    }
                })
            }else{
                shopList.map(item=>{
                    if(item.isExclude == '-1'){
                        item.checked = false
                    }
                })
            }

            context.commit('_setAllShops', shopList)

        },
        checkOneShop(context, params){
            let shopList = context.state.shops.concat();
                shopList.map(item=>{
                    if(item.entityId == params.entityId){
                        if(params.type){
                            item.checked = true
                        }
                        else{
                            item.checked = false
                        }
                    }
                })
            context.commit('_setAllShops', shopList)
        },
        // 选中一个门店
        selectShop(context, params) {
            let tmp_list = context.state.shopList.concat();
            tmp_list.map(item => {
                if (item.entityId === params.entityId) {
                    item.active = !item.active
                }
            })

            context.commit('_setShopList', tmp_list)
        },

// 取消选择一个门店
        cancelShop(context, params) {
            let tmp_list = context.state.shopList.concat();
            tmp_list.splice(params.index, 1);
            context.commit('_setShopList', tmp_list)
        },

// 将选择组件中的门店加入下发的门店列表内
        joinShop(context, params) {
            // 所有门店列表
            let shop_list = params.concat();
            // 已选的门店列表
            let ori_list = context.state.shopList.concat();
            // 临时存储选中门店列表
            let tmp_list = [];

            // 选择门店总数
            let allCount = 0;
            // 重复门店数量
            let repeatCount = 0;
            // 要提交的门店列表
            let new_list = [];

            // 计算选中的门店数
            shop_list.map(v => {
                if (v.checked) {
                    // 获取选中的门店，推入临时列表中
                    tmp_list.push({
                        name: v.name,
                        entityId: v.entityId,
                        active: false
                    });
                    allCount++;
                    v.checked = false;
                }
            });

            // 计算重复的门店数
            tmp_list.map((w, i) => {
                ori_list.map(u => {
                    if (u.name === w.name) {
                        repeatCount++;
                    }
                })
            });

            // 合并已选和新选的门店
            new_list = ori_list.concat(tmp_list);

            // 判断三种情况 全部重复、部分重复、无重复
            if (repeatCount === allCount) {
                Message.info("您添加了" + allCount + "个门店，其中重复" + repeatCount + "个，已自动为您合并。")
            } else if (repeatCount > 0 && repeatCount !== allCount) {
                // 选择门店去重
                let hash = {};
                new_list = new_list.reduce(function (item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, []);

                Message.info("您添加了" + allCount + "个门店，其中重复" + repeatCount + "个，已自动为您合并。")

                context.commit('_setShopList', new_list)
            } else {
                context.commit('_setShopList', new_list)
            }

        },
// 清空所选门店
        clearShops(context) {
            context.commit('_clearShopList');
        },
// 清空所选门店
        setNoSearchItems(context, params) {
            let noSearchItems = false;
            console.log('setNoSearchItems',params.goodsName, params.goodsName, params)
            if(!params.goodsName && !params.kindId){
                noSearchItems = true;
            }

            context.commit('_setNoSearchItems', noSearchItems);
        },
    },
    getters: {
        data(state) {
            return state;
        },
        shopFilter(state) {
            return state.shopFilter
        },
        shops(state) {
            return state.shops
        },
        shopList(state) {
            return state.shopList
        },
        noSearchItems(state) {
            return state.noSearchItems
        },
        categoryList(state){
            return state.category
        }
    }
};
export default shopSelect;
