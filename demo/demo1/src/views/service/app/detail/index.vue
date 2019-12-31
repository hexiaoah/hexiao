<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">
            <div class="new-app">
                <div class="tabs" style="margin-left:17%">
                    <a class="tab" :class="{'active': pageState.witchTab == 'detail'}"
                       @click="changeTab('detail')">{{formText.tabDetail}}</a>
                    <a class="tab" :class="{'active': pageState.witchTab == 'env'}"
                       @click="changeTab('env')">{{formText.tabEnv}}</a>
                    <a class="tab" :class="{'active': pageState.witchTab == 'usage'}"
                       @click="changeTab('usage')">用量Usage</a>
                </div>

                <div v-show="pageState.witchTab == 'detail'" style="padding-left:17%">
                    <!--input app's name-->
                    <div class="row">
                        <div class="left">
                            <OpenLabel :text="formText.appName" :size="'lg'" :type="1"></OpenLabel>
                        </div>
                        <div class="right  ta-left">
                            <!--<OpenLabel :text="formText.appName" :type="1"></OpenLabel>-->
                            <Input v-model.trim="appInfo.appName" style="width: 330px" class="form-input"
                                   :placeholder="formText.inputPlaceholder" :maxlength="formState.maxLength"
                            ></Input>
                        </div>
                    </div>

                    <!--input app's ID-->
                    <div class="row">
                        <div class="left">
                            <OpenLabel :text="formText.appId" :size="'lg'" :type="1"></OpenLabel>
                        </div>
                        <div class="right  ta-left">
                            <!--<OpenLabel :text="formText.appId" :type="1"></OpenLabel>-->
                            <Input v-model="appInfo.appId" style="width: 330px" class="form-input"
                                   disabled
                            ></Input>
                        </div>
                    </div>

                    <!--input app's date-->
                    <div class="row">
                        <div class="left">
                            <OpenLabel :text="formText.date" :size="'lg'" :type="1"></OpenLabel>
                        </div>
                        <div class="right  ta-left">
                            <!--<OpenLabel :text="formText.date" :type="1"></OpenLabel>-->
                            <Input v-model="appInfo.createTimeStr" style="width: 330px" class="form-input"
                                   disabled
                            ></Input>
                        </div>
                    </div>

                    <!--choose app's type-->
                    <div class="row">
                        <div class="left">
                            <OpenLabel :text="formText.type" :size="'lg'" :type="1"></OpenLabel>
                        </div>
                        <div class="right  ta-left">
                            <div class="row">
                                <label class=" app-checkbox">
                                    <!--<input type="checkbox" :value="true" class="right-checkbox" v-model="appInfo.ent"-->
                                    <!--disabled>-->
                                    <span class="right-name">{{formText.ent}}</span>
                                </label>
                            </div>
                            <div class="row">
                                <OpenLabel :text="formText.right" :type="1"></OpenLabel>
                                <div class="right-box form-input">
                                    <Tree show-checkbox :data="appRights" @on-check-change="checkRight($event)"></Tree>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--input apps's intro-->
                    <div class="row">
                        <div class="left">
                            <OpenLabel :text="formText.intro" :size="'lg'" :type="1"></OpenLabel>
                        </div>
                        <div class="right ta-left">
                            <textarea class="app-intro ivu-input " v-model.trim="appInfo.funcDesc"
                                      maxlength="150"
                                      :placeholder="formText.textareaPlaceholder"></textarea>
                        </div>
                    </div>

                    <!--save app info-->
                    <div class="row">
                        <Button type="primary" @click="submit">{{formText.save}}</Button>
                    </div>
                </div>

                <div v-show="pageState.witchTab == 'env'" style="padding-left:17%">
                    <div class="row">
                        <div class="left long">
                            <OpenLabel :text="formText.api" :size="'lg'"></OpenLabel>
                        </div>
                        <div class="right ta-left short">
                            <p class="env-text">
                              <span>{{appInfo.callbackUrl}}</span>
                              <span class="checking" v-if="appInfo.appStatus === 1">审核中</span>
                            </p>

                        </div>
                    </div>
                    <div class="row">
                        <div class="left long">
                            <OpenLabel :text="formText.push" :size="'lg'"></OpenLabel>
                        </div>
                        <div class="right ta-left short">
                            <p class="env-text">
                              <span>{{appInfo.pushUrl}}</span>
                              <span class="checking" v-if="appInfo.appStatus === 1">审核中</span>
                            </p>
                        </div>
                    </div>
                    <!-- 修改URL -->
                    <div v-show="pageState.editUrl" class="edit-box">
                        <div class="row">
                            <div class="left long">
                                <OpenLabel :text="formText.api" :size="'lg'"></OpenLabel>
                            </div>
                            <div class="right ta-left short">
                                <Input v-model="editParams.callbackUrl" style="width:300px" class="form-input"
                                ></Input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="left long">
                                <OpenLabel :text="formText.push" :size="'lg'"></OpenLabel>
                            </div>
                            <div class="right ta-left short">
                                <Input v-model="editParams.pushUrl" style="width: 300px" class="form-input"
                                ></Input>
                            </div>
                        </div>
                    </div>

                    <div class="btn-group">
                        <Button type="primary" :disabled="appInfo.appStatus === 1" v-show="!pageState.editUrl" @click="editUrl">{{formText.edit}}</Button>

                        <div v-show="pageState.editUrl">
                            <Button class="marginRight" type="ghost" @click="cancel">{{formText.cancel}}</Button>
                            <Button type="primary" @click="submitEdit">{{formText.submit}}</Button>
                        </div>
                    </div>
                </div>

                <div v-show="pageState.witchTab == 'usage'">
                    <div class="row">
                        <table >
                            <thead>
                                <tr>
                                    <th>{{formText.rightName}}</th>
                                    <th>{{formText.rightCode}}</th>
                                    <th style="width:120px">{{formText.rightUsage}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in rightList">
                                    <td>{{item.rightsName}}</td>
                                    <td>{{item.rightsCode}}</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";
    import Route from "@2dfire/utils/router";
    import { LANG } from "apiConfig";

    let pageData = {
        formText: {
            tabDetail: _i('SERVER.APPS.DETAIL.TABS.DETAIL'),
            tabEnv: _i('SERVER.APPS.DETAIL.TABS.ENV'),

            appName: _i('SERVER.APPS.DETAIL.FORM.APPNAME'),
            appId: _i('SERVER.APPS.DETAIL.FORM.APPID'),
            date: _i('SERVER.APPS.DETAIL.FORM.DATE'),
            type: _i('SERVER.APPS.DETAIL.FORM.TYPE'),
            ent: _i('SERVER.APPS.DETAIL.FORM.ENT'),
            right: _i('SERVER.APPS.DETAIL.FORM.RIGHT'),
            intro: _i('SERVER.APPS.DETAIL.FORM.INTRO'),
            api: _i('SERVER.APPS.DETAIL.FORM.API'),
            push: _i('SERVER.APPS.DETAIL.FORM.PUSH'),
            save: _i('SERVER.APPS.DETAIL.FORM.SAVE'),
            submit: _i('SERVER.APPS.DETAIL.FORM.SUBMIT'),
            edit: _i('SERVER.APPS.DETAIL.FORM.EDIT'),
            cancel: _i('SERVER.APPS.DETAIL.FORM.CANCEL'),
            inputPlaceholder: _i('SERVER.APPS.DETAIL.FORM.PLACEHOLDER.INPUT'),
            textareaPlaceholder: _i('SERVER.APPS.DETAIL.FORM.PLACEHOLDER.TEXTAREA'),

            rightName: _i('SERVER.APPS.DETAIL.RIGHT.NAME'),
            rightCode: _i('SERVER.APPS.DETAIL.RIGHT.CODE'),
            rightUsage: _i('SERVER.APPS.DETAIL.RIGHT.USAGE'),
        },

        params: {
            appPrimaryKey: '',
            appName: '',
            funcDesc: '',
            rightItems: []
        },

        editParams: {
            callbackUrl: '',
            pushUrl: ''
        },

        pageState: {
            witchTab: 'detail',
            editUrl: false
        },

        formState: {
            maxLength: 8
        },

        appInfo: {
            appName: '',
            appId: '',
            createTimeStr: '',
            env: '',
            rights: '',
            funcDesc: '',
            callbackUrl: '',
            pushUrl: '',
        },

        appRights: [],
        translateMap: "",
        rightList: ""
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
            OpenLabel: require("@/components/open-label.vue"),
        },
        methods: {
//            提交应用的修改
            submit() {
                this.params.appName = this.appInfo.appName;
                this.params.funcDesc = this.appInfo.funcDesc;
                this.params.appName = this.appInfo.appName;
//                传list之前，先转换格式
                this.params.rightItems = this.params.rightItems.toString();

                if (this.dataVerify(this.params)) {
                    Requester.post(API.UPDATE_APP, this.params, {emulateJSON: true}).then((data) => {
                        this.$Message.success(_i('SERVER.APPS.INFO.SUCCESSFUL.UPDATE'));
//                    编辑成功后回到列表页
                        this.$router.push({
                            path: "/server_app",
                        });
                    }).catch((e) => {
                        catchError(e)
                    });
                }
            },

            dataVerify(data) {
                if (data.appName == '') {
                    this.$Message.warning(_i('SERVER.APPS.WARNING.MISSING.APP.NAME'));
                    return false;
                }
                else if (data.funcDesc == '') {
                    this.$Message.warning(_i('SERVER.APPS.WARNING.MISSING.APP.DESC'));
                    return false;
                }
                else if (data.rightItems.length < 1) {
                    this.$Message.warning(_i('SERVER.APPS.WARNING.MISSING.APP.AUTH'));
                    return false;
                }
                else {
                    return true;
                }
            },
//            获取应用详情
            getAppInfo() {
                Requester.get(API.GET_APP_INFO, {params: this.params}).then((data) => {
//                    format data
                    data.funcDesc = data.appDesc;
//                    应用类型 1 企业应用，2 个人应用
                    data.appType == 1 ? data.ent = true : data.ent = false;

                    this.appInfo = data;
//                    获取应用权限列表
                    this.getRights()
                }).catch((e) => {
                    catchError(e)
                });
            },
//            获取应用权限列表
            getRights() {
                Requester.get(API.GET_APPS_RIGHTS, {params: this.params}).then((data) => {
                        let that = this;
//                        数据format
                        let tmp = [];
                        let tmp_applied = (this.appInfo.appRightsHasApply);
                        for (let i = 0; i < data.length; i++) {
                            let tmp_right = []
                            if (data[i].rightsList && data[i].rightsList.length > 0) {

                                for (let j = 0; j < data[i].rightsList.length; j++) {

//                                        已有选中的权限，则默认选中
                                    if (tmp_applied.indexOf('"'+data[i].rightsList[j].id+'"') > -1) {
                                        tmp_right.push({
                                            id: data[i].rightsList[j].id,
                                            title: that.translateMap[data[i].rightsList[j].rightsName] || data[i].rightsList[j].rightsName,
                                            checked: true,
                                        });
                                        that.params.rightItems.push(
                                            data[i].rightsList[j].id
                                        )
                                    }
                                    else {
                                        tmp_right.push({
                                            id: data[i].rightsList[j].id,
                                            title: that.translateMap[data[i].rightsList[j].rightsName] || data[i].rightsList[j].rightsName,
                                        })
                                    }
                                }
                            }
                            tmp.push(
                                {
                                    title: that.translateMap[data[i].group.groupName] || data[i].group.groupName,
                                    children: tmp_right,
                                }
                            )
                        }
                        this.appRights = tmp;
                        
                    }
                ).catch((e) => {
                    catchError(e)
                });
            },
//            选择权限，仅包含二级权限id
            checkRight(e) {
                let that = this;
                let tmp = [];
                for (let i = 0; i < e.length; i++) {
                    if (e[i].id) {
                        tmp.push(
                            e[i].id
                        )
                    }
                }
                that.params.rightItems = tmp;
            },
//            切换 应用详情/正式环境 tab
            changeTab(tab) {
                this.pageState.witchTab = tab;
                this.cancel()
            },
//            打开编辑正式环境url输入框
            editUrl() {
                this.pageState.editUrl = true;
            },
//            清空对正式环境 url的修改
            cancel() {
                this.pageState.editUrl = false;
//                清空修改
                this.editParams.callbackUrl = '';
                this.editParams.pushUrl = '';

            },
//            验证输入的url是否是http:// 或 https:// 开头
            urlVerify (url) {
                let reg = /^(?=(http:\/\/|https:\/\/))/i;
                if(url){
                    return reg.test(url);
                }
//                输入url为空时，不做校验允许提交
                else{
                    return true;
                }

            },
//            提交 回调、推送的url链接
            submitEdit() {
//              判断是否是http或https开头

                if(this.urlVerify(this.editParams.callbackUrl) && this.urlVerify(this.editParams.pushUrl))
                {
                    let params = {
                        appPrimaryKey: Route.route.query["appPrimaryKey"],
                        callbackUrl: this.editParams.callbackUrl,
                        pushUrl: this.editParams.pushUrl,
                        callbackUrlApplying: this.editParams.callbackUrl,
                        pushUrlApplying: this.editParams.pushUrl
                    }

                    Requester.post(API.SAVE_URL, params, {emulateJSON: true}).then((data) => {
                        this.$Message.success(_i('SERVER.APPS.DETAIL.SAVE.CALLBACK.SUCCESS'));
                        this.$router.push({
                            path: "/server_app",
                        });
                    }).catch((e) => {
                        catchError(e)
                    });
                }
                else{
                    this.$Message.warning(_i('SERVER.APPS.DETAIL.ILLEGAL.URL'));
                }
            },

//            初始化 params 和 tab
            init() {
                this.params.rightItems = [];
                this.params.appPrimaryKey = Route.route.query["appPrimaryKey"];
                this.pageState.witchTab = 'detail';

                let self = this;
                let input = {
                    lang: LANG
                };
                Requester.get(API.API_TRANSLATION, { params: input})
                    .then(data => {
                        self.translateMap = data
                    });
            },
            translateMapTrim(str){
                if(str){
                    let key = str.replace(/(^\s*)|(\s*$)/g, "").toString();
                    return this.translateMap[key] || str
                }else{
                    return ''
                }
            },
            getAppliedAppRights() {
                Requester.get(API.GET_AUTH_APP_RIGHTS, {params: this.params})
                    .then(data => {
                        let tmp = [];
                        let tmp_applied = (this.appInfo.appRightsHasApply);
                        for (let i = 0; i < data.length; i++) {
                            if (tmp_applied.indexOf('"' + data[i].id + '"') > -1) {
                                tmp.push({
                                    rightsCode: data[i].rightsCode,
                                    rightsName: this.translateMapTrim(data[i].rightsName)
                                });
                            }
                        }
                        this.rightList = tmp;
                    })
                    .catch(e => {
                        if (e.result.resultCode == 907) {
                        } else {
                            catchError(e);
                        }
                    });
            }
        },
        created() {
            this.init();
            this.getAppInfo();
            this.getAppliedAppRights();
        }
    }
