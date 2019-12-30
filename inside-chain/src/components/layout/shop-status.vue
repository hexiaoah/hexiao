<template>
     <span class="shopstatus" @click="handleClick">
        <Icon :color="color" type="record"></Icon>
        <span class="statusText">{{status}}</span>
        <Icon type="ios-arrow-right"></Icon>
    </span>
</template>
<script>
export default {
    props:{
        status:{
            type: String,
            default:''
        },
        color:{
            type: String,
            default:''
        }
    },
    methods:{
        handleClick(){
            this.$emit('on-click')
        }
    }
}
</script>
<style lang="scss" scoped>
    .shopstatus{
        padding: 3px 10px;
        border: 1px solid #6C6C6C;
        color: #B6B6B6;
        border-radius: 3px;
        cursor: pointer;
    }
    .statusText{
        margin: 0 5px;
    }
</style>