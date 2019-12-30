<template>
  <div class="rank-management-detail">
    <section class="main">
      <ul class="input-main border-b border-t">
        <info-input :title="'职级名称'" :inputName="'rank.name'" :value="rank.name" :max-length="'50'"></info-input>
        <info-select
          :title="'权限设置'"
          :is-select="false"
          :selectName="'permissionSettings'"
          @gotoOtherPage="navTo"
          :value="rankValue"
        ></info-select>
      </ul>
    </section>
    <f-button type="primary" v-if="btnVisiable" @click="deleteRank">删除此职级</f-button>
    <loading v-show="loading"></loading>
  </div>
</template>
<script>
const { alert: alertDialog } = require('base/components/dialogs/events.js')
import API from '../../config/api'
import { mapActions, mapState } from 'vuex'
import errorToast from '../../libs/errorToast'
import Loading from '../../components/loading.vue'

export default {
  data() {
    return {
      btnVisiable: true,
      modified: false,
      data: [],
      loading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions([
      'modifyShowSaveButton',
      'changeRankInfo',
      'changeTotalRankActionCount',
      'changeInfo'
    ]),

    //权限设置点击
    navTo() {
      if (this.rank.name === '' || this.rank.name === undefined) {
        alertDialog.show({
          content: '职级名称不能为空',
          okBtnText: '我知道了'
        })
        return
      }

      if (this.modified) {
        if (this.rank.id === undefined) {
          this.createRank(this.goToPermissionPage)
        } else {
          this.updateRank(this.goToPermissionPage)
        }
      } else {
        this.goToPermissionPage()
      }
    },

    //跳转权限设置页
    goToPermissionPage() {
      this.$router.push({
        path: '/permissions',
        query: { rankId: this.rank.id }
      })
    },

    //返回上一页
    goBack() {
      window.history.back()
    },

    //创建职级
    createRank(callback) {
      this.loading = true
      API.createRole({
        roleName: this.rank.name
      })
        .then(data => {
          this.loading = false
          this.changeRankInfo({ type: 'name', value: data.name })
          this.changeRankInfo({ type: 'id', value: data.id })
          callback()
        })
        .catch(e => {
          this.loading = false
        })
    },

    //删除职级
    deleteRank() {
      this.loading = true
      API.deleteRole({ roleId: this.rank.id })
        .then(data => {
          this.loading = false
          this.goBack()
        })
        .catch(e => {
          this.loading = false
        })
    },

    //更新职级
    updateRank(callback) {
      this.loading = true
      API.updateRole({ roleId: this.rank.id, roleName: this.rank.name })
        .then(data => {
          this.loading = false
          callback()
        })
        .catch(e => {
          this.loading = false
        })
    },
    
    //获取权限已有的职级数
    getRankActionCount() {
      API.getRoleActionCount({
        opEntityId: this.entityId,
        roleId: this.rank.id
      })
        .then(data => {
          if (data != undefined) {
            this.changeRankInfo({
              type: 'actionCount',
              value: data.actionCount
            })
            this.changeTotalRankActionCount(data.totalCount)
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    }
  },

  created() {
    //路由存在职级ID，则赋值
    if (this.$route.query.rankId !== undefined) {
      this.changeRankInfo({ type: 'id', value: this.$route.query.rankId })
    }
    //有职级ID，则显示删除按钮
    this.btnVisiable = this.rank.id === undefined ? false : true
    if (this.rank.id === undefined) {
      //职级ID不存在，请求权限总数
      this.loading = true
      API.getShopActionTotal({})
        .then(data => {
          this.changeTotalRankActionCount(data)
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    } else {
      //职级ID存在
      if (
        this.$route.query.name !== undefined &&
        (this.rank.name === undefined || this.rank.name === '')
      ) {
        //职级名为空，且路由包含名字，则赋值
        this.changeRankInfo({ type: 'name', value: this.$route.query.name })
      }
      this.loading = true
      //请求该职级已有的权限数
      this.getRankActionCount()
    }
  },

  computed: {
    ...mapState(['rank', 'totalRankActionCount', 'clickedSaveButton']),
    entityId() {
      return sessionStorage.getItem('entityId')
    },
    rankValue() {
      return this.rank.actionCount + '/' + this.totalRankActionCount
    }
  },

  watch: {
    //监听职级名称，有改动则显示保存按钮
    'rank.name'(val) {
      //1. 职级名称未变 2.新增但名称为空
      //不展示保存按钮
      if (
        val === this.$route.query.name ||
        (val === '' && this.rank.id === undefined)
      ) {
        this.modified = false
        this.modifyShowSaveButton(false)
      } else {
        this.modified = true
        this.modifyShowSaveButton(true)
      }
    },

    //监听保存按钮
    clickedSaveButton(val) {
      if (val) {
        // 点击了保存按钮
        this.changeInfo({ type: 'clickedSaveButton', value: false })
        if (this.rank.id === undefined) {
          this.createRank(this.goBack)
        } else {
          this.updateRank(this.goBack)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rank-management-detail {
  margin-top: 72px;
  height: 100%;
  
  .f-button {
    background: #ff0033;
    margin-top: 72px;
  }
}
</style>