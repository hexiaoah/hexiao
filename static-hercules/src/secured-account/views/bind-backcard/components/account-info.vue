<template>
    <div class="index-warp">
        <div class="head-warp">
            <p class="mes-info">为保证打卡成功，只支持以下银行：中国银行、农业银行、工商银行、建设银行、交通银行、华夏银行、光大银行、招商银行、中信银行、兴业银行、民生银行、广发银行、浦发银行</p>
        </div>
        <section class="main">
            <ul class="input-main border-b border-t">

                <info-input :title="'开户人名称'" :input-name="'accountName'" :max-length="'50'"
                :value="merchantInfo.accountName" explain="与开户许可证名称保持一致" />

                <info-input v-if="accountType == '2'" :title="'身份证号'" :input-name="'idCard'" :max-length="'50'"
                :value="merchantInfo.idCard" />

                <info-select :title="'开户银行'" :select-name="'accountBank'"
                :value="merchantInfo.accountBank" />

                <info-input :title="'银行卡号'" :input-name="'accountNumber'" :max-length="'50'"
                :value="merchantInfo.accountNumber" explain="绑定的银行卡为担保交易渠道专用收款账户。"  />

                <info-select :title="'开户省份'" :select-name="'accountAddressProvince'"
                :value="merchantInfo.accountAddressProvince" 
                :parent-id="merchantInfo.accountBankCode" />

                <info-select :title="'开户城市'" :select-name="'accountAddressCity'"
                :value="merchantInfo.accountAddressCity"
                :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode"  />

                <info-select :title="'开户支行'" :select-name="'accountSubBank'"
                :value="merchantInfo.accountSubBank"
                :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode+'&&'+merchantInfo.accountAddressCityCode"  />

                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">申请绑卡公函</span>
                            <span class="example" @click="showExample('https://assets.2dfire.com/frontend/8ef54bd76eba6c2986a7c0b339ce82c1.png')">查看示例图片</span>
                            <span class="content" >必填</span>
                        </div>
                        <info-photo 
                            title="要求：1、撰写书面申请绑卡公函，需包含标题、申请绑定主体信息、申请绑定担保交易渠道专用账户情况描述、操作人员身份信息及联系方式、申请日期、申请人签字并加盖公章；2、拍照上传或者上传扫描文件。" 
                            :ocrType="1"
                            :img-name="'businessLicensePic'"
                            :value="merchantInfo.businessLicensePic" />
                    </li>
                </div>

                <info-input :title="'手机号码'" :input-name="'userTelNumber'" :max-length="'50'"
                :value="merchantInfo.userTelNumber" explain="请填写银行预留手机号码。" />

                <div class=" input-wrapper code border-b">
                    <li class="input-list required">
                        <span>验证码</span>
                        <a class="btn-code" v-if='flag' @click='btnCode'>获取验证码</a>
                        <a class="time" v-else>{{seconds}}s后重新获取</a>
                    </li>
                </div>

                <info-input :title="'输入验证码'" :input-name="'authCode'" :max-length="'50'"
                :value="merchantInfo.authCode" />

            </ul>
        </section>
        <div class="footer">
            <Btn @click="save">确认绑卡</Btn>
        </div>
        <!-- 底部选择栏 -->
        <Picker></Picker>
        <!-- 示例图 -->
        <ShopImgExample></ShopImgExample>
    </div>
</template>
<script>
import Picker from 'src/secured-account/components/info-picker.vue'
import Btn from 'src/secured-account/components/fire-button'
import ShopImgExample from 'src/secured-account/components/ShopImgExample.vue'
import { inputUpdateBankIsOk } from 'src/secured-account/libs/rules.js'
import { fixedBody, looseBody } from 'base/utils/unit.js'
import { mapGetters,mapActions } from 'vuex'
import API from 'src/secured-account/config/api'

