<template>
    <div>
        <div class="title">{{title}}</div>
        <div class="customer-box clearfix">
            <div class="item pull-left" v-for="(item,index) in customerList" :class="[{'border-bottom':setBottom(customerList.length,index)==true},{'border-right': (index+1)%2 ==1 }]">
                <a href="javascript:;" @click="customerUrl(item.moduleType,item.groupId)" v-if="item.moduleType">
                    <img class="item-img pull-left" :src="item.img" alt="">
                    <div class="item-t pull-left">
                        <div class="first">{{item.text.first}}</div>
                    </div>
                </a>
                <a href="javascript:;" @click="buycardCall(item.clickUrl)"  v-else :class="{'disabled':disabled==false}">
                    <img class="item-img pull-left" :src="item.imgPath" alt="">
                    <div class="item-t pull-left">
                        <div class="category">{{item.name}}</div>
                        <div class="time" v-show="item.price">{{(item.price/100)+item.unit}}</div>
                        <div class="price" v-show="item.simpleIntro">{{item.simpleIntro}}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted(){
        },
        data(){
            return{
            }
        },
        props:{
            title:{},
            customerList:{},
            disabled:{},
            customerParams:{},
            nologin:{}

        },
        methods:{
            buycardCall(clickUrl){
              if(clickUrl){
                this.$emit('buycard', clickUrl)
              }
            },
            setBottom:function (length,index) {
                if(length%2 == 0){
                    if(index==length-1||index==length-2){
                        return false
                    }else{
                        return true
                    }
                }else{
                    if(index==length-1){
                        return false
                    }else{
                        return true
                    }
                }
            },
            customerUrl(moduleType,groupId){
                var customerParams=this.customerParams;
                var str={
                    "店铺名称":customerParams['shopName'] || '',
                    "店铺编号":customerParams['shopCode'] || '',
                    "系统类型":customerParams['os'] || '',
                    "系统版本":customerParams['osv'] || '',
                    "客户端版本":customerParams['version'] || '',
                    "登录帐号":customerParams['account'] || '',
                    "客户端版本":customerParams['version'] || '',
                    "entityId":customerParams['entityId'] || '',
                };
                // for (let key in customerParams){
                //     str[key]=customerParams[key]
                // }
                var jsobj=JSON.stringify(str);
                if(this.nologin){
                    var cUrl=`https://www.sobot.com/chat/h5/index.html?sysNum=5beb7686383f45388ac0a31ff933112d&moduleType=${moduleType}&groupId=${groupId}&uname=${customerParams['shopCode']}`;
                }else{
                    var cUrl=`https://www.sobot.com/chat/h5/index.html?sysNum=5beb7686383f45388ac0a31ff933112d&moduleType=${moduleType}&groupId=${groupId}&params=${jsobj}&uname=${customerParams['shopCode']}`;
                }
                window.location.href=cUrl;
            }

        },
        computed:{

        }
    }
</script>
<style lang="scss" scoped>
    .title{
        height: 80px;
        line-height: 80px;
        margin-top: 45px;
        margin-left: 30px;
        font-size: 30px;
        font-weight: bold;
    }
    .customer-box{
        width: 100%;
        background: #ffffff;
        border-top: 1PX solid #CCCCCC;
        border-bottom: 1PX solid #CCCCCC;
    }
    .border-right{
        border-right: 1PX solid #CCCCCC;
    }
    .border-bottom{
        border-bottom: 1PX solid #CCCCCC;
    }
    .item{
        height: 145px;
        width: 50%;
    a{
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    }
    .pull-left{
        float: left;
    }
    .item-t{
        margin-left: 24px;
        width: 215px;
    .first{
        font-size: 30px;
        font-weight: bold;
    }
    .time{
        font-size: 22px;
        margin-top: 2px;
    }

    }
    .price{
        font-size: 20px;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .category{
        font-size: 26px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .item-img{
        width: 88px;
        height: 88px;
        margin-left: 30px;
        border-radius: 50%;
    }
    .clearfix:after {
        content:"";
        display: block;
        clear:both;
    }
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }
</style>