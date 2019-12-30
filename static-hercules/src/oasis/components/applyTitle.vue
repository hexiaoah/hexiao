<template>
    <div class="title-wrap">
        <span class="title">{{text}}</span>
    </div>
</template>

<script>
export default {
  name: 'apply-title',
  props: ['text'],
  data() {
    return {}
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
    .title-wrap{
        text-align: center;
        font-size: 17px;
        padding-bottom: 15px;
        .title{
            height: 22px;
            display: inline-block;
            padding: 0 18px;
            line-height: 18px;
            font-weight: bold;
            color: #333333;
            background: url('https://assets.2dfire.com/frontend/013654f6aaa264a07f5ccc5adfeb8ab8.png') 0 0 no-repeat,url('https://assets.2dfire.com/frontend/013654f6aaa264a07f5ccc5adfeb8ab8.png') right 0 no-repeat;
            background-size: 12px 18px;
        }
    }
</style>

