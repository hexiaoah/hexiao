<template>
    <div class="login-success">
        <div class="img-div">
            <img :src='imgSrc'>
        </div>
        <div class="text-div">
            授权登录成功
        </div>
    </div>
</template>
<script>
    const userAgent = navigator.userAgent;
    const isAlipay = userAgent.indexOf('AlipayClient');
    const image = isAlipay !== -1 ? 'Alipay' : 'WeChat';
    export default {
        data() {
            return {
                imgSrc:require(`../image/login-success-${image}.png`)
            };
        },
        methods: {

        },
        components: {},
        created() {
        }
    };
</script>
<style lang="scss" scoped>
.login-success {
    background-color: #fff;
    padding: 100px 0;
    .img-div {
        text-align: center;
        padding-bottom: 50px;
        img {
            width: 100px;
        }
    }
    .text-div {
        text-align: center;
        font-size: 32px;
    }
}
</style>
