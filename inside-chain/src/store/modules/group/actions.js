import catchError from '@/base/catchError'
import API from '@/config/api_batch.js'
import Obj from '@2dfire/utils/object'
import Vue from 'vue';
import iView from "iview";
import router from "@/router";
Vue.use(iView)
let Message = iView.Message;

const actions = {
    //获取分组信息
    getGroupList({commit},argumes){
        const {  page={} , params={} } = argumes
        const { pageNum=1, pageSize=20 } = page
        const option = {
            req:JSON.stringify({
               ...params
            })
        }
        API.getBaseGroup(option)
        .then((res)=> {
            let data= res.data
            let arr = data.map(item =>({
                classId: item.categoryId,
                categoryName:item.categoryName,
                flag: item.flag,
                groupName: item.name,
                id: item.id,
                ps: item.remark,
                shopNum: item.shopCount
            }))
            const startNum = (pageNum -1) * pageSize
            const tableList = {
                list:[].concat(arr).splice(startNum,pageSize),
                total:data.length
            }
            commit('_getGroupList',tableList)
        }).catch(e=>{
            catchError(e)
        })
    },

    //获取分组类别
    getClassList({commit},params={}){
        API.getCategory().then((res)=> {
            console.log(res)
            let data = []
            res.data.map(item=>{
                if(!Obj.isEmpty(item)){

                    let obj = {
                        groupName:item.name,
                        id:item.id
                    }
                    data.push(obj)
                }
            })
            console.log(data)
            if(params.reload){
                Message.info('刷新类别列表成功')
            }
            commit('_getClassList',data)
        }).catch(e=>{
            catchError(e)
        })
    },
    //修改分组
    insertOrUpdateGroup({commit,dispatch},params){
        console.log(params)
        let groupItem = {
            req:JSON.stringify({
                ...params
            })
        }
            console.log(groupItem)
        API.insertOrUpdateGroup(groupItem).then(res=>{
            Message.info('保存成功')
            setTimeout(() => {
                router.push({ path: '/group',  })
            }, 800);

        }).catch(e=>{
            catchError(e)
        })
    },
    addClass({dispatch},params){
        let obj = {
            req:JSON.stringify({
                categoryId:params.id,
                name:params.value
            })
        }
        API.insertOrUpdateCategory(obj).then(res=>{
            dispatch('getClassList')
        }).catch(e=>{
            catchError(e)
        })
    },
    delClassList({dispatch},params){
        let obj = {
            req:JSON.stringify({
                categoryId:params.id,
                isDel:params.isDel
            })
        }
        API.insertOrUpdateCategory(obj).then(res=>{
            console.log(res)
            Message.info('删除类别成功！')
            dispatch('getClassList')
        }).catch(e=>{
            catchError(e)
        })
    },
    delGroupList({dispatch},params){
        let delOption = {
            req:JSON.stringify({...params})
        }
        API.insertOrUpdateGroup(delOption).then(res=>{
            Message.info('删除分组成功！')
            dispatch('getGroupList',{page:{pageNum:1,pageSize:20}})
        }).catch(e=>{
            catchError(e)
        })
    },
    getGroupItem({commit},params){
        
        API.getGroupDetail(params).then(res=>{
            console.log(res)
            let obj = {
                itemId: res.data.id,
                itemClassId:res.data.categoryId,
                itemName:res.data.name,
                itemps:res.data.remark,
                shopList:[].concat(res.data.shops)
            }
            commit("_getGroupItem",obj)
        }).catch(e=>{
            catchError(e)
        })
    },
    clearGroupItem({commit}){
        let obj = {
            itemId:'',
            itemClassId:'',
            itemName:'',
            itemps:'',
            shopList:[]
        }
        commit("_getGroupItem",obj)

    }
}

export default actions