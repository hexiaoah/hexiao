<template>
    <div class="staff-info-wrapper">
       
        <section class="main" v-show="userVo.userId">
            <div class="input-main border-b border-t">

                <user-content
                :title="userVo.name"
                :mobile="userVo.mobile"
                :countryCode="userVo.countryCode"
                :rank="userVo.roleName"
                @clickNext="gotoDetail">
                </user-content>
        
            </div>
        </section>

        <section class="main" v-show="userVo.userId">
            <h3 class="h3">职级权限<span v-show="canEdit" @click="gotoRankDetail">查看详情</span></h3>
            <ul class="input-main border-b border-t">

                <info-select :title="'职级名称'"
                            :select-name="'staffInfo.roleName'"
                            :can-edit="canEdit"
                            :value="staffInfo.roleName">
                </info-select>     

                <info-select :title="'权限设置'"
                            :select-name="'permissionRatio'"
                            :is-select="false"
                            @gotoOtherPage="setPermission"
                            :can-edit="canEdit"
                            :value="permissionRatio">
                </info-select>
        
            </ul>
        </section>

        <div class="bottom-opt-wrapper" v-show="userVo.isSupper === 0">
            <f-button class="delete" type="danger" size="long" @click="deleteStaff">删除此员工</f-button>
        </div>

        <loading v-show="loading"></loading>
        <!--底部弹窗-->
        <Picker @clickBottom="gotoRankManage"></Picker>
    </div>
</template>

<script>
import Picker from '../../components/info-picker.vue'
import UserContent from '../../components/user-content'
import API from '../../config/api'
import errorToast from '../../libs/errorToast'
import sessionStorage from '@2dfire/utils/sessionStorage'
import {
    mapState,
    mapActions
} from 'vuex'
import tools from '../../libs/tools'
import Loading from '../../components/loading.vue'

  export default {
    data() {
        return {
            userVo: {},
            actionGroupVo: {},
            employeeId: '',  // 员工Id
            opUserId: this.$route.query.opUserId,
            loading: false,
            originalPram: '',  // 用于保存初始表单内容，监听表单变化
            originActionGroupVo: {},
        }
    },
    components: {
        UserContent,
        Loading,
        Picker,
    },
    computed: {
        ...mapState([
            'staffInfo',
            'clickedSaveButton',
            'picker',
        ]),
        permissionRatio() {
            return this.actionGroupVo.actionCount + '/' + this.actionGroupVo.totalCount
        },
        canEdit() {  // 当是超级管理员时不展示查看详情按钮，权限设置不可点击跳转
            let self = this
            if(self.staffInfo.roleId === '0') {
                return false
            } else {
                return true
            }
        },
    },
    methods: {
        ...mapActions(['changeInfo', 'modifyShowSaveButton', 'assignRankInfo']),
        getStaffDetailInfo() {
            let self = this
            
            API.getEmployeeBriefInfo({
                opEntityId: sessionStorage.getItem('entityId'),
                opUserId: self.opUserId
            }).then(data => {
                self.userVo = data.simpleUserVo
                self.actionGroupVo = data.actionGroupVO
                self.originActionGroupVo = JSON.parse(JSON.stringify(data.actionGroupVO))  // 深拷贝
                self.employeeId = data.simpleUserVo.employeeId
                self.changeInfo({type: 'staffInfoTitle', value: data.simpleUserVo.name})
                tools.paramToStaffInfo(self.userVo, self.staffInfo)  // 转换staffInfo信息
                self.originalPram = JSON.stringify(data.simpleUserVo.roleName)
            })
        },
        gotoDetail() {  // 跳转到查看详情页面
            this.$router.push({path: './addstaff', query:{addType: false, simpleUserInfo: this.userVo}})
        },
        setPermission() {  // 跳转到权限设置页面
            this.$router.push({
                path: '/permissions',
                query: { rankId: this.staffInfo.roleId }
            })
        },
        deleteStaff() {  // 删除员工
            this.$confirm({
                content: '确认要删除“' + this.userVo.name +'” 吗？',
                confirm: () => {
                    self.loading = true
                    API.deleteEmployee({
                        entityId: sessionStorage.getItem('entityId'),
                        employeeId: this.employeeId
                }).then(data => {
                    self.loading = false
                    if(data === true) {  // 删除成功
                        window.history.back() 
                    } else {
                        errorToast.show('删除员工失败')
                    }
                }).catch(e => {
                    self.loading = false
                })
                }
            })
        },
        showSaveButtonOrNormal() {  // 判断展示保存按钮还是返回按钮
            let self = this
            if(self.originalPram !== '' && self.originalPram != JSON.stringify(self.staffInfo.roleName)) {
                self.modifyShowSaveButton(true)
                self.getRoleActionCount()
            } else {
                self.modifyShowSaveButton(false)
                self.actionGroupVo.actionCount = self.originActionGroupVo.actionCount
                self.actionGroupVo.totalCount = self.originActionGroupVo.totalCount
            }
        },
        gotoRankManage() {  // 跳转到职级管理页面
            this.$router.push({path: '/rank/rankmanagelist'})
        },
        updateEmployeeRole() {  // 更新员工职级
            let self = this
            self.loading = true
            API.updateEmployeeRole({
                opUserId: self.opUserId,
                newRoleId: self.staffInfo.roleId,
            }).then(data => {
                self.loading = false
                if(data) {  // 更新成功
                    window.history.back() 
                } else {
                    errorToast.show('修改员工职级失败')
                }
            }).catch(e => {
                self.loading = false
            })
        },
        getRoleActionCount() {  // 获取新的职级下权限的百分比
            let self = this
            self.loading = true
            API.getRoleActionCount({
                opEntityId: sessionStorage.getItem('entityId'),
                roleId: self.staffInfo.roleId,
            }).then(data => {
                self.loading = false
                if (data != undefined) {
                    self.actionGroupVo.totalCount = data.totalCount
                    self.actionGroupVo.actionCount = data.actionCount
                }
            }).catch(e => {
                self.loading = false
            })
        },  
        gotoRankDetail() {   //跳转到职级详情页面
            let self = this
            this.$router.push({
                path: '/rank/rankmanagedetail',
                query: {
                    rankId: self.staffInfo.roleId,
                    name: self.staffInfo.roleName,
                }
            })
        },
    },
    created() {
        this.getStaffDetailInfo();
    },
    watch: {
        staffInfo: {
            handler(newName, oldName) {
                this.showSaveButtonOrNormal()
            },
            deep: true,
            immediate: false
        },
        clickedSaveButton: {
            handler(newName, oldName) {
                if(newName) {  // 点击了保存按钮
                    this.changeInfo({type: 'clickedSaveButton', value: false})
                    this.updateEmployeeRole()
                }
            },
            deep: true,
            immediate: true
        },
    },
  }
</script>

<style lang="less" scoped>
    .staff-info-wrapper {
        width: 100%;
        height: 100%;
        margin-top: 72px;

        .user-content {
            padding-left: 30px;
            background: white;
        }

        .bottom-opt-wrapper {
            height: 444px;

            .delete {
                margin-top: 72px;
            }
        }
    }
</style>