<template>
    <div>
        <OpenTitle :title="pageTitle"></OpenTitle>
        <div class="wrap">
            <div class="input-box btn">
                <Input v-model="params.devNm"  :placeholder="devName" style="width: 339px;margin-right: 10px;"
                       @on-enter="getAppList" @on-click="getAppList" class="search-input"></Input>
                <Input v-model="params.appNm"  :placeholder="appName" style="width: 339px"
                       @on-enter="getAppList" @on-click="getAppList" class="search-input"></Input>
                <Button class="search-btn" @click="goCreate" type="primary">{{createBtn}}</Button>
            </div>
            <table class="app-table">
                <thead>
                <th>{{tableHead.numOrder}}</th>
                <th>{{tableHead.devId}}</th>
                <th>{{tableHead.devName}}</th>
                <th>{{tableHead.apply}}</th>
                <th>{{tableHead.operate}}</th>
                </thead>
                <tbody>
                <tr v-for="(item,index) in appList">
                    <td>{{index+1+(params.pageIndex-1)*pageSize}}</td>
                    <td>{{item.appCode}}</td>
                    <td>{{item.developerNm}}</td>
                    <td>{{item.appNm }}</td>
                    <td>
                        <a class="table-btn" @click="showDetail(item.authId,item.devInfoId,item.appInfoId)">{{tableActions.detail}}</a>
                        <a class="table-btn" @click="relieve(item.appCode,item.devInfoId)">{{tableActions.relieve}}</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="page-bar">
                 <Page :total='totalNum' @on-change="change" :page-size='pageSize' :current='params.pageIndex'></Page>
            </div>

        </div>
    </div>
</template>

<script>
import _i from "@/i18n/index";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";

let pageData = {
  pageTitle: _i("SERVICE.DEVELOPER.MERCHANT.TITLE"),
  createBtn: _i("SERVICE.DEVELOPER.MERCHANT.BTN"),
  devName: _i("SERVICE.DEVELOPER.MERCHANT.DEV.NAME"),
  appName: _i("SERVICE.DEVELOPER.MERCHANT.APP.NAME"),

  params: {
    devNm: "",
    appNm: "",
    pageIndex: 1
  },

  appList: [],
  totalNum: 20,
  pageSize: 20,
  tableHead: {
    numOrder: _i("SERVICE.DEVELOPER.MERCHANT.NUMORDER"),
    devId: _i("SERVICE.DEVELOPER.MERCHANT.DEVID"),
    devName: _i("SERVICE.DEVELOPER.MERCHANT.DEV.NAME"),
    apply: _i("SERVICE.DEVELOPER.MERCHANT.APPLY"),
    operate: _i("SERVICE.DEVELOPER.MERCHANT.OPERATE")
  },
  tableActions: {
    detail: _i("SERVICE.DEVELOPER.MERCHANT.DETAIL"),
    relieve: _i("SERVICE.DEVELOPER.MERCHANT.RELIEVE")
  }
};

export default {
  data() {
    return pageData;
  },
  components: {
    OpenTitle: require("@/components/open-title.vue"),
    OpenPage: require("@/components/open-page.vue")
  },
  methods: {
    goCreate() {
      this.params.pageIndex = 1;
      this.getAppList();
    },
    showDetail(auth, dev, app) {
      this.$router.push({
        path: "/server_developer_details",
        query: {
          authId: auth,
          devInfoId: dev,
          appInfoId: app
        }
      });
    },
    // 解除授权
    relieve(appId, devId) {
    var self=this;
      this.$Modal.confirm({
        title: "请注意",
        content: "<p>请确定是否取消授权</p>",
        onOk: () => {
          Requester.get(API.SHOP_RELIEVE, { params: { appId, devId } })
            .then(data => {
              this.$Message.success("成功解除授权");
              if (self.appList.length ==1&&self.params.pageIndex>1) {
                self.params.pageIndex -= 1;
              }
              self.getAppList();
            })
            .catch(e => {
              catchError(e);
            });
        },
        onCancel: () => {}
      });
    },
    getAppList() {
      Requester.get(API.DEV_LIST, { params: this.params })
        .then(data => {
          this.appList = data.shopAppInfoVoList;
          this.totalNum = data.totalNum;
          this.pageSize = data.pageSize;
        })
        .catch(e => {
          catchError(e);
        });
    },
    change(e) {
      this.params.pageIndex = e;
      this.getAppList();
    }
  },
  created() {
    this.getAppList();
  }
};
</script>

<style lang="scss" scoped="">
.wrap {
  margin: 0 auto;

  text-align: center;

  padding: 50px 0;

  overflow: auto;
}

.input-box {
  width: 100%;
  display: inline-block;
  .search-btn {
    margin-left: 5px;
  }
}
.app-table {
  width: 100%;
  margin: 60px auto 0 auto;
  max-width: 1273px;
  th,
  td {
    width: 20%;
    height: 60px;
    padding: 0 5px;
  }

  .table-btn {
    font-size: 12px;
    color: #1aa2f8;
    display: inline-block;
    padding: 0 10px 0 5px;
    border-right: 1px solid #dedede;
    &:last-child {
      padding-right: 0;
      border-right: 0;
    }
  }
}
</style>
