<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">

            <!--店铺信息-->
            <ul class="detail-list">
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.shopName }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.shopName}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.contact }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.linkMan}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.phone }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.phone}}
                  </span>
                </li>
            </ul>

            <!--所获权限-->
            <div class="rights-box">
                <p class="rights-list-title"> {{ pageText.rightsTitle }}</p>

                <ul>
                    <li v-for="item in shopInfo.entityConfigRightsList">
                        <label>
                            <!-- 选中图标 仅展示 -->
                            <Icon type="android-checkbox" class="right-checkbox"></Icon>
                            <span class="right-name">{{item.rightsName}}</span></label>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";
    import Route from "@2dfire/utils/router";

    let pageData = {
        pageText: {
            shopName: _i('SERVER.APPS.DETAIL.LIST.SHOPNAME'),
            contact: _i('SERVER.APPS.DETAIL.LIST.CONTACT'),
            phone: _i('SERVER.APPS.DETAIL.LIST.PHONE'),
            rightsTitle: _i('SERVER.APPS.DETAIL.RIGHTS.TITLE')
        },

        shopInfo: {
            shopName: '',
            linkMan: '',
            phone: '',
            entityConfigRightsList: []
        },

        params: {
            appId: '',
            entityId: ''
        }

    };

    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
        },
        methods: {
//            初始化获取 appId、entityId
            init() {
                this.params.appId = Route.route.query["appId"];
                this.params.entityId = Route.route.query["entityId"];
            },
//            获取商家详情
            getShopInfo() {
                let self = this;
                Requester.get(API.GET_APP_SHOP_DETAIL, {params: this.params}).then((data) => {
                    self.shopInfo = data;
                }).catch((e) => {
                    catchError(e)
                });
//                this.shopInfo.shopName = '肯德基';
//                this.shopInfo.contact = '山德上校';
//                this.shopInfo.phone = '400823823';
            }
        },
        created() {
            this.init();
            this.getShopInfo();
        }
    }
</script>


<style lang="scss" scoped="">

    .wrap {
        min-width: 100%;
        margin: 0 auto;

        text-align: left;

        padding: 20px 0;

        overflow: auto;

    }

    .detail-list {
        width: 100%;
        margin: 0 auto;

        .list-item {
            .item-label {
                display: inline-block;
                width: 160px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-right: 1px solid #DEDEDE;

                font-size: 14px;
                color: #333333;

            }
            .item-text {
                padding: 0 50px;
                font-size: 12px;
            }
            border: 1px solid #DEDEDE;
            border-top: 0;

            &:first-child {
                border-top: 1px solid #DEDEDE;
            }
        }
    }

    .rights-box {
        margin-top: 15px;

        .rights-list-title {
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
        }

        .right-checkbox {
            vertical-align: middle;
            color: #DEDEDE;
            font-size: 13px;
        }

        .right-name {
            margin-left: 7px;
            color: #333333;
        }
    }
</style>

