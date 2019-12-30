<template>
<section class="sale-audit-day">
  <div class="query">
    <f-view class="date">
      <p class="before" @click="changeDate(-1)">前一天</p>
      <select-tab defaultText="请选择时间" :text="datePicker.value|date" @click="showDatePicker" :upward="datePicker.visible"></select-tab>
      <p class="after" @click="changeDate(1)">后一天</p>
    </f-view>
    <f-view class="more" v-if='isShowFilter'>
      <screen @click="showDialog"></screen>
    </f-view>
  </div>
  <f-view class="table-grid">
    <div class="title">销售数据审核</div>
    <div class="table">
      <table class="table-inner" border="0" cellspacing="0" cellpadding="0">
        <thead class="header">
          <tr>
            <th>门店</th>
            <th>系统数据<br>（笔/元）</th>
            <th>上报数据<br>（笔/元）</th>
            <th>审核结果<br>（笔/元）</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="(list,index) in auditByDays" :key="index" @click="pathTo(list.dataStatus,list.buttonStatus,list.shopEntityId)">
            <td>{{list.shopName}}</td>
            <td>{{list.systenCount|money(0)}}/{{list.systemAmount|money}}</td>
            <td>{{list.userCount|money(0)}}/{{list.userAmount|money}}</td>
            <td>{{list.auditCount|money(0)}}/{{list.auditAmount|money}}</td>
            <td><span :class="saleStatusClass(list.dataStatus)">{{list.dataStatus|saleStatusStr}}</span><i class="icon-right"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </f-view>
  <div class="action">
    <f-button type="primary" :disabled="auditBtn" @click="confirmAudiBtn">一键审核</f-button>
  </div>

  <f-picker v-model="datePicker.value" :visible.sync="datePicker.visible" textTitle="时间" @confirm="handlePickerConfirm">
  </f-picker>
  <f-slide :visible.sync="dialogVisible" position="right" footer @reset="resetDialog" @confirm="confirmDialog">
    <ul class="dialog-inner">
      <li class="item floor" v-if='buildingFloorList.length'>
        <f-sub-title>楼层</f-sub-title>
        <f-checkbox-group class="checkbox-group" v-model="checkedfloor">
          <f-checkbox-button class="checkbox-button base-button" v-for="(list,index) in buildingFloorList" :key="index" :label="list.floorId">{{list.buildingName}}-{{list.floorName}}</f-checkbox-button>
        </f-checkbox-group>
      </li>
      <li class="item" v-if='formatVoList.length'>
        <f-sub-title>业态</f-sub-title>
        <f-checkbox-group class="checkbox-group" v-model="checkedformat">
          <f-checkbox-button class="checkbox-button base-button" v-for="(list,index) in formatVoList" :key="index" :label="list.formatId">{{list.formatName}}</f-checkbox-button>
        </f-checkbox-group>
      </li>
    </ul>
  </f-slide>
  <InfiniteLoading @infinite="infiniteHandler" ref="infiniteLoading" spinner="spiral" >
    <span slot="no-more" class="loading">没有更多数据了...</span>
    <span slot="no-results" class="loading">暂无数据...</span>
  </InfiniteLoading>

  <!-- 导出按钮 -->
  <button
    class="export-btn"
    @click="onHandleOpenExportDialog"
  ></button>

  <!-- 导出到邮箱弹窗 -->
  <f-dialog
    :visible.sync="showExportToEmailDialog"
    :btn-disabled="!canSendEmail"
    title="导出数据"
    confirm-text="确认"
    @confirm="onHandleSendEmail"
  >
    <div class="form-item">
      <p class="form-item-label">导出文件类型</p>
      <div class="form-item-value">
        <input
          type="text"
          value="Excel文件（.xlsx，最大导出1000条）"
          class="form-item-control"
          readonly
        >
      </div>
    </div>
    <div class="form-item">
      <p class="form-item-label">导出邮箱地址</p>
      <div class="form-item-value">
        <input
          v-model="email"
          type="text"
          class="form-item-control"
          placeholder="请输入有效的邮箱地址"
          @input="onHandleInputEmailInput"
        >
      </div>
      <p v-show="showEmailError" class="note">邮箱格式不正确，请检查</p>
    </div>
  </f-dialog>
</section>
</template>

