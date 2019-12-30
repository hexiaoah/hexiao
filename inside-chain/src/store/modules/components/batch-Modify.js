import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api_batch.js'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";
import Cookie from '@2dfire/utils/cookie'

let shopInfo = {
    entityId:'',
    entityType:'',
    industry:''
}
let count = 0
if(Cookie.getItem('entrance') != undefined){
    shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
}

const mergeArg = (params)=>({
        industry: shopInfo.industry,
        req: JSON.stringify({...params})
    })

const batchModify = {
    namespaced: true,
    state:{
        batchState:[]
    },
    getters: {

    },
    actions: {
        //批量修改/删除
        batchModify( {commit}, { params, VM } = {} ){

            let obj = mergeArg(params)
            API.batchUpdate( obj ).then(res =>{
                if( res.data ){
                    let mesInfo = !!params.isDel? '删除成功': (!!params.plateEntityId ? '修改成功！如需同步到门店请移步至菜单管理模块进行商品下发':'修改成功')
                    VM.$Message.info({content:mesInfo,duration:3})
                    VM.$emit('reload',params.isDel)
                }
            }).catch(e=>{
                catchError(e)
            })
        },
        //批量移除
        batchChainShopModify( state, { params,VM } = {} ){
            params.brandEntityId = shopInfo.entityId
            params.entityType = shopInfo.entityType
            let obj = mergeArg(params)
            API.batchChainShopUpdate(obj).then(res=>{
                if(res.data){
                    count = 0
                    //返回一个id，根据id查找批量移除的结果
                    state.dispatch('getBatchRemoveChainShopItemResult',
                        {
                            params:mergeArg({ opRecordId:res.data }),
                            VM
                        }
                    )
                }
            }).catch(e=>{
                VM.$Spin.hide()
                catchError(e)
            })

        },
        //批量移除结果获取
        getBatchRemoveChainShopItemResult(state,{params, VM} = {}){

            API.getBatchRemoveChainShopItemResult( params ).then( res => {
                if(res.data){
                    VM.$Spin.hide()
                    let filedShopsCount = res.data.split('，')[2].replace(/[^\d]/g,'')
                    if( filedShopsCount !== "0" ){
                        VM.$Message.info({content:'部分门店移除失败，请重新操作',duration:3})
                    }else{
                        VM.$Message.info({content:'移除成功',duration:3})
                    }
                }else{
                    if(count>20){
                        VM.$Message.info({content:'网络连接超时,请稍后再试',duration:3})
                        VM.$Spin.hide()
                        // setTimeout(() => {
                        //     window.location.reload()
                        // }, 1000);
                        return
                    }
                    setTimeout(() => {
                        count++
                        state.dispatch('getBatchRemoveChainShopItemResult',{params, VM})
                    }, 500);
                }

            }).catch( e=>{
                VM.$Spin.hide()
                catchError(e)
            })
        }
    },
    mutations: {
        
    }

}


export default batchModify