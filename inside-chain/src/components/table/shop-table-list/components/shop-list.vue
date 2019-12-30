<template>
    <div>
        <div v-for="(item,index) in list" :class="{'table-content':true}" @click="handleClick(item)">
            <div :style="{width:titleList[0].width}">
                <a class="shopName">{{item.title}}</a>
            </div>
            <div :style="{width:titleList[1].width}">
                <span>{{item.desc}}</span>
            </div>
            <div :style="{width:titleList[2].width}">
                <span>{{item.code}}</span>
            </div>
            <div :style="{width:titleList[3].width}">
                <span>{{item.joinModelText}}</span>
            </div>
            <div :style="{width:titleList[4].width}">
                <span :style="{color:item.statusColor }">{{item.statusText}}</span>
            </div>
            <div :style="{width:titleList[5].width}">
                <Poptip trigger="hover" :content="item.address" placement="right" width=150>
                    <span class="address">{{omit(item.address)}}</span>
                </Poptip>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    methods: {
        handleClick(item){
            this.$emit('goShopView',item)
        },
        omit(item=''){
            if( item && item.length>25){
                item = item.substring(0,25) + '...'
            }else if(!item){
                item = '-'
            }
            return item
        }
    },
}
</script>
<style lang="scss" scoped>
.table-content{
        position: relative;
        display: flex;
        border-bottom: 1px solid #F1F1F1;
        line-height: 40px;
        padding-left: 15px;
        transition: .5s;
        .table-item{
            width: 25%;
        }
        .table-edit{
            width: 15%;
        }
        .table-button{
            border: 0;
            outline: 0;
            cursor: pointer;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
            border-right: 1px solid #A9A9A9;
            background: #ffffff;
            &:last-child{
                border-right: none;
                padding-left: 8px;
            }
        }
        .shopName{
            color: #5599FF;
        }
        .arrow{
            position: absolute;
            right: 5px;top: 0;
            color: #333;
        }
        .address{
            display: inline-block;
            width: 100%;
            cursor: pointer;
        }
        /deep/ .ivu-poptip-body-content-inner{
            white-space: pre-wrap;
            padding: 5px;
            text-align: center;
        }
        &:nth-of-type(2n){
            background-color: #f8f8f8; 
        }
        &:hover{
            background-color: #ebf7ff;
        }
    }
</style>

