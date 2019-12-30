import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api.js'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";
import router from "@/router";
import Cookie from '@2dfire/utils/cookie'


Vue.use(iView)
let Message = iView.Message;
const Spin = iView.Spin
const config = {
    render: (h) => {
        return h('div', [
            h('Icon', {
                'style': 'animation: ani-demo-spin 1s linear infinite',
                props: {
                    type: 'load-c',
                    size: 18
                }
            }),
            h('div', 'Loading')
        ])
    }
}

let shopInfo = {
    entityId:'',
    entityType:'',
    industry:''
}
let entrance = []
if(Cookie.getItem('entrance') != undefined){
    shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
    entrance = JSON.parse(decodeURIComponent(Cookie.getItem('entrance')))
}


const staffManage = {
    namespaced: true,
    state:{
        dataLise: [],
        unifyShopList:[],
        shopCount: 0,
        selfShopList:[],
        roleList:[],
        activeId:''
    },
    mutations: {
        _setUnifyShopList(state,data){
            state.unifyShopList = [].concat(data)
        },
        _setSelfShopList(state,data){
            state.selfShopList = [].concat(data)
        },
        _getRankList(state,data){
            state.roleList = [].concat(data)
        },
        _getUnifyShopsCount(state,data){
            state.shopCount = data
        },
        _setDatelist(state,data){
            state.dataLise = [].concat(data)
        },
        _setActiveId(state,data){
            state.activeId = data
        },
        _clearRoleList(state,data){
            state.roleList = []
        },
        _clearDataLise(state,data){
            state.dataLise = []
        }
    },
    actions:{
        //获取连锁总部管理的门店职级详情
        getChainBranchRoleDetailList({commit},params){
            const req = {
                code:'3',
                industry:shopInfo.industry,
            }
            Spin.show(config)
            Requester.get(API.GET_CHAIN_BRANCH_ROLE_DETAIL_LIST,{params:{...req}}).then(res=>{
                let dataList = []
                if(!Obj.isEmpty(res.data)){
                    res.data.map(i=>{
                        dataList.push({
                            name:i.name,
                            id:i.id,
                            actionGroupVOList:i.actionGroupVOList.map(j=>{
                                j.rote = (j.totalCount === 0 ? 0 : Math.round(j.actionCount / j.totalCount * 100)) + '%'
                                return j
                            })
                        })
                    })
                }
                Spin.hide()
                commit('_getRankList',dataList)
            }).catch(e=>{
                Spin.hide()
                catchError(e)
            })
        },
        filterList({commit},params){
            const req = {
                code:'3',
                industry:shopInfo.industry,
            }
            Spin.show(config)
            Requester.get(API.GET_CHAIN_BRANCH_ROLE_DETAIL_LIST,{params:{...req}}).then(res=>{
                let dataList = []
                if(!Obj.isEmpty(res.data)){
                    res.data.map(i=>{
                        if(i.name.includes(params)){
                            dataList.push({
                                name:i.name,
                                id:i.id,
                                actionGroupVOList:i.actionGroupVOList.map(j=>{
                                    j.rote = (j.totalCount === 0 ? 0 : Math.round(j.actionCount / j.totalCount * 100)) + '%'
                                    return j
                                })
                            })
                        }
                    })
                }
                Spin.hide()
                commit('_getRankList',dataList)
            }).catch(e=>{
                Spin.hide()
                catchError(e)
            })
        },
        //获取自主和统一管理门店数量
        getUnifyShopcount({commit}){
            Requester.get(API.COUNT_SHOPS).then(res=>{
                if(res.data){
                    commit('_getUnifyShopsCount',res.data.apply)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //获取自主和统一管理门店详情
        getApplyAndUnapplyShops({commit}){
            Requester.get(API.GET_APPLY_AND_UNAPPLU_SHOPS).then(res=>{
                if(res.data){
                    const unapply = res.data.unapply.map(v=>({
                        name: v.name,
                        entityId: v.entityId,
                        active: false
                    }))
                    const apply = res.data.apply.map(v=>({
                        name: v.name,
                        entityId: v.entityId,
                        active: false
                    }))
                    commit('_setUnifyShopList',apply)
                    commit('_setSelfShopList',unapply)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //获取连锁总部统一管理的职级权限详情
        listRestUnifiedAllActionGroup({commit},params){
            const req = {
                industry:shopInfo.industry,
                grantedRoleId:params
            }
            Spin.show(config)
            Requester.get(API.LIST_REST_UNIFIED_ALL_ACTION_GROUP,{params:{...req}}).then(res=>{
                    let new_data = []
                    let arr = []
                    const loopSelect = (item)=>{
                        item.actionVOList.map(i=>{
                            if(i.actionVOList && i.actionVOList.length > 0){
                                loopSelect(i)
                            }else{
                                if(!i.selected && i.hasEditPower){
                                    arr.push(i)
                                }
                            }
                        })
                    }
                    new_data = res.data.modules.map(item =>{
                        return {
                            code: item.code,
                            name: item.name,
                            actionCount: item.actionCount,
                            actionVOList: item.actionGroupVOS,
                            totalCount: item.totalCount,
                            rote: item.totalCount === 0 ? '' : Math.round(item.actionCount / item.totalCount * 100) + '%'
                        }
                    })
                    Spin.hide()
                    new_data.map(i=>{
                            arr = []
                            i.actionVOList && loopSelect(i)
                            if(!arr.length){
                                i.selected = true
                            }else{
                                i.selected = false
                            }
                        })
                    let activeId = new_data[0].code
                    commit('_setActiveId',activeId)
                    commit('_setDatelist',new_data)
            }).catch(e=>{
                Spin.hide()
                catchError(e)
            })
        },
        //获取连锁总部统一管理的职级权限详情
        getAllActionGroupList({commit},params){
            const req = {
                grantedRoleEntityId: shopInfo.entityId,
                actionGroupCode: shopInfo.entityType,
                industry:shopInfo.industry,
                grantedRoleId: params
            }
            Spin.show(config)
            Requester.get(API.GET_ALL_ACTION_GROUP_LIST,{params:{...req}}).then(res=>{
                    console.log(res.data)
                    let new_data = []
                    let arr = []
                    const loopSelect = (item)=>{
                        item.actionVOList.map(i=>{
                            if(i.actionVOList && i.actionVOList.length > 0){
                                loopSelect(i)
                            }else{
                                if(!i.selected && i.hasEditPower){
                                    arr.push(i)
                                }
                            }
                        })
                    }
                    new_data = res.data.modules.map(item =>{
                        return {
                            code: item.code,
                            name: item.name,
                            actionCount: item.actionCount,
                            actionVOList: item.actionGroupVOS,
                            totalCount: item.totalCount,
                            rote: item.totalCount === 0 ? '' : Math.round(item.actionCount / item.totalCount * 100) + '%'
                        }
                    })
                    Spin.hide()
                    new_data.map(i=>{
                            arr = []
                            i.actionVOList && loopSelect(i)
                            if(!arr.length){
                                i.selected = true
                            }else{
                                i.selected = false
                            }
                        })
                    let activeId = new_data[0].code
                    commit('_setActiveId',activeId)
                    commit('_setDatelist',new_data)
            }).catch(e=>{
                Spin.hide()
                catchError(e)
            })
        },
        //删除职级
        deleteRole({commit,dispatch},params){

            let req = {
                entityId:shopInfo.entityId,
                loginEntityId:shopInfo.entityId,
                userId:entrance.userInfo.userId,
            }
            Requester.get(API.DELETE_ROLE,{ params: { roleId: params, reqParamStr: JSON.stringify( req )}}).then( res =>{
                    Message.info('删除成功')
                    dispatch('getChainBranchRoleDetailList')
            }).catch(e=>{
                catchError(e)
            })
        },
        //更新职级
        updateRole({dispatch,commit},params){
            let roleReq = {
                name: params.roleStr,
                id: params.roleId,
                unified:params.unified
            }
            let req = {
                entityId:shopInfo.entityId,
                loginEntityId:shopInfo.entityId,
                userId:entrance.userInfo.userId,
            }
            Requester.get(API.UPDATE_ROLE,{params:{roleStr:JSON.stringify(roleReq), reqParamStr:JSON.stringify(req)}}).then(res=>{
                params.Message = '修改成功'
                dispatch('grantRoleAction',params)
            }).catch(e=>{
                catchError(e)
            })
        },
        //创建职级
        createRole({commit,dispatch},params){
            const { roleStr } = params
            //name":"测试职级","unified":0
            let req = {
                entityId:shopInfo.entityId,
                loginEntityId:shopInfo.entityId,
                userId:entrance.userInfo.userId,
            }
            Requester.get(API.CREATE_ROLE,{params:{roleStr:JSON.stringify({name:roleStr,unified:params.unified}), reqParamStr:JSON.stringify(req)}}).then(res=>{
                if( !Obj.isEmpty(res.data)){
                    params.roleId = res.data.id
                    params.Message = '创建成功'
                    dispatch('grantRoleAction',params)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //对职权赋值
        grantRoleAction({commit},params){
            let req = {
                grantUserEntityId:shopInfo.entityId,
                grantedRoleEntityId:shopInfo.entityId,
                grantUserId:entrance.userInfo.userId,
                grantedRoleId:params.roleId,
                actionModuleStr: JSON.stringify(params.selectedRole)
            }
            Spin.show(config)
            Requester.post(API.GRANT_ROLE_ACTION,{...req},{emulateJSON: true}).then(res=>{
                if(res.data){
                    Spin.hide()
                    Message.info(params.Message)
                    setTimeout(() => {
                        router.push(params.router)
                    }, 500);
                }
            }).catch(e=>{
                Spin.hide()
                catchError(e)
            })
        },
        saveRole({dispatch},params){
            console.log(params)
            if(params.roleId){
                dispatch('updateRole',params)
            }else{
                dispatch('createRole',params)
            }
        },
        
        //添加统一管理门店
        addUnifyApplyShops({commit, dispatch},params){
            Requester.post(API.ADD_UNIFY_APPLY_SHOPS,{shopEntityIds:JSON.stringify(params)},{emulateJSON: true}).then(res=>{
                if(res.data){
                    Message.info('修改成功')
                    dispatch('getApplyAndUnapplyShops')
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //删除统一管理门店
        delUnifyApplyShops({commit, dispatch},params){
            Requester.post(API.DEL_UNIFY_APPLY_SHOPS,{shopEntityIds:JSON.stringify(params)},{emulateJSON: true}).then(res=>{
                if(res.data){
                    Message.info('修改成功')
                    dispatch('getApplyAndUnapplyShops')
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        selectShop({ commit, state },params){
            const { item, type} = params
            let commitType = ''
            let tmp_list = []
            if(type === 'unify'){
                tmp_list = state.unifyShopList.concat();
                commitType = '_setUnifyShopList'
            }else if( type === 'self'){
                tmp_list = state.selfShopList.concat();
                commitType = '_setSelfShopList'
            }else{
                return 
            }

            tmp_list.map(i => {
                if (i.entityId === item.entityId) {
                    i.active = !i.active
                }
            })
            
            commit(commitType, tmp_list)
        },
        selectedAll({state,commit},params){
            let dataLise = state.dataLise
            
            const loopSelect = (item,type)=>{
                item.actionVOList.map(i=>{
                    if(i.actionVOList && i.actionVOList.length > 0){
                        i.selected = type
                        loopSelect(i,type)
                    }else{
                        if(i.hasEditPower){
                            i.selected = type
                        }
                    }
                })
            }
            
            dataLise.map(i=>{
                if(i.code === params.item.code && i.name === params.item.name){
                    i.selected = params.checked;
                    if(i.actionVOList){
                        loopSelect(i,params.checked)
                    }
                }
            })
            commit('_setDatelist',dataLise)
        },
        checkedAllSelected({state,commit},params){
            let arr = []
            const loopSelect = (item)=>{
                item.actionVOList.map(i=>{
                    if(i.actionVOList && i.actionVOList.length > 0){
                        loopSelect(i)
                    }else{
                        if(!i.selected && i.hasEditPower){
                            arr.push(i)
                        }
                    }
                })
            }
            let dataLise = state.dataLise
            dataLise.map(i=>{
                if(i.code === params.item.code && i.name === params.item.name){
                    loopSelect(i)
                    if(!arr.length){
                        i.selected = true
                    }else{
                        i.selected = false
                    }
                }
            })
            commit('_setDatelist',dataLise)  
        },
        clearRoleList({commit}){
            commit('_clearRoleList')
        },
        clearDataLise({commit}){
            commit('_clearDataLise')
        },
        changeActive({commit},params){
            commit('_setActiveId',params)
        }
    },
    getters: {
        getDataList(state){
            return state.dataLise
        },
        getUnifyShopList(state){
            return state.unifyShopList
        },
        getSelfShopList(state){
            return state.selfShopList
        },
        getRankTableList(state){
            return state.roleList
        },
        getShopCount(state){
            return state.shopCount
        },
        getTableList(state){
            return state.tableList
        },
        getActiveId(state){
            return state.activeId
        }
    }
}

export default staffManage