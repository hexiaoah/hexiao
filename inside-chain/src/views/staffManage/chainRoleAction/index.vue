<template>
    <div class="chainRoleList">
        <div class="listTitleWarp">
            <Input v-model.trim="inputValue" @on-click="clickSearch" @on-enter="clickSearch" icon="ios-search" class="mr-20px" style="width:200px" placeholder="职级名称"></Input>
            <Button @click="goView" type="primary" class="right">添加职级</Button>
        </div>
        <div class="tableWarp">
            <TableList :titleList="chainRoleTitle(this)" :tableList="actionGroupList"  ></TableList>
        </div>
    </div>
</template>
<script>

import TableList from '@/components/table/staff-table-list/index'
import chainRoleManage from '@/store/modules/components/chainRoleManage'
import { chainRoleTitle } from '@/const/emu-table-title'
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            chainRoleTitle,
            inputValue:'',
            delMessage:'删除职级后, 将无法恢复，请慎重操作！'
        }
    },
    components: {
        TableList
    },
    computed: {
        ...mapGetters({
            actionGroupList:'chainRole/getAllActionGroupList'
        })
    },
    methods: {
        ...mapActions({
            getRoleDetalList:'chainRole/getRoleDetalList',
            filterRoleList:'chainRole/filterRoleList',
            deleteRole:'chainRole/deleteRole',
            clearGroupList:'chainRole/clearGroupList'
        }),
        goView(){
            this.$router.push({path:'/chain_role_edit'})
        },
        editGroup(data){
            this.$router.push({path:'/chain_role_edit',query:{id:data.id,name:data.name}})
        },
        clickSearch(){
            this.filterRoleList(this.inputValue)
        },
        delItem(item){
            const delConfig = {
                title: '删除职级',
                render: (h) => {
                    return h('div',{style:{height:'40px',padding:'18px 0 0 48px'}},[
                        h('p',{style:{fontSize:'14px'}}, this.delMessage ),
                        h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ])
                    ])
                },
                onOk: () => {
                    this.deleteRole({id:item.id,value:this.inputValue})
                },
                onCancel: () => {
                }
            }
            this.$Modal.confirm(delConfig)
        }
    },
    created () {
        this.clearGroupList()
        this.getRoleDetalList()
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
.chainRoleList{
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
    transition: box-shadow 0.3s;
    &:hover{
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }
    .listTitleWarp{
        // padding: 20px;
        margin-bottom: 20px;
    }
    /deep/ .tableWarp{
        margin-bottom: 20px;
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
        .chainTableItem{
            display: inline-block;
            padding: 0 15px;
            min-width: 160px;
            line-height: 24px;
            border: 1px solid #cccccc;
            border-radius:6px;
            text-align: center;
            font-size: 12px;
            margin: 5px 10px 5px 0 ;
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
