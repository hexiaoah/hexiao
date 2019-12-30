<template>
  <div class="main-wrap">
    <Sort class="sort-item" v-for="item in reportList" :data="item" :key="item.index"></Sort>
  </div>
</template>
<script>
import API from '../../config/api'
import Sort from '../../components/sort'
import Router from '@2dfire/utils/router'

export default {
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: Router.route.query['token'] || '',
      reportList: []
    }
  },
  methods: {
    init() {
      let self = this
      API.getReport().then(d => {
        this.reportList = d
      })
    },
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.init()
      } else {
        API.getToken({
          serviceTicket: this.ticket
        }).then(data => {
          let token = data.dfireToken
          sessionStorage.setItem('s_tk', this.ticket)
          sessionStorage.setItem('token', token)
          this.token = token
          this.init()
        })
      }
    }
  },
  components: {
    Sort
  },
  created() {
    this.getToken()
  }
}
</script>
<style lang="scss">
body {
  background-color: #f6f6f6;
}
</style>
<style lang="scss" scoped>
.main-wrap {
  margin-top: 72px;
}
.sort-item {
  margin-bottom: 30px;
}
</style>

