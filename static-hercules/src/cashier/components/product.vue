<template>
  <div>
    <p class="title">{{product.title}}</p>
    <div v-click="{name:'单品-'+item.title,info:loggerInfo}" class="item" @click="jump(item.url)" v-for="item in product.productList">
      <img :src="item.img" />
      <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props:['product','logger-info'],
  methods:{
    jump(url) {
      window.location.href = url
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 34px;
  padding-bottom: 30px;
  font-weight: bold;
}
.item{
  width: 216px;
  height: 318px;
  margin: 0 22px 20px 0;
  display: inline-block;
  border-radius: 12px; 
  border: 1px solid #e6e6e6;
  overflow: hidden;
  img {
    width: 210px;
    height: 206px;
    font-size: 0;
    display: block;
    margin: 0 auto;
  }
  p{
    height: 106px;
    line-height: 106px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
  }
}
</style>

