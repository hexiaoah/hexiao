<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="[!canEdit?'no-edit':' input-choose', !childStatus?'':'child-input']">
            <span class="select-title">{{title}}</span>
            <span class="content" @click="pickerChoose" v-if="canEdit">
                <input type="text" placeholder="必选" :value="value" disabled/>
            </span>
            <span class="content" v-if="!canEdit">{{value}}</span>
            <i class="iconfont icon-next" v-if="canEdit"></i>
        </div>
        <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
    import Picker from './info-picker.vue'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import API from '../config/api'
    import sessionStorage from '@2dfire/utils/sessionStorage'

    export default {
        name: 'info-select',
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
            parentId: {
                type: String,
                required: false,
                default: ''
            },
            editSubStatus: {
                required: false,
            },
            explain: {
                type: String,
                required: false,
                default: ''
            },
            canEdit: {
                type: Boolean,
                required: false,
                default: true
            },
            isSelect: { // false为只跳转，不弹底部选择矿
                type: Boolean,
                required: false,
                default: true
            },
        },
        data() {
            return {
                isCloseShow: false
            }
        },
        computed: {
        },
        methods: {
            ...mapActions([
                'pickerChange',
            ]),
            pickerChoose() {
                let self = this;
                if(!self.isSelect) {  // 跳转
                    self.$emit('gotoOtherPage')
                } else {  // 弹选择框
                    switch (self.selectName) {
                        // 职级
                        case 'staffInfo.roleName':
                            self.getRankList();
                            break;
                        case 'extraActionInfo.allowDiscountValue':
                        case 'extraActionInfo.noAllowDiscountValue':
                            self.getMinDiscount();
                            break;
                    }
                }
            },
            //职级选择
            getRankList() {
                API.listShopRoles({
                    opEntityId: sessionStorage.getItem('entityId'),
                }).then(data => {
                    this.initPicker(data.map((val) => val.name), data, true)
                })
            },
            // 最低打折额度选择
            getMinDiscount() {
                let data = new Array(101);
                for(var i=0;i<data.length;i++){
                    let obj = {name: '100', id: '100'}
                    obj.name = i.toString();
                    obj.id = i.toString();
                    data[i] = obj
                }
                this.initPicker(data.map((val) => val.name), data, false)
            },
            /**
             * 选择数据初始化
             * data: [] 用于picker选择的数组
             * oldData 原来数组
             * */
            initPicker(data, oldData, showBottom) {
                let self = this;
                let defaultIndex = data.indexOf(this.value)
                const picker = {
                    showPicker: true,
                    pickerName: self.selectName,
                    pickerSlots: [
                        {
                            flex: 1,
                            values: data,
                            className: 'slot1',
                            textAlign: 'center',
                            defaultIndex: defaultIndex,
                        }],
                    data: oldData || null,
                    // pickerTitle: data[0]
                    pickerToolbarTitle: this.title,
                    showBottom: showBottom,
                };
                self.pickerChange(picker);
            },
        
        }
    }
</script>

<style lang="less" scoped>
    .icon-next {
        color: #cccccc;
    }
</style>