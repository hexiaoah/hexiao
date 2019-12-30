<template>
  <div class="modal" v-show="visible" :class="visible?'modal-show':'modal-hidden'">
    <div class="mask" @click="maskClick"></div>
    <div class="content">
      <div class="title" v-show="title">
        <slot name="title">
          <p>{{title}}</p>
        </slot>
      </div>
      <div class="info">
        <slot/>
      </div>
      <div class="footer" @click="ok" v-show="footer">
        <slot name="footer">
          {{footer}}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    footer: String,
    title: String,
    //点击蒙层是否可关闭
    maskClosable: Boolean
  },
  methods: {
    ok(e) {
      this.$emit('ok', e)
    },
    maskClick() {
      this.maskClosable && this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: 0.6;
  }
  .content {
    position: fixed;
    min-width: 540px;
    border-radius: 26px;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    overflow: auto;
    .title {
      height: 80px;
      padding: 0 30px;
      font-size: 30px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .info {
      flex: 1;
      min-height: 100px;
    }
    .footer {
      height: 100px;
      border-top: 1px solid #e6e6e6;
      color: #0088ff;
      text-align: center;
      line-height: 100px;
      font-size: 30px;
    }
  }
}
.modal-show {
}
.modal-hidden {
}
</style>
