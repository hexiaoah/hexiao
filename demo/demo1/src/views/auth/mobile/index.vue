<template>
    <div>
        <div>
            <!--商家信息-->
            <ul class="list">
                <li class="item">
                    {{entName}}： {{info.entName}}
                </li>
                <li class="item">
                    {{appName}}： {{info.appName}}
                </li>
                <li class="item">
                    {{email}}： {{info.email}}
                </li>
                <li class="item">
                    {{phone}}： {{info.phone}}
                </li>
            </ul>

            <!--权限列表-->
            <ul class="list right-list">
                <li class="item">{{rightTitle}}</li>
                <li v-for="item in rightList" class="item">
                    <label :for="item.rightsId">
                        <span class="item-text">
                                {{item.rightsNm}}
                            </span>
                        <Checkbox :value="item.rightsId" :disabled="item.isOpen == 0" v-model="item.granted" class="checkbox" @on-change="checkOne($event,item)"></Checkbox>
                    </label>

                </li>
                <li class="item">
                    <label for="checkAll">
                        {{checkAll}}
                        <Checkbox id="checkAll" v-model="allChecked" class="checkbox" @on-change="checkAllRights"></Checkbox>
                    </label>
                </li>
            </ul>

            <a class="btn" @click="submitRights()">{{submitAuth}}</a>
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";

    let pageData = {
        entName: _i('AUTH.INDEX.INFO.ENT'),
        appName: _i('AUTH.INDEX.INFO.APPNAME'),
        email: _i('AUTH.INDEX.INFO.EMAIL'),
        phone: _i('AUTH.INDEX.INFO.PHONE'),

        rightTitle: _i('AUTH.INDEX.MOBILE.RIGHT.TITLE'),
        checkAll: _i('AUTH.RIGHT.CHECKALL'),
        submitAuth: _i('AUTH.RIGHT.BUTTON.SUBMIT'),

        allChecked: false,

//        已选择的权限id列表
        rights: [],
    };

    export default {
        props: ['info','rightList'],
        data() {
            return pageData;
        },
        components: {},
        methods: {
            submitRights() {
                let self = this;
                let tmpArr = [];
                for (let i = 0; i < self.rightList.length; i++) {
                    if(this.rightList[i].granted){
                        tmpArr.push(self.rightList[i].rightsId)
                    }
                }
                this.rights = tmpArr;
                let rights = self.rights.toString();
                this.$emit('rights',rights);
            },

            checkOne(e,item){
                if(item.isOpen == 0){
                    this.$Message.warning('系统给与权限，不可取消！')
                }else{
                    item.granted = e;
                    let tmpArr = [];
                    for (let i = 0; i < this.rightList.length; i++) {
                        if(this.rightList[i].granted){
                            tmpArr.push(this.rightList[i].rightsId)
                        }
                    }
                    this.rights = tmpArr;

                    if(this.rights.length == this.rightList.length){
                        this.allChecked = true;
                    }else {
                        this.allChecked = false;
                    }
                }
            },
            checkAllRights() {
                let tmp = false;
                let self = this;
                if (!self.allChecked) {
                    tmp = false
                }
                else {
                   tmp = true
                }
                for (let i = 0; i < self.rightList.length; i++) {
                    this.rightList[i].granted = tmp
                    if(self.rightList[i].isOpen == 0) {
                        self.rightList[i].granted = true;
                    }
                }

                let tmpArr = [];
                for (let i = 0; i < self.rightList.length; i++) {
                    if(this.rightList[i].granted){
                        tmpArr.push(self.rightList[i].rightsId)
                    }
                }
                self.rights = tmpArr;
            },
            init() {
                document.title = _i('AUTH.INDEX.MOBILE.TITLE');
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="scss" scoped="">

    .list {
        width: 100%;
        margin-top: 15px;

        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        background: #ffffff;
        padding-left: 15px;

        .item {
            width: 100%;
            height: 42px;
            line-height: 42px;
            font-size: 14px;

            border-bottom: 1px solid #cccccc;
            &:last-child {
                border-bottom: 0;

            }
        }

        .item-text {
            font-size: 12px;
        }

        .checkbox {
            float: right;
            /*margin-top: 15px;*/
            margin-right: 15px;
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
        margin: 40px auto 0 auto;
        height: 42px;
        color: #ffffff;
    }

    .right-list{
        max-height: 350px;
        overflow-x: hidden;
        overflow-y: auto;
    }


</style>
