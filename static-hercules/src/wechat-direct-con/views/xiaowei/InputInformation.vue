<template>  
<!-- 填写资料页面 -->
    <div>
        <section class="main">
            <h3 class="h3">基本信息</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'门店名称'"
                            :input-name="'shopName'"
                            :max-length="'50'"
                            :value="merchantInfo.shopName">
                </info-input>

                <info-select :title="'店铺所在地'"
                              :select-name="'shopAddress'"
                              :objectValue="merchantInfo.shopAddress"
                              :isObjectValue="true">
                </info-select>

                <info-input :title="'详细地址'"
                            :input-name="'detailAddress'"
                            :max-length="'500'"
                            :value="merchantInfo.detailAddress">
                </info-input>

                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺门头照</span>
                            <span class="content" v-show="merchantInfo.shopLicensePic == ''">必填</span>
                        </div>
                        <info-photo :title="''"
                                    :img-name="'shopLicensePic'"
                                    :value="merchantInfo.shopLicensePic">
                        </info-photo>
                    </li>

                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺环境照</span>
                            <span class="content" v-show="merchantInfo.shopEnvironmentPic == ''">必填</span>
                        </div>
                        <info-photo :title="''"
                                    :img-name="'shopEnvironmentPic'"
                                    :value="merchantInfo.shopEnvironmentPic">
                        </info-photo>
                    </li>
                </div>

                <info-input :title="'客服电话'"
                            :input-name="'serviceTel'"
                            :input-type="'tel'"
                            :max-length="'20'"
                            :explain="'将在交易记录中向买家展示，请确保电话畅通以便微信回拨确认。'"
                            :value="merchantInfo.serviceTel">
                </info-input>

                <info-select :title="'服务类型'"
                             :select-name="'serviceType'"
                             :value="merchantInfo.serviceType">
                </info-select>
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">身份信息</h3>
            <ul class="input-main border-b border-t">

                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证正面</span>
                            <span class="content" v-show="merchantInfo.idCardFront == ''">必填</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'"
                                    :img-name="'idCardFront'"
                                    :ocr-type="2"
                                    :value="merchantInfo.idCardFront">
                        </info-photo>
                    </li>

                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证反面</span>
                            <span class="content" v-show="merchantInfo.idCardReverse == ''">必填</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'"
                                    :img-name="'idCardReverse'"
                                    :value="merchantInfo.idCardReverse">
                    </info-photo>
                    </li>
                </div>

                <info-input :title="'身份证姓名'"
                            :input-name="'idCardName'"
                            :max-length="'64'"
                            :value="merchantInfo.idCardName">
                </info-input>

                <info-input :title="'证件号码'"
                            :input-name="'idCardNumber'"
                            :max-length="'18'"
                            :value="merchantInfo.idCardNumber">
                </info-input>

                <info-switch class="required" 
                            :title="'身份证是否长久有效'"
                            :switch-name="'idCardEffLongTime'"
                            :value="merchantInfo.idCardEffLongTime">
                </info-switch>

                <info-select :title="'开始时间'"
                             :select-name="'startDate'"
                             :childStatus="true"
                             :value="merchantInfo.startDate">
                </info-select>

                <info-select v-show="!merchantInfo.idCardEffLongTime" :title="'结束时间'"
                             :select-name="'endDate'"
                             :childStatus="true"
                             :value="merchantInfo.endDate">
                </info-select>

            </ul>
                
        </section>

        <section class="main">
            <h3 class="h3">收款信息</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'商户简称'"
                            :input-name="'userSimpleName'"
                            :max-length="'30'"
                            :explain="'将在支付完成页向买家展示，需与商家的实际经营场景相符'"
                            :value="merchantInfo.userSimpleName">
                </info-input>

                <info-input :title="'开户名称'"
                            :input-name="'accountName'"
                            :max-length="'64'"
                            :explain="'必须与身份证姓名一致'"
                            :value="merchantInfo.accountName">
                </info-input>

                <info-select :title="'开户银行'"
                             :select-name="'accountBank'"
                             :value="merchantInfo.accountBank">
                </info-select>

                <info-input :title="'银行卡号'"
                            :input-name="'accountNumber'"
                            :max-length="'50'"
                            :value="merchantInfo.accountNumber">
                </info-input>

                <info-select :title="'开户省'"
                             :select-name="'accountAddressProvince'"
                             :parent-id="merchantInfo.accountBankCode"
                             :value="merchantInfo.accountAddressProvince">
                </info-select>

                <info-select :title="'开户市'"
                             :select-name="'accountAddressCity'"
                             :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode"
                             :value="merchantInfo.accountAddressCity">
                </info-select>

                <info-select :title="'开户支行'"
                             :select-name="'accountSubBank'"
                             :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode+'&&'+merchantInfo.accountAddressCityCode"
                             :value="merchantInfo.accountSubBank">
                </info-select>
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">联系信息</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'手机号码'"
                            :input-name="'userTelNumber'"
                            :input-type="'tel'"
                            :max-length="'11'"
                            :value="merchantInfo.userTelNumber">
                </info-input>

                <info-input :title="'联系邮箱'"
                            :input-name="'userEmailNumber'"
                            :max-length="'50'"
                            :input-type="'email'"
                            :value="merchantInfo.userEmailNumber">
                </info-input>

            </ul>
        </section>

         <!--button-->
        <div class="footer">
            <div class="align-center btn">
                <button class="footer-button" @click="nextStep">提交申请</button>
            </div>
        </div>
        
        <!--地址选择器-->
        <AddressPicker></AddressPicker>
    </div>
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'
import {
     mapState,
     mapGetters,
     mapActions
} from 'vuex'
import {
    inputXwIsOk
} from 'src/wechat-direct-con/libs/rules'
import errorToast from 'src/wechat-direct-con/libs/errorToast'
import tools from 'src/wechat-direct-con/libs/tools'
import API from '../../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'
import AddressPicker from 'src/wechat-direct-con/components/fire-address-picker.vue'

