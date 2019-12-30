<template>
<div class="goodList">
    <ul>
        <li class="clear" v-for="item in goodList">
        <p class='ul-p goods-name'>
            <span>{{item.goodsName}}</span>
        </p>
        <p class='ul-p'>
            <span class='span-left'>{{item.barCode}}</span>
            <span class='span-right'>{{item.goodsNum}}{{item.numUnitName}}</span>
        </p>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["goodList"],
  methods: {},
  components: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.goodList {
  font-size: 34px;
  line-height: 66px;
}
.goodList li {
  border-top: 1PX solid #f2f2f2;
}
.ul-p {
  padding: 0 22px 0 24px;
}
.goods-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.span-left {
  font-size: 30px;
}

.span-right {
  float: right;
  font-size: 30px;
  max-width: 75%;
  word-wrap: break-word;
}
</style>

