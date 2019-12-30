<template>
<!-- 启用页面 -->
    <div class="using-wrapper">
        <div class="top-wrapper">
            <img src="https://assets.2dfire.com/frontend/24e8c4ca56c9bda80161cd804dbf7db0.png"/>
            <div class="title" v-if="!isUsed">签约完成，请点击下面按钮启用</div>
            <div class="title" v-if="isUsed">已启用成功</div>
            <div class="check-info">
                <span>{{merchantId}}</span>
                <span class="click-check" @click="checkInfo">&nbsp;查看申请资料</span>
            </div>
            <div class="change-aisle" v-if="isUsed">
                <span>如需变更通道请</span><span>联系客服</span>
            </div>
            <div class="btn" v-if="!isUsed">
                <btn-custom-short @click.native="enableWxXw" :disabled="disabled">启用</btn-custom-short>
            </div>
        </div>

        <div class="form-title" v-if="isShowUpgrade">升级到普通商户</div>
        <div class="upgrade-wrapper" v-if="isShowUpgrade">
            <span>您现在是微信支付特约小微商户，交易手续费0.6%，每日上限5万元，信用卡500/笔。无对账后台。</span><br/>
            <span>升级普通商户，交易手续费0.6%，每日交易无上限。可通过微信后台查账。</span>
            <div class="btn">
                <btn-custom-white-bg @click.native="upgradeInfo">立即升级</btn-custom-white-bg>
            </div>
        </div>

        <div class="form-title">如何对账</div>
        <div class="check-wrapper">
            <span>请用签约的微信号扫描以上小程序二维码即可查看收款情况和对账信息。也可以下载到本地，通过“扫一扫————相册”来识别。</span>
            <br/><br/>
            <span>"微信支付商户助手"小程序二维码如下：</span>
            <div class="qr-code">
                <img class="qr-code" src='https://assets.2dfire.com/frontend/9aaa77360d1befbf85f0bcf6b146e98b.png'/>
            </div>
            <div class="download" @click="downloadQrCode">下载到手机</div>
        </div>
    </div>
</template>

<script>
import {
     mapState,
     mapGetters,
     mapActions
} from 'vuex'
import BtnCustomShort from '../../components/btn-custom-short.vue'
import BtnCustomWhiteBg from '../../components/btn-custom-white-bg.vue'
import errorToast from '../../libs/errorToast'
import API from '../../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'

