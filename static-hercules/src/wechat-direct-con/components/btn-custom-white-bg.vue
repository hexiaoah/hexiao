<template>
  <button type="button" class="btn_custom_white_bg">
  <slot></slot>
  </button>
</template>

<style type="text/less" lang="less" scoped>

  .btn_custom_white_bg {
    background-color: white;
    width: 600px;
    height: 88px;
    border-radius: 12px;
    font-size: 30px;
    color: #0088ff;
    text-align: center;
    line-height: 40px;
    padding: 24px 30px;
    border: 1PX solid #0088ff;
  }
</style>