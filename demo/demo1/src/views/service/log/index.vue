<template>
    <!--日志查询  -->
    <div>
        <OpenTitle :title="pageText.name"></OpenTitle>
        <div class="wrap log">
            <div class="wrap-content">
            <Row :gutter="16">
                <Col span="6">
                    <!--  查询APP -->
                    <div class="left">
                        <OpenLabel :text="row.appinfo" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <br/>
                    <br/>
                    <div class="right">
                        <Select v-model="params.appinfo" :placeholder="row.appinfoPh">
                            <Option  v-for="item in appVoListInfo.appList" :key='item.appId' :value="item.appId">{{item.appName}}</Option>
                        </Select>
                    </div>
                    </Col>
                <Col span="6">
                <div class="row">
                    <!--  请求ID -->
                    <div class="left">
                        <OpenLabel :text="row.requestid" :size="'lg'" :type="0"></OpenLabel>
                    </div>
                    <br/>
                    <br/>
                    <div class="right">
                        <Input v-model="params.requestID"  class="form-input" :placeholder="row.requestidPh"></Input>
                    </div>
                </div>
                </Col>
                <Col span="6">
                <div class="row">
                    <!--  接口名称 -->
                    <div class="left">
                        <OpenLabel :text="row.portname" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <br/>
                    <br/>
                    <div class="right">
                        <Select v-model="params.portName" :placeholder="row.portnamePh" :filterable=true>
                            <Option v-for="item in appVoListInfo.portList" :key="item.id" :value="item.rightsCode" selected="selected">{{item.rightsCode}}</Option>
                        </Select>
                    </div>
                </div>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="6">
                <div class="row">
                    <!-- 起始时间 -->
                    <div class="left">
                        <OpenLabel :text="row.timehorizon" :size="'lg'" :type="1"></OpenLabel>
                    </div>
                    <br/>
                    <br/>
                    <div class="right">
                        <!-- type="daterange"   v-model="params.timeHorizon"   -->
                        <DatePicker v-model="params.startTime"
                                    :clearable = true
                                    @on-clear="claerStartTime"
                                    @on-change="getStartTime"
                                    :options="DatePicker.dataOptions"
                                    :editable=false
                                    format="yyyy-MM-dd HH:mm"
                                    placement="bottom-start"
                                    :placeholder="row.startTime"
                                    style="width: 339px"
                                    type="datetime"></DatePicker>
                    </div>
                </div>
                </Col>
                <Col span="6">
                <div class="row">
                    <!-- 结束时间 -->
                    <div class="left">
                        <OpenLabel :size="'lg'" :type="0"></OpenLabel>
                    </div>
                    <br/>
                    <br/>
                    <div class="right">
                        <DatePicker v-model="params.endTime"
                                    :clearable = true
                                    @on-clear="claerEndTime"
                                    @on-change="getEndTime"
                                    :options="DatePicker1.dataOptions"
                                    :editable=false format="yyyy-MM-dd HH:mm"
                                    placement="bottom-start"
                                    :placeholder="row.endTime"
                                    style="width: 339px"
                                    type="datetime"></DatePicker>
                    </div>
                </div>
                </Col>
            </Row>

                <div class="row">
                    <!--   处理结果 -->
                    <div class="left">
                        <OpenLabel :text="row.dealresult" :size="'lg'" :type="0"></OpenLabel>
                    </div>
                    <div class="right">
                        <!-- 全选 -->
                        <Checkbox
                            :indeterminate="checkBox.indeterminate"
                            :value="checkBox.checkAll"
                            @click.prevent.native="handleCheckAll">{{row.dealresultAll}}</Checkbox>
                        <!-- 选项 -->
                        <CheckboxGroup v-model="checkBox.checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox label="1">{{row.resultsuccess}}</Checkbox>
                            <Checkbox label="2">{{row.resultdefeated}}</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
                <br/>
                <!--  查询APP -->
                <div class="row demand">
                    <Button type="primary" style="font-size: 14px;width:200px" @click="demand">{{row.demand}}</Button>
                </div>
                <br/>
                <!-- 日志信息 -->
            <Row>
                <div class="log-wrap" v-if="isShow || !resultData.logVoList==''">
                    <div class="log-info">
                        <div class="info-title">
                            <!-- 日志信息   表头 -->
                            <span>{{logtableHead.date}}</span>
                            <span>{{logtableHead.action}}</span>
                            <span>{{logtableHead.requestId}}</span>
                            <span>{{logtableHead.url}}</span>
                            <span>{{logtableHead.status}}</span>
                        </div>
                        <!--日志列表  -->
                        <Collapse v-for="(item,index) in resultData.logVoList" :key="item.id" @on-change="getDataInfo($event, item.id)">
                            <Panel :name="item.id1">
                                <!-- <span class="date">{{item.createTimeStr}}</span><span>{{item.moudule}}</span><span class="requestId">{{item.logId}}</span><span>{{item.url}}</span><span class="last">{{item.status | resultFilter}}</span> -->
                                <table class="table-head" style="height:100%">
                                    <tr><td class="date">{{item.createTimeStr}}</td><td>{{item.moudule}}</td><td class="requestId">{{item.logId}}</td><td>{{item.url}}</td><td class="last">{{item.status | resultFilter}}</td>
                                    </tr>
                                </table>
                                <div slot="content">
                                    <p class="port-info">
                                        <span class="request" :class='{"active":item.flag}' @click="request_data(index)">{{pageText.request}}</span>
                                        <i class="line"></i>
                                        <span class="response" :class='{"active":!item.flag}' @click="response_data(index)">{{pageText.response}}</span>
                                    </p>
                                    <div class="request-info" v-show='item.flag'><div class="info-wrap"><pre><code v-html="item.paramsJson1" :class="'cls'+item.id"></code></pre>
                                    </div>
                                    </div>
                                    <div class="response-info" v-show='!item.flag'>
                                        <div class="info-wrap">
                                            <pre><code v-html="item.result1" :class="'cls'+item.id"></code></pre>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <!-- 分页器 -->
                    <div class="page-bar">
                        <Page show-total :total="Number(resultData.totalNum)" :page-size="params.pageSize" :current='params.pageIndex' @on-change="change"></Page>
                    </div>
                </div>
            </Row>
            </div>
        </div>
    </div>
