<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="[!canEdit?'no-edit':'',!childStatus?'':'child-input']">
            <span class="title">{{title}}</span>
            <span class="content" v-if="canEdit">
               
                    <input 
                        :class="optionalType?'change-if':''"
                        :placeholder="optionalTypeValue"
                        :type="inputType==='number'?'tel':inputType"
                        :maxLength="maxLength"
                        :value="value"
                        @input="changeInput($event)"
                        @focus="isCloseShow=true"
                        @blur="isCloseShow=false"
                    />
            
            </span>
            <span v-if="canEdit">
                <i class="closeicon" v-show="isCloseShow" @mousedown="clearInput($event)"></i>
            </span>
            <span class="content" v-if="!canEdit">{{value}}</span>
        </div>
        <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
    import { mapState,mapGetters,mapActions } from 'vuex'

    export default {
        name: 'info-input',
        props: {
            inputName: {
                type: String,
                required: true,
                default: false
            },
            title: {
                type: String,
                required: true,
                default: false
            },
            explain: {
                type: String,
                required: false,
                default: ''
            },
            value: {
                type: String,
                required: false,
                default: ''
            },
            inputType: {
                type: String,
                required: false,
                default: 'text'
            },
            maxLength: {
                type: String,
                required: false,
                default: ''
            },
            editSubStatus: {
                type: Boolean,
                required: false,
                default: true
            },
            optionalType: {  // 必填/非必填
                type: Boolean,
                required: false,
                default: false // 必填
            },
            canEdit: {
                type: Boolean,
                required: false,
                default: true
            },
            childStatus: { // 是否是子input item
                type: Boolean,
                required: false,
                default: false
            },
        },
        data() {
            return {
                isCloseShow: false,//是否显示close
                optionalTypeValue: '必填'
            }
        },
        created() {
            this.getOptionalType();
        },
        computed: {
           
        },
        methods: {
             ...mapActions([
                'changeInfo',
                'changeRankInfo',
                'changeStaffInfo',
                'changeExtraAction',
            ]),
            changeInput($event) {
                const self = this;
                if(self.inputName.indexOf('staffInfo.') === 0) {  // 如果是员工信息相关的
                    self.changeStaffInfo({type: self.inputName.replace('staffInfo.',''), value: $event.target.value})
                } else if (self.inputName.indexOf('rank') === 0) {//对职级的修改做特殊处理
                    let type = self.inputName.substr(self.inputName.indexOf('.')+1)
                    self.changeRankInfo({type: type, value: $event.target.value}) 
                } else if (self.inputName.indexOf('extraActionInfo.') === 0) {//对职级的修改做特殊处理
                    self.changeExtraAction({type: self.inputName.replace('extraActionInfo.',''), value: $event.target.value})
                } else {
                    self.changeInfo({type: self.inputName, value: $event.target.value})
                }
            },
            clearInput($event) {
                const self = this;
                if(self.inputName.indexOf('staffInfo.') === 0) {  // 如果是员工信息相关的
                    self.changeStaffInfo({type: self.inputName.replace('staffInfo.',''), value: ''})
                } else if (self.inputName.indexOf('extraActionInfo.') === 0) {//对职级的修改做特殊处理
                    self.changeExtraAction({type: self.inputName.replace('extraActionInfo.',''), value: ''})
                } else {
                    self.changeInfo({type: self.inputName, value: ''})
                }
                $event.target.parentNode.parentNode.querySelector('input').focus();
            },
            getOptionalType() {  // 获取必填/非必填
            
                if(this.optionalType) {
                    this.optionalTypeValue = '选填'
                } else {
                    this.optionalTypeeValue = '必填'
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>


</style>
