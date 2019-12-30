<template>
    <div>
        <div class="top-attention">提示：你已经升级为普通商户，本页只展示存档，最新资料请登录微信后台查看和修改（pay.weixin.qq.com）。</div>
         <section class="main">
            <h3 class="h3">基本信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'商户号'" :input-name="'merchantNum'" :max-length="'50'"
                    :value="merchantInfo.merchantNum" />
                <info-input :title="'门店名称'" :input-name="'shopName'" :childStatus="false"
                    :value="merchantInfo.shopName" />
                <info-input :title="'店铺所在地'" :input-name="'shopAddress'" :childStatus="false"
                    :value="merchantInfo.shopAddress.province.name+merchantInfo.shopAddress.city.name" />
                <info-input :title="'门店详细地址'" :input-name="'detailAddress'" :childStatus="false"
                    :value="merchantInfo.detailAddress" />
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺门头照</span>
                        </div>
                        <info-photo :title="''" :img-name="'shopLicensePic'" :value="merchantInfo.shopLicensePic" />
                    </li>
                </div>
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺环境照</span>
                        </div>
                        <info-photo :title="''" :img-name="'shopEnvironmentPic'"
                            :value="merchantInfo.shopEnvironmentPic" />
                    </li>
                </div>

                <info-input :title="'客服电话'" :input-name="'serviceTel'" :max-length="'50'"
                    :value="merchantInfo.serviceTel" :explain="'将在交易记录中向买家展示，请确保电话畅通以便微信回拨确认。'" />

                <info-input :title="'服务类型'" :input-name="'serviceType'" :max-length="'50'"
                    :value="merchantInfo.serviceType" />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">身份信息</h3>
            <ul class="input-main border-b border-t">
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证正面</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'" :img-name="'idCardFront'" :value="merchantInfo.idCardFront"/>
                    </li>
                </div>
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证反面</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'" :img-name="'idCardReverse'" :value="merchantInfo.idCardReverse"/>
                    </li>
                </div>
                <info-input :title="'身份证姓名'" :input-name="'idCardName'" :max-length="'50'"
                    :value="merchantInfo.idCardName" />
                <info-input :title="'证件号码'" :input-name="'idCardNumber'" :max-length="'50'"
                    :value="merchantInfo.idCardNumber" />
                <info-input :title="'身份证有效期'" :input-name="'startDate'" :max-length="'50'"
                    :value="merchantInfo.startDate.replace(/\-/g, '.')+' - '+merchantInfo.endDate.replace(/\-/g, '.')" />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">升级资料</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'主体类型'" :input-name="'merchantType'" :value="merchantInfo.merchantType" />
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">营业执照</span>
                        </div>
                        <info-photo :title="''" :img-name="'businessLicensePic'"
                            :value="merchantInfo.businessLicensePic" />
                    </li>
                </div>

                <info-input :title="'营业执照注册号'" :input-name="'businessLicenseNum'" :max-length="'50'"
                    :value="merchantInfo.businessLicenseNum"  />

                <info-input :title="'商户名称'" :input-name="'merchantName'" :max-length="'50'"
                    :value="merchantInfo.merchantName"  />

                <info-input :title="'注册地址'" :input-name="'registerAddress'"
                    :value="this.address" />

                <info-input :title="'法人姓名'" :input-name="'corporationName'" :max-length="'50'"
                    :value="merchantInfo.corporationName" />

                <info-input class="required" :title="'营业有效期'" :input-name="'businessStartTime'" :value="merchantInfo.businessStartTime+'~'+merchantInfo.businessEndTime"
                     />

                <info-input :title="'营业执照类型'" :input-name="'businessLicenseType'"
                    :value="merchantInfo.businessLicenseType" :childStatus="false"
                     />

                <div v-show="merchantInfo.businessLicenseType=='未三证合一'">
                    <div class="input-wrapper">
                        <li class="input-list photo required border-b">
                            <div class="name">
                                <span class="title">组织机构代码证照片</span>
                            </div>
                            <info-photo :title="''" :img-name="'orgPhoto'" :value="merchantInfo.orgPhoto">
                            </info-photo>
                        </li>
                    </div>
                    <div class="input-wrapper">
                        <info-input :title="'组织机构代码有效期限'" :input-name="'orgStartTime'"
                            :value="merchantInfo.orgStartTime +'~'+merchantInfo.orgEndTime" />
                    </div>

                    <info-input :title="'组织机构代码'" :input-name="'orgNo'" :max-length="'50'"
                        :value="merchantInfo.orgNo" />
                </div>


                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">特殊资质</span>
                        </div>
                        <info-multi-photo :img-name="'qualification'"
                            :list="merchantInfo.qualification">
                        </info-multi-photo>
                    </li>
                </div>
            </ul>
        </section>

        <section class="main" v-show="merchantInfo.merchantType!=='企业商户'">
            <h3 class="h3">银行卡信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'商户简称'" :input-name="'userSimpleName'" :max-length="'50'"
                    :value="merchantInfo.userSimpleName" :explain="'将在支付完成页向买家展示，需与商家的实际经营场景相符'" />
                <info-input :title="'开户名称'" :input-name="'accountName'" :max-length="'50'"
                    :value="merchantInfo.accountName" :explain="'必须与身份证姓名一致'" />
                <info-input :title="'开户银行'" :input-name="'accountBank'" :max-length="'50'"
                    :value="merchantInfo.accountBank" />
                <info-input :title="'银行卡号'" :input-name="'accountNumber'" :max-length="'50'"
                    :value="merchantInfo.accountNumber" />
                <info-input :title="'开户省'" :input-name="'accountAddressProvince'" :max-length="'50'"
                    :value="merchantInfo.accountAddressProvince" />
                <info-input :title="'开户市'" :input-name="'accountAddressCity'" :max-length="'50'"
                    :value="merchantInfo.accountAddressCity" />

                <info-input :title="'开户支行'" :input-name="'accountSubBank'" :max-length="'50'"
                    :value="merchantInfo.accountSubBank" />
            </ul>
        </section>

        <section class="main" v-show="merchantInfo.merchantType=='企业商户'">
            <h3 class="h3">银行卡信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'开户名称'" :input-name="'businessAccountName'" :max-length="'50'"
                    :value="merchantInfo.businessAccountName" />
                <info-input :title="'开户银行'" :input-name="'businessAccountBank'"
                    :value="merchantInfo.businessAccountBank" />
                <info-input :title="'银行卡号'" :input-name="'businessAccountNumber'" :max-length="'50'"
                    :value="merchantInfo.businessAccountNumber" />
                <info-input :title="'开户省'" :input-name="'businessAccountAddressProvince'"
                    :value="merchantInfo.businessAccountAddressProvince" />
                <info-input :title="'开户市'" :input-name="'businessAccountAddressCity'"
                    :value="merchantInfo.businessAccountAddressCity" />
                <info-input :title="'开户支行'" :input-name="'businessAccountSubBank'"
                    :value="merchantInfo.businessAccountSubBank"/>
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">联系信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'联系人姓名'" :input-name="'idCardName'" :max-length="'50'"
                    :value="merchantInfo.idCardName" />
                <info-input :title="'手机号码'" :input-name="'userTelNumber'" :max-length="'50'"
                    :value="merchantInfo.userTelNumber" />
                <info-input :title="'联系邮箱'" :input-name="'userEmailNumber'" :max-length="'50'"
                    :value="merchantInfo.userEmailNumber" />
            </ul>
        </section>
        <div class="footer" />

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
    import API from '../../config/api'
    import tools from 'src/wechat-direct-con/libs/tools'
    import sessionStorage from '@2dfire/utils/sessionStorage'
    import Popup from '../../components/popup.vue'

    export default {
        name: 'first',
        data() {
            return {
                address: "",
            }
        },
        computed: {
            ...mapState([
                'merchantInfo',
                'paymentWxXwUpgradeInfo',
            ]),
        },
        created() {
            this.changeViewState("detail")
            this.init()
        },
        methods: {
             ...mapActions(['changeViewState']),
            init() {
                let self = this
                API.getWxXwAuthInfoAndUpgradeInfo({
                    entityId: sessionStorage.getItem('entityId')
                }).then(data => {
                    let info = tools.paramToWxAllInfo(data.paymentWxXwAuthExtInfo, data.paymentWxXwUpgradeInfo, this.merchantInfo)
                    self.address = data.paymentWxXwUpgradeInfo.address
                    self.modifyInputInfo(info) // 修改商户信息
                })
            }
        },
        components: {
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .top-attention {
        height: 100px;
        color: #ff0033;
        padding-top: 25px;
        padding-left: 30px;
        font-size: 30px;
        line-height: 40px;
        margin: 0 auto;
    }

    .footer {
        height: 168px;
        width: 100%;
        bottom: 0;
        position: relative;
        margin-top: 36px;
        .btn {
            text-align: center;
        }
    }
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
</style>