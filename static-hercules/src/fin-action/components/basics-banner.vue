<template>
    <div class="banner-wrap border-bottom border-top">
        <div class="item" v-for="item in lists" :key="item.id" @click="jump(item.jumpUrl)">
            <div v-click="{name:'长期活动banner-'+item.actionName, info:item.pageName}" class="img" :style="{'backgroundImage':'url('+item.bannerUrl+')'}"></div>
            <span class="title">{{item.actionName}}</span>
        </div>
    </div>
</template>
<script>
export default {
  props: ['lists'],
  data() {
    return {}
  },
  methods: {
    jump(i) {
      window.location.href = i
    }
  },
  watch: {
    lists: function(newval) {
      if (newval.length > 2) {
        this.lists.length = 2
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .banner-wrap {
        width: 100%;
        height: 268px;
        padding: 40px;
        display: flex;
        position: relative;
        .item{
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .img{
                width: 128px;
                height: 128px;
                border-radius: 50%;
                margin-bottom: 20px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .title{
                font-weight: bold;
                font-size: 26px;
                color: #333333;
                line-height: 40px;
            }
        }
    }
</style>
