<template>
    <section class="record">
        <scroll-loading :pageLoad="pageLoad" :pageList.sync="pageList" :query.sync="query">
            <div class="item" v-for="item in pageList" :key="item.id">
                <div class="top clear-fix">
                    <p class="text f-l">{{item.bankName}}（{{item.cardNo | subStr}}）</p>
                    <p class="value c-666 f-r">¥{{item.withdrawAmount | fen2yuan |number}}</p>
                </div>
                <div class="mid clear-fix">
                    <p class="text f-l">{{item.operator}}</p>
                    <p class="value f-r">
                        <span :class="item.withdrawStatus|withdrawStatusColor">
                            {{item.withdrawStatus | withdrawStatusStr}}
                        </span>
                    </p>
                </div>
                <div class="mid clear-fix">
                    <p class="text f-l">{{item.withdrawTime}}</p>
                </div>
            </div>
            <div slot="no-results">
                <div class="fixed-center">
                    您现在还没有提现记录
                </div>
            </div>
        </scroll-loading>
    </section>
</template>

<script>
import API from '../config/api'
import tools from '../utils/tools'

export default {
  name: 'record',
  data() {
    return {
      pageList: [],
      total: {},
      query: {
        entityId: sessionStorage.getItem('entityId') || ''
      },
      pageLoad: API.getWithdrawSerialList
    }
  },
  computed: {
    getColor() {
      let startDate = this.queryStr.startDate
      return startDate ? startDate : '开始时间'
    },
    endDateStr() {
      let endDate = this.queryStr.endDate
      return endDate ? endDate : '结束时间'
    }
  },
  methods: {
    getTotalSettleBill() {
      API.getTotalSettleBill(this.query).then(res => {
        this.total = res
      })
    },
    formatDate(arr, point = '') {
      let result = arr.map(val => {
        return val.value
      })
      return result.join(point)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
    .record {

    
    }
</style>