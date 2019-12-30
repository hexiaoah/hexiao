<template>
  <div class="pb160">
    <div class="bg"></div>
    <Card>
      <Banner v-if="banner.length>0" :logger-info="loggerInfo" :lists="banner"></Banner>
      <p class="title">官方打包套餐 一键选购省心无忧</p>
      <div class="info">商家只需根据门店类型挑选对应套餐即可。开店所需硬件设备、相关收银物料、软件功能等……皆已打包入内。</div>
      <div class="set-list">
        <div v-for="item in productset" :key="item.id">
          <Set :logger-info="loggerInfo" :product="item"></Set>
        </div>
        <p v-show="shopInfo.trialShop" @click="jumpToNav" class="entrance">使用激活码升级入口</p>
      </div>
    </Card>
    <Card class="product-list" v-for="item in products" :key="item.id">
      <Product :logger-info="loggerInfo" :product="item"></Product>
    </Card>
  </div>
</template>
<script>
import Card from '../../components/card'
import Set from '../../components/set'
import Product from '../../components/product'
import Banner from '../../components/banner'
import API from '../../config/api'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'

export default {
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      source: Router.route.query['source'] || '',
      version: Router.route.query['app_ver'] || '',
      loggerInfo:{
        isTrial: true,
        source: Router.route.query['source'] || 1,
        version: Router.route.query['app_ver'] || '',
        entityId: '',
        industry: ''
      },
      shopInfo: {
        entityId: '',
        industry: '',
        shopType: '',
        url: '',
        channelId: '',
        positionId: ''
      },
      banner: [],
      productset: [],
      products: []
    }
  },
  methods: {
    init() {
      this.getInfo()
    },
    jumpToNav() {
      window.location.href = 'tdf-manager://2dfire.com/shop/upgrade'
    },
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.init()
      } else {
        API.getToken({
          serviceTicket: this.ticket
        }).then(data => {
          let token = data.dfireToken
          sessionStorage.setItem('s_tk', this.ticket)
          sessionStorage.setItem('token', token)
          this.token = token
          this.init()
        })
      }
    },
    getBanner() {
      let self = this
      API.getBanner({
        param: {
          channelId: self.shopInfo.channelId || '401022851454485111',
          positionId: self.shopInfo.positionId || '401058867557040111',
          appVersion: self.version
        }
      }).then(d => {
        let list = d.positionId
        if (list.length > 0)
          self.banner = list.map(v => {
            return {
              url: v.clickUrl,
              img: v.imgUrl,
              name: v.eventName
            }
          })
      })
    },
    getInfo() {
      let self = this
      API.getInfo({ source: self.source }).then(d => {
        self.shopInfo = d
        self.loggerInfo.isTrial = d.trialShop
        self.loggerInfo.entityId = d.entityId
        self.loggerInfo.industry = d.industry
        self.getProduct()
        self.getBanner()
      })
    },
    getProduct() {
      let self = this
      API.getProduct({
        source: self.source,
        industry: self.shopInfo.industry
      }).then(d => {
        self.productset = d.setGroupList
        self.products = d.productGroupList
      })
    }
  },
  components: {
    Card,
    Set,
    Product,
    Banner
  },
  created() {
    this.getToken()
    // this.init()
  }
}
</script>
<style lang="scss" scoped>
.pb160 {
  padding-bottom: 160px;
}
.banner {
  height: 240px;
}
.title {
  font-size: 36px;
  text-align: center;
  padding: 52px 0;
}
.info {
  width: 690px;
  border: 2px solid #eee;
  margin: 0 auto 52px;
  padding: 34px 50px;
  text-indent: 40px;
  line-height: 36px;
  text-align: justify;
  position: relative;
  &:before {
    display: block;
    width: 28px;
    height: 24px;
    background: url('https://assets.2dfire.com/frontend/3ba0cf88103a817c86a107068a90ca69.png')
      no-repeat center;
    background-size: cover;
    position: absolute;
    left: 8px;
    top: -12px;
    content: '';
  }
  &:after {
    display: block;
    width: 28px;
    height: 24px;
    background: url('https://assets.2dfire.com/frontend/5f44b4324ca014baff9d7b52c87a32ce.png')
      no-repeat center;
    background-size: cover;
    position: absolute;
    right: 8px;
    bottom: -12px;
    content: '';
  }
}
.set-list {
  padding-left: 30px;
  padding-bottom: 60px;
}
.entrance {
  font-size: 26px;
  text-align: center;
  text-decoration: underline;
  padding-top: 20px;
}
.product-list {
  padding: 30px 0 22px 30px;
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
<style lang="scss">
body {
  background: url('https://assets.2dfire.com/frontend/4a4ebdba3287a31d9d27b380c83f300c.png')
    no-repeat center;
  background-size: cover;
}
</style>


