<template>
    <div class="index">
        <div class="fixed-header">
            <Headers :style="headerBackground"></Headers>
        </div>
        <OpenModal :show="baseData.state.showModal" :data="baseData.modalData" @close="hideModal"></OpenModal>
        <section class="main-wrap">
            <div class="banner">
                <Carousel
                    v-model="baseData.swiper.active"
                    :loop="baseData.swiper.setting.loop"
                    :autoplay="baseData.swiper.setting.autoplay"
                    :autoplay-speed="baseData.swiper.setting.autoplaySpeed"
                    :dots="baseData.swiper.setting.dots"
                    :radius-dot="baseData.swiper.setting.radiusDot"
                    :trigger="baseData.swiper.setting.trigger"
                    :arrow="baseData.swiper.setting.arrow">
                    <CarouselItem>
                        <div class="demo-carousel"
                             :style="'background-image: url(' + Globalization.BANNER_ONE_URL +'); \
                             background-repeat: no-repeat;background-position:center center;background-size: cover;'">
                             <!--<h3 class="theme">{{Globalization.PLATFORMTITLE}}</h3>-->
                            <p class="describe">{{Globalization.PLATFORMGOAL}}</p>
                            <button @click="JoinNow('DLlogin')" v-if="!baseData.state.token">{{Globalization.JOINUS}}</button>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="demo-carousel banner2">
                             <!--<h3 class="theme">{{Globalization.PLATFORMSLOGAN}}</h3>-->
                            <p class="describe">{{Globalization.PLATFORMPOEM}}</p>
                            <button @click="JoinNow('DLlogin')" v-if="!baseData.state.token">{{Globalization.JOINUS}}</button>
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <section class="part1 center">
                <index-title type="0" :name="Globalization.RESOURCE"></index-title>
                <div class="second-level">{{Globalization.INSECOND}}</div>
                <div class='industry-box clearfix'>
                    <a class="industry industry1" href="file.html#/docs_scheme_data">
                        <!--<div class="img" @click="wait"><img src="https://assets.2dfire.com/frontend/62a3d308061c20a2823f19ab222dad48.png" alt=""></div>-->
                        <div class="title">{{Globalization.DATASAMPLE}}</div>
                        <div class="second-title">{{Globalization.INDATA}}</div>
                    </a>
                    <a class="industry industry2" href="file.html#/docs_scheme_leaguer">
                        <!--<div class="img" @click="wait"><img src="https://assets.2dfire.com/frontend/ceb038f15ec3dc8fa771e93dc568b3c1.png" alt=""></div>-->
                        <div class="title">{{Globalization.MEMBERSHIP}}</div>
                        <div class="second-title">{{Globalization.INHY}}</div>
                    </a>
                    <a class="industry industry3" href="file.html#/docs_scheme_coupon">
                        <!--<div class="img" @click="goStart"><img src="https://assets.2dfire.com/frontend/8413b08b4b27fc713bc1b1504a51cf02.png" alt=""></div>-->
                        <div class="title">{{Globalization.COUPON}}</div>
                        <div class="second-title">{{Globalization.INYHJ}}</div>
                    </a>
                    <a class="industry industry4" href="file.html#/docs_scheme_dispatching">
                        <!--<div class="img" @click="wait"><img src="https://assets.2dfire.com/frontend/0aef109bc0114dc34d6411f77cab1d37.png" alt=""></div>-->
                        <div class="title">{{Globalization.DELIVERY}}</div>
                        <div class="second-title">{{Globalization.INPS}}</div>
                    </a>
                    <a class="industry industry5" href="file.html#/docs_scheme_parcel">
                        <!--<div class="img" @click="wait"><img src="https://assets.2dfire.com/frontend/68812ff9145edbb0ac83e7a64b172a15.png" alt=""></div>-->
                        <div class="title">{{Globalization.TAKEAWAY}}</div>
                        <div class="second-title">{{Globalization.INWM}}</div>
                    </a>
                </div>
            </section>

            <!--<section class="part2">-->
                <!--<index-title type="1" :name="Globalization.TRADE"></index-title>-->
                <!--<div class='layout'>-->
                    <!--<div class="item">-->
                        <!--<div class="img"><img src="../../images/data_analy.png" alt=""></div>-->
                        <!--<p>{{Globalization.HADOOP}}</p>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<div class="img"><img src="../../images/apply_for.png" alt=""></div>-->
                        <!--<p>{{Globalization.CORPORATE}}</p>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<div class="img"><img src="../../images/fin_service.png" alt=""></div>-->
                        <!--<p>{{Globalization.FS}}</p>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<div class="img"><img src="../../images/take_out.png" alt=""></div>-->
                        <!--<p>{{Globalization.TS}}</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</section>-->
            <section class="part3">
                <index-title type="2" :name="Globalization.FLOW"></index-title>
                <div class='layout'>
                    <div class="item">
                        <img src="https://assets.2dfire.com/frontend/0695d2efe588cb78af58095c0757be07.png" class='arrows' alt="">
                        <div class="img">
                            <img src="https://assets.2dfire.com/frontend/d3a9f0fd2402cdbfbaaa987d46fa5c7b.png" alt="">
                        </div>
                        <p>{{Globalization.AA}}</p>
                    </div>
                    <div class="item">
                        <img src="https://assets.2dfire.com/frontend/0695d2efe588cb78af58095c0757be07.png" class='arrows' alt="">
                        <div class="img">
                            <img src="https://assets.2dfire.com/frontend/4694d2c8975c26c4a0992c58cfcfb14a.png" alt="">
                        </div>
                        <p>{{Globalization.QC}}</p>
                    </div>
                    <div class="item">
                        <img src="https://assets.2dfire.com/frontend/0695d2efe588cb78af58095c0757be07.png" class='arrows' alt="">
                        <div class="img">
                            <img src="https://assets.2dfire.com/frontend/c6ed5814ccfae72eaf2616cb890d0b5c.png" alt="">
                        </div>
                        <p>{{Globalization.CA}}</p>
                    </div>
                    <div class="item">
                        <img src="https://assets.2dfire.com/frontend/0695d2efe588cb78af58095c0757be07.png" class='arrows' alt="">
                        <div class="img">
                            <img src="https://assets.2dfire.com/frontend/4a582be6cec859dde8f60f9258ae48eb.png" alt="">
                        </div>
                        <p>{{Globalization.SA}}</p>
                    </div>
                    <div class="item">
                        <div class="img"><img src="https://assets.2dfire.com/frontend/913c32e80b4cf14e3cfeb3cb30254ea0.png" alt=""></div>
                        <p>{{Globalization.DATA}}</p>
                    </div>
                </div>
            </section>
            <section class="part4">
                <index-title type="0" :name="Globalization.PARTNER"></index-title>
                <div class='layout'>
                    <div class="item">
                        <img src="https://assets.2dfire.com/frontend/b7c8228bbd26f7ff79c7a57921898914.png" alt=""> <!-- 平安银行 -->
                        <img src="https://assets.2dfire.com/frontend/a7ab6356ad3d223dee207669abf19944.png" alt=""> <!-- 可口可乐 -->
                        <img src="https://assets.2dfire.com/frontend/c57f4ca51c42f5f39fc6bbde3533fb56.png" alt=""> <!-- 银泰城 -->
                        <img src="https://assets.2dfire.com/frontend/caceae55efe499681531e4710131314d.png" alt=""> <!-- 阿里巴巴 -->
                        <img src="https://assets.2dfire.com/frontend/a1e7bd432091b9a54023b9a88263615b.png" alt=""> <!-- 交通银行 -->
                        <img src="https://assets.2dfire.com/frontend/007ddb7930bfee77759e93d7345532c0.png" alt=""> <!-- 工商银行 -->
                        <img src="https://assets.2dfire.com/frontend/773ebaf18aa19e701e19f3b656999ceb.png" alt=""> <!-- 微信支付 -->
                        <img src="https://assets.2dfire.com/frontend/b8946f0368abdd6d9b4880ad09309a2f.png" alt=""> <!-- 曹操专车 -->
                        <img src="https://assets.2dfire.com/frontend/e1c9f2932ab87d2de4b20a0594115f0c.png" alt=""> <!-- 达达APP -->
                        <img src="https://assets.2dfire.com/frontend/1b5403dbb6a7f3a6f8b6f43a730e2f48.png" alt=""> <!-- 支付宝 -->
                    </div>
                    <div class="item" style="margin-left: 15%">
                        <img src="https://assets.2dfire.com/frontend/84ccdecfc60a00c4f5094d0cd727862d.png" alt=""> <!-- 滴滴专车 -->
                        <img src="https://assets.2dfire.com/frontend/30abc78416306f948b92d0541ae43367.png" alt=""> <!-- 网商银行 -->
                        <img src="https://assets.2dfire.com/frontend/3fad65ad3e14b7391c02bf7d66746a3b.png" alt=""> <!-- 饿了么 -->
                        <img src="https://assets.2dfire.com/frontend/14b4e41256944fa1180447248d92ac3b.png" alt=""> <!-- 百威啤酒 -->
                        <img src="https://assets.2dfire.com/frontend/337a1eb61a9e744698a6156a4b3b9643.png" alt=""> <!-- 用友 -->
                        <img src="https://assets.2dfire.com/frontend/06efbcd4818699844ff3d68b4f4883cd.png" alt=""> <!-- 华为 -->
                        <img src="https://assets.2dfire.com/frontend/967a7c5a07e7d9aba125794fe500cdd0.png" alt=""> <!-- 宜信 -->
                    </div>
                </div>
            </section>
            <div class="contact">
                <div class="contact-contain clearfix">
                    <dl>
                        <dt>{{Globalization.HELP}}</dt>
                        <dd><a href="workercenter.html">{{Globalization.ANSWER}}</a></dd>
                        <dd>{{Globalization.QQ}}</dd>
                    </dl>
                    <dl>
                        <dt>{{Globalization.SERVER}}</dt>
                        <dd><a href="file.html#/docs_scheme_data">{{Globalization.INDUSTRY}}</a></dd>
                        <dd><a href="file.html#/docs_dev_ent">{{Globalization.DEVELOP}}</a></dd>
                    </dl>
                    <dl>
                        <dt>{{Globalization.WORK}}</dt>
                        <dd>{{Globalization.ISV}}</dd>
                    </dl>
                </div>
            </div>
        </section>
        <Footers></Footers>
        <Modal></Modal>
    </div>
