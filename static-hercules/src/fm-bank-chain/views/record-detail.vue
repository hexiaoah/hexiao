<template>
  <section class="record-detail">
    <div class="item-list">
      <div class="notice-wrap border-bottom">
        <span :class="['arrows', { rotate180: isMore }]" @click="showMore"></span>
        <p
          :class="['notice', { 'text-ellipsis': !isMore }]"
        >当钱包余额为0时，无法发起提现。各门店提现的最终状态请于各门店的商户钱包进行查看。</p>
      </div>
    </div>
    <scroll-loading :pageLoad="pageLoad" :pageList.sync="pageList" :query.sync="query">
      <div class="item" v-for="item in pageList" :key="item.id">
        <div class="top clear-fix">
          <p class="text f-l c-333">{{ item.shopName| textOverflow }}</p>
          <p class="text f-r c-333">¥{{ item.applyAmt | fen2yuan | number }}</p>
        </div>
        <div class="mid">
          <p class="text mb-10 c-999">{{ item.status }}</p>
        </div>
      </div>
    </scroll-loading>
  </section>
</template>

<script>
import Router from '@2dfire/utils/router'
import API from '../config/api'

export default {
  name: 'record',
  data() {
    return {
      query: {
        chainEntityId: sessionStorage.getItem('entityId') || '',
        batchId: Router.route.query['batchId'] || ''
      },
      pageLoad: API.getShopWithdrawDetail,
      pageList: [
        // {
        //   id: 111,
        //   name: '柚苏火锅杭州拱墅教工路分店',
        //   money: 30000123,
        //   status: '发起成功'
        // },
        // {
        //   id: 222,
        //   name: '柚苏火锅杭州…区教工路分店',
        //   money: 300020123,
        //   status: '发起失败'
        // }
      ],
      isMore: false
    }
  },
  filters: {
    textOverflow(v) {
      if (v.length >= 13) {
        return v.substring(0, 6) + '...' + v.substring(v.length - 6, v.length)
      }
      return v
    }
  },
  methods: {
    getTotalSettleBill() {
      API.getTotalSettleBill(this.query).then(res => {
        this.total = res
      })
    },
    showMore() {
      this.isMore = !this.isMore
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../styles/border';
@mixin text-ellipsis {
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.record-detail {
  .item-list {
    background: #ffffff;
    @extend .border-bottom;
  }
  .item {
    width: 690px;
    margin: 0 auto;
    padding: 22px 0;
    @extend .border-bottom;
    &:last-child::before {
      border-bottom: none;
    }
    .top {
      font-size: 30px;
      color: #333;
    }
    .mid {
      margin-top: 10px;
      color: #999;
    }
  }
  .notice-wrap {
    background: rgba(255, 221, 0, 0.3);
    padding: 24px 44px 24px 32px;
    font-size: 30px;
    color: #333333;
    letter-spacing: 0;
    line-height: 44px;
    .notice {
      position: relative;
    }
    .arrows {
      position: absolute;
      right: 20px;
      top: 0px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=);
      background-size: 16px 26px;
      background-position: center;
      background-repeat: no-repeat;
      transform: rotate(90deg);
      width: 32px;
      height: 88px;
    }
    .rotate180 {
      transform: rotate(-90deg);
    }
  }
  .text-ellipsis {
    max-width: 650px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
