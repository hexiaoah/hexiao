<template>
<section class="sale-info">
  <f-view class="query">
    <f-line-text label="当前店铺" :text="shopName"></f-line-text>
    <f-line-text label="销售日期" :text="time|date('yyyy.MM.dd')"></f-line-text>
  </f-view>
  <div class="list">
    <f-view class="item" v-for="(item,index) in list" :key="index">
      <f-line-text label="业态" :text="item.formatName" v-if='item.formatName'></f-line-text>
      <f-line-text label="销售笔数（笔）" :text="item.salesCount|money(0)"></f-line-text>
      <f-line-text label="销售金额（元）" :text="item.salesAmount|money"></f-line-text>
    </f-view>
  </div>
  <p class="warn">
    如有问题请联系商场管理人员沟通。
  </p>
</section>
</template>

<script>
import API from '../config/api.js'
export default {
  name: 'sale-info',
  data() {
    return {
      list: [
        {
          formatId: '',
          formatName: '',
          salesAmount: '',
          salesCount: ''
        }
      ],
      shopName: '',
      time: 1533254400000,
      shop_entity_id:'',
    }
  },
  methods: {
    getData(val) {
      API.getEditData({
        time: val
      }).then(data => {
        this.list = data.baseDataList
        this.shopName = data.shopName
      })
    },
    getAuditData(val,id){
      console.log(val,id)
      API.auditEdit({
        time:val,
        shop_entity_id:id
      }).then(data => {
        this.list = data.baseDataList
        this.shopName = data.shopName
      })
    }
  },
  mounted() {
    this.time = Number(this.$route.query.time)
    if(this.$route.query.id){
    this.shop_entity_id=this.$route.query.id
    this.getAuditData(this.time,this.shop_entity_id)
    return
    }
    this.getData(this.time)
  }
}
</script>

<style lang="scss" scoped>
.sale-info {
  .query {
    margin-top: 72px;
  }

  .list {
    margin-top: 72px;

    .item {
      margin-top: 40px;
    }
  }

  .warn {
    font-size: 26px;
    color: #999;
    padding: 20px 0 0 30px;
  }
}
</style>
