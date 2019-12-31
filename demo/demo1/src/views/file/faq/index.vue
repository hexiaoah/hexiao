
<template>
    <div>
        <OpenTitle title="FAQ"></OpenTitle>
        <div class="wrap FAQ">
            <!--FAQ-->
            <h3>
              {{title}}
            </h3>
            <p class="list" v-for='item in listInfo' v-html='item'>
              {{item}}
            </p>
        </div>
    </div>
</template>

<script>
import _i from "@/i18n/index";
import API from "@/config/api";
let pageData = {
  title:_i('FILE.FAQ.TITLE'),
  listInfo:{
        approve:_i('FILE.FAQ.LIST.APPROVE'),
        url:_i('FILE.FAQ.LIST.URL'),
        back:_i('FILE.FAQ.LIST.BACK'),
        accredit:_i('FILE.FAQ.LIST.ACCREDIT'),
        pattern:_i('FILE.FAQ.LIST.PATTERN'),
        api:_i('FILE.FAQ.LIST.API'),
        framework:_i('FILE.FAQ.LIST.FRAMEWORK'),
        singature:_i('FILE.FAQ.LIST.SIGNATURE'),
        example:_i('FILE.FAQ.LIST.EXAMPLE'),
        look:_i('FILE.FAQ.LIST.LOOK'),
  },
}
export default {
  data() {
        return pageData
  },
  components: {
     OpenTitle: require("@/components/open-title.vue"),
  },
  methods: {
  },
  created() {},
  mounted() {}
};
</script>


<style lang="scss" scoped="">
.wrap {
  min-width: 446px;
  padding-bottom: 60px;
}
.wrap h3{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #333333;
  margin: 20px 0 10px 0;
}
.list{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  line-height: 30px;
  margin: 8px 0;
}
</style>

