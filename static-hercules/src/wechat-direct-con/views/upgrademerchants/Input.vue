<template>
    <div class="input-wrapper">
        <div>
            <ul class="step border-b">
                <transition-tab :class="((step==='first') || (step==='second') || (step==='third') || (step==='fourth'))?'active':''">填写资料</transition-tab>
                <transition-tab :class="((step==='second') || (step==='third') || (step==='fourth'))?'active':''">微信审核</transition-tab>
                <transition-tab :class="((step==='third') || (step==='fourth'))?'active':''">扫码签约</transition-tab>
                <transition-tab :class="step==='fourth'?'active':''">功能启用</transition-tab>
            </ul>
        </div>

        <div :name="transitionName">
            <router-view></router-view>
        </div>

        <!--地址选择器-->
        <AddressPicker></AddressPicker>
        <!--底部选择弹窗-->
        <Picker></Picker>
        <!--日期选择弹窗-->
        <DateNewPicker :startDate="startDate" :endDate="endDate"></DateNewPicker>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import Picker from 'src/wechat-direct-con/components/info-picker.vue'
    import DateNewPicker from 'src/wechat-direct-con/components/date-picker-new.vue'
    import AddressPicker from 'src/wechat-direct-con/components/fire-address-picker.vue'
    import TransitionTab from '../../components/transition-tab.vue'

    export default {
        name: 'upgrademerchants',
        data() {
            return {
                step: 'first',
                transitionName: '',
                startDate: new Date('1950'),
                endDate: new Date('2050'),
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
                this.getTransitionName()
            },
        },
        components: {
            Picker,
            DateNewPicker,
            AddressPicker,
            TransitionTab
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
      
        .step {
            background: white;
            text-align: center;
            overflow: hidden;
            z-index: 0;
        }
    }
</style>