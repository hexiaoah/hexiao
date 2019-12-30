<template>
    <div class="staffPost">
        <div class="headWarp">
            <Input v-model="searchVal"
                   class="searchinput"
                   icon="search"
                   @on-click="filterGoods"
                   @on-enter="filterGoods"
                   placeholder="职级名称">
            </Input>
            <router-link to='/role_edit' class="btn-addshop">添加职级</router-link>
        </div>
        <div class="useShop">
            <span>当前有 <span class="shopNumber">{{ShopCount}}</span> 家门店使用连锁统一的职级。</span>
            <router-link class="shopInfo" to='/apply_shops'>查看详情</router-link>
        </div>
        <div class="tableWarp">
            <Table :columns="titleList" :data="roleTableList"></Table>
        </div>
        <!-- <div class="page-bar">
                <Page :total="total" :current="params.pageIndex" :page-size="params.pageSize" show-total @on-change="changePage"></Page>
        </div> -->
    </div>
</template>
<script>

import staffManage from '@/store/modules/components/staffManage'
import { roleTitle } from '@/const/emu-table-title'
import { mapActions, mapGetters } from 'vuex'


export default {
    data () {
        return {
            searchVal:'',
            roleTitle,
            params:{
                pageIndex:1,
                pageSize:20
            },
            delMessage:'删除后此职级下的门店员工均变为无职级状态，需要重新进行绑定。确定要删除此职级吗？'
        }
    },
    computed: {
        ...mapGetters({
            ShopCount:"staff/getShopCount",
            roleTableList:"staff/getRankTableList",
        }),
        titleList(){
            return this.roleTitle(this)
        }
    },
    methods: {
        ...mapActions({
            filterList:'staff/filterList',
            deleteRole:'staff/deleteRole',
            clearRoleList:'staff/clearRoleList',
            getUnifyShopcount:'staff/getUnifyShopcount',
            getChainBranchRoleDetailList:'staff/getChainBranchRoleDetailList',
        }),
        filterGoods(){
            this.filterList(this.searchVal)
        },
        editGroup(item){
            this.$router.push({path:'/role_edit',query:{id:item.id,name:item.name}})
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
                    this.deleteRole(item.id)
                },
                onCancel: () => {
                }
            }
            this.$Modal.confirm(delConfig)
        },
        // changePage(num){
        //     this.params.pageIndex = num
        //     this.getChainBranchRoleDetailList({page:this.params})
        // },
        // resetPage(){
        //     this.params = {
        //         pageIndex : 1,
        //         pageSize : 20
        //     }
        // }
    },
    created () {
        this.clearRoleList()
        this.getUnifyShopcount()
        this.getChainBranchRoleDetailList()

    },
    beforeCreate () {
        let { staff={} } = this.$store.state

        if(Object.keys(staff).length <= 0) {
            this.$store.registerModule('staff', staffManage)
        }
    },
}
</script>
<style lang="scss" scoped>
    .staffPost{
        padding: 20px;
        background: #ffffff;
        transition: box-shadow 0.3s;
        &:hover{
            box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
        }
        .headWarp{
            margin-bottom: 15px;
            .searchinput{
                width: 180px;
                height: 32px;
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
            }
        }
        .useShop{
            margin-bottom: 15px;
            .shopNumber{
                color: #2D8cF0;
            }
            .shopInfo{
                color: #2D8cF0;
            }
        }
        .tableWarp{
            margin-bottom: 20px;
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
                .tableRow{
                   padding: 15px 0;
                }
                .tableItem{
                    display: inline-block;
                    padding: 0 15px;
                    min-width: 80px;
                    line-height: 28px;
                    border: 1px solid #cccccc;
                    border-radius:14px;
                    text-align: center;
                    font-size: 12px;
                    margin: 5px 10px 5px 0 ;
                }
            }
        }
    }
</style>