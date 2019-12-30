<template>
    <div class="good">
        <div class="img" v-if="data.imgPath!=='no image'">
            <img :src="data.imgPath" alt="">
        </div>
        <div v-else class="no-img">
            <img src="https://assets.2dfire.com/frontend/074c32b6291a201eecaa5bd2c02f341a.png" alt="">
        </div>
        <div class="info">
            <p class="name">{{data.name}}</p>
            <p class="num" v-if="data.code!=='no code'">商品编码：{{data.code}}</p>
            <p class="price"><span>{{data.remarkDown}}</span><span> / {{data.account}}</span></p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
.good {
  padding: 10px 0;
  display: flex;
  align-items: center;
  .img {
    width: 80px;
    height: 80px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
    }
  }
  .no-img {
    width: 80px;
    height: 80px;
    display: flex;
    background: #f1f1f1;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    img {
      width: 48px;
      height: 36px;
    }
  }
  .info {
    p {
      margin-bottom: 2px;
    }
    .name {
      font-weight: 600;
      font-size: 14px;
    }
    .num {
      color: #888;
    }
    .price {
      span:first-child {
        color: #f00;
      }
    }
  }
}
</style>