export default {
    name: 'InputInformation',
    data() {
        return {
           isNextStep: true,
           isNeedGetInfo: this.$route.query.isNeedGetInfo, //是否需要从服务端获取数据
        }
    },
    methods: {
        ...mapActions([
            'modifyInputInfo',
            'changeViewState',
            'saveMerchantInfo',
            'saveIsEditAddress'
        ]),
        init() {
            if(this.isNeedGetInfo === true) {
                this.saveIsEditAddress(true)
                API.getWxXwAuthInfoAndUpgradeInfo({
                    entityId: sessionStorage.getItem('entityId')
                }).then(data => {
                    let info = tools.paramToXwMerchantInfo(data.paymentWxXwAuthExtInfo, this.merchantInfo)
                    let merchantInfoString = JSON.stringify(info)
                    this.saveMerchantInfo(merchantInfoString)  // 保存表单信息
                    this.modifyInputInfo(info)  // 修改商户信息
                }).catch(e=>{
                    this.getMerchantInfoString()
                });

            } else {
                this.saveIsEditAddress(false)
                this.getMerchantInfoString()
            }
        },
        getMerchantInfoString() {  // 保存表单信息，用于点击返回按钮时对比表单内容是否变化
            let merchantInfoString = JSON.stringify(this.merchantInfo)
            this.saveMerchantInfo(merchantInfoString)
        },
        nextStep() {
            const self = this;
            if (!self.isNextStep) {
                return false;
            }
            self.isNextStep = true;
            if(Object.keys(self.merchantInfo.shopAddress).length === 0 || Object.keys(self.merchantInfo.shopAddress.province).length === 0
                || Object.keys(self.merchantInfo.shopAddress.city).length === 0) {
                    self.isNextStep = true;
                    errorToast.show('请选择店铺所在地');
                    return false;
            }
            for (let i = 0, leg = self.XwMerchantInfoStepFirst.length; i < leg; i++) {
                let key = self.XwMerchantInfoStepFirst[i];
                const ret = inputXwIsOk(self.merchantInfo[key], key);
                if (!ret.data) {
                    if((key === 'endDate') && (self.merchantInfo.idCardEffLongTime === true)) {  // 身份证长期有效不验证结束时间
                        self.isNextStep = true;
                    }
                    else {
                        self.isNextStep = true;
                        errorToast.show(ret.message);
                        return false;
                    }
                }
            }
            if(self.merchantInfo.idCardEffLongTime === false) {  // 结束时间需大于开始时间
                if(self.changeDate(self.merchantInfo.endDate) <= self.changeDate(self.merchantInfo.startDate)) {
                    self.isNextStep = true;
                    errorToast.show('结束时间需大于开始时间');
                    return false;
                }
            }
            if(self.merchantInfo.idCardName !== self.merchantInfo.accountName) {
                    self.isNextStep = true;
                    errorToast.show('开户名称必须与身份证姓名一致');
                    return false;
            }

            let param = tools.xwMerchantInfoToParam(self.merchantInfo, self.paymentWxXwAuthInfo)
            console.log(param)
    
            // API.authWxXw({param: {"entityId":"99226607","shopName":"麦兜甜品店六店","shopProvince":"山西省","shopCity":"临汾市","detailAddress":"二维火科技大厦","shopPhoto":"https://assets.2dfire.com/openapi/f3534b942166d62355baa26a6ca55ee3.png","indoorPhoto":"https://assets.2dfire.com/openapi/37201ad5907c1fba1d5973dc512bc45e.jpg","servicePhone":"134664664","industryType":"FOOD","certFront":"https://assets.2dfire.com/openapi/37201ad5907c1fba1d5973dc512bc45e.jpg","certBack":"https://assets.2dfire.com/openapi/37201ad5907c1fba1d5973dc512bc45e.jpg","certName":"满天星","certNo":"123456949949494","certValidStartTime":"长期","certValidEndTime":"长期","wxXwBankInfo":{"accountName":"满天星","accountBank":"工商银行","accountNo":"1234554564949499797","accountProvince":"安徽","accountCity":"合肥","accountSubBank":"中国工商银行合肥市四牌楼支行"},"wxXwContactInfo":{"merchantShortName":"满天星","contactPhone":"12364554664","email":"1104917535@qq.com"}}}).then(data => {
            //     self.getPaymentStatus()
            // })
            API.authWxXw({param: param}).then(data => {
                self.getPaymentStatus()
            })
        },
        getPaymentStatus() {  // 查看申请状态
            API.getPaymentStatus({
                entityId: sessionStorage.getItem('entityId'),
                applyType: "WECHAT_XW"
            }).then(data => {
                let isApply = data.isApply  // 申请记录
                let isEnable = data.isEnable  // 启用状态
                console.log(data)

                // 已申请会返回下列内容
                let auditStatus = data.auditStatus  // 申请状态
                let signUrl = data.signUrl  // 签约url
                let applyTime = data.applyTime  // 申请提交时间
                let auditMessage = data.auditMessage  // 审核失败原因

                if(isApply === false) {  // 未申请
                    // 返回申请页
                    this.$router.push({path: '/index'})
                } else {  // 已申请
                    if(auditStatus === 'RESET') {  // 已重置
                        // 返回申请页
                        this.$router.push({path: '/index'})
                    }
                    if(auditStatus === 'XW_AUTH_AUDITING') {  // 小微进件审核中
                        this.$router.push({path: '/input/second/second', query:{auditStatus:true, applyTime: applyTime}})
                    }
                    if(auditStatus === 'XW_AUTH_FAIL') {  // 小微进件失败
                        this.$router.push({path: '/input/second/second', query:{auditStatus:false, auditMessage: auditMessage}})
                    }
                    if(auditStatus === 'XW_AUTH_SIGN') {  // 小微进件待签约
                        this.$router.push({path: '/input/third/third', query:{signUrl:signUrl}})
                    }
                }
            })
        },
        changeDate(strTime) { // 将字符串转换为日期格式
            var strBeginTime = strTime.replace("-", "/").replace("-","/")
            var beginDate = new Date(Date.parse(strBeginTime))
            return beginDate
        }
    },
    computed: {
        ...mapState([
            "merchantInfo",
            "paymentWxXwAuthInfo",
            'addressPicker',
        ]),
        ...mapGetters([
            "XwMerchantInfoStepFirst"
        ])
    },
    components: {
        BtnCustomShort,
        AddressPicker,
    },
    created() {
        this.changeViewState("edit")
        this.init()
    }
}
</script>

<style type="text/scss" lang="scss" scoped>

.footer {
    height: 336px;
    width: 100%;
    bottom: 0;
    position: relative;
    margin-top: 72px;

    .btn {
        text-align: center;
        padding-left: 76px;
        padding-right: 76px;

        .footer-button {
            background-color: #0088ff;
            width: 100%;
            height: 88px;
            border-radius: 12px;
            font-size: 30px;
            color: white;
            text-align: center;
            line-height: 40px;
            padding: 24px 30px;
            border: none;
        }
    }
}

</style>