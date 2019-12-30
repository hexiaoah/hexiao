/**
 * 商品设置相关store
 */

import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api'

import router from "@/router";
import Obj from '@2dfire/utils/object'
import Num from '@2dfire/utils/number'

import goodsFormat from '../../formats/goods'

const goods = {
    namespaced: true,
    state: {
        //商品备注表头定义
        goodRemarkTitle: {
            disableType: 'hidden',
            parent: {
                titles: {
                    1: {
                        name: '备注分类',
                        contentType: 'text'
                    },
                },
                hasOperation: true,
                operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
                    11: {
                        name: '添加备注',
                    },
                    12: {
                        name: '编辑',
                    },
                    13: {
                        name: '删除',
                    }
                },
            },
            child: {
                titles: {
                    1: {
                        name: '备注内容',
                        contentType: 'text',
                    },
                },
                hasOperation: true,
                operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
                    11: {
                        name: '添加备注',
                    },
                    12: {
                        name: '编辑',
                    },
                    14: {
                        name: '删除',
                    }
                },
            }
        },
        //商品加料表头定义
        goodFeedTitle: {
            disableType: 'hidden',
            parent: {
                titles: {
                    1: {
                        name: '加料分类',
                        contentType: 'text'
                    },
                },
                hasOperation: true,
                operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
                    11: {
                        name: '添加新料',
                    },
                    12: {
                        name: '编辑'
                    },
                    13: {
                        name: '删除'
                    }
                },
            },
            child: {
                titles: {
                    1: {
                        name: '加料名称',
                        contentType: 'text'
                    },
                    2: {
                        name: '加料价格（元）',
                        contentType: 'text'
                    },
                },
                hasOperation: true,
                operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
                    11: {
                        name: '添加新料',
                    },
                    12: {
                        name: '编辑'
                    },
                    14: {
                        name: '删除'
                    }
                },
            }
        },
        $baseSetting: {
            'goodClass': {//类别
                value: '',
                verify: 1,
                max: 20,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                vType: 'string',
            },
            'upperClass': {//上级分类
                value: '0',
                options: [
                    {
                        value: '0',
                        label: '无上级分类',
                    }
                ],
                placeholder: '无上级分类',
                disabled: false,
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'string'
            },
            'classCode': { //分类编码
                value: '',
                verify: 1,
                max: 20,
                placeholder: '',
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'string'
            },
            'saleClass': {//销售额归到其他分类
                value: '0',
                options: [],
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'int'
            },
            'saleCommissionClass': {//
                value: 1,
                vType: 'string',
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                options: [
                    {
                        value: 1,
                        label: '不提成'
                    }, {
                        value: 2,
                        label: '按比例'
                    }, {
                        value: 3,
                        label: '按固定金额'
                    }
                ]
            },
            //按比例设置的金额提成
            'saleCommissionByPercent': {
                value: '',
                vType: 'string',
                placeholder: '提成比例',
                verify: 2,
                max: 100,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
            },
            //按固定金额设置提成
            'saleCommissionByAssert': {
                value: '',
                vType: 'string',
                placeholder: '提成金额',
                verify: 2,
                max: 100000,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
            },
            'remarkList': {//备注列表
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            kindTasteList: {//要提交的备注【id】
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            additionKindList: {//要提交的加料[id]
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            'newFeed': {//新料列表
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            selectRemark: {
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                show: false,
                value: '',
                options: [],
                vType: 'array',
            },
            selectFeed: {
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                show: false,
                value: '',
                options: [],
                vType: 'array',
            },
            isInclude: {
                value: 0,////0普通菜类，1套餐菜类
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'int'
            }
        },
        $baseSettingSingle: {
            'goodClass': {//类别
                value: '',
                verify: 1,
                max: 20,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                vType: 'string',
            },
            'upperClass': {//上级分类
                value: '0',
                options: [
                    {
                        value: '0',
                        label: '无上级分类',
                    }
                ],
                placeholder: '无上级分类',
                disabled: false,
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'string'
            },
            'classCode': { //分类编码
                value: '',
                verify: 1,
                max: 20,
                placeholder: '',
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'string'
            },
            'saleClass': {//销售额归到其他分类
                value: '0',
                options: [],
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'int'
            },
            'saleCommissionClass': {//
                value: 1,
                vType: 'string',
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                options: [
                    {
                        value: 1,
                        label: '不提成'
                    }, {
                        value: 2,
                        label: '按比例'
                    }, {
                        value: 3,
                        label: '按固定金额'
                    }
                ]
            },
            //按比例设置的金额提成
            'saleCommissionByPercent': {
                value: '',
                vType: 'string',
                placeholder: '提成比例',
                verify: 2,
                max: 100,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
            },
            //按固定金额设置提成
            'saleCommissionByAssert': {
                value: '',
                vType: 'string',
                placeholder: '提成金额',
                verify: 2,
                max: 100000,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
            },
            'remarkList': {//备注列表
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            kindTasteList: {//要提交的备注【id】
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            additionKindList: {//要提交的加料[id]
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            'newFeed': {//新料列表
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                value: [],
                vType: 'array'
            },
            selectRemark: {
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                show: false,
                value: '',
                options: [],
                vType: 'array',
            },
            selectFeed: {
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                show: false,
                value: '',
                options: [],
                vType: 'array',
            },
            isInclude: {
                value: 0,////0普通菜类，1套餐菜类
                isVerifiedOk: true,
                required: false,
                isrequired: false,
                vType: 'int'
            }
        },
        goodClassList: [],//所有分类，包括一级-4级的，需经过格式化
        goodClassListSingle: [],//所有分类，包括一级-4级的，需经过格式化
        formattedGoodClass: {},//{disableType,titles,cols}
        formattedGoodClassSingle: {},//{disableType,titles,cols}
        goodDetail: {},
        baseSetting: {},
        baseSettingSingle: {},
        isInclude: 0,////分类类型：-1全部，0普通菜，1套餐，2加料

        goodFeedTypeList: [],//商品加料分类
        //加料列表  不含加料信息
        feedList: [],
        formattedGoodFeed: {},//商品加料格式化

        //备注列表类别
        goodRemarkTypeList: [],
        //备注列表 含备注信息

        // goodRemark: {},
        //备注列表 不含备注信息
        remarkList: [],

        formattedGoodRemark: {},
        // 商品单位 列表
        unitList: [],
        // 是否开启商品单位转换
        showConvert: false,
        //    商品做法 列表
        practiceList: [],
        //    商品规格 列表
        specList: [],

        //添加商品验证
        goodsManage: {
            'shopClassify': {
                value: '',
                verify: 1,
                max: 20,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                vType: 'string',
            },
            'unitPrice': {
                value: '',
                verify: 2,
                required: false,
                isrequired: true,
                isVerifiedOk: true,
                vType: 'string',
            },
            'shopCode': {
                value: '',
                required: false,
                isrequired: false,
                isVerifiedOk: true,
                vType: 'string',
            }

        },
        // single
        specListSingle: [],
        practiceListSingle: [],
        unitListSingle: [],
        showConvertSingle: false,
        // 商品加料
        formattedGoodFeedSingle: {},
        goodFeedTypeListSingle: [],//商品加料分类
        formattedGoodRemarkSingle: {},
        goodRemarkTypeListSingle: [],


    },
    mutations: {
        /********************************************商品分类********************************************************/
        //设置格式化商品分类的值
        _formattedGoodClass(state, data) {
            state.formattedGoodClass = data
        },
        _formattedGoodClassSingle(state, data) {
            state.formattedGoodClassSingle = data
        },
        _goodClassList(state, data) {
            state.goodClassList = data
        },
        _goodClassListSingle(state, data) {
            state.goodClassListSingle = data
        },
        _baseSetting(state, data) {
            state.baseSetting = data
        },
        _baseSettingSingle(state, data) {
            state.baseSettingSingle = data
        },
        __baseSettingSetItem(state, params) {
            let {key, data} = params
            state.baseSetting[key] = data;
        },
        __baseSettingSetItemSingle(state, params) {
            let {key, data} = params
            state.baseSettingSingle[key] = data;
        },
        /********************************************商品加料********************************************************/
        _formattedGoodFeed(state, data) {
            state.formattedGoodFeed = data
        },
        _formattedGoodFeedSingle(state, data) {
            state.formattedGoodFeedSingle = data
        },
        _goodFeedTypeList(state, data) {
            state.goodFeedTypeList = data
        },
        _goodFeedTypeListSingle(state, data) {
            state.goodFeedTypeListSingle = data
        },

        /********************************************商品备注********************************************************/

        //设置格式化的备注信息
        _formattedGoodRemark(state, data) {
            state.formattedGoodRemark = data
        },
        //设置格式化的备注信息
        _formattedGoodRemarkSingle(state, data) {
            state.formattedGoodRemarkSingle = data
        },
        _goodRemarkTypeList(state, data) {
            state.goodRemarkTypeList = data
        },
        _goodRemarkTypeListSingle(state, data) {
            state.goodRemarkTypeListSingle = data
        },
        _setUnitList(state, list) {
            state.unitList = list;
        },
        _setUnitListSingle(state, list) {
            state.unitListSingle = list;
        },
        _setUnitConversion(state, item) {
            state.showConvert = item
        },
        _setUnitConversionSingle(state, item) {
            state.showConvertSingle = item
        },

        _setPracticeList(state, list) {
            state.practiceList = list;
        },
        _setSpecList(state, list) {
            state.specList = list;
        },
        // single
        _setSpecListSingle(state, list) {
            state.specListSingle = list;
        },
        _setPracticeListSingle(state, list) {
            state.practiceListSingle = list;
        },
    },
    actions: {
        // 获取单位列表
        getUnitList(context, params) {
            Requester.get(API.GET_UNIT_LIST, {params: params}).then(data => {
                let true_data = data.data

                for (let i = 0; i < true_data.length; i++) {
                    if (true_data[i].unitConversion) {
                        true_data[i].showConvert = true;
                        true_data[i].num = Num.numberFormat(true_data[i].unitConversion.doubleNum);
                    } else {
                        true_data[i].showConvert = false;
                    }
                }
                if (params && params.opEntityId) {
                    context.commit('_setUnitListSingle', true_data);
                } else {
                    context.commit('_setUnitList', true_data);
                }

            }).catch(e => {
                catchError(e);
            });
            // let mock_data = [
            //     {
            //         unitName: '克',
            //         convert: '1',
            //         type: 1,
            //     },
            //     {
            //         unitName: '份',
            //         convert: '300',
            //         type: 0,
            //     }
            // ]
            // context.commit('_setUnitList', mock_data);
        },
        // 是否开启单位换算
        getUnitConversion(context, params) {
            Requester.get(API.GET_UNIT_CONVERSION, {params: params}).then(data => {
                let true_data = data.data;
                if (params && params.opEntityId) {
                    context.commit('_setUnitConversionSingle', true_data);
                } else {
                    context.commit('_setUnitConversion', true_data);
                }

            }).catch(e => {
                catchError(e);
            });
        },
        // 编辑单位
        // 新建
        updateUnit(context, params) {
            Requester.get(API.UPDATE_UNIT, {params: params}).then(data => {

                context.dispatch('getUnitList', params);

            }).catch(e => {
                catchError(e);
            });
        },

        saveUnit(context, params) {
            Requester.get(API.SAVE_UNIT, {params: params}).then(data => {

                context.dispatch('getUnitList', params);

            }).catch(e => {
                catchError(e);
            });

        },
        // 删除单位
        deleteUnit(context, params) {
            // let true_params = {
            //     unitDesc: params.unitDesc
            // }
            Requester.post(API.DELETE_UNIT, params, {emulateJSON: true}).then(data => {
                context.dispatch('getUnitList', params);

            }).catch(e => {
                catchError(e);
            });
        },

        //商品做法 actions
        // 获取做法列表
        getPracticeList(context, params) {
            Requester.get(API.GET_PRACTICE_LIST, {params: params}).then(data => {

                // console.log('data', data)

                let true_data = data.data

                if (params && params.opEntityId) {
                    context.commit('_setPracticeListSingle', true_data);

                } else {
                    context.commit('_setPracticeList', true_data);
                }

            }).catch(e => {
                catchError(e);
            });
            // let mock_data = [
            //     {
            //         practiceName: '红烧',
            //     },
            //     {
            //         practiceName: '清蒸',
            //     }
            // ]
            // context.commit('_setPracticeList', mock_data);
        },
        // 保存新做法 name
        savePractice(context, params) {
            // Requester.post(API.SAVE_PRACTICE, params, {emulateJSON: true}).then(data => {
            Requester.get(API.SAVE_PRACTICE, {params: params}).then(data => {

                context.dispatch('getPracticeList', params);

            }).catch(e => {
                catchError(e);
            });

            // mock
            // let mock_data = context.state.practiceList.concat();
            // console.log('old', mock_data)
            //
            // mock_data.push(
            //     {
            //         practiceName: params.practiceName,
            //     }
            // )
            // console.log('new', mock_data)
            //
            // context.commit('_setPracticeList', mock_data);
        },
        // 删除做法 by id
        deletePractice(context, params) {
            Requester.post(API.DELETE_PRACTICE, params, {emulateJSON: true}).then(data => {

                context.dispatch('getPracticeList', params);

            }).catch(e => {
                catchError(e);
            });
        },


        // 商品规格 actions
        // 获取规格列表
        getSpecList(context, params) {
            Requester.get(API.GET_SPEC_LIST, {params: params}).then(data => {

                console.log('spec data', data)

                let true_data = data.data

                for (let i = 0; i < true_data.length; i++) {
                    true_data[i].priceScale = Num.numberFormat(true_data[i].priceScale);
                    true_data[i].rawScale = Num.numberFormat(true_data[i].rawScale);
                }

                console.log('params', params)
                if (params && params.opEntityId) {
                    context.commit('_setSpecListSingle', true_data);
                } else {
                    console.log('no', params)
                    context.commit('_setSpecList', true_data);
                }

            }).catch(e => {
                catchError(e);
            });
            // let mock_data = [
            //     {
            //         specName: '大杯',
            //         matls: '3',
            //         price: '2',
            //     },
            //     {
            //         specName: '超大杯',
            //         matls: '4',
            //         price: '3',
            //     }
            // ]
            // context.commit('_setSpecList', mock_data);
        },
        // 保存新规格
        saveSpec(context, params) {
            Requester.post(API.SAVE_SPEC, params, {emulateJSON: true}).then(data => {

                context.dispatch('getSpecList', params);


            }).catch(e => {
                catchError(e);
            });

            // mock
            // let mock_data = context.state.specList.concat();
            // console.log('old',mock_data)
            //
            // mock_data.push(
            //     {
            //         specName: params.specName,
            //         matls: params.matls,
            //         price: params.price,
            //     }
            // )
            // console.log('new',mock_data)
            //
            // context.commit('_setSpecList', mock_data);
        },
        // 编辑规格
        updateSpec(context, params) {
            Requester.post(API.UPDATE_SPEC, params, {emulateJSON: true}).then(data => {

                context.dispatch('getSpecList', params);

            }).catch(e => {
                catchError(e);
            });
        },

        // 删除规格 by specId
        deleteSpec(context, params) {
            let true_params = {
                specId: params.id
            }
            console.log('del spec', params)
            if (params.opEntityId) {
                true_params.opEntityId = params.opEntityId;
                true_params.plateEntityId = params.plateEntityId;
            } else {
                true_params.plateEntityId = params.plateEntityId;
            }
            Requester.post(API.DELETE_SPEC, true_params, {emulateJSON: true}).then(data => {

                context.dispatch('getSpecList', params);

            }).catch(e => {
                catchError(e);
            });
        },

        // 商品分类
        getGoodClassList(context, params) {
            Requester.get(API.GET_GOOD_CLASSES, {params: params}).then(
                data => {
                    if (params && params.opEntityId) {
                        context.commit('_goodClassListSingle', data.data)
                    } else {
                        context.commit('_goodClassList', data.data)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        getGoodClass(context, params) {
            let title = [
                {id: 1, name: '分类名称'},
                {id: 2, name: '类型'},
                {
                    id: 3, name: '操作', type: 'operate',
                    list: ['新增子类', '编辑', '删除']
                }
            ]
            //isInclude 分类类型：-1全部，0普通菜，1套餐，2加料
            Requester.post(API.GET_GOOD_CLASSES, params, {emulateJSON: true}).then(
                data => {
                    let list = [];
                    if(data.data && data.data.length > 0){
                        data.data.map(item => {
                            list.push(item)
                        })
                    }
                    context.dispatch('getFormattedGoodClass', {title: title, list: list, opEntityId: params.opEntityId})

                }
            ).catch(e => {
                catchError(e);
            })
        },
        getFormattedGoodClass(context, params) {
            let {title, list} = params
            let title_ = []
            // console.log('title:',title)
            title.map((item, key) => {
                let curItem = {
                    id: item.id,
                    name: item.name,
                    type: (item.type == 'operate' && !!item.type) ? 'operate' : 'content',
                    operates: [],
                }
                if (item.type == 'operate') {
                    for (let i = 0; i < item.list.length; i++) {
                        curItem.operates.push({
                            id: i,
                            name: item.list[i]
                        })
                    }
                }
                title_.push(curItem)
            })
            console.log('title_', title_);
            let tmpList = []

            list.map(item => {
                tmpList.push(item)
            })

            var list_ = goodsFormat.formatGoodClassList({
                titles: title_,
                arr: tmpList,
                deep: 0
            })

            // let goodClassList = {
            //     disableType: 'hidden',
            //     titles: [{
            //         id: 1,
            //         type: 'content',
            //         name: '分类名称'//must content
            //     }, {
            //         id: 2,
            //         type: 'content',
            //         name: '名称'
            //     }, {
            //         id: 3,
            //         type: 'operate',
            //         name: '操作',
            //         operates: {
            //             1: {
            //                 name: '删除',
            //             },
            //             2: {
            //                 name: '更改'
            //             }
            //         }
            //     }],
            //     cols: [
            //         {
            //             id: 11,
            //             item: {
            //                 1: '商品分类',
            //                 2: '商品名称',
            //                 3: {
            //                     1: {
            //                         disabled: true,
            //                     },
            //                     2: {}
            //                 }
            //             },
            //             isOpen: true,
            //             list: [
            //                 {
            //                     id: 111,
            //                     item: {
            //                         1: '商品分类',
            //                         2: '商品名称',
            //                         3: {
            //                             1: {
            //                                 disabled: true,
            //                             },
            //                             2: {}
            //                         }
            //                     },
            //                     isOpen: true,
            //                     list: [
            //                         {
            //                             id: 1111,
            //                             item: {
            //                                 1: '商品分类',
            //                                 2: '商品名称',
            //                                 3: '操作'
            //                             },
            //                             isOpen: true
            //                         },
            //                         {
            //                             id: 11111,
            //                             item: {
            //                                 1: '商品分类',
            //                                 2: '商品名称',
            //                                 3: '操作'
            //                             },
            //                             isOpen: true
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             id: 12,
            //             item: {
            //                 1: '商品分类',
            //                 2: '商品名称',
            //                 3: '操作'
            //             },
            //             isOpen: false,
            //             list: [
            //                 {
            //                     id: 121,
            //                     item: {
            //                         1: '商品分类',
            //                         2: '商品名称',
            //                         3: '操作'
            //                     },
            //                     isOpen: false,
            //                     list: [
            //                         {
            //                             id: 1211,
            //                             item: {
            //                                 1: '商品分类',
            //                                 2: '商品名称',
            //                                 3: '操作'
            //                             },
            //                             isOpen: false
            //                         },
            //                         {
            //                             id: 12111,
            //                             item: {
            //                                 1: '商品分类',
            //                                 2: '商品名称',
            //                                 3: '操作'
            //                             },
            //                             isOpen: false
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //     ]
            // };
            let goodClassListFormat = {
                disableType: 'disabled',
                titles: title_,
                cols: list_,
            }
            if (params && params.opEntityId) {
                context.commit('_formattedGoodClassSingle', goodClassListFormat)

            } else {
                context.commit('_formattedGoodClass', goodClassListFormat)
            }
        },
        deleteGoodClassById(context, params) {
            // let { kindMenuId , entityId} = params
            Requester.post(API.DELETE_GOOD_CLASS, params, {emulateJSON: true}).then(
                data => {
                    if (params && params.opEntityId) {
                        context.dispatch('getGoodClass', {
                            isInclude: -1,
                            opEntityId: params.opEntityId
                        })
                        context.dispatch('getGoodClassList', {
                            isInclude: -1, //分类类型：-1全部，0普通菜，1套餐，2加料
                            opEntityId: params.opEntityId
                        })
                    } else {
                        context.dispatch('getGoodClass', {
                            isInclude: -1,
                            plateEntityId: params.plateEntityId
                        })
                        context.dispatch('getGoodClassList', {
                            isInclude: -1,
                            plateEntityId: params.plateEntityId //分类类型：-1全部，0普通菜，1套餐，2加料
                        })
                    }

                }
            ).catch(e => {
                catchError(e);
            })
        },
        //新增商品分类  添加/编辑
        // groupKindId 销售归属分类ID
        //deductKind 销售提成方式，1/不提成、2/按比例、3/按固定金额，0表示未设
        //deduct 提成比例或金额
        //kindTasteList 备注分类
        //additionKindList 加料分类

        saveAddClassType(context, params) {
            // let {entityId , id , name , parentId , code ,groupKindId ,deductKind , deduct ,kindTasteList ,additionKindList} = params
            // console.log('kindTasteList:', params)
            params.kindTasteList = JSON.stringify(params.kindTasteList)
            params.additionKindList = JSON.stringify(params.additionKindList)
            Requester.post(API.SAVE_GOOD_CLASS, params, {emulateJSON: true}).then(
                data => {
                    if (params && params.opEntityId) {
                        context.dispatch('getGoodClass', {
                            isInclude: -1,
                            opEntityId: params.opEntityId
                        })
                        context.dispatch('getGoodClassList', {
                            isInclude: -1, //分类类型：-1全部，0普通菜，1套餐，2加料
                            opEntityId: params.opEntityId
                        })
                    } else {
                        context.dispatch('getGoodClass', {
                            isInclude: -1,
                            plateEntityId: params.plateEntityId
                        })
                        context.dispatch('getGoodClassList', {
                            isInclude: -1,
                            plateEntityId: params.plateEntityId //分类类型：-1全部，0普通菜，1套餐，2加料
                        })
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        getDetailByIDSetBaseSetting(context, params) {
            Requester.post(API.GET_GOOD_CLASS_DETAIL, params, {emulateJSON: true}).then(
                data => {
                    if (!data.data) return
                    let goodClassDetail = data.data
                    let baseSetting = {}
                    if (params && params.opEntityId) {
                        baseSetting = Object.assign({}, context.state.baseSettingSingle)
                    } else {
                        baseSetting = Object.assign({}, context.state.baseSetting)
                    }

                    baseSetting.saleClass.value = goodClassDetail.groupKindId == undefined ? '0' : goodClassDetail.groupKindId
                    baseSetting.saleCommissionClass.value = ((goodClassDetail.deductKind != 1) && (goodClassDetail.deductKind != 2) && (goodClassDetail.deductKind != 3)) ? 1 : goodClassDetail.deductKind
                    baseSetting.saleCommissionByPercent.value = ''
                    baseSetting.saleCommissionByAssert.value = ''
                    switch (goodClassDetail.deductKind) {
                        case 2:
                            baseSetting.saleCommissionByPercent.value = (!goodClassDetail.deduct) ? '' : goodClassDetail.deduct
                            console.log('saleCommissionByPercent----------', baseSetting.saleCommissionByPercent.value)
                            break
                        case 3:
                            baseSetting.saleCommissionByAssert.value = (!goodClassDetail.deduct) ? '' : goodClassDetail.deduct
                            console.log('saleCommissionByAssert----------', baseSetting.saleCommissionByAssert.value)
                            break
                    }
                    baseSetting.classCode.value = goodClassDetail.code === undefined ? '' : goodClassDetail.code
                    baseSetting.upperClass.value = '0'
                    if (goodClassDetail.parentId == 0) {//上级分类
                        baseSetting.upperClass.value = '0'
                    } else {
                        baseSetting.upperClass.value = goodClassDetail.parentId
                    }
                    // = (this.goodClassDetail.parentId == '0') ?  '' : this.goodClassDetail.parentId

                    baseSetting.goodClass.value = goodClassDetail.name || ''
                    baseSetting.saleClass.value = goodClassDetail.groupKindId || '0'
                    baseSetting.isInclude.value = goodClassDetail.isInclude


                    //备注 kindTasteList additionKindList初始化
                    let opt1 = [];
                    baseSetting.additionKindList.value = []
                    if (!!goodClassDetail.additionKindList) {
                        goodClassDetail.additionKindList.map(item => {
                            baseSetting.additionKindList.value.push(item.id)
                            opt1.push({
                                name: item.name,
                                value: item.id
                            })
                        })
                        // name value
                        baseSetting.newFeed.value = opt1
                    }else{
                        baseSetting.additionKindList.value = []
                        baseSetting.newFeed.value = []
                    }
                    baseSetting.selectRemark.value = ''
                    baseSetting.selectFeed.value = ''

                    let opt2 = [];
                    baseSetting.kindTasteList.value = []
                    if (!!goodClassDetail.kindTasteList) {
                        goodClassDetail.kindTasteList.map(item => {
                            baseSetting.kindTasteList.value.push(item.id)
                            opt2.push({
                                name: item.name,
                                value: item.id
                            })
                        })
                        baseSetting.remarkList.value = opt2
                    }else{
                        baseSetting.remarkList.value = []
                    }
                    if (params && params.opEntityId) {
                        context.commit('_baseSettingSingle', baseSetting)

                    } else {
                        context.commit('_baseSetting', baseSetting)

                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        updateBaseSetting(context, params) {
            let {key, data} = params;
            if (params && params.opEntityId) {
                context.commit('__baseSettingSetItemSingle', params)

            } else {
                context.commit('__baseSettingSetItem', params)
            }
        },

        //baseSetting 所有框清空
        resetBaseSetting(context, params) {
            let $baseSetting = Obj.clone(context.state.$baseSetting);
            if(params && params.opEntityId){
                context.commit('_baseSettingSingle', $baseSetting)
            }else{
                context.commit('_baseSetting', $baseSetting)
            }
            context.dispatch('getFeedTypeListSetBaseSetting', params)
            context.dispatch('getRemarkTypeListSetBaseSetting', params)
        },

        getFeedTypeListSetBaseSetting(context, params) {
            let self = this;

            Requester.get(API.GET_GOOD_FEEDS_LIST, {params: params}).then(
                data => {
                    if (!!data.data) {
                        let options = [];
                        data.data.map(item => {
                            options.push({
                                value: item.id,
                                label: item.name
                            })
                        })
                        let opts;
                        if (params && params.opEntityId) {
                            opts = Object.assign({}, context.state.baseSettingSingle);
                        }
                        else{
                            opts = Object.assign({}, context.state.baseSetting);
                        }

                        opts.selectFeed.options = options;

                        if (params && params.opEntityId) {
                            context.commit('_baseSettingSingle', opts)

                        } else {
                            context.commit('_baseSetting', opts)

                        }
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        getRemarkTypeListSetBaseSetting(context, params) {
            let self = this;
            Requester.post(API.GET_GOOD_REMARKS_LIST, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        // context.commit('_goodRemarkTypeList', data.data)
                        let options = [];
                        data.data.map(item => {
                            options.push({
                                value: item.id,
                                label: item.name
                            })
                        })
                        let opts;

                        if (params && params.opEntityId) {
                            opts = Object.assign({}, context.state.baseSettingSingle);
                        }
                        else{
                            opts = Object.assign({}, context.state.baseSetting);
                        }
                        opts.selectRemark.options = options;
                        if (params && params.opEntityId) {
                            context.commit('_baseSettingSingle', opts)

                        } else {
                            context.commit('_baseSetting', opts)

                        }
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        /********************************************商品加料********************************************************/
        //获取商品备注不含加料信息
        getFeedTypeList(context, params) {
            // let {entityId} = params;
            Requester.get(API.GET_GOOD_FEEDS_LIST, {params: params}).then(
                data => {
                    if (!!data.data) {
                        if (params && params.opEntityId) {
                            context.commit('_goodFeedTypeListSingle', data.data)
                        }
                        else {
                            context.commit('_goodFeedTypeList', data.data)

                        }
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //获取商品加料
        getGoodFeed(context, params) {
            let title = context.state.goodFeedTitle
            Requester.post(API.GET_GOOD_FEEDS_ADDITION_LIST, params, {emulateJSON: true}).then(
                data => {

                    if (params && params.opEntityId) {
                        context.dispatch('getFormattedGoodFeedSingle', {title: title, list: data.data})

                    } else {
                        context.dispatch('getFormattedGoodFeed', {title: title, list: data.data})

                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        //获取格式化的商品加料
        getFormattedGoodFeed(context, params) {
            let {title, list} = params;
            let list_ = goodsFormat.formatGoodFeedList(title, list)
            let goodFeeds = {
                disableType: 'default',
                thead: title,
                tbody: list_,
            }
            context.commit('_formattedGoodFeed', goodFeeds)
        },
        //获取格式化的商品加料-门店
        getFormattedGoodFeedSingle(context, params) {
            let {title, list} = params;
            let list_ = goodsFormat.formatGoodFeedList(title, list)
            let goodFeeds = {
                disableType: 'default',
                thead: title,
                tbody: list_,
            }
            context.commit('_formattedGoodFeedSingle', goodFeeds)
        },

        //添加或编辑加料分类
        saveFoodFeedType(context, params) {
            Requester.post(API.SAVE_GOOD_FEED_CATA, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodFeed', params)
                        context.dispatch('getFeedTypeList', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //添加加料
        addGoodFeed(context, params) {
            // let { additionKindId , name , price} = params
            Requester.post(API.SAVE_GOOD_FEED, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodFeed', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //删除分类
        deleteFeedType(context, params) {
            let {entityId, id} = params;
            Requester.post(API.DELETE_GOOD_FEED_CATA, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodFeed', params)
                        context.dispatch('getFeedTypeList', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //删除加料
        deleteFeed(context, params) {
            let {entityId, id} = params;
            Requester.post(API.DELETE_GOOD_FEED, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodFeed', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },

        // 商品属性-备注
        //获取商品备注分类列表
        getRemarkTypeList(context, params) {
            // let {entityId} = params;
            Requester.get(API.GET_GOOD_REMARKS_LIST, {params: params}).then(
                data => {
                    if (!!data.data) {
                        if (params && params.opEntityId) {
                            context.commit('_goodRemarkTypeListSingle', data.data)
                        } else {
                            context.commit('_goodRemarkTypeList', data.data)
                        }
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //获取商品备注含备注信息
        getGoodRemark(context, params) {

            let title = context.state.goodRemarkTitle
            Requester.get(API.GET_GOOD_REMARKS_ADDITION_LIST, {params: params}).then(
                data => {
                    if (params && params.opEntityId) {
                        context.dispatch('getFormattedGoodRemarkSingle', {title: title, list: data.data})

                    } else {
                        context.dispatch('getFormattedGoodRemark', {title: title, list: data.data})
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        getFormattedGoodRemark(context, params) {
            let {title, list} = params;
            let list_ = goodsFormat.formatGoodRemarkList(title, list)
            // let goodSpecifications = {
            //     disableType: 'default',//'default':
            //     thead: {//表头对总类别与子类别的信息定义
            //         parent: {
            //             titles: {
            //                 1: {
            //                     name: '加料分类',
            //                     contentType: 'text'
            //                 },
            //                 2: {
            //                     name: '备注内容',
            //                     contentType: 'text',
            //                 },
            //             },
            //             hasOperation: true,
            //             operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
            //                 11: {
            //                     name: '添加备注',
            //                 },
            //                 12: {
            //                     name: '编辑',
            //                 },
            //                 13: {
            //                     name: '删除',
            //                 }
            //             },
            //         },
            //         child: {
            //             titles: {},
            //         }
            //     },
            //     tbody: [
            //         {
            //             id: 11,
            //             parent: {
            //                 contents: {
            //                     1: {
            //                         content: '水果类'
            //                     },
            //                     2: {
            //                         content: '2.0'
            //                     },
            //                 },
            //                 operations: {
            //                     11: {
            //                         disable: true
            //                     }
            //                 }
            //             },
            //             child: []
            //         },
            //         {
            //             id: 12,
            //             parent: {
            //                 contents: {
            //                     1: {
            //                         content: '水果类'
            //                     },
            //                     2: {
            //                         content: '2.0'
            //                     }
            //                 },
            //                 operations: {
            //                     11: {
            //                         disable: false
            //                     }
            //                 }
            //             },
            //             child: []
            //         },
            //     ]
            // }
            let goodRemarks = {
                disableType: 'default',
                thead: title,
                tbody: list_,
            }
            context.commit('_formattedGoodRemark', goodRemarks)
        },
        getFormattedGoodRemarkSingle(context, params) {
            let {title, list} = params;
            let list_ = goodsFormat.formatGoodRemarkList(title, list)
            let goodRemarks = {
                disableType: 'default',
                thead: title,
                tbody: list_,
            }
            context.commit('_formattedGoodRemarkSingle', goodRemarks)
        },
        //添加或编辑备注分类
        saveFoodRemarkType(context, params) {
            // let {entityId , id, name} = params;
            Requester.post(API.SAVE_GOOD_REMARK_CATA, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodRemark', params)
                        context.dispatch('getRemarkTypeList', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //添加备注
        addGoodRemark(context, params) {
            // let { entityId , kindTasteId , name } = params
            Requester.post(API.SAVE_GOOD_REMARK, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodRemark', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //删除备注分类
        deleteRemarkType(context, params) {
            // let { entityId , id } = params;
            Requester.post(API.DELETE_GOOD_REMARK_CATA, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodRemark', params)
                        context.dispatch('getRemarkTypeList', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },
        //删除备注
        deleteRemark(context, params) {
            let {entityId, id} = params;
            Requester.post(API.DELETE_GOOD_REMARK, params, {emulateJSON: true}).then(
                data => {
                    if (!!data.data) {
                        context.dispatch('getGoodRemark', params)
                    }
                }
            ).catch(e => {
                catchError(e);
            })
        },


        /********************************************商品管理********************************************************/
        addManageGoods(context, params) {
            router.push({
                path: 'goods_add',
                query: {
                    crumbName: params.name
                }
            })
        },
    },
    getters: {
        // 数据
        data(state) {
            return state;
        },
        unitList(state) {
            return state.unitList
        },
        unitListSingle(state) {
            return state.unitListSingle
        },
        showConvert(state) {
            return state.showConvert
        },
        showConvertSingle(state) {
            return state.showConvertSingle
        },
        practiceList(state) {
            return state.practiceList
        },
        practiceListSingle(state) {
            return state.practiceListSingle
        },
        specList(state) {
            return state.specList
        },
        specListSingle(state) {
            return state.specListSingle
        },
        // //获取商品分类信息详情
        goodDetail(state) {
            return state.goodDetail
        },
        // verify(state){
        //     for (let key in state.baseSetting) {
        //         let v = state.baseSetting[key].isVerifiedOk
        //         if (v != undefined) {
        //             if (!v) return false
        //         }
        //     }
        //     return true;
        // },

        baseSetting(state) {
            return state.baseSetting
        },
        baseSettingSingle(state) {
            return state.baseSettingSingle
        },
        goodsManage(state) {
            return state.goodsManage
        },
        //获取商品分类信息
        formattedGoodClass(state) {
            return state.formattedGoodClass
        },
        //商品所有类别列表，不嵌套
        goodClassListSingle(state) {
            return state.goodClassListSingle
        },
        //获取商品分类信息
        formattedGoodClassSingle(state) {
            return state.formattedGoodClassSingle
        },
        //商品所有类别列表，不嵌套
        goodClassList(state) {
            return state.goodClassList
        },
        //获取商品加料信息
        formattedGoodfeed(state) {
            return state.formattedGoodFeed
        },
        //获取商品加料信息-门店
        formattedGoodFeedSingle(state) {
            return state.formattedGoodFeedSingle
        },
        //获取加料分类列表
        goodFeedTypeList(state) {
            return state.goodFeedTypeList
        },
        //获取加料分类列表-shop
        goodFeedTypeListSingle(state) {
            return state.goodFeedTypeListSingle
        },

        //获取备注分类列表
        goodRemarkTypeList(state) {
            return state.goodRemarkTypeList
        },

        //获取备注分类列表
        goodRemarkTypeListSingle(state) {
            return state.goodRemarkTypeListSingle
        },


        formattedGoodRemark(state) {
            return state.formattedGoodRemark
        },
        formattedGoodRemarkSingle(state) {
            return state.formattedGoodRemarkSingle
        }
    }
}

export default goods;
