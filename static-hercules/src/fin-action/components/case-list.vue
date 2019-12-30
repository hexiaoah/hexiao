<template>
    <div class="case-wrap border-bottom border-top">
        <div v-click="{name:'商户案例banner-'+item.actionName, info:item.pageName}" class="item" v-for="item in lists" :key="item.id" @click="jump(item.jumpUrl)">
           <div class="left">
               <h4 class="title">{{item.actionName}}</h4>
               <p class="content">{{item.remark}}</p>
               <p class="date">{{item.createTime | date('yyyy年MM月dd日')}}</p>
           </div>
           <div class="right">
               <span class="img" :style="{'backgroundImage':'url('+item.bannerUrl+')'}"> </span>
               <!-- <img class="img" :src="item.bannerUrl" alt=""> -->
           </div>
        </div>
        
    </div>
</template>
<script>
import { dateFormat } from '@2dfire/utils/date'

export default {
  props: ['lists'],
  data() {
    return {}
  },
  filters: {
    date(value, reg) {
      if (!value) return ''
      return dateFormat(new Date(value), reg)
    }
  },
  methods: {
    jump(i) {
      window.location.href = i
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
    .case-wrap {
        padding: 0 28px 0 30px;
        .item{
           width: 100%;
           height: 174px;
           padding: 24px 0 22px 0;
           border-bottom: 1PX solid #CCCCCC;
           overflow: hidden;
           display: flex;
           justify-content: space-between;
           &:last-child{
               border-bottom:0;
           }
           .left{
               width: 480px;
               display: flex;
               flex-direction: column;
               .title{
                   font-weight: bold;
                    font-size: 30px;
                    color: #333333;
                    line-height: 40px;
                    margin: 4px 0;
               }
               .content{
                   font-size: 26px;
                   color: #999999;
                   margin: 4px 0;
                   line-height: 38px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap
               }
               .date{
                   font-size: 22px;
                   color: #333333;
                   margin: 4px 0;
                   line-height: 28px;
               }
           }
           .right{
               width: 128px;
               height: 128px;
               .img{
                   display: block;
                   width: 100%;
                   height: 100%;
                   background-position: center;
                   background-size: cover;
                   background-repeat: no-repeat;
               }
           }
        }
    }
</style>