</template>

<script>
import Cookie from "@2dfire/utils/cookie";
import _i from "@/i18n/index";

let baseData = {
  // 首页轮播图config
  swiper: {
    active: 0,
    setting: {
      loop: true,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: "inside",
      radiusDot: true,
      trigger: "click",
      arrow: "never"
    }
  },
  scroll: 0,
  state: {
    token: "",
    showModal: false,
    showName: true
  },
  modalData: {
    type: "",
    footer: false
  }
};
// Globalization 国际化

let Globalization = {
  RESOURCE: _i("INDEX.PRIMARY.TITLE.RESOURCE"),
  TRADE: _i("INDEX.PRIMARY.TITLE.TRADE"),
  FLOW: _i("INDEX.PRIMARY.TITLE.FLOW"),
  PARTNER: _i("INDEX.PRIMARY.TITLE.PARTNER"),
  CONTACT: _i("INDEX.PRIMARY.TITLE.CONTACT"),
  STORE: _i("INDEX.SECOND.TITLE.STORE"),
  TEST: _i("INDEX.SECOND.TITLE.TEST"),
  GUIDE: _i("INDEX.SECOND.TITLE.GUIDE"),
  FAQ: _i("INDEX.SECOND.TITLE.FAQ"),
  HADOOP: _i("INDEX.SECOND.TITLE.HADOOP"),
  CORPORATE: _i("INDEX.SECOND.TITLE.CORPORATE"),
  TS: _i("INDEX.SECOND.TITLE.TS"),
  FS: _i("INDEX.SECOND.TITLE.FS"),
  QC: _i("INDEX.SECOND.TITLE.QC"),
  CA: _i("INDEX.SECOND.TITLE.CA"),
  SA: _i("INDEX.SECOND.TITLE.SA"),
  AA: _i("INDEX.SECOND.TITLE.AA"),
  DATA: _i("INDEX.SECOND.TITLE.DATA"),
  CONGTOU: _i("INDEX.SECOND.TITLE.CONGTOU"),
  MINITITLE: _i("INDEX.SECOND.TITLE.MINITITLE"),

  HELP:_i("INDEX.CONTACT.HELP"),
  ANSWER:_i("INDEX.CONTACT.ANSWER"),
  QQ:_i("INDEX.CONTACT.QQ"),
  SERVER:_i("INDEX.CONTACT.SERVER"),
  INDUSTRY:_i('INDEX.CONTACT.INDUSTRY'),
  DEVELOP:_i('INDEX.CONTACT.DEVELOP'),
  WORK:_i('INDEX.CONTACT.WORK'),
  ISV:_i('INDEX.CONTACT.ISV'),
  INSECOND:_i('INDEX.IN.INSECOND'),
  INDATA:_i('INDEX.IN.INDATA'),
  INHY:_i('INDEX.IN.INHY'),
  INYHJ:_i('INDEX.IN.INYHJ'),
  INPS:_i('INDEX.IN.INPS'),
  INWM:_i('INDEX.IN.INWM'),
  DATASAMPLE:_i('SIDEBAR.DOCS.DATA'),
  MEMBERSHIP:_i('SIDEBAR.DOCS.LEAGUER'),
  COUPON:_i('SIDEBAR.DOCS.COUPON'),
  TAKEAWAY:_i('SIDEBAR.DOCS.PARCEL'),
  DELIVERY:_i('SIDEBAR.DOCS.DISPATCHING'),
  JOINUS:_i('INDEX.JOINUS'),
  PLATFORMTITLE:_i('INDEX.PLATFORM.TITLE'),
  PLATFORMGOAL:_i('INDEX.PLATFORM.GOAL'),
  PLATFORMSLOGAN:_i('INDEX.PLATFORM.SLOGAN'),
  PLATFORMPOEM:_i('INDEX.PLATFORM.POEM'),
    BANNER_ONE_URL: "https://assets.2dfire.com/frontend/5f44219456890e97914fb5a0b472b5c7.png"
};

