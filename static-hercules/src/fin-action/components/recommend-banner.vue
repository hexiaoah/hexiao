<template>
    <div class="recommend-wrap border-bottom border-top">
        <div class="item" v-for="item in total" :key='item'>
            <div v-click="{name:'为你推荐banner-'+item.actionName, info:item.pageName}" v-if="lists[item]" class="img border-all" :style="{'backgroundImage':'url('+lists[item].bannerUrl+')'}" @click="jump(lists[item].jumpUrl)"></div>
            <div v-else class="default">更多精彩<br>即将上线</div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['lists'],
  data() {
    return {
      total: [0, 1, 2, 3]
    }
  },
  methods: {
    jump(i) {
      window.location.href = i
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
    .recommend-wrap {
        width: 100%;
        height: 402px;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
           width: 337px;
           height: 162px;
           margin-bottom: 20px;
           overflow: hidden;
           .img{
               width: 100%;
               height: 100%;
               border:1PX solid transparent;
               background-position: center;
               background-size: cover;
               background-repeat: no-repeat;
           }
        }
        .default{
            height: 100%;
            border:1PX dashed #E9E9E9;
            color: #cccccc;
            font-size: 26px;
            padding: 40px 0 0 140px;
            position: relative;
            &::before{
                position: absolute;
                left: 65px;
                top: 48px;
                content: '';
                width: 60px;
                height: 60px;
                background-image: url('../images/face.png');
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
    }
</style>
