<template>
<div class="container">
    <Header>试用升级</Header>
    <div class="bg-img">
        <img src="../../images/update-bg1.jpg" alt="">
    </div>
    <span class="update action" @click="fireApp('update')"></span>
    <span class="share action" @click="share"></span>
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
  /*background: #fe4d3a url('../../images/update-bg1.jpg') no-repeat 0 -110px;*/
  /*background-size: cover;*/
  /*position: relative;*/
  background-color: #fe4d3a;
  .action {
    position: absolute;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
  .bg-img {
    background: #fe4d3a;
    min-height: 100%;
    img {
      width: 100%;
    }
  }
  .update {
    top: 812px;
    width: 650px;
    height: 120px;
    background: url('../../images/update.png') no-repeat center;
    background-size: cover;
  }
  .share {
    top: 1153px;
    width: 335px;
    height: 100px;
    background: url('../../images/share-but.png') no-repeat center;
    background-size: cover;
  }
}
</style>