export default {
    data() {
        return {
            isEnable: this.$route.query.isEnable,  // 启用状态
            merchantId: '商户号: ' + this.$route.query.mchId,
            disabled: false,
            isShowUpgrade: false
        }
    },
    methods: {
        checkInfo() {  // 查看申请资料
            this.$router.push({path: '/merchantinfo', query:{canEditInfo: true}})  // 可修改
        },
        upgradeInfo() {  // 立即升级
            this.getPaymentStatus()
        },
        downloadQrCode() {
            window.tdfire.downloadImage('https://assets.2dfire.com/frontend/9aaa77360d1befbf85f0bcf6b146e98b.png')  // 下载原图
            window.downloadFinish = function(value) {
                if(value === 'success') {
                    errorToast.show('下载成功')
                } else {
                    errorToast.show('下载失败')
                }
            }
        },
        enableWxXw() {  // 启用小微
            this.$confirm({  // 这个是fire-ui中的组件
                content: '是否启用',
                confirm: () => {
                    this.disabled = true
                    API.enableWxXw({
                        entityId: sessionStorage.getItem('entityId'),
                    }).then(data => {
                        this.isEnable = true
                        this.$router.push({query:{mchId: this.$route.query.mchId, isEnable: this.isEnable}})  // 修改
                    })
                }
            })
        },
        getPaymentStatus() { // 查看申请状态
            API.getPaymentStatus({
                entityId: sessionStorage.getItem('entityId'),
                applyType: "WECHAT_XW"
            }).then(data => {
                let isApply = data.isApply // 申请记录
                let isEnable = data.isEnable // 启用状态

                // 已申请会返回下列内容
                let auditStatus = data.auditStatus // 申请状态
                let signUrl = data.signUrl // 签约url
                let applyTime = data.applyTime // 申请提交时间
                let auditMessage = data.auditMessage // 审核失败原因，状态说明
                let mchId = data.mchId

                if (isApply === false) { // 未申请
                    // 返回申请页
                    this.$router.push({path: '/index'})
                } else { // 已申请
                    switch(auditStatus) {
                        case 'RESET': //已重置
                            this.$router.push({path: '/index'})
                            break;
                        case 'XW_AUTH_SUCCESS': //小微进件成功
                            this.$router.push({path: '/merchants/first/first'})
                            break;
                        case 'XW_UPGRADE_AUDITING': //小微升级审核中
                            this.$router.push({path: '/merchants/second/second', query:{auditStatus:auditStatus, applyTime: applyTime}})
                            break;
                        case 'XW_UPGRADE_ACCOUNT_VERIFY': //小微升级待打款验证
                            this.$router.push({path: '/merchants/second/second', query:{auditStatus:auditStatus, applyTime: applyTime}})
                            break;
                        case 'XW_UPGRADE_SIGN': //小微升级待签约
                            this.$router.push({path: '/merchants/third/third', query:{signUrl:signUrl}})
                            break;
                        case 'XW_UPGRADE_SUCCESS': //小微升级成功
                            this.$router.push({path: '/merchants/fourth/fourth', query:{mchId:mchId, isEnable: isEnable}})
                            break;
                        case 'XW_UPGRADE_FAIL': //小微升级成功
                            this.$router.push({path: '/merchants/second/second', query:{auditStatus:auditStatus, auditMessage: auditMessage}})
                            break;
                        default:
                            this.$router.push({path: '/index'})
                    }
                }
            })
        },
        getUpgradeIsShow() {  // 是否展示升级模块
            API.getUpgradeIsShow({
                entityId: sessionStorage.getItem('entityId'),
            }).then(data => {
                this.isShowUpgrade = data
            })
        }
    },
    components: {
        BtnCustomShort,
        BtnCustomWhiteBg
    },
     computed: {
        ...mapState([
            "merchantInfo",
            "paymentWxXwAuthInfo",
            'addressPicker',
        ]),
        ...mapGetters([
            "XwMerchantInfoStepFirst"
        ]),
        isUsed() {
            if(this.isEnable === true || this.isEnable === 'true') {
                return true;
            } else {
                return false;
            }
        }
    },
    created() {
        this.merchantId = '商户号: ' + this.merchantInfo.merchantNum
        this.getUpgradeIsShow()
    },
    watch: {
        // 启用状态发生变化就执行
        '$isEnable': 'isUsed'
    }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .using-wrapper {
        margin-top: 70px;

        .top-wrapper {
            text-align: center;

            img {
                width: 70px;
                height: 70px;
            }

            .title {
                margin-top: 38px;
                color: #333333;
                font-size: 34px;
            }

            .check-info {
                margin-top: 30px;

                span {
                    color: #333333;
                    font-size: 30px;
                }

                .click-check {
                    color: #0088ff;
                    font-size: 30px;
                }
            }

            .change-aisle {
                margin-top: 30px;

                span {
                    color: #666666;
                    font-size: 26px;
                }

                .dir-service {
                    color: #0088ff;
                    font-size: 26px;
                }
            }

            .btn {
                margin-top: 72px;
                margin-left: 76px;
                margin-right: 76px;
            }
        }

        .form-title {
            margin: 72px 30px 20px 30px;
            color: #333333;
            font-size: 30px;
            font-weight: bold;
        }

        .upgrade-wrapper {
            height: 378px;
            background: white;
            padding: 30px 30px;

            span {
               color: #333333;
               font-size: 30px;
               line-height: 40px; 
            }

            .btn {
                text-align: center;
                margin: 30px auto;
            }
        }

        .check-wrapper {
            height: 786px;
            font-size: 30px;
            color: #333333;
            line-height: 40px;
            background: white;
            margin-bottom: 172px;
            padding: 20px 30px 30px 30px;

            .qr-code {
                position: relative;
                margin: 30px auto;
                width: 400px;
                height: 400px;
            }

            .download {
                margin-top: 50px;
                margin-bottom: 50px;
                color: #0088ff;
                font-size: 30px;
                text-align: center;
            }
        }
    }
</style>