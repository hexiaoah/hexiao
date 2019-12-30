<template>
    <div class="picker-wrapper">
        <div class="mask" v-show="picker.showPicker" @click="closePicker"></div>
        <mt-picker :slots="picker.pickerSlots"
                   showToolbar
                   :class="['border-f', {active: picker.showPicker}]"
                   @change="onValuesChange"
                   rotate-effect
                   :visible-item-count="5">
            <span class='cancel' @click="closePicker">取消</span>
            <span class="title">{{picker.pickerTitle}}</span>
            <span class="choosed" @click="choosed">完成</span>
        </mt-picker>
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
                "modifyInputInfo",
            ]),
            // 取消
            closePicker() {
                this.pickerChange({
                    showPicker: false,
                    pickerName: '',//当前选择的字段
                    pickerSlots: [{defaultIndex: 0}],
                    pickerTitle: '',
                    data: null
                });
            },
            // 完成
            choosed() {
                let self = this;
                self.modifyInputInfo({type: self.picker.pickerName, value: self.picker.pickerTitle});
                if(self.picker.pickerName === 'accountBank') {  // 开户银行
                  self.modifyInputInfo({type: 'accountBankCode', value: self.getId('bankDisplayName', 'bankName')});
                  self.modifyInputInfo({type: 'accountNumber', value: ''});
                  self.modifyInputInfo({type: 'accountAddressProvince', value: ''});
                  self.modifyInputInfo({type: 'accountAddressProCode', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountAddressProvince') {  // 开户省
                  self.modifyInputInfo({type: 'accountAddressProCode', value: self.getId('provinceName', 'provinceNo')});
                  self.modifyInputInfo({type: 'accountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountAddressCity') {  // 开户市
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: self.getId('cityName', 'cityNo')});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountBank') {  // 开户银行
                  self.modifyInputInfo({type: 'businessAccountBankCode', value: self.getId('bankDisplayName', 'bankName')});
                  self.modifyInputInfo({type: 'businessAccountNumber', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressProvince', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountAddressProvince') {  // 开户省
                  self.modifyInputInfo({type: 'businessAccountAddressProCode', value: self.getId('provinceName', 'provinceNo')});
                  self.modifyInputInfo({type: 'businessAccountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountAddressCity') {  // 开户市
                  self.modifyInputInfo({type: 'businessAccountAddressCityCode', value: self.getId('cityName', 'cityNo')});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountBankNew') {  // 开户银行--修改银行卡页面
                  self.modifyInputInfo({type: 'accountBank', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'accountBankCode', value: self.getId('bankDisplayName', 'bankName')});
                  self.modifyInputInfo({type: 'accountNumber', value: ''});
                  self.modifyInputInfo({type: 'accountAddressProvince', value: ''});
                  self.modifyInputInfo({type: 'accountAddressProCode', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountAddressProvinceNew') {  // 开户省--修改银行卡页面
                  self.modifyInputInfo({type: 'accountAddressProvince', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'accountAddressProCode', value: self.getId('provinceName', 'provinceNo')});
                  self.modifyInputInfo({type: 'accountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountAddressCityNew') {  // 开户市--修改银行卡页面
                  self.modifyInputInfo({type: 'accountAddressCity', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'accountAddressCityCode', value: self.getId('cityName', 'cityNo')});
                  self.modifyInputInfo({type: 'accountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'accountSubBankNew') {  // 开户银行支行--修改银行卡页面
                  self.modifyInputInfo({type: 'accountSubBank', value: self.picker.pickerTitle});
                }
                if(self.picker.pickerName === 'businessAccountBankNew') {  // 开户银行--修改银行卡页面--企业商户
                  self.modifyInputInfo({type: 'businessAccountBank', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'businessAccountBankCode', value: self.getId('bankDisplayName', 'bankName')});
                  self.modifyInputInfo({type: 'businessAccountNumber', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressProvince', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressProCode', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountAddressProvinceNew') {  // 开户省--修改银行卡页面--企业商户
                  self.modifyInputInfo({type: 'businessAccountAddressProvince', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'businessAccountAddressProCode', value: self.getId('provinceName', 'provinceNo')});
                  self.modifyInputInfo({type: 'businessAccountAddressCity', value: ''});
                  self.modifyInputInfo({type: 'businessAccountAddressCityCode', value: ''});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountAddressCityNew') {  // 开户市--修改银行卡页面--企业商户
                  self.modifyInputInfo({type: 'businessAccountAddressCity', value: self.picker.pickerTitle});
                  self.modifyInputInfo({type: 'businessAccountAddressCityCode', value: self.getId('cityName', 'cityNo')});
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: ''});
                }
                if(self.picker.pickerName === 'businessAccountSubBankNew') {  // 开户银行支行--修改银行卡页面--企业商户
                  self.modifyInputInfo({type: 'businessAccountSubBank', value: self.picker.pickerTitle});
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
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .picker {
        height: 460px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: white;
        z-index: 2;
        opacity: 0;
        transform: translateY(460px);
        transition: all 0.4s ease-in-out;

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

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 0;
    }

    .blue {
        color: #0088FF !important;
    }
</style>
