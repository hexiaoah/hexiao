import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api.js'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";
import router from "@/router";
import Cookie from '@2dfire/utils/cookie'
import Tools from '@/base/tools'
import { userHireType } from '@/const/emu-joinModeIcon'

Vue.use(iView)
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

const Message = iView.Message
const Modal = iView.Modal
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
const chainRoleManage = {
    namespaced: true,
    state: {
        allChainStaffList:[],
        staffList:[],
        chainStaffList:[],
        listShopRoles:[],
        querySyntheList:{
            branchsVo:{
                all:true,
                userSynthesizeVos: []
            },
            platesVo:{
                all:true,
                userSynthesizeVos: []
            },
            shopsVo:{
                all:true,
                userSynthesizeVos: []
            }
        },
        querySumpleList:{},
        filter:{
            searchValue:'',
            roleId:'-1'
        },
        chainRoleList:[],
        cacheRoleList:[]
    },
    mutations: {
        _getStaffList(state,data){
            state.chainStaffList = Object.assign({},data)
        },
        _staffList(state,data){
            state.staffList = [].concat(data)
        },
        _allStaffList(state,data){
            state.allChainStaffList = [].concat(data)
        },
        _getListShopRoles(state,data){
            state.listShopRoles = [].concat(data)
        },
        _searchValueChange(state,data){
            state.filter.searchValue = data
        },
        _changeRoleID(state,data){
            state.filter.roleId = data
        },
        _querySyntheList(state,data){
            state.querySyntheList = Object.assign( {}, data)
        },
        _querySumpleList(state,data){
            state.querySumpleList = Object.assign( {}, data)
        },
        _getAllActionGroupList(state,data){
            state.chainRoleList = [].concat(data)
        },
        _clearGroupList(state,data){
            state.chainRoleList = [].concat(data)
        },
        _cacheRoleList(state,data){
            state.cacheRoleList = [].concat(data)
        },
        _clearFilter(state){
            state.filter = {
                searchValue: '',
                roleId: '-1'
            }
        }
    },
    actions:{
        //获取总部员工列表
        getStaffList({commit, state},params){
            const { pageIndex, pageSize } = params
            const startNum = ( pageIndex - 1 ) * pageSize
            const filter = state.filter
            let newData = []
            let new_data = []
            const req = {
                entityId:shopInfo.entityId
            }
            Requester.get(API.GET_QUERY_USER_LINE_INFO,{params:{...req}}).then(res=>{
                if(Obj.isEmpty(!res.data)){
                    newData = []
                    res.data.map(item=>{
                        newData.push({
                            avatarUrl: item.avatarUrl||'',
                            branchCount: item.branchCount,
                            countryCode: item.countryCode,
                            entityId: item.entityId||'',
                            entryDate:  item.entryDate?Tools.formatDateByStamp(item.entryDate):'-',
                            frozenStatus: item.frozenStatus,
                            hireType: userHireType[item.hireType] || '-',
                            isAllBranch: item.isAllBranch,
                            isAllPlate: item.isAllPlate,
                            isAllShop: item.isAllShop,
                            isValid: item.isValid,
                            lastVer: item.lastVer,
                            mobile: item.mobile||'',
                            name: item.name||'',
                            roleId: item.roleId||'',
                            roleName: item.roleName||'',
                            shopCount: item.shopCount,
                            userId: item.userId||'',
                            userName: item.userName||'',
                            plateCount: item.plateCount
                        })
                    })
                    new_data = newData.filter(item=>{
                        return  (((Obj.isString(item.name)?item.name.includes(filter.searchValue):false) || (Obj.isString(item.mobile)?item.mobile.includes(filter.searchValue):false)) && (filter.roleId === '-1'? true : item.roleId === filter.roleId))
                    })
                    let obj = {
                        total: new_data.length,
                        list: [].concat(new_data).splice( startNum,pageSize )
                    }
                    commit('_getStaffList',obj)
                    commit('_staffList',new_data)
                    commit('_allStaffList',newData)
            }
            }).catch(e=>{
                catchError(e)
            })
        },
        //连锁员工冻结
        updateFrozenStatus({dispatch},params){

            const req = {
                id: params.id,
                entityId: shopInfo.entityId,
                frozenStatus:params.frozenStatus,
                appKey: '200800'
            }

            Requester.get(API.UPDATE_FROZEN_STATUS,{params:{...req}}).then(res=>{
                if(res.data){
                    Message.info(params.frozenStatus?'冻结成功':'恢复成功')
                    dispatch('getStaffList',params.pageState)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //连锁员工删除
        deteleThoroughUser({dispatch},params){
            const req = {
                userId: params.id,
                entityId: shopInfo.entityId
            }
            Requester.get(API.DETELE_THOROUGH_USER,{params:{...req}}).then(res=>{
                if(res.data){
                    Message.info('删除成功')
                    dispatch('getStaffList',params.pageState)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //获取店铺职权
        getListShopRoles({commit},params = false){
            const req = {
                entityId: shopInfo.entityId,
                containUser: params,
            }
            Requester.get(API.GET_LIST_SHOP_ROLES_NEW,{params:{...req}}).then(res=>{
                commit('_getListShopRoles',res.data)
            }).catch(e=>{
                catchError(e)
            })
        },
        //新增员工信息
        insertChainUserInfo({commit},params){
            const req = {
                entityId: shopInfo.entityId,
                ...params
            }
            // Requester.post(API.INSERT_CHAIN_USER,{...req},{emulateJSON: true}).then(res=>{
            Requester.post(API.INSERT_CHAIN_USER,{completeDTO: JSON.stringify(req) },{emulateJSON: true}).then(res=>{
               router.push('/chain_staff_list')
            }).catch(e=>{
                catchError(e)
            })
        },
        //修改员工信息
        updateChainUserInfo({commit},params){
            const req = {
                entityId: shopInfo.entityId,
                ...params
            }
            // Requester.post(API.INSERT_CHAIN_USER,{...req},{emulateJSON: true}).then(res=>{
            Requester.post(API.UPDATE_CHAIN_USER,{completeDTO: JSON.stringify(req) },{emulateJSON: true}).then(res=>{
               router.push('/chain_staff_list')
            }).catch(e=>{
                catchError(e)
            })
        },
        //获取员工高级设置 
        getQuerySynthesize({commit},params = ''){
            const req = {
                entityId: shopInfo.entityId,
                userId: params
            }
            Requester.get(API.GET_QUERY_SYNTHE_SIZE,{params:{...req}}).then(res=>{
                let data = {}
                if(!Obj.isEmpty(res.data)){
                    data = {
                        branchsVo:{
                            all:res.data.branchsVo.all,
                            userSynthesizeVos: Obj.isEmpty(res.data.branchsVo.userSynthesizeVos)?[]:res.data.branchsVo.userSynthesizeVos,
                        },
                        platesVo:{
                            all:res.data.platesVo.all,
                            userSynthesizeVos: Obj.isEmpty(res.data.platesVo.userSynthesizeVos)?[]:res.data.platesVo.userSynthesizeVos
                        },
                        shopsVo:{
                            all:res.data.shopsVo.all,
                            userSynthesizeVos: Obj.isEmpty(res.data.shopsVo.userSynthesizeVos)?[]:res.data.shopsVo.userSynthesizeVos
                        }
                    }
                }
                commit('_querySyntheList',data)
            }).catch(e=>{
                // catchError(e)
                Modal.error({
                    title: "请注意",
                    content: e.result && e.result.message,
                    okText: "刷新",
                    onOk() {
                        window.location.reload();
                    }
                });
            })
        },
        //获取员工基本信息 
        getQueryBaseInfo({commit},params = ''){
            const req = {
                entityId: shopInfo.entityId,
                userId: params
                // userId: entrance.userInfo.userId
            }
            Requester.get(API.GET_QUERY_SUMPLE_INFO,{params:{...req}}).then(res=>{
                if(res.data){
                    const data = {
                        avatarUrl: Obj.isEmpty(res.data.avatarUrl)? '' : res.data.avatarUrl,
                        entityId: Obj.isEmpty(res.data.entityId)? '' : res.data.entityId,
                        entryDate: res.data.entryDate?Tools.formatDateByStamp(res.data.entryDate):'',
                        frozenStatus: Obj.isEmpty(res.data.frozenStatus)? '' : res.data.frozenStatus,
                        hireType: Obj.isEmpty(res.data.hireType)? '' : res.data.hireType,
                        isValid: Obj.isEmpty(res.data.isValid)? '' : res.data.isValid,
                        lastVer: Obj.isEmpty(res.data.lastVer)? '' : res.data.lastVer,
                        name: Obj.isEmpty(res.data.name)? '' : res.data.name,
                        roleId: Obj.isEmpty(res.data.roleId)? '' : res.data.roleId,
                        roleName: Obj.isEmpty(res.data.roleName)? '' : res.data.roleName,
                        userId: Obj.isEmpty(res.data.userId)? '' : res.data.userId,
                        userName: Obj.isEmpty(res.data.userName)? '' : res.data.userName,
                        mobile: Obj.isEmpty(res.data.mobile)? '' : res.data.mobile,
                        idCard: Obj.isEmpty(res.data.idCard)? '' : res.data.idCard,
                        sex: Obj.isEmpty(res.data.sex)? '' : `${res.data.sex}`,
                        staffImageDTO:{
                            avatarUrl:Obj.isEmpty(res.data.avatarUrl)? '' : res.data.avatarUrl,
                            backImgUrl:Obj.isEmpty(res.data.backImgUrl)? '' : res.data.backImgUrl,
                            frontImgUrl:Obj.isEmpty(res.data.frontImgUrl)? '' : res.data.frontImgUrl,
                        },
                    }
                    commit('_querySumpleList',data)
                }
            }).catch(e=>{
                // catchError(e)
                Modal.error({
                    title: "请注意",
                    content: e.result && e.result.message,
                    okText: "刷新",
                    onOk() {
                        window.location.reload();
                    }
                });
            })
        },
        //更改筛选字段
        searchValueChange({commit},params){
            commit('_searchValueChange',params)
        },
        //更改roleId
        changeRoleID({commit,dispatch},params){
            commit('_changeRoleID',params.value)
            dispatch('searchStaff',params.pageState)
        },
        // 模糊搜索
        searchStaff({commit,state},params){
            const staffList = state.allChainStaffList
            const filter = state.filter
            const { pageIndex , pageSize } = params
            const startNum = (pageIndex - 1 ) * pageSize
            let new_Date = []
            
            new_Date = staffList.filter(item=>{
                return (((Obj.isString(item.name)?item.name.includes(filter.searchValue):false) || (Obj.isString(item.mobile)?item.mobile.includes(filter.searchValue):false)) && (filter.roleId === '-1'? true : item.roleId === filter.roleId))
            })
            let obj = {
                total: new_Date.length,
                list: [].concat(new_Date).splice(startNum,pageSize)
            }
            commit('_staffList',new_Date)
            commit('_getStaffList',obj)
        },
        //分页
        changePage({commit,state},params){
            const staffList = state.staffList
            const { pageIndex , pageSize } = params
            const startNum = (pageIndex - 1 ) * pageSize
            let obj = {
                total: staffList.length,
                list: [].concat(staffList).splice(startNum,pageSize)
            }
            commit('_getStaffList',obj)
        },
        //职级查询
        getRoleDetalList({commit},params = ''){
            const req = {
                code: shopInfo.entityType,
                industry:shopInfo.industry,
            }
            Spin.show(config)
            Requester.get(API.GET_ROLE_DETAL_LIST,{params:{...req}}).then(res=>{
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
                commit('_cacheRoleList',dataList)
                commit('_getAllActionGroupList',dataList.filter(i=>{
                            return Obj.isString(i.name)?i.name.includes(params):false
                        }
                    ))
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
            Requester.get(API.DELETE_ROLE,{ params: { roleId: params.id, reqParamStr: JSON.stringify( req )}}).then( res =>{
                Message.info('删除成功')
                dispatch('getRoleDetalList',params.value)
            }).catch(e=>{
                catchError(e)
            })
        },
        //职级搜索
        filterRoleList({commit,state},params){
            const roleList = state.cacheRoleList
            let newData = []
            newData = roleList.filter(i=>{
                return Obj.isString(i.name)?i.name.includes(params):false
            })
            commit('_getAllActionGroupList',newData)
        },
        //清空列表
        clearGroupList({commit}){
            commit('_clearGroupList',[])
        },
        clearFilter({commit}){
            commit('_clearFilter')
        }
    },
    getters: {
        getChainStaffList(state){
            return state.chainStaffList
        },
        listShopRoles(state){
            return state.listShopRoles
        },
        getQuerySyntheList(state){
            return state.querySyntheList
        },
        querySumpleList(state){
            return state.querySumpleList
        },
        getAllActionGroupList(state){
            return state.chainRoleList
        }
    }
}
export default chainRoleManage