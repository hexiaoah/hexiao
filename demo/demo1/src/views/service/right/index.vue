
<template>
 <!-- <div>权限列表</div> -->
  <div>
     <OpenTitle :title="pageText.name"></OpenTitle>

     <div class="wrap business" style="margin-bottom:20px">
        <Collapse class="collapse1" accordion v-for="(item,index) in baseList" :key="item.id" style="margin-bottom:10px;">
          <Panel name="1" class="panel1">
            <span class="list-title">{{item.group.groupName}}</span>
              <div slot="content">
                  <Collapse class="collapse2" accordion v-for="(secondItem,index1) in item.rightsList" :key="secondItem.id" @on-change="getShopInfo( $event, 1,secondItem.id,secondItem,index,index1)">
                      <Panel :name="secondItem.id1" class="panel2">
                          <span class="panel-left">{{secondItem.rightsCode}}</span> <span class="panel-right">{{secondItem.rightsName}}</span>
                          <div slot="content" class="panel3">
                             <div class="panel3-top" style="margin:8px">
                                 <div class="shopInfo-wrap" style="position:relative;" v-if="secondItem.shopList.shopVoList !=''">
                                   <Spin size="large" fix v-if="secondItem.loading"></Spin>
                                 <table class="app-table">    <!-- 授权店铺表头 -->
                                  <thead style="background-color: #f8f8f9;">
                                    <th>{{shoptableHead.shopNo}}</th>
                                    <th>{{shoptableHead.shopId}}</th>
                                    <th>{{shoptableHead.shopName}}</th>
                                    <th>{{shoptableHead.brandId}}</th>
                                    <th>{{shoptableHead.brandName}}</th>
                                    <th>{{shoptableHead.contact}}</th>
                                    <th>{{shoptableHead.phone}}</th>
                                  </thead>
                                  <tbody>
                                  <tr v-for="shopItem in secondItem.shopList.shopVoList" :key="shopItem.id">
                                    <td>{{shopItem.code}}</td>
                                    <td>{{shopItem.entityId}}</td>
                                    <td>{{shopItem.name}}</td>
                                    <td>{{shopItem.brandId}}</td>
                                    <td>{{shopItem.brandName}}</td>
                                    <td>{{shopItem.linkman}}</td>
                                    <td>{{shopItem.phone1}}</td>
                                  </tr>
                                  </tbody>
                              </table>
                                 <!-- 分页器 -->
                              <div class="page-bar" style="margin-top:15px">
                                  <!-- {{secondItem.shopList.totalNum}} -->
                                <Page :total="secondItem.shopList.totalNum" size='small' :page-size=5 :pageTotal="5" @on-change="change(secondItem.id1,$event,secondItem.id,secondItem,index,index1)"></Page>
                              </div>
                              </div>
                             </div>
                             <div class="panel3-bottom" style="margin:8px">
                               <p class="option">
                                 <span :class='{"active":secondItem.status}' @click="request_arg(index,index1)">{{pageText.request}}</span>
                                 <i class="line"></i>
                                 <span :class='{"active":!secondItem.status}' @click="response_arg(index,index1)">{{pageText.response}}</span>
                               </p>
                               <div class="port-info">
                                <!-- 请求参数 表头 -->
                                  <zk-table
                                    v-show="secondItem.status"
                                    sum-text="sum"
                                    index-text="#"
                                    :data="baseList[index].rightsList[index1].inField"
                                    :columns="columns"
                                    :border="true"
                                    :show-header="true"
                                    :show-row-hover="true"
                                    :tree-type="true"
                                    :is-fold="true"
                                    :expand-type="false"
                                    :selection-type="false">
                                     <template slot="require" slot-scope="scope">
                                    {{ translateMap[scope.row.require] || scope.row.require }}
                                    </template>
                                     <template slot="example" slot-scope="scope">
                                         <p v-html="translateMapTrim(scope.row.example)"></p>
                                    </template>
                                     <template slot="memo" slot-scope="scope">
                                         <p v-html="translateMapTrim(scope.row.memo)"></p>
                                    </template>
                                  </zk-table>
                               </div>
                               <!-- 返回参数 表头 -->
                                <div class="port-info" v-show='!secondItem.status'>
                                    <zk-table
                                        v-show="!secondItem.status"
                                        sum-text="sum"
                                        index-text="#"
                                        :data="baseList[index].rightsList[index1].outField"
                                        :columns="outColumns"
                                        :border="true"
                                        :show-header="true"
                                        :show-row-hover="true"
                                        :tree-type="true"
                                        :is-fold="true"
                                        :expand-type="false"
                                        :selection-type="false">
                                        <template slot="example" slot-scope="scope">
                                         <p v-html="translateMapTrim(scope.row.example)"></p>
                                        </template>
                                        <template slot="memo" slot-scope="scope">
                                         <p v-html="translateMapTrim(scope.row.memo)"></p>
                                        </template>
                                   </zk-table>
                               </div>
                             </div>
                          </div>
                      </Panel>
                  </Collapse>
              </div>
          </Panel>
      </Collapse>
     </div>
  </div>
