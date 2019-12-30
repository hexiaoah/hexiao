<template>
<div>
    <div class="mes-info">
        <header class="title">说明</header>
        <p>当您未绑定担保交易专用收款账户时，担保交易渠道资金结算时默认结算到您进件开通支付时绑定的银行卡。</p>
        <p>当您希望担保交易渠道的收款账户和普通交易渠道收款账户区分开时，可以点击下方按钮绑定一张担保交易渠道收款的专用银行卡。</p>
    </div>
    <div class="btn-warp">
        <Btn  @click="handleClick('/public-account')">绑定企业对公账户</Btn>
        <Btn  @click="handleClick('/person-account')">绑定个人对私账户</Btn>
    </div>
</div>
</template>
<script>
import Btn from 'src/secured-account/components/fire-button'

export default {
    components:{
        Btn
    },
    methods:{
        handleClick(val){
            this.$emit('click',val)
        }
    }
}
</script>

<style lang="scss" scoped>
.mes-info{
    padding: 30px;
    font-size: 30px;
    color: #333333;
    line-height: 42px;
    .title{
        font-size: 36px;
        margin-bottom: 42px;
    }
    p{
        margin-bottom: 42px;
    }
}
.btn-warp{
    padding: 0 30px;
    &>button{
        margin-bottom: 30px;
        &:last-child{
            margin-bottom: 0px;
        }
    }
}
</style>