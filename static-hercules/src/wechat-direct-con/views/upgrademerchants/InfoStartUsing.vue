<template>
    <div class="using-wrapper">
        <div class="top-wrapper">
            <img src="https://assets.2dfire.com/frontend/24e8c4ca56c9bda80161cd804dbf7db0.png" />
            <div class="title" v-if="!isUsed">签约完成，请点击下面按钮启用</div>
            <div class="title" v-if="isUsed">已启用成功</div>
            <div class="check-info">
                <span>商户号：{{merchantInfo.merchantNum}}&nbsp;</span>
                <span class="click-check" @click="checkInfo">查看申请资料</span>
            </div>

            <div class="change-aisle" v-if="isUsed">
                <span>如需变更通道请</span><span>联系客服</span>
            </div>

            <div class="tips">
                <span>你已经是普通商户，交易手续费0.6%，每日交易无上限。可通过微信后台查账。</span>
                <br />
                <span>后台地址: https://pay.weixin.qq.com/</span>
            </div>
            <div class="btn" v-if="!isUsed">
                <btn-custom-short @click.native="enableWxXw">立即启用</btn-custom-short>
            </div>
        </div>

        <div class="form-title">如何对账</div>
        <div class="check-wrapper">
            <span>请用签约的微信号扫描以上小程序二维码即可查看收款情况和对账信息。也可以下载到本地，通过“扫一扫————相册”来识别。</span>
            <br /><br />
            <span>"微信支付商户助手"小程序二维码如下：</span>
            <div class="qr-code">
                <img class="qr-code" src='https://assets.2dfire.com/frontend/9aaa77360d1befbf85f0bcf6b146e98b.png' />
            </div>
            <div class="download" @click="downloadQrCode">下载到手机</div>
            <span>更多信息可以登录微信后台查询。</span>
            <br />
            <span>后台地址: https://pay.weixin.qq.com/</span>

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
    import API from '../../config/api'
    import sessionStorage from '@2dfire/utils/sessionStorage'
    import errorToast from 'src/wechat-direct-con/libs/errorToast'

    export default {
        name: 'fourth',
        data() {
            return {
                isEnable: this.$route.query.isEnable,
                isNextStep: true,
            }
        },
        methods: {
            checkInfo() { // 查看申请资料
                this.$router.push({
                    path: '/merchantupgradeinfo',
                    query: {canEditInfo: true}
                }) // 可修改
            },
            downloadQrCode() {
                window.tdfire.downloadImage('https://assets.2dfire.com/frontend/9aaa77360d1befbf85f0bcf6b146e98b.png')
                window.downloadFinish = function (value) {
                    if (value === 'success') {
                        errorToast.show('下载成功')
                    } else {
                        errorToast.show('下载失败')
                    }
                }
            },
            enableWxXw() { // 启用小微
                this.$confirm({  // 这个是fire-ui中的组件
                    content: '是否启用',
                    confirm: () => {
                        API.enableWxXw({
                            entityId: sessionStorage.getItem('entityId'),
                        }).then(data => {
                            this.isEnable = true
                            this.$router.push({query:{isEnable: this.isEnable}})  // 修改
                        })
                    }
                })
            }
        },
        computed: {
            ...mapState(['merchantInfo']),
            isUsed() {
                if(this.isEnable === true || this.isEnable === 'true') {
                    return true
                } else {
                    return false
                }
            }
        },
        components: {
            BtnCustomShort
        },
        created() {},
        watch: {
            '$isEnable': 'isUsed'
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .using-wrapper {
        .top-wrapper {
            text-align: center;
            img {
                width: 70px;
                height: 70px;
                margin-top: 70px;
            }
            .title {
                margin-top: 38px;
                color: #333333;
                font-size: 34px;
            }
            .tips {
                margin: 10px 30px 0px 30px;
                font-size: 26px;
                color: #666666;
                text-align: left
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
                margin-top: 40px;
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
            .dir-service {
                color: #0088ff;
                font-size: 26px;
            }
            .btn {
                text-align: center;
                margin: 30px auto;
            }
        }
        .check-wrapper {
            height: 900px;
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