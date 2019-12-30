<template>
<div class="info-list">
<div class="base-info">
     <ul class="share-ul">
       <li class="clear" v-for="item in infoList">
           <span class="span-left">{{item.key}}</span>
           <span class="span-right">{{item.value}}</span>
       </li>
     </ul>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["infoList"],
  methods: {},
  components: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.share-ul {
  font-size: 34px;
  line-height: 88px;
  padding: 0 22px 0 24px;
}
.share-ul li {
  border-top: 1PX solid #f2f2f2;
}

.clear:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.span-left {
  float: left;
}
.span-right {
  float: right;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
</style>

