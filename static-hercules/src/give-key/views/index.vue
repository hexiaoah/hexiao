<template>
    <div>
    </div>
</template>
<script>

import API from '../config/api'

export default {
    data() {
        return {
            from: this.$route.query.from,  // 来源--签到:0, banner:1
        }
    },
    methods: {
        getToken() {  // 获取token
            let token = this.$route.query.token
            sessionStorage.setItem('token', encodeURIComponent(token))
            this.getSessionMap()
        },
        getSessionMap() {  // 获取session信息
            let self = this
            API.getSessionMap({
            }).then(data => {
                let entityId = data.entityId
                let industry = data.industry
                sessionStorage.setItem('entityId', entityId)
                if(industry !== 0) {  // 零售店铺
                    self.showConfirm('零售店铺不可进行此操作')
                } else {
                    self.getShopVoByEntityId();
                }
            })
        },
        getShopVoByEntityId() {  // 获取店铺试用情况
            let self = this
            API.getShopVoByEntityId({
                entity_id: sessionStorage.getItem('entityId')
            }).then(data => {
                let trialShop = data.trialShop  // o非试用店， 1为试用店
                if(self.from === 0 || self.from === '0') {  // 跳转到签到页面
                    self.$router.replace({path: './signin', query: {trialShop: trialShop, entityId: sessionStorage.getItem('entityId')}})
                } else { // 跳转到详情页
                    self.$router.replace({path: './details', query: {trialShop: trialShop, entityId: sessionStorage.getItem('entityId')}})
                }
            })
        },
        showConfirm(context) {
            this.$alert({
                content: context,
                confirmText: '我知道了'
            })
        },
    },
    components: {
    },
    created() {
      document.title='签到领激活码';
      this.getToken();
    }
}
</script>
<style lang="scss" scoped>

</style>

