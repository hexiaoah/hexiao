<template>
    <div class="picker-wrapper">
        <div class="mask" v-show="picker.showPicker" @click="closePicker"></div>
        <mt-picker :slots="picker.pickerSlots"
                   showToolbar
                   :class="['border-f', {active: picker.showPicker}]"
                   @change="onValuesChange"
                   rotate-effect
                   :visible-item-count="3">
            <span class='cancel' @click="closePicker">取消</span>
            <span class="title">{{picker.pickerTitle}}</span>
            <span class="choosed" @click="choosed">完成</span>
        </mt-picker>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { fixedBody, looseBody } from 'base/utils/unit.js'
export default {
  name: 'ShopAddress',
  props: {
    formId: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['picker'])
  },
  created() {
    this.pickerTitle = this.picker.pickerName[0]
  },
  watch: {
    //禁止页面滚动
    picker(newPicker, oldPicker) {
      if (newPicker.showPicker === oldPicker.showPicker) {
        return
      }
      if (newPicker.showPicker) {
        fixedBody()
      } else {
        looseBody()
      }
    }
  },
  methods: {
    ...mapActions(['pickerChange', 'modifyShopInfo']),
    // 取消
    closePicker() {
      this.pickerChange({
        showPicker: false,
        pickerName: '', //当前选择的字段
        pickerSlots: [{ defaultIndex: 0 }],
        pickerTitle: '',
        data: null
      })
    },
    // 完成
    choosed() {
      let self = this
      this.modifyShopInfo({
        type: self.picker.pickerName,
        value: self.picker.pickerTitle,
        formId: self.formId
      })
      if (self.picker.pickerName === 'provinceName') {
        this.modifyShopInfo({
          type: 'provinceId',
          value: self.getId('name', 'id'),
          formId: self.formId
        })
        this.modifyShopInfo({
          type: 'cityName',
          value: '',
          formId: self.formId
        })
        this.modifyShopInfo({ type: 'cityId', value: '', formId: self.formId })
        this.modifyShopInfo({
          type: 'townName',
          value: '',
          formId: self.formId
        })
        this.modifyShopInfo({ type: 'townId', value: '', formId: self.formId })
      } else if (self.picker.pickerName === 'cityName') {
        this.modifyShopInfo({
          type: 'cityId',
          value: self.getId('name', 'id'),
          formId: self.formId
        })
        this.modifyShopInfo({
          type: 'townName',
          value: '',
          formId: self.formId
        })
        this.modifyShopInfo({ type: 'townId', value: '', formId: self.formId })
      } else if (self.picker.pickerName === 'townName') {
        this.modifyShopInfo({
          type: 'townId',
          value: self.getId('name', 'id'),
          formId: self.formId
        })
      }
      self.closePicker()
    },
    // 选择
    onValuesChange(picker, values) {
      this.pickerChange({
        pickerTitle: values[0]
      })
    },
    /**
     * 获取id
     * @param name 显示内容的字段名
     * @param id 需要返回的字段名
     * @return value id值
     */
    getId(name, id) {
      let self = this
      if (!self.picker.data) {
        return ''
      }
      for (
        let data = self.picker.data, leg = data.length, i = 0;
        i < leg;
        i++
      ) {
        if (data[i][name] === self.picker.pickerTitle) {
          return data[i][id]
        }
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .picker {
        height: 260px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: white;
        z-index: 2;
        opacity: 0;
        transform: translateY(260px);
        transition: all 0.4s ease-in-out;

        &.active {
            opacity: 1;
            transform: translateY(0);
        }

        /deep/ .picker-toolbar {
            height: 44px;
            line-height: 44px;
            background: #E1E0E0;
            display: flex;
            justify-content: space-between;
            flex-flow: nowrap row;

            span {
                font-size: 15PX;
                color: #0088FF;
                display: inline-block;
                padding: 0;
            }

            .cancel {
                margin-left: 15px;
                position: relative;
                z-index: 2;
            }

            .title {
                font-size: 15PX;
                color: #333;
            }

            .choosed {
                font-size: 15PX;
                color: #0088FF;
                margin-right: 15px;
                position: relative;
                z-index: 2;
            }
        }

        /deep/ .picker-items {
            height: 216px;

            .picker-slot-wrapper {
                margin-top: 54px;
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
