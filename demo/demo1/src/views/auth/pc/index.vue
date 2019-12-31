<template>
    <div class="wrap">
        <div class="left-wrap">
            <div class="info-box">
                <div v-show="$route.query.switchShop" class="info-label text-left" @click="switchShop">切换店铺</div>
                <div class="info-label">
                    <OpenLabel :pre="entName" :text="info.entName"></OpenLabel>
                </div>
                <div class="info-label">
                    <OpenLabel :pre="appName" :text="info.appName"></OpenLabel>
                </div>
                <div class="info-label">
                    <OpenLabel :pre="email" :text="info.email"></OpenLabel>
                </div>
                <div class="info-label">
                    <OpenLabel :pre="phone" :text="info.phone"></OpenLabel>
                </div>
            </div>
        </div>
        <div class="right-wrap">
            <p class="right-title">{{rightTitleBefore}} {{info.name}} {{rightTitleAfter}}</p>
            <div class="right-list">
                <ul>
                    <li v-for="item in rightList">
                        <label :for="item.rightsId">
                            <!--<input :id="item.rightsId" :checked="item.granted" type="checkbox" v-model="item.granted" :value="item.rightsId">-->
                            <Checkbox :value="item.rightsId" :disabled="item.isOpen == 0" v-model="item.granted"
                                      class="checkbox" @on-change="checkOne($event,item)"></Checkbox>

                            <span>
                                {{item.rightsNm}}
                            </span>
                        </label>

                    </li>
                </ul>
                <div class="right-select">
                    <label for="checkAll">
                        <Checkbox id="checkAll"  v-model="allChecked" class="checkbox" @on-change="checkAllRights"></Checkbox>

                        <!--<input id="checkAll" type="checkbox" value="true" v-model="allChecked" @click="checkAllRights">-->
                        {{checkAll}}
                    </label>
                </div>
            </div>

        </div>
        <div class="fl-clear"></div>
        <div class="action-bar">
            <Button type="primary" @click="submitRights" style="width: 320px">同意授权</Button>
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

        rightTitleBefore: _i('AUTH.RIGHT.TITLE.BEFORE'),
        rightTitleAfter: _i('AUTH.RIGHT.TITLE.AFTER'),
        checkAll: _i('AUTH.RIGHT.CHECKALL'),
        allChecked: false,

        rights: [],
    };

    export default {
        props: [
            'info', 'rightList'
        ],
        data() {
            return pageData;
        },
        components: {
            OpenLabel: require("./index-label.vue")
        },
        watch: {
            rights(val, oldVal) {
                if (val.length == this.rightList.length && !this.allChecked) {
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            }
        },
        methods: {
            switchShop(){
                this.$router.go(-1)
            },
            submitRights() {
                let self = this;
                let tmpArr = [];
                for (let i = 0; i < self.rightList.length; i++) {
                    if (this.rightList[i].granted) {
                        tmpArr.push(self.rightList[i].rightsId)
                    }
                }
                this.rights = tmpArr;
                let rights = self.rights.toString();
                this.$emit('rights', rights);
            },
            checkOne(e, item) {
                item.granted = e;
                let tmpArr = [];
                for (let i = 0; i < this.rightList.length; i++) {
                    if (this.rightList[i].granted) {
                        tmpArr.push(this.rightList[i].rightsId)
                    }
                }
                this.rights = tmpArr;

                if(this.rights.length == this.rightList.length) {
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            },
            checkAllRights() {
                let tmp = false;
                let self = this;
                if (!this.allChecked) {
                    tmp = false
                }
                else {
                    tmp = true
                }
                for (let i = 0; i < self.rightList.length; i++) {
                    self.rightList[i].granted = tmp
                    if(self.rightList[i].isOpen == 0) {
                        self.rightList[i].granted = true;
                    }
                }

                let tmpArr = [];
                for (let i = 0; i < self.rightList.length; i++) {
                    if (self.rightList[i].granted) {
                        tmpArr.push(self.rightList[i].rightsId)
                    }
                }
                self.rights = tmpArr;
            },

            init() {
                this.params.appId = ''
            }
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped="">
    .text-left{
        text-align: left;
        color: #d83f3f;
        cursor: pointer;
    }
    .wrap {

        padding: 50px 0 0px;

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

        /*max-height: 400px;*/
        padding-top: 20px;
    }

    .info-box {
        display: inline-block;
        width: 420px;

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
        padding: 15px 0 15px 15px;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 14px;
        color: #333333;

        text-align: left;

        li {
            margin-bottom: 4px;
        }
    }

    .right-select {
        margin-top: 20px;
    }

    .info-label {
        margin-bottom: 12px;
    }

    .auth-prepend {
        font-size: 14px;
        color: #333333;

        display: inline-block;
        margin: 4px 8px;
        width: 56px;
        text-align: center;
    }

    .action-bar {
        margin-top: 50px;
        text-align: center;
    }

</style>
