<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <div class="case">
            <div class="table-warp">
                <div class="table-header">
                    <Input v-model="searchVal"
                        class="searchinput"
                        icon="search"
                        @on-click="filterList"
                        @on-enter="filterList"
                        placeholder="店铺名称">
                    </Input>
                    <span class="titleContent">主收银运行状态</span>
                    <Select v-model="statusVal" style="width:100px" @on-change="filterList">
                        <Option v-for="item in totalList.statusSelect" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <span class="titleContent">主副收银版本是否一致</span>
                    <Select v-model="versionVal" style="width:100px" @on-change="filterList">
                        <Option v-for="item in totalList.versionSelect" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <div class="reload">
                        <Button class="reloadBtn" type="primary" @click="reload">刷新当前页面</Button>
                        <span>监控数据更新时间：{{getTime}}</span>
                    </div>
                </div>
                <TableContext :titleList="titleList" :tableList="tableList" :page="page" @changePageNum="changePageNum"></TableContext>
                
            </div>
        </div>
    </div>
</template>
<script>
import crumbBar from '@/components/layout/crumb-bar'
import Crumb from "@/components/layout/crumb";
import TableContext from './components/table/index'
import { cashierMonitorTitle } from '@/const/emu-table-title.js'
import { mapGetters,mapActions } from 'vuex'
import totalList from '@/const/emu-batch-select-lib'
import cashierMonitorModule from '@/store/modules/components/cashierMonitor'
import tools from '../../base/tools'

export default {
    components: {
        crumbBar,Crumb,TableContext
    },
    computed: {
        ...mapGetters({
            'tableList':'cashierMonitor/getPageList',
        }),
      titleList(){
          return cashierMonitorTitle
      },
      getTime(){
            const newDate = tools.dateFormate(new Date(),'yyyy/MMM/dd hh:mm:ss')
            return newDate
      }  
    },
    data () {
        return {
            searchVal:'',
            totalList,
            statusVal:'-1',
            versionVal:'-1',
            page:{
                pageNum:1,
                pageSize:20
            }
        }
    },
    created () {
        this.$store.dispatch("leftNav/setNav", 16);
        this.getAllShops(this.page)
    },
    methods: {
        ...mapActions({
            'getCashierInfo':'cashierMonitor/getCashierInfo', 
            'filterCashierInfo':'cashierMonitor/filterCashierInfo',
            'changePage':'cashierMonitor/changePage',
            'getAllShops':'cashierMonitor/getAllShops',
        }),
        reload(){
            window.location.reload()
        },
        filterList(value){
            this.page={
                pageNum:1,
                pageSize:20
            }
            let filterValue = {
                search:this.searchVal.trim(),
                status:this.statusVal,
                version:this.versionVal,
                ...this.page
            }
            this.filterCashierInfo(filterValue)

        },
        changePageNum(num){
            this.page.pageNum = num
            this.changePage(this.page)
        }
    },
    beforeCreate () {
        let { cashierMonitor={} } = this.$store.state

        if(Object.keys(cashierMonitor).length <= 0) {
            this.$store.registerModule('cashierMonitor', cashierMonitorModule)
        }
    }
}
</script>
<style lang="scss" scoped>
.case{
    padding: 30px;
    .table-warp{
        padding: 15px;
        background-color: #ffffff;
        .table-header{
                margin-bottom: 20px;
                .searchinput {
                    width: 180px;
                    height: 32px;

                }
                .titleContent{
                    margin:0 10px 0 20px;
                }
                .reload{
                    float: right;
                    .reloadBtn{
                        margin-right: 10px;
                    }
                }
        }
    }
}
</style>

