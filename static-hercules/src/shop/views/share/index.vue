<template>
    <div class="container">
      <Header>试用分享</Header>
      <div class="bg-img">
        <img src="../../images/share-bg.jpg" alt="">
      </div>
      <span class="history" @click="gotoHistory"></span>
      <span class="share" @click="share"></span>
    </div>
</template>
<script>
import Header from '../../components/header'
export default {
  data() {
    return {}
  },
  methods: {
    fireApp(type, params) {
      if (window.tdfire) {
        window.tdfire.shop(
          JSON.stringify({
            type,
            ...params
          })
        )
      }
    },
    gotoHistory() {
      this.$router.push('/history')
    },
    share() {
      this.fireApp('share', {
        shareUrl: 'https://cashactivity.zm1717.com/hercules/page/shop.html#/help',
        title: '盆友，再帮我的店铺续35天仙气吧！',
        imgUrl:
          'https://img.2dfire.com/static_file/lALPBbCc1c9gK-DMyMzI_200_200.png',
        desc: '点立即助力我的店铺可增加5天试用时间，注册开店可再增加30天哦~'
      })
    }
  },
  components: { Header },
  created() {}
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  /*background: #fe4d3a url('../../images/share-bg1.jpg') no-repeat center -110px;*/
  /*background-size: cover;*/
  position: relative;
  .bg-img {
    background: #fe4d3a;
    min-height: 100%;
    img {
      width: 100%;
    }
  }
  .history {
    position: fixed;
    top: 170px;
    width: 136px;
    height: 50px;
    background: url('../../images/history-but.png') no-repeat center;
    background-size: cover;
    right: 0;
  }
  .share {
    position: absolute;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    top: 1121px;
    width: 335px;
    height: 100px;
    background: url('../../images/share-but.png') no-repeat center;
    background-size: cover;
  }
}
</style>
