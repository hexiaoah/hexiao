<template>
  <section class="sale-audit-shop">
    <div class="query">
      <f-view class="month">
        <select-tab
          defaultText="请选择时间"
          :text="datePicker.value|date('yyyy.MM')"
          @click="showDatePicker"
          :upward="datePicker.visible"
        ></select-tab>
      </f-view>
      <f-view class="shop-type clear-fix">
        <f-select class="shop-status" v-model="radioValue" :options="options"></f-select>
        <screen class="floor" @click="showDialog" v-if="isShowFilter"></screen>
      </f-view>
    </div>
    <f-view class="table-grid">
      <div class="title">
        <p class="name">销售数据审核</p>
        <p class="total">合计(笔/元)：{{totalCount|money(0)}}/{{totalAmount|money}}</p>
      </div>
      <div class="table">
        <table class="table-inner" border="0" cellspacing="0" cellpadding="0">
          <thead class="header">
            <tr>
              <th>日期</th>
              <th>系统数据
                <br>（笔/元）
              </th>
              <th>上报数据
                <br>（笔/元）
              </th>
              <th>审核结果
                <br>（笔/元）
              </th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody class="body">
            <tr
              v-for="(list,index) in auditByShops"
              :key="index"
              @click="pathTo(list.dataStatus,list.buttonStatus,list.time)"
            >
              <td>{{list.time|date('MM.dd')}}</td>
              <td>{{list.systenCount|money(0)}}/{{list.systemAmount|money}}</td>
              <td>{{list.userCount|money(0)}}/{{list.userAmount|money}}</td>
              <td>{{list.auditCount|money(0)}}/{{list.auditAmount|money}}</td>
              <td>
                <span :class="saleStatusClass(list.dataStatus)">{{list.dataStatus|saleStatusStr}}</span>
                <i class="icon-right"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </f-view>
    <div class="action">
      <f-button type="primary" :disabled="auditBtn" @click="confirmAudiBtn">一键审核</f-button>
    </div>
    <f-picker
      v-model="datePicker.value"
      :visible.sync="datePicker.visible"
      type="month"
      textTitle="时间"
      @confirm="handlePickerConfirm"
    ></f-picker>
    <f-slide
      :visible.sync="dialogVisible"
      position="right"
      footer
      @reset="resetDialog"
      @confirm="confirmDialog"
    >
      <ul class="dialog-inner">
        <li class="item floor" v-if="buildingFloorList.length">
          <f-sub-title>楼层</f-sub-title>
          <f-checkbox-group class="checkbox-group" v-model="checkedfloor">
            <f-checkbox-button
              class="checkbox-button base-button"
              v-for="(list,index) in buildingFloorList"
              :key="index"
              :label="list.floorId"
            >{{list.buildingName}}-{{list.floorName}}</f-checkbox-button>
          </f-checkbox-group>
        </li>
        <li class="item" v-if="formatVoList.length">
          <f-sub-title>业态</f-sub-title>
          <f-checkbox-group class="checkbox-group" v-model="checkedformat">
            <f-checkbox-button
              class="checkbox-button base-button"
              v-for="(list,index) in formatVoList"
              :key="index"
              :label="list.formatId"
            >{{list.formatName}}</f-checkbox-button>
          </f-checkbox-group>
        </li>
      </ul>
    </f-slide>
  </section>
</template>

