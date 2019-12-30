<template>
  <span class="tag"><slot></slot></span>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
.tag {
  width: 32px;
  height: 16px;
  font-size: 10px;
  background: #2d8cf0;
  line-height: 16px;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 2px;
}
</style>
