<template>
    <div class="picker-wrapper">
        <mt-popup class="picker-popup-wrapper" v-model="picker.showPicker" position="bottom">
            <mt-picker :slots="picker.pickerSlots"
                    showToolbar
                    :class="['border-f', {active: picker.showPicker}]"
                    @change="onValuesChange"
                    rotate-effect
                    :visible-item-count="5">
                <span class='cancel' @click="closePicker">取消</span>
                <span class="title">{{picker.pickerToolbarTitle}}</span>
                <span class="choosed" @click="choosed">完成</span>
                
            </mt-picker>

            <div class="footer-wrapper" @click="clickBottomTitle" v-show="picker.showBottom">
                    <div class="footer-title">职级管理</div>
            </div>
        </mt-popup>
        
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {fixedBody, looseBody} from 'base/utils/unit.js'
    export default {
        name: 'BasePicker',
        props: {},
        data() {
            return {}
        },
        computed: {
            ...mapState([
                'picker',
            ]),
        },
        created() {
            this.pickerTitle = this.picker.pickerName[0];
        },
        watch:{
            //禁止页面滚动
            picker(newPicker,oldPicker){
                if(newPicker.showPicker===oldPicker.showPicker){
                    return;
                }
                if(newPicker.showPicker){
                    fixedBody()
                }else {
                    looseBody()
                }
            }
        },
        methods: {
            ...mapActions([
                "pickerChange",
                "changeStaffInfo",
                "changeExtraAction",
            ]),
            // 取消
            closePicker() {
                this.pickerChange({
                    showPicker: false,
                    pickerName: '',//当前选择的字段
                    pickerSlots: [{defaultIndex: 0}],
                    pickerTitle: '',
                    data: null,
                    pickerToolbarTitle: '',
                    showBottom: false,
                });
            },
            // 完成
            choosed() {
                let self = this;
                if(self.picker.pickerName.indexOf('staffInfo.') === 0) {  // 如果是员工信息相关的
                    self.changeStaffInfo({type: self.picker.pickerName.replace('staffInfo.',''), value: self.picker.pickerTitle});
                    if(self.picker.pickerName === 'staffInfo.roleName') {
                        self.changeStaffInfo({type: 'roleId', value: self.getId('name', 'id')});
                    }
                } else if(self.picker.pickerName.indexOf('extraActionInfo.') === 0) {  // 如果是设置项相关的
                    self.changeExtraAction({type: self.picker.pickerName.replace('extraActionInfo.',''), value: self.picker.pickerTitle});
                } else {
                    self.changeStaffInfo({type: self.picker.pickerName.replace('staffInfo.',''), value: self.picker.pickerTitle});
                }
                self.closePicker()
            },
            // 选择
            onValuesChange(picker, values) {
                this.pickerChange({
                    pickerTitle: values[0]
                });
            },
            /**
             * 获取id
             * @param name 显示内容的字段名
             * @param id 需要返回的字段名
             * @return value id值
             */
            getId(name, id) {
                let self = this;
                if (!self.picker.data) {
                    return ''
                }
                for (let data = self.picker.data, leg = data.length, i = 0; i < leg; i++) {
                    if (data[i][name] === self.picker.pickerTitle) {
                        return data[i][id]
                    }
                }
            },
            /**
             * 点击底部title
             */
            clickBottomTitle() {
                this.pickerChange({
                    showPicker: false,
                    pickerName: '',//当前选择的字段
                    pickerSlots: [{defaultIndex: 0}],
                    pickerTitle: '',
                    data: null,
                    pickerToolbarTitle: '',
                    showBottom: false,
                });
                this.$emit('clickBottom')
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .picker-popup-wrapper {
        width: 100%;

        .picker {
            height: 520px;
            left: 0;
            width: 100%;
            background: white;
            z-index: 2;
            opacity: 0;
            transition: all 0.4s ease-in-out;
            transform: translateY(520px);

            &.active {
                opacity: 1;
                transform: translateY(0);
            }

            /deep/ .picker-toolbar {
                height: 88px;
                line-height: 88px;
                background: #E1E0E0;
                display: flex;
                justify-content: space-between;
                flex-flow: nowrap row;
                overflow: hidden;

                span {
                    font-size: 30px;
                    color: #0088FF;
                    display: inline-block;
                    padding: 0;
                }

                .cancel {
                    margin-left: 30px;
                    width: 70px;
                    z-index: 2;
                }

                .title {
                    flex: 1;
                    font-size: 30px;
                    color: #333;
                    font-weight:bold;
                    text-align: center;
                }

                .choosed {
                    font-size: 30px;
                    color: #0088FF;
                    width: 70px;
                    margin-right: 30px;
                    z-index: 2;
                }
            }

            /deep/ .picker-items {
                margin-top: 0px;

                .picker-slot-wrapper {
                    margin-top: 0px;
                    font-size: 34px;
                }
            }
        }

        .footer-wrapper {
            height: 98px;
            width: 100%;
            background-color: rgba(204, 204, 204, 1);
            text-align: center;

            .footer-title {
                margin-top: 10px;
                width: 100%;
                height: 100%;
                background-color: white;
                color: #0088FF;
                padding-top: 24px;
                font-size: 30px;
                display: inline-block;
            }
        }
    }

    .blue {
        color: #0088FF !important;
    }
</style>
