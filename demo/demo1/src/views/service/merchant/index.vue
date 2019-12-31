<template>
    <div>
        <OpenTitle :title="pageTitle"></OpenTitle>
        <div class="wrap">

            <!--店铺信息-->
            <ul class="detail-list">
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.shopNum }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.shopCode}}
                  </span>
                </li>

                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.shopId }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.entityId}}
                  </span>
                </li>
                <!-- <li class="list-item">
                  <span class="item-label">
                      {{ pageText.appkey }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.appKey}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.appSecret }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.appSecret}}
                  </span>
                </li>
               <li class="list-item">
                  <span class="item-label">
                      {{ pageText.apiAddress }}
                  </span>
                    <span class="item-text">
                        <Input v-model="shopInfo.url" style="width: 200px" ></Input>
                  </span>
                </li>-->
                <li class="list-item">
                  <span class="item-label">
                      {{pageText.state }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.authenticateStatusStr}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{pageText.pattern }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.joinModeStr}}
                  </span>
                </li>
            </ul>
             <!--<div class="btn">
                <Button class="" type="primary" @click='present'>{{pageText.btn}}</Button>
            </div>-->
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";

    let pageData = {
      pageTitle:_i('SERVICE.MERCHANT.DETAILS.TITLE'),
        pageText: {
            shopNum:_i('SERVICE.MERCHANT.DETAILS.SHOPNUM'),
            shopId: _i('SERVICE.MERCHANT.DETAILS.SHOPID'),
            /*appkey: _i('VERIFY.APP.DETAILS.PROPSER.APPKEY'),
            appSecret: _i('VERIFY.APP.DETAILS.PROPSER.APPSECRET'),
            apiAddress: _i('VERIFY.APP.DETAILS.PROPSER.APIADDRESS'),*/
            state: _i('VERIFY.APP.DETAILS.PROPSER.STATE'),
            pattern: _i('VERIFY.APP.DETAILS.PROPSER.PATTERN'),
            btn:_i('SERVICE.MERCHANT.DETAILS.BTN'),
            
        },

        shopInfo: {
            shopCode: '',
            entityId: '',
            appKey: '',
            appSecret: '',
            url:'',
            authenticateStatusStr:'',
            joinModeStr:'',
        },
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            OpenTitle: require("@/components/open-title.vue"),
        },
        methods: {
            getShopInfo() {
               Requester.get(API.MER_DETAILS).then((data) => {
                   this.shopInfo = data
               }).catch((e) => {
                   catchError(e)
               });

            },
            // 提交
            present(){
                let url=this.shopInfo.url
                if(url){
                    if (!(/^http:\/\/|https:\/\//.test(url)) ){
                        this.$Message.error('请输入正确格式 ！');
                        return
                    }
                }
                Requester.post(API.MERCHANT_URL,this.shopInfo.url).then((data) => {
                   this.$Message.success(_i('VERIFY.APP.MATERIAL.SUBMIT.SUCCESS'));
                   this.getShopInfo()
               }).catch((e) => {
                   catchError(e)
               });
            }

        },
        created() {
            this.getShopInfo()
        }
    }
</script>


<style lang="scss" scoped="">

    .wrap {
        max-width: 1273px;
        margin-left: 0px;

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
    .btn{
      width: 100%;
      text-align: center;
      margin-top: 45px;
  }
</style>

