<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="!canEdit?'no-edit':''">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers'

export default {
  name: 'XiaoWeiBaseInfo',
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
      //  备注 由于前开发人员使用是type 类型出现非String  导致页面报错 故先注释
      //   type: String,
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
    optionalType: {
      // 必填/非必填
      type: Boolean,
      required: false,
      default: false // 必填
    }
  },
  data() {
    return {
      isCloseShow: false, //是否显示close
      optionalTypeValue: '必填'
    }
  },
  created() {
    this.getOptionalType()
  },
  computed: {
    ...mapState(['viewState']),
    canEdit() {
      if (this.viewState === 'detail') {
        return false
      } else if (this.viewState === 'edit') {
        return this.editSubStatus
      }
    }
  },
  methods: {
    ...mapActions(['modifyInputInfo']),
    changeInput($event) {
      const self = this
      if (self.inputName === 'accountNumberNew') {
        // 银行卡号--修改银行卡页面
        self.modifyInputInfo({
          type: 'accountNumber',
          value: $event.target.value
        })
      } else if (self.inputName === 'businessAccountNumberNew') {
        // 银行卡号--修改银行卡页面--企业商户
        self.modifyInputInfo({
          type: 'businessAccountNumber',
          value: $event.target.value
        })
      } else {
        self.modifyInputInfo({
          type: self.inputName,
          value: $event.target.value
        })
      }
    },
    clearInput($event) {
      console.log('clearInput')
      const self = this
      if (self.inputName === 'accountNumberNew') {
        // 银行卡号--修改银行卡页面
        self.modifyInputInfo({ type: 'accountNumber', value: '' })
      } else if (self.inputName === 'businessAccountNumberNew') {
        // 银行卡号--修改银行卡页面--企业商户
        self.modifyInputInfo({ type: 'businessAccountNumber', value: '' })
      } else {
        self.modifyInputInfo({ type: self.inputName, value: '' })
      }
      $event.target.parentNode.parentNode.querySelector('input').focus()
    },
    getOptionalType() {
      // 获取必填/非必填

      if (this.optionalType) {
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
