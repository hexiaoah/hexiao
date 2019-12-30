<template>
  <section class="accout-book">
    <!-- search-bar -->
    <search-bar
      class="top-bar"
      @filter-list="filterList"
      @on-focus="inputFocus"
      @on-blur="inputBlur"
      @on-cancel="onCancel"
    ></search-bar>
    <!-- search-items -->
    <div class="search-wrap border-bottom">
      <div class="search-items">
        <div class="item" v-for="item in pageList" :key="item.entityId">
          <div class="top">
            <p class="shop-name">{{ item.shopName }}</p>
            <p class="valid-bln">¥{{ item.validBln | fen2yuan | number }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../config/api'
import SearchBar from '../components/search-bar'

export default {
  name: 'accout-book',
  components: {
    SearchBar
  },
  data() {
    return {
      pageList: [],
      query: {
        chainEntityId: sessionStorage.getItem('entityId') || '',
        keyword: ''
      }
    }
  },
  methods: {
    getShopWalletInfoList() {
      API.getShopWalletInfoList(this.query).then(data => {
        this.pageList = data
      })
    },
    filterList(value) {
      this.query.keyword = value
      this.getShopWalletInfoList()
      console.log(value, 'value')
    },
    inputFocus() {
      console.log('inputFocus')
    },
    inputBlur() {
      console.log('inputBlur')
    },
    onCancel(){
      this.query.keyword = ''
      this.getShopWalletInfoList()
    }
  },
  created() {
    this.getShopWalletInfoList()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/border';
.accout-book {
  overflow-y: scroll;
  .search-wrap {
    background: #ffffff;
    max-height: calc(100% - 88px);
    overflow-y: scroll;
  }
  .search-items {
    padding-left: 30px;
    overflow-y: scroll;
  }
  .item {
    width: 720px;
    padding: 26px 30px 26px 0;

    @extend .border-bottom;
    &:last-child::before {
      border-bottom: none;
    }
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 30px;
      color: #333;
      .shop-name {
        font-size: 30px;
        color: #666666;
        line-height: 40px;
        width: 500px;
      }
      .valid-bln {
        font-size: 30px;
        color: #333333;
        line-height: 40px;
      }
    }
  }
}
</style>
