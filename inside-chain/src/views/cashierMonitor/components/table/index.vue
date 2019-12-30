<template>
    <div>
        <TitleList :titleList='titleList' />
        <bodyList v-if="!!tableList && !!tableList.total" :tableList="tableList" :page="page" @changePageNum="changePageNum" />
        <div class="no-data" v-else>
            <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
            <span>{{'暂无数据'}}</span>
        </div>
    </div>
</template>
<script>
import TitleList from './title-list.vue'
import bodyList from './body-list'
export default {
    components:{
        TitleList,bodyList
    },
    props:['list','titleList',"type","tableList","page"],
    data() {
        return {
            
        }
    },
    methods: {
        changePageNum(num){
            this.$emit('changePageNum',num)
        }
    },
    created() {
    },
}
</script>

<style lang="scss" scoped>
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
</style>

