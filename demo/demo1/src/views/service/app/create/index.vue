<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">
            <div class="new-app">

                <!--input app's name-->
                <div class="row">
                    <div class="left">
                        <OpenLabel :text="formText.base" :size="'lg'"></OpenLabel>
                    </div>
                    <div class="right  ta-left">
                        <OpenLabel :text="formText.appName" :type="1"></OpenLabel>
                        <Input v-model.trim="params.appName" style="width: 250px" class="form-input"
                               :maxlength="formState.maxLength"  :placeholder="formText.inputPlaceholder"
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
                            <label class="app-checkbox">
                                <span class="right-name">{{formText.ent}}</span></label>
                        </div>
                        <div class="row">
                            <OpenLabel :text="formText.right" :type="1"></OpenLabel>
                            <div class="right-box form-input">
                                <ul>
                                    <Tree show-checkbox :data="appRights" @on-check-change="checkRight($event)"></Tree>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>

                <!--input apps's intro-->
                <div class="row">
                    <div class="left">
                        <OpenLabel :text="formText.intro" :type="1" :size="'lg'"></OpenLabel>
                    </div>
                    <div class="right ta-left">
                        <textarea class="app-intro ivu-input " v-model="params.funcDesc" maxlength="150"
                                  :placeholder="formText.textareaPlaceholder"></textarea>
                    </div>
                </div>

                <!--save app info-->
                <div class="row">
                    <Button type="primary" @click="submit">{{formText.save}}</Button>
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

    let pageData = {
        formText: {
            base: _i('SERVER.APPS.FORM.BASE'),
            appName: _i('SERVER.APPS.FORM.APPNAME'),
            type: _i('SERVER.APPS.FORM.TYPE'),
            ent: _i('SERVER.APPS.FORM.ENT'),
            right: _i('SERVER.APPS.FORM.RIGHT'),
            intro: _i('SERVER.APPS.FORM.INTRO'),
            save: _i('SERVER.APPS.FORM.SAVE'),
            inputPlaceholder: _i('SERVER.APPS.FORM.PLACEHOLDER.INPUT'),
            textareaPlaceholder: _i('SERVER.APPS.FORM.PLACEHOLDER.TEXTAREA'),
        },

        params: {
            appName: '',
            funcDesc: '',
            ent: false,
            appType: 2,
            rightItems: []
        },

        formState: {
            maxLength: 8
        },

        appRights: [],
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

            submit() {
                this.params.ent ? this.params.appType = 1 : this.params.appType = 2;
//                传递list前先格式化成string
                this.params.rightItems = this.params.rightItems.toString();

                if(this.dataVerify(this.params)){
                    Requester.post(API.CREATE_APP, this.params, { emulateJSON: true }).then((data) => {
                        this.$Message.success(_i('SERVER.APPS.INFO.SUCCESSFUL.CREATE'));
                        this.$router.push({
                            path: "/server_app",
                        });
                    }).catch((e) => {
                        catchError(e)
                    });
                }
            },
//            非空验证
            dataVerify(data) {
                if (!data.appName || data.appName.length < 1) {
                    this.$Message.warning(_i('SERVER.APPS.WARNING.MISSING.APP.NAME'));
                    return false;
                }
                else if (!data.funcDesc || data.funcDesc.length < 1) {
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
            getRights() {
                Requester.get(API.GET_APPS_RIGHTS, {params: this.params}).then((data) => {
                        let tmp = [];
                        for (let i = 0; i < data.length; i++) {
                            let tmp_right = []
                            if (data[i].rightsList && data[i].rightsList.length > 0) {
                                for (let j = 0; j < data[i].rightsList.length; j++) {
                                    tmp_right.push({
                                        id: data[i].rightsList[j].id,
                                        title: data[i].rightsList[j].rightsName,
                                    })
                                }
                            }
                            tmp.push(
                                {
                                    title: data[i].group.groupName,
                                    children: tmp_right
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
            checkRight (e){
                let that = this;
                let tmp = [];
                for(let i = 0; i < e.length; i++){
                    if(e[i].id){
                        tmp.push(
                            e[i].id
                        )
                    }
                }
                that.params.rightItems = tmp;
            },
            init(){
                this.params.appName = '';
                this.params.ent = true;
                this.params.rightItems = '';
                this.params.funcDesc = '';

            }
        },
        created() {
            this.init()
            this.getRights()
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
        width: 455px;

        .row {
            margin-bottom: 20px;
        }

        .left {
            display: inline-block;

            width: 75px;
            text-align: right;
            vertical-align: top;
            /*margin-top: 1px;*/
        }

        .right {
            display: inline-block;

            width: 360px;
            padding-left: 10px;
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

            width: 250px;
            height: 170px;
            overflow: hidden;
            overflow-y: auto;

            border: 1px solid #DEDEDE;
            border-radius: 2px;

            padding: 0 10px;
        }

        .app-intro {
            font-size: 12px;
            border-radius: 2px;

            width: 325px;
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

</style>
