<template>  
<!-- 修改商户信息 -->
    <div>
        <section class="main">
            <h3 class="h3">商户信息</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'商户简称'"
                            :input-name="'userSimpleName'"
                            :max-length="'30'"
                            :explain="'将在支付完成页向买家展示，需与商家的实际经营场景相符'"
                            :value="merchantInfo.userSimpleName">
                </info-input>

                 <info-input :title="'手机号'"
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
        <div class="align-center btn">
            <btn-custom-short @click.native="modifyWxXwContactInfo">提交申请</btn-custom-short>
        </div>

        <StateToast :title="toastTitle"
                    :content="toastContent"
                    :state="toastState"
                    :isshow="toastIsShow">
        </StateToast>

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
    inputUpdateContractIsOk
} from 'src/wechat-direct-con/libs/rules'
import Loading from 'src/wechat-direct-con/components/loading.vue'

export default {
    data() {
        return {
            toastTitle: '',
            toastContent: '',
            toastState: '',
            toastIsShow: false,
            isNextStep: true,
            isLoadingToast: false
        }
    },
    methods: {
        ...mapActions(['changeViewState']),
        modifyWxXwContactInfo() { 
            const self = this;
            if (!self.isNextStep) {
                return false;
            }
            self.isNextStep = true;
            for (let i = 0, leg = self.UpdateContractInfoFirst.length; i < leg; i++) {
                let key = self.UpdateContractInfoFirst[i];
                const ret = inputUpdateContractIsOk(self.merchantInfo[key], key);
                if (!ret.data) {
                    self.isNextStep = true;
                    errorToast.show(ret.message);
                    return false;
                }
            }

            let param = tools.modifyWxXwContactInfoParam(self.merchantInfo, self.wxXwContactInfo)
            self.isLoadingToast = true
            API.modifyWxXwContactInfo({
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
        Loading
    },
    created() {
        this.changeViewState("edit")
    },
    computed: {
        ...mapState([
            "merchantInfo",
            "wxXwContactInfo"
        ]),
        ...mapGetters([
            "UpdateContractInfoFirst"
        ])
    }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .btn {
        text-align: center;
        margin: 74px 76px;
    }

</style>