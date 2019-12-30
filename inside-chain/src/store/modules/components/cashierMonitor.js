import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api_batch.js'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";

Vue.use(iView);

let Message = iView.Message;

const cashierMonitor = {
    namespaced: true,
    state:{
        tableList:[],
        filterList:[],
        pageList:{
            total:'',
            list:[]
        }
        
    },
    actions: {
        //获取连锁下门店
        getAllShops({dispatch},params){
            API.getAllShops().then(res=>{
                if(!Obj.isEmpty(res.data.length)){
                    dispatch('getCashierInfo',{
                        ...params,
                        option:{
                            entityIdList:JSON.stringify(res.data.map( item => item.entityId ))
                        }
                    })
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //获取收银信息
        getCashierInfo({commit},params){
            const { pageNum, pageSize, option } = params

            API.getCashDeviceInfo(option).then(res=>{
                let data = []
                if(!Obj.isEmpty(res.data)){
                    res = res.data
                    res.map(item=>{
                        data.push({
                            name:item.shopName,
                            code:item.shopCode,
                            version:item.cashVersion,
                            status:item.online,
                            consistent: item.consistent,
                            statusVal:item.online?'1':'0',
                            versionVal: item.cashVersion === 0 ? '2': item.consistent?'1':'0'
                        })
                    })
                }
                let startNum = (pageNum - 1 ) * pageSize
                commit('_getCashierInfo',data)
                commit('_setFilterList',data)
                let obj = {
                    total: data.length,
                    list: [].concat(data).splice(startNum,pageSize)
                }
                commit('_setPageList',obj)
            }).catch(e=>{
                catchError(e)
            })
        },
        //分页
        changePage({commit, getters}, params){
            const { pageNum, pageSize } = params
            let arr = [].concat(getters.getFilterList)
            let startNum = (pageNum - 1 ) * pageSize
            let list = arr.splice(startNum,pageSize)
            commit('_changePage',list)
        },
        //查询
        filterCashierInfo({commit, getters},params){
            const {search, status, version, pageNum, pageSize} = params
            let startNum = (pageNum - 1 ) * pageSize
            let arr = [].concat(getters.getAllList)
            let filterArr = arr.filter(item=>{
                if( item.name.includes(search) && item.status.includes(status==='-1'?'':status) && item.consistent.includes(version==='-1'?'':version) ){
                    return item
                }
            })
            let obj = {
                total: filterArr.length,
                list: [].concat(filterArr).splice(startNum,pageSize)
            }
            commit('_setFilterList',filterArr)
            commit('_setPageList',obj)
        }
    },
    getters: {
        getPageList(state){
            return state.pageList
        },
        getAllList(state){
            return state.tableList
        },
        getFilterList(state){
            return state.filterList
        }
    },
    mutations: {
        _getCashierInfo(state,data){
            state.tableList = [].concat(data)
        },
        _setFilterList(state,data){
            state.filterList = [].concat(data)
        },
        _setPageList(state,data){
            state.pageList = Object.assign({},data)
        },
        _changePage(state,data){
            state.pageList.list = [].concat(data)
        }
    }
}

export default cashierMonitor
