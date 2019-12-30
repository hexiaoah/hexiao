<template>
    <div class="bind-phone">
        <div class="bind-phone-div">
            <div class="phone-div">
                <div class="area-code-div" @click="chooseCountryCode">
                    <span>{{area.code}}</span>
                    <img src="../image/pull.png" class="img">
                </div>
                <input type="tel"
                       class="number-input phone-input"
                       placeholder="请输入您的手机号码"
                       v-model.trim.lazy="mobile"
                       maxLength="11"
                />
            </div>
            <div>
                <input type="text"
                       class="number-input code-input"
                       placeholder="手机验证码"
                       v-model.trim.lazy="inputVerCode"
                       maxLength="6"
                />
                <a class="identifying-code-a button"  v-bind:class='getCodeBtnColor' @click="clickCodeBtn">
                    {{getCodeText}}
                </a>
            </div>
        </div>
        <p class="text">二维火帐户可用来登录所有二维火出品的应用。</p>
        <div class="bind-phone-button">
            <a class="bind-a button" v-bind:class='bindBtnColor' @click="clickBindBtn">绑定</a>
        </div>
        <confirm
                @ok="handleDialogEvent(confirm, 'ok')"
                @cancle="handleDialogEvent(confirm, 'cancle')"
                v-show="confirm.show"
                :ok-btn-text="confirm.okBtnText"
                :cancle-btn-text="confirm.cancleBtnText"
                :title="confirm.title"
        >
            <p class="disc-text">
                用户在同意本协议后，方可进行二维火账户资产信息和支付宝账户的绑定。涉及到个人资产和个人信息如下：
            </p>
            <p class="disc-text">
                1.二维火会员卡储值金额、点赞道具等个人资产。
            </p>
            <p class="disc-text">
                2.二维火会员信息，优惠券、订单、积分等。
            </p>
        </confirm>
        <chooseArea
                v-show="area.show"
                :defaultCode="area.code"
                :title="area.title"
                @ok="handleAreaEvent"
                @cancle="handleDialogEvent(area, 'cancle')"
                :list='area.list'
        >
        </chooseArea>
    </div>
</template>
<script>
import API from '../config/api';
import { getQuery } from '../../base/utils/tool';
const { scan_uid, token } = getQuery();
const userAgent = navigator.userAgent;
const isAlipay = userAgent.indexOf('AlipayClient');
const backgroundColor = isAlipay !== -1 ? 'blue' : 'green';

