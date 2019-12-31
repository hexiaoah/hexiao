<template>
    <div class="mode-box">
        <div class="mode" :class="modeType=='account' ? 'active' : ''" @click="modeClick('account')">商家账号登录</div>
        <div class="vertical">|</div>
        <div class="mode" :class="modeType=='mobile' ? 'active' : ''" @click="modeClick('mobile')">商家手机号登录</div>
        <div class="vertical">|</div>
        <div class="mode" :class="modeType=='scan' ? 'active' : ''" @click="modeClick('scan')">商家扫码登录</div>
    </div>
</template>

<script>
export default {
    name: 'login-mode',
    data(){
      return{
          modeName:'account'
      }
    },
    props:['modeType'],
    methods:{
        modeClick(mode){
            // this.modeName=mode
            this.$emit('mode', mode);
        }
    }
}
</script>

<style lang="scss" scoped>
    .mode-box{
        height: 46px;
        line-height: 46px;
    }
    .mode{
        display: inline-block;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
    }
    .vertical{
        display: inline-block;
        color: #DEDEDE;
        margin-left: 7px;
        margin-right: 7px;
    }
    .active{
        color: #C42022;
    }
</style>