</template>
<script>
import _i from "@/i18n/index";
import { LOCALE } from "@/i18n/index";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";
import "highlight.js/styles/googlecode.css";
import hljs from "highlight.js";
import Vue from 'vue'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

Vue.config.lang = LOCALE();

// import laydate from "layui-laydate";
hljs.highlightCode = function(cls) {
  //自定义highlightCode方法，将只执行一次的逻辑去掉
  let blocks = document.querySelectorAll(".cls" + cls);
  [].forEach.call(blocks, hljs.highlightBlock);
};
let pageData = {
  pageText: {
    name: _i("SERVER.LOG.NAME"),
    nothing: _i("SERVER.LOG.NOTHING"),
    request: _i("SERVER.RIGHT.REQUEST"),
    response: _i("SERVER.RIGHT.RESPONSE")
  },
  row: {
    appinfo: _i("SERVER.LOG.APPINFO"),
    appinfoPh: _i("SERVER.LOG.APPINFOPH"),
    requestid: _i("SERVER.LOG.REQUESTID"),
    requestidPh: _i("SERVER.LOG.REQUESTIDPH"),
    portname: _i("SERVER.LOG.PORTNAME"),
    portnamePh: _i("SERVER.LOG.PORTNAMEPH"),
    timehorizon: _i("SERVER.LOG.TIMEHORIZON"),
    startTime: _i("SERVER.LOG.STARTTIME"),
    endTime: _i("SERVER.LOG.ENDTIME"),
    dealresult: _i("SERVER.LOG.DEALRESULT"),
    dealresultAll: _i("SERVER.LOG.DEALRESULTALL"),
    resultsuccess: _i("SERVER.LOG.RESULTSUCCESS"),
    resultdefeated: _i("SERVER.LOG.RESULTDEFEATED"),
    demand: _i("SERVER.LOG.DEMAND")
  },
  logtableHead: {
    date: _i("SERVER.LOG.DATE"),
    action: _i("SERVER.LOG.ACTION"),
    requestId: _i("SERVER.LOG.REQUESTID1"),
    url: _i("SERVER.LOG.URL"),
    status: _i("SERVER.LOG.STATUS")
  },
  params: {
    appinfo: "",
    requestID: "",
    portName: "",
    startTime: "",
    endTime: "",
    resultCode: "",
    pageIndex: 1,
    pageSize: 10
  },
    beginTime:"",
    finishTime:"",
  checkBox: {
    indeterminate: false,
    checkAll: false,
    checkAllGroup: []
  },
  appVoListInfo: {
    appList: [],
    portList: []
  },
  DatePicker: {
    dataOptions: {
      disabledDate(date) {
        let initdate = new Date() - 7 * 86400000;
        return (
          (date && date.valueOf() < initdate) ||
          (date && date.valueOf() >= new Date())
        );
      }
    }
  },
  DatePicker1: {
    dataOptions: {
      disabledDate(date) {
        let initdate = new Date() - 7 * 86400000;
        return (
          (date && date.valueOf() < initdate) ||
          (date && date.valueOf() >= new Date())
        );
      }
    }
  },
  isShow: false,
  resultData: "",
  resultList: ""
};

