<template>
<div class="main-wrap">
    <Banner :lists="list1"></Banner>
    <BasicsBanner :lists="list2"></BasicsBanner>
    <h3 class="title">为你推荐</h3>
    <RecommendBanner :lists="list3"></RecommendBanner>
    <h3 class="title">优秀商户案例</h3>
    <CaseList :lists="list4"></CaseList>
</div>
</template>
<script>
import Router from '@2dfire/utils/router'
import { getActivityList, getToken } from '../../config/api'
import Banner from '../../components/banner'
import BasicsBanner from '../../components/basics-banner'
import RecommendBanner from '../../components/recommend-banner'
import CaseList from '../../components/case-list'

export default {
  data() {
    return {
      s_tk: Router.route.query['s_tk'] || '',
      list1: [],
      list2: [],
      list3: [],
      list4: []
    }
  },
  methods: {
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.s_tk || !this.s_tk) && token) {
        // console.log("已经有token了");
        this.getActivityList()
      } else {
        // console.log("取下token");
        getToken({
          serviceTicket: this.s_tk,
          appKey: '200800'
        })
          .then(d => {
            let dtoken = d.dfireToken
            sessionStorage.setItem('s_tk', this.s_tk)
            sessionStorage.setItem('token', dtoken)
            this.getActivityList()
          })
          .catch(d => {
            console.log('token', d)
          })
      }
    },
    getActivityList() {
      const params = {
        pageType: 'JRZFHD01',
        bannerType: ''
      }
      getActivityList(params).then(data => {
        const { JRZF0001, JRZF0002, JRZF0003, JRZF0004 } = data
        this.list1 = JRZF0001
        this.list2 = JRZF0002
        this.list3 = JRZF0003
        this.list4 = JRZF0004
      })
    }
  },
  components: {
    Banner,
    BasicsBanner,
    RecommendBanner,
    CaseList
  },
  created() {
    document.title = '金融支付活动'
    this.getToken()
  }
}
</script>
<style lang="scss" scoped>
.main-wrap{
    .title{
        height: 120px;
        padding: 60px 30px 0;
        background: #F7F8FA;
        font-weight: bold;
        font-size: 30px;
        color: #000000;
        line-height: 40px;
    }
}
</style>

