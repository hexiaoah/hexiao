<template>
<div class="details" v-if="corShow">
  <load v-if="isShow"></load>
    <div v-for="list in pageData" class="detaile-list">
        <h4>
            {{list.title}}
        </h4>
        <goodList :goodList='list.goodsList'></goodList>
        <div class="total">
            小计 <span>{{list.total}}</span> 项
        </div>
    </div>
</div>
<errInfo :info='err_info' v-else></errInfo>
</template>
<script>
let pageData = [
  {
    title: "苦参的采购方1",
    total: "3",
    goodsList: [
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
    ]
  }
];
let params = {
  bill_id_list: "",
  bill_type: "",
  entity_id: "",
  entity_type: "",
  self_entity_id: ""
};
const router = require("@2dfire/utils/router");
const API = require("../../config/api");
const Requester = require("base/requester");
// const dialogEvents = require("../events");
export default {
  data() {
    return {
      pageData,
      params,
      isShow: true,
      err_info: "",
      corShow: true
    };
  },
  methods: {
    getData() {
      let url = API.SUPPLY_CHAIN_API + "/pc/v2/h5/bill_share_detail";
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
          console.log(e.result.message);
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
    }
  },
  components: {
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
.details {
  min-height: 100%;
  background: #f4f4f4;
  line-height: 88px;
  padding-bottom: 10px;
}
.detaile-list {
  margin-bottom: 60px;
  background: #fff;
}
.details h4 {
  font-size: 34px;
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #f4f4f4;
}
.total {
  border-top: 1PX solid #f2f2f2;
  background: #fdfdfd;
  line-height: 64px;
  font-size: 28px;
  padding: 0 24px;
  text-align: right;
}
.total span {
  color: #fe345d;
}
</style>

