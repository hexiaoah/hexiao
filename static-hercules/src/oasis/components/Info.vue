<template>
  <div class="info-wrapper">
    <div class="mask"></div>
    <div class="float">
      <div class="text">
        <p class="title">提示</p>
        <p class="content">您没有收款账户的操作权限，请联系店铺管理者(老板或主管)开通权限。</p>
      </div>
      <a href="javascript:void(0)" class="btn" @click="close">我知道了</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close(){
        this.$emit('close')
      }
    },
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

  .info-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .float{
      border-radius: 13px;
      width: 270px;
      height: 144px;
      margin: 230px auto 0;
      background: white;

      .text{
        border-bottom: 1PX solid #C8C7CC;
        padding: 20px 10px 10px;

        .title{
          font-size: 15PX;
          line-height: 20px;
          text-align: center;
          margin-bottom : 10px;
        }

        .content{
          font-size: 13PX;
          line-height: 18px;
          text-align: center;
          letter-spacing: 0;
        }
      }

      .btn{
        font-size: 15PX;
        color: #0088FF;
        line-height: 50px;
        text-align: center;
        text-decoration: none;
        display: block;
      }
    }

    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }
  }
</style>

