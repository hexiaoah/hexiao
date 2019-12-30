<template>
<div class="index-warp">
    <div class="bind-status">
        <img class="img-status" :src="list.imgPath">
        <div class="title">{{list.statusInfo}}</div>
        <p v-for="(item,index) in list.mesInfo" :key="index" class="mes-info">{{item}}</p>
    </div>
    <div v-if="list.backInfo" class="back-card">
        <div class="back-name mb-10">{{list.backInfo.backName}}</div>
        <div class="back-num mb-15">{{list.backInfo.backNumber | replaceStr}}</div>
        <div class="company">{{list.backInfo.accountName}}</div>
        <div class="account">{{list.backInfo.account}}</div>
    </div>
    <Btn v-for="(item,index) in list.btnValue" :key="index"  @click="handleClick(item.type)">{{item.name}}</Btn>
</div>
</template>
<script>
import Btn from 'src/secured-account/components/fire-button'

export default {
    components:{
        Btn
    },
    props:{
        list:{
            type: Object,
            default: ()=>({})
        }
    },
    methods:{
        handleClick(val){
            this.$emit('click',val)
        }
    }
}
</script>

<style lang="scss" scoped>
.index-warp{
    padding: 30px;
    .bind-status{
        padding-top: 76px;
        text-align: center;
        .img-status{
            width: 60px;
            height: 60px;
            margin-bottom: 40px;
        }
        .title{
            font-size: 34px;
            color: #333333;
            margin-bottom: 30px;
        }
        .mes-info{
            font-size: 26px;
            color: #666666;
            margin-bottom: 66px;
        }
    }
    .back-card{
        position: relative;
        height: 272px;
        line-height: 40px;
        padding: 40px 30px 30px;
        margin-bottom: 96px;
        background-color: #ffffff;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.08);
        border-radius: 8px;
        font-size: 30px;
        color: #333333;
        .company{
            width: 600px;
            padding-top: 30px;
            border-top: 1px solid rgba(204,204,204,.5);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .account{
            position: absolute;
            right: 0; top: 0;
            width: 204px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 24px;
            color: #FFFFFF;
            background-color: #0088FF;
            border-radius: 0 8px 0 8px;
        }
    }
}
</style>