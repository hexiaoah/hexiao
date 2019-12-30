<script>
    // TODO: api 请求
    var getMenuList = require("../apis/getMenuList");
    module.exports = {
        props: [
            'baseData',
            'msgStatic'
        ],
        data: function () {
            return {
                thisMassage: "这是内容",
                btnText: "btn上的内容",
                btnText2: "go Menu",
                count: 1,
                isAlertShow: false,
                homeData: {
                    title: "这是一个标题"
                }
            }
        },
        created: function () {
            console.log("created")
        },
        ready: function () {
            console.log("ready")
        },
        destroyed: function () {
            console.log("destroyed")
        },
        methods: {
            getIndex: function (param) {
                var _this = this;
                // TODO: 这里处理http请求
                getMenuList({
                    type: "get",
                    params: {
                       key: JSON.stringify([""])
                    },
                    data: {},
                    showLoading: false,
                    success: function (resp) {
                        if (resp.code == 0) {
                            _this.$set('homeData', data.homeData);
                        }
                    },
                    error: function (resp) {
                        console.log(resp.msg)
                    }
                });
            },
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('')
            },
            goMenu: function () {
                this.$router.go({ name: 'menu'})
            },
            addToList: function () {
                event.preventDefault();
                event.stopPropagation();
                console.log(event);
                return false
            }
        },
        computed: {
            // TODO:  有依赖于其他变量的数据, 尽量使用 computed (其他变量变化时自动更改此变量)
            countB: function () {
                // `this` 指向 vm 实例
                return this.count += 1
            }
        },
        events: {
            'btnSubmit': function (msg) {
                // 事件回调内的 `this` 自动绑定到注册它的实例上
            }
        },
        components: {
            'head-tab': require('../components/headTab.vue'),
            'common-btn': require('../../base/components/commonBtn.vue'),
            'home-btn': require('../components/homeBtn.vue'),
            'alert-bg': require('../components/alertBg.vue')
        },
        route: {
//          TODO: 建议: 所有数据和ajax尽量在此处( view 层) 进行请求和处理
//          vue-router 推荐 当页面切换时 在route函数中处理数据请求
            data(transition){
                this.getIndex("param");
            }
        }
    }
</script>

<template>
    <div id="home" class="wrapper-home">
        <!-- <head-tab :home-data="homeData"></head-tab> -->

        <h1>{{ baseData.msg }}</h1>
        <div class="image"></div>
        <div class="image-small"></div>
        <div class="image-static"></div>

        <p class="message">{{ thisMassage }}</p>
        <p class="message">{{ countB }}</p>

        <input class="msg-input" v-model="thisMassage" @keyup="addToList">

        <button class="btn" @click="reverseMessage()">Reverse Message</button>

        <button class="btn" @click="isAlertShow=!isAlertShow">弹出浮层</button>

        <!-- TODO:  html 直接控制页面切换-->
        <a v-link="{ path: '/menu' }">Go to Menu</a>

        <!--<common-btn v-on:child-msg="handleIt"></common-btn>-->

        <!-- TODO:  推荐的组件用法, 底层组件只负责展示内容或触发事件 不处理具体逻辑和状态 -->
        <home-btn :text="btnText2" v-on:go-submit="goMenu"></home-btn>

        <common-btn :text="btnText"></common-btn>

        <alert-bg v-show="isAlertShow" transition="expand">
            <span>这里的内容会被插入到 alert-bg 组件内部</span>
        </alert-bg>
    </div>
</template>

<!-- TODO:  view 样式要使用同名ID包裹css样式 防止样式冲突 -->
<style src="./home.scss" lang="scss" scoped></style>
