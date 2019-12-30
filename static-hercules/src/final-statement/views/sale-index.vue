<template>
  <section class="sale-add"></section>
</template>

<script>
import API from '../config/api.js'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'

export default {
  name: 'sale-index',
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token') || '',
      page: Router.route.query['redirect'] || 'sale-list'
    }
  },
  methods: {
    init() {
      let path = 'sale-list'
      if (this.page === 'sale-audit') {
        path = 'sale-audit/day'
      }
      this.$router.replace({ path })
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
          console.log('token:', token)
          sessionStorage.setItem('s_tk', this.ticket)
          sessionStorage.setItem('token', token)
          this.token = token
          this.init()
        })
      }
    }
  },
  mounted() {
    // 方便开发环境调试
    if (process.env.NODE_ENV === undefined) {
      let token = Router.route.query['token']
      token && sessionStorage.setItem('token', token)
    }

    this.getToken()
  }
}
</script>

<style lang="scss" scoped>
</style>
