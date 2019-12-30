<template>
    <div>
        <TitleList :titleList='titleList' />
        <div class="table-warp"> 
            <GroupList v-if="list && list.length > 0" :list="list" :type="type" v-on:delOne="delOne" v-on:editGroup="editGroup" />
            <div class="no-data" v-else>
                <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
                <span>{{this.type === "group"?'暂无分组！':'暂无类别！'}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import TitleList from './components/title-list.vue'
import GroupList from './components/group-list.vue'
export default {
    components:{
        TitleList,GroupList
    },
    props:['list','titleList',"type"],
    data() {
        return {
            
        }
    },
    methods: {
        delOne(item){
            this.$emit('delOne',item)
        },
        editGroup(item){
            this.$emit('editGroup',item)
        }
    },
    created() {
    },
}
</script>

<style lang="scss" scoped>
.table-warp{
    border: 1px solid #F1F1F1;
    border-bottom: none;
    max-height: 500px;
    overflow: auto;
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

