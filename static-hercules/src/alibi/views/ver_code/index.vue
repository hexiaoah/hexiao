<template>
<div class="ver-code">
<vercode :code='pageData.code_num' v-if="isShow"></vercode>
<errcode :info='pageData.err_info' v-if="isErr"></errcode>
</div>
</template>
<script>
const API = require("../../config/api");
const Requester = require("base/requester");
const router = require("@2dfire/utils/router");
let pageData = {
  err_info: "",
  code_num: ""
};
export default {
  data() {
    return {
      pageData,
      isShow: false,
      isErr: false,
      entity_id: "",
      time_stamp: "",
      mobile: ""
    };
  },
  methods: {
    getData() {
      // 离线验证码
      let url = API.OFF_LINE_CODE;
      Requester.get(url, {
        params: {
          entity_id: this.entity_id,
          time_stamp: this.time_stamp,
          mobile: this.mobile
        }
      })
        .then(data => {
          this.pageData.code_num = data;
          this.isShow = true;
          window.sessionStorage.setItem("alibiCodeNum", data);
        })
        .catch(e => {
          this.pageData.err_info = e.result.message;
          this.isErr = true;
        });
    },
    init() {
      let self = this;
      self.entity_id = router.route.query["entity_id"] || "";
      self.time_stamp = router.route.query["time_stamp"] || "";
      self.mobile = router.route.query["mobile"] || "";
    },
    verify() {
      let self = this.pageData;
      if (self.code_num == "") {
        this.getData();
      } else {
        this.isShow = true;
      }
    }
  },
  components: {
    vercode: require("../../components/code"),
    errcode: require("../../components/err")
  },
  created() {
    this.init();
    document.title = "收银离线登录验证码";
    let self = this.pageData;
    self.code_num = window.sessionStorage.getItem("alibiCodeNum") || "";
    setTimeout(this.verify,0);
  }
};
</script>
<style lang="scss" scoped>
.ver-code {
  height: 100%;
  background: #f6f5f9;
}
</style>

