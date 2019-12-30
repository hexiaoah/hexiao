<template>
    <button :class="'btn btn-'+type" @click="handleClick" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'fire-btn',
  props: {
    type: {
      type: String,
      default() {
        return 'primary'
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.btn-primary {
  width: 100%;
  height: 88px;
  border-radius: 12px;
  background-color: #0088ff;
  color: #fff;
  font-size: 30px;
  line-height: 88px;
}
.btn[disabled] {
  background-color: #ccc;
}
.btn-nonebg {
  width: 100%;
  height: 88px;
  color: #0088ff;
}
.btn-apply {
  width: 190px;
  height: 80px;
  font-size: 32px;
  background-color: #0088ff;
  color: #fff;
  border-radius: 44px;
}
</style>
