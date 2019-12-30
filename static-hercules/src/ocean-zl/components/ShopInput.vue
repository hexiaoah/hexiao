<template>
    <li >
        <div :class="['input-list', {'border-b':!explain},{'no-edit':!canEdit}]">
            <span class="title">{{title}}</span>
            <span class="content" v-if="canEdit">
                <input placeholder="必填"
                    :type="inputType==='number'?'tel':inputType"
                    :maxLength="maxLength"
                    :value="value"
                    @input="changeInput($event)"
                    @focus="isCloseShow=true"
                    @blur="isCloseShow=false"
                />
            </span>
            <span v-if="canEdit">
                <i class="closeicon" v-show="isCloseShow" @click="clearInput($event)"></i>
            </span>
            <span class="content" v-if="!canEdit">{{value}}</span>
        </div>
         <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShopBaseInfo',
  props: {
    formId: {
      type: String,
      required: false,
      default: ''
    },
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
      required: false
    }
  },
  data() {
    return {
      isCloseShow: false //是否显示close
    }
  },
  computed: {
    ...mapState(['viewState', 'subStatus']),
    canEdit() {
      console.log(this.viewState, 'viewState')
      if (this.viewState === 'detail') {
        return false
      } else if (this.viewState === 'edit' && !this.editSubStatus) {
        return true
      } else {
        if (this.editSubStatus) {
          return false
        } else {
          return true
        }
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['modifyShopInfo']),
    changeInput($event) {
      const self = this
      // 去除前后空格
      let val = $event.target.value.replace(/(^\s*)|(\s*$)/g, '')
      self.modifyShopInfo({
        type: self.inputName,
        value: val,
        formId: self.formId
      })
    },
    clearInput($event) {
      const self = this
      self.modifyShopInfo({
        type: self.inputName,
        value: '',
        formId: self.formId
      })
      $event.target.parentNode.parentNode.querySelector('input').focus()
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>


</style>
