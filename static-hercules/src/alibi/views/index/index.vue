<template>
  <div class="alibi">
    <phone v-if='isShow'></phone>
    <errcode :info='err_info' v-if="isErr"></errcode>
  </div>
</template>
<script>
const router = require("@2dfire/utils/router");
const API = require("../../config/api");
const Requester = require("base/requester");
export default {
  data() {
    return {
      v: "", //手机号码是否存在
      l: "", //是否在线
      cash_login_type: "",
      cash_uuid: "",
      isShow: false,
      err_info: "",
      isErr: false,
      login: "" //是否登录
    };
  },
  methods: {
    link() {
      this.$router.push({ path: "code" });
    },
    success() {
      this.$router.push({ path: "success" });
    },
    lose() {
      this.$router.push({ path: "lose" });
    },
    init() {
      let self = this;
      self.l = router.route.query["cash_online"] || 1; //是否在线
      self.cash_login_type = router.route.query["cash_login_type"] || "";
      self.cash_uuid = router.route.query["cash_uuid"] || "";
    },
    getV() {
      let sessionStorage = window.sessionStorage;
      let currentId = sessionStorage.getItem("_DFMAP_sid_current");
      let state = sessionStorage.getItem(`_DFMAP_sid_${currentId}`);
      try {
        state = JSON.parse(state) || {};
        return Number(state.v);
      } catch (e) {
        return 0;
      }
    }
  },
  components: {
    phone: require("../../components/phone"),
    errcode: require("../../components/err")
  },
  created() {
    let self = this;
    self.login = window.sessionStorage.getItem("alibiLogin") || 0;
    self.v = self.getV();
    self.init();
    if (self.v == 1) {
      // 手机号存在 在线
      if (self.l == 1) {
        // 登录接口
        let url = API.GET_LOGIN;
        if (self.login == 0) {
          Requester.get(url, {
            params: {
              cash_uuid: self.cash_uuid,
              cash_login_type: self.cash_login_type
            }
          })
            .then(data => {
              document.title = "授权登录成功";
              window.sessionStorage.setItem("alibiLogin", "1");
              setTimeout(self.success, 0);
            })
            .catch(e => {
              document.title = "授权登录失败";
              self.isErr = true;
              self.err_info = e.result.message;
            });
        } else {
          self.success();
        }
      } else if (self.l == 0) {
        // 手机号存在 离线
        self.link();
      }
    } else {
      self.isShow = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.alibi {
  height: 100%;
  background: #f6f5f9;
}
</style>

