<template>
  <div :class="cls">
        <span class="back" @click="goBack">
        </span>
        <p class="title"><slot></slot></p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    divider: {
      type: Boolean,
      default: false
    },
    back: Function
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      if (this.$props.back) {
        this.$props.back()
      } else if (window.tdfire) {
        window.tdfire.shop(
          JSON.stringify({
            type: 'back'
          })
        )
      }
    }
  },
  computed: {
    cls() {
      return {
        divider: this.divider,
        header: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  .back {
    position: absolute;
    left: 29px;
    top: 50%;
    width: 17px;
    height: 26px;
    background: url('../../images/back.png');
    background-size: cover;
    transform: translateY(-50%);
  }
  .title {
    color: #333;
  }
}
.divider {
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 20px;
    background: #f7f7f7;
  }
}
</style>
