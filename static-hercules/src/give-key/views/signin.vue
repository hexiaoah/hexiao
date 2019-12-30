<template>
    <div class="sign-in-wrapper">
        <img class="bottom-image" src="https://assets.2dfire.com/frontend/4114be3b593cb454196972978508e0b2.png" />
        <img class="center-background" src="https://assets.2dfire.com/frontend/8138fa4e63e061937d288dd6b00af5de.png" />
        <div class="opt-wrapper">
            <ul class="step">
                <sign-in-circle :image="firstDay?signedInImage:'https://assets.2dfire.com/frontend/eb533bff3d91953b3f575ed092153724.png'"></sign-in-circle>
                <sign-in-circle :image="secondDay?signedInImage:'https://assets.2dfire.com/frontend/0c54019bc23641df952d20ba71794741.png'"></sign-in-circle>
                <sign-in-circle :image="thirdDay?signedInImage:'https://assets.2dfire.com/frontend/df53204bbd99f0c7ece71c0d4350af85.png'"></sign-in-circle>
            </ul>
            <img class="sign-in-button" v-show="buttonShow"  v-click="{name:'Activation_Code_Button',info:'entityid=' + entityId}" @click="signIn" 
                src="https://assets.2dfire.com/frontend/0128cecb8c00814e0b510faafe92a4a7.png" />
            <img class="sign-in-button" v-show="!buttonShow" src="https://assets.2dfire.com/frontend/3ccaca3d10768b6a0cfe636b2a33be4a.png" />
            <div class="span-wrapper">
                <span>还差</span>
                <span class="sign-in-day">{{hintContent}}</span>
                <span>天即可免费升级为正式店铺</span>
            </div>
        </div>
    </div>
</template>
<script>

import SignInCircle from '../components/sign-in-circle.vue'
import API from '../config/api'

export default {
    data() {
        return {
            trialShop: this.$route.query.trialShop,
            firstDay: false,
            secondDay: false,
            thirdDay: false,
            hintContent: 3,
            buttonShow: true,
            signedInImage: 'https://assets.2dfire.com/frontend/75a73c4cb194621b9c1998c2eba1a353.png',
            entityId: this.$route.query.entityId,
        }
    },
    methods: {
        getSingInInfo() {  // 获取签到信息
            let self = this
            API.getSingInInfo({
                entity_id: self.entityId,
            }).then(data => {
                self.getInfoSuccess(data)
            }).catch(e => {
                self.getInfoError(e)
            })
        },
        signIn() {  // 点击签到按钮
            let self = this
            self.buttonShow = false
            API.signIn({
                entity_id: self.entityId,
            }).then(data => {
                self.getInfoSuccess(data)
            }).catch(e => {
                self.getInfoError(e)
            })
        },
        getInfoSuccess(data) {  // 根据服务端返回的状态进行处理
            let self = this
            if(data === undefined || Object.keys(data).length === 0) {
                self.firstDay = false
                self.secondDay = false
                self.thirdDay = false
                self.buttonShow = true
            } else {
                if(data.signInStatus === 0) {  // 签到进行中
                    self.drawCircle(data)                 
                } else if(data.signInStatus === 1) {  // 激活成功
                    self.$router.replace({path: './successful', query: {upgradeSuccessful: true}})
                } else {  // 激活失败
                    self.$router.replace({path: './successful', query: {upgradeSuccessful: false}})     
                }
            }
        },
        getInfoError(e) {
            let errorCode = e.data.errorCode
            let self = this
            if(errorCode === 'ERR_CLC136') {  // 已通过其它方式激活
                self.$router.replace({path: './successful', query: {upgradeSuccessful: true}})
            } else if(errorCode === 'ERR_CLC135'){  // 已经签到过了
                self.buttonShow = false
            } else if(errorCode === 'ERR_CLC137' || errorCode === 'ERR_CLC138'){  // 激活失败
                self.$router.replace({path: './successful', query: {upgradeSuccessful: false}}) 
            } else {
                self.$toast(e.data.message)
            }
        },
        drawCircle(data) {  // 绘制UI
            let self = this
            let dayCount = data.signInCount;  // 签到总次数
            if(dayCount !== 0) {
                self.hintContent = 3-dayCount
                if(new Date(data.lastSignInTime).toDateString() === new Date().toDateString()) {  // 若最新一次签到时间为当天
                    self.buttonShow = false
                }
            }

            if(dayCount === 1) {
                self.firstDay = true
            } else if(dayCount === 2) {
                self.firstDay = true
                self.secondDay = true
            } else if(dayCount === 3) {
                self.firstDay = true
                self.secondDay = true
                self.thirdDay = true
            } else {
                self.firstDay = false
                self.secondDay = false
                self.thirdDay = false
            }
        }
    },
    components: {
        SignInCircle,
    },
    created() {
        document.title='签到'
        let self = this
        if(self.trialShop === 0) {  // 正式店铺
            self.$router.replace({path: './successful', query: {upgradeSuccessful: true}})
        } else {
            self.getSingInInfo()
        }
    },
}
</script>
<style lang="scss" scoped>
    .sign-in-wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        background-image: url("https://assets.2dfire.com/frontend/ea98924a354ab416226edec16779ffb3.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 30px;

        .center-background {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            margin-top: -100px;
            margin-left: -7px;
        }

        .bottom-image {
            position: absolute;
            bottom: 0px;
        }

        .opt-wrapper {
            position: relative;
            top: 49%;
            margin-left: 40px;
            margin-right: 40px;
            margin-top: -100px;
            text-align: center;

            .step {
                text-align: center;
                overflow: hidden;
                z-index: 0;
            }

            .sign-in-button {
                margin: 30px auto 0px;
                padding-left: 35px;
                padding-right: 35px;
            }

            .span-wrapper {
                margin-top: -15px;
                
                span {
                    color: #713522;
                    font-size: 30px;
                    line-height: 42px;
                }

                .sign-in-day {
                    color: #fa6735;
                    font-size: 40px;
                    font-weight: bold;
                    line-height: 55px;
                }
            }
        }
    }

</style>

