<template>
    <div class="app">
        <OpenTitle :title="pageTitle" :state='pageState'></OpenTitle>
        <div class="details-box">
            <h2>{{propser}}</h2>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="136" label-position="left">
                <FormItem prop="name" class="label">
                    <label for="" class="required">{{propser_name}}</label>
                    <Input v-model.trim="formValidate.name" :placeholder="propser_name_info"></Input>
                </FormItem>
                <FormItem prop="companyName" class="label">
                    <label for="" class="required">{{propser_company}}</label>
                    <Input v-model.trim="formValidate.companyName"></Input>
                </FormItem>
                <FormItem prop="departmentName" class="label">
                    <label for="" class="required">{{propser_department}}</label>
                    <Input v-model.trim="formValidate.departmentName"></Input>
                </FormItem>
                <FormItem prop="mobile" class="label">
                    <label for="" class="required">{{propser_telephone}}</label>
                    <Input v-model.trim="formValidate.mobile"></Input>
                </FormItem>

                <FormItem prop="telephone" class="label">
                    <label for="" class="required">{{propser_phone}}</label>
                    <Input v-model.trim="formValidate.telephone" :placeholder="propser_phone_info"></Input>
                </FormItem>
                <FormItem prop="companyAddress" class="label">
                    <label for="" class="required">{{propser_address}}</label>
                    <Input v-model.trim="formValidate.companyAddress"></Input>
                </FormItem>
                <FormItem prop="email" class="label">
                    <label for="" class="required">{{propser_email}}</label>
                    <Input v-model.trim="formValidate.email" :placeholder="propser_email_info"></Input>
                </FormItem>
                <FormItem prop="idCard" class="label">
                    <label for="" class="required">{{propser_idnumber}}</label>
                    <Input v-model.trim="formValidate.idCard" :placeholder="propser_idnumber_info"></Input>
                </FormItem>
                <label for="" class="required_self">{{propser_idfront}}</label>
                <div class="img-box">
                    <div class="photo-box">
                        <div class="img-left">
                            <div class="photo-frame">
                                <img :src="formValidate.idCardPositiveImgUrl" alt="">
                                <Icon type="image"></Icon>
                            </div>
                            <input type="file" @change='btnIMg($event,1)' class="select-img">
                            <div class="photo-btn">{{aptitude_selectimg}}</div>
                        </div>
                        <div class="img-right">
                            <h4>{{propser_frontimg}}</h4>
                            {{propser_idfront_info}}
                        </div>
                    </div>
                </div>
                <label for="" class="required_self">{{propser_idcontrary}}</label>
                <div class="img-box">
                    <div class="photo-box">
                        <div class="img-left">
                            <div class="photo-frame">
                                <img :src="formValidate.idCardNegativeImgUrl" alt="">
                                <Icon type="image"></Icon>
                            </div>
                            <input type="file" @change='btnIMg($event,2)' class="select-img">
                            <div class="photo-btn">{{aptitude_selectimg}}</div>
                        </div>
                        <div class="img-right">
                            <h4>{{propser_contraryimg}}</h4>
                            {{propser_idfront_info}}
                        </div>
                    </div>
                </div>

                <!--
                    企业资质信息
                -->
                <h2>{{aptitude}}</h2>
                <FormItem prop="businessLicenceName" class="label">
                    <label for="" class="required">{{aptitude_company}}</label>
                    <Input v-model.trim="formValidate.businessLicenceName" :placeholder="aptitude_company_info"></Input>
                </FormItem>
                <FormItem prop="organizationCodeCertificate" class="label">
                    <label for="" class="required">{{aptitude_ifwork}}</label>
                    <Input v-model.trim="formValidate.organizationCodeCertificate" :placeholder="aptitude_ifwork_info"></Input>
                </FormItem>

                <FormItem prop="legalRepresentativeName" class="label">
                    <label for="" class="required">{{aptitude_name}}</label>
                    <Input v-model.trim="formValidate.legalRepresentativeName" :placeholder="aptitude_blinfo"></Input>
                </FormItem>
                <FormItem prop="businessLicenceNumber" class="label">
                    <label for="" class="required">{{aptitude_blregistration}}</label>
                    <Input v-model.trim="formValidate.businessLicenceNumber" :placeholder="aptitude_blinfo"></Input>
                </FormItem>
                <FormItem prop="businessLicenceAddress" class="label">
                    <label for="" class="required">{{aptitude_aladdress}}</label>
                    <Input v-model.trim="formValidate.businessLicenceAddress" :placeholder="aptitude_blinfo"></Input>
                </FormItem>
                <FormItem prop="businessLicenceExpiry" class="label">
                    <label for="" class="required">{{aptitude_bldate}}</label>
                    <Input v-model.trim="formValidate.businessLicenceExpiry" :placeholder="aptitude_blinfo"></Input>
                </FormItem>
                <FormItem prop="businessLicenceScope" class="label">
                    <label for="" class="required">{{aptitude_bscope}}</label>
                    <Input v-model.trim="formValidate.businessLicenceScope" :placeholder="aptitude_blsame"></Input>
                </FormItem>
                <FormItem class="label">
                    <label for="">{{aptitude_scale}}</label>
                    <Input v-model.trim="formValidate.businessScale" :placeholder="aptitude_staffnum"></Input>
                </FormItem>
                <label for="" class="required_self">{{aptitude_ifworkid}}</label>
                <div class="img-box">
                    <div class="photo-box">
                        <div class="img-left">
                            <div class="photo-frame">
                                <img :src="formValidate.organizationCodeCertificateImgUrl" alt="">
                                <Icon type="image"></Icon>
                            </div>
                            <input type="file" @change='btnIMg($event,3)' class="select-img">
                            <div class="photo-btn">{{aptitude_selectimg}}</div>
                        </div>
                        <div class="img-right">
                            {{aptitude_effrange}}<br> {{aptitude_require}}
                            <br> {{aptitude_imgstyle}}
                        </div>
                    </div>
                </div>
                <label for="" class="required_self">{{aptitude_blimg}}</label>
                <div class="img-box">
                    <div class="photo-box">
                        <div class="img-left">
                            <div class="photo-frame">
                                <img :src="formValidate.businessLicenceImgUrl" alt="">
                                <Icon type="image"></Icon>
                            </div>
                            <input type="file" @change='btnIMg($event,4)' class="select-img">
                            <div class="photo-btn">{{aptitude_selectimg}}</div>
                        </div>
                        <div class="img-right">
                            {{aptitude_blrequire}}<br/>
                            {{aptitude_require}}<br/>
                            {{aptitude_imgstyle}}
                        </div>
                    </div>
                </div>
            </Form>
            <div class="details-btn">
                <button type="button" class="btn"  @click="handleSubmit('formValidate')">{{aptitude_btn}}</button>
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
    let rulesOne={required: true, message: '字段不能为空', trigger: 'change' }
    const validatePhone = (rule, value, callback) => {
           if (!(/^1[3|4|5|8|7|6][0-9]\d{8}$/.test(value)) ) {
               callback(new Error('请输入正确格式 !'))
           } else {
               callback();
           }
    };
    const validateNum = (rule, value, callback) => {
           if (!(/^[0-9]\d*$/.test(value)) ) {
               callback(new Error('请输入正确格式 !'))
           } else {
               callback();
           }
    };
    const validateId = (rule, value, callback) => {
           if (!(/^[A-Za-z0-9]+$/.test(value)) ) {
               callback(new Error('请输入正确格式 !'))
           } else {
               callback();
           }
    }
    let pageData = {
        pageTitle:_i('VERIFY.TITLE'),
        pageState:_i('VERIFY.LOSE'),
        propser:_i ('VERIFY.APP.MATERIAL.PROPSER'),
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
        formValidate: {
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
        ruleValidate: {
                    name: [
                        rulesOne,
                        { type: 'string', max: 8, message: '您输入的字符过长', trigger: 'change' },

                    ],
                    companyName: [
                        rulesOne,
                        { type: 'string', max: 22, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    departmentName: [
                        rulesOne,
                        { type: 'string', max: 22, message: '您输入的字符过长', trigger: 'change' },
                    ],

                    mobile: [
                        rulesOne,
                        {validator:validateNum,trigger: 'change'},
                        { type: 'string', max: 20, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    telephone: [
                        rulesOne,
                        { validator: validatePhone, trigger: 'change' },
                        { type: 'string', max: 20, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    companyAddress: [
                       rulesOne,
                       { type: 'string', max: 127, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    email: [
                        rulesOne,
                        { type: 'email', message: '请输入正确格式', trigger: 'change' },
                        { type: 'string', max: 45, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    idCard: [
                        rulesOne,
                        {validator:validateId,trigger: 'change'},
                        { type: 'string', max: 45, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    businessLicenceName: [
                        rulesOne,
                        { type: 'string', max: 22, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    organizationCodeCertificate: [
                        rulesOne,
                        { type: 'string', max: 45, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    legalRepresentativeName: [
                        rulesOne,
                        { type: 'string', max: 8, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    businessLicenceNumber: [
                        rulesOne,
                        { type: 'string', max: 45, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    businessLicenceAddress: [
                        rulesOne,
                        { type: 'string', max: 127, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    businessLicenceExpiry: [
                       rulesOne,
                       { type: 'string', max: 16, message: '您输入的字符过长', trigger: 'change' },
                    ],
                    businessLicenceScope: [
                        rulesOne,
                        { type: 'string', max: 250, message: '您输入的字符过长', trigger: 'change' },
                    ],
        }
    }
    export default {
        data() {
            return pageData;
        },
        components: {
            OpenTitle: require("@/components/open-title.vue"),
        },
        methods: {
            getOnloadFunc(aImg) {
                return function (evt) {
                    aImg.src = evt.target.result;
                }
            },
            btnIMg(event,id) {
                let input = event.target
                for (var i = 0, numFiles = input.files.length; i < numFiles; i++) {
                    var file = input.files[0];
                    if (!file.type.match(/image.*/)) {
                        this.$Message.error('请选择正确的图片格式 !');
                        continue;
                    }
                    if(file.size>5*1024*1024){
                        this.$Message.error('大小不能超过5M !');
                        continue;
                    }
                    var formData = new FormData();
                    formData.append("file", file);
                    Requester.post(API.IMG_UPLOAD, formData, {
                         processData: false
                     }, {
                         contentType: false
                     })
                     .then((res)=>{
                        switch(id){
                            case 1:
                            this.formValidate.idCardPositiveImgUrl=res
                            break;
                            case 2:
                            this.formValidate.idCardNegativeImgUrl=res
                            break;
                            case 3:
                            this.formValidate.organizationCodeCertificateImgUrl=res
                            break;
                            case 4:
                            this.formValidate.businessLicenceImgUrl=res
                            break;
                        }
                     }).catch((e) => {
                         catchError(e)
                    });
                }
            },
            handleSubmit (name) {
                var self=this.formValidate
                var select_Img=[self.idCardPositiveImgUrl,self.idCardNegativeImgUrl,self.organizationCodeCertificateImgUrl,self.businessLicenceImgUrl];
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    for(var a=0;a<select_Img.length;a++){
                    if(select_Img[a]==''){
                        this.$Message.error('图片不能为空 !');
                        return
                    }
                }
                    this.$Message.success(_i('VERIFY.APP.MATERIAL.SUBMIT.SUCCESS'));
                    Requester.post(API.DEV_APPROVE, this.formValidate).then((data) => {
                      this.$router.push({
                      path: 'server_verify',
                   });
                }).catch((e) => {
                    catchError(e)
                });
                    } else {
                        this.$Message.error('提交失败 !');
                    }
                })
            },
        },
        created() {
        }
    }

</script>

<style lang="scss" scoped="">
    .details-box {
        width: 480px;
        margin: 0 auto;
        color: #333333;
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
        padding: 0 15px;
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

    .photo-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .photo-frame {
        width: 100%;
        height: 86px;
        position: relative;
    }

    .photo-frame img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 5;
        left: 0;
        top: 0;
    }

    .photo-btn {
        width: 100%;
        height: 21px;
        background: #C42022;
        border-radius: 0 0 2px 2px;
        position: absolute;
        bottom: 0;
        color: #fff;
    }

    .img-right {
        text-align: left;
        width: calc(100% - 117px);
        margin-left: 15px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
    }

    .img-right h4 {
        font-size: 14px;
        line-height: 28px;
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
</style>
