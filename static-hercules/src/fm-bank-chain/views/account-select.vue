<template>
  <section class="accout-select">
    <!-- search-bar -->
    <!-- @on-blur="onCancel" -->
    <search-bar ref="searchBar" @filter-list="filterList" @on-focus="inputFocus" @on-cancel="onCancel"></search-bar>
    <!-- 筛选列表 -->
    <search-items v-if="isSearch" :item-list="itemList2" @on-check="onCheck2" class="main-items"></search-items>
    <!-- 首页列表 -->
    <search-items v-show="!isSearch" :item-list="itemList1" @on-check="onCheck" class="main-items"></search-items>
    <!-- footer-bar -->
    <div v-show="isShowBar" class="footer-wrap border-top">
     <div v-show="!isSearch" class="footer">
        <div class="left" @click="allCheck">
          <span :class="['un-check', { checked: isAllCheck }]"></span>
          <span>全选</span>
        </div>
        <Btn
          class="righ"
          type="apply2"
          :disabled="!Boolean(total)"
          @click="allow"
          >
          去提现{{ total }}
        </Btn>
     </div>
     <!--  -->
      <div v-show="isSearch" class="footer">
        <div class="left" @click="allSearchCheck">
          <span :class="['un-check', { checked: isAllSearchCheck }]"></span>
          <span>全选筛选结果</span>
        </div>
        <Btn class="right" type="apply2" @click="onSearchBarCancel">确认</Btn>
      </div>
      
    </div>
    <Loading v-if="isLoading"></Loading>
  </section>
</template>

<script>
import API from '../config/api'
import Btn from '../components/fire-button'
import Loading from '../components/loading'
import SearchBar from '../components/search-bar'
import SearchItems from '../components/search-items'

