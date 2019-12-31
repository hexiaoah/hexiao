<template>
    <div>
        <OpenTitle :title="pageTitle"></OpenTitle>
        <div class="wrap">
            <div class="input-box">
                <Input v-model="params.appId" icon="ios-search" :placeholder="placeholder" style="width: 340px"
                       @on-enter="search()" @on-click="search()" class="search-input"></Input>
                <Button class="search-btn" @click="goCreate" type="primary">{{createBtn}}</Button>
            </div>
            <table class="app-table" >
                <thead>
                <th>{{tableHead.appId}}</th>
                <th>{{tableHead.appName}}</th>
                <th>{{tableHead.appKey}}</th>
                <th>{{tableHead.appSecret}}</th>
                <th>{{tableHead.appStatus}}</th>
                <th>{{tableHead.date}}</th>
                <th style="width:0%">{{tableHead.action}}</th>
                </thead>
                <tbody>
                <tr v-for="item in appList">
                    <td>{{item.appId}}</td>
                    <td>{{item.appName}}</td>
                    <td>{{item.appKey}}</td>
                    <td>{{item.appSecret}}</td>
                    <td>{{item.appStatusDesc}}</td>
                    <td>{{item.createTimeDesc}}</td>
                    <td>
                        <a class="table-btn" @click="showDetail(item.id)">{{tableActions.detail}}</a>
                        <a class="table-btn" @click="auth(item.appId)" v-if="item.appStatus == '2'">{{tableActions.auth}}</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="page-bar">
                <OpenPage :total="pageCtrl.totalNum" :totalPage="pageCtrl.totalPage" :current="params.pageIndex" :pageSize="params.pageSize" @on-change="change"></OpenPage>
            </div>
            <br/>

            <br/>
            <br/>
            <br/>
            <br/>
            <h2 @click="toggle()" class="base-info" style="cursor:pointer;max-width:180px;text-align:center;margin:auto;border-bottom:1px solid black">
                {{GENSIGN_TITLE}}
            </h2><p style="font-size:10px">({{GENSIGN_USAGE}})</p><br/>
            <div id="sign_toolkit" v-if="sign_toolkit_show">
                <Icon title="new" type="plus-round" @click.native="add()" class="base-icon"></Icon>
                <div style="display:block;margin:auto;width:380px;">
                    <label style="float:left;font-weight:bold;font-size:14px">Key</label>
                    <label style="font-weight:bold;font-size:14px;margin-left:33%">Value</label>
                </div>
                    <br/>
                    <div style="max-width: 1000px;display:block;margin:auto;">
                        <div v-for="(list,index) in kvData" :key="'h_'+index" style="margin-left:25%; width:650px;display:block;margin-bottom:25px;">
                            <Input  v-model="list.key" style="float:left; width:200px; display: block;padding-right:50px"></Input>
                            <Input  v-model="list.value" style="float:left; width:290px; display: block;"></Input>
                            <Icon title="remove" type="trash-a" @click.native="remove(list)" class="trash-icon" ></Icon>
                        </div>
                    </div>
                <div style="margin:30px auto 50px auto; width:500px;">
                    <label style="float:left;font-size:14px">appSecret：</label><Input v-model="secretKey" style="float:left; width:415px; display: block;"></Input>
                </div>
                <br/>
                <br/>
                <Button type="primary" @click="generateSign" style="width: 220px">{{GENSIGN_BTN}}</Button>
                <br/>
                <div style="margin:30px auto 10px auto; width:500px">
                    <label style="float:left;font-size:14px;font-weight:bold">{{GENSIGN_SIGN}}：</label><Input v-model="signature" style="float:left; width:440px; display: block;margin-left:10px;"></Input>
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
    import { LANG } from "apiConfig";

    let pageData = {
        pageTitle: _i('SERVER.APPS.PAGETITLE'),
        createBtn: _i('SERVER.APPS.CREATE'),
        placeholder: _i('SERVER.APPS.PLACEHOLDER'),

        params: {
            appId: '',
            pageIndex: 1,
            pageSize: 20
        },

        pageCtrl: {
            totalNum: 0,
            totalPage: 0
        },

        appList: [{
            appId:"",
            appName:"",
            appKey: "",
            appSecret:"",
            appStatusDesc:"",
            createTimeDesc:""
        }],
        kvData: [
            {
                key: "method",
                value: ""
            },
            {
                key: "v",
                value: "1.0"
            },
            {
                key: "lang",
                value: "zh_CN"
            },
            {
                key: "timestamp",
                value: ""
            },
            {
                key: "app_key",
                value: ""
            },
            {
                key: "env",
                value: "publish"
            }
        ],
        secretKey: "",
        signature: "",
        tableHead: {
            appId: _i('SERVER.APPS.TABLE.APPID'),
            appName: _i('SERVER.APPS.TABLE.APPNAME'),
            appKey: _i('SERVER.APPS.TABLE.APPKEY'),
            appSecret: _i('SERVER.APPS.TABLE.APPSECRET'),
            appStatus: _i('SERVER.APPS.TABLE.APPSTATUS'),
            date: _i('SERVER.APPS.TABLE.DATE'),
            action: _i('SERVER.APPS.TABLE.ACTION'),
        },
        tableActions: {
            detail: _i('SERVER.APPS.TABLE.DETAIL'),
            auth: _i('SERVER.APPS.TABLE.AUTH'),
        },
        sign_toolkit_show: false,
        GENSIGN_TITLE: _i('SERVER.APPS.TOOLKIT.GENSIGN.TITLE'),
        GENSIGN_USAGE: _i('SERVER.APPS.TOOLKIT.GENSIGN.USAGE'),
        GENSIGN_BTN: _i('SERVER.APPS.TOOLKIT.GENSIGN.BTN'),
        GENSIGN_SIGN: _i('SERVER.APPS.TOOLKIT.GENSIGN.SIGN')
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            OpenTitle: require("@/components/open-title.vue"),
            OpenPage: require("@/components/open-page.vue")
        },
        methods: {
            add(){
                this.kvData.push({key: "", value: ""});
            },
            remove(list){
                this.kvData.splice(this.kvData.indexOf(list),1);
            },

//            前往新建应用 需要验证时候通过资质认证
            goCreate() {
                let self = this;
                Requester.get(API.DEV_APTITUDE).then((data) => {
                    if (data.isAuthenticate == 1 || data.authJoinType!="DEV") {
                        self.$router.push({
                            path: "/server_app_create",
                        });
                    }
                    else {
                        this.$Modal.warning({
                            title: "请注意",
                            content: "您需要通过开发者认证才能新建应用",

                        })
                    }

                }).catch((e) => {
                    catchError(e)
                });

            },
            showDetail(appPrimaryKey) {
                this.$router.push({
                    path: "/server_app_detail",
                    query: {
                        appPrimaryKey: appPrimaryKey
                    }
                });
            },
            auth(appId) {
                this.$router.push({
                    path: "/server_app_auth",
                    query: {
                        appId: appId
                    }
                });
            },
            generateSign() {
                let input = {
                    kv: JSON.stringify(this.kvData),
                    secret: this.secretKey
                };
                Requester.get(API.GET_SIGNATURE, {params: input}).then((data) => {
                    this.signature = data;
                }).catch((e) => {
                    catchError(e)
                });
            },
//            获取应用列表
            getAppList() {
                let self = this;
                Requester.get(API.GET_APPS_LIST, {params: this.params}).then((data) => {
                    self.appList = data.appVoList;
                    if (LANG == 'en') {
                        self.appList.forEach(list => {
                            if (list.appStatus == 1)
                                list.appStatusDesc = 'In Process';
                            else if (list.appStatus == 2)
                                list.appStatusDesc = 'Approved';
                            else
                                list.appStatusDesc = 'Apply Again';
                        })
                    }
                    self.pageCtrl.totalNum = data.totalNum;
                    self.pageCtrl.totalPage = data.totalPage;
                    if (self.appList != "") {
                        self.kvData[4].value = self.appList[0].appKey;
                        self.secretKey = self.appList[0].appSecret;
                        self.kvData[3].value = Date.parse(new Date());
                    }
                }).catch((e) => {
                    catchError(e)
                });
            },
            toggle() {
              this.sign_toolkit_show = !this.sign_toolkit_show;
            },
//            翻页
            change(e) {
                this.params.pageIndex = e;
                this.getAppList()
            },
//            查找
            search()
            {
                this.params.pageIndex = 1;
                this.getAppList()
            },
            init() {
                this.params.appId = '';
                // this.params.pageIndex = 1;
            }
        },
        created() {
            this.init()
            this.getAppList();

        }
    }
