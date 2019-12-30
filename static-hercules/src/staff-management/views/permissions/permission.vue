<template>
  <div>
    <div class="header-wrapper">
      <search-bar @filter-list="filterList" @on-focus="inputFocus" @on-blur="inputBlur"></search-bar>
    </div>
    <slot></slot>

    <section class="permissions-wrap">
      <div class="area border-b" v-for="permission in permissionList" :key="permission.code" >
        <div class="header">
          <p class="title">{{permission.name}}</p>
          <p
            class="select-action"
            @click="selectPermissionActionId(permission)"
            v-show="!isSearch"
          >{{isCheckAll(permission)?'取消全选':'全选'}}</p>
        </div>
        <f-checkbox-group
          class="checkbox-group"
          :value="checkedList[permission.code]"
          @input="changePermission"
        >
          <f-checkbox
            class="border-b"
            v-for="action in permission.actionVOList"
            :key="action.name"
            :label="action.id"
          >{{action.name}}</f-checkbox>
        </f-checkbox-group>
      </div>
      <div class="btn-group" v-if="groupVisible">
        <f-button type="danger" icon="ok" @click="selectAll">全选</f-button>
        <f-button type="danger" icon="circle" @click="unselectAll">全不选</f-button>
      </div>
    </section>
    <loading v-show="loading"></loading>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import SearchBar from '../../components/search-bar.vue'
import API from '../../config/api'
import Loading from '../../components/loading.vue'

