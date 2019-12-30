<template>
    <div class="shopinfo-wrapper">
        <p class="baseinfo m-l">基本资料</p>
        <div class="main border-b border-b">
            <div class="formitem border-b">
                <p class="title">店铺名称</p>
                <span class="m-r value">{{baseInfo.shopName}}</span>
            </div>
            <div class="formitem border-b">
                <p class="title">店铺编码</p>
                <span class="m-r value">{{baseInfo.shopCode}}</span>
            </div>
            <div class="formitem border-b" v-if="openType === 'wechat_payment'">
                <p class="title">微信商户号</p>
                <span class="m-r value">{{baseInfo.wechatMerId}}</span>
            </div>
            <div class="formitem border-b" v-if="openType !== 'wechat_payment'">
                <p class="title">营业执照名称</p>
                <div class="creditcode" v-if="!isview">
                    <input type="text"
                           placeholder="必填"
                           :value="baseInfo.businessLicenseName"
                           @focus="showBusinessLicenseName = true"
                           @blur="showBusinessLicenseName = false"
                           @input="changeBusinessLicenseName($event)"
                           maxlength="40"/>
                    <i class="closeicon" @click="clearBusinessLicenseName" v-show="showBusinessLicenseName"></i>
                </div>
                <span class="m-r value" v-else>{{baseInfo.businessLicenseName}}</span>
            </div>
            <div class="formitem border-b" v-if="openType !== 'wechat_payment'">
                <p class="title">统一社会信用代码</p>
                <div class="creditcode" v-if="!isview">
                    <input type="text"
                           placeholder="必填"
                           :value="baseInfo.creditCode"
                           @focus="showCreditCode = true"
                           @blur="showCreditCode = false"
                           @input="changeCreditCode($event)"/>
                    <i class="closeicon" @click="clearCreditCode" v-show="showCreditCode"></i>
                </div>
                <span class="m-r value" v-else>{{baseInfo.creditCode}}</span>
            </div>
            <div class="formitem border-b" v-if="openType !== 'wechat_payment'">
                <p class="title">联系人</p>
                <div class="contactname" v-if="!isview">
                    <input type="text"
                           placeholder="必填"
                           :value="baseInfo.contactName"
                           @focus="showContactName = true"
                           @blur="showContactName = false"
                           @input="changeContactName($event)"
                           maxlength="10"/>
                    <i class="closeicon" @click="clearContactName" v-show="showContactName"></i>
                </div>
                <span class="m-r value" v-else>{{baseInfo.contactName}}</span>
            </div>
            <div class="formitem border-b" v-if="openType !== 'wechat_payment'">
                <p class="title">联系人手机</p>
                <div class="contactmobile" v-if="!isview">
                    <input type="text"
                           placeholder="必填"
                           @focus="showContactMobile = true"
                           @blur="showContactMobile = false"
                           :value="baseInfo.contactMobile"
                           @input="changeContactMobile($event)"
                           maxlength="11"/>
                    <i class="closeicon" @click="clearContactMobile" v-show="showContactMobile"></i>
                </div>
                <span class="m-r value" v-else>{{baseInfo.contactMobile}}</span>
            </div>
            <div class="formitem border-b" v-if="openType !== 'wechat_payment'">
                <p class="title">邮箱</p>
                <div class="contactemail" v-if="!isview">
                    <input type="text"
                           placeholder="必填"
                           :value="baseInfo.contactEmail"
                           @focus="showContactEmail = true"
                           @blur="showContactEmail = false"
                           @input="changeContactEmail($event)"
                           maxlength="40"/>
                    <i class="closeicon" @click="clearContactEmail" v-show="showContactEmail"></i>
                </div>
                <span class="m-r value" v-else>{{baseInfo.contactEmail}}</span>
            </div>
            <div class="otherplatformid border-b">
                <div class="upper">
                    <p class="title">其他平台开通店名</p>
                    <div class="otherplatformname" v-if="!isview">
                        <input type="text"
                               placeholder="必填"
                               @focus="showOtherPlateformName = true"
                               @blur="showOtherPlateformName = false"
                               @input="changeotherplatformName($event)"
                               :value="baseInfo.otherPlateformName"
                               maxlength="40"/>
                        <i class="closeicon" @click="clearOtherplatformName" v-show="showOtherPlateformName"></i>
                    </div>
                    <span class="m-r value" v-else>{{baseInfo.otherPlateformName}}</span>
                </div>
                <p class="example">例如：口碑（大大饺子馆）</p>
            </div>
            <!--<div class="formitem">-->
            <!--<p class="title">是否需要微信支付台牌物料（快递到付)</p>-->
            <!--<span class="choosepayway" @click="choosePayWay" v-if="!isview">-->
            <!--{{baseInfo.needMaterial  ? '是' : '否'}}-->
            <!--</span>-->
            <!--<span class="m-r value" v-else>{{baseInfo.needMaterial ? '是' : '否'}}</span>-->
            <!--</div>-->
        </div>
        <p class="example hint">如需物料，请联系客服获取（4000166588）</p>
        <mt-picker :slots="pickerSlots"
                   showToolbar
                   value-key="name"
                   :class="['border-f', {active: showPicker}]"
                   @change="onValuesChange"
                   rotate-effect
                   :visible-item-count="3">
            <a href="javascript:void(0)"
               class='cancel'
               @click="closePicker">取消</a>
            <a href="javascript:void(0)"
               class="title">快递到付</a>
            <a href="javascript:void(0)"
               class="choosed"
               @click="choosed">完成</a>
        </mt-picker>
        <div class="mask" v-show="showPicker"></div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {fixedBody, looseBody} from 'base/utils/unit.js'

    export default {
        name: 'ShopBaseInfo',
        props: {
            isview: {
                type: Boolean,
                required: true,
                default: false
            },
            openType: {
                type: String,
                default: ''
            },
            baseInfo: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                showPicker: false,
                showCreditCode: false,
                showContactName: false,
                showContactMobile: false,
                showContactEmail: false,
                showBusinessLicenseName: false,
                showOtherPlateformName: false,
                currentPickerValue: '',
                pickerSlots: [{
                    flex: 1,
                    values: ['是', '否'],
                    defaultIndex: 0 // 默认为是
                }]
            }
        },
        methods: {
            ...mapActions([
                'modifyShopInfo'
            ]),
            changeCreditCode($event) {
                this.modifyShopInfo({type: 'creditCode', value: $event.target.value})
            },
            clearCreditCode() {
                this.modifyShopInfo({type: 'creditCode', value: ''})
            },
            changeContactName($event) {
                this.modifyShopInfo({type: 'contactName', value: $event.target.value})
            },
            clearContactName() {
                this.modifyShopInfo({type: 'contactName', value: ''})
            },
            changeBusinessLicenseName($event) {
                this.modifyShopInfo({type: 'businessLicenseName', value: $event.target.value})
            },
            clearBusinessLicenseName() {
                this.modifyShopInfo({type: 'businessLicenseName', value: ''})
            },
            changeContactMobile($event) {
                this.modifyShopInfo({type: 'contactMobile', value: $event.target.value})
            },
            clearContactMobile() {
                this.modifyShopInfo({type: 'contactMobile', value: ''})
            },
            changeContactEmail($event) {
                this.modifyShopInfo({type: 'contactEmail', value: $event.target.value})
            },
            clearContactEmail() {
                this.modifyShopInfo({type: 'contactEmail', value: ''})
            },
            changeotherplatformName($event) {
                this.modifyShopInfo({type: 'otherPlateformName', value: $event.target.value})
            },
            clearOtherplatformName() {
                this.modifyShopInfo({type: 'otherPlateformName', value: ''})
            },
            // choosePayWay() {
            //     this.showPicker = true
            //     fixedBody()
            // },
            closePicker() {
                this.showPicker = false
                looseBody()
            },
            choosed() {
                this.showPicker = false
                looseBody()
                // let needMaterial = this.currentPickerValue === '是'
                // this.baseInfo.needMaterial = needMaterial
                // this.modifyShopInfo({type: 'needMaterial', value: needMaterial})
            },
            onValuesChange(picker, values) {
                this.currentPickerValue = values[0]
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    input::-webkit-input-placeholder {
        text-align: right;
        font-size: 14PX;
        color: #FF0033;
        letter-spacing: 0;
    }

    input::-moz-placeholder {
        text-align: right;
        font-size: 14PX;
        color: #FF0033;
        letter-spacing: 0;
    }

    input:-ms-input-placeholder {
        text-align: right;
        font-size: 14PX;
        color: #FF0033;
        letter-spacing: 0;
    }

    .example {
        font-size: 13PX;
        color: #999999;
        letter-spacing: 0;
        line-height: 18px;
    }
    .hint{
        padding: 10px 0 0 15px ;
    }
    .baseinfo {
        font-size: 15PX;
        color: #333333;
        line-height: 20px;
        margin-bottom: 10px;
        letter-spacing: 0;
        font-weight: bold;
    }

    .main {
        background: #FFFFFF;
        padding-left: 15px;

        .formitem, .otherplatformid {
            height: 43px;
            line-height: 43px;
            display: flex;
            flex-flow: nowrap row;
            font-size: 15PX;
            justify-content: space-between;

            .title {
                color: #333333;
                letter-spacing: 0;
                height: 43px;
                box-sizing: border-box;
                vertical-align: middle;
            }

            .title + .value {
                letter-spacing: 0;
            }

            .choosepayway {
                flex: 1;
                position: relative;
                z-index: 1;
                text-align: right;
                margin-right: 15px;
                color: #0088FF;
            }

            .creditcode, .contactname, .contactmobile, .contactemail, .otherplatformname {
                flex: 1;
                position: relative;
                z-index: 1;
                text-align: right;
                margin-right: 15px;
            }

            input {
                width: 80%;
                outline: 0;
                margin-left: 5px;
                padding: 0;
                border: none;
                height: 43px;
                background: transparent;
                letter-spacing: 0;
                text-align: right;
                font-size: 15px;
                box-sizing: border-box;
                margin-top: 0.3px;
                color: #0088FF;

                & + i {
                    width: 15px;
                    height: 15px;
                    display: inline-block;
                    background-size: cover;
                    vertical-align: -3px;
                    background-image: url(https://assets.2dfire.com/frontend/cb35d2e0f3e58940fa7ae6e50ff2f7e2.png);
                }
            }

            span.value {
                color: #666;
            }

        }

        .otherplatformid {
            display: block;
            height: 70px;

            .upper {
                display: flex;
                flex-flow: nowrap row;
                justify-content: space-between;
            }
        }
    }

    .picker {
        height: 260px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: white;
        z-index: 100;
        opacity: 0;
        transform: translateY(260px);
        transition: all 0.4s ease-in-out;

        &.active {
            opacity: 1;
            transform: translateY(0);
        }

        /deep/ .picker-toolbar {
            height: 44px;
            line-height: 44px;
            background: #E1E0E0;
            display: flex;
            justify-content: space-between;
            flex-flow: nowrap row;

            a {
                font-size: 15PX;
                color: #0088FF;
                display: inline-block;
                padding: 0;
            }

            .cancel {
                margin-left: 15px;
                position: relative;
                z-index: 2;
            }

            .title {
                font-size: 15PX;
                color: #333;
            }

            .choosed {
                font-size: 15PX;
                color: #0088FF;
                margin-right: 15px;
                position: relative;
                z-index: 2;
            }
        }

        /deep/ .picker-items {
            height: 216px;

            .picker-slot-wrapper {
                margin-top: 54px;
            }
        }
    }

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 4;
    }
</style>
