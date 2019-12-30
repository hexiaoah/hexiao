<template>
  <div class="content" v-show="shopList.list">
    <div class="main-container">
      <!-- 连锁名称 -->
      <baseTitle :name="brandName" size="lg" class="main-title">
        <template>
          <div class="back-btn" @click="backFn">
            <Icon type="arrow-left-c" size="24" color="#cccccc"/>返回
          </div>
        </template>
      </baseTitle>
      <div class="table-ctr">
        <!-- 搜索框 -->
        <Input
          icon="ios-search"
          placeholder="请输入店铺编码或名称"
          style="width: 180px"
          v-model="searchText"
          @on-enter="searchFn"
          @on-click="searchFn"
        />
        <!-- 可管理门店列表 -->
        <Table no-data-text="当前无可管理门店！" :data="shopList.list" :columns="columns"/>
        <div class="page">
          <!-- 分页器 -->
          <b>共{{totalPage}}页</b>
          <span @click="changePage(1)" :class="{current:requestObj.pageIndex==1}">首页</span>
          <Page
            :total="shopList.total"
            @on-change="paging"
            :page-size="20"
            :current="requestObj.pageIndex"
          />
          <span @click="changePage(totalPage)" :class="{current:requestObj.pageIndex==totalPage}">尾页</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//请求数据
let requestObj = {
  brandEntityId: location.href.split('?')[1].split('=')[1],
  pageIndex: 1,
  pageSize: 20,
  keyWord: '',
}

import getColumns from './columns'
import baseTitle from '@/components/base-title.vue'
import Requester from '@/base/requester'
import API from '@/config/api'
import Cookie from '@2dfire/utils/cookie'
import apiGetUser from '@/config/api_getUser'
export default {
  data() {
    return {
      requestObj: requestObj,
      shopList: {}, //table数据
      columns: getColumns(this), //table格式
      searchText: '', //搜索内容
      brandName:''
    }
  },
  components: {
    baseTitle
  },
  computed: {
    //总页数
    totalPage() {
      return Math.ceil(this.shopList.total / this.requestObj.pageSize)
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    //获取可管理列表
    getShopList(params = this.requestObj) {
      let cookieList = JSON.parse(Cookie.getItem('entrance'))
      //let token = JSON.parse(Cookie.getItem('entrance')).token
      let token = cookieList.token
      params.userId = Cookie.getItem('entranceuserid')||cookieList.userInfo.userId
      const headers = {
        token: token
      }
      Requester.get(API.GET_MANAGE_LIST, {
        headers: headers,
        params: params
      })
        .then(data => {
          this.shopList = data.data
          if(data.data.list&&data.data.list.length){
            this.brandName = data.data.list[0].brandName
          }
        })
        .catch(e => {
          this.$Message.error(e.result.message)
        })
    },
    //监听切换页码
    paging(page) {
      this.requestObj.pageIndex = page
      this.getShopList()
    },
    //搜索
    searchFn() {
      this.requestObj = Object.assign(this.requestObj, {
        pageIndex: 1,
        keyWord: this.searchText
      })
      this.getShopList()
    },
    //返回
    backFn() {
      window.history.go(-1)
    },
    //切店
    goInfo(item) {
      let self = this
      let cookieList = JSON.parse(Cookie.getItem('entrance'))
      //let token = JSON.parse(Cookie.getItem('entrance')).token
      let token = cookieList.token
      //let userId = cookieList.userInfo.userId
      let userId = Cookie.getItem('entranceuserid')||cookieList.userInfo.userId
      const headers = { token: token }
      let params = {
        brandEntityId: item.brandEntityId,
        userId: userId,
        shopEntityId: item.entityId,
        appKey: 200800
      }
      Requester.get(API.CHANGE_SHOP_INLIST, {
        params: params,
        headers: headers
      })
        .then(data => {
          if (data.data) {
            self.getUserInfo(token)
          }
        })
        .catch(e => {
          this.$Message.error(e.result.message)
        })
    },
    //存储用户信息
    getUserInfo(token) {
      apiGetUser(token)
        .then(data => {
          Cookie.setItem('entrance', JSON.stringify(data))
          this.jump('welcome.html')
        })
        .catch(e => {
          this.$Message.error(e.result.message)
        })
    },
    //切换页码
    changePage(page) {
      if (this.requestObj.pageIndex != page) {
        this.requestObj.pageIndex = page
        this.getShopList()
      }
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
    }
  }
  // watch: {
  //   requestObj: {
  //     handler(newVal) {
  //       this.getShopList(newVal)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="less" src="../../theme/default.less">
</style>
<style lang="scss" src="../../style/common.scss">
</style>
<style lang="scss" scoped>
.content {
  padding-top: 70px;
  min-height: 100%;
  background: #f5f5f5;
  padding-bottom: 50px;
}
.main-container {
  width: 82%;
  margin: 0 auto;
  padding-top: 40px;
}
.back-btn {
  position: absolute;
  width: 88px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  background-color: #fff;
  top: 2px;
  left: 0;
  cursor: pointer;
  i {
    margin-right: 10px;
  }
}
.type-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  .title-left {
    display: flex;
    align-items: center;
    h1 {
      font-size: 15px;
      font-weight: bold;
      padding: 0 10px;
      border-left: 3px solid #d83f3f;
    }
    .ivu-btn-circle {
      margin-left: 10px;
      width: 150px;
      background-color: #d83f3f;
      color: #fff;
    }
  }
}
.table-ctr {
  margin-top: 50px;
  padding: 15px;
  background-color: #fff;
  .ivu-input-wrapper {
    margin-bottom: 15px;
    input {
      border: 1px solid #ccc;
    }
  }
  .page {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      font-size: 12px;
      color: #333333;
      cursor: pointer;
      user-select: none;
      &.current {
        color: #d83f3f;
        cursor: not-allowed;
      }
    }
    b {
      font-weight: normal;
      font-size: 12px;
      color: #333333;
      margin-right: 24px;
      user-select: none;
    }
    ul {
      margin: 0 12px;
    }
  }
}
</style>
<style>
.table-ctr td,
.table-ctr th {
  border: none;
}
</style>

