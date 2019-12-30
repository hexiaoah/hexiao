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
import { getRegion } from '../config/api'
import { mapState, mapActions } from 'vuex'

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
      required: false
    }
  },
  data() {
    return {
      isCloseShow: false
    }
  },
  computed: {
    ...mapState(['viewState', 'subStatus']),
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
    ...mapActions(['pickerChange']),
    pickerChoose() {
      let self = this
      if (this.viewState === 'detail') {
        return false
      }
      switch (self.selectName) {
        case 'provinceName':
          self.getRegionName('province', self.parentId)
          break
        case 'cityName':
          if (!self.parentId) {
            self.$toast('请先选择省份')
            return false
          }
          self.getRegionName('city', self.parentId)
          break
        case 'townName':
          if (!self.parentId) {
            self.$toast('请先选择城市')
            return false
          }
          self.getRegionName('town', self.parentId)
          break
      }
    },
    //店铺地址省份选择
    getRegionName(type, parentId) {
      let self = this
      getRegion(type, parentId)
        .then(data => {
          console.log(data)
          let value = data.subAreaList.map(val => val.name)
          self.initPicker(value, data.subAreaList)
        })
        .catch(e => {
          console.log(e)
        })
    },
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
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped></style>