export default {
  name: 'accout-select',
  data() {
    return {
      isAllCheck: true,
      isAllSearchCheck: false,
      isSearch: false,
      isShowBar: true,
      total: '',
      isBack: false,
      isLoading: true,
      isDisabled: false,
      query: {
        chainEntityId: sessionStorage.getItem('entityId') || '',
        keyword: ''
      },
      itemList1: [], // 首页列表
      itemList2: [] //筛选列表
    }
  },
  components: {
    Btn,
    SearchItems,
    SearchBar,
    Loading
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'withdrawDeposit') {
        vm.isBack = true,
        vm.isOver()
      }
    })
  },
  methods: {
    getShopWalletInfoList(isSearch) {
      API.getShopWalletInfoList(this.query)
        .then(data => {
          if (isSearch) {
            this.getSearchData(data)
          } else {
            this.getInitData(data)
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    filterList(value) {
      this.isSearch = true
      this.query.keyword = value
      this.getShopWalletInfoList(true)
    },
    inputFocus() {
      console.log('inputFocus')
    },
    onSearchBarCancel(){
      this.$refs['searchBar'].onCancel()
    },
    getSearchData(data) {
      let arr = []
      data.forEach(e1 => {
        this.itemList1.forEach(e2 => {
          if (e1.entityId === e2.entityId) {
            arr.push(e2)
          }
        })
      })
      // 浅拷贝
      this.itemList2 = arr
      if (arr.length) {
        this.isAllSearchCheck = arr.every(item => item.isCheck === true)
      }else{
        this.isAllSearchCheck = false
      }
    },
    getInitData(data) {
      // isBack 是否是从提现页面返回回来的
      if (this.isBack) {
        let newArr = data.map(item => ({
          isCheck: false,
          entityId: item.entityId,
          validBln: item.validBln,
          shopName: item.shopName
        }))
        const checkedArr = JSON.parse(sessionStorage.getItem('targetArr')) || ''
        checkedArr.forEach(item1 => {
          newArr.forEach(item2 => {
            if (item1.entityId === item2.entityId || item2.validBln === '0') {
              item2.isCheck = true
            }
          })
        })
        this.itemList1 = newArr
        this.getTotal()
      } else {
        let newArr = data.map(item => ({
          isCheck: true,
          entityId: item.entityId,
          validBln: item.validBln,
          shopName: item.shopName
        }))
        this.itemList1 = newArr
        const disabledArr = this.itemList1.filter(item => item.validBln === '0')
        const totalLength = data.length - disabledArr.length
        if (totalLength) {
          this.total = `(${totalLength})` || ''
        }else{
          this.isShowBar = false
        }
      }
    },
    getTotal() {
      const cheakArr = this.itemList1.filter(item => item.isCheck === true)
      const disabledArr = this.itemList1.filter(item => item.validBln === '0')
      const totalLength = cheakArr.length - disabledArr.length
      this.total = totalLength ? `(${totalLength})` : ''
    },
    onCancel() {
      this.isSearch = false
      this.isAllCheck = this.itemList1.every(item => item.isCheck === true)
      this.getTotal()
    },
    isOver(isTrue) {
      if (isTrue) {
        this.isAllCheck = this.itemList1.every(item => item.isCheck === true)
      } else {
        this.isAllCheck = false
      }
      this.getTotal()
    },
    isSearchOver(isTrue) {
      if (isTrue) {
        this.isAllSearchCheck = this.itemList2.every(
          item => item.isCheck === true
        )
      } else {
        this.isAllSearchCheck = false
      }
    },
    onCheck(i) {
      this.itemList1[i].isCheck = !this.itemList1[i].isCheck
      this.isOver(this.itemList1[i].isCheck)
    },
    onCheck2(i, id) {
      this.itemList2[i].isCheck = !this.itemList2[i].isCheck
      this.isSearchOver(this.itemList2[i].isCheck)
      //   const index = this.itemList1.findIndex(e => e.entityId === id)
      //   this.isOver(this.itemList1[i].isCheck)
    },
    // 全选
    allCheck() {
      this.isAllCheck = !this.isAllCheck
      let isTrue = this.isAllCheck
      if (isTrue) {
        this.itemList1 = this.itemList1.map(item => ({
          isCheck: true,
          entityId: item.entityId,
          validBln: item.validBln,
          shopName: item.shopName
        }))
        const disabledArr = this.itemList1.filter(item => item.validBln === '0')
        const totalLength = this.itemList1.length - disabledArr.length
        this.total = `(${totalLength})`
      } else {
        this.itemList1.forEach(item => {
          // 过滤掉余额为0的
          if (item.validBln !== '0') {
            item.isCheck = false
          }
        })
        this.total = ''
      }
    },
    //全选筛选结果
    allSearchCheck() {
      this.isAllSearchCheck = !this.isAllSearchCheck
      let isTrue = this.isAllSearchCheck
      if (isTrue) {
        this.itemList2.forEach(item => {
          item.isCheck = true
        })
      } else {
        this.itemList2.forEach(item => {
          if (item.validBln !== '0') {
            item.isCheck = false
          }
        })
      }
    },
    statChainPreApplyInfo(arr) {
      API.statChainPreApplyInfo({
        chainEntityId: this.query.chainEntityId,
        entityIds: arr
      }).then(data => {
        const { totalAmt, totalNum } = data
        this.$router.push({
          path: '/withdraw-deposit',
          query: {
            totalAmt,
            totalNum
          }
        })
      })
    },
    // 去提现
    allow() {
      let arr = []
      let arr2 = []
      this.itemList1.forEach(item => {
        if (item.isCheck && item.validBln !== '0') {
          arr.push(item.entityId)
          arr2.push({
            entityId: item.entityId,
            shopName: item.shopName,
            amount: item.validBln
          })
        }
      })
      sessionStorage.setItem('targetArr', JSON.stringify(arr2))
      this.statChainPreApplyInfo(arr)
    }
  },
  created() {
    this.getShopWalletInfoList()
  }
}
</script>

<style lang="scss" scoped>
.accout-select {
  .main-items {
    max-height: calc(100% - 204px);
    overflow-y: scroll;
  }
  .footer-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 10;
    .footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 116px;
      padding: 0 30px;
    }
    .left {
      display: flex;
      align-items: center;
      font-size: 30px;
      color: #0091ff;
    }
    .un-check {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      border: 1px solid #ccc;
      margin-right: 20px;
    }
    .checked {
      border: none;
      background-image: url('https://assets.2dfire.com/frontend/c1418b70b132bf3e72f1c787ed6f3eeb.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>
