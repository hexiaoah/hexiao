<template>
    <div class="entrance-wrapper">
        <p class="hint">
            提示：商户需为使用电子收款账户的企业或个体工商户，并在任一餐饮平台上（美团、饿了么、口碑、大众点评、百度外卖）开过店。
        </p>
        <div class="introduce border-t border-b">
            <img src="https://assets.2dfire.com/frontend/b7dced2776beafce4438185c153cf932.png"/>
            <p>二维火现联合支付宝，推出商家支付费率优惠活动，为餐饮商家提供更低的支付费率！</p>
        </div>
        <div class="process">
            <p>申请流程</p>
            <div class="process-img border-t border-b"></div>
        </div>
        <div class="active-entrance border-t border-b" @click="toRule">
            <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png"/>
            <div class="apply">
                <p class="apply-title">
                    <span>支付宝优惠费率申请</span>
                    <span class="unopen label" v-if="applyState.openStatus === 'no_permission'">{{applyState.statusTitle}}</span>
                    <span class="unopen label" v-else-if="applyState.openStatus === 'unopen'">未开通</span>
                    <span class="opening label" v-else-if="applyState.openStatus === 'opening'">审核中</span>
                    <span class="success label" v-else-if="applyState.openStatus === 'opened'">已开通</span>
                    <span class="fail label" v-else-if="applyState.openStatus === 'open_fail'">开通失败</span>
                </p>
                <p class="apply-content">已绑定电子收款帐户的个体或企业商户由此入</p>
            </div>
            <div class="turn-right"></div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {applyState} from 'src/ocean/config/api.js'
    // import errorToast from 'src/ocean/libs/errorToast'
    import hintToast from 'src/ocean/libs/hintToast'

    export default {
        name: 'ApplyEntrance',
        data() {
            return {
                applyState: { //申请结果
                }
            }
        },
        created() {
            applyState().then(data => {
                console.log(data);
                // data = {
                //     openStatus: "unopen",
                //     applyPermission: true,
                //     statusContent: "东莞市塘厦捷胜通讯设备经营部，不属于“餐饮”商家，不符合智慧餐厅推广活动的商家标准，请谅解！",
                //     statusTitle: "恭喜你已通过支付宝优惠费率的申请；"
                // };
                console.log(data);
                this.applyState = data
            }).catch(e => {
                // errorToast.show(e.result.message)
                console.log(e)
            })
        },
        methods: {
            toRule() {
                console.log(this.applyState.applyPermission);
                if (!this.applyState.applyPermission) {
                    hintToast.show('抱歉，您暂无权限，本活动仅限掌柜申请');
                    return false;
                }
                if (this.applyState.openStatus === 'unopen') {//是否未开通
                    this.$router.push({
                        path: '/entrance/rule',
                    })
                } else {
                    this.$router.push({
                        path: '/result',
                        query: {
                            openType: this.applyState.openType,
                            openStatus: this.applyState.openStatus,
                            title: this.applyState.statusTitle,
                            content: this.applyState.statusContent
                        }
                    },)
                }
            },
            goApply() {
                let conditionsA = this.applyState.openStatus === 'unopen' //是否未开通
                if (conditionsA) {
                    this.$router.push({
                        path: '/input',
                        query: {
                            openType: this.applyState.openType
                        }
                    })
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>

    .entrance-wrapper {

        .hint {
            /*height: 61px;*/
            font-size: 13PX;
            color: #FF0033;
            letter-spacing: 0;
            line-height: 18px;
            padding: 10px 15px 15px;
        }

        .introduce {
            padding: 20px 15px;
            background: #FFFFFF;

            img {
                display: block;
                width: 190px;
                height: 124px;
                margin: auto;
            }

            p {
                font-size: 13PX;
                color: #333333;
                line-height: 18px;
                letter-spacing: 0;
                margin-top: 22px;
            }
        }

        .process {
            padding-top: 36px;

            p {
                padding-left: 15px;
                font-size: 15PX;
                color: #000000;
                line-height: 14px;
                margin-bottom: 10px;
                font-weight: bold;
            }

            .process-img {
                height: 110px;
                background-image: url(https://assets.2dfire.com/frontend/b4b0304283563804fb66b067b2c64ed9.png);
                background-size: 301px 80px;
                background-repeat: no-repeat;
                background-position: 50%;
                margin: auto;
                background-color: white;
            }
        }

        .active-entrance {
            display: block;
            height: 64px;
            padding: 10px 15px;
            background-color: white;
            margin-top: 36px;

            img {
                width: 44px;
                height: 44px;
                display: inline-block;
            }

            .apply {
                display: inline-block;
                vertical-align: top;

                .apply-title {
                    font-size: 17PX;
                    color: #333333;
                    line-height: 22px;
                    font-weight: bold;

                    span.label {
                        padding: 1px 4px;
                        display: inline-block;
                        font-size: 11px;
                        border-radius: 3px;
                        border: 1px solid;
                        line-height: 16px;
                    }

                    .unopen {
                        color: #FF0033;
                        border-color: #FF0033;
                    }

                    .opening {
                        color: #FF9900;
                        border-color: #FF9900;
                    }

                    .success {
                        color: #00CC33;
                        border-color: #00CC33;
                    }

                    .fail {
                        color: #FF0033;
                        border-color: #FF0033;
                    }
                }

                .apply-content {
                    font-size: 13PX;
                    color: #999999;
                    letter-spacing: 0;
                    margin-top: 4px;
                    line-height: 18px;
                }
            }

            .turn-right {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=);
                background-size: cover;
                width: 8px;
                height: 13px;
                float: right;
                margin-top: 15.5px;
            }
        }
    }

</style>

