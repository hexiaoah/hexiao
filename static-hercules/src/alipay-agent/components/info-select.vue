<template>
    <li class="input-wrapper border-b">
        <div class="input-list" :class="[!canEdit?'no-edit':' input-choose', !childStatus?'':'child-input']">
            <span class="select-title">{{title}}</span>
            <span class="content" @click="pickerChoose" v-if="canEdit">
                <input type="text" :class="optionalType?'change-if':''" :placeholder="optionalTypeValue" v-if="!isObjectValue" :value="value" disabled/>
                <input type="text" :class="optionalType?'change-if':''" :placeholder="optionalTypeValue" v-if="isObjectValue" :value="getObjectValue" disabled/>
            </span>
            <span class="content" v-if="!canEdit && !isObjectValue">{{value}}</span> 
            <span class="objectContent" v-if="!canEdit && isObjectValue">{{objectValue}}</span> 
            <!--objectValue与value不能同时使用-->
        </div>
        <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BaseInfo',
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
    childStatus: {
      // 是否是子select item
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
      required: false
    },
    isObjectValue: {
      // value值是对象
      type: Boolean,
      required: false,
      default: false
    },
    optionalType: {
      // 必填/非必填
      type: Boolean,
      required: false,
      default: false // 必填
    },
    explain: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      isCloseShow: false,
      optionalTypeValue: '必填'
    }
  },
  computed: {
    ...mapState(['viewState']),
    canEdit() {
      if (this.viewState === 'detail') {
        return false
      } else {
        return true
      }
    },
    getObjectValue() {
      if (
        Object.keys(this.objectValue).length === 0 ||
        Object.keys(this.objectValue.province).length === 0 ||
        Object.keys(this.objectValue.city).length === 0
      ) {
        return ''
      } else {
        return `${this.objectValue.province.name}${this.objectValue.city.name}`
      }
    }
  },
  created() {
    this.getOptionalType()
  },
  methods: {
    ...mapActions(['pickerChange', 'openDatePicker']),
    getOptionalType() {
      // 获取必填/非必填
      if (this.optionalType) {
        this.optionalTypeValue = '选填'
      } else {
        this.optionalTypeeValue = '必填'
      }
    },
    pickerChoose() {
      let self = this
      switch (self.selectName) {
        case 'startTime':
        case 'endTime':
          self.getBusinessTime() // 起始时间
          break
        case 'industryType':
          self.getManageCategory() // 经营类目
          break
      }
    },
    getBusinessTime() {
      this.initDatePicker()
    },
    //经营类目选择
    getManageCategory() {
      const data = [
        { name: '餐饮', id: 'FOOD' },
        { name: '零售', id: 'RETAIL' }
      ]
      this.initPicker(data.map(val => val.name), data)
    },
    /**
     * 选择数据初始化
     * data: [] 用于picker选择的数组
     * oldData 原来数组
     * */
    initPicker(data, oldData) {
      let self = this
      const picker = {
        showPicker: true,
        pickerName: self.selectName,
        pickerSlots: [
          {
            flex: 1,
            values: data,
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        data: oldData || null
        // pickerTitle: data[0]
      }
      self.pickerChange(picker)
    },
    /**
     * 日期选择
     * */
    initDatePicker() {
      let self = this
      const dateNewPicker = {
        showPicker: true,
        pickerName: self.selectName,
        pickerTitle: self.title,
        pickerValue: self.value
      }
      self.openDatePicker(dateNewPicker)
    }
  }
}
</script>