</script>

<style lang="scss" scoped="">

    .base-icon {
        font-size: 24px;
        padding: 0 5px;
        cursor: pointer;
        margin-bottom:10px;
    }
    .trash-icon {
        font-size: 20px;
        color: #d5434e;
        margin-left: 0px;
        padding: 0 10px;
        vertical-align: middle;
        float-left:left;
    }
    .wrap {
        /*min-width: 900px;*/
        margin: 0 auto;

        text-align: center;

        padding: 50px 0;

        overflow: auto;
    }

    .input-box {
        width: 440px;
        display: inline-block;

        .search-btn {
            margin-left: 5px;
        }
    }

    .btn {
        border: 0;
        outline: 0;
        background: #ffffff;

        cursor: pointer;

    }

    .title-button {
        font-size: 16px;
        color: #333333;
        transition: all 0.3s;
        &:hover {
            color: #000000;
        }
        .icon {
            width: 13px;
            height: 13px;
            display: inline-block;
            background: #333333;
            vertical-align: middle;
            margin-right: 5px;
        }
    }

    .app-table {
        width: 100%;
        margin: 60px auto 0 auto;
        max-width: 1000px;
        th, td {
            height: 60px;
            padding: 0 5px;
        }

        .table-btn {
            font-size: 12px;
            color: #1AA2F8;
            display: inline-block;
            padding: 0 10px 0 5px;
            border-right: 1px solid #dedede;
            &:last-child {
                padding-right: 0;
                border-right: 0;
            }
        }
    }
</style>
