<template>
<div>
<div class="phone" v-if="isErr">
  <div class="input">
      <div class="number">
          <span>{{pageData.areaCode}}</span>
          <img src="../images/pull.png" alt="" @click="getArea">
          <input  v-model.trim="pageData.num" type="number" placeholder="请输入您的手机号码"> 
      </div>
      <div class="code">
          <input type="number" placeholder="手机验证码" v-model.trim="pageData.code">
          <a class="btn-code" v-if='pageData.isShow' @click='btnCode'>获取验证码</a>
          <a class="time" v-else>{{pageData.seconds}}s后重新获取</a>
      </div>
  </div>
  <p>{{pageData.text}}</p>
      <div class="btn">
          <button @click="bind">
              绑定
          </button>
      </div>
      <confirm
          @ok="handleDialogEvent(pageData.confirm, 'ok')"
          @cancle="handleDialogEvent(pageData.confirm, 'cancle')"
          v-show="pageData.confirm.show"
          :ok-btn-text="pageData.confirm.okBtnText"
          :cancle-btn-text="pageData.confirm.cancleBtnText"
          :title="pageData.confirm.title"
      >
      <ul>
          <li>
              用户在同意本协议后，方可进行二维火账户资产信息和支付宝账户的绑定。涉及到个人资产和个人信息如下：
          </li>
          <li>
              1.二维火会员卡储值金额、点赞道具等个人资产。
          </li>
          <li>
              2.二维火会员信息，优惠券、订单、积分等。
          </li>
      </ul>
      </confirm>
      <chose-area 
      v-show="pageData.area.show"
      :title="pageData.area.title"
      @ok="handleAreaEvent"
      @cancle="handleDialogEvent(pageData.area, 'cancle')"
      :list='pageData.list'
      >
      </chose-area>
