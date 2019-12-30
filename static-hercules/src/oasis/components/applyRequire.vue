<template>
    <div class="require-wrap">
       <img class="pic" src="https://assets.2dfire.com/frontend/9efcee536b5fd4d393976a7cd7484775.png" alt="">
       <div class="content">
           <p class="title">餐饮商户</p>
           <p class="text">{{text}}</p>
       </div>
    </div>
</template>

<script>
export default {
  name: 'apply-require',
  props: ['text'],
  data() {
    return {}
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
    .require-wrap{
        padding-left: 46px;
        padding-right: 15px;
        padding-bottom:36px; 
        display: flex;
        .pic{
            display: block;
            width: 44px;
            height: 44px;
           
        }
        .content{
             flex: 1;
             margin-left: 15px;
        }
        .title{
            font-size: 16px;
            color: #333333;
        }
        .text{
            font-size: 14px;
            color: #999999;
        }
    }
</style>

