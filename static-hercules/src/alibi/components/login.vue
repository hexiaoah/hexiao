<template>
<div class="success">
<div class="login">
<img src="../images/login.png" alt="">
<h4>授权登录成功</h4>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  created() {
      document.title='授权登录成功'
  }
};
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  text-align: center;
  padding: 40px 0 126px 0;
}
.login img {
  width: 120px;
  height: 120px;
}
.login h4 {
  margin-top: 50px;
  font-size: 32px;
  color: #000000;
  font-weight: 600;
}
.success {
  height: 100%;
  background: #f6f5f9;
}
</style>

