<template>
<div class="preview-wrap">
    <a class="back"><img src="../../images/back.png"/>返回</a>
    <div class="list-wrap">
        <div class="title">
            <img src="../../images/canju.png" />
            <p class="name">{{activity_title}}</p>
        </div>
        <div class="shop-info">
            <img :src="shop.shop_logo" v-if="isShow(shop.shop_logo)" />
            <div>
                <p class="name">{{shop.shop_name}}</p>
                <p class="address">{{shop.shop_address}}</p>
            </div>
        </div>
        <div class="list" v-html="content" v-if="isShow(graphic_detail)"></div>
        <div class="no-list" v-if="!isShow(graphic_detail)">
            <div class="line"></div>
            <img src="../../images/advance.png" v-if="isShow(couponList.length)" />
            <p class="tip" v-if="isShow(couponList.length)">尊敬的顾客：<br> 为了回馈您一直以来的关照，我们特意赠送您<span class="num">{{couponList.length}}</span>张活动优惠券，期待您的光临！</p>
            <p class="tip" v-if="!isShow(couponList.length)">尊敬的顾客：<br>感谢您一直以来对本店的关照，祝福您生活愉快，身体健康！本店期待您的再次光临!</p>
        </div>
    </div>
    <div class="coupon-wrap" v-if='isShow(couponList)'>
        <div class="title">已获得以下优惠券</div>
        <div class="list">
            <coupon :list="couponList"></coupon>
            <div class="btn-wrap">
                <a>去店里看看</a>
                <a>查看我的优惠券</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import coupon from "../../components/coupon.vue";
import API from '../../config/api';
const Router = require("@2dfire/utils/router");
export default {
    data() {
        return {
            content: "",
            activity_title: "",
            shop: {
                shop_logo: "",
                shop_name: "",
                shop_address: "",
            },
            graphic_detail: [],
            couponList: [],
            backgroundImage: Router.route.query["backgroundImage"] || "",
        }
    },
    methods: {
        // 优惠券从客户端取
        getCouponList() {
            let list = Router.route.query.couponList;
            this.couponList = JSON.parse(decodeURI(list));
        },
        // 图片文案调用后台接口
        getPreviewData() {
            let {
                plan_id,
                entity_id
            } = Router.route.query;
            let params = {
                plan_id: plan_id || "341676573029680027",
                entity_id: entity_id
            }
            API.previewData(params).then(d => {
                if (d) {
                    this.formateData(d);
                    this.getList();
                }
            })
        },
        // 获取图文列表
        getList() {
            this.content = '';
            this.graphic_detail.forEach(item => {
                if (item.type == 1) {
                    this.content += `<p style="font-size: 14px;color: #333333;line-height: 20px;margin: 10px 0;">${item.content}</p>`;
                }
                if (item.type == 2) {
                    this.content += `<div style="border-top: 1PX solid #D7D7D7;margin: 10px 0;"></div>`;
                }
                if (item.type == 3) {
                    // this.content += `<img src="${item.content}" alt="" styles="width: 100%;display:block;">`;
                    this.content += `<img src="${this.backgroundImage}" alt="" style="width: 100%;display:block;">`;
                }
            })
        },
        formateData(d) {
            this.activity_title = d.activityTitle;
            this.shop.shop_address = d.shop.shopAddress;
            this.shop.shop_logo = d.shop.shopLogo;
            this.shop.shop_name = d.shop.shopName;
            this.graphic_detail = [];
            d.graphicDetail.map(v => {
                this.graphic_detail.push({
                    content: v.content || "",
                    type: v.type,
                });
            })
        },
        isShow(msg) {
            if (msg == "" || msg == undefined || msg == null || msg == [] || msg == 0) return false;
            else return true;
        }
    },
    components: {
        coupon
    },
    created() {
        document.title = "活动详情";
        this.getCouponList();
        this.getPreviewData();
    }
}
</script>

<style lang="scss" scoped>
.preview-wrap {
    background-image: url("../../../base/images/globalBg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100%;
    padding: 30px 20px;
    position: relative;
}

.display_flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.back {
    position: absolute;
    top: 20px;
    left: 20px;
    @extend .display_flex;
    background: rgba(153, 153, 153, 0.6);
    width: 144px;
    height: 60px;
    font-size: 24px;
    border-radius: 45px;
    color: #ffffff;

    img {
        width: 34px;
        height: 34px;
    }
}

.list-wrap {
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);

    .title {
        height: 98px;
        background: url("../../images/title.png") no-repeat center;
        background-size: cover;
        font-size: 36px;
        color: #FFFFFF;
        @extend .display_flex;

        img {
            width: 32px;
            height: 44px;
            margin-right: 20px;
        }
    }

    .shop-info {
        @extend .display_flex;
        height: 84px;
        font-size: 28px;
        color: #333333;

        img {
            width: 60px;
            height: 60px;
            margin-right: 16px;
            border-radius: 5px;
        }

        .address {
            font-size: 24px;
            color: #999999;
        }
    }

    .list,
    .no-list {
        padding: 0 24px 24px;
    }

    .no-list {
        .line {
            border-top: 1PX solid #d7d7d7;
            margin: 20px 0;
        }

        img {
            display: block;
            width: 100%;
            margin: 0 auto;
        }

        .tip {
            font-size: 24px;
            margin: 20px 0;
        }
    }
}

.coupon-wrap {
    .title {
        width: 314px;
        height: 50px;
        border-radius: 45px;
        color: #ffffff;
        background: rgba(153, 153, 153, 0.4);
        margin: 40px auto 24px;
        text-align: center;
        line-height: 50px;
        font-size: 24px;
    }

    .list {
        border-radius: 8px;
        background: #f3f2f2;
        padding: 24px 20px;
    }

    .btn-wrap a {
        display: block;
        width: 646px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        border: 1PX solid #C8C8C8;
        border-radius: 200px;
        margin: 24px auto;
        color: #666666;
        background: url("../../images/arrow.png") no-repeat;
        background-position: 97% 40%;
        background-size: 46px;
    }

    .btn-wrap a:nth-child(1) {
        margin-top: 32px;
    }
}
</style>
