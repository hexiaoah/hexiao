<template>
<div class="root">
    <BrandSelect @change="changeBrand"/>
    <Tabs :list="list"/>
    <div class="tab-content" v-if="active">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import Tabs from './common/tabs'
import BrandSelect from './common/brandSelect'
import Requester from '@/base/requester'
import API from '@/config/api'
export default {
  data() {
    return {
      active: null,
      list: [
        { name: '传菜方案', value: 'scheme', link: '/pass/scheme' },
        { name: '不出单商品', value: 'notIssue', link: '/pass/notIssue' },
        { name: '套餐中商品分类打印设置', value: 'print', link: '/pass/print' }
      ],
        brandList:[]
    }
  },
  methods: {
    changeBrand(brand) {
      this.active = brand
      if (brand) {
        this.$router.push({ path: '/pass/scheme', query: { plate_entity_id: brand.entityId } })
      }
    },
      async checkDefaultBrand() {
          let self = this;
          try {
              const data = await Requester.get(API.GET_ALL_PLATE)
              if (data.data && data.data.length > 0) {
                  self.brandList = data.data
              }
          } catch(e){}
      }
  },
    watch: {
//            todo 如果包含列表中有默认品牌，则changeBrand为默认品牌
        brandList(newval){
            console.log("brand!!!!",newval)
            const currId = this.$route.query.plate_entity_id

            if(newval && newval.length === 1 && newval[0].canManage){
                this.plateEntityId  = newval[0].entityId
                this.active = this.plateEntityId

                this.$router.push({ path: '/pass/scheme', query: { plate_entity_id: this.plateEntityId } })


            }
//                如果品牌列表长度多余2个，且当前为首次进入（即 url无plateEntityId参数），检查默认品牌
            else if(newval && newval.length > 1 && !this.$route.query.plateEntityId){
                if (!currId) {

//                        url上没有品牌id时，检查是否有默认品牌id
                    if(newval.length > 1){
                        newval.map(item=>{
                            if(item.defaultPlate) {
                                this.active = item.entityId
                                this.$router.push({ path: '/pass/scheme', query: { plate_entity_id: item.entityId } })
                            }
                        })
                    }
                }
            }
        },
    },
  created() {
      this.checkDefaultBrand()
    this.$store.dispatch('leftNav/setNav', 7)
  },
  components: {
    Tabs,
    BrandSelect
  }
}
</script>

<style scoped lang="less">
.root {
  .tab-content {
    margin: 0 30px;
    background: #fff;
  }
}
</style>
