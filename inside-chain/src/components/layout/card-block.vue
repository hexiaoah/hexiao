<template>
    <div class="card-wrapper">
        <div class="card-title">
            <p>{{title}}</p>
            <div class="subtitle">{{subTitle}}</div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        components: {

        },
        props:['title', 'subTitle']
    }
</script>
<style lang="scss" scoped>
    .card-wrapper{
        padding: 20px 17px 40px 17px;
        background: #FFFFFF;
        margin:30px;
    }
    .card-title{
        font-size: 18px;
        color: #3C4144;
        font-weight: bold;
        margin-bottom: 35px;
    }
    .subtitle{
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 12px;
        margin-top: 5px;
    }
</style>
