<template>
    <fade-in>
        <div class="shadow" ref="shadow" v-show="show" @hide="hide"></div>
    </fade-in>
</template>

<script>
import FadeIn from './fade-in'

export default {
  name: 'shadows',
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    FadeIn
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    touchMove(e) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
      e.stopPropagation && e.stopPropagation()
      return false
    },
    addListener() {
      document
        .getElementsByClassName('router-view')[0]
        .setAttribute('style', 'overflow:hidden')
      this.$refs.shadow.addEventListener('touchmove', this.touchMove)
    },
    removeListener() {
      document
        .getElementsByClassName('router-view')[0]
        .setAttribute('style', 'overflow:auto')
      this.$refs.shadow.removeEventListener('touchmove', this.touchMove)
    }
  },
  watch: {
    show(val) {
      console.log(val, 77777)
      val ? this.addListener() : this.removeListener()
    }
  }
}
</script>

<style scoped>
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>
