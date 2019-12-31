<template>
    <div class="app">
        <OpenTitle :title="pageTitle" :state='pageState'></OpenTitle>
        <div class="details-box">
            <h2>{{propser}}</h2>
            <Form   :label-width="136" label-position="left">
                <FormItem  class="label">
                    <label for="" >{{propser_account}}</label>
                    <Input v-model="pageAuth.userName" disabled></Input>
                </FormItem>
                <!--<FormItem  class="label">
                    <label for="" >{{propser_appkey}}</label>
                    <Input v-model="pageAuth.appKey" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" >{{propser_appsecret}}</label>
                    <Input v-model="pageAuth.appSecret" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" >{{propser_apiaddress}}</label>
                    <Input v-model="pageAuth.extUrl" disabled></Input>
                </FormItem>-->
                <FormItem  class="label">
                    <label for="" >{{propser_state}}</label>
                    <Input v-model="pageAuth.status" disabled></Input>
                </FormItem>

                <FormItem  class="label underline">
                    <label for="" >{{propser_pattern}}</label>
                    <Input v-model="pageAuth.joinType" disabled></Input>
                </FormItem>

                <FormItem  class="label">
                    <label for="" class="required">{{propser_name}}</label>
                    <Input v-model="pageInfo.name" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_company}}</label>
                    <Input v-model="pageInfo.companyName" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_department}}</label>
                    <Input v-model="pageInfo.departmentName" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_telephone}}</label>
                    <Input v-model="pageInfo.mobile" disabled></Input>
                </FormItem>

                <FormItem  class="label">
                    <label for="" class="required">{{propser_phone}}</label>
                    <Input v-model="pageInfo.telephone" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_address}}</label>
                    <Input v-model="pageInfo.companyAddress" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_email}}</label>
                    <Input v-model="pageInfo.email" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{propser_idnumber}}</label>
                    <Input v-model="pageInfo.idCard" disabled></Input>
                </FormItem>
                <label for="" class="required_self">{{propser_idfront}}</label>
                <div class="img-box">
                   <img :src="pageInfo.idCardPositiveImgUrl" alt="">
                </div>
                <label for="" class="required_self">{{propser_idcontrary}}</label>
                <div class="img-box">
                    <img :src="pageInfo.idCardNegativeImgUrl" alt="">
                </div>

                <!--
                    企业资质信息
                -->
                <h2>{{aptitude}}</h2>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_company}}</label>
                    <Input v-model="pageInfo.businessLicenceName" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_ifwork}}</label>
                    <Input v-model="pageInfo.organizationCodeCertificate" disabled></Input>
                </FormItem>

                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_name}}</label>
                    <Input v-model="pageInfo.legalRepresentativeName" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_blregistration}}</label>
                    <Input v-model="pageInfo.businessLicenceNumber" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_aladdress}}</label>
                    <Input v-model="pageInfo.businessLicenceAddress" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_bldate}}</label>
                    <Input v-model="pageInfo.businessLicenceExpiry" disabled></Input>
                </FormItem>
                <FormItem  class="label">
                    <label for="" class="required">{{aptitude_bscope}}</label>
                    <Input v-model="pageInfo.businessLicenceScope" disabled></Input>
                </FormItem>
                <FormItem class="label">
                    <label for="">{{aptitude_scale}}</label>
                    <Input v-model="pageInfo.businessScale" disabled></Input>
                </FormItem>
                <label for="" class="required_self">{{aptitude_ifworkid}}</label>
                <div class="img-box">
                    <img :src="pageInfo.organizationCodeCertificateImgUrl" alt="">
                </div>
                <label for="" class="required_self">{{aptitude_blimg}}</label>
                <div class="img-box">
                   <img :src="pageInfo.businessLicenceImgUrl " alt="">
                </div>
            </Form>
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
        pageTitle:_i('VERIFY.TITLE'),
        pageState:_i('VERIFY.SUCCESS'),
        propser:_i ('VERIFY.APP.MATERIAL.PROPSER'),

        propser_account:_i('VERIFY.APP.DETAILS.PROPSER.ACCOUNT'),
       /* propser_appkey:_i('VERIFY.APP.DETAILS.PROPSER.APPKEY'),
        propser_appsecret:_i('VERIFY.APP.DETAILS.PROPSER.APPSECRET'),
        propser_apiaddress:_i('VERIFY.APP.DETAILS.PROPSER.APIADDRESS'),*/
        propser_state:_i('VERIFY.APP.DETAILS.PROPSER.STATE'),
        propser_pattern:_i('VERIFY.APP.DETAILS.PROPSER.PATTERN'),

        propser_name:_i  ('VERIFY.APP.MATERIAL.PROPSER.NAME'),
        propser_name_info:_i  ('VERIFY.APP.MATERIAL.PROPSER.NAME.INFO'),
        propser_company:_i  ('VERIFY.APP.MATERIAL.PROPSER.COMPANY'),
        propser_department:_i  ('VERIFY.APP.MATERIAL.PROPSER.DEPARTMENT'),
        propser_telephone:_i  ('VERIFY.APP.MATERIAL.PROPSER.TELEPHONE'),
        propser_phone:_i  ('VERIFY.APP.MATERIAL.PROPSER.PHONE'),
        propser_phone_info:_i  ('VERIFY.APP.MATERIAL.PROPSER.PHONE.INFO'),
        propser_address:_i  ('VERIFY.APP.MATERIAL.PROPSER.ADDRESS'),
        propser_email:_i  ('VERIFY.APP.MATERIAL.PROPSER.EMAIL'),
        propser_email_info:_i  ('VERIFY.APP.MATERIAL.PROPSER.EMAIL.INFO'),
        propser_idnumber:_i  ('VERIFY.APP.MATERIAL.PROPSER.IDNUMBER'),
        propser_idnumber_info:_i  ('VERIFY.APP.MATERIAL.PROPSER.IDNUMBER.INFO'),
        propser_idfront:_i  ('VERIFY.APP.MATERIAL.PROPSER.IDFRONT'),
        propser_frontimg:_i  ('VERIFY.APP.MATERIAL.PROPSER.FRONTIMG'),
        propser_idfront_info:_i  ('VERIFY.APP.MATERIAL.PROPSER.IDFRONT.INFO'),
        propser_idcontrary:_i  ('VERIFY.APP.MATERIAL.PROPSER.IDCONTRARY'),
        propser_contraryimg:_i  ('VERIFY.APP.MATERIAL.PROPSER.CONTRARYIMG'),

        aptitude:_i  ('VERIFY.APP.MATERIAL.APTITUDE'),
        aptitude_company:_i ('VERIFY.APP.MATERIAL.APTITUDE.COMPANY'),
        aptitude_company_info:_i ('VERIFY.APP.MATERIAL.APTITUDE.COMPANY.INFO'),
        aptitude_ifwork:_i ('VERIFY.APP.MATERIAL.APTITUDE.IFWORK'),
        aptitude_ifwork_info:_i ('VERIFY.APP.MATERIAL.APTITUDE.IFWORK.INFO'),
        aptitude_name:_i ('VERIFY.APP.MATERIAL.APTITUDE.NAME'),
        aptitude_blinfo:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLINFO'),
        aptitude_blregistration:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLREGISTRATION'),
        aptitude_aladdress:_i ('VERIFY.APP.MATERIAL.APTITUDE.ALADDRESS'),
        aptitude_bldate:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLDATE'),
        aptitude_bscope:_i ('VERIFY.APP.MATERIAL.APTITUDE.BSCOPE'),
        aptitude_blsame:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLSAME'),
        aptitude_scale:_i ('VERIFY.APP.MATERIAL.APTITUDE.SCALE'),
        aptitude_staffnum:_i ('VERIFY.APP.MATERIAL.APTITUDE.STAFFNUM'),
        aptitude_ifworkid:_i ('VERIFY.APP.MATERIAL.APTITUDE.IFWORKID'),
        aptitude_effrange:_i ('VERIFY.APP.MATERIAL.APTITUDE.EFFRANGE'),
        aptitude_require:_i ('VERIFY.APP.MATERIAL.APTITUDE.REQUIRE'),
        aptitude_imgstyle:_i ('VERIFY.APP.MATERIAL.APTITUDE.IMGSTYLE'),
        aptitude_blimg:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLIMG'),
        aptitude_blrequire:_i ('VERIFY.APP.MATERIAL.APTITUDE.BLREQUIRE'),
        aptitude_selectimg:_i ('VERIFY.APP.MATERIAL.APTITUDE.SELECTIMG'),
        aptitude_btn:_i ('VERIFY.APP.MATERIAL.APTITUDE.BTN'),
        pageAuth:{
            userName:'',
            appKey:'',
            appSecret:'',
            extUrl:'',
            status:'',
            joinType:'',
        },
        pageInfo:{
            name:'',
            companyName:'',
            departmentName:'',
            mobile:'',
            telephone:'',
            companyAddress:'',
            email:'',
            idCard:'',
            idCardPositiveImgUrl:'',
            idCardNegativeImgUrl:'',

            businessLicenceName:'',
            organizationCodeCertificate:'',
            legalRepresentativeName:'',
            businessLicenceNumber:'',
            businessLicenceAddress:'',
            businessLicenceExpiry:'',
            businessLicenceScope:'',
            businessScale :'',
            organizationCodeCertificateImgUrl:'',
            businessLicenceImgUrl :''
        },              
    }
    export default {
        data() {
            return pageData;
        },
        components: {
             OpenTitle: require("@/components/open-title.vue"),
        },
        methods: {
            getPageInfo() {
               Requester.get(API.VER_DETAILS,).then((data) => {
                   this.pageInfo = data.dev;
                   this.pageAuth=data.entityAuth
                   this.pageAuth.status=this.status(this.pageAuth.status)
                   this.pageAuth.joinType=this.joinType(this.pageAuth.joinType)
               }).catch((e) => {
                   catchError(e)
               });

            },
             status(num){
              switch (num){
                case 1:
                return '申请中'
                break;
                case 2:
                return '通过 '
                break;
                case 3:
                return '异常 '
                break;
                case 4:
                return '关闭'
                break;
              }
            },
            joinType(type){
              switch (type){
                case 1:
                return '单店'
                break;
                case 2:
                return '连锁' 
                break;
                case 3:
                return '开发者'
                break;
              }
            },
        },
        created() {
            this.getPageInfo()
        }
    }

