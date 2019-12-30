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
import { mapState, mapGetters, mapActions } from 'vuex'
import { fixedBody, looseBody } from 'base/utils/unit.js'
export default {
  name: 'BasePicker',
  props: {},
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
    ...mapActions(['pickerChange', 'modifyInputInfo']),
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
      self.modifyInputInfo({
        type: self.picker.pickerName,
        value: self.picker.pickerTitle
      })
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
        height: 460px;
        position: fixed;
        left: 0;
        bottom: -460px;
        width: 100%;
        background: white;
        z-index: 2;
        opacity: 0;
        // transform: translateY(460px);
        // transform: translate3d(0,460px,0);

        transition: all 0.4s ease-in-out;

        &.active {
            opacity: 1;
             bottom: 0;
            // transform: translate3d(0,0,0);
            // transform: translateY(0);
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
