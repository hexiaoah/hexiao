<template>
    <div class="scheme-wrapper">
        <h2 class="h2">优化方案</h2>
        <div v-for="(item ,index) in scheme" :key="index">
            <h3 class="h3" v-if="item.title">{{item.title}}</h3>
            <ul class="group">
                <li class="section-main border-t border-b" v-for="(item2 ,index2) in item.child" :key="index2">
                    <div class="explain">
                        <div class="title">{{item2.title}}</div>
                        <div class="detail">
                            <p v-for="i in item2.detail.split(/\\n/g)">
                                {{i}}
                            </p>
                        </div>
                        <ul class="set-list border-t" v-if="item2.set">
                            <li class="list" v-for="(set,index3) in item2.set" :key="index3"
                                :class="index3!==0?' border-t':''"
                                @click="toGo(set.isOk,set.title,set.url)">
                                <div v-click="{name:'click_exam_item_detail_icon_'+set.title,info:{buy:set.isOk==='NEED_BUY'?'need_buy':'no_need_buy'}}">
                                    <div class="list-wrapper text-1"
                                         :class="'status_'+set.isOk">
                                        <img class="img" :src="set.icon">
                                        <span class="name text-1">{{set.title}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <p class="btn-wrapper">
                            <a class="btn" v-if="item2.btnUrl" v-click="{name:'click_exam_item_detail_solution',info:{solution_title:item2.btnTitle}}"
                               :href="item2.btnUrl">{{item2.btnTitle}}</a>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <alerts v-show="alertIsShow" @ok="ok">
            您没有 [{{alertName}}] 模块的权限，请联系本店掌柜帮您赋权
        </alerts>
    </div>
</template>

<script>















    import alerts from 'src/examination/components/alert'

    export default {
        name: 'scheme',
        props: {
            scheme: {
                request: true
            }
        },
        data() {
            return {
                alertIsShow: false,
                alertName:'',//当前点击 没有权限的模块的名称
            }
        },
        created() {
        },
        mounted() {

        },
        computed: {},
        methods: {
            toGo(type,title, url) {
                if (type === 'NO_PERMISSION') {
                    this.alertIsShow = true
                    this.alertName = title
                } else {
                    window.location.href = url
                }
            },
            ok() {
                this.alertIsShow = false
            }
        },
        components: {alerts}
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .section-main {
        padding: 0 0 0 15PX;
        overflow: hidden;
        margin-bottom: 36PX;
        .title {
            font-size: 15PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 20PX;
            margin: 11PX 0 10PX;
        }
        .detail {
            font-size: 13PX;
            color: #999999;
            letter-spacing: 0;
            line-height: 18PX;
            margin: 11PX 0;
            padding-right: 15PX;
        }
        .set-list {
            line-height: 60PX;
            .list {
                padding: 0 15PX 0 15PX;
                margin-left: 44PX;
                position: relative;
                font-size: 15PX;
                color: #333333;
                letter-spacing: 0;
            }
            a {
                display: block;
            }
            .list-wrapper {
                padding-right: 70PX;
                &:after {
                    content: '去设置';
                    position: absolute;
                    top: 0;
                    right: 15PX;
                    font-size: 15PX;
                    color: #CCCCCC;
                    letter-spacing: 0;
                    padding-right: 18PX;
                    background: url("https://assets.2dfire.com/frontend/ac8cf450249c33a8aa8cfa19ddd8a977.png") no-repeat right center;
                    background-size: 7.5PX;
                }
            }
            .img {
                width: 44PX;
                height: 44PX;
                top: 50%;
                left: -44PX;
                margin-top: -22PX;
                vertical-align: middle;
                position: absolute;
            }
            .right {
                font-size: 15PX;
                color: #CCCCCC;
                letter-spacing: 0;
                padding-right: 18PX;
                background: url("https://assets.2dfire.com/frontend/ac8cf450249c33a8aa8cfa19ddd8a977.png") no-repeat right center;
                background-size: 7.5PX;
            }
        }
        .btn-wrapper{
            padding-right: 15PX;
        }
        .btn {
            display: block;
            background: #0088FF;
            border-radius: 6PX;
            font-size: 15PX;
            color: #FFFFFF;
            text-align: center;
            line-height: 44PX;
            width: 300PX;
            margin: 15PX auto 15PX auto;
        }
    }

    .status_NO_PERMISSION .name:after, .status_NEED_BUY .name:after {
        content: '';
        display: inline-block;
        width: 28px;
        height: 28px;
        margin-left: 10px;
        position: relative;
        top: 4px;
    }

    .status_NO_PERMISSION .name:after {
        background: url("https://assets.2dfire.com/frontend/594f42d922f172f2d08ad2c03a7a9592.png") no-repeat center;
        background-size: 100%;
    }

    .status_NEED_BUY .name:after {
        background: url("https://assets.2dfire.com/frontend/53fffa7869b31874558105895ba49ec3.png") no-repeat center;
        background-size: 100%;
    }
</style>
