<template>
    <li class="input-list border-b" :class="!canEdit?'no-edit':' input-choose'">
        <span class="title">{{title}}</span>
        <span class="content" @click="pickerChoose" v-if="canEdit">
            <input type="text" placeholder="必选" :value="value" disabled/>
        </span>
        <span class="content" v-if="!canEdit">{{value}}</span>
    </li>
</template>

<script>
    import {shopKind, getRegion, getBank, getBankProvince, getBankCity} from 'src/ocean/config/api.js'
    import errorToast from 'src/ocean/libs/errorToast'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'ShopBaseInfo',
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
            value: {
                type: String,
                required: true,
                default: ''
            },
            parentId: {
                type: String,
                required: false,
                default: ''
            },
            editSubStatus: {
                required: false,
            }
        },
        data() {
            return {
                isCloseShow: false
            }
        },
        computed: {
            ...mapState(["viewState", "subStatus"]),
            canEdit() {
                if (this.viewState === 'detail') {
                    return false
                } else if (this.viewState === 'edit') {
                    return true
                } else {
                    if (this.editSubStatus) {
                        return true
                    } else {
                        if (this.subStatus === 31) {
                            return false
                        } else {
                            return true
                        }
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'pickerChange',
            ]),
            pickerChoose() {
                let self = this;
                if (this.viewState === 'detail') {
                    return false
                }
                switch (self.selectName) {
                    // 营业模式
                    case 'shopKind':
                        self.getShopKind();
                        break;
                    case 'merchantType':
                        self.getMerchantType();
                        break;
                    case 'provinceName':
                        self.getRegionName('province', self.parentId)
                        break;
                    case 'cityName':
                        if (!self.parentId) {
                            errorToast.show('请先选择省份');
                            return false;
                        }
                        self.getRegionName('city', self.parentId)
                        break;
                    case 'townName':
                        if (!self.parentId) {
                            errorToast.show('请先选择城市');
                            return false;
                        }
                        self.getRegionName('town', self.parentId)
                        break;
                    //法人信息证件类型
                    case 'certificateType':
                        self.getCertificateType()
                        break;
                    //开户人信息证件类型
                    case 'idType':
                        self.getIdType()
                        break;
                    //开户银行
                    case 'bankName':
                        self.getBankName()
                        break;
                    //开户省份
                    case 'bankProvince':
                        self.getBankProvinceName()
                        break;
                    //开户城市
                    case 'bankCity':
                        self.getBankCityName()
                        break;
                    //开户支行
                    case 'bankSubName':
                        self.getBankSubName()
                        break;
                    // //是否需要支付宝物料
                    // case 'needMaterial':
                    //     self.getNeedMaterial()
                    //     break;
                }
            },
            //营业模式选择
            getShopKind() {
                let self = this;
                shopKind().then(data => {
                    data = data.data.rest.operationModes
                    let value = data.map((val) => val.name)
                    self.initPicker(value, data)
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            },
            //商户类型选择
            getMerchantType() {
                const data = [{name: '个体工商户', id: '02'}, {name: '企业商户', id: '03'}];
                this.initPicker(data.map((val) => val.name), data)
            },
            //开户人帐户类型
            getIdType() {
                this.initPicker(['身份证'])
            },
            //店铺地址省份选择
            getRegionName(type, parentId) {
                let self = this;
                getRegion(type, parentId).then(data => {
                    data = data.data;
                    let value = data.subAreaList.map((val) => val.name)
                    self.initPicker(value, data.subAreaList)
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            },
            //法人证件类型
            getCertificateType() {
                this.initPicker(['身份证'])
            },
            //开户银行
            getBankName() {
                let self = this;
                getBank().then(data => {
                    data = data.data;
                    let value = data.map((val) => val.bankDisplayName)
                    self.initPicker(value, data)
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            },
            //开户省份
            getBankProvinceName() {
                let self = this;
                if (!self.parentId) {
                    errorToast.show('请先选择开户银行');
                    return false;
                }
                getBankProvince(self.parentId).then(data => {
                    data = data.data;
                    let value = data.map((val) => val.provinceName)
                    self.initPicker(value, data)
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            },
            //开户城市
            getBankCityName() {
                let self = this;
                const parentId = self.parentId.split('&&');
                if (parentId.length < 2 || parentId[0] === 'undefined' || parentId[1] === 'undefined' || parentId[0] === '' || parentId[1] === '') {
                    errorToast.show('请先选择开户银行和开户省份')
                    return false
                }
                getBankCity(parentId[0], parentId[1]).then(data => {
                    data = data.data;
                    let value = data.map((val) => val.cityName)
                    self.initPicker(value, data)
                }).catch(e => {
                    // errorToast.show(e.result.message)
                    console.log(e)
                })
            },
            //选择开户支行
            getBankSubName() {
                const self = this;
                const parentId = self.parentId.split('&&');
                if (parentId.length < 2) {
                    errorToast.show('请先选择开户银行和开户省份')
                    return false
                } else if (parentId[0] === 'undefined' || parentId[0] === '') {
                    errorToast.show('请先选择开户银行')
                    return false
                } else if (parentId[1] === 'undefined' || parentId[1] === '') {
                    errorToast.show('请先选择开户城市')
                    return false
                }
                self.$router.push({path: '/bankSub'})
            },
            // // 是否需要支付宝物料
            // getNeedMaterial() {
            //     this.initPicker(['是', '否'])
            // },
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
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped></style>
