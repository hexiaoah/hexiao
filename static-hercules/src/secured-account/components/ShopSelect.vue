<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="[!canEdit?'no-edit':' input-choose', !childStatus?'':'child-input']">
            <span class="select-title">{{title}}</span>
            <span class="content" @click="pickerChoose" v-if="canEdit">
                <input type="text" placeholder="必选" v-if="!isObjectValue" :value="value" disabled/>
                <input type="text" placeholder="必选" v-if="isObjectValue" :value="getObjectValue" disabled/>
            </span>
            <span class="content" v-if="!canEdit && !isObjectValue">{{value}}</span> 
            <span class="objectContent" v-if="!canEdit && isObjectValue">{{objectValue}}</span> 
            <!--objectValue与value不能同时使用-->
        </div>
        <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
    import Picker from 'src/secured-account/components/info-picker.vue'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import API from '../config/api'

    export default {
        name: 'XiaoWeiBaseInfo',
        props: {
            selectName: {
                type: String,
                required: true,
                default: false
            },
            title: {
                type: String,
                required: true,
                default: false
            },
            childStatus: { // 是否是子select item
                type: Boolean,
                required: false,
                default: false
            },
            value: {
                type: String,
                required: false,
                default: ''
            },
            objectValue: {
                type: Object,
                required: false,
                default() {
                    return {
                        province: {},
                        city: {}
                    }
                }
            },
            parentId: {
                type: String,
                required: false,
                default: ''
            },
            editSubStatus: {
                required: false,
            },
            isObjectValue: { // value值是对象
                type: Boolean,
                required: false,
                default: false
            },
            explain: {
                type: String,
                required: false,
                default: ''
            }
        },
        data() {
            return {
                isCloseShow: false
            }
        },
        computed: {
            ...mapState([
                "isEditAddress",
            ]),
            canEdit() {
                return true;
            },
            getObjectValue() {
                if(Object.keys(this.objectValue).length === 0 || Object.keys(this.objectValue.province).length === 0 || Object.keys(this.objectValue.city).length === 0) {
                    return ''
                } else {
                    return `${this.objectValue.province.name}${this.objectValue.city.name}`
                }
            }
        },
        methods: {
            ...mapActions([
                'pickerChange',
                'openDatePicker',
                'openAddressPicker'
            ]),
            pickerChoose() {
                let self = this;
                switch (self.selectName) {
                    // 主体类型
                    case 'merchantType':
                        self.getMerchantType();
                        break;
                    case 'startDate':
                    case 'endDate':
                    case 'businessStartTime':
                    case 'businessEndTime':
                    case 'orgStartTime':
                    case 'orgEndTime':
                        self.getBusinessTime();
                        break;
                    case 'shopAddress':
                    case 'registerAddress':
                        self.getAddress(self.objectValue);
                        break;
                    case 'serviceType':
                        self.getServiceType(); // 服务类型
                        break;
                    case 'businessLicenseType':
                        self.businessLicenseType()
                        break;
                    case 'accountBank':
                    case 'businessAccountBank':
                    case 'accountBankNew':
                    case 'businessAccountBankNew':
                        self.getAccountBank();  // 开户银行
                        break;
                    case 'accountAddressProvince':
                    case 'businessAccountAddressProvince':
                    case 'accountAddressProvinceNew':
                    case 'businessAccountAddressProvinceNew':
                        self.getBankProvince();  // 开户省
                        break;
                    case 'accountAddressCity':
                    case 'businessAccountAddressCity':
                    case 'accountAddressCityNew':
                    case 'businessAccountAddressCityNew':
                        self.getBankCity();      // 开户市
                        break;
                    case 'accountSubBank': 
                    case 'businessAccountSubBank':
                    case 'accountSubBankNew':
                    case 'businessAccountSubBankNew':
                        self.getSubBanks();      // 开户支行
                        break;
                }
            },
            //主体类型选择
            getMerchantType() {
                const data = [{name: '企业商户', id: '02'}, {name: '个体工商户', id: '04'}];
                this.initPicker(data.map((val) => val.name), data)
            },
             //营业执照类型选择
            businessLicenseType() {
                const data = [{name: '已三证合一', id: '1762'}, {name: '未三证合一', id: '1763'}];
                this.initPicker(data.map((val) => val.name), data)
            },
            getBusinessTime() {
                this.initDatePicker()
            },
            getAddress(value) {
                this.initAddressPicker(value)
            },
             //服务类型选择
            getServiceType() {
                const data = [{name: '餐饮', id: '04'}, {name: '线下零售', id: '05'},];
                this.initPicker(data.map((val) => val.name), data)
            },
            //开户银行选择
            getAccountBank() {
                API.getBankList({
                }).then(data => {
                    this.initPicker(data.map((val) => val.bankDisplayName), data)
                })
            },
            //开户省选择
            getBankProvince() {
                const self = this
                if(this.parentId === 'undefined' || this.parentId === '') {
                    if((this.selectName !== 'accountAddressProvinceNew' && this.selectName !== 'businessAccountAddressProvinceNew') && this.isEditAddress === false) {
                        self.$alert({
                            confirmText: '我知道了',
                            content: '请先选择开户银行'
                        })
                    } else {
                        self.$alert({
                            confirmText: '我知道了',
                            content: '请先选择开户银行'
                        })
                    }
                } else {
                    API.getBankProvince({
                        bankName: this.parentId
                    }).then(data => { 
                        this.initPicker(data.map((val) => val.provinceName), data)
                    })
                }
            },
            //开户市选择
            getBankCity() {
                var self = this
                const parentId = self.parentId.split('&&');
                if(parentId.length< 2 || parentId[0] === 'undefined' || parentId[0] === '' || parentId[1] === 'undefined' || parentId[1] === '') {
                    if((self.selectName !== 'accountAddressCityNew' && self.selectName !== 'businessAccountAddressCityNew') && this.isEditAddress === false) {
                        self.$alert({
                            confirmText: '我知道了',
                            content: '请先选择开户银行和开户省'
                        })
                    } else {
                        self.$alert({
                            confirmText: '我知道了',
                            content: '请先选择开户银行和开户省'
                        })
                    }
                } else {
                    API.getBankCity({
                        bankName: parentId[0],
                        provinceNo: parentId[1]
                    }).then(data => {                 
                        self.initPicker(data.map((val) => val.cityName), data)
                    })
                }
            },
            //开户支行选择
            getSubBanks() {
                var self = this
                const parentId = self.parentId.split('&&');
                if(parentId.length< 3 || parentId[0] === 'undefined' || parentId[0] === '' || parentId[1] === 'undefined' || parentId[1] === ''
                    || parentId[2] === 'undefined' || parentId[2] === '') {
                        if((self.selectName !== 'accountSubBankNew' && self.selectName !== 'businessAccountSubBankNew') && this.isEditAddress === false) {
                            self.$alert({
                                confirmText: '我知道了',
                                content: '请先选择开户银行和开户省市'
                            })
                        } else {
                            self.$alert({
                                confirmText: '我知道了',
                                content: '请先选择开户银行和开户省市'
                            })
                        }
                } else {
                    // API.getSubBanks({
                    //     bankName: parentId[0],
                    //     cityNo: parentId[2]
                    // }).then(data => {           
                    //     self.initPicker(data.map((val) => val.subBankName), data)
                    // })
                    this.$router.push('/bank-sub')
                }
            },
            /**
             * 选择数据初始化
             * data: [] 用于picker选择的数组
             * oldData 原来数组
             * */
            initPicker(data, oldData) {
                let self = this;
                const picker = {
                    showPicker: true,
                    pickerName: self.selectName,
                    pickerSlots: [
                        {
                            flex: 1,
                            values: data,
                            className: 'slot1',
                            textAlign: 'center'
                        }],
                    data: oldData || null,
                    // pickerTitle: data[0]
                };
                self.pickerChange(picker);
            },
            /**
             * 日期选择
             * */
            initDatePicker() {
                let self = this;
                const dateNewPicker = {
                    showPicker: true,
                    pickerName: self.selectName,
                    pickerTitle: self.title,
                    pickerValue: self.value
                };
                self.openDatePicker(dateNewPicker);
            },
            /**
             * 地址选择
             */
            initAddressPicker(value) {
                 let self = this;
                const picker = {
                    showPicker: true,
                    pickerName: self.selectName,
                    pickerTitle: value,
                    topTitle: self.title
                };
                self.openAddressPicker(picker);
            },
        }
    }
</script>