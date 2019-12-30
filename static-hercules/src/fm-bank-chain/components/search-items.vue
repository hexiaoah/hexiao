<template>
  <div class="search-items">
    <div
      class="item border-bottom"
      v-for="(item, index) in itemList"
      :key="item.entityId"
      @click="toCheck(index, item.entityId, item.validBln)"
    >
      <div v-if="item.validBln !== '0'">
        <div class="top">
          <span :class="['un-check', { checked: item.isCheck }]"></span>
          <span>{{ item.shopName }}</span>
        </div>
        <p class="mid">可用余额：¥{{ item.validBln | fen2yuan }}</p>
      </div>
      <div v-else>
        <div class="top disabled">
          <span class="un-check disabledCheck"></span>
          <span class="disabled">{{ item.shopName }}</span>
        </div>
        <p class="mid disabled">暂无可用余额</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-items',
  props: {
    itemList: {
      type: Array,
      default: () => {
        return [
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 1
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 2
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 3
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 4
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 5
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 6
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 7
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 8
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 9
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 10
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 11
          },
          {
            isCheck: false,
            name: '泡泡果火锅连锁分店一店',
            money: '30000',
            id: 12
          }
        ]
      }
    }
  },
  data() {
    return {
      isAllCheck: false
    }
  },
  methods: {
    toCheck(i, id, validBln) {
      if (validBln === '0') {
        return
      }
      this.$emit('on-check', i, id)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.search-items {
  background: #ffffff;
  padding-left: 30px;
  .item {
    padding: 24px 30px 24px 0;
    &:last-child::before {
      border-bottom: none;
    }
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 30px;
      color: #333333;
    }
    .mid {
      padding-left: 70px;
      font-size: 26px;
      color: #666666;
    }
  }
  .un-check {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    border: 1px solid #ccc;
    margin-right: 30px;
  }
  .disabled {
    color: #ccc !important;
  }
  .disabledCheck {
    background-color: #ccc;
  }
  .checked {
    border: none;
    background-image: url('https://assets.2dfire.com/frontend/c1418b70b132bf3e72f1c787ed6f3eeb.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
