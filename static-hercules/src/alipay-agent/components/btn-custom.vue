<template>
  <button type="button" class="btn_custom">
  <slot></slot>
  </button>
</template>

<style type="text/less" lang="less" scoped>
.btn_custom {
  background-color: #0088ff;
  width: 600px;
  height: 88px;
  border-radius: 12px;
  font-size: 30px;
  color: white;
  text-align: center;
  line-height: 40px;
  border: none;

  &:disabled {
    background-color: gray;
  }
}
</style>