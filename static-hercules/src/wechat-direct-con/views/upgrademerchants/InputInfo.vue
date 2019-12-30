<template>
    <div>
        <section class="main ">
            <div class="title-more">
                <span class="title-name">商户信息</span>
                <span class="more" @click="checkMore">查看更多</span>
            </div>

            <ul class="input-main border-b border-t">
                <info-input :title="'商户号'" :input-name="'merchantNum'" :max-length="'50'"
                    :value="merchantInfo.merchantNum" :edit-sub-status=false />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">升级资料</h3>
            <ul class="input-main border-b border-t">

                <info-select :title="'主体类型'" :select-name="'merchantType'" :childStatus="false"
                    :value="merchantInfo.merchantType" />
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">营业执照</span>
                            <span class="content" v-show="merchantInfo.businessLicensePic == ''">必填</span>
                        </div>
                        <info-photo :title="''" :img-name="'businessLicensePic'"
                            :value="merchantInfo.businessLicensePic" />
                    </li>
                </div>

                <info-input :title="'营业执照注册号'" :input-name="'businessLicenseNum'" :max-length="'50'"
                    :value="merchantInfo.businessLicenseNum" :explain="'请填写营业执照上的营业执照注册号。'" />

                <info-input :title="'商户名称'" :input-name="'merchantName'" :max-length="'50'"
                    :value="merchantInfo.merchantName" :explain="'请填写营业执照上的商户名称。'" />

                <info-select :title="'注册地址'" :select-name="'registerAddress'"
                    :objectValue="merchantInfo.registerAddress" :isObjectValue="true" />

                <info-input :title="'法人姓名'" :input-name="'corporationName'" :max-length="'50'"
                    :value="merchantInfo.corporationName" :explain="'根据微信规定，个体工商户必须同小微商户联'" />

                <info-switch class="required" ref="switchDeadline" :title="'营业期限'" :switch-name="'businessDeadLine'"
                    :value="merchantInfo.businessDeadLine" :explain="'有效期必须大于60天。'" />

                <info-select :title="'开始时间'" :select-name="'businessStartTime'" :childStatus="true"
                    :value="merchantInfo.businessStartTime" />

                <info-select v-show="merchantInfo.businessDeadLine" :title="'结束时间'" :select-name="'businessEndTime'"
                    :childStatus="true" :value="merchantInfo.businessEndTime" />

                <info-select :title="'营业执照类型'" :select-name="'businessLicenseType'"
                    :value="merchantInfo.businessLicenseType" :childStatus="false"
                    :explain="'若营业执照上的营业执照注册号为18位统一社会信用代码，请选择“已三证合一”，否则请选择“未三证合一”。'" />

                <div v-show="merchantInfo.businessLicenseType=='未三证合一'">
                    <div class="input-wrapper">
                        <li class="input-list photo required border-b">
                            <div class="name">
                                <span class="title">组织机构代码证照片</span>
                                <span class="content" v-show="merchantInfo.orgPhoto == ''">必填</span>
                            </div>
                            <info-photo :title="''" :img-name="'orgPhoto'" :value="merchantInfo.orgPhoto">
                            </info-photo>
                        </li>
                    </div>
                    <div class="input-wrapper">
                        <div class="name input-list border-b">
                            <span class="title-span">组织机构代码有效期限</span>
                        </div>
                        <info-select :title="'开始时间'" :select-name="'orgStartTime'" :childStatus="true"
                            :value="merchantInfo.orgStartTime" />

                        <info-select :title="'结束时间'" :select-name="'orgEndTime'" :childStatus="true"
                            :value="merchantInfo.orgEndTime" />
                    </div>

                    <info-input :title="'组织机构代码'" :input-name="'orgNo'" :max-length="'50'"
                        :value="merchantInfo.orgNo" />
                </div>

                <!-- <div class="input-wrapper" v-show="merchantInfo.merchantType == '个体工商户'">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">特殊资质</span>
                            <span class="content" v-show="merchantInfo.specialPic == ''">必填</span>
                        </div>
                        <info-photo :title="''" :img-name="'specialPic'" :explain="'类似《食品经营许可证》或者其他特殊资质证明文件'"
                            :value="merchantInfo.specialPic">
                        </info-photo>
                    </li>
                </div> -->

                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">特殊资质</span>
                        </div>
                        <info-multi-photo :title="'类似《食品经营许可证》或者其他特殊资质证明文件'" :img-name="'qualification'"
                            :list="merchantInfo.qualification">
                        </info-multi-photo>
                    </li>
                </div>
            </ul>
        </section>

        <section class="main" v-show="merchantInfo.merchantType=='企业商户'">
            <h3 class="h3">对公收款信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'开户名称'" :input-name="'businessAccountName'" :max-length="'50'"
                    :value="merchantInfo.businessAccountName" :explain="'请填写对公账户，开户名称必须与营业执照上的“商户名“一致'" />
                <info-select :title="'开户银行'" :select-name="'businessAccountBank'"
                    :value="merchantInfo.businessAccountBank" />
                <info-input :title="'银行卡号'" :input-name="'businessAccountNumber'" :max-length="'50'"
                    :value="merchantInfo.businessAccountNumber" />
                <info-select :title="'开户省'" :select-name="'businessAccountAddressProvince'"
                    :value="merchantInfo.businessAccountAddressProvince"
                    :parent-id="merchantInfo.businessAccountBankCode" />
                <info-select :title="'开户市'" :select-name="'businessAccountAddressCity'"
                    :value="merchantInfo.businessAccountAddressCity"
                    :parent-id="merchantInfo.businessAccountBankCode+'&&'+merchantInfo.businessAccountAddressProCode" />
                <info-select :title="'开户支行'" :select-name="'businessAccountSubBank'"
                    :value="merchantInfo.businessAccountSubBank"
                    :parent-id="merchantInfo.businessAccountBankCode+'&&'+merchantInfo.businessAccountAddressProCode+'&&'+merchantInfo.businessAccountAddressCityCode" />
            </ul>
        </section>

        <!--button-->
        <div class="footer">
            <div class="align-center btn">
                <button class="footer-button" @click="nextStep">提交申请</button>
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
    import {
        inputIsOk
    } from 'src/wechat-direct-con/libs/rules'
    import errorToast from 'src/wechat-direct-con/libs/errorToast'
    import BtnCustomShort from '../../components/btn-custom-short.vue'
    import API from '../../config/api'
    import tools from 'src/wechat-direct-con/libs/tools'
    import sessionStorage from '@2dfire/utils/sessionStorage'

    export default {
        name: 'first',
        data() {
            return {
                isNextStep: true,
                isNeedGetInfo: this.$route.query.isNeedGetInfo, //是否需要从服务端获取数据
                currentInputData: "",
            }
        },
        computed: {
            ...mapState([
                'merchantInfo',
                'paymentWxXwUpgradeInfo'
            ]),
            ...mapGetters([
                'merchantInfoStepFirst',
                'merchantOrgInfo',
                'merchantBusinessAccountInfo'
            ])
        },
        created() {
            this.changeViewState("edit")
            this.init()
        },
        watch: {
            merchantInfo: {
                handler(newName, oldName) {
                    if (this.currentInputData == '') return
                    if (this.currentInputData != this.upgradeInfoToString(newName)) {
                        this.modifyInputInfo({
                            type: 'xwUpgradeChanged',
                            value: true
                        });
                    } else {
                        this.modifyInputInfo({
                            type: 'xwUpgradeChanged',
                            value: false
                        });
                    }
                },
                deep: true,
                immediate: true
            },
        },
        components: {
            BtnCustomShort
        },
        methods: {
            ...mapActions(['modifyInputInfo']),
            ...mapActions(['changeViewState']),
            init() {
                let self = this
                this.modifyInputInfo({
                    type: 'xwUpgradeChanged',
                    value: false
                });
                API.getWxXwAuthInfoAndUpgradeInfo({
                    entityId: sessionStorage.getItem('entityId')
                }).then(data => {
                    let info = tools.paramToWxXwUpgradeInfo(data.paymentWxXwUpgradeInfo, this.merchantInfo)
                    self.modifyInputInfo(info) // 修改商户信息
                    if (self.merchantInfo.businessDeadLine == false) {
                        self.modifyInputInfo({
                            type: 'businessEndTime',
                            value: ''
                        });
                    }
                    self.currentInputData = self.upgradeInfoToString()
                    self.$refs.switchDeadline.initSwitch();
                })
            },
            changeDate(strTime) { // 将字符串转换为日期格式
                var strBeginTime = strTime.replace("-", "/").replace("-", "/")
                var beginDate = new Date(Date.parse(strBeginTime))
                return beginDate
            },
            upgradeInfoToString() {
                let inputDataString = ''
                for (let i = 0, leg = this.merchantInfoStepFirst.length; i < leg; i++) {
                    let key = this.merchantInfoStepFirst[i]
                    inputDataString += this.merchantInfo[key]
                }

                if (this.merchantInfo.businessLicenseType == '未三证合一') {
                    for (let i = 0, leg = this.merchantOrgInfo.length; i < leg; i++) {
                        let key = this.merchantOrgInfo[i]
                        inputDataString += this.merchantInfo[key]
                    }
                }

                if (this.merchantInfo.merchantType == '企业商户') {
                    for (let i = 0, leg = this.merchantBusinessAccountInfo.length; i < leg; i++) {
                        let key = this.merchantBusinessAccountInfo[i]
                        inputDataString += this.merchantInfo[key]
                    }
                }
                return inputDataString
            },
            nextStep() {
                const self = this

                if (!self.isNextStep) {
                    return false
                }
                self.isNextStep = true
                for (let i = 0, leg = this.merchantInfoStepFirst.length; i < leg; i++) {
                    let key = this.merchantInfoStepFirst[i]
                    const ret = inputIsOk(this.merchantInfo[key], key)
                    if (!ret.data) {
                        if ((key == 'businessEndTime') && (self.merchantInfo.businessDeadLine == false)) {
                            continue
                        } else {
                            self.isNextStep = true
                            errorToast.show(ret.message)
                            return false
                        }
                    }
                }

                if (this.merchantInfo.businessLicenseType == '未三证合一') {
                    for (let i = 0, leg = this.merchantOrgInfo.length; i < leg; i++) {
                        let key = this.merchantOrgInfo[i]
                        const ret = inputIsOk(this.merchantInfo[key], key)
                        if (!ret.data) {
                            self.isNextStep = true
                            errorToast.show(ret.message)
                            return false
                        }
                    }
                    if (this.changeDate(this.merchantInfo.orgEndTime) <= this.changeDate(this.merchantInfo
                            .orgStartTime)) {
                        this.isNextStep = true;
                        errorToast.show('组织机构代码有效期限,结束时间需大于开始时间');
                        return false;
                    }
                }

                if (this.merchantInfo.merchantType == '企业商户') {
                    for (let i = 0, leg = this.merchantBusinessAccountInfo.length; i < leg; i++) {
                        let key = this.merchantBusinessAccountInfo[i]
                        const ret = inputIsOk(this.merchantInfo[key], key)
                        if (!ret.data) {
                            self.isNextStep = true
                            errorToast.show(ret.message)
                            return false
                        }
                    }
                }
                if (this.merchantInfo.businessDeadLine == true) {
                    if (this.changeDate(this.merchantInfo.businessEndTime) <= this.changeDate(this.merchantInfo
                            .businessStartTime)) {
                        this.isNextStep = true;
                        errorToast.show('营业期限, 结束时间需大于开始时间');
                        return false;
                    }
                }
                let param = tools.xwUpgradeInfoParam(self.merchantInfo, self.paymentWxXwUpgradeInfo)

                API.upgradeWxWx({
                    param: param
                }).then(data => {
                    self.isNextStep = true;
                    this.$router.replace({
                        path: '/merchants/second/second'
                    })
                }).catch(e => {
                    self.isNextStep = true;
                    errorToast.show(e.result.message);
                    console.log(e)
                })
            },

            checkMore() {
                this.$router.push({
                    path: '/merchantinfo'
                });
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .pickerPop {
    /deep/ .picker {
        height: 260px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: white;
        z-index: 2;
        .picker-toolbar {
            height: 44px;
            line-height: 44px;
            background: #e1e0e0;
            display: flex;
            justify-content: space-between;
            flex-flow: nowrap row;
            .mint-datetime-action {
                margin-top: 15px;
                font-size: 15px;
                justify-content: space-between;
                color: #0088ff !important;
                position: relative;
                text-align: center;
                margin-left: 15px;
            }
        }
        }
        /deep/ .picker-items {
            .picker-slot-wrapper {
            margin-top: 8px;
            font-size: 13px;
            }
        }
    }
    .explain {
        font-size: 26px;
        margin-top: -40px;
    }
    .title-span {
        font-size: 30px;
        color: #333;
    }
    .title-more {
        margin: 72px 30px 20px;
        display: flex;
        position: relative;

        .title-name {
            font-size: 30px;
            color: #333333;
            font-weight: bold;
            flex: 1;
        }
        .more {
            flex: 1;
            font-size: 30px;
            color: #0088ff;
            text-align: right;
        }
    }
    .footer {
        height: 236px;
        width: 100%;
        bottom: 0;
        position: relative;
        margin-top: 72px;

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