<template>
    <div class="mask-layer" ref="mask" v-show="visible" @click.self="hide">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'mask-layer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide() {
      this.$emit('update:visible', false)
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
      this.$refs.mask.addEventListener('touchmove', this.touchMove)
    },
    removeListener() {
      document
        .getElementsByClassName('router-view')[0]
        .setAttribute('style', 'overflow:auto')
      this.$refs.mask.removeEventListener('touchmove', this.touchMove)
    }
  },
  watch: {
    show(val) {
      val ? this.addListener() : this.removeListener()
    }
  }
}
</script>

<style scoped>
.mask-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>
