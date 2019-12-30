<template>
    <analysis-view class="index-wrap">
        <div class="describe">
            <h3>首页任务：</h3>
            <ul class="">
                <li>1、测试url参数是否被记录到sessionStorage中</li>
                <li>2、page-arrival</li>
                <li>3、page-leave</li>
            </ul>
        </div>
        <div class="action">
            <button class="btn btn-primary" @click="pathTo">前往“事件测试”</button>
        </div>
    </analysis-view>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            pathTo() {
                this.$router.push({path: '/analysis-test'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .index-wrap {
        padding: 24px;
        font-size: 30px;
        h3 {
            font-size: 36px;
        }
        .action {
            margin-top: 30px;
            padding: 0 30px;
        }
        .btn {
            display: block;
            padding: 0;
            margin: 0;
            border: none;
            outline: none;
            background: transparent;
            font-size: inherit;
            text-align: center;
        }
        .btn-primary {
            width: 100%;
            background-color: #0088ff;
            color: #fff;
            border-radius: 10px;
            height: 80px;
            line-height: 80px;
        }
    }
</style>

