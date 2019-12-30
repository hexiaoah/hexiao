<template>
    <div class="input-wrapper">
        <div>
            <div class="top-hint" v-show="step==='first'&&viewState==='first'">
                资料将提交支付宝审核，请仔细填写！提交成功后，1个月只能变更1次。如需紧急变更，请联系客服：4000166588。
            </div>
            <div class="top-hint" v-show="step==='first'&&viewState==='detail'">
                资料将提交支付宝审核，请仔细填写！提交成功后，1个月只能变更1次，上次变更时间是{{editTime}}。如需紧急变更，请联系客服：4000166588
            </div>

            <ul class="step  border-b">
                <li class="step-list" :class="step==='first'?'active':''" @click="toStep('first')">步骤1</li>
                <li class="step-list" :class="step==='second'?'active':''" @click="toStep('second')">步骤2</li>
                <li class="step-list" :class="step==='third'?'active':''" @click="toStep('third')">步骤3</li>
                <li class="step-list" :class="step==='fourth'?'active':''" @click="toStep('fourth')">步骤4</li>
            </ul>

            <!--具体步骤-->
            <transition :name="transitionName">
                <router-view></router-view>
            </transition>
        </div>
        <!--底部选择弹窗-->
        <Picker></Picker>
    </div>
</template>
<script>
    import Picker from 'src/ocean/components/Picker.vue'
    import {mapState, mapActions} from 'vuex'
    import errorToast from 'src/ocean/libs/errorToast'
    import {getShopInfo} from 'src/ocean/config/api'

    export default {
        name: 'inputs',
        data() {
            return {
                lastStep: 'first',
                step: 'first',
                editTime: '',
                transitionName: ''
            }
        },
        computed: {
            ...mapState([
                'viewState',
                'picker'
            ])
        },
        created() {
            const self = this;
            const viewState = self.$route.query.viewState;
            if (viewState) {
                self.changeViewState(viewState)
            }
            this.getNewStep();
            if (self.$route.query.type === 'noRefresh') {
                return false;
            }
            getShopInfo().then(data => {
                let shopInfo = data.data.attribute;
                shopInfo.smsCode='';
                delete shopInfo.class;
                self.updataShopInfo(shopInfo);
                self.changeSubStatus(data.data.subStatus);
                let time = new Date(data.data.opTime);
                self.editTime = `${time.getMonth() + 1}月${time.getDate()}日`;
                self.saveInputId(data.data.id);
            }).catch(e => {
                // errorToast.show(e.result.message)
                console.log(e)
            })
        },
        methods: {
            ...mapActions([
                'updataShopInfo',
                'saveInputId',
                'changeViewState',
                'changeSubStatus'
            ]),

            getTransitionName() {
                let obj = {
                    first: 1,
                    second: 2,
                    third: 3,
                    fourth: 4
                }
                if (!obj[this.step] || !obj[this.lastStep] || obj[this.step] === obj[this.lastStep]) {
                    return ''
                }
                this.transitionName = obj[this.step] > obj[this.lastStep] ? 'slide-left' : 'slide-right'
                console.log(this.transitionName);
            },
            getNewStep() {
                this.lastStep = this.step;
                this.step = this.$route.params.step;
                console.log(this.lastStep, this.step);
                this.getTransitionName()
            },

            toStep(step) {
                // if (!this.viewState || this.viewState === 'first') {
                //     return false;
                // }
                switch (step) {
                    case 'second':
                        this.$router.replace({path: '/input/second/second'});
                        break;
                    case 'third':
                        this.$router.replace({path: '/input/third/third'});
                        break;
                    case 'fourth':
                        this.$router.replace({path: '/input/fourth/fourth'});
                        break;
                    default:
                        this.$router.replace({path: '/input/first/first'});
                        break;
                }
                this.getTransitionName()
            }
        },
        components: {Picker},
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getNewStep'
        },

    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    /* step  切换动画*/
    .slide-left-enter {
        transform: translateX(100%);
        opacity: 0;
    }

    .slide-left-enter-active {
        transform: translateX(100%);
        transition: all .2s .2s;
        opacity: 0;
    }

    .slide-left-enter-to {
        transform: translateX(0);
        opacity: 1;
    }

    /*===结束*/
    .slide-left-leave {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-left-leave-active {
        transform: translateX(0);
        transition: all .2s;
        opacity: 1;
    }

    .slide-left-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }

    /*===========*/
    .slide-right-enter {
        transform: translateX(-100%);
        opacity: 0;
    }

    .slide-right-enter-active {
        transform: translateX(-100%);
        transition: all .2s .2s;
        opacity: 0;
    }

    .slide-right-enter-to {
        transform: translateX(0);
        opacity: 1;
    }

    /*===结束*/
    .slide-right-leave {
        transform: translateX(0);
        opacity: 1;
    }

    .slide-right-leave-active {
        transform: translateX(0);
        transition: all .2s;
        opacity: 1;
    }

    .slide-right-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }

    .input-wrapper {
        padding-bottom: 90PX;
        &.no-scroll {
            /*height: 100%;*/
            /*height: 100vh;*/
            overflow-y: hidden;
        }
        .top-hint {
            font-size: 15PX;
            color: #333333;
            letter-spacing: 0;
            text-align: justify;
            line-height: 20PX;
            background: rgba(255, 221, 0, 0.30);
            box-shadow: 0 0 0 0 #CCCCCC;
            padding: 10PX 15PX;
        }
        .step {
            background: white;
            padding: 0 18PX;
            text-align: center;
            overflow: hidden;
            z-index: 0;
            /*border-bottom: 1PX solid #ccc;*/
            .step-list {
                position: relative;
                float: left;
                // display: inline-block;
                font-size: 13PX;
                color: #333;
                text-align: center;
                line-height: 18PX;
                width: 25%;
                height: 64PX;
                &:before {
                    content: '';
                    display: block;
                    width: 10PX;
                    height: 10PX;
                    margin: 15PX auto 6PX;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    background: white;
                    box-sizing: border-box;
                }
                &:after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 20PX;
                    width: 100%;
                    height: 0.5PX;
                    background: #ccc;
                    margin-left: 5PX;
                }
                &:last-child:after {
                    content: none;
                }
                &.active {
                    color: #0088FF;
                    &:before {
                        content: '';
                        display: block;
                        width: 10PX;
                        height: 10PX;
                        margin: 15PX auto 6PX;
                        border-radius: 50%;
                        background: #0088FF;
                        border: 0;
                    }

                }
            }
        }
    }
</style>

