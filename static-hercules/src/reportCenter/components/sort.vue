<template>
  <div class="sort-wrap">
    <p class="title">{{data.title}}</p>
    <div class="list">
      <div class="item" v-for="item in data.list" :key="item.index" @click="jump(item)">
        <img :src="item.img">
        <p>{{item.title}}</p>
        <i v-show="item.lock" class="lock"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { REPORT_URL } from 'apiConfig'
import API from '../config/api'
const report_app_key = '200004'
const device_id = 'dingTalk'

export default {
  props: ['data'],
  methods: {
    jump(item) {
      let u = item.url
      let lock = item.lock
      if (!lock) {
        let url =
          REPORT_URL +
          `rq/single_report.html?appType=AT-DD-005&lang=zh_CN&reportCode=${u}&`
        API.getTicket({
          device_id: device_id,
          to_app_key: report_app_key
        }).then(d => {
          if (d) {
            url = url + `st=${d}`
            window.location.href = url
          } else {
            this.$toast('无效的临时票据')
          }
        })
      } else {
        this.$alert({
          type: 'alert',
          content: '您没有查看该报表的权限，请联系管理员到二维火掌柜上进行添加',
          confirmText: "我知道了"
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sort-wrap {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.title {
  line-height: 30px;
  font-size: 30px;
  padding: 24px 0 24px 30px;
  border-bottom: 1px solid #ccc;
  color: #000;
}
.list {
  padding: 30px 3px 0;
}
.item {
  width: 184px;
  text-align: center;
  display: inline-block;
  position: relative;
  img {
    width: 88px;
    height: 88px;
  }
  p {
    padding: 20px 0 40px;
  }
}
.lock {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  font-size: 30px;
  top: -12px;
  right: 18px;
  color: #fff;
  background: url('https://assets.2dfire.com/frontend/828c313eda68486d3d2f623e43771378.png');
  background-size: cover;
}
</style>

