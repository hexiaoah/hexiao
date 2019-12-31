<template>
    <div>
        <Crumb></Crumb>
        <div class="flow">
            <h3>
              {{title}}
            </h3>
            <p class="content">
              {{shop}}
            </p>
            <img class="pic" src="../../../images/flow-1.png" alt="message">
            <img class="pic" src="../../../images/flow-2.png" alt="message">
            <p class="content">
              {{detail}}
            </p>
            <img class="pic" src="../../../images/flow-3.png" alt="message">
            <p class="content">
              {{list}}
            </p>
            <img class="pic" src="../../../images/flow-4.png" alt="message">
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";

    let pageData = {
        title: _i('FILE.FLOW.TITLE'),
        api: _i('FILE.FLOW.API'),
        shop: _i('FILE.FLOW.SHOP'),
        detail: _i('FILE.FLOW.DETAIL'),
        list: _i('FILE.FLOW.LIST')
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
        },
        methods: {
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped="">
.flow{
  padding-bottom: 60px;
}
.flow,.flow img{
  width: 100%;
  max-width: 1270px;
}
.flow h3{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #999999;
  margin: 16px 0 13px 0;
  line-height: 30px;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #1AA2F8;
  }
  .content{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    margin: 15px 0;
  }
</style>
