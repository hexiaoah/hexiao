<template>
  <div>
    <div v-click="{name:'套餐-'+item.title,info:loggerInfo}" v-for="item in product.productList" :key="item.index" @click="jump(item.url)" :style="{'background-image':'url('+item.img+')'}" class="set-wrap">
      <p class="title">{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product','logger-info'],
  methods: {
    jump(url) {
      window.location.href = url
    }
  }
}
</script>
<style lang="scss" scoped>
.set-wrap {
  width: 330px;
  height: 250px;
  border-radius: 12px;
  margin: 0 30px 30px 0;
  background-size: cover;
  display: inline-block;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px; 
}
.title{
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  color: #fff;
  text-align: center;
  width: 100%;
  line-height: 52px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 52px;
  white-space: nowrap;
}
</style>