<script>
  import tools from '../utils/tools'
  import API from '../config/api'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'sale-audit-day',
    data() {
      return {
        dialogVisible: false,
        showTotast: false,
        checkedfloor: JSON.parse(sessionStorage.getItem('audit-floor')) || [],
        checkedformat: JSON.parse(sessionStorage.getItem('audit-format')) || [],
        datePicker: {
          visible: false,
          value:
            Number(sessionStorage.getItem('audit-day')) ||
            new Date().getTime() - 24 * 60 * 60 * 1000
        },
        auditBtn: true,
        buildingFloorList: [
          // {
          //   floorId: '357170871573512192',
          //   buildingName: 'A幢',
          //   floorName: '1楼',
          //   buildingId: '357170871573544960'
          // }
        ],
        formatVoList: [
          // {
          //   formatId: '1',
          //   formatName: '零售'
          // }
        ],
        auditByDays: [
          // {
          //   auditCount: 1600,
          //   systemAmount: 1600,
          //   shopName: '白鹿原',
          //   userAmount: 1600,
          //   dataStatus: 0,
          //   auditAmount: 160000,
          //   userCount: 1600,
          //   buttonStatus: 0,
          //   systenCount: 1600,
          //   shopEntityId: ''
          // }
        ],
        page: 1,
        busy: false,
        email: '',
        showExportToEmailDialog: false,
        showEmailError: false
      }
    },
    components: {
      InfiniteLoading
    },
    methods: {
      tabClick(name, e) {
        console.log(name)
      },
      showDialog() {
        this.dialogVisible = true
      },
      resetDialog() {
        this.checkedfloor = []
        this.checkedformat = []
        sessionStorage.setItem('audit-floor', JSON.stringify([]))
        sessionStorage.setItem('audit-format', JSON.stringify([]))
      },
      confirmDialog() {
        this.auditBtn = true
        if (this.busy) return
        this.dialogVisible = false
        sessionStorage.setItem('audit-floor', JSON.stringify(this.checkedfloor))
        sessionStorage.setItem('audit-format', JSON.stringify(this.checkedformat))
        this.changeInfinite()
      },
      handlePickerConfirm(val) {
        this.auditBtn = true
        if (this.busy) return
        this.datePicker.anchor = val
        sessionStorage.setItem('audit-day', this.datePicker.value)
        this.changeInfinite()
      },
      showDatePicker() {
        this.datePicker.visible = true
      },
      formatDate(arr, point = '') {
        let result = arr.map(val => {
          return val.value
        })
        return result.join(point)
      },
      changeDate(num) {
        this.auditBtn = true
        if (this.busy) return
        this.datePicker.value = this.datePicker.value + num * 24 * 60 * 60 * 1000
        sessionStorage.setItem('audit-day', this.datePicker.value)
        this.changeInfinite()
      },
      saleStatusClass(status) {
        return {
          0: 'under-report',
          1: 'wait-audit',
          2: 'audited'
        }[status]
      },
      pathTo(status, btn, id) {
        switch (status) {
          case 0:
            this.$router.push({
              path: '/sale-add',
              query: {
                time: this.datePicker.value,
                isedit: btn,
                id: id
              }
            })
            break
          case 1:
            this.$router.push({
              path: '/sale-edit',
              query: {
                time: this.datePicker.value,
                isedit: btn,
                id: id
              }
            })
            break
          case 2:
            this.$router.push({
              path: '/sale-edit',
              query: {
                time: this.datePicker.value,
                isedit: btn,
                id: id
              }
            })
            break
          default:
            console.error('不存在的订单状态')
            break
        }
      },
      // 筛选信息
      getSelInfo() {
        API.getSelInfo().then(data => {
          this.buildingFloorList = data.buildingFloorList
          this.formatVoList = data.formatVoList
        })
      },
      // 审核列表页
      // getList() {
      //   this.page = 1;
      //   let params = {
      //     audit_query: {
      //       floorIds: this.checkedfloor,
      //       formatIds: this.checkedformat,
      //       time: this.datePicker.value,
      //       page: this.page
      //     }
      //   }
      //   API.auditDayList(params).then(data => {
      //     this.auditByDays = data.auditByDays
      //     this.auditBtn = !data.auditByDays.some(item => {
      //       return item.dataStatus == 1 && item.buttonStatus == 0
      //     })
      //   })
      // },
      changeInfinite() {
        this.page = 1
        this.auditByDays = []
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        })
      },
      infiniteHandler($state) {
        let params = {
          audit_query: {
            floorIds: this.checkedfloor,
            formatIds: this.checkedformat,
            time: this.datePicker.value,
            page: this.page
          }
        }
        if (!this.busy) {
          this.busy = true
          setTimeout(() => {
            API.auditDayList(params)
              .then(data => {
                if (data.auditByDays.length) {
                  this.page += 1
                  this.auditByDays.push(...data.auditByDays)
                  this.auditBtn = !this.auditByDays.some(item => {
                    const { dataStatus, buttonStatus, shopEntityId } = item
                    return dataStatus !=2 && buttonStatus == 0
                  })
                  $state.loaded()
                  if (data.totalPage < this.page) {
                    $state.complete()
                  }
                } else {
                  $state.complete()
                }
                this.busy = false
              })
              .catch(err => {
                $state.complete()
              })
          }, 300)
        }
      },
      // 一键审核
      confirmAudiBtn() {
        if (this.busy) return
        let auditByDays = this.auditByDays
        let shop_entity_ids = []
        auditByDays.forEach(item => {
          const { dataStatus, buttonStatus, shopEntityId } = item
          if (dataStatus != 2 && buttonStatus == 0) {
            shop_entity_ids.push(shopEntityId)
          }
        })
        let params = {
          time: this.datePicker.value,
          shop_entity_ids: JSON.stringify(shop_entity_ids)
        }
        this.$confirm({
          type: 'confirm',
          content: '确认后商户将不能再修改数据，确认提交？',
          confirm: () => {
            API.getAuditDay(params).then(data => {
              this.changeInfinite()
            })
          }
        })
      },
      onHandleOpenExportDialog() {
        this.showExportToEmailDialog = true
      },
      onHandleInputEmailInput() {
        this.showEmailError = !this.canSendEmail
      },
      onHandleSendEmail() {
        const payload = {
          time: this.datePicker.value,
          email: this.email
        }

        API.exportSaleDataByDay(payload)
          .then(() => {
            this.$toast({
              content:
                '邮件已发送，请注意查收！若数据量较大，可能需要1分钟左右，请耐心等候。'
            })
            localStorage.setItem('__EXPORT_EMAIL__', this.email)
            this.showExportToEmailDialog = false
          })
          .catch(error => {
            this.showExportToEmailDialog = false
            if (error && error.data && error.data.message) {
              this.$toast({ content: error.data.message })
            }
          })
      }
    },
    created() {
      let yesterday = tools.getCurrDate(-1)
      let _yesterday = []
      for (let val of yesterday) {
        _yesterday.push({
          value: val
        })
      }
      this.email = localStorage.getItem('__EXPORT_EMAIL__') || ''
      this.handlePickerConfirm(_yesterday)
    },
    mounted() {
      let self = this
      let baseMonth = self.datePicker.value
      if (sessionStorage.getItem('sale-info')) {
        self.$toast('保存成功')
        sessionStorage.removeItem('sale-info')
      }
      if (!sessionStorage.getItem('audit-day')) {
        sessionStorage.setItem('audit-day', baseMonth)
      }
      if (!sessionStorage.getItem('audit-floor')) {
        sessionStorage.setItem('audit-floor', JSON.stringify(self.checkedfloor))
      }
      if (!sessionStorage.getItem('audit-format')) {
        sessionStorage.setItem('audit-format', JSON.stringify(self.checkedformat))
      }
      self.getSelInfo()
    },
    computed: {
      isShowFilter() {
        if (!this.buildingFloorList.length && !this.formatVoList.length) {
          return false
        }
        return true
      },
      canSendEmail() {
        return /^[\w\d-_]+@[\w\d-_]+\.(?:com|cn|net)/.test(this.email)
      }
    },
    watch: {
      showExportToEmailDialog(nv) {
        if (!nv) {
          this.showEmailError = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sale-audit-day {
    height: 100%;
    margin-top: 72px;
    margin-bottom: 100px;
    font-size: 30px;

    .query {
      .date {
        height: 80px;
        line-height: 80px;
        overflow: hidden;
        padding-right: 30px;

        .select-tab {
          float: left;
          width: 490px;
          text-align: center;
        }

        .before,
        .after {
          float: left;
          width: 100px;
          color: #0088ff;
        }

        .after {
          text-align: right;
        }
      }

      .more {
        position: relative;
        margin-top: 30px;
        height: 80px;
        line-height: 80px;
        overflow: hidden;

        .screen-wrap {
          float: right;
        }
      }
    }

    .table-grid {
      margin-top: 30px;

      .title {
        height: 88px;
        line-height: 88px;
        border-bottom: 1px solid #ccc;
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
              max-width: 300px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
              vertical-align: bottom;
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
  .loading {
    font-size: 22px;
  }

  .export-btn {
    position: fixed;
    bottom: 50px;
    right: 30px;
    width: 100px;
    height: 100px;
    font-size: 22px;
    text-align: center;
    color: #fff;
    background: url('//assets.2dfire.com/frontend/8d49dda9f9ed33599669d0f33c7ac11f.png')
      center/contain no-repeat;
    border: none;
    border-radius: 50%;
  }

  .form-item {
    margin-bottom: 40px;

    .form-item-label {
      margin-bottom: 20px;
      font-size: 26px;
      color: #999;
    }

    .form-item-control {
      width: 100%;
      height: 60px;
      font-size: 26px;
      text-indent: 10px;
      border: 1px solid #999;
      border-radius: 8px;

      &:read-only {
        border: none;
        border-bottom: 1px solid #999;
        border-radius: 0;
      }
    }

    .note {
      margin: 5px 0;
      font-size: 20px;
      color: #f03;
    }
  }
</style>
