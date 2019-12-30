<template>
    <div>
        <div v-show="auditStatus == 'XW_UPGRADE_ACCOUNT_VERIFY'">
            <div>
                <p class="head-info">{{deadlineHeader}}</p>
                <p class="head-tips">为确保你的账户安全, 根据微信要求, 你需要向微信打款验证才能进入下一步 (验证款项会在验证完成后原路退还)。</p>
            </div>

            <section class="main ">
                <h3 class="h3">付款信息</h3>
                <ul class="input-main border-b border-t">
                    <info-input :title="'付款户名'" :input-name="'accountName'" :max-length="'50'"
                        :value="merchantInfo.accountName" :explain="'需商户使用该户名的账户进行汇款。'" />
                    <info-input :title="'汇款金额（￥）'" :input-name="'payAmount'" :max-length="'50'"
                        :value="String(parseFloat(merchantInfo.payAmount)/100)" />
                    <info-input :title="'备注信息'" :input-name="'remark'" :max-length="'50'" :value="merchantInfo.remark"
                        :explain="'商户汇款时，需要填写的备注信息。'" />
                </ul>
            </section>

            <section class="main ">
                <h3 class="h3">收款信息</h3>
                <ul class="input-main border-b border-t">
                    <info-input :title="'收款卡号'" :input-name="'destinationAccountNumber'" :max-length="'50'"
                        :value="merchantInfo.destinationAccountNumber" />
                    <info-input :title="'收款户名'" :input-name="'destinationAccountName'" :max-length="'50'"
                        :value="merchantInfo.destinationAccountName" />
                    <info-input :title="'开户银行'" :input-name="'destinationAccountBank'" :max-length="'50'"
                        :value="merchantInfo.destinationAccountBank" :explain="'收款账户的开户银行名称。'" />
                    <info-input :title="'省市信息'" :input-name="'city'" :max-length="'50'" :value="merchantInfo.city"
                        :explain="'收款账户的省市'" />
                    <info-input :title="'截止日期'" :input-name="'deadlineTime'" :max-length="'50'"
                        :value="merchantInfo.deadlineTime" :explain="'请在此时间前完成汇款。'" />
                </ul>
            </section>
            <!--button-->
            <div class="footer">
                <div class="align-center btn">
                    <btn-custom-short name="" @click.native="nextStep">已经打款</btn-custom-short>
                </div>
                <div>
                    <p class="tips tips-margintop">若已经打款，请耐心等待微信验证！ </p>
                    <p class="tips">如有疑问请联系客服(4000166588) </p>
                </div>
            </div>
        </div>

        <div class="audit-wrapper" v-show="auditStatus == 'XW_UPGRADE_AUDITING'">
            <div class="top-wrapper">
                <img class="img-audit-status" :src="imgAuditingContent" />
                <div class="audit-status">微信审核中！</div>
                <div class="submit-time">{{merchantInfo.upgradeTime}}</div>
            </div>
            <div class="content-wrapper">
                <div class="explain-content">你的申请资料已经成功提交，微信官方会在1-3个工作日内审核，请耐心等待。</div>
                <div class="explain-content">审核结果会以邮件和短信的形式通知到您，请及时关注！</div>
                <div class="check-info" @click="checkInfo">查看申请资料</div>
            </div>
        </div>

        <div class="audit-wrapper" v-show="auditStatus == 'XW_UPGRADE_FAIL'">
            <div class="top-wrapper">
                <img class="img-audit-status" :src="imgFailedContent" />
                <div class="audit-status">微信审核失败！</div>
            </div>
            <div class="failure-wrapper">
                <div class="failure-content">{{auditMessage}}</div>
                <div class="btn">
                    <btn-custom-short @click.native="reApply">重新申请</btn-custom-short>
                </div>
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
    import BtnCustomShort from '../../components/btn-custom-short.vue'
    import tools from 'src/wechat-direct-con/libs/tools'
    import API from '../../config/api'
    import sessionStorage from '@2dfire/utils/sessionStorage'

    export default {
        name: 'second',
        data() {
            return {
                auditStatus: this.$route.query.auditStatus, // 审核状态
                upgradeTime: this.$route.query.upgradeTime,
                auditMessage: '失败原因: ' + this.$route.query.auditMessage, // 审核失败原因
                isNextStep: true,
                imgAuditingContent: '',
                imgFailedContent: '',
                deadlineHeader: ''
            }
        },
        computed: {
            ...mapState(['merchantInfo']),
            ...mapGetters(['merchantInfoStepSecond']),
        },
        methods: {
            ...mapActions(['modifyInputInfo']),
            ...mapActions(['changeViewState']),
            nextStep() {
                API.queryVerifyAccountFinished({
                    entityId: sessionStorage.getItem('entityId')
                }).then(data => {
                    this.getPaymentStatus()
                }).catch(e => {
                    self.isNextStep = true;
                    errorToast.show(e.result.message);
                    console.log(e)
                })
            },
            getPaymentStatus() { // 查看申请状态
                let self = this
                API.getPaymentStatus({
                    entityId: sessionStorage.getItem('entityId'),
                    applyType: "WECHAT_XW"
                }).then(data => {
                    let isApply = data.isApply // 申请记录
                    let isEnable = data.isEnable // 启用状态
                    // 已申请会返回下列内容
                    self.auditStatus = data.auditStatus // 申请状态
                    self.upgradeTime = data.upgradeTime // 申请提交时间
                    self.auditMessage = data.auditMessage // 审核失败原因
                    self.getApplyTime()
                    let signUrl = data.signUrl // 签约url
                    if (isApply === false) { // 未申请
                        // 返回申请页
                        this.$router.push({
                            path: '/index'
                        })
                    } else { // 已申请
                        if (self.auditStatus === 'RESET') { // 已重置
                            // 返回申请页
                            this.$router.push({
                                path: '/index'
                            })
                        }
                        if (self.auditStatus == 'XW_UPGRADE_SIGN') {
                            this.$router.push({
                                path: '/merchants/third/third',
                                query: {
                                    signUrl: signUrl
                                }
                            })
                        }
                        if (self.auditStatus == 'XW_UPGRADE_ACCOUNT_VERIFY') {
                            self.getVerifyInfo()
                        }
                    }
                })
            },
            reApply() {
                this.$router.push({
                    path: '/merchants/first/first',
                    query: {
                        isNeedGetInfo: true
                    }
                }) // 需要从服务端获取表单数据
            },
            checkInfo() { // 查看申请资料
                this.$router.push({
                    path: '/merchantupgradeinfo',
                }) // 不可修改
            },
            getApplyTime() {
                if (this.upgradeTime == null || this.upgradeTime == '') return
                var date = new Date(this.upgradeTime)
                var year = date.getFullYear() + '年'
                var month = date.getMonth() + 1 + '月'
                var day = date.getDate() + '日 '
                var hour = ''
                if (date.getHours() < 10) {
                    hour = '0' + date.getHours() + ":"
                } else {
                    hour = date.getHours() + ":"
                }
                var min = ''
                if (date.getMinutes() < 10) {
                    min = '0' + date.getMinutes()
                } else {
                    min = date.getMinutes()
                }
                this.modifyInputInfo({
                    type: 'upgradeTime',
                    value: '申请提交时间：' + year + month + day + hour + min
                })
            },
            getDeadlineTime() {
                if (this.merchantInfo.deadlineTime == null || this.merchantInfo.deadlineTime == '') return ''
                var date = new Date(Date.parse(this.merchantInfo.deadlineTime.replace(/-/g, "/")))
                var year = date.getFullYear() + '年'
                var month = date.getMonth() + 1 + '月'
                var day = date.getDate() + '号'
                var hour = ''
                if (date.getHours() < 10) {
                    hour = '0' + date.getHours() + ":"
                } else {
                    hour = date.getHours() + ":"
                }
                var min = ''
                if (date.getMinutes() < 10) {
                    min = '0' + date.getMinutes()
                } else {
                    min = date.getMinutes()
                }
                return '请在' + year + month + day + hour + min + '前完成打款'
            },
            getVerifyInfo() {
                let self = this
                API.getAccountVerifyInfo({
                    entityId: sessionStorage.getItem('entityId')
                }).then(data => {
                    self.isNextStep = true;
                    let info = tools.xwUpgradePayParam(self.merchantInfo, data)
                    self.modifyInputInfo(info) // 修改商户信息
                    self.deadlineHeader = self.getDeadlineTime()
                }).catch(e => {
                    self.isNextStep = true;
                    errorToast.show(e.result.message);
                    console.log(e)
                })
            }
        },
        components: {
            BtnCustomShort
        },
        created() {
            this.changeViewState("detail")
            this.imgAuditingContent = "https://assets.2dfire.com/frontend/760515f5926619d080ed765d3802a2ac.png";
            this.imgFailedContent = "https://assets.2dfire.com/frontend/0d3bb4caf2b823c8b8e31a9a3fe08e31.png";
            this.getPaymentStatus()
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .head-info {
        margin-top: 72px;
        margin-left: 30px;
        margin-right: 30px;
        font-size: 34px;
        color: #FF0033;
        text-align: center
    }
    .head-tips {
        margin-top: 30x;
        margin-left: 30x;
        margin-right: 30px;
        font-size: 26px;
        color: #666666;
        text-align: left
    }
    .footer {
        height: 236px;
        width: 100%;
        bottom: 0;
        position: relative;
        margin-top:72px;

        .btn {
            text-align: center;
            margin-left: 76px;
            margin-right: 76px;
        }
        .tips {
            margin-left: 72px;
            margin-right: 72px;
            font-size: 26px;
            color: #999999;
            text-align:center
        }
        .tips-margintop {
            margin-top:20px;
        }
    } 
    .audit-wrapper {
        margin-top: 212px;
        .top-wrapper{
            text-align: center;

            .img-audit-status {
                width: 58px;
                height: 58px;
                vertical-align: middle;
            }
            .audit-status {
                margin-top: 40px;
                color: #333333;
                font-size: 34px;
            }
            .submit-time {
                margin-top: 30px;
                color: #333333;
                font-size: 30px;
                margin-bottom: 10px;
            }
        }

        .content-wrapper {
            .explain-content {
                color: #666666;
                font-size: 26px;
                line-height: 36px;
                padding: 0 30px;
            }

            .check-info {
                color: #0088ff;
                font-size: 26px;
                line-height: 36px;
                padding: 0 30px;
            }
        }
        .failure-wrapper {
            .failure-content {
                padding: 20px 30px;
                font-size: 26px;
                color: #666666;
                line-height: 36px;
                text-align: center;
            }
            .btn {
                text-align: center;
                margin: 52px 76px;
            }
        }
    }
</style>