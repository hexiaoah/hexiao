<template>
  <button :class="butCls" @click="click">
    <span v-if="icon" class="but-icon but-icon-afresh">
    </span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    icon: {
      // validator(value) {
      //   return ['afresh'].includes(value)
      // }
      type: Boolean,
      default: false
    }
  },
  methods: {
    click(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  },
  computed: {
    butCls() {
      return {
        but: true,
        disabled: this.disabled,
        [this.type]: !this.disabled
      }
    }
  }
}
</script>

<style scoped lang="scss">
.but {
  width: 100%;
  height: 88px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
  border-radius: 88px;
  border: none;
  outline: none;
  .but-icon {
    margin-right: 13px;
    width: 44px;
    height: 44px;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .but-icon-afresh {
    background-image: url('../../images/afresh.png');
  }
}
.primary {
  background: #0088ff;
  color: #fff;
}
.disabled {
  background: #f5f5f5;
  border: 1PX solid #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
}
.default {
  border: 1PX solid #e6e6e6;
  color: #333;
  background: #fff;
}
</style>
