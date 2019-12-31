<template>
    <div>
        <Crumb></Crumb>
        <div class="ent">
            <h3>
              {{title}}
            </h3>
            <p class="title">
              {{flow}}
            </p>
            <img class="pic" src="../../../images/ent-1.png" alt="message">
            <p class="title">
              {{acredit}}
            </p>
            <p class="content">
              {{dev}}
            </p>
            <img class="pic" src="../../../images/ent-2.png" alt="message">
            <img class="pic" src="../../../images/ent-3.png" alt="message">
            <p class="title">
              {{relieve}}
            </p>
            <p class="content" v-for='list in listInfo'>
              {{list}}
            </p>
            <img class="pic" src="../../../images/ent-4.png" alt="message">
            <img class="pic" src="../../../images/ent-5.png" alt="message">
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";

    let pageData = {
        title: _i('FILE.ENT.TITLE'),
        flow: _i('FILE.ENT.FLOW'),
        acredit: _i('FILE.ENT.ACCREDIT'),
        dev: _i('FILE.ENT.DEV'),
        relieve: _i('FILE.ENT.RELIEVE'),
        listInfo:{
            path: _i('FILE.ENT.PATH'),
            one: _i('FILE.ENT.ONE'),
            two: _i('FILE.ENT.TWO')
        }

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
.ent{
  padding-bottom: 60px;
}
.ent,.ent img{
  width: 100%;
  max-width: 1270px;
}
.ent h3{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #999999;
  margin-top: 20px;
  line-height: 30px;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    margin: 20px 0 15px 0;
  }
  .content{
   font-family: PingFangSC-Regular;
   font-size: 14px;
   color: #333333;
   margin-bottom: 15px;
  }
</style>
