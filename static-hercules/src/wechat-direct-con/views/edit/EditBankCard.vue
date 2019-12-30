<template>  
<!-- 修改收款银行卡 -->
    <div>
        <section class="main">
            <h3 class="h3">收款银行卡</h3>
            <ul class="input-main border-b border-t" v-show="userUpgradeInfo">

                <info-select :title="'开户银行'"
                             :select-name="'businessAccountBankNew'"
                             :value="merchantInfo.businessAccountBank">
                </info-select>

                <info-select :title="'开户省'"
                             :select-name="'businessAccountAddressProvinceNew'"
                             :parent-id="merchantInfo.businessAccountBankCode"
                             :value="merchantInfo.businessAccountAddressProvince">
                </info-select>

                <info-select :title="'开户市'"
                             :select-name="'businessAccountAddressCityNew'"
                             :parent-id="merchantInfo.businessAccountBankCode+'&&'+merchantInfo.businessAccountAddressProCode"
                             :value="merchantInfo.businessAccountAddressCity">
                </info-select>

                <info-select :title="'开户银行支行'"
                             :select-name="'businessAccountSubBankNew'"
                             :parent-id="merchantInfo.businessAccountBankCode+'&&'+merchantInfo.businessAccountAddressProCode+'&&'+merchantInfo.businessAccountAddressCityCode"
                             :value="merchantInfo.businessAccountSubBank">
                </info-select>

                <info-input :title="'银行卡号'"
                            :input-name="'businessAccountNumberNew'"
                            :max-length="'50'"
                            :value="merchantInfo.businessAccountNumber">
                </info-input>

            </ul>

            <ul class="input-main border-b border-t" v-show="!userUpgradeInfo">

                <info-select :title="'开户银行'"
                             :select-name="'accountBankNew'"
                             :value="merchantInfo.accountBank">
                </info-select>

                <info-select :title="'开户省'"
                             :select-name="'accountAddressProvinceNew'"
                             :parent-id="merchantInfo.accountBankCode"
                             :value="merchantInfo.accountAddressProvince">
                </info-select>

                <info-select :title="'开户市'"
                             :select-name="'accountAddressCityNew'"
                             :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode"
                             :value="merchantInfo.accountAddressCity">
                </info-select>

                <info-select :title="'开户银行支行'"
                             :select-name="'accountSubBankNew'"
                             :parent-id="merchantInfo.accountBankCode+'&&'+merchantInfo.accountAddressProCode+'&&'+merchantInfo.accountAddressCityCode"
                             :value="merchantInfo.accountSubBank">
                </info-select>

                <info-input :title="'银行卡号'"
                            :input-name="'accountNumberNew'"
                            :max-length="'50'"
                            :value="merchantInfo.accountNumber">
                </info-input>
            </ul>
        </section>

         <!--button-->
        <div class="align-center btn">
            <btn-custom-short @click.native="modifyWxXwBankInfo">提交申请</btn-custom-short>
        </div>

        <StateToast :title="toastTitle"
                    :content="toastContent"
                    :state="toastState"
                    :isshow="toastIsShow">
        </StateToast>

        <!--底部弹窗-->
        <Picker></Picker>
        <Loading :content="'修改中'"
                 :isLoading="isLoadingToast">
        </Loading>
    </div>
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'
import API from '../../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'
import tools from 'src/wechat-direct-con/libs/tools'
import {
     mapState,
     mapGetters,
     mapActions
} from 'vuex'
import StateToast from '../../components/state-toast.vue'
import errorToast from 'src/wechat-direct-con/libs/errorToast'
import {
    inputUpdateBankIsOk,
    inputUpdateUpgradeBankIsOk
} from 'src/wechat-direct-con/libs/rules'
import Picker from 'src/wechat-direct-con/components/info-picker.vue'
import Loading from 'src/wechat-direct-con/components/loading.vue'