</script>

<style lang="scss" scoped="">
    .details-box {
        width: 480px;
        margin: 0 auto;
        color: #333333;
        padding-bottom: 60px;
    }
    
    .details-box h2 {
        font-family: PingFangSC-Medium;
        margin-top: 50px;
        font-size: 16px;
        padding-bottom: 15px;
        border-bottom: 1px solid #DEDEDE;
    }
    
    .details-box input[type='text'],
    .img-box {
        width: 340px;
        height: 34px;
        margin-top: 18px;
        border: 1px solid #DEDEDE;
        border-radius: 2px;
    }
    .img-box img{
        width: 100%;
        height: 100%;
    }
    .details-box input[type='text'] {
        padding: 0 10px;
    }
    
    .label label {
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        position: absolute;
        left: -136px;
    }
    
    .required_self {
        width: 136px;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        vertical-align: top;
        margin-top: 24px;
    }
    
    .required::before,
    .required_self::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50px;
        background: #B11A1B;
        position: relative;
        left: -5px;
        top: -4px;
    }
    
    .img-box {
        height: 189px;
        display: inline-block;
        text-align: center;
    }
    
    .ivu-icon {
        position: absolute;
        top: 33px;
        left: 0;
        font-size: 20px;
        width: 100%;
        text-align: center;
        color: #999999;
    }
    
    .img-left {
        width: 102px;
        background: #F9F9F9;
        border: 1 solid #DEDEDE;
        border-radius: 2px;
        height: 107px;
        position: relative;
    }
    
    .img-left input {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        opacity: 0;
    }
     
    .details-btn {
        width: 100%;
        margin: 45px auto 67px auto;
        text-align: center;
        font-size: 14px;
    }
    
    .btn {
        background: #C42022;
        border-radius: 4px;
        color: #fff;
        width: 86px;
        height: 34px;
        border-width: 0;
    }
    
    .label {
        height: 34px;
        margin: 18px 0 0 0;
        position: relative;
    }
    .underline{
        box-sizing: content-box;
        padding-bottom: 18px;
        border-bottom: 1px dashed #DEDEDE;
    }
</style>
