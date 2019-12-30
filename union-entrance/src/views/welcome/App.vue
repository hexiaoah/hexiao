

<template>
    <!-- 登录欢迎页 -->
    <div class="wrap">
        <p class="hi">Hi , <span class="username">{{userInfo.name}}</span></p>
        <p class="welcome">Welcome</p>
        <p class="welcome-text">欢迎使用二维火商家管理系统，请尽情使用吧！</p>
    </div>
</template>
<script>
    // import Requester from '@/base/requester';
    // import API from '@/config/api';
    import Cookie from "@2dfire/utils/cookie";

    export default {
        data() {
            return {
                userInfo: {
                    name: '',
                }
            }
        },
        methods: {
            getCookies(){
               let entranceCookie = Cookie.getItem('entrance')
               if (entranceCookie) {
                    try {
                        var entrance = JSON.parse(entranceCookie)
                        this.userInfo.name = entrance.userInfo.name
                    }
                    catch (e) {
                         entrance = {}
                    }
                }
            },
            reMoveCookie(){
                let active = Cookie.getItem('active')
                if(active){
                    Cookie.removeItem('active')
                }
            }

        },
        created() {
            this.reMoveCookie();
            this.getCookies();
        }
    }
</script>

<style lang="" scoped>
    .wrap{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;

    }

    p {
        margin: 0 auto 12px;
    }

    .hi {
        font-size: 72px;
    }

    .username {
        font-size: 32px;
    }
    .welcome {
        font-size: 32px;
        color: #666666;
    }
    .welcome-text {
        font-size: 14px;
        color: #666666;
    }
</style>

