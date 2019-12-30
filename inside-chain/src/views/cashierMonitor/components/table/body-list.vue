<template>
    <div class="tableList">
        <div class="warp">
            <div v-for="(item,index) in tableList.list" :class="{'table-content':true}">
                <div class="tableItem">{{item.name}}</div>
                <div class="tableItem">{{item.code}}</div>
                <div class="tableItem">{{item.version}}</div>
                <div class="tableItem">{{item.status}}</div>
                <div class="tableItem">{{item.consistent}}</div>
            </div>
        </div>
        <div class="tablePage">
            <Page 
                :total="total"
                show-total
                :current="page.pageNum"
                :page-size="page.pageSize"
                @on-change="changePageNum"
                class="pull-right manage-page"
            ></Page>
        </div>
    </div>
</template>
<script>
export default {
    props:["tableList","type","page"],
    data() {
        return {
            
        }
    },
    computed: {
        total(){
            return this.tableList.total
        }
    },
    created() {
    },
    methods: {
        changePageNum(num){
            this.$emit('changePageNum',num)
        }
    },

}
</script>
<style lang="scss" scoped>
.tableList{
    .warp{
        border-left: 1px solid #F1F1F1;
        border-right: 1px solid #F1F1F1;
    .table-content{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #F1F1F1;
            line-height: 40px;
            padding-left: 15px;
            .tableItem{
                width: 20%;
            }
        }
    }
    .tablePage{
        overflow: hidden;
        margin-top: 15px;
    }
}
</style>

