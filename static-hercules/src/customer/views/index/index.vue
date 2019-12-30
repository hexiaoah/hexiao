<template>
  <div>
    <div v-if="isdingding()">
      <div v-if="isStaff">
        <div class="dingding" v-if="todayTime!=''">
          <div class="dd_box">
            <div class="card_time">上次打卡时间: {{timestampToTime(todayTime)}}分</div>
            <div class="dd_bg" @click="punchClock(2)">离店打卡</div>
          </div>
        </div>
        <div class="dingding" v-else>
          <div class="dd_box">
            <div class="dd_bg" @click="punchClock(1)">到店打卡</div>
          </div>
        </div>
      </div>
      <tip @close="close" :tipContent="tipContent" v-show="tipFalg"></tip>
    </div>
    <div v-else ref="customer">
      <div class="tip" v-if="nologin">
        请先登录二维火掌柜，才可选择报修（上门维护）服务。
      </div>
      <customer title="在线客服" :customerList="customerData" :customerParams="customerParams" :nologin="nologin"></customer>
      <customer title="报修（上门维护）" :customerList="guarantee" @buycard="buycard" :disabled="disabled" v-if="guarantee.length>0"></customer>
      <div class="success-msg" v-if="guarantee.length>0">
        <div class="look-detail" @click="lookBuyDetail" v-if="buyDetail">查看购买详情</div>
      </div>
    </div>
  </div>
</template>

