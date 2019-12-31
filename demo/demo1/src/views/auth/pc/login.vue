<template>
    <div class="wrap pc-auth">
        <div class="left-wrap">
            <div>
                <login-mode @mode="getMode" :modeType="modeName"></login-mode>
                <form class="form_wrap" v-show="modeName=='account'">
                    <Row class="form_item">
                        <Icon type="coffee" class="icon"></Icon>
                        <Select v-model="loginInfo.kind">
                            <Option value="0">餐饮</Option>
                            <Option value="1">零售</Option>
                        </Select>
                    </Row>
                    <Row class="form_item">
                        <Icon type="bookmark" class="icon" style="margin:0 18px;"></Icon>
                        <input type="text" v-model.trim="loginInfo.number" placeholder="商家编号" @keydown.enter="loginSubmit"
                               maxlength="20" onkeyup="value=value.replace(/\s/g,'')"></input>
                    </Row>

                    <Row class="form_item">
                        <Icon type="person" class="icon"></Icon>
                        <input type="text" v-model.trim="loginInfo.username" placeholder="超级管理员账号(admin)"
                               @keydown.enter="loginSubmit" maxlength="20"
                               onkeyup="value=value.replace(/\s/g,'')"></input>
                    </Row>
                    <Row class="form_item">
                        <Icon type="locked" class="icon"></Icon>
                        <input type="password" v-model.trim="loginInfo.password" placeholder="密码"
                               @keydown.enter="loginSubmit" maxlength="20"
                               onkeyup="value=value.replace(/\s/g,'')"></input>
                    </Row>
                    <a class="btn" @click="loginSubmit()">登录</a>
                </form>
                <form class="form_wrap" v-show="modeName=='mobile'">
                    <Row class="form_item">
                        <Icon type="person" class="icon"></Icon>
                        <Select v-model="phoneLogin.countryCode" class="countrySelect" placeholder="">
                            <Option v-for="item in codeList" :value="item.countryCode" :key="item.countryCode">{{ item.countryCode }}</Option>
                        </Select>
                        <input type="text" class="phoneInput" v-model.trim="phoneLogin.mobile" placeholder="请输入手机号码"
                               @keydown.enter="mobileLoginSubmit" maxlength="20"
                               onkeyup="value=value.replace(/\s/g,'')"></input>
                    </Row>
                    <Row class="form_item">
                        <Icon type="locked" class="icon"></Icon>
                        <input type="password" v-model.trim="phoneLogin.pwd" placeholder="密码"
                               @keydown.enter="mobileLoginSubmit"
                               onkeyup="value=value.replace(/\s/g,'')"></input>
                    </Row>
                    <a class="btn" @click="mobileLoginSubmit()">登录</a>
                </form>
                <div v-show="modeName=='scan'" class="form_wrap scan-box">
                    <scan-login class="scan-login"
                                v-on:statusChange="statusChange"
                                :config="config">
                    </scan-login>
                    <div class="scan-text">
                        请登录二维火掌柜APP
                        <br>
                        打开左侧栏“扫一扫”功能登录
                    </div>
                </div>
            </div>
            <!--<div v-else>-->
                <!--&lt;!&ndash;<div class="checkTableTitle">请选择登录店铺</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<Table class="checkTable" border ref="selection" :columns="columns4" @on-select="check" :data="newCheckDataList"></Table>&ndash;&gt;-->
                <!--&lt;!&ndash;<Page :total="checkDataList.length" class="mT20" show-total @on-change="changePageSize" :page-size="2"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<a class="btn checkTableBtn" @click="checkTableSubmit">确认</a>&ndash;&gt;-->
            <!--</div>-->
        </div>

        <!--右侧权限列表 从父获取rightList-->
        <div class="right-wrap">
            <p class="right-title">{{rightTitleBefore}} {{devName}} {{rightTitleAfter}}</p>
            <div class="right-list">
                <ul>
                    <li v-for="item in rightList">{{item.rightsName}}</li>
                </ul>
            </div>
        </div>
        <div class="fl-clear"></div>
    </div>
</template>

<script>
import ScanLogin from '@2dfire/scan-login'
import _i from '@/i18n/index'
import Cookie from '@2dfire/utils/cookie'
import { SCAN_Env } from "apiConfig";
import LoginMode from './login-mode'

let pageData = {
    newCheckDataList:[],
    rightTitleBefore: _i('AUTH.RIGHT.TITLE.BEFORE'),
    rightTitleAfter: _i('AUTH.RIGHT.TITLE.AFTER'),
    loginInfo: {
        kind: '0',
        number: '',
        username: '',
        password: '',
    },
    config: {
        s_os: 'h5',
        biz_app_key: '200050',
        env: SCAN_Env
    },
    modeName: 'account',
    codeList:[{
        countryCode:'+86'
    },{
        countryCode:'+65'
    },{
        countryCode:'+852'
    },{
        countryCode:'+853'
    }],
    phoneLogin: {
        mobile: '',
        pwd: '',
        countryCode:''
    },
    checkRow:{},
    columns4: [
        {
            type: 'selection',
            width: 60,
            align: 'center',
        },
        {
            title: '店铺名称',
            key: 'shopName'
        },
        {
            title: '店铺类型',
            key: 'entityType',
            render: function (h, params) {
                let entityType = params.row.entityType;
                if (entityType==0){ return h('div','单店') };
                if (entityType==1){ return h('div','总部')};
                if (entityType==2){ return h('div','门店')}
                if (entityType==3){ return h('div','分公司')}
                if (entityType==4){ return h('div','商场')}
            }
        },
        {
            title: '店铺编码',
            key: 'shopCode'
        },
        {
            title: '职级',
            key: 'roleName'
        }
    ],
}