</script>

<style lang="scss" scoped="">
    .wrap {
        min-width: 460px;
        margin: 0 auto;

        text-align: center;

        padding: 50px 0;

    }

    .new-app {
        display: inline-block;
        width: 800px;

        .row {
            margin-bottom: 20px;
        }

        .left {
            display: inline-block;

            width: 105px;
            text-align: left;
            vertical-align: top;
            float: left;
            /*margin-top: 1px;*/
        }

        .long {
            width: 100px;

        }

        .right {
            display: inline-block;

            width: 380px;
            padding-left: 20px;
        }

        .short {
            width: 340px;
            padding-left: 0;
        }

        .form-input {
            margin-left: 5px;
        }
        .app-checkbox {
            margin-top: 5px;
            font-size: 14px;
            display: inline-block;
        }

        .right-box {
            display: inline-block;

            width: 260px;
            height: 190px;
            overflow-x: auto;
            overflow-y: auto;

            border: 1px solid #DEDEDE;
            border-radius: 2px;

            padding: 0 10px;
        }

        .app-intro {
            font-size: 12px;
            border-radius: 2px;

            width: 345px;
            height: 135px;

            resize: none;
        }

        .right-checkbox {
            vertical-align: middle;
        }

        .right-name {
            margin-left: 7px;
        }
    }

    .tabs {
        text-align: left;
        padding-bottom: 15px;
        width: 535px;
        border-bottom: 1px #DEDEDE solid;
           margin-bottom: 18px;
        .tab {
            color: #333333;
            padding: 0 7px;
            font-size: 16px;
            padding-left: 0;
        }
        a.tab {
            color: #333333;
            padding: 0 15px;
            font-size: 16px;

            border-right: 1px solid #DEDEDE;

            &:last-child {
                border-right: 0;
            }

            &:hover {
                color: #f55f4f;
            }
        }
        a.active {
            color: #1AA2F8;
        }

    }

    .env-text {
        font-size: 14px;
        color: #333333;
        margin-top: 3px;
        margin-left: 12px;
    }

    .edit-box {
        padding-top: 18px;
        border-top: 1px dashed #DEDEDE;
    }
    .marginRight{
        margin-right: 30px;
    }

    .checking{
      font-size: 16px;
      color: red;
      float: right;
    }

    td, th {
        border:none;
        height: 30px;
        padding: 5px;
    }

    th {
        font-weight:bold;
        font-size:14px;
        padding-bottom: 15px;
    }
</style>
