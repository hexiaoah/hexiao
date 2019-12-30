<template>
  <section class="sale-add">
    <f-view class="query">
      <f-line-text label="当前店铺" :text="shopName"></f-line-text>
      <f-line-text label="销售日期" :text="time|date('yyyy.MM.dd')"></f-line-text>
    </f-view>
    <div class="list">
      <f-view class="item" v-for="(item,index) in list" :key="index">
        <f-line-text label="业态" :text="item.formatName" v-if="item.formatName"></f-line-text>
        <f-line-input :placeholder="'请输入笔数'" label="销售笔数（笔）" v-model="item.salesCount"></f-line-input>
        <f-line-input
          label="销售金额（元）"
          v-model="item.salesAmount"
          :placeholder="'请输入金额'"
          :tip="index==0?'销售金额最多保留两位小数，例如：30000.00':''"
        ></f-line-input>
      </f-view>
    </div>
    <div class="action">
      <f-button type="primary" @click="saveHandle" :disabled="isedit">保存</f-button>
    </div>
  </section>
</template>

<script>
import API from '../config/api.js'
export default {
  name: 'sale-add',
  data() {
    return {
      list: [
        // {
        //   formatId: '',
        //   formatName: 'K金',
        //   salesAmount: '',
        //   salesCount: ''
        // }
      ],
      shopName: '',
      time: 1533254400000,
      shop_entity_id: '',
      isedit: false
    }
  },
  methods: {
    saveHandle() {
      const self = this
      const list = self.list
      const validateReg = {
        salesCount: /^\d+$/,
        salesAmount: /^\d+(\.\d{1,2})?$/
      }

      for (let [index, elem] of list.entries()) {
        if (elem.salesCount === '' && elem.salesAmount === '') {
          continue
        }

        const validateResult = {
          salesCount: Number(validateReg.salesCount.test(elem.salesCount)),
          salesAmount: Number(validateReg.salesAmount.test(elem.salesAmount))
        }

        if (validateResult.salesCount * validateResult.salesAmount === 0) {
          if (!validateResult.salesCount && !validateResult.salesAmount) {
            self.$toast(
              '销售笔数只支持正整数格式；\n销售金额只支持金额数字格式！'
            )
          } else if (!validateResult.salesAmount) {
            self.$toast('销售金额只支持金额数字格式！')
          } else {
            self.$toast('销售笔数只支持正整数格式！')
          }

          return
        }
      }

      // 新的校验：只需要一个业态的填写完整即可保存
      const canSave = self.list.some(item => {
        return (
          validateReg.salesCount.test(item.salesCount) &&
          validateReg.salesAmount.test(item.salesAmount)
        )
      })

      if (canSave) {
        // self.$toast('good')
        self.saveData()
      } else {
        self.$toast('请至少完成一个业态的数据上报')
      }
    },
    // 录入数据
    saveData() {
      let self = this
      let list = []
      self.list.forEach(item => {
        let { formatId, salesAmount, salesCount } = item
        list.push({
          formatId,
          salesAmount:
            salesAmount === ''
              ? -99
              : Math.round(Number(salesAmount).toFixed(2) * 100),
          salesCount: Number(salesCount === '' ? -99 : salesCount)
        })
      })
      let params = {
        time: self.time,
        base_data_list: JSON.stringify(list)
      }
      if (self.shop_entity_id != '') {
        params.shop_entity_id = self.shop_entity_id
        API.saveUpdata(params).then(data => {
          sessionStorage.setItem('sale-info', 1)
          self.$router.back(-1)
        })
        return
      }
      API.saveInputData(params).then(data => {
        sessionStorage.setItem('sale-info', 1)
        self.$router.back(-1)
      })
    },
    getData() {
      API.getReported().then(data => {
        this.list = data.baseDataList
        this.shopName = data.shopName
        this.list.forEach(item => {
          item.salesAmount = ''
          item.salesCount = ''
        })
      })
    },
    // 审核
    getAuditData(val, id) {
      API.auditEdit({
        time: val,
        shop_entity_id: id
      }).then(data => {
        data.baseDataList.forEach(item => {
          if (item.salesAmount !== -99) {
            item.salesAmount = item.salesAmount / 100
          } else {
            item.salesAmount = ''
          }
          item.salesCount = item.salesCount !== -99 ? item.salesCount : ''
        })
        this.list = data.baseDataList
        this.shopName = data.shopName
      })
    }
  },
  mounted() {
    this.time = Number(this.$route.query.time)
    this.isedit = false
    if (this.$route.query.isedit != 0 && this.$route.query.isedit) {
      this.isedit = true
    }
    if (this.$route.query.id) {
      this.shop_entity_id = this.$route.query.id
      this.getAuditData(this.time, this.shop_entity_id)
      if (this.isedit) {
        this.$toast('当月已开始结算，无法调整数据')
      }
      return
    }
    if (this.isedit) {
      this.$toast('当月已开始结算，无法上报数据')
    }
    this.getData(this.time)
  }
}
</script>

<style lang="scss" scoped>
.sale-add {
  .query {
    margin-top: 72px;
  }

  .list {
    margin-top: 72px;

    .item {
      margin-top: 40px;
    }
  }

  .action {
    padding: 72px 76px;
  }
}
</style>