export default {
  data() {
    return pageData;
  },
  components: {
    OpenTitle: require("@/components/open-title.vue"),
    OpenLabel: require("@/components/open-label.vue")
    // OpenPage: require("@/components/open-page.vue")
  },
  filters: {
    resultFilter(value) {
      switch (value) {
        case 1:
          return "成功";
        case 2:
          return "失败";
        case 3:
          return "失败";
        default:
          return "HTTP: " + value;
      }
    }
  },
  methods: {
    // 获取开始时间
    getStartTime(data) {
      if (data) {
        let str = data.replace(/-/g, "/");
        let date = new Date(str).getTime();
        if (this.params.endTime != "") {
          if (date > this.params.endTime) {
            this.$Message.warning("开始时间不得大于结束时间");
          }
        }
        this.params.startTime = new Date(date);
        this.beginTime = this.params.startTime.getTime();
      }
    },
    // 获取结束时间
    getEndTime(data) {
      if (data) {
        let str = data.replace(/-/g, "/");
        let date = new Date(str).getTime() + 86399000;
        if (date < this.params.startTime) {
          this.$Message.warning("结束时间不得小于开始时间");
        }
        this.params.endTime = new Date(date);
          this.finishTime = this.params.endTime.getTime();
      }
    },
    // 查询APP列表init
    applicationInit() {
      Requester.get(API.GET_APPS_LIST)
        .then(data => {
          this.appVoListInfo.appList = data.appVoList;
        })
        .catch(e => {
          catchError(e);
        });
    },
    // 接口名称列表init
    portnameInit() {
      Requester.get(API.DEV_AUTHORITY)
        .then(data => {
          var temp = [];
          for (let i = 0; i < data.length; i++) {
            temp = temp.concat(data[i].rightsList);
          }
          this.appVoListInfo.portList = temp;
        })
        .catch(e => {
          catchError(e);
        });
    },

    // 获取查询数据
    getdemandData() {
      let self = this;
      let params = {};
      // resultStatus 全选为0 成功为1 失败为2
      let resultStatus = this.checkBox.checkAllGroup;
      resultStatus.length == 2
        ? (params.resultCode = 0)
        : (params.resultCode = resultStatus[0]);
      params.startTime = this.beginTime;
      params.endTime = this.finishTime;
      params.apiName = this.params.portName;
      params.appId = this.params.appinfo;
      params.logId = this.params.requestID;
      params.pageIndex = this.params.pageIndex;
      params.pageSize = this.params.pageSize;
      Requester.get(API.USER_LOG, { params: params })
        .then(data => {
          // 如果没有数据给出提示
          if (data.totalNum == 0) {
            self.$Message.warning(self.pageText.nothing);
            self.resultData = "";
            return;
          }
          this.resultData = data;
          for (let i = 0; i < data.logVoList.length; i++) {
              console.log("jinkai" + this.resultData.logVoList[i].status);
              if (!(data.logVoList[i].resultJson == null || data.logVoList[i].resultJson == "" || data.logVoList[i].resultJson == undefined)) {
                  this.resultData.logVoList[i].result1 = JSON.parse(
                      data.logVoList[i].resultJson
                  );
              }

              if (!(data.logVoList[i].paramsJson == null || data.logVoList[i].paramsJson == "" || data.logVoList[i].paramsJson == undefined)) {
                  this.resultData.logVoList[i].paramsJson1 = JSON.parse(
                      data.logVoList[i].paramsJson
                  );
              }

              if (!(data.logVoList[i].id == null || data.logVoList[i].id == "" || data.logVoList[i].id == undefined))
                  this.resultData.logVoList[i].id1 = data.logVoList[i].id.toString();

              this.resultData.logVoList[i].flag = true;
          }

        })
        .catch(e => {
          catchError(e);
        });
    },
    // 查询按钮
    demand() {
      if (this.verify()) {
        this.params.pageIndex = 1;
        this.getdemandData();
      }
    },
    // 代码高亮
    getDataInfo(data, id) {
      if (data.length > 0) {
        hljs.highlightCode(id);
      }
    },
    // tab切换
    request_data(id) {
      this.resultData.logVoList[id].flag = true;
      Vue.set(this.resultData.logVoList, id, this.resultData.logVoList[id]);
    },
    response_data(id) {
      this.resultData.logVoList[id].flag = false;
      Vue.set(this.resultData.logVoList, id, this.resultData.logVoList[id]);
    },
    // 分页功能
    change(e) {
      this.params.pageIndex = e;
      this.getdemandData();
    },
    //查询日志 字段验证
    verify() {
      let self = this;
      if (this.params.appinfo == "") {
        this.$Message.warning(self.row.appinfoPh);
        return false;
      }
      if (this.params.portName == "") {
        this.$Message.warning(self.row.portnamePh);
        return false;
      }
      if (this.params.startTime == "") {
        this.$Message.warning(self.row.startTime);
        return false;
      }
      if (this.params.endTime == "") {
        this.$Message.warning(self.row.endTime);
        return false;
      }
      return true;
    },
    claerStartTime() {
      this.params.startTime = "";
    },
    claerEndTime() {
      this.params.endTime = "";
    },
    // 全选按钮
    handleCheckAll() {
      if (this.checkBox.indeterminate) {
        this.checkBox.checkAll = false;
      } else {
        this.checkBox.checkAll = !this.checkBox.checkAll;
      }
      this.checkBox.indeterminate = false;

      if (this.checkBox.checkAll) {
        this.checkBox.checkAllGroup = ["1", "2"];
      } else {
        this.checkBox.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 2) {
        this.checkBox.indeterminate = false;
        this.checkBox.checkAll = true;
      } else if (data.length > 0) {
        this.checkBox.indeterminate = true;
        this.checkBox.checkAll = false;
      } else {
        this.checkBox.indeterminate = false;
        this.checkBox.checkAll = false;
      }
    }
  },
  created() {
    this.applicationInit();
    this.portnameInit();
  },
  mounted() {}
};
</script>