export default {
    data() {
        return {
            toastTitle: '',
            toastContent: '',
            toastState: '',
            toastIsShow: false,
            isNextStep: true,
            isLoadingToast: false,
            upgradeSigning: this.$route.query.upgradeSigning,  // 升级审核是否成功
            userUpgradeInfoParam: false,  // 是否使用企业商户银行卡信息
        }
    },
    methods: {
        ...mapActions(['changeViewState']),
        modifyWxXwBankInfo() {
            const self = this;
            if (!self.isNextStep) {
                return false;
            }
            self.isNextStep = true;

            var param = {};
            if(self.userUpgradeInfoParam) {
                for (let i = 0, leg = self.UpdateUpgradeBankInfoFirst.length; i < leg; i++) {
                    let key = self.UpdateUpgradeBankInfoFirst[i];
                    const ret = inputUpdateUpgradeBankIsOk(self.merchantInfo[key], key);
                    if (!ret.data) {
                        self.isNextStep = true;
                        errorToast.show(ret.message);
                        return false;
                    }
                }

                param = tools.modifyWxXwBankInfoParamFromUpgrade(self.merchantInfo, self.wxXwBankInfo)
            } else {  // 个体商户或小微商户  
                for (let i = 0, leg = self.UpdateBankInfoFirst.length; i < leg; i++) {
                    let key = self.UpdateBankInfoFirst[i];
                    const ret = inputUpdateBankIsOk(self.merchantInfo[key], key);
                    if (!ret.data) {
                        self.isNextStep = true;
                        errorToast.show(ret.message);
                        return false;
                    }
                }

                param = tools.modifyWxXwBankInfoParam(self.merchantInfo, self.wxXwBankInfo)
            }
        
            self.isLoadingToast = true
            API.modifyWxXwBankInfo({
                entityId: sessionStorage.getItem('entityId'),
                param: param
            }).then(data => { 
                if(data !== undefined) {  // 失败
               
                    let res = self.commonCatchError(data)

                    if (res === null && data.message) {
                        self.toastTitle = '修改失败'
                        self.toastState = 'failure'
                        self.toastContent = '原因：'+data.message
                        self.isLoadingToast = false  // 隐藏loading框
                        self.toastIsShow = true  // 展示失败toast
                        
                        setTimeout(function () {
                            self.setToastTimeout()
                        }, 3000)
                    } 
                } else {  // 成功
                    // 如果修改成功
                    self.toastTitle = '修改成功'
                    self.toastState = 'success'
                    self.isLoadingToast = false  // 隐藏loading框
                    self.toastIsShow = true  // 展示成功toast
                    
                    setTimeout(function () {
                        self.setToastTimeout()
                        window.history.back() 
                    }, 2000)
                }
 
            })
        },  
        commonCatchError (e) {
            let ERR_INFO = {
                "ERR_OPS999": "登录超时,请重新登录",
            }
            let message = ERR_INFO[e.errorCode]
            let self = this

            if (e.code === -1) {
                self.isLoadingToast = false
                return errorToast.show("授权失败，请重新扫码进入")
            }

            if (message) {
                self.isLoadingToast = false
                return errorToast.show(message)
            }

            return null
        },
        setToastTimeout() {
            this.toastTitle = ''
            this.toastState = ''
            this.toastContent = ''
            this.toastIsShow = false
        }
    },
    components: {
        BtnCustomShort,
        StateToast,
        Picker,
        Loading
    },
    created() {
        this.changeViewState("edit")           
    },
    computed: {
        ...mapState([
            "merchantInfo",
            "picker",
            "wxXwBankInfo"
        ]),
        ...mapGetters([
            "UpdateBankInfoFirst",
            "UpdateUpgradeBankInfoFirst"
        ]),
        userUpgradeInfo() {  // 是否使用升级银行卡信息--true:升级签约完成并且是企业商户
            // if((this.upgradeSigning === true || this.upgradeSigning === 'true') && this.merchantInfo.merchantType === '企业商户') {
            //     this.userUpgradeInfoParam = true
            //     return true
            // } else {
                this.userUpgradeInfoParam = false
                return false
            // }
        }
    }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .btn {
        text-align: center;
        margin: 74px 76px;
    }

</style>