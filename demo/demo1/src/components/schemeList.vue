<template>
    <div class="box clearfix">
        <div v-for="(item,i) in list" :key="i" class="item-box" :class="[{'border-right':setRightBorder(list.length,i)==true}]" :style="{width:item.width+'%'}">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.data}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'scheme-list',
    props:["list"],
    methods:{
        setRightBorder(len,i){
            if(len-1==i){
                return false
            }else {
                return true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .box{
        border-top:1px solid #DEDEDE;
        border-bottom:1px solid #DEDEDE;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
    }
    .item-box{
        /*display: inline-block;*/
        /*width: 330px;*/
        text-align: center;
        float: left;
    }
    .title{
        font-size: 18px;
        color: #333333;
        margin-top: 30px;
    }
    .content{
        margin-top: 25px;
        margin-bottom: 30px;
        margin-left: 35px;
        margin-right: 35px;
        font-size: 14px;
        color: #333333;
        line-height: 30px;
        text-align: left;
    }
    .border-right{
        border-right: 1px solid #DEDEDE;
    }

</style>
