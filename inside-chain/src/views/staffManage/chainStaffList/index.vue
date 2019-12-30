<template>
    <div class="chainStaffList">
        <div class="listTitleWarp">
            <Select v-model="selectRole" @on-change="roleChange" class="mr-20px" style="width:200px" >
                <Option v-for="item in shopRoles" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
            <Input @on-click="clickSearch" @on-enter="clickSearch" @input="valueChange" v-model.trim="searchValue" icon="ios-search" class="mr-20px" style="width:200px" placeholder="员工姓名/手机号"></Input>
            <Button @click="changeView" type="primary" class="right">添加员工</Button>
        </div>
        <div class="userNumber">
            <span>全部（{{chainStaffList.total || 0 }}）</span>
        </div>
        <div class="tableContent">
            <TableList :titleList="chainStaffTitle(this)" :tableList="chainStaffList.list" @selection="selection" ></TableList>
        </div>
        <div class="right mr-20px">
            <Page :total="chainStaffList.total" :current="pageState.pageIndex" :page-size="pageState.pageSize" show-total @on-change="handleChangePage"></Page>
        </div>
    </div>
</template>
<script>
//此页面前端分页
const pageState = {
    pageIndex: 1,
    pageSize: 20
}

import TableList from '@/components/table/staff-table-list/index'
import { chainStaffTitle } from '@/const/emu-table-title'
import chainRoleManage from '@/store/modules/components/chainRoleManage'
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            searchValue:'',
            selectRole:'-1',
            chainStaffTitle,
            pageState
        }
    },
    components: {
        TableList
    },
    computed: {
      ...mapGetters({
          chainStaffList:'chainRole/getChainStaffList',
          listShopRoles:'chainRole/listShopRoles',
      }),
      shopRoles(){
          return [{name:'全部职级',id:'-1'}].concat(this.listShopRoles)
      }  
    },
    methods: {
        ...mapActions({
            getStaffList:'chainRole/getStaffList',
            updateFrozenStatus:'chainRole/updateFrozenStatus',
            deteleThoroughUser:'chainRole/deteleThoroughUser',
            searchValueChange:'chainRole/searchValueChange',
            searchStaff:'chainRole/searchStaff',
            getListShopRoles:'chainRole/getListShopRoles',
            changeRoleID:'chainRole/changeRoleID',
            changePage:'chainRole/changePage',
            clearFilter:'chainRole/clearFilter'
        }),
        selection(e){
            console.log(e)
        },
        changeView(){
            this.$router.push('/staff_edit')
        },
        handleChangePage(value){
            this.pageState.pageIndex = value
            this.changePage(this.pageState)
        },
        clickSearch(){
            this.resetPage()
            this.searchStaff(this.pageState)
        },
        roleChange(value){
            this.resetPage()
            this.changeRoleID({value,pageState:this.pageState})
        },
        valueChange(value){
            this.searchValueChange(value.trim())
        },
        resetPage(){
            this.pageState = {
                ...pageState
            }
        },
        handleFrozen(data){
            const message = data.frozenStatus?`确定需要恢复 ${data.name} 吗`:`确认要冻结 ${data.name} 吗？`
            const title = data.frozenStatus? `恢复员工` : `冻结员工`
            const type = 'Frozen'
            this.showModal(
                message,
                title,
                type,
                (pageState)=>(this.updateFrozenStatus({id:data.userId,frozenStatus:data.frozenStatus?0:1,pageState:{...pageState}}))
            )
        },
        deleteUser(data){
            const message = '删除员工后, 将无法恢复，请慎重操作！'
            const title = `删除员工`
            const type = 'delete'
            this.showModal(
                message,
                title,
                type,
                (pagestate)=>(this.deteleThoroughUser({id:data.userId,pageState:{...pageState}}))
            )
        },
        handleEdit(data){
            this.$router.push({path:'/staff_edit',query:{id:data.userId,name:data.name}})
        },
        showModal(message,title,type,onOk = null,onCancel = null ){
            const config = {
                title: title,
                render: (h) => {
                    return h('div',{style:{height:'40px',padding:'18px 0 0 48px'}},[
                        h('p',{style:{fontSize:'14px'}}, message ),
                        h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ])
                    ])
                },
                onOk: () => {
                    if(this.chainStaffList.total % this.pageState.pageSize === 1 && type === 'delete' ){
                        this.pageState.pageIndex = this.pageState.pageIndex - 1
                    }
                    onOk && onOk(this.pageState)
                    // this.resetPage()
                },
                onCancel: () => {
                    onCancel && onCancel()
                }
            }
            this.$Modal.confirm(config)
        }
    },
    created () {
        this.clearFilter()
        this.resetPage()
        this.getListShopRoles(true) //true 过滤没有关联用户的职级 , false直接查询全部职级 不传默认是false
        this.getStaffList(this.pageState)
    },
    beforeCreate () {
        let { chainRole={} } = this.$store.state

        if(Object.keys(chainRole).length <= 0) {
            this.$store.registerModule('chainRole', chainRoleManage)
        }
    }
}
</script>
<style lang="scss" scoped>
.chainStaffList{
    overflow: hidden;
    padding-bottom: 20px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
    transition: box-shadow 0.3s;
    &:hover{
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }
    .listTitleWarp{
        padding: 20px;
    }
    .userNumber{
        padding: 0 20px 20px;
        color: #5599FF;
    }
    .tableContent{
        padding: 0 20px 20px;
        /deep/ .edit-button{
            cursor: pointer;
            padding: 0 10px;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
            border-right: 1px solid #A9A9A9;
            &:first-child{
                padding-left: 0;
            }
            &:last-child{
                border-right: none;
            }
        }
        /deep/.ItemStaffName{
            float: left;
            display: flex;
            height: 80px;
            padding: 10px;
            flex-direction:column;
            justify-content: space-between;
            overflow: hidden;
            .itemUserName{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
            }
        }
        /deep/ .tilt{
            position: absolute;
            top: 0;left: 0;
            width: 80px;height: 80px;
            line-height: 80px;
            text-align: center;
            color: #ffffff;
            background: #000;
        }
    }
}
.ml-20px{
    margin-left: 20px;
}
.mr-20px{
    margin-right: 20px;
}
.right{
    float: right;
}
</style>