<script>
  import Grid from 'vux/src/components/grid/grid'
  import API from '../config/api'
  export default {
    components: {
      Grid
    },
    name: 'sale-audit-shop',
    data() {
      return {
        dialogVisible: false,
        showTotast: false,
        datePicker: {
          visible: false,
          value:
            Number(sessionStorage.getItem('shop-month')) ||
            new Date().getTime() - 24 * 60 * 60 * 1000
        },
        auditBtn: true,
        radioValue: sessionStorage.getItem('shop-id') || '',
        checkedfloor: JSON.parse(sessionStorage.getItem('shop-floor')) || [],
        checkedformat: JSON.parse(sessionStorage.getItem('shop-format')) || [],
        options: [
          // {
          //   code: '',
          //   name: ''
          // }
        ],
        buildingFloorList: [
          // {
          //   floorId: '',
          //   buildingName: '',
          //   floorName: '',
          //   buildingId: ''
          // }
        ],
        formatVoList: [
          // {
          //   formatId: '',
          //   formatName: ''
          // }
        ],
        auditByShops: [
          // {
          //   auditCount: 0,
          //   systemAmount: 0,
          //   userAmount: 0,
          //   dataStatus: 1,
          //   auditAmount: 0,
          //   userCount: 0,
          //   buttonStatus: 0,
          //   systenCount: 0,
          //   time: 1540368888844
          // }
        ],
        totalAmount: 0,
        totalCount: 0
      }
    },
    methods: {
      resetDialog() {
        this.checkedfloor = []
        this.checkedformat = []
        sessionStorage.setItem('shop-floor', JSON.stringify([]))
        sessionStorage.setItem('shop-format', JSON.stringify([]))
      },
      showDialog() {
        this.dialogVisible = true
      },
      showDatePicker() {
        this.datePicker.visible = true
      },
      handlePickerConfirm(val) {
        this.datePicker.anchor = val
        sessionStorage.setItem('shop-month', this.datePicker.value)
        this.getListData()
      },
      confirmDialog() {
        this.dialogVisible = false
        sessionStorage.setItem('shop-floor', JSON.stringify(this.checkedfloor))
        sessionStorage.setItem('shop-format', JSON.stringify(this.checkedformat))
        this.getShopList()
      },
      // 筛选信息
      getSelInfo() {
        API.getSelInfo().then(data => {
          this.buildingFloorList = data.buildingFloorList
          this.formatVoList = data.formatVoList
        })
      },
      // 门店列表
      getShopList(num) {
        let params = {
          shop_query: {
            floorIds: this.checkedfloor,
            formatIds: this.checkedformat
          }
        }
        API.getShopList(params).then(data => {
          if (data == '') {
            this.$alert('没有满足条件的门店')
            this.options = []
            this.auditByShops = []
            this.radioValue = ''
            return
          }
          let arr = []
          data.forEach(item => {
            arr.push({
              code: item.shopEntityId || '',
              name: item.shopName || ''
            })
          })
          this.options = arr
          if (num) {
            this.getListData()
          } else {
            this.radioValue = arr[0].code || ''
          }
        })
      },
      // 列表
      getListData() {
        let params = {
          audit_query: {
            floorIds: this.checkedfloor,
            formatIds: this.checkedformat,
            time: this.datePicker.value
          },
          shop_entity_id: this.radioValue
        }
        API.auditShopList(params).then(data => {
          this.auditByShops = data.auditByShops
          this.totalAmount = data.totalAmount
          this.totalCount = data.totalCount
          this.auditBtn = !data.auditByShops.some(item => {
            const { dataStatus, buttonStatus, time } = item
            return dataStatus != 2 && buttonStatus == 0
          })
        })
      },
      // 一键审核
      confirmAudiBtn() {
        let auditByShops = this.auditByShops
        let times = []
        auditByShops.forEach(item => {
          const { dataStatus, buttonStatus, time } = item
          if (dataStatus != 2 && buttonStatus == 0) {
            times.push(time)
          }
        })
        let params = {
          times: JSON.stringify(times),
          shop_entity_id: this.radioValue
        }
        this.$confirm({
          type: 'confirm',
          content: '确认后商户将不能再修改数据，确认提交？',
          confirm: () => {
            API.getAuditShop(params).then(data => {
              this.getListData()
            })
          }
        })
      },
      saleStatusClass(status) {
        return {
          0: 'under-report',
          1: 'wait-audit',
          2: 'audited'
        }[status]
      },
      pathTo(status, btn, time) {
        switch (status) {
          case 0:
            this.$router.push({
              path: '/sale-add',
              query: {
                time,
                isedit: btn,
                id: this.radioValue
              }
            })
            break
          case 1:
            this.$router.push({
              path: '/sale-edit',
              query: {
                time,
                isedit: btn,
                id: this.radioValue
              }
            })
            break
          case 2:
            this.$router.push({
              path: '/sale-edit',
              query: {
                time,
                isedit: btn,
                id: this.radioValue
              }
            })
            break
          default:
            console.error('不存在的订单状态')
            break
        }
      }
    },
    mounted() {
      this.getSelInfo()
      if (sessionStorage.getItem('sale-info')) {
        this.$toast('保存成功')
        sessionStorage.removeItem('sale-info')
      }
      if (!sessionStorage.getItem('shop-month')) {
        sessionStorage.setItem('shop-month', this.datePicker.value)
      }
      if (!sessionStorage.getItem('shop-floor')) {
        sessionStorage.setItem('shop-floor', JSON.stringify(this.checkedfloor))
      }
      if (!sessionStorage.getItem('shop-format')) {
        sessionStorage.setItem('shop-format', JSON.stringify(this.checkedformat))
      }
      if (!sessionStorage.getItem('shop-id')) {
        sessionStorage.setItem('shop-id', this.radioValue)
        this.getShopList()
      } else {
        this.getShopList(1)
      }
    },
    watch: {
      radioValue: function(newVal, old) {
        if (newVal != old) {
          sessionStorage.setItem('shop-id', this.radioValue)
          if (newVal != '') {
            this.getListData()
          }
        }
      }
    },
    computed: {
      isShowFilter() {
        if (!this.buildingFloorList.length && !this.formatVoList.length) {
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sale-audit-shop {
    height: 100%;
    margin-top: 72px;

    .query {
      .month {
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
      }

      .shop-type {
        position: relative;
        margin-top: 30px;
        font-size: 30px;
        height: 80px;
        line-height: 80px;

        .shop-status {
          float: left;
        }

        .floor {
          float: right;
        }

        .select-list {
          position: absolute;
          top: 80px;
          left: 0;
          width: 100%;
          z-index: 100;
        }
      }
    }

    .table-grid {
      margin-top: 30px;

      .title {
        padding-right: 30px;
        height: 88px;
        line-height: 88px;
        font-size: 30px;
        border-bottom: 1px solid #ccc;

        .name {
          float: left;
        }

        .total {
          float: right;
          color: #666;
          font-size: 26px;
        }
      }

      .table {
        padding: 30px 0;
        text-align: center;
        white-space: nowrap;
        overflow-x: auto;
        width: calc(100% - 30px);

        .table-inner {
          width: 100%;
          border: 1px solid #ccc;

          .header {
            font-size: 20px;
            background-color: rgba(204, 204, 204, 0.3);

            th {
              height: 60px;
              border-bottom: 1px solid #ccc;
            }
          }

          .body {
            font-size: 22px;

            td {
              height: 60px;
              border-bottom: 1px solid #ccc;
              padding: 0 5px;
            }

            tr:last-child td {
              border-bottom: none;
            }

            .icon-right {
              display: inline-block;
              width: 15px;
              height: 26px;
              margin-left: 20px;
              background: url('https://assets.2dfire.com/frontend/759c714c40dc8148635fbea359ab2e63.png')
                no-repeat;
              background-size: 100%;
              background-position: right center;
              vertical-align: sub;
            }

            .under-report {
              color: #f03;
            }

            .wait-audit {
              color: #f90;
            }

            .audited {
              color: #0c3;
            }
          }
        }
      }
    }

    .action {
      font-size: 30px;
      margin-top: 72px;
      padding: 0 76px;
      margin-bottom: 72px;
    }

    .dialog-inner {
      margin-top: 72px;

      .item {
        margin-top: 52px;

        .checkbox-group {
          width: 680px;
          padding: 24px 30px 0;
          margin-bottom: 0;
          overflow: hidden;

          .base-button {
            overflow: hidden;
          }

          .checkbox-button {
            float: left;
            margin-right: 10px;
            margin-bottom: 20px;

            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
</style>
