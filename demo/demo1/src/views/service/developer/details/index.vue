<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">

            <!--店铺信息-->
            <ul class="detail-list">
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.name }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.name}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.company }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.companyName}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.department }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.departmentName}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.telPhone }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.mobile}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.phone }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.telephone}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText. address }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.companyAddress}}
                  </span>
                </li>
                <li class="list-item">
                  <span class="item-label">
                      {{ pageText.email }}
                  </span>
                    <span class="item-text">
                      {{shopInfo.email}}
                  </span>
                </li>

            </ul>

            <!--所获权限-->
            <div class="rights-box">
               <p class="rights-list-title"> {{ pageText.rightsTitle }}</p> 
                <ul>
                    <li v-for="item in appRights">
                        <Checkbox v-model='item.granted' v-if='item.isOpen==1?true:false'>
                        <span class="right-name">获取您的{{item.rightsNm}}</span></Checkbox>
                        <Checkbox v-model='item.granted' v-else disabled>
                        <span class="right-name">获取您的{{item.rightsNm}}</span></Checkbox>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <Button class="" type="primary" @click='agree'>{{pageText.btn}}</Button>
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
            name: _i('SERVICE.DEVELOPER.DETAILS.NAME'),
            company: _i('SERVICE.DEVELOPER.DETAILS.COMPANY'),
            department: _i('SERVICE.DEVELOPER.DETAILS.DEPARTMENT'),

            telPhone: _i('SERVICE.DEVELOPER.DETAILS.TELEPHONE'),
            phone: _i('SERVICE.DEVELOPER.DETAILS.PHONE'),
            address: _i('SERVICE.DEVELOPER.DETAILS.ADDRESS'),
            email: _i('SERVICE.DEVELOPER.DETAILS.EMAIL'),
            rightsTitle: _i('SERVER.APPS.DETAIL.RIGHTS.TITLE'),
            btn:_i('SERVICE.DEVELOPER.DETAILS.BTN'),
        },

        shopInfo: {
            name: '',
            companyName: '',
            departmentName: '',
            mobile:'',
            telephone:'',
            companyAddress:'',
            email:'',
        },

        appRights: [],
        params:{
            authId:'',
            devInfoId:'',
            appInfoId:''
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
               Requester.get(API.DEV_DETAILS, {params: this.params}).then((data) => {
                   this.shopInfo = data.developerInfoVo;
                   this.appRights=data.shopAppInfoRightsVoList
               }).catch((e) => {
                   catchError(e)
               });

            },
            init(){
                this.params.authId= Route.route.query["authId"];
                this.params.devInfoId= Route.route.query["devInfoId"];
                this.params.appInfoId= Route.route.query["appInfoId"];
            },
            // 同意授权
            agree(){
                let that=this
                let devAuthId=that.params.authId  
                let appInfoId=that.params.appInfoId
                let bindRightsId=[]
                 that.appRights.forEach(item=>{
                    if(item.granted){
                        bindRightsId.push(item.rightsId)
                    }
                })
                bindRightsId=bindRightsId.join(',')
                Requester.get(API.SHOP_ACCREDIT,{params:{devAuthId,appInfoId,bindRightsId}}).then((data) => {
                 this.$Message.success('授权成功');
                 this.getShopInfo()
                }).catch((e) => {
                    catchError(e)
                });
            }
        },
        created() {
            this.init()
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
        max-width: 1273px;
        margin-left: 0px;

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

    .rights-box{
        margin-top: 15px;

        .rights-list-title{
            font-size: 14px;
            color: #333;
            margin-bottom: 10px;
        }

        .right-name{
            margin-left: 7px;
            color: #333333;
        }
    }
  .btn{
      width: 100%;
      text-align: center;
      margin-top: 45px;
  }
</style>