export default {
  data() {
    return {
      isSearch: false,
      checkedList: [],
      copyCheckedList: [],
      // 备份权限列表
      copyPermissionList: [],
      loading: false,
      groupVisible: true
    }
  },

  computed: {
    ...mapState(['permissionList', 'clickedSaveButton']),
    ...mapGetters(['grantedActionIdList']),
    grantActionIdList() {
      var array = []
      for (const key in this.checkedList) {
        this.checkedList[key].forEach(action => {
          array.push(action)
        })
      }
      return array.sort()
    }
  },

  methods: {
    ...mapActions(['modifyPermission', 'modifyShowSaveButton', 'changeInfo']),
    /* 判断一个区域是否全选 */
    isCheckAll(permission) {
      return (
        permission.actionVOList.length ===
        (this.checkedList[permission.code] || []).length
      )
    },

    /* 全选/取消全选 */
    selectPermissionActionId(permission) {
      if (this.isCheckAll(permission)) {
        this.unselectPermissionAction(permission)
      } else {
        this.selectPermissionAction(permission)
      }
      this.changePermission()
    },

    /* 全选某个分类下所有权限 */
    selectPermissionAction(permission) {
      /* 这个分类没有权限的情况 */
      if (!permission.actionVOList) {
        return
      }
      /* 第一次操作全选，初始化空数组 */
      if (!this.checkedList[permission.code]) {
        this.$set(this.checkedList, permission.code, [])
      }
      const checked = this.checkedList[permission.code]
      /* 循环对比每个权限，没选中才执行选中操作 */
      permission.actionVOList.forEach(item => {
        if (checked.indexOf(item.id) < 0) {
          checked.push(item.id)
        }
      })
    },

    /* 取消全选某个分类下所有权限 */
    unselectPermissionAction(permission) {
      if (!permission.actionVOList) {
        return
      }
      if (!this.checkedList[permission.code]) {
        this.$set(this.checkedList, permission.code, [])
      }
      const checked = this.checkedList[permission.code]
      permission.actionVOList.forEach(item => {
        const index = checked.indexOf(item.id)
        if (index > -1) {
          checked.splice(index, 1)
        }
      })
    },

    /* 全选某个分类下所有权限 */
    selectPermissions(permission) {
      /* 这个分类没有权限的情况 */
      if (!permission.actionVOList) {
        return
      }
      /* 第一次操作全选，初始化空数组 */
      if (!this.checkedList[permission.code]) {
        this.$set(this.checkedList, permission.code, [])
      }
      const checked = this.checkedList[permission.code]
      /* 循环对比每个权限，没选中才执行选中操作 */
      permission.actionVOList.forEach(item => {
        if (checked.indexOf(item.id) < 0) {
          checked.push(item.id)
        }
      })
    },

    /* 取消全选某个分类下所有权限 */
    unselectPermissions(permission) {
      if (!permission.actionVOList) {
        return
      }
      if (!this.checkedList[permission.code]) {
        this.$set(this.checkedList, permission.code, [])
      }
      const checked = this.checkedList[permission.code]
      permission.actionVOList.forEach(item => {
        const index = checked.indexOf(item.id)
        if (index > -1) {
          checked.splice(index, 1)
        }
      })
    },

    /* 全选所有权限 */
    selectAll() {
      this.permissionList.forEach(permission => {
        this.selectPermissions(permission)
      })
      this.changePermission()
    },

    /* 取消全选所有权限 */
    unselectAll() {
      this.permissionList.forEach(permission => {
        this.unselectPermissions(permission)
      })
      this.changePermission()
    },

    /* 修改权限 */
    changePermission() {
      this.modifyShowSaveButton(
        JSON.stringify(this.grantActionIdList) !==
          JSON.stringify(this.grantedActionIdList)
      )
    },

    filterList(value) {
      this.inputText = value
      if (value) {
        this.groupVisible = false
        this.isSearch = true
        const copyArr = JSON.parse(JSON.stringify(this.copyPermissionList))
        const filterArr = copyArr.filter(item => {
          if (item.actionVOList && item.actionVOList.length) {
            const arr = item.actionVOList.filter(
              data => data.name.indexOf(value) >= 0
            )
            return arr.length > 0
          }
          return false
        })
        if (filterArr && filterArr.length) {
          const content =
            filterArr &&
            filterArr.map(item => {
              item.actionVOList = item.actionVOList.filter(
                data => data.name.indexOf(value) >= 0
              )
              return item
            })
          this.modifyPermission(content)
        } else {
          this.modifyPermission([])
          this.$toast('没有找到相关权限')
        }
      } else {
        this.groupVisible = true
        this.isSearch = false
        this.modifyPermission(this.copyPermissionList)
      }
    },

    inputFocus() {
      this.$emit('on-focus')
    },

    inputBlur() {
      this.$emit('on-blur')
    },

    initSelectedPermissions() {
      this.permissionList.forEach(item => {
        if (!item.actionVOList) {
          return
        }
        if (!this.checkedList[item.code]) {
          this.$set(this.checkedList, item.code, [])
        }
        const checked = this.checkedList[item.code]
        item.actionVOList.forEach(action => {
          if (checked.indexOf(action.id) < 0 && action.selected == true) {
            checked.push(action.id)
          }
        })
      })
    }
  },

  components: {
    SearchBar,
    Loading
  },

  created() {
    this.loading = true
    API.getRoleActionList({ roleId: this.$route.query.rankId })
      .then(data => {
        this.loading = false
        this.modifyPermission(data)
        this.copyPermissionList = JSON.parse(
          JSON.stringify(this.permissionList)
        )
        this.initSelectedPermissions()
        this.copyCheckedList = this.checkedList
      })
      .catch(e => {
        this.loading = false
      })
  },

  destroyed() {
    this.modifyPermission([])
  },

  watch: {
    //监听保存按钮
    clickedSaveButton: {
      handler(newName, oldName) {
        if (newName) {
          // 点击了保存按钮
          this.changeInfo({ type: 'clickedSaveButton', value: false })
          this.loading = true
          API.grantAction({
            grantedRoleId: this.$route.query.rankId,
            actionIdList: JSON.stringify(this.grantActionIdList)
          })
            .then(data => {
              this.loading = false
              window.history.back()
            })
            .catch(e => {
              this.loading = false
            })
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 88px;
  left: 0;
  width: 100%;
  background: white;
  z-index: 200;
}

.permissions-wrap {
  font-size: 30px;
  padding-bottom: 128px;
  padding-top: 91px;

  .area {
    margin-top: 68px;

    .header {
      padding: 24px 30px;
      background-color: rgba(204, 204, 204, 0.5);
      overflow: hidden;

      .title {
        float: left;
        font-weight: bold;
      }

      .select-action {
        float: right;
        color: #08f;
      }
    }

    .checkbox-group {
      padding-left: 30px;
      background-color: #fff;

      .f-checkbox {
        padding-left: 0;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .btn-group {
    position: fixed;
    right: 30px;
    bottom: 24px;

    .f-button {
      float: left;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }

    z-index: 1;
  }
}
</style>