export default {
  name: "app",
  data() {
    return {
      baseData,
      Globalization,
      scroll: ""
    };
  },
  components: {
    Headers: require("@/components/header.vue"),
    Footers: require("@/components/footer.vue"),
    indexTitle: require("@/components/index-title.vue"),
    OpenModal: require("@/components/open-modal.vue")
  },
  computed: {
    //    顶部导航栏颜色
    headerBackground() {
      let styleHeader = {
        background: ""
      };

      if (this.scroll < 100) {
        let colorOpacity = this.scroll / 100;
        let color = "rgba(47,47,47," + colorOpacity + ")";
        styleHeader.background = color;
        return styleHeader;
      } else {
        styleHeader.background = "#2f2f2f";
        return styleHeader;
      }
    }
  },
  methods: {
    // 显示登录/注册弹窗    // 立即加入功能按钮
    JoinNow(type) {
      this.baseData.state.showModal = true;
      this.baseData.modalData.type = type;
    },
    hideModal(data) {
      this.baseData.state.showModal = false;
    },
    switcher() {
      const token = Cookie.getItem("token");
      if (token) {
        this.baseData.state.token = token;
      }
    },
    //            敬请期待
    wait() {
      this.$Message.info(_i("INDEX.MESSAGE.WAIT"));
    },
    goStart() {
      location.href = "../page/file.html#/docs_guide_start";
    },
    menu() {
      this.scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    }
  },
  created() {
    this.switcher();
    this.$Message.config({
      top: 80,
      duration: 1
    });
    //            增加页面滚动监听
    window.addEventListener("scroll", this.menu);
  },
  destroyed() {
    //            移除页面滚动监听

    window.removeEventListener("scroll", this.menu);
  }
};
</script>
<style lang="less" src="../../theme/default.less"></style>
<style lang="scss" src="../../style/common.scss"></style>
<style lang="scss" scoped>
 .contact{
     height: 216px;
     background-color: #fafafa;
     width: 100%;
     .contact-contain{
         padding-top: 60px;
         max-width: 1449px;
         margin: 0 auto;
         dl{
             width: 21.3%;
             margin-left:12%;
             float: left;
             dt{
                 font-size: 18px;
                 color: #333333;
                 margin-bottom: 25px;
                 font-weight: bold;
             }
             dd{
                 font-size: 14px;
                 color: #333333;
                 margin-bottom: 15px;
                 a{
                     color: #333333;
                 }
             }
         }
     }
 }
