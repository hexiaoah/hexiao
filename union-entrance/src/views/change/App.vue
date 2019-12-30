<template>
  <div class="change">
    <!-- <div class="header"></div> -->
    <div class="content">
      <baseTitle name="我工作的店家" size='lg' class="main-title"></baseTitle>
      <div class="search-bar">
        <input type="text" v-model.trim="baseData.search" class="search" placeholder="请输入店铺编码或店铺名称">
        <Icon type="ios-search-strong" class="search-btn" @click.native="search"></Icon>
      </div>
      <!--<div class="tab-bar">-->
      <!--<span-->
      <!--v-for="(item,index) in baseData.shopType"-->
      <!--:class="['tab', {'active':index == baseData.num}]"-->
      <!--@click="handleTab(index)"-->
      <!--:key="index">{{item}}-->
      <!--</span>-->
      <!--</div>-->
      <!-- 连锁 -->
      <!-- <div :class="['tab-content', {'tab-none-content':filterlist==''}]"> -->
      <div class="list-wrap">

        <div class="list-content" v-if="baseData.showBrand">
          <div class="type-title">连锁总部</div>
          <Row>
            <Col :sm="12" :md="6" v-for="(item,index) in filterBrandList" :key="index" class="card-col">
            <listCard
              :kind="item.entityTypeName"
              :title="item.entityName"
              :level="item.roleName"
              :status='item.entityCode'
              :image="item.entityType"
              @on-tap="goInfo(item)">
              <template slot="inTitle">
                <span class="status-span" v-if="item.isWorking">工作中</span>
              </template>
              <template slot="inFoot">
                <div class="card-foot"  @click.stop="hasList(item)"  v-if="item.hasManageShop">
                  管理门店
                </div>
              </template>
            </listCard>
            </Col>
          </Row>
          <div style="clear: both"></div>
        </div>

        <div class="list-content" v-if="baseData.showBranch">

          <div class="type-title">分支机构</div>
          <Row>
            <Col :sm="12" :md="6" v-for="(item,index) in filterBranchList" :key="index" class="card-col">
            <listCard
              :kind="item.entityTypeName"
              :title="item.entityName"
              :level="item.roleName"
              :status='item.entityCode'
              :image="item.entityType"
              @on-tap="goInfo(item)">
              <template slot="inTitle">
                <span class="status-span" v-if="item.isWorking">工作中</span>
              </template>
            </listCard>
            </Col>
          </Row>
          <div style="clear: both"></div>
        </div>

        <div class="list-content" v-if="baseData.showShop">
          <div class="type-title">门店</div>
          <Row>
            <Col :sm="12" :md="6" v-for="(item,index) in filterShopList" :key="index" class="card-col">
            <listCard
              :kind="item.entityTypeName"
              :title="item.entityName"
              :level="item.roleName"
              :status='item.entityCode'
              :image="item.entityType"
              @on-tap="goInfo(item)">
              <template slot="inTitle">
                <span class="status-span" v-if="item.isWorking">工作中</span>
              </template>
            </listCard>
            </Col>
          </Row>
          <div style="clear: both"></div>
        </div>

        <div class="list-content" v-if="baseData.showBrandMall">
          <div class="type-title">商圈总部</div>
          <Row>
            <Col :sm="12" :md="6" v-for="(item,index) in filterBrandMallList" :key="index" class="card-col">
            <listCard
              :kind="item.entityTypeName"
              :title="item.entityName"
              :level="item.roleName"
              :status='item.entityCode'
              :image="item.entityType"
              @on-tap="goInfo(item)">
              <template slot="inTitle">
                <span class="status-span" v-if="item.isWorking">工作中</span>
              </template>
            </listCard>
            </Col>
          </Row>
          <div style="clear: both"></div>
        </div>

        <div class="list-content" v-if="baseData.showMall">
          <div class="type-title">商圈</div>
          <Row>
            <Col :sm="12" :md="6" v-for="(item,index) in filterMallList" :key="index" class="card-col">
            <listCard
              :kind="item.entityTypeName"
              :title="item.entityName"
              :level="item.roleName"
              :status='item.entityCode'
              :image="item.entityType"
              @on-tap="goInfo(item)">
              <template slot="inTitle">
                <span class="status-span" v-if="item.isWorking">工作中</span>
              </template>
            </listCard>
            </Col>
          </Row>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Requester from '@/base/requester'
  import API from '@/config/api'
  import Cookie from '@2dfire/utils/cookie'
  //import Object from '@2dfire/utils/object'
  import baseTitle from '@/components/base-title.vue'
  import listCard from '@/components/list-card'
  import apiGetUser from '@/config/api_getUser'

  let baseData = {
    search: '',
    shopType: ['连锁', '单店'],
    num: 0, //默认连锁,
    //  baseShop: [],
    brandList: [], //连锁列表
    shopList: [], //单店列表
    branchList: [], //分支机构列表
    mallList: [], //商场列表
    brandMallList: [], // 商圈总部列表
    showBrand: false,
    showBranch: false,
    showShop: false,
    showMall: false,
    showBrandMall: false,
    entrance: {
      //cookies 信息
      token: '',
      userInfo: {},
      shopInfo: {},
      menuIdList: {},
      loginType: ''
    }
  }

  export default {
    name: 'app',
    data() {
      return {
        baseData
      }
    },
    components: {
      baseTitle,
      listCard
    },
    computed: {
      //    连锁
      filterBrandList: function() {
        let value = this.baseData.search
        return this.baseData.brandList.filter(function(item) {
          return (
            item.entityCode.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
            item.entityName.indexOf(value) >= 0
          )
        })
      },
      //    门店
      filterShopList: function() {
        let value = this.baseData.search
        return this.baseData.shopList.filter(function(item) {
          return (
            item.entityCode.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
            item.entityName.indexOf(value) >= 0
          )
        })
      },
      //    分支机构
      filterBranchList: function() {
        let value = this.baseData.search
        return this.baseData.branchList.filter(function(item) {
          return (
            item.entityCode.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
            item.entityName.indexOf(value) >= 0
          )
        })
      },
      //    商场
      filterMallList: function() {
        let value = this.baseData.search
        return this.baseData.mallList.filter(function(item) {
          return (
            item.entityCode.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
            item.entityName.indexOf(value) >= 0
          )
        })
      },
      // 商圈总部
      filterBrandMallList() {
        let value = this.baseData.search
        return this.baseData.brandMallList.filter(item => {
          return (
            item.entityCode.toUpperCase().indexOf(value.toUpperCase()) >= 0 ||
            item.entityName.indexOf(value) >= 0
          )
        })
      }
    },
    methods: {
      // 获取店铺列表
      getShopsList() {
        let self = this
        let token = JSON.parse(Cookie.getItem('entrance')).token
        self.baseData.entrance.token = token
        const headers = {
          token: token
        }
        Requester.get(API.GET_SHOPS_LIST, { headers: headers })
          .then(data => {
            //          获取门店列表及设置是否展示
            //          连锁
            self.baseData.brandList = data.data.brandList || []
            self.baseData.showBrand = self.baseData.brandList.length > 0
            //          门店
            self.baseData.shopList = data.data.shopList || []
            self.baseData.showShop = self.baseData.shopList.length > 0
            //          门店
            self.baseData.branchList = data.data.branchList || []
            self.baseData.showBranch = self.baseData.branchList.length > 0
            //          门店
            self.baseData.mallList = data.data.mallList || []
            self.baseData.showMall = self.baseData.mallList.length > 0

            self.baseData.brandMallList = data.data.brandMallList || []
            self.baseData.showBrandMall = self.baseData.brandMallList.length > 0
            // 数据处理
            // ...
          })
          .catch(e => {
            this.$Message.error(e.result.message)
          })
      },
      //
      JoinNow(type) {
        this.baseData.state.showModal = true
        this.baseData.modalData.type = type
      },
      // 搜索
      //    search() {},
      // tab 切换
      //    handleTab(index) {
      //      this.baseData.num = index
      //      // 连锁
      //      if (index === 0) {
      //        this.baseData.baseShop = this.baseData.brandList
      //      } else if (index === 1) {
      //        this.baseData.baseShop = this.baseData.shopList
      //      }
      //    },
      // 重新获取用户信息
      getUserInfo(token) {
        var self = this
        apiGetUser(token)
          .then(data => {
            this.baseData.entrance = Object.assign(this.baseData.entrance, data)
            Cookie.setItem('entrance', JSON.stringify(this.baseData.entrance))
            self.jump('welcome.html')
            //this.baseData.entrance = Object.assign(this.baseData.entrance,data)
          })
          .catch(e => {
            console.log(e)
            self.$Message.error(e.result.message)
          })
        //         let self = this
        //         let params = {
        //           menuVersion: 10 //菜单版本号
        //         }
        //         const headers = {
        //           token: token
        //         }
        //         Requester.get(API.GET_USER_INFO, {
        //           params: params,
        //           headers: headers
        //         })
        //           .then(data => {
        //             // 数据处理
        //             let datas = data.data
        //             console.log(datas)
        //             var userInfo = {
        //               name: datas.name,
        //               picture: datas.picture || 'https://assets.2dfire.com/frontend/31648f04d3ceb9ce7b776bb46c729d0c.png',
        //               mobile: datas.mobile,
        //               countryCode: datas.countryCode,
        //               userId: datas.userId,
        //               memberId: datas.membereId
        //             }
        //             if (datas.entityVo) {
        //               var shopInfo = {
        //                 entityId: datas.entityVo.entityId,
        //                 entityName: datas.entityVo.entityName,
        //                 entityType: datas.entityVo.entityType,
        //                 industry: datas.entityVo.industry,
        //                 logo:
        //                 datas.entityVo.logo ||
        //                 'https://assets.2dfire.com/frontend/8ffcc382dc07323a2dc4cb8f2c6ef468.png',
        //                 roleName: ''
        //               }
        //               if (!Object.isEmpty(datas.roleVo)) {
        //                 shopInfo.roleName = datas.roleVo.roleName
        //               }
        //               if (datas.entityVo.entityCode) {
        //                 shopInfo.entityCode = datas.entityVo.entityCode
        //               }
        //             }
        //             if (datas.rootMenuList) {
        //               var menuIdList = []
        //               datas.rootMenuList.forEach(function (item) {
        //                 menuIdList.push(item.menuId)
        //               })
        //             }
        //             // 将登陆有关的信息存入到entrance中
        //             // const entrance = {
        //             //     userInfo: userInfo,
        //             //     shopInfo: shopInfo,
        //             //     menuIdList: menuIdList,
        //             //     loginType: datas.loginType
        //             // }
        //             // Cookie.setItem("entrance", JSON.stringify(entrance));
        //             self.baseData.entrance.userInfo = userInfo
        //             self.baseData.entrance.shopInfo = shopInfo
        //             self.baseData.entrance.menuIdList = menuIdList
        // // 判断为手机号登录
        //             if(datas.loginType == 2){
        //               self.baseData.entrance.loginType = datas.loginType
        //             }else{
        //               self.baseData.entrance.loginType = 1
        //             }
        //             Cookie.setItem('entrance', JSON.stringify(self.baseData.entrance))
        //             self.jump('welcome.html')
        //           })
        //           .catch(e => {
        //             console.log(e)
        //             self.$Message.error(e.result.message)
        //           })
      },
      jump(path) {
        //如果存在entityVo跳转到欢迎页 没有跳转到选店页
        let h = {
          'biz.2dfire-pre.com': 'https://biz.2dfire-pre.com/page/',
          'biz.2dfire.com': 'https://biz.2dfire.com/page/'
        }[location.hostname]
        if (h) {
          location.href = h + path
        } else {
          location.href = path
        }
      },
      // 点击店铺
      goInfo(item) {
        let self = this
        let token = JSON.parse(Cookie.getItem('entrance')).token
        const headers = { token: token }
        let params = {
          entityId: item.entityId,
          userId: item.userId
        }
        Requester.get(API.CHANGE_SHOP, { params: params, headers: headers })
          .then(data => {
            if (data.data) {
              self.getUserInfo(token)
            }
            // 数据处理
            // ...
          })
          .catch(e => {
            this.$Message.error(e.result.message)
          })
      },
      // 提示
      messageFn(text) {
        this.$Message.error(text)
      },
      //查看其下是否有分店
      hasList(item) {
        let token = JSON.parse(Cookie.getItem('entrance')).token
        const headers = { token: token }
        let params = {
          brandEntityId: item.entityId,
          userId: item.userId,
          memberId: item.memberUserId
        }
        Requester.get(API.HAS_SHOP_LIST, { params: params, headers: headers })
          .then(data => {
            if (data.data == 1) {
              Cookie.setItem('entranceuserid', item.userId)
              this.jump('manage.html?brandEntityId=' + item.entityId)
            } else if (data.data == 0) {
              this.$Message.warning('当前没有可管理的门店')
            }
            // 数据处理
            // ...
          })
          .catch(e => {
            this.$Message.error(e.result.message)
          })
      }
    },
    created() {
      this.getShopsList()
    }
  }
