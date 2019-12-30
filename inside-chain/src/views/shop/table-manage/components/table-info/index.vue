<template>
    <div class="table-info-wrap">
        <p class="name">{{info.name}}（{{info.adviseNum}}人桌）</p>
        <p class="code">桌位编码：{{info.code}}</p>
    </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
}
</script>
<style lang="scss" scoped>
    .table-info-wrap {
        display: inline-block;
        vertical-align: middle;
        padding-left: 10px;
    }
    .name {
        font-weight: bold;
        font-size: 14px;
        color: #333333;
    }
    .code {
        font-size: 12px;
        color: #666666;
    }
</style>
