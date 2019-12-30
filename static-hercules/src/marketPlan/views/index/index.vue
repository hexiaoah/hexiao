<template>
<wrap>
    <tip :info="info" :tip="show"></tip>
    <scroll-loading :pageSize=20 :pageLoad="pageLoad" :pageList.sync="list" :query="params">
        <ul class="market_list">
            <li v-for="item in list" :key="item.planId" @click="linkTo(item.id)">
                <div class="info-wrap">
                    <div class="left">
                        <div class="name">{{item.planName}}<img class="icon" :src="getIcon(item.openStatus)" /></div>
                        <div class="brief">{{item.planDesc}}</div>
                    </div>
                    <div class="right">
                        <p class="times">{{item.countForUsage | filterTimes}}</p>
                        <span class="tip">使用次数</span>
                    </div>
                </div>
                <div class="cover-wrap">
                    <img :src="item.planImage" />
                </div>
            </li>
        </ul>
        <div slot="no-results">
            <div class="fixed-center">
                暂无可用营销方案
            </div>
        </div>
    </scroll-loading>
</wrap>
</template>

<script>
import API from '../../config/api'
import tools from '../../utils/tools'
import wrap from '../../components/wrap.vue';
import tip from '../../components/tip.vue';
const Router = require("@2dfire/utils/router");
export default {
    data() {
        this.resetData();
        return {
            info: "",//顶部通知栏提示信息
            show: false,//顶部通知栏是否显示
            pageLoad: API.getMarketList,
            number: 0,
            date: "",
            list: [], 
            params:{
                entity_id:Router.route.query.entity_id || ""
            }
        }
    },
    filters: {
        filterTimes(times) {
            if (times < 100000) return tools.formateNumber(times, 0);
            else return tools.formateNumber(times / 10000) + "万";
        }
    },
    methods: {
        linkTo(id) {
            this.$router.push({
                path: 'detail',
                query: {
                    id: id,
                    entity_id:this.params.entity_id,
                    type: 1
                }
            })
        },
        getIcon(type) {
            let no = "https://assets.2dfire.com/frontend/c790e09f635a574a05f052c5ee8c6e90.png";
            let yes = "https://assets.2dfire.com/frontend/0736062270e288e4068457fb4836a088.png";
            return type == 0 ? no : yes;
        },
        // 顶部通知栏信息
        topNotificy() {   
            API.topNotificyData(this.params).then((d) => { 
                if (d) {
                    this.number = d.number || 0;
                    this.date = d.date || "";
                    if (this.number > 0) {
                        this.info = `您有${this.number}个免费使用机会将于${this.date}到期。`;
                        this.show = true;
                    } else this.show = false;
                }
            })
        },
        resetData(){
            this.list=[];
        }
    },
    components: {
        wrap,
        tip, 
    },
    created() {  
        this.topNotificy();
        // 顶部导航条设置 
        let conf = JSON.stringify({
            "title": "营销方案",
            "left": {
                "iconType": "back"
            },
            "right": {
                "title": "已发布"
            }
        });
        window.tdfire.configNavigationBar(conf);
        if(tdfire.requirePlugins){
            eval(tdfire.requirePlugins(["observe"]))
            console.log(tdfire.requirePlugins(["observe"]))
        } 
        window.tdfire.observe(function (data) {
            if (data && data.type == "left") window.tdfire.pop();
            else if (data && data.type == "right") window.location.href = "tdf-manager://2dfire.com/member/publishMarketingPlanList?action_code_brand=BRAND_PHONE_MARKETING_PLAN&action_code_branch=&action_code_shop=PHONE_MARKETING_PLAN";
        }) 
    }
}
</script>

<style lang="scss" scoped>
.market_list {
    padding-top: 72px;
    width: 690px;
    margin: 0 auto;
    li {
        margin-bottom: 30px;
        border-radius: 10px;
        background: #ffffff;
        .info-wrap {
            padding: 24px 20px;
            overflow: hidden;
            .left {
                float: left;
                .name {
                    font-size: 34px;
                    color: #000000;
                    font-weight: bold;
                }
                .icon {
                    width: 80px;
                    height: 32px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 16px;
                }
                .brief {
                    font-size: 26px;
                    color: #999999;
                    line-height: 36px;
                    width: 456px;
                    margin-top: 10px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .right {
                float: right;
                .times {
                    font-size: 34px;
                    color: rgba(255, 0, 51, 0.90);
                    letter-spacing: 0;
                    text-align: right;
                    margin-bottom: 10px;
                }
                .tip {
                    font-size: 26px;
                    color: #4A4A4A;
                    display: block;
                    text-align: center;
                }
            }
        }
        .cover-wrap {
            height: 360px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
}

.fixed-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    font-size: 26px;
    color: #333333;
}
</style>
