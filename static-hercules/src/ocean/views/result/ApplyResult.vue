<template>
    <div class="result-wrapper">
        <!--申请审核中-->
        <div class="applying-wrapper" v-if="openStatus === 'opening'">
            <i class="applying"></i>
            <p class="title">审核中</p>
            <p class="content">你的支付宝优惠费率申请已经成功提交支付宝官方审核，预计审核时间为3-5个工作日，还请耐心等待。</p>
            <span class="view-material" @click="viewInfo">查看已递交的材料</span>
        </div>
        <!--申请失败-->
        <div class="fail-wrapper" v-if="openStatus === 'open_fail'">
            <i class="fail"></i>
            <p class="title">审核失败</p>
            <div class="content">
                <p>原因:</p>
                <p>{{content}}</p>
            </div>
            <span class="view-material result-btn" @click="applyAgain">重新申请</span>
        </div>
        <!--申请成功-->
        <div class="success-wrapper" v-if="openStatus === 'opened'">
            <i class="success"></i>
            <p class="title">恭喜您已通过支付宝优惠费率的申请！</p>
            <span class="view-material " @click="viewInfo">查看已递交的材料</span>
        </div>
    </div>
</template>

<script>
    import {applyState, getShopInfo} from 'src/ocean/config/api.js'
    import errorToast from 'src/ocean/libs/errorToast'
    import {mapActions} from 'vuex'

    export default {
        name: 'ApplyResult',
        data() {
            return {
                content: '',
                openStatus: ''
            }
        },
        created() {
            const self = this;
            let {openStatus, title, content} = this.$route.query
            this.openStatus = openStatus
            this.content = content
            applyState().then(data => {
                self.openStatus = data.data.openStatus || ''
                if (self.openStatus === 'unopen') {
                    this.$router.replace({path: '/input/first/first'})
                }
                self.getInfo();
            }).catch(e => {
                errorToast.show(e.result.message)
            }).then(

            )
        },
        methods: {
            ...mapActions(['changeViewState']),
            // 重新申请
            applyAgain() {
                if (!this.$route.query.openStatus) {
                    this.changeViewState('first');
                }
                this.$router.push({path: '/input/first/first'})
            },
            // 查看申请资料
            viewInfo() {
                this.$router.push({path: '/input/first/first'})
            },
            getInfo() {
                const self = this;
                getShopInfo().then(data => {
                    data = data.data
                    if (self.openStatus === 'open_fail') {
                        self.content = data.reason
                    }
                    switch (self.openStatus) {
                        case "open_fail":
                            this.changeViewState('first');
                            break;
                        case "opening":
                            this.changeViewState('detail');
                            break;
                        case "opened":
                            if (data.canEdit === 'CAN_EDIT') {
                                this.changeViewState('edit');
                            } else {
                                this.changeViewState('detail');
                            }
                            break;
                        default:
                            this.changeViewState('first');
                            break;
                    }
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .result-wrapper {

        i {
            display: block;
            width: 29px;
            height: 29px;
            margin: 0 auto 20px;
            background-repeat: no-repeat;
            &.applying {
                background-image: url(https://assets.2dfire.com/frontend/b5558aafd495fa5f5f26dc44f17ca784.png);
                background-size: cover;
            }
            &.fail {
                background-image: url(https://assets.2dfire.com/frontend/9a3d5a07f4fe2591ec0ac54877b8c1a0.png);
                background-size: cover;
            }
            &.success {
                background-image: url(https://assets.2dfire.com/frontend/2a92d2054af1e46f78aa5163a94a5d77.png);
                background-size: cover;
            }
        }

        .title {
            font-size: 17PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 22px;
            text-align: center;
            margin-bottom: 15px;
        }

        .content {
            font-size: 13PX;
            color: #666666;
            line-height: 18px;
            text-align: center;
            padding: 0 25px 15px;
            letter-spacing: 0;
            word-wrap: break-word;
        }

        .view-material {
            font-size: 13PX;
            color: #0088FF;
            line-height: 18px;
            text-align: center;
            display: block;
        }

        .applying-wrapper {
            padding-top: 183px;
        }

        .fail-wrapper {
            padding-top: 160px;

            .content {
                margin-bottom: 36px;
            }

            a {
                width: 300px;
                height: 44px;
                background: #0088FF;
                border-radius: 6px;
                font-size: 15PX;
                color: #FFFFFF;
                line-height: 44px;
                display: block;
                text-align: center;
                margin: auto;
            }
        }

        .success-wrapper {
            padding-top: 218px;
        }
        .result-btn {
            width: 300px;
            height: 44px;
            background: #0088FF;
            border-radius: 6px;
            font-size: 15PX;
            color: #FFFFFF;
            line-height: 44px;
            display: block;
            text-align: center;
            margin: auto;
        }
    }
</style>

