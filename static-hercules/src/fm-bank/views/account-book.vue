<template>
    <section class="accout-book">
        <div class="query-bar">
            <div class="tabs-wrap border-top border-bottom">
                <div 
                    :class="['tab',{'tab-active':currentKey===item.key}]"
                    v-for="item in navList" 
                    :key="item.id" 
                    @click="switchTab(item.key)"
                >
                    {{item.name}}
                </div>
                <p :class="inkClass"></p>
            </div>
            <div class="query border-bottom">
                <select-tab class="inOut-type" :list="inOutTypes" :selected.sync="query.inOutType" title="收支类型"></select-tab>
            </div>
        </div>

        <scroll-loading  :pageLoad="pageLoad" :pageList.sync="pageList" :query.sync="query">
            <div class="item" v-for="item in pageList" :key="item.id">
                <div class="top clear-fix">
                    <p class="text f-l">{{item.financeType}}</p>
                    <p :class="['value','f-r', 'c-ff0033',{'c-00cc33':item.inOutType===1}]">
                        <span v-if="item.inOutType===1">-</span>
                        <span v-else>+</span>{{item.tradeAmount | fen2yuan |number}}
                    </p>
                </div>
                <div class="mid clear-fix">
                    <p class="text f-l">{{item.tradeTime}}</p>
                    <p class="value f-r">
                        可用余额：¥{{item.availBln | fen2yuan |number}}
                    </p>
                </div>
            </div>
            <div slot="no-results">
                <div class="fixed-center">
                    您现在还没有收支记录
                </div>
            </div>
        </scroll-loading>
    </section>
</template>

<script>
import API from '../config/api'
import { inOutTypes } from '../constants/index'
import SelectTab from '../components/select-tab'

export default {
  name: 'accout-book',
  components: {
    SelectTab
  },
  data() {
    return {
      pageList: [],
      navList: [
        {
          name: '普通交易渠道',
          key: 'common'
        },
        {
          name: '担保交易渠道',
          key: 'assure'
        }
      ],
      currentKey: 'common',
      query: {
        accountType: '009',
        inOutType: 2,
        entityId: sessionStorage.getItem('entityId') || ''
      },
      inOutTypes: [
        {
          code: 2,
          name: '全部'
        },
        ...inOutTypes
      ],
      pageLoad: API.getAccountTradeList
    }
  },
  computed: {
    inkClass() {
      return [
        'tab-ink',
        {
          ['ink-animated-common']: this.currentKey === 'common',
          ['ink-animated-assure']: this.currentKey === 'assure'
        }
      ]
    }
  },

  methods: {
    switchTab(key) {
      key === 'assure'
        ? (this.query.accountType = '007')
        : (this.query.accountType = '009')
      this.currentKey = key
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
    .accout-book {
        padding-top: 158px;
        .query-bar{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 101;
        }
        .query {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 30px;
            background-color: #fff;
            z-index: 11;
        }
        .tabs-wrap{
            position: relative;
            background: #FFFFFF;
            height: 80px;
            display: flex;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            justify-content: space-around;
        }
        .tab{
            color: #333333;
            width: 330px;
            
        }
        .tab-ink{
            position: absolute;
            transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;
            transform-origin: 0 0;
            height: 4px; 
            width: 330px;
            background: #0088FF;
            left: 0;
            bottom: 0px;
        }
        .ink-animated-common{
            transform: translate3d(30px, 0px, 0px);
        }
        .ink-animated-assure{
            transform: translate3d(390px, 0px, 0px);
        }
        
        .tab-active{
            color: #0088FF;
        }
    }
</style>