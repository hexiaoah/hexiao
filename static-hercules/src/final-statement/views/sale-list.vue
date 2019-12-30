<template>
<section class="sale-list">
  <f-view class="sum">
    <f-line-text label="选择月份" :text="datePicker.value|date('yyyy.MM')" select @click="showDatePicker()"></f-line-text>
    <f-line-text label="本月销售笔数（笔）" :text="salesTotal.salesCount|money(0)"></f-line-text>
    <f-line-text label="本月销售金额（元）" :text="salesTotal.salesAmount|money"></f-line-text>
  </f-view>
  <div class="result">
    <span v-if="salesTotal.reportProcess==='finished'">当月数据已完成上报</span>
    <span v-else-if="salesTotal.reportProcess==='audited'">当月数据已完成审核，<span class="c-0088FF" @click="showDialog">查看详情 ></span></span>
    <span v-else>当月还有<span class="c-ff0033">{{salesTotal.reportProcess}}</span>天数据未上报。</span>
  </div>
  <ul class="list">
    <li class="item" v-for="(item,index) in saleList" :key="'l_'+index">
      <f-sub-title>
        {{item.operatorTime|date('yyyy年MM月dd日')}}
      </f-sub-title>
      <f-line-text class="item-inner" :class="saleStatusClass(item.status)" icon @click="pathTo(item.status,item.operatorTime,item.buttonStatus)">
        <div class="content" slot="label">
          <div class="num">
            <p>销售笔数：{{item.num|money(0)}}笔</p>
            <p class="old" v-if="item.viewStatus">原销售笔数：
              <del>{{item.oldNum|money(0)}}笔</del>
            </p>
          </div>
          <div class="amount">
            <p>销售金额：{{item.amount|money}}元</p>
            <p class="old" v-if="item.viewStatus">原销售金额：
              <del>{{item.oldAmount|money}}元</del>
            </p>
          </div>
          <div class="operator" v-if="item.operator && item.status">上传：{{item.operator}}</div>
        </div>
        <div class="status" slot="text">
          {{item.status|saleStatusStr}}
        </div>
      </f-line-text>
    </li>
  </ul>

  <f-picker v-model="datePicker.value" type="month" :visible.sync="datePicker.visible" textTitle="时间" @confirm="handlePickerConfirm">
  </f-picker>

  <f-Dialog class="sale-info" :visible.sync="dialogVisible" title="数据详情" @confirm="handleConfirm">
    <div class="content">
      <div class="before-adjust">
        <p class="num">本月上报笔数：{{ thisMonthData.salesCount|money(0)}}笔</p>
        <p class="amount">本月上报金额：{{ thisMonthData.salesAmount|money}}元</p>
      </div>
      <div class="adjust">
        <p class="num">商场调整笔数：<span>{{ mallAdjustData.salesCount|symbol}}</span> {{ mallAdjustData.salesCount|absolute|money(0)}}笔</p>
        <p class="amount">商场调整金额： <span>{{ mallAdjustData.salesAmount|symbol}}</span> {{ mallAdjustData.salesAmount|absolute|money}}元</p>
      </div>
      <div class="after-adjust">
        <p class="num">调整后笔数：{{ adjustAfterData.salesCount|money(0)}}笔</p>
        <p class="amount">调整后金额：{{ adjustAfterData.salesAmount|money}}元</p>
      </div>
    </div>
    <div class="footer">
      如有问题请联系商场管理人员沟通
    </div>
  </f-Dialog>
</section>
</template>

