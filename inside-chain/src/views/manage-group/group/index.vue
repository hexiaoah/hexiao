<template>
    <div class="group">
       <div class="table-header">

            <Input v-model="searchVal"
                   class="searchinput"
                   icon="search"
                   @on-click="filterGoods"
                   @on-enter="filterGoods"
                   placeholder="搜索分组">
            </Input>
            <span class="selectName">分组类别</span>
            <Select v-model="kindId"
                    @on-change="changeKindId"
                    class="choose-category">
                <Option v-for="(item, $index) in classOption"
                        :value="item && item.id"
                        :key="$index">
                    {{item.groupName}}
                </Option>
            </Select>
            <router-link to='/add_group' class="btn-addshop">新建分组</router-link>
        </div>
        <div class="tableContent">
            <!-- <GroupManageList :list="tableList" :titleList='titleList' :type="type" v-on:delOne="delOne" v-on:editGroup="editGroup" ></GroupManageList> -->
            <div  v-if="!!tableList && !!tableList.length" class="tableMain">
                <Table :no-data-text='noData' :columns="titleList" :data="tableList"></Table>
                <Page :total="total"
                    show-total
                    :current="page.pageNum"
                    :page-size="page.pageSize"
                    @on-change="changePageNum"
                    style="marginTop:15px"
                    class="pull-right manage-page">
                </Page>
            </div>

            <div v-else class="noData">
                <Table :no-data-text='noData' :columns="titleList" ></Table>
                <div class="no-data">
                    <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
                    <span>{{noData}}</span>
                </div>
            </div>
        </div>
        <iframe id="category" src="http://localhost:3003/page/index.html#/category" frameborder="0"></iframe>
    </div>
</template>
<script>
import GroupManageList from '@/components/table/group-manage-list'
import { mapActions, mapGetters} from 'vuex'

import groupModule from "@/store/modules/group/index"
export default {
    data() {
        return {
            searchVal:'',
            kindId:'-1',
            noData:'暂无分组！',
            page:{
                pageNum:1,
                pageSize:20
            },
            titleList: [
                    {
                        title: '分组名称',
                        key: 'groupName',
                    },
                    {
                        title: '关联店铺数量',
                        key: 'shopNum'
                    },
                    {
                        title: '备注',
                        key: 'ps'
                    },
                    {
                        title:'所属分类',
                        key:'categoryName'
                    },
                    {
                        title: '操作',
                        render: (h,data)=>{
                            return h('div',[
                                h('a',{
                                    on:{
                                        click:()=>{
                                            this.editGroup(data.row)
                                        }
                                    },
                                    class:'edit-button'
                                },'编辑'),
                                h('a',{
                                    on:{
                                        click:()=>{
                                            this.delOne(data.row)
                                        }
                                    },
                                    class:'edit-button'
                                },'删除')
                            ])
                        },
                        width:200
                    }
                ]
        }
    },
    computed: {
        ...mapGetters({
            groupList:"group/groupList",
            classList:"group/classList"
        }),
        tableList(){
            return this.groupList.list.map( item => {
                item.ps = this.omit(item.ps)
                return item
            })
        },
        classOption(){
            return [{groupName: '全部类别', id: '-1'}].concat( this.classList )
        },
        total(){
            return this.groupList.total
        },
        params(){
            return {
                ...this.kindId ==='-1'?'': {categoryIdList:[].concat(this.kindId)},
                groupNameLike:this.searchVal.trim()
            }
        }
    },
    methods: {
        ...mapActions("group",[
            "getGroupList",
            "getClassList",
            "delGroupList"
        ]),
        changeKindId(groupId){
            this.clearPage()
            this.getGroupList({page:this.page,params:this.params})
        },
        filterGoods(){
            this.clearPage()
            this.getGroupList({page:this.page,params:this.params})
        },
        changePageNum(num){
            this.page.pageNum = num
            this.getGroupList({page:this.page,params:this.params})
        },
        clearPage(){
            this.page = {
                pageNum:1,
                pageSize:20
            }
        },
        delOne(item){
            let config = {
                title:'分组删除',
                content:'删除分组后, 将无法恢复，请慎重操作！',
                onOk:()=>{
                    this.delItem(item)
                    return true
                }
            }
            this.$Modal.confirm(config)
            
        },
        delItem(item){
            const params = {
                groupId:item.id,
                isDel:1
            }
            console.log(params)
            this.delGroupList(params)
        },
        editGroup(item){
            console.log(item)
            this.$router.push({ path: '/editor_group', query: {id:item.id}})
        },
        omit(item=''){
            if( item && item.length>10){
                item = item.substring(0,10) + '...'
            }else if(!item){
                item = '-'
            }
            return item
        }
    },
    components:{
        GroupManageList
    },
    created() {
        this.getGroupList({page:this.page,params:this.params})
        this.getClassList()
        this.$nextTick(()=>{
            const category = document.getElementById('category').contentWindow
            window.myel = category
            setTimeout(() => {
                console.log(123)
                category.postMessage('aabbcc', "http://localhost:3003/page/index.html#/group")
            }, 3000);
        })
    },
    beforeCreate() {
        let { group={} } = this.$store.state

        if(Object.keys(group).length <= 0) {
            this.$store.registerModule('group', groupModule)
        }
    },

}
</script>
<style lang="scss" scoped>
.group{
    padding: 20px;
    background: #FFFFFF;
    .table-header{
        margin-bottom: 20px;
        .searchinput {
            width: 180px;
            height: 32px;
            margin-right: 5px;

        }
        .selectName{
            margin: 0 10px
        }
        .choose-category{
            width: 200px;
        }
        .btn-addshop {
            width: 88px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
            float: right;
            margin-right: 10px;
        }
        .ivu-select-item-selected.ivu-select-item-focus {
            display: table-cell;
            min-width: 200px;
        }
    }
    .tableMain{
        overflow: hidden;
    }
    /deep/ .ivu-table{
        .ivu-table-header 
            .ivu-table-cell{
                color: #333333;
                font-weight: normal;
            }
        .edit-button{
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
    }
    .noData{
        /deep/ .ivu-table-tip{
            display: none;
        }
        .no-data {
            text-align: center;
            padding: 15px 10px;
            font-size: 12px;
            color: #999999;

            .no-menu {
                display: block;
                width: 138px;
                height: 83px;
                margin: 27px auto;
            }
        }

    }
}
</style>