const { alert: alertDialog } = require('base/components/dialogs/events.js');
export default {
    data() {
        return {
            mobile: '',
            verCode: '',
            seconds: 0,
            inputVerCode: '',
            getCodeBtnColor: backgroundColor,
            defaultColor: backgroundColor,
            bindBtnColor: backgroundColor,
            getCodeText: '获取验证码',
            confirm: {
                show: false,
                okBtnText: '同意绑定',
                cancleBtnText: '',
                okCallBack: 1,
                cancleCallBack: null,
                title: '手机绑定协议'
            },
            area: {
                code: '+86',
                checkPattern: '^1([3578][0-9]|45|47|66|98|99)[0-9]{8}$',
                title: '选择国家/地区',
                show: false,
                okCallBack: 1,
                cancleCallBack: null,
                list: [
                    {
                        name: '中国',
                        value: '+86',
                        checkPattern: '^1([3578][0-9]|45|47|66|98|99)[0-9]{8}$'
                    }
                ]
            }
        };
    },
    methods: {
        //点击获取验证码按钮
        clickCodeBtn() {
            let self = this;
            if (self.seconds === 0) {
                if (!self.mobile) {
                    alertDialog.show({
                        content: '手机号码不能为空',
                        okBtnText: '确定'
                    });
                    return false;
                }
                const checkPattern = eval('/' + self.area.checkPattern + '/');
                if (!checkPattern.test(self.mobile)) {
                    alertDialog.show({
                        content: '请输入正确的手机号码',
                        okBtnText: '确定'
                    });
                    return false;
                }
                self.getVerCode();
            }
        },
        //获取验证码
        getVerCode() {
            let self = this;
            API.getCode({
                country_code: self.area.code,
                mobile: self.mobile
            }).then(data => {
                self.verCode = data;
                self.seconds = 60;
                self.getCodeText = self.seconds + 's后重新获取';
                self.getCodeBtnColor = 'gray';

                //获取验证码成功之后开始倒计时
                let time = setInterval(function() {
                    self.seconds--;
                    self.getCodeText = self.seconds + 's后重新获取';
                    if (self.seconds < 1) {
                        clearInterval(time);
                        self.seconds = 0;
                        self.getCodeText = '获取验证码';
                        self.getCodeBtnColor = self.defaultColor;
                    }
                }, 1000);
            });
        },

        //获取区号列表
        getAreaCodeList() {
            API.getCountryCodeList().then(data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].value = data[i].countryCode;
                }
                this.area.list = data;
            });
        },

        //点击绑定按钮
        clickBindBtn() {
            let self = this;
            if (!self.mobile) {
                alertDialog.show({
                    content: '手机号码不能为空',
                    okBtnText: '确定'
                });
                return false;
            }
            if (!self.inputVerCode) {
                alertDialog.show({
                    content: '手机验证码不能为空',
                    okBtnText: '确定'
                });
                return false;
            }
            self.confirm.show = true;
        },
        handleDialogEvent(dialog, eventName) {
            let self = this;
            const cb = dialog[eventName + 'CallBack'];
            if (cb) {
                self.bindPhone();
            }
            dialog.show = false;
        },

        //绑定手机号
        bindPhone() {
            let self = this;
            API.bindMobile({
                country_code: self.area.code,
                mobile: self.mobile,
                token: token,
                ver_code: self.inputVerCode
            }).then(data => {
                console.log(data);
                if (data.status === -1) {
                    self.$toast(data.message);
                } else if (data.status === 2) {
                    self.bindPhoneSuccess();
                }
            });
        },
        bindPhoneSuccess() {
            this.$emit('bindPhoneSuccess');
        },
        handleAreaEvent(item) {
            this.area.code = item.value;
            this.area.checkPattern = item.checkPattern;
            this.area.show = false;
        },
        chooseCountryCode() {
            this.area.show = true;
        },
        scanLoginForH5() {
            let self = this;
            API.getScanLoginForH5({
                token: token
            }).then(data => {
                if (data.status === -1) {
                    self.$toast(data.message);
                }
            });
        }
    },
    components: {
        confirm: require('../components/confirm'),
        chooseArea: require('../components/chooseArea')
    },
    created() {
        let self = this;
        self.getAreaCodeList();
    }
};
</script>
<style lang="scss" scoped>
@import '../styles/border';
.bind-phone {
    position: relative;
    top: 80px;
    .bind-phone-div {
        background: #fff;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 0 30px;
        .phone-div {
            @extend .border-bottom;
        }
        div {
            padding: 10px 0;
            .area-code-div {
                display: inline-block;
                min-width: 18%;
                font-size: 32px;
                text-align: left;
                .img {
                    position: relative;
                    bottom: 5px;
                }
            }
            .number-input {
                height: 80px;
                border: 0;
                outline: none;
                font-size: 32px;
            }
            .phone-input {
                width: 70%;
            }
            .code-input {
                width: 65%;
            }
            .identifying-code-a {
                display: inline-block;
                width: 30%;
                line-height: 60px;
                margin-top: 11px;
                float: right;
                font-size: 24px;
                border-radius: 10px;
            }
        }
    }
    .text {
        margin: 30px;
        font-size: 28px;
        color: #999999;
        line-height: 36px;
    }
    .bind-phone-button {
        padding: 0 30px;
        .bind-a {
            width: 100%;
            line-height: 80px;
            border-radius: 15px;
            font-size: 34px;
            margin: 100px auto 0;
        }
    }
    .button {
        display: inline-block;
        color: #fff;
        text-align: center;
    }
    .green {
        background-color: #00cc33;
    }
    .gray {
        background-color: gray;
    }
    .blue {
        background-color: #0088cc;
    }
    .disc-text {
        margin: 0;
    }
}
</style>
