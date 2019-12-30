<template>
  <div class="share" v-if="corShow">
    <load v-if="isShow"></load>
    <div class="top-page">
      <div class="base-info">
        <h4>
            {{pageData.shareTitle}}
        </h4>
        <infoList :infoList='pageData.infoList'></infoList>
      </div>
      <div class="material">
      <div class="title">
        <h4 class="left">
          {{pageData.material}}
        </h4>
        <div class="right" v-if="pageData.batch" @click="link">
            <span>
              {{pageData.guideName}}
            </span>
            <img src="../../images/right.png" alt="">
        </div>
      </div>
      <goodList :goodList='pageData.goodList'></goodList>
      </div>
    </div>
    <div class="total">
      合计 <span>{{pageData.totalNum}}</span> 项
    </div>
  </div>
  <errInfo :info='err_info' v-else></errInfo>
</template>
<script>
let pageData = {
  shareTitle: "基本信息",
  infoList: [
    {
      key: "采购方",
      value: "苦参的店"
    },
    {
      key: "采购单号",
      value: "2018 0032 3445"
    },
    {
      key: "供应商",
      value: "供应商23"
    },
    {
      key: "要求到货日",
      value: "2017-08-05"
    },
    {
      key: "备注",
      value: ""
    }
  ],
  material: "采购原料",
  goodList: [
    {
      goodsName: "小青菜",
      goodsNum: "5.00",
      numUnitName: "斤",
      barCode: "20170518000026"
    },
    {
      goodsName: "小青菜",
      goodsNum: "5.00",
      numUnitName: "斤",
      barCode: "20170518000026"
    },
    {
      goodsName: "小青菜",
      goodsNum: "5.00",
      numUnitName: "斤",
      barCode: "20170518000026"
    }
  ],
  totalNum: "3",
  batch: true,
  guideName: "按采购门店查看"
};
let params = {
  bill_id_list: "",
  bill_type: "",
  entity_id: "",
  entity_type: "",
  self_entity_id: "",
  shop_entity_id: ""
};
const router = require("@2dfire/utils/router");
const API = require("../../config/api");
const Requester = require("base/requester");
export default {
  data() {
    return {
      pageData,
      params,
      isShow: true,
      corShow: true,
      err_info: ""
    };
  },
  methods: {
    link() {
      this.$router.push({
        path: "details",
        query: this.params
      });
    },
    getData() {
      let url = API.SUPPLY_CHAIN_API + "/pc/v2/h5/bill_share";
      let self = this;
      let params = self.params;
      Requester.post(url, params, { emulateJSON: true }, false)
        .then(data => {
          self.isShow = false;
          self.pageData = data;
        })
        .catch(e => {
          self.isShow = false;
          self.corShow = false;
          if (e.result.message) {
            self.err_info = e.result.message;
          }
        });
    },
    init() {
      let self = this;
      let params = self.params;
      params.bill_id_list = router.route.query["bill_id_list"]; //单据ID
      params.bill_type = router.route.query["bill_type"]; //	单据类型（"采购"：1，"集中采购",：14， "订货记录"： 17）
      params.entity_id = router.route.query["entity_id"]; //实体ID
      params.entity_type = router.route.query["entity_type"]; //店铺类型
      params.self_entity_id = router.route.query["self_entity_id"]; //	自实体ID
      params.shop_entity_id = router.route.query["shop_entity_id"]; //	门店ID
    }
  },
  components: {
    infoList: require("../../components/infoList"),
    goodList: require("../../components/goodList"),
    load: require("../../components/loading"),
    errInfo: require("../../../alibi/components/err")
  },
  created() {
    this.init();
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.share {
  height: 100%;
  background: #f4f4f4;
  position: relative;
  padding-bottom: 64px;
}
.title{
  background: #f4f4f4;
} 
.top-page{
height: 100%;
overflow: scroll;
}
.base-info {
  line-height: 88px;
  background: #fff;
  border-top: 1PX solid #f2f2f2;
  border-bottom: 1PX solid #f2f2f2;
  h4{
  background: #f4f4f4;
  }
}
.share h4 {
  font-size: 34px;
  padding: 0 12px;
}
.material {
  // margin-top: 60px;
  background: #fff;
  line-height: 88px;
  border-top: 1PX solid #f2f2f2;
  border-bottom: 1PX solid #f2f2f2;
}
.total {
  position: absolute;
  bottom: 0;
  background: #fdfdfd;
  line-height: 64px;
  font-size: 28px;
  width: 100%;
  padding: 0 24px;
  border-top: 1PX solid #f2f2f2;
  text-align: right;
}
.total span {
  color: #fe345d;
}
.left {
  font: left;
}
.right {
  float: right;
  font-size: 30px;
  color: #0088ff;
  font-weight: 400;
  padding-right: 22px;
}
.title:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.right img {
  vertical-align: middle;
  height: 36px;
}
</style>

