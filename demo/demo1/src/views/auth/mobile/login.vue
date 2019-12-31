<template>
    <div class="wrap mobi">
        <form class="form_wrap">
            <Row class="form_item">
                <select class="mobi-select" v-model="loginInfo.kind">
                    <option value="0">餐饮</option>
                    <option value="1">零售</option>
                </select>
            </Row>
            <Row class="form_item">
                <input type="text" v-model.trim="loginInfo.number" placeholder="商家编号" @keydown.enter="loginSubmit"
                       maxlength="20" ></input>
            </Row>
            <Row class="form_item">
                <input type="text" v-model.trim="loginInfo.username" placeholder="超级管理员账号(admin)"
                       @keydown.enter="loginSubmit" maxlength="20"></input>
            </Row>
            <Row class="form_item">
                <input type="password" v-model.trim="loginInfo.password" placeholder="密码" @keydown.enter="loginSubmit"
                       maxlength="20" ></input>
            </Row>
            <a class="btn" @click="loginSubmit()">登录</a>
        </form>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Cookie from "@2dfire/utils/cookie";

    let pageData = {
        rightTitleBefore: _i('AUTH.RIGHT.TITLE.BEFORE'),
        rightTitleAfter: _i('AUTH.RIGHT.TITLE.AFTER'),

        loginInfo: {
            kind: '0',
            number: '',
            username: '',
            password: '',
        }
    };

    export default {
        data() {
            return pageData;
        },
        components: {
        },
        methods: {
            loginSubmit() {
//                登录信息冒泡至父组件处理
                this.$emit('emit-login', this.loginInfo);
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped="">

    .wrap {

        padding-bottom: 0;

        overflow: auto;
    }

    .mobi-select{
        border: 0;

        width: 100%;

        appearance:none;
        -webkit-appearance:none;

        padding: 0 42px 0 12px;
        background: #ffffff;
        color: #999999;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        background: url("../../../images/icon-select.png") no-repeat;
        background-size: 12px;
        background-position: 95% center;

    }

    .form_wrap {
        margin: 15px auto 0 auto;
        width: 100%;
        border-top: 1px solid #dedede;

        .form_item {
            width: 100%;
            height: 42px;
            border-bottom: 1px solid #dedede;
            background: #ffffff;
            position: relative;
            input {
                width: 100%;
                padding: 0 12px;
                background: #ffffff;
                line-height: 40px;
                height: 40px;
                font-size: 14px;
                &::-webkit-input-placeholder {
                    color: #999999;
                }
            }
        }
    }

    .btn {
        display: block;
        text-align: center;
        line-height: 42px;
        background-color: #a42525;
        background-image: linear-gradient(-180deg, #de4040 2%, #a42525 99%);
        border-radius: 5px;
        font-size: 14px;
        width: 80%;
        margin: 40px auto;
        height: 42px;
        color: #ffffff;
    }

</style>
