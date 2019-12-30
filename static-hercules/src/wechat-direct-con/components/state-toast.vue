<template>
  <div :class="['toast-wrapper', {hidden: !isshow}]">
    <div :class="['prompt', {'active': isshow}]">
      <img class="icon" v-if="state" :src="(state === 'success')?'https://assets.2dfire.com/frontend/24e8c4ca56c9bda80161cd804dbf7db0.png' : 'https://assets.2dfire.com/frontend/0d3bb4caf2b823c8b8e31a9a3fe08e31.png'"/>
      <p class="title">{{title}}</p>
      <p class="content">{{content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateToast',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '提示'
    },
    isshow: {
      type: Boolean,
      default: false
    },
    state : {
      type: String,
      default: ''
    }
  },
  methods: {
    
  },
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .toast-wrapper{
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    width: 360px;
    line-height: 40px;
    padding: 44px;
    color: white;
    text-align: center;
    z-index: 120;
    border-radius: 26px;
    font-size: 30pX;

    &.hidden{
      height: 0;
      padding: 0;
    }

    .icon {
        height: 64px;
        width: 64px;
    }
    .title{
      color: #ffffff;
      font-size: 30px;
      line-height: 40px;
    }

    .content{
      color: #ffffff;
      font-size: 30px;
      line-height: 40px;
    }

  }
</style>

