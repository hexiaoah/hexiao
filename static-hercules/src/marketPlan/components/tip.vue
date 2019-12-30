<template>
<div class="fixed-top" v-if="show">
    <span v-html="info"></span><i @click="close"></i></div>
</template>

<script>
export default {
    props: ["info","tip"],
    watch:{
        tip(val){
            if(val)this.show=val;
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        close() {
            this.show = false;
        }
    },
    created(){ 
        if(this.tip!==undefined)this.show=this.tip;
    }
}
</script>

<style lang="scss" scoped>
.fixed-top {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    background: #F9EEB1;
    font-size: 30px;
    i {
        float: right;
        display: block;
        width: 28px;
        height: 28px;  
        margin-top: 24px;
        font-style: normal;
        background: url("../images/close.png") no-repeat center;
        background-size: cover;
    }
}
</style>