</div>
<errcode :info='err_info' v-else></errcode>
</div>
</template>
<script>
let pageData = {
  text: "二维火帐户可用来登录所有二维火出品的应用。",
  num: "",
  code: "",
  isShow: true,
  isBind:false,
  seconds: 60,
  areaCode: "+86", // 区号
  confirm: {
    show: false,
    okBtnText: "同意绑定",
    cancleBtnText: "",
    okCallBack: 1,
    cancleCallBack: null,
    title:'手机绑定协议'
  },
  area:{
    title:'选择国家/地区',
    show: false,
    okCallBack: 1,
    cancleCallBack: null,
  },
  list:[
  {
    area:'中国',
    code:'+86',
  }
]
};
const dialogEvents = require("base/components/dialogs/events.js");
const router = require("@2dfire/utils/router");
const API = require('../config/api');
const Requester = require("base/requester");
const {
	hideAll,
	alert,
	tip,
	warning: { showNetworkError, showFail, showError },
	confirm: confirmDialog
} = require("base/components/dialogs/events.js");
var  going;
export default {
  data() {
    return {
      pageData,
      l: '',
      cash_login_type:'',
      cash_uuid:'', 
      isErr:true,
      err_info:'',
    };
  },
  methods: {
    btnCode() {
      let self = this.pageData;
      if(self.num==''){
        tip.show('手机号码不能为空')
        return
      }
      // 发送验证码
     let url=API.GET_PHONE_CODE
     let param={
       area_code:self.areaCode,
       mobile:self.num
     }
     Requester.post(url,param,{ emulateJSON: true }).then(data => {
       tip.show("发送成功");
        self.isShow = false;
        // 倒计时
        going = setInterval(function() {
        self.seconds--;
        if (self.seconds < 1) {
          clearInterval(going);
          self.isShow = true;
          self.seconds=60
        }
      }, 1000);
      }).catch(e=>{
         		if (e.errorType == Requester.ERROR_TYPES.RESULT_FAIL) {
								if (e.result.errorCode == "ERR_102932") {
									tip.show("手机号格式错误");
								} else {
									showError("服务器抖了一下", { canClose: true });
								}
							} else if (e.errorType == Requester.ERROR_TYPES.NETWORK_FAIL) {
								showNetworkError();
							}
      });

    },
    		// 单纯校验验证码 1
		verifyCode() {
      let self = this.pageData;
      let url=API.VERIFY_CODE
      let param={
        area_code:self.areaCode,
        mobile:self.num,
        code:self.code
      }
			Requester.post(url,param,{ emulateJSON: true }).then(data => {
        this.verfyBind()
				})
				.catch(e => {
					if (e.errorType == Requester.ERROR_TYPES.RESULT_FAIL) {
						if (e.result.errorCode == "ERR_WMI074") {
							showError("验证码错误", { canClose: true });
						} else if (e.result.errorCode == "ERR_102932") {
							showError("手机号格式错误", { canClose: true });
						} else {
							showError("服务器抖了一下", { canClose: true });
						}
					} else if (e.errorType == Requester.ERROR_TYPES.NETWORK_FAIL) {
						showNetworkError();
					}
				});
    },
    verfyBind(){
      let self=this.pageData
      let url=API.GET_BIND_PHONE
      let param={
        area_code:self.areaCode,
        mobile:self.num,
        code:self.code,
        force_bind:false,
      }
      // 手机号是否绑定
      Requester.post(url,param,{emulateJSON:true}).then(data => {
        // 登录接口
        this.login()
      }).catch(e=>{
          if (e.errorType == Requester.ERROR_TYPES.RESULT_FAIL) {
						if (e.result.errorCode == "ERR_WMI077") {
               this.login()
							//  showError("同样的手机号码", { canClose: true });
						} else if (e.result.errorCode == "ERR_WMI078") {
							showError("过于频繁的修改手机号", { canClose: true });
						} else if (e.result.errorCode == "ERR_WMI224") {
              // 手机号换绑
					   self.confirm.show = true;
						} else {
							showError("服务器抖了一下", { canClose: true });
						}
					} else if (e.errorType == Requester.ERROR_TYPES.NETWORK_FAIL) {
						showNetworkError();
					}
      });
    },
    login(){
      // 登录接口
      if(this.l==0){
        this.$router.push({ path: 'code', });
        }
      else{  
        let url=API.GET_LOGIN
        Requester.get(url, {params: { cash_uuid: this.cash_uuid ,cash_login_type:this.cash_login_type}}).then(data => {
          document.title='授权登录成功'
        this.$router.push({path: 'success', });
      }).catch(e=>{
        document.title='授权登录失败'
        this.isErr=false
        this.err_info=e.result.message
      });
      }
    },
    bind() {
      let self=this.pageData
      this.verifyCode()
    },
    getArea() {
      this.pageData.area.show=true;
    },
    handleDialogEvent(dialog, eventName) {
      const cb = dialog[eventName + "CallBack"];
      if (cb) {
      let self=this.pageData
      let url=API.GET_BIND_PHONE
      let param={
        area_code:self.areaCode,
        mobile:self.num,
        code:self.code,
        force_bind:true,
      }
      // 手机号是否绑定
      Requester.post(url,param,{emulateJSON:true}).then(data => {
      // 登录接口
      this.login()
      }).catch(e=>{
          if (e.errorType == Requester.ERROR_TYPES.RESULT_FAIL) {
						if (e.result.errorCode == "ERR_WMI077") {
              this.login()
							//  showError("同样的手机号码", { canClose: true });
						} else if (e.result.errorCode == "ERR_WMI078") {
							showError("过于频繁的修改手机号", { canClose: true });
            } 
            // else if (e.result.errorCode == "ERR_WMI224") {
					  //  self.confirm.show = true;
            // } 
            else {
							showError("服务器抖了一下", { canClose: true });
						}
					} else if (e.errorType == Requester.ERROR_TYPES.NETWORK_FAIL) {
						showNetworkError();
					}
      });
      } 
        dialog.show = false;
    },
     handleAreaEvent(code) {
       this.pageData.areaCode=code
       this.pageData.area.show = false;
    },
    // 区码
    getData(){
      let url=API.GET_AREA_CODE;
      let self=this.pageData
      Requester.get(url,false).then(data => {
        self.list=data
      }).catch(e=>{});

    },
    init(){
      let self=this
      self.l=router.route.query["cash_online"] || 0;//是否在线
      self.cash_login_type=router.route.query["cash_login_type"]||1;
      self.cash_uuid=router.route.query['cash_uuid']||1;
    }
  },
  components: {
    confirm: require("./confirm"),
    "chose-area":require('./choseArea'),
    errcode:require('../components/err'),
  },
  created() {
    document.title='绑定手机号码'
    this.init()
    this.getData()
  }
};
</script>
<style lang="scss" scoped>
.phone {
  height: 100%;
  background: #f6f5f9;
  padding-top: 72px;
  font-size: 32px;
  line-height: 88px;
  input,button{
    outline-color: #fff;
  }
}
.input {
  background: #ffffff;
  border-top: 1PX solid #cccccc;
  border-bottom: 1PX solid #cccccc;
  padding: 0 30px;
  font-size: 32px;
}
.input input {
  height: 80px;
  border: 0;
  font-size: 32px;
}
.code{
  position: relative;
}
.number {
  border-bottom: 1PX solid #ccc;
  img {
    margin: 0 20px;
    vertical-align: middle;
  }
}
.input button {
  color: #ffffff;
  line-height: 64px;
  opacity: 0.9;
  border-radius: 8px;
  border: 0;
  width: 192px;
  position: absolute;
  top:0;
  bottom: 0;
  height: 68px;
  margin: auto;
  right: 0;
}
.input a{
  color: #ffffff;
  line-height: 64px;
  opacity: 0.9;
  border-radius: 8px;
  border: 0;
  width: 192px;
  position: absolute;
  top:0;
  bottom: 0;
  height: 68px;
  margin: auto;
  right: 0;
  display: inline-block;
  text-align: center;
}
.input .btn-code {
  background: #108ee9;
  font-size: 32px;
}
.input .time {
  font-size: 24px;
  background: #999;
}
p {
  margin: 30px;
  font-size: 26px;
  color: #999999;
  line-height: 36px;
}
.btn {
  margin-top: 128px;
  padding: 0 30px;
}
.btn button {
  width: 100%;
  opacity: 0.9;
  background: #108ee9;
  border-radius: 8px;
  border: 0;
  font-size: 36px;
  color: #ffffff;
  line-height: 88px;
}
</style>

