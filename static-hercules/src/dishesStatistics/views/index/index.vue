<template>
<div :class="noInfo?'no-info':'container'">
    <p v-if="title" class="title">{{title}}</p>
    <div v-for="(item,index) of list" :key="item.id" class="item">
        <div class="item-title">
            <span class="item-icon">{{index+1}}</span>
            <span class="item-name">{{item.name}}</span>
            <span v-if="item.spec" class="item-spec">({{item.spec}})</span>
            <span v-if="item.charge" class="item-charge">加料</span>
        </div>
        <div class="item-count">
            <span>预售</span>
            <span>{{item.num||0}}</span>
            <span>份</span>
        </div>
    </div>
    <div v-if="noInfo" class="no-info-text">
        {{noInfo}}
    </div>
</div>
</template>
<script>
const http = require('base/requester')
const router = require('@2dfire/utils/router')
const API = require('../../config/api')
//http://api.l.whereask.com/presellss/hercules/page/dishesStatistics.html?entity_id=99931266&time=1525017600000&brand_entity_id=#/index
export default {
  data() {
    return {
      params: {
        brand_entity_id: router.route.query['brandEntityId'] || '',
        entity_id: router.route.query['entityId'] || '',
        time: router.route.query['time'] || ''
      },
      list: [],
      noInfo: '',
      title: ''
    }
  },
  methods: {
    getData() {
      let self = this
      http
        .post(API.GET_DATA, self.params, { emulateJSON: true }, false)
        .then(v => {
          self.list = v.menus || []
          if (self.list.length) {
            const date = new Date()
            date.setTime(self.params.time)
            const dateStr = date.toLocaleDateString().replace(/\//g, '-')
            this.title = `${dateStr}商品预售情况统计清单`
          } else {
            self.noInfo = '暂无销售数据'
          }
        })
    }
  },
  components: {},
  created() {
    this.getData()
  }
}
</script>
<style>
html {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.container {
  background: #fff;
  margin: 50px 20px;
  /* prettier-ignore*/
  border-radius: 10PX;
  padding: 16px;
  /* prettier-ignore*/
  font-size: 14PX;
  .title {
    /* prettier-ignore*/
    height: 40PX;
    /* prettier-ignore*/
    font-size: 16PX;
    text-align: center;
    /* prettier-ignore*/
    line-height: 40PX;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item {
    display: flex;
    align-items: center;
    position: relative;
    /* prettier-ignore*/
    height: 50PX;
    &::after {
      content: ' ';
      /* prettier-ignore*/
      height: 1PX;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: #f6f6f6;
      /*transform: scaleY(0.5);*/
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    .item-title {
      display: flex;
      flex: 1;
      align-items: center;
      .item-icon {
        /* prettier-ignore*/
        width: 30PX;
        /* prettier-ignore*/
        height: 30PX;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #e6e6e6;
      }
      .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* prettier-ignore*/
        max-width: 100PX;
        margin: 0 10px;
      }
      .item-spec {
        margin-right: 10px;
      }
      .item-charge {
        color: #fff;
        background: #6991d6;
        padding: 5px 10px;
        border-radius: 10px;
      }
    }
    &:nth-child(1) {
      .item-icon {
        background: #f00;
        color: #fff;
      }
    }
    &:nth-child(2) {
      .item-icon {
        background: #e8644f;
        color: #fff;
      }
    }
    &:nth-child(3) {
      .item-icon {
        background: #f4a69a;
        color: #fff;
      }
    }
    .item-count {
      color: #989898;
      /* prettier-ignore*/
      width: 100PX;
      display: flex;
      justify-content: space-around;
      & > span {
        &:nth-child(2) {
          color: #6991d6;
        }
      }
    }
  }
}
.no-info {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(130, 128, 131, 0.8);
  .no-info-text {
    color: #fff;
    /* prettier-ignore*/
    font-size: 18PX;
  }
}
</style>
