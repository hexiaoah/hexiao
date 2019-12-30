<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->

        <div class="shop-wrap">
            <!--<crumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->
            <div>
                <PassTabs/>
                <div class="pass-content">
                    <!--<component :is="active"></component>-->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import crumbBar from '@/components/layout/crumb-bar'
import Crumb from '@/components/layout/crumb'
import Tabs from '@/components/tabs/tabs'
import PassTabs from './common/tabs'
export default {
  data() {
    return {}
  },
  created() {
//    this.$store.dispatch('leftNav/setNav', 2)
      this.$store.dispatch("leftNav/showShopNav", 4);

  },
  components: {
    Crumb,
    crumbBar,
    Tabs,
    PassTabs
  }
}
</script>
<style lang="less" scoped>
.shop-wrap {
  padding: 30px;
  .pass-content {
    background: #fff;
  }
}
</style>
