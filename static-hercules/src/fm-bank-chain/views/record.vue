<template>
  <section class="record">
    <scroll-loading
      :pageLoad="pageLoad"
      :pageList.sync="pageList"
      :query.sync="query"
    >
      <div
        class="item"
        v-for="item in pageList"
        :key="item.batchId"
        @click="toDetail(item.batchId)"
      >
        <div class="top clear-fix">
          <p class="text f-l c-333">{{ item.applyNum }}家</p>
          <p class="text f-r c-333">¥{{ item.applyAmt | fen2yuan | number }}</p>
        </div>
        <div class="mid">
          <p class="text mb-10 c-999">{{ item.operator }}</p>
          <p class="time c-999">{{ item.applyTime }}</p>
        </div>
      </div>
      <div slot="no-results">
        <div class="fixed-center">
          您现在还没有提现操作记录
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
        chainEntityId: sessionStorage.getItem('entityId') || ''
      },
      pageLoad: API.getChainWithdrawRecordList
    }
  },
  methods: {
    toDetail(batchId) {
      this.$router.push({
        path: '/record-detail',
        query: {
          batchId
        }
      })
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.record {
}
</style>