export default {
    props: ['rightList', 'devName'],
    data () {
        return pageData
    },
    components: {LoginMode, ScanLogin},
    methods: {
        // check(selection,row){
        //     console.log('selection',selection)
        //     console.log('row',row)
        //     this.checkRow=row
        // },

        loginSubmit () {
//                登录信息冒泡至父组件处理
            this.$emit('emit-login', this.loginInfo)
        },
        getMode (mode) {
            this.modeName = mode
        },
        mobileLoginSubmit () {
            this.$emit('emit-phone-login', this.phoneLogin)
        },
        statusChange (res) {
            if(res.data!=null){
               this.$emit('emit-scan-login',res)
            }
        },
        // changePageSize(page){
        //     console.log('page',page)
        //     const p=page-1
        //     this.newCheckDataList=this.checkDataList.slice(p*2,(p+1)*2)
        // }
    },
    created () {
        console.log('11111111',SCAN_Env)
    },
    mounted(){
        this.phoneLogin.countryCode=this.codeList[0].countryCode;
    },
    watch:{
        checkDataList:{
            handler(curVal,oldVal){
                console.log('checkDataList===========')
                this.changePageSize(1)
            },
            deep:true
        }
    },
}
</script>

<style lang="scss" scoped="">
    .countrySelect{
        .ivu-select-selection{
            width: 50px;
            display: block;
        }
    }
    .mT20{
        margin-top: 20px;
    }
    .code-select {
        width: 40px;
        line-height: 40px;
        height: 40px;
        float: left;
        border: 0;
        outline: 0;
        margin-right: 5px;
        -webkit-appearance: none;
        background-image: url("https://assets.2dfire.com/frontend/b6420948cf5dd99ca5af08ca22263f43.png");
        background-position: right center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-color: #ffffff;
        display: inline-block;
    }
    /*.checkTableBtn{*/
        /*margin: 0 auto;*/
        /*margin-top:25px;*/
    /*}*/
    /*.checkTableTitle{*/
        /*margin-bottom: 20px;*/
        /*font-size: 16px;*/
    /*}*/
    .scan-login {
        width: 269px;
        height: 269px;
        margin-left: 25px;
        margin-right: 25px;
    }

    .scan-text {
        width: 320px;
        height: 40px;
        padding-top: 290px;
        color: #999;
        line-height: 28px;
    }
    .checkTable{
        width: 553px;
        margin: 0 auto;
    }
    .scan-box {
        height: 400px;
        width: 269px;
        display: block;
    }

    .wrap {
        padding: 50px 0;
        overflow: auto;
    }

    .right-wrap {
        border-left: 1px solid #DEDEDE;
    }

    .left-wrap, .right-wrap {
        height: 100%;
        width: 50%;
        float: left;

        text-align: center;

        .box {
            display: inline-block;
            width: 290px;
        }

        padding-top: 20px;
    }

    .right-title {
        font-size: 16px;
        color: #333333;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .right-list {
        border: 1px solid #DEDEDE;
        border-radius: 2px;
        width: 290px;
        height: 350px;

        display: inline-block;
        padding: 15px 0 15px 30px;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 14px;
        color: #333333;

        ul {
            list-style: decimal;
            text-align: left;
        }
    }

    .form_wrap {
        margin: 0 auto;
        width: 320px;
        .form_item {
            width: 320px;
            height: 42px;
            border: 1px solid #dedede;
            background: #fbfbfb;
            border-radius: 5px;
            margin-bottom: 12px;
            position: relative;
            .icon {
                font-size: 18px;
                color: #d8d8d8;
                margin: 0 15px;
                vertical-align: -2px;
            }
            .icon-close {
                position: absolute;
                right: 10px;
                top: 7px;
                cursor: pointer;
                font-size: 25px;
                color: #e17776;
                background-color: #fff;
            }
            input {
                border-left: 1px solid #dedede;
                box-sizing: border-box;
                padding: 0 12px;
                background: #ffffff;
                width: 271px;
                line-height: 40px;
                height: 40px;
                border-radius: 0 5px 5px 0;
                &::-webkit-input-placeholder {
                    color: #999999;
                }
            }
        }
        .errorTip {
            height: 18px;
            text-align: right;
            font-size: 12px;
            color: #c42022;
            margin-bottom: 9px;
        }
    }

    .btn {
        display: block;
        text-align: center;
        line-height: 42px;
        background-image: linear-gradient(-180deg, #de4040 2%, #a42525 99%);
        border-radius: 5px;
        font-size: 14px;
        width: 320px;
        height: 42px;
        color: #ffffff;
    }

</style>
