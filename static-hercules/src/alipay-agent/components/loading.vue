<template>
    <div class="loading-toast" v-show="isLoading">
        <span class="spot num_1"></span>
        <span class="spot num_2"></span>
        <span class="spot num_3"></span>
        <div class="content">{{content}}</div>
    </div>
</template>
<script>

export default {
    props: {

        content: {
            type: String,
            default: '正在加载'
        },
        isLoading: {
            type: Boolean,
            default: false
        },
    },
        
}
</script>
<style type="text/scss" lang="scss">

    .loading-toast {
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        width: 360px;
        height: 200px;
        line-height: 40px;
        padding: 44px;
        color: white;
        text-align: center;
        z-index: 120;
        border-radius: 26px;
        font-size: 30pX;

        .spot{
            position: absolute;
            background: #FFFFFF;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            top: 60px;
            left: 50%;
            margin-left: -8px;
            transform: translate3d(0,0,0);
        }
        .num_1{
            margin-left: -26px;
            animation: spot .5s infinite .1s alternate ease-in-out;
        }
        .num_2{
            animation: spot .5s infinite .35s alternate ease-in-out;
        }
        .num_3{
            margin-left: 10px;
            animation: spot .5s infinite .6s alternate ease-in-out;
        }

        .content{
            position: relative;
        color: #ffffff;
        font-size: 30pX;
        line-height: 40px;
        top: 60px;
        }
    }
    @keyframes spot {
        0%{
            transform: scale(1);
        }
        50%{
            transform: scale(.5);
        }
        100%{
            transform: scale(.5);
        }
    }
</style>
