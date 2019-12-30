<template>
  <div class="f-select" ref="select">
    <select-tab defaultText="请选择店铺" :text="text" @click="toggleShow" :upward="show"></select-tab>
    <f-view class="select-list" v-show="show">
      <f-radio
        v-for="(item,index) in options"
        :label="item.code"
        :value="value"
        :key="index+'f'"
        @change="handleInput(item)"
      >{{item.name}}</f-radio>
    </f-view>
    <div class="shadows" ref="shadows" v-show="show" @click="toggleShow"></div>
  </div>
</template>

<script>
import SelectTab from './select-tab'

export default {
  name: 'FSelect',
  components: {
    SelectTab
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    defaultText: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    text() {
      let text = ''
      this.options.map(item => {
        if (item.code === this.value) {
          text = item.name
        }
      })
      return text
    }
  },
  data() {
    return {
      show: this.visible
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    handleInput(item) {
      this.$emit('input', item.code)
      this.toggleShow()
      this.$nextTick(() => {
        this.$emit('change', item.code, item)
      })
    },
    touchMove(e) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
      e.stopPropagation && e.stopPropagation()
      return false
    },
    getRootEl() {
      return document.getElementsByClassName('router-view')[0]
    },
    addListener() {
      const el = this.getRootEl()
      el && el.setAttribute('style', 'overflow:hidden')
      if (this.$refs.shadows) {
        console.log('addListener:'+this.show)
        this.$refs.shadows.addEventListener('touchmove', this.touchMove)
      }
    },
    removeListener() {
      const el = this.getRootEl()
      el && el.setAttribute('style', 'overflow:auto')
      if (this.$refs.shadows) {
        console.log('removeListener:'+this.show)
        this.$refs.shadows.removeEventListener('touchmove', this.touchMove)
      }
    },
    handleListener() {
      console.log(this.show)
      this.show ? this.addListener() : this.removeListener()
    }
  },
  mounted() {
     console.log('mounted:'+this.show)
    this.handleListener()
  },
  watch: {
    show() {
      console.log('watch:'+this.show)
      this.handleListener()
    }
  }
}
</script>

<style lang="scss" scoped>
.f-select {
  .shadows {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2000px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
  .select-list {
    position: absolute;
    left: 0;
    width: 100%;
    border: none;
    background: #fff;
    z-index: 101;
    max-height: 500px;
    overflow: auto;
  }
}
</style>