export default {
    components:{
        Btn,Picker,ShopImgExample
    },
    props:{
        accountType:{
            type: String,
            default:''
        }
    },
    data () {
        return {
            flag: true,
            isNextStep:true,
            seconds: 60,
        }
    },
    computed:{
        ...mapGetters({
            merchantInfo: "getMerchantInfo",
            applyStep: "applyStep"
        }),
        merchantInfoStep(){
            return this.applyStep[this.accountType]
        }
    },
    created () {
      this.changeViewState('edit')  
    },
    methods:{
        ...mapActions({
            changeExamplePhoto:'changeExamplePhoto',
            changeViewState:'changeViewState'
        }),
        //提交
        save(){
            const self = this
            if (!self.isNextStep) {
                return false
            }
            self.isNextStep = false
            for (let i = 0, leg = this.merchantInfoStep.length; i < leg; i++) {
                let key = this.merchantInfoStep[i];
                const ret = inputUpdateBankIsOk(this.merchantInfo[key], key);
                if (!ret.data) {
                    self.$alert({
                        confirmText: '我知道了',
                        content: ret.message
                    })
                    self.isNextStep = true;
                    return false;
                }
            }
            const params = this.getparamsInfo(this.merchantInfo)
            API.bindCardAccount(params).then(data => {
                if(data){
                    self.$toast('添加成功')
                    setTimeout(() => {
                        window.location.href = `fm-bank.html`
                    }, 500);
                }else{
                    self.isNextStep = true
                    self.$toast('绑卡失败，请再次尝试')
                }
            }).catch(e => {
                // self.$alert({
                //     confirmText: '我知道了',
                //     content: e.result.message
                // })
                self.isNextStep = true;
                console.log(e)
            })
        },
        getparamsInfo(merchantInfo){
            const params = {
                //店铺Id
                entityId: sessionStorage.getItem('entityId'),        
                //绑卡公函
                bindDocumentUrl: merchantInfo.businessLicensePic, 
                //开户人名称
                accountName: merchantInfo.accountName,     
                //开户银行
                accountBank: merchantInfo.accountBank,     
                //银行卡号
                bankCardNo: merchantInfo.accountNumber,      
                //开户省份
                // bankProvince: merchantInfo.accountAddressProCode,    
                bankProvince: merchantInfo.accountAddressProvince,    
                //开户城市
                // bankCity: merchantInfo.accountAddressCityCode,        
                bankCity: merchantInfo.accountAddressCity,        
                //开户支行名称
                branchBankName: merchantInfo.accountSubBank,  
                //支行code
                bankSubCode: merchantInfo.accountSubBankCode,     
                //预留手机号
                accountPhone: merchantInfo.userTelNumber,    
                //1对公 OR 2对私
                bankAccountProp: this.accountType, 
                //短信校验码
                validCode: merchantInfo.authCode        
            }
            if(this.accountType == '2'){
                //身份证号码
                params.idCardNo = merchantInfo.idCard
            }
            return params
        },
        resetCodeBut(){
            clearInterval(this.timer);
            this.flag = true
            this.seconds = 60
        },
        // 验证码
        btnCode(){
            const self = this
            const name = 'userTelNumber'
            const ret = inputUpdateBankIsOk(this.merchantInfo[name], name);
            if (!ret.data) {
                self.$alert({
                    confirmText: '我知道了',
                    content: ret.message
                })
                return false;
            }
            const params = {
                entityId: sessionStorage.getItem('entityId'),
                shopName: sessionStorage.getItem('shopName'),
                mobile: this.merchantInfo[name],
                businessType: 'bindBankCard'
            }

            this.flag = false
            API.sendMobileValidCode(params)
            .then(res => {
                if (!res) {
                    self.$toast('获取验证码失败')
                    self.resetCodeBut()
                }
            })
            .catch(e => {
                self.resetCodeBut()
            })
            // 倒计时
            this.timer = setInterval(function() {
                self.seconds--;
                if (self.seconds < 1) {
                    self.resetCodeBut()
                }
            }, 1000);
        },
        // 显示示例图
        showExample(url) {
            fixedBody()
            this.changeExamplePhoto({ img: url, isShow: true })
        }
    },
}
</script>
<style lang="scss" scoped>
.index-warp{
    background-image: url(https://assets.2dfire.com/frontend/c1c9266096fd0ce22057dec0a4e24f78.jpg);
    background-size: cover;
    background-repeat: repeat;
    .head-warp{
        height: 236px;
        padding: 20px 30px;
        .mes-info{
            font-size: 26px;
            color: #FF0033;
            letter-spacing: 0;
            line-height: 36px;
        }
    }
    .main{
        margin-bottom: 72px;
        .example {
            color: #0088ff;
            font-size: 28px;
            margin-left: 20px;
        }
        .code{
            position: relative;
            font-size: 30px;
            .btn-code{
                background: #0088FF ;
                font-size: 28px;
            }
            .time{
                font-size: 24px;
                background: #999;
            }
            a{
                position: absolute;
                top:0;
                bottom: 0;
                right: 30px;
                width: 220px;
                height: 60px;
                line-height: 60px;
                margin: auto;
                border: 0;
                border-radius: 8px;
                color: #ffffff;
                display: inline-block;
                text-align: center;
            }
        }
    }
    .footer{
        padding: 0 30px 176px;
    }
}
</style>