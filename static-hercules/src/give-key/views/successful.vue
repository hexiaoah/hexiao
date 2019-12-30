<template>
    <div class="result-wrapper">
        <img class="bottom-image" src="https://assets.2dfire.com/frontend/4114be3b593cb454196972978508e0b2.png" />
        <img class="center-background" src="https://assets.2dfire.com/frontend/fe352c62650215135f7a4beb57ba22dc.png" />
        <div class="opt-wrapper">
            <img class="result-image" v-show="upgradeSuccessful" src="https://assets.2dfire.com/frontend/139e8437cc61b387d9509812603cc064.png" />
            <img class="result-image" v-show="!upgradeSuccessful" src="https://assets.2dfire.com/frontend/c34ebaa2e899102d7b9d6560c7776bd0.png" />
            <div class="hint-content">{{hintContent}}</div>
            <div>{{upgradeSuccessful?'您的试用店铺已成功升级为正式版！':'&nbsp;'}}</div>
            <img class="opt-button" v-show="upgradeSuccessful" @click="closeWebView" src="https://assets.2dfire.com/frontend/12899a1e70400fd8c8577b1655fd0800.png" />
            <img class="opt-button" v-show="!upgradeSuccessful" @click="closeWebView" src="https://assets.2dfire.com/frontend/f63442111a4169d1a769dce9a5e7fd83.png" />
        </div>
    </div>
</template>
<script>

import API from '../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'

export default {
    data() {
        return {
            upgradeSuccessful: this.$route.query.upgradeSuccessful,
        }
    },
    methods: {
        closeWebView() {
            let self = this
            if(self.upgradeSuccessful) {
                window.tdfire.closeWebView()
            } else {
                API.signIn({
                    entity_id: sessionStorage.getItem('entityId'),
                }).then(data => {
                    if(data.signInStatus === 0) {  // 签到进行中
                        self.$router.replace({path: './signin', query: {trialShop: 1, entityId: sessionStorage.getItem('entityId')}})            
                    } else if(data.signInStatus === 1) {  // 激活成功
                        self.upgradeSuccessful = true
                    } else {  // 激活失败
                        self.upgradeSuccessful = false
                    }
                }).catch(e => {
                    let errorCode = e.data.errorCode
                    let self = this
                    if(errorCode === 'ERR_CLC136') {  // 已通过其它方式激活
                        self.upgradeSuccessful = true
                    } else if(errorCode === 'ERR_CLC137' || errorCode === 'ERR_CLC138'){  // 激活失败
                        self.upgradeSuccessful = false
                    } else {
                        self.upgradeSuccessful = false
                        self.$toast(e.data.message)
                    }
                })
            }
        },
    },
    components: {
    },
    created() {
        document.title='升级结果'
    },
    computed: {
        hintContent() {
            if(this.upgradeSuccessful) {
                return '恭喜您，完成3日签到任务'
            } else {
                return '店铺升级失败，请重试！'
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .result-wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        background-image: url("https://assets.2dfire.com/frontend/ea98924a354ab416226edec16779ffb3.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .center-background {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            margin-top: -100px;
        }

        .bottom-image {
            position: absolute;
            bottom: 0px;
        }

        .opt-wrapper {
            position: relative;
            top: 52%;
            margin-left: 40px;
            margin-right: 40px;
            text-align: center;
            color: #fa6735;
            font-size: 34px;
            line-height: 47px;
            margin-top: -100px;

            .result-image {
                width: 127px;
                height: 127px;
            }

            .hint-content {
                padding-top: 24px; 
            }

            .opt-button {
                margin: 40px auto 0px;
                padding-left: 35px;
                padding-right: 35px;
            }

        }
    }

</style>

