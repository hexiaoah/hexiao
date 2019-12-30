<template>
    <div class="fire-address-picker" v-show="addressPicker.showPicker">
        <div class="mask" v-show="addressPicker.showPicker" @click="closePicker"></div>
        <fade-in-up-big>
            <div v-show="addressPicker.showPicker" class="fire-address-con">
                <fire-title :title="addressPicker.topTitle" @close="closePicker"></fire-title>
                <ul class="tabs">
                    <fade-in-right-big type="group">
                        <li class="tab-item" :class="{active:activeTab===key}" :key="'tab'+key" v-for="text,key in tabs" v-show="!!text" @click="tabClick(key)">{{text}}</li>
                    </fade-in-right-big>
                </ul>
                <div class="address-list">
                    <fade-in-up-big type="group">
                        <ul class="list" :key="'addressList'+key" v-for="text,key in tabs" v-show="activeTab===key">
                            <li class="item" v-for="item,index in addressList[key]">
                                <p class="text fl-left" @click="handleSelect(item)">{{item.name}}</p>
                                <i class="fl-left" :class="{'icon-ok':item.code===address[key].code}"></i>
                            </li>
                        </ul>
                    </fade-in-up-big>
                </div>
            </div>
        </fade-in-up-big>
    </div>
</template>

<script>
    import FireTitle from './fire-title'
    import FadeInUpBig from './animation/fade-in-up-big'
    import FadeInRightBig from './animation/fade-in-right-big'
    import API from '../config/api'
    import {countryCode, addressMap} from '../constant/address-config'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {fixedBody, looseBody} from 'base/utils/unit.js'

    export default {
        name: "fire-address-picker",
        components: {
            FireTitle,
            FadeInUpBig,
            FadeInRightBig
        },
         computed: {
            ...mapState([
                'addressPicker',
            ]),
        },
        props: {
            province: {
                type: String,
                default() {
                    return ''
                }
            },
            city: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        data() {
            return {
                tabs: {
                    province: '请选择',
                    city: ''
                },
                addressList: {
                    province: [],
                    city: []
                },
                address: {
                    province: {},
                    city: {}
                },
                activeTab: 'province'
            }
        },
        methods: {
            ...mapActions([
                "openAddressPicker",
                "modifyInputInfo"
            ]),
            tabClick(activeTab) {
                this.activeTab = activeTab
            },
            handleSelect(data) {
                switch (this.activeTab) {
                    case 'province':
                        if (this.address.province.code !== data.code || !this.address.city.code) {
                            this.tabs.city = '请选择'
                            this.address.city = {}
                            this.getAddress(data.code, 'city')
                        }
                        this.address.province = data
                        this.tabs.province = data.name
                        this.activeTab = 'city'
                        break;
                    case 'city':
                        this.address.city = data
                        this.tabs.city = data.name
                        this.confirm()
                        break;
                    default:
                        console.warn('this is an error about selection of address')
                }
            },
            //取消
            closePicker() {
                this.openAddressPicker({
                    showPicker: false,
                    pickerName: ''
                });
            },
            confirm() {
                let self = this;
                self.addressPicker.pickerTitle = {province: self.address.province, city: self.address.city}
                self.modifyInputInfo({type: self.addressPicker.pickerName, value: self.addressPicker.pickerTitle});
                self.closePicker()
            },
            getAddress(code = '', activeTab) {
                let self = this
                API.getAddress({
                    code: code, 
                    regionCodeType: addressMap[activeTab]
                }).then(d => {
                    self.addressList[activeTab || self.activeTab] = d
                })
            },
            init() {
                this.getAddress(countryCode, 'province')
            }
        },
        watch: {
             //禁止页面滚动
            addressPicker(newPicker,oldPicker){
                if(newPicker.showPicker===oldPicker.showPicker){
                    return;
                }
                if(newPicker.showPicker){
                    fixedBody()
                }else {
                    looseBody()
                }
            },
            province(newVal, oldVal) {
                if (this.province.code && oldVal.code !== newVal.code) {
                    this.address.province = this.province
                    this.tabs.province = this.province.name
                    this.activeTab = 'province'
                }
            },
            city(newVal, oldVal) {
                if (this.city.code && oldVal.code !== newVal.code) {
                    this.address.city = this.city
                    this.tabs.city = this.city.name
                    this.getAddress(this.address.province.code, 'city')
                    this.activeTab = 'city'
                }
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
 .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 0;
    }

    .fire-address-con {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        font-size: 30px;
        z-index: 101;
        .tabs {
            height: 88px;
            line-height: 88px;
            .tab-item {
                position: relative;
                display: inline-block;
                min-width: 170px;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                &.active {
                    color: #0088ff;
                }
                &.active:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 4px;
                    background-color: #0088ff;
                }
            }
        }
        .address-list {
            position: relative;
            width: 100%;
            height: 528px;
        }
        .list {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            font-size: 26px;
            color: #666;
            padding-top: 26px;
            overflow: auto;
            .item {
                height: 36px;
                line-height: 36px;
                padding-right: 20px;
                margin-bottom: 34px;
                overflow: hidden;
                .text {
                    width: 100%;
                    padding-left: 66px;
                    margin-left: -26px;
                }
            }
            .icon-ok {
                display: inline-block;
                width: 26px;
                height: 36px;
                background: url("https://assets.2dfire.com/frontend/968849d2fd3777820124b0bc6d1b5834.png") no-repeat;
                background-size: 26px 20px;
                background-position: center;
            }
        }
    }
</style>
