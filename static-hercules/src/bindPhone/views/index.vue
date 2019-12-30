<template>
    <div>
        <div class="login" v-show="showLogin">
            <div class="login-img-text">
                <div class="img-div">
                    <img src="../image/kds02.png">
                </div>
                <div class="text-div">
                    二维火KDS确认登录
                </div>
            </div>
            <div class="btn-div">
                <div class="button" v-bind:class='okBtnColor' @click="confirmLogin">确认登录</div>
            </div>
        </div>
        <loginSuccess v-show="showLoginSuccess"></loginSuccess>
        <bindPhone v-show="showBindPhone" @bindPhoneSuccess="bindPhoneSuccess"></bindPhone>
    </div>
</template>
<script>
import API from '../config/api';
import { getQuery } from '../../base/utils/tool';
const userAgent = navigator.userAgent;
const { token, v, scan_uid } = getQuery();
const isAlipay = userAgent.indexOf('AlipayClient');
const color = isAlipay !== -1 ? 'blue' : 'green';
const { alert: alertDialog } = require('base/components/dialogs/events.js');
export default {
    data() {
        return {
            okBtnColor: `${color}Background`,
            v: v,
            showLogin: true,
            showLoginSuccess: false,
            showBindPhone: false
        };
    },
    methods: {
        confirmLogin() {
            let self = this;
            API.getScanLoginForH5({
                token: token
            }).then(data => {
                if (data.status === -1) {
                    self.$toast(data.message)
                }else if (data.status === 2) {
                    self.showLogin = false;
                    self.showLoginSuccess = true;
                    self.showBindPhone = false;
                    document.title = "授权登录成功"
                }
            });
        },

        //绑定手机号码成功后执行
        bindPhoneSuccess() {
            let self = this;
            self.showLogin = false;
            self.showLoginSuccess = true;
            self.showBindPhone = false;
            document.title = "授权登录成功"
        },
        //绑定用户和码的关系
        bindQrCodeForH5() {
            let self = this;
            API.getBindQrCodeForH5({
                token: token,
                uid: scan_uid,
                third_part_type: isAlipay === -1 ? 1 : 2
            }).then(data => {
                if (data.status === -1) {
                    self.$toast(data.message);
                }
            });
        }
    },
    components: {
        loginSuccess: require('./login-success'),
        bindPhone: require('./bind-phone')
    },
    created() {
        let self = this;
        self.bindQrCodeForH5();
        if (self.v != 1) {
            self.showLogin = false;
            self.showLoginSuccess = false;
            self.showBindPhone = true;
            document.title = "绑定手机号码"
        }
    }
};
</script>
<style lang="scss" scoped>
.login {
    .login-img-text {
        margin-top: 150px;
        .img-div {
            text-align: center;
            padding-bottom: 30px;
            img {
                width: 100px;
            }
        }
        .text-div {
            text-align: center;
            font-size: 32px;
        }
    }
    .btn-div {
        margin-top: 100px;
        padding: 0 30px;
        text-align: center;
        .button {
            color: #fff;
            width: 100%;
            height: 80px;
            line-height: 80px;
            border-radius: 15px;
            font-size: 34px;
            margin-bottom: 30px;
        }
    }
}
.greenBackground {
    background-color: #00cc33;
}
.blueBackground {
    background-color: #0088cc;
}
</style>
