<template>
  <div class="dingding">
    <div class="success" v-show="successFalg">
      <img src="https://assets.2dfire.com/frontend/1f93549b3e857ad7a6923de6a1e7e63e.png" alt="">
      <div class="dd_text">打卡成功</div>
    </div>
    <div class="fail" v-show="!successFalg">
      <img src="https://assets.2dfire.com/frontend/1094b2b2850278946918e0807f3e6220.png" alt="">
      <div class="dd_text">打卡失败</div>
      <div class="dd_two_text">{{msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-result',
  data(){
    return{
      successFalg:this.$route.query.successFalg,
      msg:this.$route.query.msg
    }
  }
}
</script>

<style scoped>
  .dingding{
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .success{
    text-align: center;
    width: 100%;
    margin-top: 166px;
  }
  .fail{
    text-align: center;
    width: 100%;
    margin-top: 166px;
  }
  .success img{
    width: 240px;
    margin: 0 auto;
  }
  .fail img{
    width: 240px;
    margin: 0 auto;
  }
  .dd_text{
    margin-top: 30px;
    font-size: 36px;
    color: #333333;
  }
  .dd_two_text{
    font-size: 28px;
    color: #333333;
    margin-top: 16px;
  }
</style>