<template>
    <div class="picker-wrapper">
        <!-- <div class="mask" v-show="datePicker.showPicker" @mousedown="closePicker"></div> -->
        <div class="pickerPop" @touchmove.prevent>
            <mt-datetime-picker show-toolbar type="date" ref="picker" v-model="dateVal" year-format="{value} 年"
                month-format="{value} 月" date-format="{value} 日" @cancel="closePicker" @confirm="choosed"
                confirmText="完成" :start-date="startDate" :end-date="endDate">
            </mt-datetime-picker>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import {
        fixedBody,
        looseBody
    } from 'base/utils/unit.js'
    export default {
        name: 'BaseDatePicker',
        props: {},
        data() {
            return {
                startDate: new Date('1980'),
                endDate: new Date('2050'),
                dateVal: new Date(),
            }
        },
        computed: {
            ...mapState([
                'datePicker',
            ]),
        },
        created() {},
        watch: {
            //禁止页面滚动 fixedBody() looseBody()
            datePicker: {
                deep: true,
                handler: function () {
                    if (this.datePicker.showPicker) {
                        if (this.datePicker.pickerTitle != null && this.datePicker.pickerTitle != '')
                            this.dateVal = new Date(this.datePicker.pickerTitle)
                        this.$refs.picker.open()
                    } else {
                        this.$refs.picker.close()
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                "openDatePicker",
                "modifyInputInfo",
            ]),
            openPicker() {
                this.$refs.picker.open()
            },
            // 取消
            closePicker() {
                this.openDatePicker({
                    showPicker: false,
                    pickerName: '', //当前选择的字段
                });
            },
            // 完成
            choosed() {
                let self = this;
                self.datePicker.pickerTitle = self.dateVal.toLocaleDateString().replace(/\//g, '.')
                this.modifyInputInfo({
                    type: self.datePicker.pickerName,
                    value: self.datePicker.pickerTitle
                });
                self.closePicker()
            },
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .pickerPop {
        /deep/ .picker {
            height: 520px;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background: white;
            z-index: 2;
            transform: translateY(60px);
            transition: all 0.4s ease-in-out;

            &.active {
                opacity: 1;
                transform: translateY(0);
            }
            .picker-toolbar {
                height: 88px;
                line-height: 88px;
                background: #E1E0E0;
                display: flex;
                justify-content: space-between;
                flex-flow: nowrap row;
                .mint-datetime-action {
                    margin-top: 30px;
                    font-size: 30px;
                    justify-content: space-between;
                    color: #0088FF!important;
                    position: relative;
                    text-align: center;
                }
                .mint-datetime-cancel {
                    text-align: left;
                    margin-left: 30px;
                }
                .mint-datetime-title {
                    text-align: center;
                    margin-left: 34px;
                }
                .mint-datetime-confirm {
                    text-align: right;
                    margin-right: 30px;
                }
            }
        }
         /deep/ .picker-items {
            .picker-slot-wrapper {
                margin-top: 8px;
                font-size: 34px;
            }
        }
    }
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.0);
        z-index: 0;
    }

    .blue {
        color: #0088FF !important;
    }
</style>