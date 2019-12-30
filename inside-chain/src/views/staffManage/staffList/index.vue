<template>
    <div class="staffList">
        <div class="listTitleWarp">
            <Select class="mr-20px" style="width:200px" >
                <Option value="全部职级">全部职级</Option>
            </Select>
            <Input icon="ios-search" class="mr-20px" style="width:200px" placeholder="员工姓名/手机号"></Input>
            <Input icon="ios-search" class="mr-20px" style="width:200px" placeholder="门店名称"></Input>
            <Button class="right">添加员工</Button>
        </div>
        <div class="tableContent">
            <TableList :titleList="roleTitle(this)" :tableList="staffList" @selection="selection" :border="true"></TableList>
        </div>
    </div>
</template>
<script>
const roleTitle =(t)=>([
    {
        title:'员工',
        width:'20%',
        selection:true,
        render:(h,data)=>{
            return h('div',{style:{overflow:'hidden',display: 'flex'}},[
                h('div',{style:{float:'left','margin-right':'10px',position:'relative'}},[
                    h('img',{attrs:{src:data.imgPath},style:{width:'60px',height:'60px',display:'block'}}),
                    h('div',{class:'tilt',style:{opacity: data.status?'0':'0.7' }})
                ]),
                h('div',{class:'ItemStaffName'},[
                    h('div',data.staffName),
                    h('div',data.phone)
                ])
            ])
        }
    },
    {
        title:'工作门店',
        key:'shopName'
    },
    {
        title:'职级',
        key:'role'
    },
    {
        title:'聘用类型',
        key:'type'
    },
    {
        title:'入职时间',
        key:'startTime'
    },
    {
        title:'操作',
        render: (h,data)=>{
            return h('div',[
                h('a',{
                    on:{
                        click:()=>{
                            console.log(data)
                        }
                    },
                    class:'edit-button'
                },'编辑'),
                h('a',{
                    on:{
                        click:()=>{
                            console.log(data)
                        }
                    },
                    class:'edit-button'
                },'删除')
            ])
        },
        width:'15%'
    }
])

import TableList from '@/components/table/staff-table-list/index'
// import { roleTitle } from '@/const/emu-table-title'
export default {
    components: {
        TableList
    },
    data () {
        return {
            roleTitle,
            staffList:[]
        }
    },
    methods: {
        selection(e){
            console.log(e)
            console.log(this)
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .staffList{
        background: #ffffff;
        .listTitleWarp{
            padding: 20px;
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
    .tableContent{
        padding: 0 20px;
        /deep/ .edit-button{
            cursor: pointer;
            padding-right: 10px;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
            border-right: 1px solid #A9A9A9;
            &:last-child{
                border-right: none;
                padding-left: 8px;
            }
        }
        /deep/.ItemStaffName{
            float: left;
            display: flex;
            height: 60px;
            flex-direction:column;
            justify-content: space-between;
        }
        /deep/ .tilt{
            position: absolute;
            top: 0;left: 0;
            width: 60px;height: 60px;
            background: #ffffff;
        }
    }
</style>


