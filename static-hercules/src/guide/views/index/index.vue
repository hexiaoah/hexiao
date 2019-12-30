<template>
<div class="guide">
   <div class="head" v-if='isBtn'>
       <img src="../../images/return.png" alt="" v-if='isReturn' @click="pre">
       <span class="title">{{pageData.title}}({{pageData.pageIndex}}/{{pageData.totalNum}})</span>
       <span class="right" v-if="pageData.pageIndex<pageData.totalNum" @click='next'>下一步</span>
       <span class="right" v-else @click="link">完成</span>
   </div>
   <div class="content" v-html="pageData.content">
   </div>
   <div class="btn" v-if='isBtn'>
       <button @click='btnHandle'>
           {{pageData.btnContent}}
           <span class="btnInfo" v-if="pageData.btnInfo">({{pageData.btnInfo}})</span>
       </button>
   </div>
   <confirm
       @ok="handleDialogEvent(confirm, 'ok')"
       @cancle="handleDialogEvent(confirm, 'cancle')"
       v-show="confirm.show"
       :ok-btn-text="confirm.okBtnText"
       :title="confirm.title">
      <p style="text-align:center">{{confirm.content}}</p>
      </confirm>
</div>
</template>
<script>
const router = require("@2dfire/utils/router");
const API = require("../../config/api");
const Requester = require("base/requester");
const dialogEvents = require("base/components/dialogs/events.js");
let list = [];
let pageData = {
  title: "使用火掌柜管理店铺",
  totalNum: 6,
  pageIndex: 1,
  btnContent: "下载二维火掌柜",
  type: 1,
  content: "",
  btnInfo: ""
};
let params = {
  openShopKeeper: 0, //打开掌柜
  downLoadShopKeeper: 0, //下载掌柜
  finish: 0, //完成
  pageIndex: 0, //当前页数
  gotoOtherPage: 0, //换页
  gotoPrintSetting: 0 //打印
};
let confirm = {
  show: false,
  okBtnText: "立即打开",
  okCallBack: 1,
  cancleCallBack: null,
  content: "您已安装二维火掌柜，是否立即打开",
  title: "提示"
};
export default {
  data() {
    return {
      pageData,
      params,
      confirm,
      list,
      isShow: "true", //是否下载
      isReturn: true,
      allowBack: false,
      version: "1.7.0",
      device_type: 1,
      isBtn: false,
      industry_type: 0,
      language: "zh"
    };
  },
  methods: {
    // 按钮事件
    btnHandle() {
      let self = this;
      let pageData = self.pageData;
      let param = self.params;
      let dialog = self.confirm;
      if (pageData.type == 1) {
        if (self.isShow) {
          dialog.content = "您已安装二维火掌柜，是否立即打开";
          dialog.okBtnText = "立即打开";
          dialog.show = true;
        } else {
          console.log("下载页面");
          self.setParams(0, 1, 0, pageData.pageIndex, 0);
        }
      } else if (pageData.type == 2) {
        if (self.isShow) {
          console.log("打开APP");
          self.setParams(1, 0, 0, pageData.pageIndex, 0);
        } else {
          dialog.content = "您未安装二维火掌柜，是否立即安装";
          dialog.okBtnText = "立即安装";
          dialog.show = true;
        }
      } else if (pageData.type == 3) {
        console.log("打印");
        self.setParams(0, 0, 0, pageData.pageIndex, 0, 1);
      }
    },
    setDate(self) {
      this.list.forEach(item => {
        if (item.pageIndex == self.pageIndex) {
          self.title = item.title;
          self.type = item.type;
          self.content = item.content;
          self.totalNum = item.totalNum;
          self.btnContent = item.btnContent;
          self.btnInfo = "";
          if (item.btnInfo != "") {
            self.btnInfo = item.btnInfo;
          }
          return;
        }
      });
    },
    // 下一页
    next() {
      let self = this;
      let pageData = self.pageData;
      pageData.pageIndex++;
      self.isReturn = true;
      self.setDate(pageData);
      self.setParams(0, 0, 0, pageData.pageIndex, 0);
    },
    // 上一页
    pre() {
      let self = this;
      let pageData = self.pageData;
      if (pageData.pageIndex > 1) {
        pageData.pageIndex--;
      } else {
        self.setParams(0, 0, 1, pageData.pageIndex, 0);
        return;
      }
      if (pageData.pageIndex == 1 && !self.allowBack) {
        self.isReturn = false;
      } else {
        self.isReturn = true;
      }
      self.setDate(pageData);
      self.setParams(0, 0, 0, pageData.pageIndex, 0);
    },
    // 完成
    link() {
      let self = this;
      let pageData = self.pageData;
      self.setParams(0, 0, 1, pageData.pageIndex, 0);
    },
    // 网关接口
    getData() {
      let url = API.GATEWAY_BASE_URL;
      let self = this;
      const params = {
        method: "com.dfire.soa.cloudcash.getHomePageGuid",
        app_key: "200016",
        version: self.version,
        device_type: self.device_type,
        industry_type: self.industry_type,
        language: self.language,
        s_os: "web ",
        s_osv: "h5",
        s_apv: "5.1.1",
        s_net: "1",
        s_sc: "0*0",
        s_br: "h5",
        s_did: "s_did",
        format: "json",
        sign_method: "md5",
        sign: "sign",
        v: "1.0",
        timestamp: "1515586408"
      };
      const headers = {
        env: "3452680ea9ee440e8cc30fb1ba1fc6dc"
      };
      Requester.post(
        url,
        params,
        { emulateJSON: true, headers: headers },
        false
      )
        .then(data => {
          self.list = data.data;
          self.setDate(self.pageData);
          self.isBtn = true;
        })
        .catch(e => {});
    },
    init() {
      let self = this;
      let pageData = self.pageData;
      self.allowBack = router.route.query["allowBack"] || "false"; //显示返回
      self.isShow = router.route.query["isInstallShopkeeperApp"] || "true"; //下载
      pageData.pageIndex = router.route.query["pageIndex"] || 1;
      pageData.pageIndex = Number(pageData.pageIndex);
      self.version = router.route.query["version"] || "1.7"; //收银版本号
      self.version = Number(self.version);
      self.device_type = router.route.query["deviceType"] || 1; //移动设备
      self.device_type = Number(self.device_type);
      self.industry_type = router.route.query["industryType"] || 0; //0：餐饮 3：零售
      self.industry_type = Number(self.industry_type);
      self.isShow = eval(self.isShow);
      self.allowBack = eval(self.allowBack);
      self.isReturn = self.allowBack;
      if (pageData.pageIndex > 1) {
        self.isReturn = true;
      }
      self.language = router.route.query["language"] || "zh"; //zh 中文 en 英文
    },
    setParams(open, downLoad, finish, index, goPage, goPrint) {
      let self = this;
      let params = self.params;
      params.openShopKeeper = open || 0;
      params.downLoadShopKeeper = downLoad || 0;
      params.finish = finish || 0;
      params.pageIndex = index || 1;
      params.gotoOtherPage = goPage || 0;
      params.gotoPrintSetting = goPrint || 0;
      console.log(params);
      window.cloudCashierGreenHand.getPreviewContent(JSON.stringify(params));
    },
    // 提示框
    handleDialogEvent(dialog, eventName) {
      const cb = dialog[eventName + "CallBack"];
      let self = this;
      let pageData = self.pageData;
      if (cb) {
        if (pageData.type == 1) {
          console.log("打开火掌柜app");
          self.setParams(1, 0, 0, pageData.pageIndex, 0);
        } else if (pageData.type == 2) {
          console.log("进入火掌柜的下载页面");
          self.setParams(0, 1, 0, pageData.pageIndex, 0);
        }
      }
      dialog.show = false;
    }
  },
  components: {
    confirm: require("../../../alibi/components/confirm")
  },
  mounted() {
    let self = this;
    self.init();
    self.getData();
  }
};
</script>
<style lang="scss" scoped>
.guide {
  height: 100%;
  width: 100%;
  background: url("../../images/bg.png") no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  position: relative;
  padding-top: 88px;
  padding-bottom: 140px;
  overflow: hidden;
}
.head {
  height: 88px;
  padding: 0 20px 0 17px;
  text-align: center;
  line-height: 88px;
  font-size: 34px;
  position: absolute;
  top: 0;
  color: #fff;
  width: 100%;
}
.head img {
  float: left;
  width: 40px;
  margin-top: 24px;
}
.head .right {
  float: right;
  font-size: 28px;
}
.content {
  height: 100%;
  padding: 0 20px;
  width: 100%;
  overflow-y: scroll;
}
.btn {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.btn button {
  width: 100%;
  background: #e02200;
  height: 88px;
  text-align: center;
  border: 0;
  color: #ffffff;
  font-size: 28px;
}
.btn .btnInfo {
  display: block;
  font-size: 20px;
}
</style>

