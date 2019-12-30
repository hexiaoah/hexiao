<template>
<div class="lose">
  <div class="err">
<img src="../images/info.png" alt="">
<h4>{{info||'网络有问题，请稍后重试'}}</h4>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["info"],
  methods: {},
  components: {},
};
</script>
<style lang="scss" scoped>
.err {
  background: #fff;
  text-align: center;
  padding: 40px 48px 126px 48px;
}
.err img {
  width: 120px;
  height: 120px;
}
.err h4 {
  margin-top: 50px;
  font-size: 32px;
  color: #000000;
  font-weight: 600;
}
.lose{
  height: 100%;
  background: #f6f5f9;
}
</style>

