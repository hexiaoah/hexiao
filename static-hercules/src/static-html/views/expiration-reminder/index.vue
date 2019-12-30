<template>
<div class="main-wrap">
    <div class="center">
        <h3 class="title">{{currentLanguage.title}}</h3>
        <p class="server-name">{{serverName}}</p>
        <div class="days">{{days}}<span class="time">{{currentLanguage.day}}</span></div>
        <p class="days-left">{{currentLanguage.daysLeft}}{{days}}{{currentLanguage.daysRight}}</p>
        <div class="description">
            <p>{{currentLanguage.text1}}</p>
            <p>{{currentLanguage.text2}}</p>
        </div>
    </div>
     <div class="bottom">
         <p>{{currentLanguage.title}}<span class="fb">{{serverName}}</span></p>
         <p>{{currentLanguage.text1}}</p>
         <p>{{currentLanguage.text2}}</p>
    </div>
    
</div>
</template>
<script>
import Router from '@2dfire/utils/router'

export default {
  data() {
    return {
      isSelect: false,
      serverName: '',
      days: 0,
      lang: 'en_US',
      pageData: {
        zh_CN: {
          pageTitle: '付费服务到期提醒',
          title: '您当前的付费服务：',
          daysLeft: '还有',
          daysRight: '天到期',
          day: '天',
          text1: '为了不影响您的正常使用请及时联系代理商续费！',
          text2: '感谢您对我们的支持！'
        },
        zh_TW: {
          pageTitle: '付費服務到期提醒',
          title: '您當前的付費服務：',
          daysLeft: '還有',
          daysRight: '天到期',
          day: '天',
          text1: '為了不影響您的正常使用請及時聯系代理商續費！',
          text2: '感謝您對我們的支持！'
        },
        en_US: {
          pageTitle: 'Attention',
          title: 'Your current paid service: ',
          daysLeft: 'Only ',
          daysRight: ' days left',
          day: 'days',
          text1: 'In order not to affect your daily operation,',
          text2: 'please contact the agent for renewal!'
        },
        'ko-KR': {},
        'th-TH': {}
      },
      currentLanguage: {}
    }
  },
  methods: {},
  created() {
    this.serverName = Router.route.query['name'] || ''
    this.days = Router.route.query['day'] || 0
    this.lang = Router.route.query['lang'] || 'en_US'
    this.currentLanguage = this.pageData[this.lang]
    document.title = this.currentLanguage.pageTitle
  }
}
</script>
<style lang="scss" scoped>
.main-wrap{
    background:rgba(242,242,242,1);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .center{
        position: absolute;
        left: 50%;
        top:120px;
        width: 600px;
        height: 800px;
        margin-left: -300px;
        // margin-top: -400px;
        background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(248,248,248,1) 100%);
        border-radius:10px;
        padding-top: 80px;
        text-align: center;
        box-shadow: 0px 10px 30px rgba(0,0,0, 0.1);
    }
    .bottom{
         position: absolute;
         top: 980px;
         width:600px;
         left: 50%;
         color: #999999;
         margin-left: -300px;
         text-align: center;
    }
    .title{
        font-size:32px;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:32px;
        letter-spacing:0px;

    }
    .server-name{
        font-size:32px;
        font-weight:500;
        font-weight: bold;
        color:rgba(0,0,0,1);
        line-height:58px;
        padding-bottom: 80px;
    }
    .days{
        font-size:200px;
        font-weight:normal;
        color:rgba(245,94,94,1);
        line-height:180px;
        font-weight: bold;
        letter-spacing:0px;
    }
    .time{
        font-size:36px;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:22px;
        margin-left: 10px;

    }
    .days-left{
        font-size:60px;
        font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:80px;
        font-weight: bold;
        padding-top: 5px;
        padding-bottom: 130px;
    }
    .description{
        font-size:24px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:36px;
        letter-spacing:0px;
    }
    .fb{
       font-weight: bold;
   }
    
}
</style>