</template>
<script>
import _i from "@/i18n/index";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";
import "highlight.js/styles/googlecode.css";
import hljs from "highlight.js";
import { LANG } from "apiConfig";
// 示例代码高亮
hljs.highlightCode = function(cls) {
  //自定义highlightCode方法，将只执行一次的逻辑去掉
  let blocks = document.querySelectorAll(".cls" + cls);
  [].forEach.call(blocks, hljs.highlightBlock);
};
let pageData = {
  pageText: {
    name: _i("SERVER.RIGHT.NAME"),
    portExplain: _i("SERVER.RIGHT.PORTEXPLAIN"),
    request: _i("SERVER.RIGHT.REQUEST"),
    response: _i("SERVER.RIGHT.RESPONSE")
  },
  shoptableHead: {
    shopNo: _i("SERVER.RIGHT.SHOPTABLEHEAD.SHOPNO"),
    shopId: _i("SERVER.RIGHT.SHOPTABLEHEAD.SHOPID"),
    shopName: _i("SERVER.RIGHT.SHOPTABLEHEAD.SHOPNAME"),
    brandId: _i("SERVER.RIGHT.SHOPTABLEHEAD.BRANDID"),
    brandName: _i("SERVER.RIGHT.SHOPTABLEHEAD.BRANDNAME"),
    contact: _i("SERVER.RIGHT.SHOPTABLEHEAD.CONTACT"),
    phone: _i("SERVER.RIGHT.SHOPTABLEHEAD.PHONE")
  },
  porttableHead: {
    portname: _i("SERVER.RIGHT.PORTTABLEHEAD.PORTNAME"),
    ismust: _i("SERVER.RIGHT.PORTTABLEHEAD.ISMUST"),
    type: _i("SERVER.RIGHT.PORTTABLEHEAD.TYPE"),
    demo: _i("SERVER.RIGHT.PORTTABLEHEAD.DEMO"),
    memo: _i("SERVER.RIGHT.PORTTABLEHEAD.MEMO")
  },
  baseList: "",
  shopList: "",
  translateMap: "",
  rightInput :[],
  rightOutput:[],
columns: [
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.PORTNAME"),
    prop: 'requestName',
    width:'220px'
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.ISMUST"),
    prop: 'require',
    width:'110px',
    type: 'template',
    template: 'require',
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.TYPE"),
    prop: 'parameterType',
    width:'210px'
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.DEMO"),
    prop: 'example',
    type: 'template',
    template: 'example',
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.MEMO"),
    prop: 'memo',
    type: 'template',
    template: 'memo',
    },
],
outColumns: [
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.PORTNAME"),
    prop: 'shortName',
    width:'220px'
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.TYPE"),
    prop: 'returnType',
    width:'200px'
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.DEMO"),
    prop: 'example',
    type: 'template',
    template: 'example',
    },
    {
    label: _i("SERVER.RIGHT.PORTTABLEHEAD.MEMO"),
    prop: 'memo',
    type: 'template',
    template: 'memo',
    },
],
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
    init() {
      let self = this;
      let params = {
          lang: LANG
      };
      Requester.get(API.API_TRANSLATION, { params: params})
          .then(data => {
              self.translateMap = data
          });
      Requester.get(API.DEV_AUTHORITY)
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].rightsList.length; j++) {
              data[i].rightsList[j].shopList = {};
              data[i].rightsList[j].inField = [];
              data[i].rightsList[j].outField = [];

              data[i].rightsList[j].id1 = data[i].rightsList[j].id.toString();
              data[i].rightsList[j].status = true;
              data[i].rightsList[j].loading = true;
            }
          }
          self.baseList = data;

          self.baseList.forEach( item => {
               item.group.groupName = this.translateMap[item.group.groupName] || item.group.groupName;
               item.rightsList.forEach(right => {
                   right.rightsName = this.translateMap[right.rightsName] || right.rightsName;
               })
            })

        })
        .catch(e => {
          if (e.result.resultCode == 907) {
          } else {
            catchError(e);
          }
        });
    },
    getShopInfo(e, pageNum, id, item, index, index1) {
      if (e.length > 0) {
        hljs.highlightCode(id);
        let self = this;
        let params = {
          rightId: id,
          pageIndex: pageNum
        };
        Requester.get(API.SHOP_LIST, { params: params })
          .then(data => {
              self.baseList[index].rightsList[index1].inField = [];
              self.baseList[index].rightsList[index1].outField = [];
              self.rightInput = [];
              self.rightOutput = [];
              item.shopList = data;
              self.baseList[index].rightsList[index1].loading = false;
              self.baseList[index].rightsList[index1].inField = data.requestSetting || [];
              self.baseList[index].rightsList[index1].outField = data.returnSetting || [];
              self.rightOutput = data.returnSetting || [];
              self.rightInput = data.requestSetting || [];

          })
          .catch(e => {
            catchError(e);
          });
      }
    },
    translateMapTrim(str){
        if(str){
            let key = str.replace(/(^\s*)|(\s*$)/g, "").toString();
            return this.translateMap[key] || str
        }else{
            return ''
        }
    },
    // 分页
    change(e, pageNum, id, secondItem, index, index1) {
      this.getShopInfo(e, pageNum, id, secondItem, index, index1);
    },

    // tab栏切换
    request_arg(id, id1) {
      this.baseList[id].rightsList[id1].status = true;
    },
    response_arg(id, id1) {
      this.baseList[id].rightsList[id1].status = false;
    },
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.business {
  padding-top: 18px;
  .panel1 {
    .list-title {
      font-weight: bold;
      font-size: 16px;
      color: #333333;
    }
  }
  .panel2 {
    .panel-left {
      display: inline-block;
      width: 35%;
      border-right: 1px solid #dedede;
      font-size:15px;
    }
    .panel-right {
      display: inline-block;
      padding-left: 30px;
      font-size:15px;
    }
  }

  .panel3 {
  }
  .panel3-top {
    font-size: 14px;
    color: #333333;
    .port-explain {
      overflow: hidden;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid #dedede;
      border-top: 0;
      span {
        float: left;
      }
      .left {
        width: 14.28%;
        border-right: 1px solid #dedede;
      }
      .right {
        width: 85%;
      }
    }
    .app-table {
      th {
        border-top: 0;
        height: 60px;
        width: 14%;
      }
      td {
        height: 60px;
        font-size: 12px;
        width: 14%;
      }
    }
  }
  .panel3-bottom {
    .option {
      height: 60px;
      line-height: 60px;
      font-weight: bold;
      font-size: 16px;
      color: #333333;
      span {
        cursor: pointer;
      }
      .line {
        width: 0;
        height: 14px;
        border-right: 1px solid #dedede;
        margin: 12px;
      }
      .active {
        color: #1aa2f8;
      }
    }
    .port-info {
    }
    .request {
      th {
        height: 60px;
        width: 20%;
        border-bottom: 0;
      }
      tr {
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      td {
        height: 60px;
        width: 20%;
      }
    }
    .response {
      overflow: hidden;
      border: 1px solid #dedede;
      border-bottom: 0;
      max-height: 250px;
      box-sizing: border-box;
      padding: 0 15px;
    }
    .info-wrap {
      font-size: 14px;
      max-height: 250px;
      overflow-y: scroll;
      margin: 0 auto;
      pre {
        margin: 0;
      }
      code {
        padding: 0;
      }
    }
  }
}
</style>
