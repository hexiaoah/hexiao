<template>
    <div class="login ">
        <div class="loading" v-show="isLoading">
            <span class="spot num_1"></span>
            <span class="spot num_2"></span>
            <span class="spot num_3"></span>
        </div>
        <div :style="isLoading?'opacity: 0':''" >
            <!--<result></result>-->
            <result v-if="token"></result>
            <!--结果分析-->
            <result-analyze :analyze="result.analyze" v-if="result.analyze"></result-analyze>
            <prioritization-scheme :scheme="result.scheme" v-if="result.scheme&&result.scheme.length>0"></prioritization-scheme>
            <about-video :video="result.video" v-if="result.video&&result.video.length>0"></about-video>
            <about-case :cases="result.releaseCase" v-if="result.releaseCase&&result.releaseCase.length>0"></about-case>
            <section class="explain-wrapper" id="hint" v-if="result.explain">
                <h2 class="h2">指标说明</h2>
                <div class="section-main border-t border-b">
                    <p v-for="i in result.explain.split(/\\n/g)">
                        {{i}}
                    </p>
                </div>
            </section>
            <appraise :appraise="result.appraise||''" v-if="result.appraise"></appraise>
        </div>
    </div>
</template>
<script>
    import Result from 'src/examination/components/Result'
    import ResultAnalyze from 'src/examination/components/ResultAnalyze'
    import PrioritizationScheme from 'src/examination/components/PrioritizationScheme'
    import AboutVideo from 'src/examination/components/AboutVideo'
    import AboutCase from 'src/examination/components/AboutCase'
    import Appraise from 'src/examination/components/Appraise'
    import {getResult, getToken, getSessionInfo} from '../config/api'
    import errorToast from 'src/ocean/libs/errorToast'
    import {resultData, ceshiData} from '../utils/data'

    export default {
        data() {
            return {
                result:{},
                token: '',
                isLoading:true
            }
        },
        methods: {
            toGetToken() {
                let ticket = this.$route.query.s_tk || '';
                const self = this;
                let token = sessionStorage.getItem("token");
                if ((ticket === this.ticket || !this.ticket) && token) {
                    self.token = token
                    // console.log('_____token:' + token + '___s_tk:' + this.$route.query.s_tk + '___item_id:' + this.$route.query.item_id);
                    self.getSessionInfo();
                    this.init();
                } else {
                    getToken({
                        serviceTicket: ticket
                    }).then(ret => {
                        let token = ret.data.dfireToken;
                        // console.log('_____token:' + token + '___s_tk:' + this.$route.query.s_tk + '___item_id:' + this.$route.query.item_id);
                        sessionStorage.setItem("s_tk", this.ticket);
                        sessionStorage.setItem("token", token);
                        this.token = token;
                        self.init();
                        self.getSessionInfo();
                    }).catch((e) => {
                        this.isLoading=false
                        errorToast.show(e.result.message)
                    })
                }
            },

            init() {
                let that = this;
                getResult().then((ret) => {
                    that.result = Object.assign({appraise: '-'}, ret.data);
                    that.isLoading=false
                }).catch((e) => {
                    that.isLoading=false
                    errorToast.show(e.result.message)
                })
            },
            getSessionInfo() {
                getSessionInfo({token: this.token}).then((ret) => {
                    sessionStorage.setItem("entity_id", ret.data.entityId);
                    sessionStorage.setItem("uid", ret.data.userId);
                }).catch((e) => {
                    this.isLoading=false
                    errorToast.show(e.result.message)
                })
            },
            //设置客户端显示页面头部内容
            // setTitle(name) {
            //     try {
            //         window.tdfire.configNavigationBar(stringify({title: name,}))
            //     } catch (e) {
            //     }
            // }
        },
        components: {Result, ResultAnalyze, PrioritizationScheme, AboutVideo, AboutCase, Appraise},

        created() {
            let itemId = this.$route.query.item_id || '';
            // let item_name = this.$route.query.item_name || '';
            let app_ver = this.$route.query.app_ver || '';
            // this.setTitle(item_name);
            // window.document.title = item_name;
            sessionStorage.setItem("itemId", itemId);
            sessionStorage.setItem("app_ver", app_ver);
            this.toGetToken()
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "../scss/index";

    .explain-wrapper {
        .section-main {
            font-size: 13PX;
            color: #999999;
            letter-spacing: 0.09PX;
            text-align: justify;
            line-height: 40px;
            padding: 13PX 14PX 10PX 16PX;
            /*margin-bottom: 160PX;*/
        }
    }
    .loading{
        background: rgba(0,0,0,0.30);
        width: 104px;
        height: 104px;
        border-radius: 50%;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -52px;
        margin-left: -52px;
        .spot{
            position: absolute;
            background: #FFFFFF;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            margin-top: -8px;
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
