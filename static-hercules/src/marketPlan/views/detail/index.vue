<template>
<wrap>
    <tip :info="info"></tip>
    <!-- <div class="overflow">
        <div class="info-wrap">
            <p class="brief">{{planDesc}}</p>
            <div class="cover">
                <img :src="planImage" />
            </div>
        </div>
    </div> -->
    <div class="market-sketch">
        <!-- <p class="title">方案说明示例图</p> -->
        <div class="picture">
            <img :src="planSketch" />
        </div>
    </div>
    <div class="fixed-bottom">
        <div class="btn" @click="immediateUse">立即使用</div>
    </div>
</wrap>
</template>

<script>
import API from "../../config/api.js";
import wrap from '../../components/wrap.vue';
import tip from '../../components/tip.vue';
import Vue from 'vue';
const Router = require("@2dfire/utils/router");
export default {
    data() {
        return {
            planName: "",
            planDesc: "",
            planImage: "",
            planSketch: "",
            type: 1, //0方案开通、1方案未开通有赠送、2方案未开通没有赠送
            number: 1,
            redirectUrl: "",
            memberCount: 0,
            info: "该方案预计将触达0位顾客。",
            onceUse:true,
            url: `tdf-manager://2dfire.com/member/marketingPlan?action_code_brand=BRAND_PHONE_MARKETING_PLAN&action_code_branch=&action_code_shop=PHONE_MARKETING_PLAN&planId=${this.$route.query.id}`,
        }
    },
    methods: {
        // 获取营销方案详情
        getMarketDetail() {
            let {
                id,
                entity_id
            } = Router.route.query;
            let params = {
                id: id,
                entity_id: entity_id,
            }
            API.getMarketDetail(params).then((d) => {
                if (d) {
                    this.formateData(d, 1);
                    let conf = JSON.stringify({
                        "title": this.planName,
                        "left": {
                            "iconType": "back"
                        }
                    });
                    window.tdfire.configNavigationBar(conf);
                }
            })
        },
        // 立即使用
        immediateUse() { 
            if(!this.onceUse)return;
            this.onceUse=false;
            let self = this;
            let {
                id,
                entity_id
            } = Router.route.query;
            let app_version=window.tdfire.appVersion();
            let params = {
                id: id,
                entity_id: entity_id,
                app_version:app_version
            }
            
            API.marketIsOpen(params).then((d) => {
                this.onceUse=true;
                if (d) {
                    this.formateData(d, 2);
                    switch (this.type) {
                        case 0:
                            window.location.href = this.url; //选择品牌页面
                            break;
                        case 1:
                            Vue.prototype.$confirm({
                                type: 'confirm',
                                content: '您可以免费使用' + self.number + '个营销方案，使用本方案后免费使用数量将减1，是否确认使用？',
                                confirm: () => {
                                    self.freeUseTemplate(params);
                                }
                            })
                            break;
                        case 2:
                            window.location.href = self.redirectUrl; //购买方案  
                    }
                }
            })
        },
        // 使用免费模板
        freeUseTemplate(params) {
            API.freeUseTemplate(params).then(d => {
                if (d) window.location.href = this.url;
                else Vue.prototype.$toast("使用免费的营销方案失败。");
            })
        },
        // 顶部通知栏
        topNotificy() {
            let {
                id,
                entity_id
            } = Router.route.query;
            let params = {
                plan_id: id || "",
                entity_id: entity_id
            }
            API.topNotificyMarket(params).then((d) => {
                if (d) {
                    this.memberCount = d.memberCount;
                    this.info = `该方案预计将触达${this.memberCount}位顾客。`;
                }
            })
        },
        formateData(d, type) {
            if (type == 1) {
                this.planDesc = d.planDesc;
                this.planImage = d.planImage;
                this.planName = d.planName;
                this.planSketch = d.planSketch;
            } else if (type == 2) {
                this.type = d.type;
                this.number = d.number;
                this.redirectUrl = d.redirectUrl;
            }
        }

    },
    components: {
        wrap,
        tip,
    },
    created() {
        this.getMarketDetail();
        this.topNotificy();
        // 顶部导航条设置
        let type = this.$route.query.type;
        let self = this;
        let conf = JSON.stringify({
            "title": this.planName,
            "left": {
                "iconType": "back"
            }
        });
        window.tdfire.configNavigationBar(conf);
        if (tdfire.requirePlugins) {
            eval(tdfire.requirePlugins(["observe"]))
            console.log(tdfire.requirePlugins(["observe"]))
        }
        window.tdfire.observe(function (data) {
            if (data && data.type == "left") {
                if (type == 1) {
                    self.$router.push({
                        path: 'index'
                    })
                } else window.tdfire.pop();
            }
        })  
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/border";
.overflow {
    overflow: hidden;
}

.info-wrap {
    padding: 24px 30px;
    margin-top: 72px;
    background: #ffffff;
    .brief {
        font-size: 30px;
        color: #333333;
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .cover {
        height: 398px;
        margin-top: 20px;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}

.market-sketch {
    background: #FFFFFF;
    @extend .border-top;
    padding: 0 0 128px;
    // margin-top: 20px;
    .title {
        font-size: 30px;
        color: #333333;
        padding: 24px 0 20px;
    }
    .picture>img {
        display: block;
        width: 100%;
    }
}

.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 128px;
    background: #FFFFFF;
    @extend .border-top;
    .btn {
        width: 600px;
        height: 88px;
        line-height: 88px;
        background: #0088FF;
        border-radius: 12px;
        font-size: 30px;
        color: #FFFFFF;
        text-align: center;
        margin: 24px auto;
    }
}
</style>
