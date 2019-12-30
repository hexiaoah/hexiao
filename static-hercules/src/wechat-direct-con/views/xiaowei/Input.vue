<template>
    <div class="input-wrapper">
        <div>
            <div class="top-attention" v-show="isShowTop">请认真如实填写，否则将无法升级到普通商户，影响微信支付额度。</div>
            <ul class="step border-b">
                <transition-tab :class="((step==='first') || (step==='second') || (step==='third') || (step==='fourth'))?'active':''">填写资料</transition-tab>
                <transition-tab :class="((step==='second') || (step==='third') || (step==='fourth'))?'active':''">微信审核</transition-tab>
                <transition-tab :class="((step==='third') || (step==='fourth'))?'active':''">扫码签约</transition-tab>
                <transition-tab :class="step==='fourth'?'active':''">功能启用</transition-tab>
            </ul>
        </div>

        <div :name="transitionName">
            <router-view class="router-view"></router-view>
        </div>

        <!--底部弹窗-->
        <Picker></Picker>
        <!--日期选择器-->
        <DateNewPicker :startDate="startDate" :endDate="endDate"></DateNewPicker>

    </div>
</template>

<script>
   
import TransitionTab from '../../components/transition-tab.vue'
import Picker from 'src/wechat-direct-con/components/info-picker.vue'
import DateNewPicker from 'src/wechat-direct-con/components/date-picker-new.vue'

import {
    mapState,
    mapActions
} from 'vuex'

    export default {
        name: 'inputs',
        data() {
            return {
                step: 'first',
                transitionName: '',
                startDate: new Date('1950'),
                endDate: new Date('2050'),
                isShowTop: false,
            }
        },
        computed: {
            ...mapState([
                'picker',
                'datePicker'
                // 'viewState'
            ])
        },
        created() {
            this.getNewStep(); 
        },
        methods: {
            getTransitionName() {
                let obj = {
                    first: 1,
                    second: 2,
                    third: 3,
                    fourth: 4
                }
                if (!obj[this.step]) {
                    return ''
                }
                this.transitionName = 'slide-right'
            },
            getNewStep() {
                this.step = this.$route.params.step;
                if(this.step === 'first') {
                    this.isShowTop = true
                } else {
                    this.isShowTop = false
                }
                this.getTransitionName()
            },
        },
        components: {
            TransitionTab,
            Picker,
            DateNewPicker
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'getNewStep'
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
   
    .slide-right {
        opacity: 1;
    }

    .input-wrapper {
      
        .top-attention {
            background: pink;
            color: #333333;
            padding-top: 18px;
            padding-bottom: 18px;
            padding-left: 30px;
            font-size: 30px;
            line-height: 40px;
            margin: 0 auto;
        }

        .step {
            background: white;
            text-align: center;
            overflow: hidden;
            z-index: 0;
        }
    }
</style>

