<template>
    <div>
        <TitleList :titleList='titleList' />
        <div class="table-warp"> 
            <ShopList v-if="list && list.length > 0" :titleList="titleList" :list="list" @goShopView="goShopView" />
            <div v-else class="no-data">
                <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
                <span>暂无数据</span>
            </div>
        </div>
    </div>
</template>
<script>
import TitleList from './components/title-list.vue'
import ShopList from './components/shop-list.vue'
export default {
    components:{
        TitleList,ShopList
    },
    props:{
        list:{
            type: Array,
            default: ()=>([])
        },
        titleList:{
            type: Array,
            default: ()=>([])
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        goShopView(item){
            this.$emit('goShopView',item)
        }
    },
    created() {
        console.log(this)
    },
}
</script>

<style lang="scss" scoped>
.table-warp{
    border: 1px solid #F1F1F1;
    border-bottom: none;
    background-color: #ffffff;
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background: #cccccc;
    }
    &::-webkit-scrollbar-track{
        border-radius: 0;
        background: #ffffff;
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
</style>

