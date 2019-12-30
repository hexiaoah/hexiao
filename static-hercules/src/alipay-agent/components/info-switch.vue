<template>
    <li class="input-wrapper border-b">
        <div class="input-list">
            <span class="title">{{title}}</span>
            <span class="content"></span>
            <base-switch class="value" :select="canEdit">{{getValue}}</base-switch>
        </div>
        <div :class="['explain',{'none':!explain}]">{{explain}}</div>
    </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'XiaoWeiBaseInfo',
  props: {
    switchName: {
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
      type: Boolean,
      default: false
    },
    explain: {
      type: String,
      required: false,
      default: ''
    },
    select: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
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
    getValue() {
      this.initSwitch()
      return this.value
    }
  },
  methods: {
    ...mapActions(['changeSwitchControl']),
    initSwitch() {
      let self = this
      const switchControl = {
        switchName: self.switchName,
        switchValue: self.value
      }
      self.changeSwitchControl(switchControl)
    }
  },
  created() {
    this.initSwitch()
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped></style>
