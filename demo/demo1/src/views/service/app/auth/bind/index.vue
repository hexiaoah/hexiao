<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">

            <!--店铺信息-->
            <ul class="detail-list">
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.entityId }}
                  </span>
                    <span class="item-text">
                      {{ shopInfo.entityId }}
                  </span>
                </li>

                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.shopName }}
                  </span>
                    <span class="item-text">
                      {{ shopInfo.shopName }}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.contact }}
                  </span>
                    <span class="item-text">
                      {{ shopInfo.linkMan }}
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
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.third }}
                  </span>
                    <span class="item-text">
                        <Input v-model="shopInfo.shopId" style="width: 200px"
                               @on-enter="bindThird"></Input>
                        <!-- shopId 为空时，按钮置灰不可点击 -->
                <Button class="search-btn" @click="bindThird" type="primary" :disabled="!shopInfo.shopId">{{pageText.bindBtn}}</Button>
                  </span>
                </li>
            </ul>


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
            entityId:_i('SERVER.APPS.BIND.LIST.ENTITYID'),
            shopName: _i('SERVER.APPS.BIND.LIST.SHOPNAME'),
            contact: _i('SERVER.APPS.BIND.LIST.CONTACT'),
            phone: _i('SERVER.APPS.BIND.LIST.PHONE'),
            third: _i('SERVER.APPS.BIND.LIST.THIRD'),
            bindBtn: _i('SERVER.APPS.BIND.LIST.BINDBTN'),
        },

        shopInfo: {
            entityId: '',
            shopName: '',
            contact: '',
            phone: '',
            third: ''
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

            getShopInfo() {
                Requester.get(API.GET_APP_AUTH_DETAIL, {params: this.params}).then((data) => {
                    this.shopInfo = data;
                }).catch((e) => {
                    catchError(e)
                });
//                this.shopInfo.entityId = '1000233';
//                this.shopInfo.shopName = '肯德基';
//                this.shopInfo.contact = '山德上校';
//                this.shopInfo.phone = '400823823';
//                this.shopInfo.third = '8800022';

            },
//            绑定第三方店铺id
            bindThird () {
                let self = this;
                let params = {
                    entityId : self.params.entityId,
                    shopId: self.shopInfo.shopId
                }
                Requester.post(API.RELATE_SHOP, params,  { emulateJSON: true }).then((data) => {
                    self.$Message.success('绑定第三方店铺成功');
                    self.getShopInfo()
                }).catch((e) => {
                    catchError(e)
                });
            },
            //            初始化 获取url中的参数
            init(){
                this.params.appId = Route.route.query["appId"];
                this.params.entityId = Route.route.query["entityId"];
            },
        },
        created() {
            this.init();
            this.getShopInfo()
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
            .item-text{
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
</style>