<style lang="scss" scoped="">
.wrap {
  min-width: 446px;
  margin: 0 auto;
  padding: 20px 0 50px;
}
.row {
  margin-bottom: 20px;
}
.demand {
  position: relative;
}
.active {
  color: #1aa2f8;
}
.wrap-content {
  .left {
    display: inline-block;
    width: 103px;
    vertical-align: top;
  }
  .right {
    display: inline-block;
    width: 339px;
    .form-input {
      width: 339px;
    }
  }
  .log-info {
    max-width: 1500px;
    border-bottom: 1px solid #dedede;
    .info-title {
      font-size: 14px;
      color: #333333;
      text-align: center;
      height: 45px;
      line-height: 45px;
      overflow: hidden;
      border-top: 1px solid #dedede;
      border-left: 1px solid #dedede;
      span {
        box-sizing: border-box;
        float: left;
        width: 20%;
        border-right: 1px solid #dedede;
        font-weight:bold;
        background: #efefef;
      }
    }

      .ivu-collapse:nth-child(odd) {
          .table-head {
              tr {
                  background: #f9f9f9 !important;
              }
          }
      }

      .ivu-collapse:nth-child(even) {
      }
  }
  .table-head {
    td {
      width: 20.6%;
      border: 0;
      padding: 0 5px;
      word-break: break-all;
      border-left: 1px solid #d1d1d1;
      &.date {
        width: 17.5%;
      }
      &.requestId {
        width: 20.67%;
      }
      &.last {
        width: 20.45%;
      }
    }
  }
  .page-bar {
    max-width: 1272px;
  }
  .port-info {
    overflow: hidden;
    text-align: center;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #dedede;
    span {
      width: 50%;
      height: 60px;
      float: left;
      line-height: 60px;
      cursor: pointer;
      &.request {
        border-right: 1px solid #dedede;
      }
    }
  }
  .request-info {
    height: 250px;
    font-size: 14px;
  }
  .response-info {
    height: 250px;
  }
  .info-wrap {
    font-size: 14px;
    height: 270px;
    overflow-y: auto;
    margin: 0 auto;
  }
}
</style>
 
