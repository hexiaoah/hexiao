<script>
    /**
     -- zeqi@2dfire

     @props:
     title：卡片标题

     @event:
     on-tap: 点击卡片，冒泡

     列表页用卡片容器
     */
    import baseTitle from "@/components/base-title.vue";
    const storeType = require("../const/storeType");

    export default {
        
        props: ['kind',"title","image","type","status","level"],
        methods: {
            clickCard() {
                this.$emit('on-tap')
            }
        },
        computed:{
            logoType(){
                return storeType[this.image]
            }
        },
        components: {
            baseTitle
        },
    }
</script>

<template>
<div class="card" @click="clickCard">
    <div class="card-body">
        <div class="card-title">
            <span class="mini-title">{{kind}}<slot name="inTitle"></slot></span>
            
            <span class="card-tip">{{status}}</span>
        </div>
        <div class="card-img-wrap">
            <img  class="card-img" :src="logoType" alt="IMAGE">
        </div>
        <!-- <div class="card-img-wrap">
            <img :src="image" class="card-img" alt="IMAGE">
            <img v-if="type" :src="type" class="card-label" alt="">
            <span class="card-img-desc">{{desc}}</span>
        </div> -->
        <baseTitle :name ="title" size='md' class="main-title" :single="true"></baseTitle>
        <div class="level">
            <span>职级：</span>
            <span>{{level}}</span>
        </div>
    </div>
    <slot name="inFoot"></slot>
</div>
</template>

<style lang="scss" scoped>
    .card {
        width: 100%;
        height: 316px;
        background-color: #FFFFFF;
        cursor: pointer;
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
        transition: box-shadow 0.3s;
    }

    .card:hover {
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }

    .card-body {
        padding: 16px;
        padding-bottom: 25px;
        .card-title {
            overflow: hidden;
            font-size: 16px;
            color: #3C4144;
            line-height: 100%;
            margin-bottom: 12px;
        }
        .mini-title{
            float: left;
            width: 50%;
            display: flex;
            align-items: center;
        }

        .card-tip {
            width: 50%;
            text-align: right;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
            float: right;
        }
        .card-img-wrap {        
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin:  45px auto 25px;
            text-align: center; 
            background: #F1F1F1;
            &::after{
                content: "";
                height:100%;
                display:inline-block;
                vertical-align:middle;
            }
        }
        .card-img {
            width: 36px;
            height: 36px;
            vertical-align:middle;
           
        }
    }
    .level{
        margin-top: 8px;
        text-align: center;
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
    }
</style>

