/**
 * 门店管理相关路由页面store
 */
import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api'
import Obj from '@2dfire/utils/object'
import Cookie from '@2dfire/utils/cookie'

const actions = {

    selectOrgan(context, item) {
        let organs = context.state.shop_filter.organs_show.concat();
        let organs_checked = context.state.shop_filter.organs_checked.concat();
        let sub_organs = [];
        organs.map(v => {
            console.log('id', v.id, item.id)
            if (v.id == item.id) {
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
        context.commit('_setOrgan', item.id)

    },
    backOrgan(context, params) {
        let organs_checked = context.state.shop_filter.organs_checked.concat();
        console.log(organs_checked.length, params.index)
        let new_organ = organs_checked.splice(0, params.index + 1)
        context.commit('_setOrganChecked', new_organ)
        context.commit('_selectOrgan', params.item.children)
        context.commit('_setOrgan', params.item.id)
    },

    setOrganHead(context) {
        let name = '';
        // 从cookie中获取店铺的名称
        let shopInfo = Cookie.getItem('shopInfo');
        if(shopInfo){
            name = JSON.parse(shopInfo).entityName;
        }
        context.commit('_setOrganHead', name);
        // context.dispatch('getHeadInfo');

    },
    // 获取总部信息
    getHeadInfo(context) {
        let params = {
            entityId: ''
        }

        let shopInfo = Cookie.getItem('shopInfo');
        if(shopInfo){
            params.entityId = JSON.parse(shopInfo).entityId;
        }

        console.log(params, 'id!!!')
        context.dispatch('getOrganInfo', params)


    },

    // 获取分支机构
    getOrganMap(context, params) {
        Requester.get(API.GET_ORGAN_MAP).then(data => {
            // 数据处理
            // ...
            // 提交mutation
            console.log('data', data)
            // let data = [
            //     {
            //         branchName: '华东大区',
            //         entityId: '1',
            //         expand: false,
            //         children: [
            //             {
            //                 branchName: '浙江省',
            //                 entityId: '2',
            //                 expand: false,
            //                 "shopCount": 19,
            //                 children: [
            //                     {
            //                         branchName: '西湖区店',
            //                         entityId: '3',
            //                         expand: false,
            //                         children: [
            //                             {
            //                                 branchName: '西湖区1',
            //                                 entityId: '6123123'
            //                             },
            //                             {
            //                                 branchName: '西湖区12',
            //                                 entityId: '466',
            //                             },
            //                             {
            //                                 branchName: '西湖区13',
            //                                 entityId: '17666'
            //                             }
            //                         ]
            //                     },
            //                     {
            //                         branchName: '拱墅区',
            //                         entityId: '42345',
            //                     },
            //                     {
            //                         branchName: '外滩',
            //                         entityId: '17',
            //                         organ_info: {
            //                             name: '哈哈',
            //                             code: '123',
            //                             num: '333253',
            //                             found_date: '2018-09-18',
            //                             manager: 'wuwuw',
            //                             phone: '13988888888',
            //                             address: 'asdasdasd'
            //                         }
            //                     }
            //                 ]
            //             },
            //             {
            //                 branchName: '上海市',
            //                 entityId: '5',
            //                 expand: false,
            //                 children: [
            //                     {
            //                         branchName: '黄埔一号店',
            //                         entityId: '6',
            //                     },
            //                     {
            //                         branchName: '老外滩',
            //                         entityId: '7'
            //                     }
            //                 ]
            //             }
            //         ]
            //     }]
            let true_data =  data.data
            context.commit('_searchOrgan', true_data);

        }).catch(e => {
            catchError(e);
        });
    },
    // 获取分支机构详情
    getOrganInfo(context, params) {
        console.log('getoInfo')
        let param = {
            branchEntityId: params.entityId
        }
        Requester.get(API.GET_ORGAN_INFO, {params: param}).then(data => {
            let true_data = data.data

            console.log('data!!',Obj.isEmpty(true_data))

            // let data = {
            //     "brandEntityId": "",
            //     "industry": 0,
            //     "parentEntityId": "",
            //     "cityId": "",
            //     "townId": "",
            //     "attributeExt": "",
            //     "countryId": "",
            //     "countryCode": "",
            //     "tel": "电话",
            //     "id": "",
            //     "lastVer": 0,
            //     "email": "",
            //     "branchId": "",
            //     "spell": "",
            //     "address": "地址",
            //     "foundDate": "成立日期",
            //     "isValid": 0,
            //     "branchName": "名称",
            //     "entityId": "实体ID",
            //     "provinceId": "",
            //     "sortCode": 0,
            //     "branchCode": "编号",
            //     "opTime": 0,
            //     "createTime": 0,
            //     "contacts": "联系人"
            // }
            let tmp_flow = [];
            let new_data = {};
            if(Obj.isEmpty(true_data)) {
                new_data = {
                    name: '-',
                    num:  0,
                    code: '-',
                    found_date:  '-',
                    manager:  '-',
                    phone:'-',
                    address: '-',
                    organ_flow: []
                }
            }
            else{
                true_data.parentList.map(v=> {
                    tmp_flow.push(v.branchName);
                })

                new_data = {
                    name: true_data.branchName,
                    num: params.shopCount || 0,
                    code: true_data.branchCode,
                    found_date: true_data.foundDate || '-',
                    manager: true_data.contacts || '-',
                    phone: true_data.tel || '-',
                    address: true_data.address || '-',
                    organ_flow: tmp_flow

                }
            }

            context.commit('_getOrganInfo', new_data);
        }).catch(e => {
            catchError(e);
        });
        // 注释不用
        // 改成请求接口，返回组织详情
        // context.commit('_clearTmpFlow');
        // context.dispatch('setOrganFlow', params).then(() => {
        //     let tmp_flow = context.state.tmp_flow.concat();
        //     // 第二级：判断循环得到临时组织长度为1，且第一项名称与选中的不同；第三级以上：临时组织list长度超过1
        //     if ((tmp_flow.length == 1 && tmp_flow[0] != params.title ) || tmp_flow.length > 1) {
        //         // 从顶部塞入当前选中的节点的名称
        //         tmp_flow.unshift(params.title);
        //     }
        //     tmp_flow = tmp_flow.reverse();
        //     // 设置当前选中组织流
        //     context.commit('_setOrganFlow', tmp_flow);
        //     // 设置当前选中组织详情
        //     context.commit('_getOrganInfo', params.organ_info);
        // })

    },
    // setOrganFlow(context, params) {
    // 弃用
    //
    //     let organ_flow = context.state.tmp_flow.concat();
    //     if (params.parent) {
    //         organ_flow.push(params.parent.title)
    //         context.commit('_setOrganTmpFlow', organ_flow)
    //         if (params.parent.parent) {
    //             context.dispatch('setOrganFlow', params.parent)
    //         }
    //     } else {
    //         organ_flow.push(params.title)
    //         context.commit('_setOrganTmpFlow', organ_flow)
    //     }
    //
    // },
    // 筛选分支机构

    // 查找输入名称的组织
    searchOrgan(context, params) {
        let organs = context.state.organ.organs.slice();

        console.log(context.state.organ.organs)

        context.commit('_clearOrgan')

        context.dispatch('expandOrgan', {organ: organs, filter: params}).then(() => {
            let new_organs = context.state.tmp_organs;
            console.log('_searchOrgan', new_organs)
            setTimeout(function () {

                context.commit('_searchOrgan', new_organs)
            }, 0)

        })
    },
    clearOrgan(context) {
        context.commit('_clearOrgan');
    },
    // 展开选中节点
    expandOrgan(context, params) {
        let new_organ = params.organ
        let filter = params.filter
        new_organ.map(v => {
            if (filter && v.branchName && v.branchName.indexOf(filter) >= 0) {
                v.active = true;
            }
            else {
                v.active = false;
            }

            v.expand = true;

            if (v.children && v.children.length > 0) {
                context.dispatch('expandOrgan', {organ: v.children, filter: filter})
                // console.log('return be')
                return false
                // console.log('return after')

            }
        });

        console.log('loop: ', new_organ)
        context.commit('_expandOrgan', new_organ)
    },

    toggleNode(context, params) {
        console.log('in: ', params)
        let organs = context.state.organ.organs.concat();

        context.dispatch('mapNode', {organ: organs, filter: params.entityId}).then(() => {
            let new_organs = context.state.tmp_organs;
            console.log('new_organs', new_organs)
            context.commit('_searchOrgan', new_organs)
        })
    },
    mapNode(context, params) {
        let new_organ = params.organ
        let filter = params.filter
        new_organ.map(v => {
            console.log('judeg', v.entityId, filter)
            if (filter && v.entityId == filter) {
                v.expand = !v.expand;
                console.log('v.expand', v.expand)
            }

            if (v.children && v.children.length > 0) {
                context.dispatch('mapNode', {organ: v.children, filter: filter})
            }
        });

        context.commit('_expandOrgan', new_organ)
    }

}

export default actions;
