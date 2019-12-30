<template>
    <div class="banner-wrap swiper-container swiper-container-horizontal">
        <swiper :options="option" ref="mySwiper">
            <swiper-slide v-for="(item,index) in lists" :key="index">
                <a v-click="{name:'顶部banner-'+item.actionName, info:item.pageName}" @click="jump(item.jumpUrl)" class="img" :style="{'backgroundImage':'url('+item.bannerUrl+')'}">
                    <!-- <img class="pic" :src="item.bannerUrl" alt=""> -->
                </a>
            </swiper-slide>
        </swiper>
        <div class="pages swiper-pagination"></div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: ['lists'],
  data() {
    return {
      option: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        notNextTick: true,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }
      }
    }
  },
  methods: {
    jump(i) {
      window.location.href = i
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  watch: {
    lists: function(newval) {
      if (newval.length > 4) {
        this.lists.length = 4
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="scss" scoped>
    .banner-wrap {
        width: 100%;
        height: 240px;
        position: relative;
    }
    .img{
        display: block;
        width: 100%;
        height: 240px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .pic {
        width: 100%;
        height: 240px;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets.pages {
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        .swiper-pagination-bullet{
            margin: 0 4px;
        }
    }
    .banner-wrap /deep/ .swiper-pagination-bullet{
         background: #D8D8D8;
    }
    .banner-wrap /deep/ .swiper-pagination-bullet-active{
         background: #4A4A4A;
    }
</style>
