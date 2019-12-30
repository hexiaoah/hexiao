<template>
  <div :class="['toast-wrapper', {hidden: !isshow}]">
    <div :class="['prompt', {'active': isshow}]">
      <p class="title">{{title}}</p>
      <p class="content">{{content}}</p>
      <p class="comfirmtext" @click="comfirm">{{comfirmText}}</p>
    </div>
    <div class="mask" v-show="isshow"></div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '出错原因'
    },
    isshow: {
      type: Boolean,
      default: false
    },
    comfirmText: {
      type: String,
      default: '我知道了'
    }
  },
  methods: {
    comfirm(){
      this.$emit('comfirm')
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .toast-wrapper{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1990;
    padding-top: 180px;
    height: auto;

    &.hidden{
      height: 0;
      padding-top: 0;
    }

    div.prompt{
      width: 270px;
      height: 144px;
      margin: auto;
      background: white;
      border-radius: 13px;
      z-index: 301;
      position: relative;
      padding-top: 20px;
      text-align: center;
      transform: translate3d(0, -500px, 0);
      transition: all 0.8s ease-in-out;
      opacity: 0;

      &.active{
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .title{
        color: #333333;
        font-size: 15PX;
        line-height: 20px;
        font-weight: bold;
      }

      .content{
        color: #666666;
        font-size: 13PX;
        margin-top: 15px;
        padding-bottom: 27px;
        border-bottom: 1px solid #C8C7CC;
        line-height: 18px;
      }

      .comfirmtext{
        color: #0088FF;
        font-size: 15PX;
        line-height: 44px;
      }
    }

    .mask{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 300;
      background: rgba(0, 0, 0, 0.5);
    }
  }
</style>

