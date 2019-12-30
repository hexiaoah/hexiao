<template>
  <div class="shade">
    <div class="tips">
      <div class="title">提示</div>
      <div class="content">{{tipContent}}</div>
      <div class="foot" @click="close()">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tip',
  data(){
    return{
      // tipFalg:false,
      // tipContent:'请使用钉钉以外的扫码工具扫描'
    }
  },
  props:['tipContent'],
  methods:{
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .shade{
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,0.50);
  }
  .tips{
    width: 540px;
    height: 274px;
    position: absolute;
    left: 50%;
    top:50%;
    margin-left: -270px;
    margin-top: -137px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  .title{
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #333333;
    letter-spacing: 0;
    line-height: 30px;
    margin-top: 30px;
  }
  .content{
    font-size: 28px;
    color: #666666;
    height: 120px;
    line-height: 120px;
  }
  .foot{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #0088FF;
    font-size: 28px;
    border-top:1px solid #C8C7CC;
  }

</style>