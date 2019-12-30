<template>
  <div class="result-wrapper">
    <!--申请审核中-->
    <div class="applying-wrapper" v-if="openStatus === 'opening'">
      <i class="applying"></i>
      <p class="title">{{title}}</p>
      <p class="content">{{content}}</p>
      <a href="javascript:void(0)" class="view-material" @click="viewInfo">查看已递交的材料</a>
    </div>
    <!--申请失败-->
    <div class="fail-wrapper" v-if="openStatus === 'open_fail'">
      <i class="fail"></i>
      <p class="title">{{title}}</p>
      <div class="content">
        <p>原因:</p>
        <p>{{content}}</p>
      </div>
      <a href="javascript:void(0)" @click="applyAgain">重新申请</a>
    </div>
    <!--申请成功-->
    <div class="success-wrapper" v-if="openStatus === 'opened'">
      <i class="success"></i>
      <p class="title">{{title}}</p>
      <a href="javascript:void(0)" v-if="content" class="view-material" @click="viewInfo">查看已递交的材料</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApplyResult',
    data() {
      return {
        openStatus: '',
        title: '',
        content: ''
      }
    },
    created(){
      let {openType, openStatus, title, content} = this.$route.query
      this.openType = openType
      this.openStatus = openStatus
      this.title = title
      this.content = content
    },
    methods: {
      applyAgain(){
        let openType = this.$route.query.openType
        let accountStatus = this.$route.query.accountStatus
        if(openType === 'e_payment' && accountStatus !== 'activated'){
          this.$router.push({
            path: '/inactive',
            query: {
              accountStatus: accountStatus
            }
          })
        }
        else{
          this.$router.push({
            path: '/input',
            query: {
              openType: this.openType
            }
          })
        }
      },
      viewInfo(){
        this.$router.push({
          path: '/view',
          query: {
            openType: this.openType
          }
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .box{
    .img{
      display: inline-block;
      width: 25px;
      height: 25px;
      background:white url(https://assets.2dfire.com/frontend/ac8cf450249c33a8aa8cfa19ddd8a977.png) no-repeat center;
      background-size: 10px;
    }
    .title{
      line-height: 25px;
    }
  }
  .result-wrapper{

    i{
      width: 29px;
      height: 29px;
      background-size: cover;
      background-repeat: no-repeat;
      display: block;
      margin: 0 auto 20px;

      &.applying{
        background-image: url(https://assets.2dfire.com/frontend/b5558aafd495fa5f5f26dc44f17ca784.png);
      }

      &.fail{
        background-image: url(https://assets.2dfire.com/frontend/9a3d5a07f4fe2591ec0ac54877b8c1a0.png);
      }

      &.success{
        background-image: url(https://assets.2dfire.com/frontend/2a92d2054af1e46f78aa5163a94a5d77.png);
      }
    }

    .title{
      font-size: 17PX;
      color: #333333;
      letter-spacing: 0;
      line-height: 22px;
      text-align: center;
      margin-bottom: 15px;
    }

    .content{
      font-size: 13PX;
      color: #666666;
      line-height: 18px;
      text-align: center;
      padding: 0 25px 15px;
      letter-spacing: 0;
      word-wrap: break-word;
    }

    .view-material{
      font-size: 13PX;
      color: #0088FF;
      line-height: 18px;
      text-align: center;
      display: block;
    }

    .applying-wrapper{
      padding-top: 183px;
    }

    .fail-wrapper{
      padding-top: 160px;

      .content{
        margin-bottom: 36px;
      }

      a{
        width: 300px;
        height: 44px;
        background: #0088FF;
        border-radius: 6px;
        font-size: 15PX;
        color: #FFFFFF;
        line-height: 44px;
        display: block;
        text-align: center;
        margin: auto;
      }
    }

    .success-wrapper{
      padding-top: 218px;
    }
  }
</style>

