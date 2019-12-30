<template>
<div class="scan-code">
<errcode :info='err_info'></errcode>
</div>
</template>
<script>
const API = require("../../config/api");
const Requester = require("base/requester");
const router = require("@2dfire/utils/router");
export default {
  data() {
    return {
      err_info: "",
      title: ""
    };
  },
  methods: {
    init() {
      let self = this;
      self.err_info = router.route.query["message"] || "请使用支付宝扫描二维码！";
      self.title = router.route.query["title"] || "扫码失败";
    }
  },
  components: {
    errcode: require("../../components/err")
  },
  created() {
    this.init();
    document.title = this.title;
  }
};
</script>
<style lang="scss" scoped>
.scan-code {
  height: 100%;
  background: #f6f5f9;
}
</style>