<script>
import API from '../config/api.js'
import sessionStorage from '@2dfire/utils/sessionStorage'
export default {
  data() {
    return {
      salesTotal: {
        reportProcess: 'audited', //finished，audited,天数
        salesAmount: 0,
        salesCount: 0
      },
      // 	调整后销售数据
      adjustAfterData: {
        salesAmount: 0,
        salesCount: 0
      },
      mallAdjustData: {
        salesAmount: 0,
        salesCount: 0
      },
      //本月上报销售数据
      thisMonthData: {
        salesAmount: 0,
        salesCount: 0
      },
      datePicker: {
        visible: false,
        value: Number(sessionStorage.getItem('list-month'))||new Date().getTime()
      },
      saleList: [
        // {
        //   num: 0,
        //   oldNum: 0,
        //   amount: 0,
        //   oldAmount: 0,
        //   operator: '',
        //   status: 0,
        //   operatorTime: 1533081600000,
        //   viewStatus: 0
        // }
      ],
      dialogVisible: false,
      showTotast:false
    }
  },
  computed: {},
  methods: {
    showDatePicker() {
      this.datePicker.visible = true
    },
    handleConfirm(){
      this.dialogVisible = false
    },
    handlePickerConfirm(val) {
      let self = this
      self.datePicker.anchor = val
      let baseMonth = self.datePicker.value
      sessionStorage.setItem('list-month', baseMonth)
      self.getTotal(baseMonth)
      self.getList(baseMonth)
    },
    // 当月数据合计
    getTotal(val) {
      API.getDataTotal({
        time: val
      }).then(data => {
        this.salesTotal = data
      })
    },
    // 上报列表
    getList(val) {
      API.getDataList({
        time: val
      }).then(data => {
        let arr = []
        data.forEach(item => {
          arr.push({
            num: item.salesCount,
            oldNum: item.userSalesCount || '',
            amount: item.salesAmount,
            oldAmount: item.userSalesAmount || '',
            operator: item.uploadUser || '',
            status: item.status,
            operatorTime: item.date,
            viewStatus: item.viewStatus,
            buttonStatus:item.buttonStatus
          })
        })
        this.saleList = arr
      })
    },
    getDetails(val) {
      API.getDetailsTotal({
        time: val
      })
        .then(data => {
          this.adjustAfterData = data.adjustAfterData
          this.mallAdjustData = data.mallAdjustData
          this.thisMonthData = data.thisMonthData
        })
        .catch(err => {})
    },
    showDialog() {
      this.dialogVisible = true
      this.getDetails(this.datePicker.value)
    },
    pathTo(status, time, isedit) {
      switch (status) {
        case 0:
          this.$router.push({
            path: 'sale-add',
            query: {
              time,
              isedit,
            }
          })
          break
        case 1:
          this.$router.push({
            path: 'sale-edit',
            query: {
              time,
              isedit
            }
          })
          break
        case 2:
          this.$router.push({
            path: 'sale-info',
            query: {
              time
            }
          })
          break
        default:
          console.error('不存在的订单状态')
          break
      }
    },
    saleStatusClass(status) {
      return {
        0: 'under-report',
        1: 'wait-audit',
        2: 'audited'
      }[status]
    },
  },
  mounted() {
    let self = this
    let baseMonth = self.datePicker.value
    if(sessionStorage.getItem('sale-info')){
      self.$toast('保存成功')
      sessionStorage.removeItem('sale-info')
    }
    if (!sessionStorage.getItem('list-month')) {
      sessionStorage.setItem('list-month', baseMonth)
    }
    self.getTotal(self.datePicker.value)
    self.getList(self.datePicker.value)
  }
}
</script>

<style lang="scss" scoped>
.sale-list {
  .sum {
    margin-top: 72px;
  }

  .result {
    padding-left: 30px;
    padding-top: 20px;
    font-size: 26px;
    color: #999;
  }

  .list {
    margin-top: 72px;

    .item {
      background-color: #fff;
      margin-top: 30px;

      .item-inner {
        padding: 20px 30px;

        .content {
          .num,
          .amount,
          .operator {
            margin-top: 10px;

            &:first-child {
              margin-top: 0;
            }

            .old {
              font-size: 26px;
              color: #999;
              margin-top: 10px;
            }
          }

          .operator {
            font-size: 26px;
            color: #999;
          }
        }

        .status {
          font-size: 26px;
        }

        &.under-report .status {
          color: #f03;
        }

        &.wait-audit .status {
          color: #f90;
        }

        &.audited .status {
          color: #0c3;
        }

        &.audited .content {
          .num,
          .amount,
          .operator {
            margin-top: 20px;

            &:first-child {
              margin-top: 0;
            }
          }
        }
      }
    }
  }

  .sale-info {
    .content {
      padding-left: 30px;

      .before-adjust,
      .adjust,
      .after-adjust {
        font-size: 30px;
        padding: 20px 0;
        border-bottom: 1PX solid #ccc;

        .amount {
          margin-top: 20px;
        }
      }
    }

    .footer {
      padding: 24px 0 30px 30px;
      font-size: 26px;
      color: #999;
    }
  }
}
</style>