.main-wrap {
  .demo-carousel {
    width: 100%;
    height: 494px;
    color: #ffffff;
    text-align: center;
    background: #cccccc;
    .theme {
      padding-top: 140px;
      font-weight: bold;
      font-size: 52px;
    }
    .describe {
      font-size: 24px;
      padding-top: 247px;
    }
    button {
      border: 0;
      outline: none;
      font-size: 18px;
      color: #573925;
      background: #ffffff;
      border-radius: 100px;
      width: 185px;
      height: 45px;
      margin-top: 83px;
    }
  }
  .banner1 {
    background: url("https://assets.2dfire.com/frontend/5f44219456890e97914fb5a0b472b5c7.png") no-repeat center center;
    background-size: cover;
  }
  .banner2 {
    background: url("https://assets.2dfire.com/frontend/f95363af0cc15944d38f9ebac7c8b2c8.png") no-repeat center center;
    background-size: cover;
  }
  & section:nth-of-type(2n + 1) {
    background: #ffffff;
  }
  & section:nth-of-type(2n) {
    background: #fafafa;
  }
  .second-level{
     text-align: center;
     width: 100%;
     margin-top: 15px;
     font-size: 16px;
     color: #666666;
  }
  .part3 {
      padding-bottom: 60px;
    .layout {
      /*width: 64%;*/
      max-width: 1390px;

      .item {
        width: 20%;
        position: relative;
        .img {
          width: 75px;
          height: 75px;
          margin: 0 auto;
          img {
            width: 100%;
          }
        }
        .arrows {
          position: absolute;
          width: 16px;
          height: 27px;
          left: 100%;
          top:26px;
        }
      }
    }
  }

  .part4 {
    .layout {
        max-width: 1650px;
        width: 98%;
        margin: 0 auto;
        /*height: 210px;*/
        padding-top: 30px;
        padding-bottom: 60px;
      .item {
        /*width: 28%;*/
        /*height: 200px;*/
        /*margin-right: 9.3%;*/
        margin-left: 1%;
        margin-right: 1%;
        width: 98%;
        /*&:last-child {*/
          /*margin-right: 0;*/
        /*}*/
        img {
          display: block;
          width: 10%;
          float: left;
          padding: 1.5%;
            opacity:0.5;
            -webkit-filter: grayscale(80%);filter: grayscale(80%);
            margin: 0 auto;
            /*-webkit-clip-path:polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%);*/
        }
          img:hover {
              display: block;
              width: 10%;
              float: left;
              padding: 1.5%;
              opacity:1.0;
              -webkit-filter: grayscale(0%);filter: grayscale(0%);
          }
      }
    }
  }
  .part5 {
    height: 227px;
    .layout {
      height: 107px;
      text-align: center;
      margin-top: 30px;
      color: #333333;
    }
    .congtou {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .mimititle {
      font-size: 12px;
    }
  }
  .industry-box{
      width: 98%;
      max-width: 1650px;
      margin:0 auto;
      margin-top: 40px;
      margin-bottom: 60px;
      .industry{
          width: 18.4%;
          max-width: 300px;
          max-height: 318px;
          float: left;
          margin-left: 0.8%;
          margin-right: 0.8%;
          text-align: center;
          cursor: pointer;
          position: relative;
          .title{
              position: absolute;
              color: #333333;
              font-weight: bold;
              width: 100%;
              text-align: center;
          }
          .second-title{
              position: absolute;
              color: #666;
              width: 100%;
              text-align: center;
          }
      }
      .industry1{
          /*background: url("https://assets.2dfire.com/frontend/e2eb4f4e7450a1f4bec6e9cb8b941379.png") no-repeat center center;*/
          background: url("https://assets.2dfire.com/frontend/e2eb4f4e7423a1f4bec6e9cb8b941379.png") no-repeat center center;
          background-size: 100%;
      }
      .industry2{
          background: url("https://assets.2dfire.com/frontend/79e6e6c11d7c77f59b77f1536f415634.png") no-repeat center center;
          background-size: 100%;
      }
      .industry3{
          background: url("https://assets.2dfire.com/frontend/92a43fbef297317dd40478775c66e7df.png") no-repeat center center;
          background-size: 100%;
      }
      .industry4{
          background: url("https://assets.2dfire.com/frontend/533979283977921189846663d25bb1f0.png") no-repeat center center;
          background-size: 100%;
      }
      .industry5{
          background: url("https://assets.2dfire.com/frontend/fba8b5f2ffb111fb2b3cf01222e2d59f.png") no-repeat center center;
          background-size: 100%;
      }
  }
  .layout {
    /*width: 51.25%;*/
    /*max-width: 1230px;*/
    /*height: 187px;*/
    overflow: hidden;
    margin: 77px auto 0;
    .item {
      float: left;
      width: 25%;
      text-align: center;
      p {
        font-size: 16px;
        color: #333333;
        margin-top: 45px;
      }
    }
  }
}

.part1 {
  .img {
    img {
      width: 62px;
      cursor: pointer;
    }
  }
}
.part2 {
  .img {
    img {
      width: 62px;
    }
  }
}
.fixed-header {
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 19;
  }
}
.index{
  .footer{
    position: static;
  }
}
 @media screen and (max-width: 2000px) {
     .industry-box{
         .industry{
             height: 318px;
             .title{
                 top:70%;
                 font-size: 18px;
             }
             .second-title{
                 top:82%;
                 font-size: 14px;
             }
         }
     }
 }
 @media screen and (max-width: 1400px) {
     .industry-box{
         .industry{
             height: 255px;
             .title{
                 top:70%;
                 font-size: 16px;
             }
             .second-title{
                 top:82%;
                 font-size: 12px;
             }
         }
     }
 }
 @media screen and (max-width: 1024px) {
     .industry-box{
         .industry{
             height: 200px;
             .title{
                 top:70%;
                 font-size: 14px;
             }
             .second-title{
                 top:80%;
                 font-size: 10px;
             }
         }
     }
 }
</style>







