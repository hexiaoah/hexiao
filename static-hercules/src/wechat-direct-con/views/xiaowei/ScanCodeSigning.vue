<template>
<!-- 扫码签约页面 -->
    <div class="scan-wrapper">
        
        <div class="top-wrapper">
            <img src="https://assets.2dfire.com/frontend/24e8c4ca56c9bda80161cd804dbf7db0.png"/>
            <div class="title">审核通过，请扫描下方二维码签约</div>
        </div>
        <div class="content">请用申请者本人微信扫码，或者将签约二维码下载到本地，用微信扫一扫识别。</div>
        <div class="attention">注意：扫描二维码的微信需要实名认证且与小微商户申请人一致！否则无法签约，无法升级普通商户！</div>
        <div class="qr-code" :style="'background: url(' + signUrl + ') center center / contain no-repeat;'"></div>
        <div class="download" @click="downloadQrCode">下载到手机</div>
        <div class="footer">
            <div class="align-center btn">
                <button class="footer-button" v-click="{name:'click_wx_direct_con_success_button',info:'entityid=' + entityId}" @click="querySingFinished">签约成功</button>
            </div>
        </div>

    </div>
</template>

<script>
import {
     mapState,
     mapGetters,
     mapActions
} from 'vuex'
import API from '../../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'
import errorToast from 'src/wechat-direct-con/libs/errorToast'

export default {
    data() {
        return {
           signUrl: this.$route.query.signUrl
        }
    },
    methods: {
        querySingFinished() {  // 查询签约是否已完成
            API.querySignFinished({
                entityId: sessionStorage.getItem('entityId'),
                auditStatus: 'XW_AUTH_SIGN'
            }).then(data => {
                this.getPaymentStatus()
            })
        },
        getPaymentStatus() {  // 查看申请状态
            API.getPaymentStatus({
                entityId: sessionStorage.getItem('entityId'),
                applyType: "WECHAT_XW"
            }).then(data => {
                let isApply = data.isApply  // 申请记录
                let isEnable = data.isEnable  // 启用状态

                // 已申请会返回下列内容
                let auditStatus = data.auditStatus  // 申请状态
                let signUrl = data.signUrl  // 签约url
                let applyTime = data.applyTime  // 申请提交时间
                let auditMessage = data.auditMessage  // 审核失败原因，状态说明
                let mchId = data.mchId

                if(isApply === false) {  // 未申请
                    // 返回申请页
                    this.$router.push({path: '/index'})
                } else {  // 已申请
                    if(auditStatus === 'RESET') {  // 已重置
                        // 返回申请页
                        this.$router.push({path: '/index'})
                    }
                    if(auditStatus === 'XW_AUTH_FAIL') {  // 小微进件失败
                        this.$router.push({path: '/input/second/second', query:{auditStatus:false, auditMessage: auditMessage}})
                    }
                    if(auditStatus === 'XW_AUTH_SIGN') {  // 小微进件待签约
                        errorToast.show(auditMessage)
                    }
                    if(auditStatus === 'XW_AUTH_SUCCESS') { // 小微进件成功
                        this.$router.push({path: '/input/fourth/fourth', query:{mchId:mchId, isEnable: isEnable}})
                    }
                }
            })
        },
        downloadQrCode() {
            window.tdfire.downloadImage(this.signUrl)
            window.downloadFinish = function(value) {
                if(value === 'success') {
                    errorToast.show('下载成功')
                } else {
                    errorToast.show('下载失败')
                }
            }
        }
    },
    components: {
       
    },
    computed: {
       
    },
    created() {
    
    },
}
</script>

<style type="text/scss" lang="scss" scoped>

    .scan-wrapper {
        margin-top: 20px;
        margin-bottom: 176px;
        background: white;

        .top-wrapper {
            text-align: center;

            img {
                width: 70px;
                height: 70px;
                margin-top: 70px;
            }

            .title {
                margin-top: 38px;
                font-size: 34px;
                color: #333333;
            }
        }

        .content {
            margin: 30px 30px 10px 30px;
            font-size: 26px;
            color: #666666;
        }

        .attention {
            margin: 0 30px;
            font-size: 26px;
            color: #ff0033;
        }

        .qr-code {
            position: relative;
            margin: 66px auto;
            width: 320px;
            height: 320px;
        }

        .download {
            margin-top: -32px;
            // margin-bottom: 25Px;
            color: #0088ff;
            font-size: 30px;
            text-align: center;
        }

        .btn {
            text-align: center;
            margin: 50px auto;
            padding-bottom: 74px;
        }
    }
    .footer {
        height: 136px;
        width: 100%;
        bottom: 0;
        position: relative;
        margin-top:32px;

        .btn {
            text-align: center;
            margin-left: 76px;
            margin-right: 76px;

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