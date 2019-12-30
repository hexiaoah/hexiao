<template>
    <div class="analysis-wrap">
        <ul class="btn-group">
            <li class="btn-item">
                <analysis-click>
                    <button class="btn btn-md btn-primary" @click="handleClick">默认点击事件</button>
                </analysis-click>
            </li>
            <li class="btn-item">
                <analysis-download>
                    <button class="btn btn-md btn-primary" @click="handleClick">下载事件</button>
                </analysis-download>
            </li>
            <li class="btn-item">
                <analysis-login>
                    <button class="btn btn-md btn-primary" @click="handleClick">登录事件</button>
                </analysis-login>
            </li>
            <li class="btn-item">
                <analysis-register>
                    <button class="btn btn-md btn-primary" @click="handleClick">注册事件</button>
                </analysis-register>
            </li>
            <li class="btn-item">
                <analysis-share>
                    <button class="btn btn-md btn-primary" @click="handleClick">分享事件</button>
                </analysis-share>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "analysis-test",
        methods: {
            handleClick(e) {
                console.log(e.target.textContent)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .analysis-wrap {
        padding: 24px;
        font-size: 30px;

        .btn-group {
            .btn-item {
                margin-top: 10px;
            }
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

        .btn-md {
            display: inline-block;
            font-size: 26px;
            width: 220px;
            height: 64px;
            line-height: 64px;
        }
    }
</style>