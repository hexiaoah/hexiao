<template>
  <div class="rank-management">
    <div class="content-wrapper" v-show="data.length > 0">
      <rank-list-item
        v-for="(item, index) in data"
        @choosed="selectRank"
        :key="index"
        :label-name="item['name']"
        :data="item"
        :lineHidden="index+1===data.length"
      ></rank-list-item>
    </div>
    <div class="space"></div>
    <bottom-opt-button @help="clickHelp" @add="addRank"></bottom-opt-button>
  </div>
</template>
<script>
import FireScroll from '../../components/fire-scroll.vue'
import RankListItem from '../../components/rank-list-item.vue'
import BottomOptButton from '../../components/bottom-opt-button'
import API from '../../config/api'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    ...mapActions(['assignRankInfo']),

    //点击职级之后的跳转
    selectRank(item) {
      this.$router.push({
        path: '/rank/rankmanagedetail',
        query: {
          rankId: item.id,
          name: item.name
        }
      })
    },

    //添加职级
    addRank() {
      this.$router.push({ path: '/rank/rankmanagedetail' })
    },

    clickHelp() {
      this.$router.push({ path: '/help', query: { helpType: 'rank' } })
    }
  },
  components: {
    FireScroll,
    RankListItem,
    BottomOptButton
  },
  created() {
    this.assignRankInfo({ actionCount: '0' })
    API.listShopRoles({
      opEntityId: sessionStorage.getItem('entityId')
    }).then(data => {
      this.data = data
    })
  }
}
</script>

<style lang="scss" scoped>
.rank-management {
  margin-top: 72px;
  height: 100%;
  .content-wrapper {
    overflow: hidden;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .space {
      height: 160px;
  }
}
</style>