</script>
<style lang="less" src="../../theme/default.less">
</style>
<style lang="scss" src="../../style/common.scss">
</style>
<style lang="scss" scoped>
  .main-wrap {
    padding-bottom: 50px;
  }

  .change {
    padding-top: 70px;
    min-height: 100%;
    background: #f5f5f5;
    padding-bottom: 50px;

    .header {
      height: 70px;
      background: #000000;
    }
    .content {
      width: 82%;
      margin: 0 auto;
    }
    .main-title {
      padding: 38px 0;
    }
    .search-bar {
      position: relative;
      width: 48%;
      max-width: 560px;
      height: 50px;
      border-radius: 5px;
      margin: 0 auto;
      .search {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        border: 1px solid #dddddd;
        border-radius: 4px;
        font-size: 14px;
        &::-webkit-input-placeholder {
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
        }
      }
      .search-btn {
        position: absolute;
        z-index: 10;
        cursor: pointer;
        right: 20px;
        top: 12px;
        font-size: 28px;
        color: #616161;
      }
    }

    .card-col {
      padding: 30px 20px 0 0;
    }

    .type-title {
      font-size: 15px;
      font-weight: bold;
      margin-top: 30px;
      padding: 0 10px;
      border-left: 3px solid #d83f3f;
    }

    .list-wrap {
      padding-top: 20px;
    }

    .list-content {
      margin-bottom: 50px;
    }
  }
  // listCard中插槽样式
  .status-span {
    background-color: #49c070;
    font-size: 12px;
    color: #ffffff;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    border-radius: 3px;
    margin-left: 5px;
  }
  .card-foot {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #efefef;
    text-align: center;
    font-size: 14px;
    color: #5599ff;
    user-select: none;
    position: absolute;
    left: 0;
    right: 20px;
    bottom: 0;
  }
</style>