<script>
import customer from '../../components/customer';
import API from '../../config/api';
const {APP_ID} = require('apiConfig');
import tip from '../../components/tip'
const DFRouter = require("@2dfire/utils/router");
export default {
  name: 'index',
  data() {
    return{
      customerData:[{
        moduleType:3,
        groupId:'50574c297ce14a7d8a4b823df4edca79',
        img:"https://assets.2dfire.com/frontend/c8f219c2c1416b521feeb225bcc719a6.png",
        text:{
          first:'售后服务'
        }
      },{
        moduleType:2,
        groupId:'8a956a2f8d4d440d8e7bc6c38d6fd9e6',
        img:"https://assets.2dfire.com/frontend/6b2fb8b6f2fef8cb942a65807c692173.png",
        text:{
          first:'微信直联'
        }
      },{
        moduleType:2,
        groupId:'545ee0b7877d4719b4c172917234579a',
        img:"https://assets.2dfire.com/frontend/1b733ab05a450d03f5dd424668367a21.png",
        text:{
          first:'外卖对接',
        }
      },{
        moduleType:2,
        groupId:'b80eb88df4a247928d978282d2dd24bf',
        img:"https://assets.2dfire.com/frontend/b8d290978f75c8acbba731d37237ef49.png",
        text:{
          first:'口碑直联'
        }
      }],
      guarantee:[],
      nologin:false,
      disabled:true,
      buyDetail:true,
      customerParams:{},
      tipFalg:false,
      tipContent:'',
      // today:null,
      todayTime:'',
      id:'',
      isStaff:true

    }
  },
  methods: {
    close(){
      this.tipFalg=false;
    },
    buycard(clickUrl){
      if(this.buyDetail){
        window.location.href=clickUrl;
      }
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var h = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
        var m = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
        return h+':'+m;
    },
    getData(){
      var that=this;
      const params = {
        token:encodeURIComponent(DFRouter.route.query["st"]) || '',
        app_key:encodeURIComponent(DFRouter.route.query["appType"]) || '',
        s_os:encodeURIComponent(DFRouter.route.query["s_os"]) || '',
        s_osv:encodeURIComponent(DFRouter.route.query["s_osv"]) || '',
        s_apv:encodeURIComponent(DFRouter.route.query["s_apv"]) || '',
        account:encodeURIComponent(DFRouter.route.query["account"]) || '',
        eid:encodeURIComponent(DFRouter.route.query["eid"]) || '',
      };
      API.queryRepairItems(params).then((res)=>{
        var data=res.data;
        this.guarantee=data.moduleFunctionVOs;
        if(data.isLogin==0){
          this.buyDetail=false;
          this.nologin=true;
          this.disabled=false;
        }else{
          this.buyDetail=true;
          this.nologin=false;
          this.disabled=true;
          this.customerParams=data.userUserVO;
        }
      })
    },
    lookBuyDetail(){
      window.location.href='tdf-manager://2dfire.com/order/offlineService';
    },
    //    判断是否是钉钉扫码登入
    isdingding(){
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("dingtalk") >= 0;
    },
    punchClock(kind){
      var uuid=encodeURIComponent(DFRouter.route.query["uuid"]) || '';
      var entityId=encodeURIComponent(DFRouter.route.query["eid"]) || ''
      if(this.id){
        if(kind==1){
          const params={
            uuid:uuid,
            dingId:encodeURI(this.id),
            entityId:entityId,
            kind:kind,
          }
          API.staffAttendance(params).then((res)=>{
            this.$router.push({path:'/index/result/cardResult',query:{successFalg:res.success,msg:res.message}})
          })
        }else{
          this.$router.push({path:'/index/result',query:{uuid:uuid,dingId:encodeURI(this.id),eid:entityId}})
        }
      }
    }
  },
  components: {
    customer,
    tip
  },
  created(){
    var that=this;
    if(this.isdingding()){
      document.getElementsByTagName("title")[0].innerText = '工程巡店打卡';
      if(!DFRouter.route.query["code"]){
        let REDIRECT_URI=window.location.href;
        window.localStorage.setItem("appType", DFRouter.route.query["appType"]);
        window.localStorage.setItem("app_key", DFRouter.route.query["app_key"]);
        window.localStorage.setItem("tts", DFRouter.route.query["tts"]);
        window.localStorage.setItem("eid", DFRouter.route.query["eid"]);
        window.localStorage.setItem("s_os", DFRouter.route.query["s_os"]);
        window.localStorage.setItem("s_osv", DFRouter.route.query["s_osv"]);
        window.localStorage.setItem("s_apv", DFRouter.route.query["s_apv"]);
        window.localStorage.setItem("account", DFRouter.route.query["account"]);
        window.localStorage.setItem("uuid", DFRouter.route.query["uuid"]);
        window.location.href=`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${APP_ID}&response_type=code&scope=snsapi_auth&state=STATE&redirect_uri=${REDIRECT_URI}`
      }
    }else{
      document.getElementsByTagName("title")[0].innerText = '客服';
      this.getData();
    }

  },
  mounted() {
    var that=this;
    var code=DFRouter.route.query["code"]
    if(code){
      var appType=window.localStorage.getItem('appType');
      var app_key=window.localStorage.getItem('app_key');
      var tts=window.localStorage.getItem('tts');
      var eid=window.localStorage.getItem('eid');
      var s_os=window.localStorage.getItem('s_os');
      var s_osv=window.localStorage.getItem('s_osv');
      var s_apv=window.localStorage.getItem('s_apv');
      var account=window.localStorage.getItem('account');
      var uuid=window.localStorage.getItem('uuid');
      this.$router.push({path: '/index', query: {appType:appType,app_key:app_key,tts:tts,eid:eid,s_os:s_os,s_osv:s_osv,s_apv:s_apv,account:account,uuid:uuid,code:code}})
      if(DFRouter.route.query["eid"]){
        API.getId({code:encodeURIComponent(code)}).then((res)=>{
          if(res.success){
            if(res.model){
              that.isStaff=true;
              that.id=res.model;
              var params={
                dingId:encodeURI(that.id),
                entityId:encodeURIComponent(DFRouter.route.query["eid"]) || ''
              }
              API.getQueryTodayRecord(params).then((res)=>{
                if(res.success){
                  that.todayTime=res.model.createTime
                }
              })
            }else{
              that.isStaff=false;
              that.tipFalg=true;
              that.tipContent=res.message
            }
          }else {
            that.isStaff=false;
            that.tipFalg=true;
            that.tipContent=res.message
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .success-msg{
    width: 100%;
    margin-top: 16px;
  }
  .look-detail{
    float: right;
    font-size: 26px;
    color: #0088FF;
    margin-right: 30px;
  }
  .tip{
    background: rgba(255,0,51,0.10);
    font-size: 30px;
    padding:15px 30px 15px 30px;
    box-shadow: 0 0 0 0 #CCCCCC;
  }

  .dingding{
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 1;
  }

  .dd_box{
    position: absolute;
    height: 704px;
    width: 410px;
    left: 50%;
    top:50%;
    margin-top: -352px;
    margin-left: -205px;
    text-align: center;
  }
  .dd_bg{
    background: url("https://assets.2dfire.com/frontend/9e62c1c7579ccf33b687979d6b92a0cd.png")no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    width: 312px;
    height: 312px;
    text-align: center;
    line-height: 312px;
    margin-top: 20px;
    margin-bottom: 20px;
    display:inline-block;
    margin:0 auto;
    font-size: 18PX;
  }
  .card_time{
    height: 312px;
    font-size: 18PX;
  }

</style>

