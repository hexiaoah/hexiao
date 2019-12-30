<template>
    <div class="container">
        <Header divider :back="backShare">获赠记录</Header>
        <div class="content">
            <div class="title">
                <span>试用时间获赠记录</span>
            </div>
            <ul class="history">
                <li v-for="(item,index) of list" :key="index" class="item">
                    <span>{{item.time}}</span>
                    <span>{{item.award}}</span>
                    <span>{{item.desc}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Api from '../../api'
import Header from '../../components/header'
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    backShare() {
      this.$router.push('/share')
    }
  },
  components: { Header },
  created() {
    let entity_id = null
    if (window.tdfire && window.tdfire.getEntityId) {
      entity_id = window.tdfire.getEntityId('')
    }
    if (entity_id) {
      Api.getHistory({ entity_id }).then(data => {
        this.list = data.data || []
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    padding: 200px 60px 0 60px;
    .title {
      text-align: center;
      margin: 0 auto;
      width: 100%;
      & > span {
          font-size: 30px;
          color: #333;
          font-weight: 600;
          position: relative;
        &::before {
          content: ' ';
          position: absolute;
          /* prettier-ignore */
          height: 1PX;
          top: 50%;
          transform: translate3d(-80px, -50%, 0) scaleY(0.5);
          background: #7d7d83;
          width: 50px;
          left: 0;
        }
        &::after {
          content: ' ';
          position: absolute;
          /* prettier-ignore */
          height: 1PX;
          top: 50%;
          transform: translate3d(80px, -50%, 0) scaleY(0.5);
          background: #7d7d83;
          width: 50px;
          right: 0;
        }
      }
    }
    .history {
      font-size: 24px;
      margin-top: 49px;
      .item {
        margin-bottom: 23px;
        display: flex;
        align-items: center;
        & > span {
          &:nth-child(1) {
            width: 300px;
          }
          &:nth-child(2) {
            width: 100px;
            text-align: center;
          }
          &:nth-child(3) {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
