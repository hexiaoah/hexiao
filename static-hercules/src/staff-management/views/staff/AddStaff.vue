<template>
    <div class="add-staff-wrap">
        <section class="main">
            <h3 class="h3">基本设置</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'姓名'"
                            :input-name="'staffInfo.userName'"
                            :max-length="'50'"
                            :value="staffInfo.userName">
                </info-input>

                <info-input :title="'手机号码'"
                            :input-name="'staffInfo.mobile'"
                            :max-length="'11'"
                            :input-type="'number'"
                            :explain="'员工用此手机号注册并登录二维火掌柜后，就能进入本店工作了。'"
                            :value="staffInfo.mobile">
                </info-input>

                <info-select :title="'职级'"
                            :select-name="'staffInfo.roleName'"
                            :can-edit="canEdit"
                            :value="staffInfo.roleName">
                </info-select>      
            </ul>
        </section>

        <section class="main" v-show="extraActionVos.length !== 0">
            <h3 class="h3">高级设置</h3>
            <ul class="input-main border-b">
              
                <info-switch :switch-name="'allowDiscount'"
                    :title="'允许对可打折的商品进行打折'"
                    :value="extraActionInfo.allowDiscount"></info-switch>

                <info-select v-show="extraActionInfo.allowDiscount"
                            :title="'最低打折额度'"
                            :select-name="'extraActionInfo.allowDiscountValue'"
                            :child-status="true"
                            :value="extraActionInfo.allowDiscountValue">
                </info-select>      

                <info-switch :switch-name="'noAllowDiscount'"
                    :title="'允许对不可打折的商品进行打折'"
                    :value="extraActionInfo.noAllowDiscount"></info-switch>

                <info-select v-show="extraActionInfo.noAllowDiscount"
                            :title="'最低打折额度'"
                            :select-name="'extraActionInfo.noAllowDiscountValue'"
                            :child-status="true"
                            :value="extraActionInfo.noAllowDiscountValue">
                </info-select> 

                <info-switch :switch-name="'limitSubZero'"
                    :title="'限制去零额度'"
                    :value="extraActionInfo.limitSubZero"></info-switch>

                <info-input v-show="extraActionInfo.limitSubZero"
                            :title="'最大可去零额度（¥）'"
                            :input-name="'extraActionInfo.maxLimitSubZero'"
                            :max-length="'50'"
                            :child-status="true"
                            :input-type="'number'"
                            :value="extraActionInfo.maxLimitSubZero">
                </info-input>
            </ul>
        </section>
        
        <div class="bottom-opt-wrapper">
            <f-button class="delete" type="danger" size="long" @click="deleteStaff" v-show="isShowDeleteButton">删除此员工</f-button>
        </div>

        <loading v-show="loading"></loading>
        <!--底部弹窗-->
        <Picker @clickBottom="gotoRankManage"></Picker>
    </div>
</template>

<script>
import Picker from '../../components/info-picker.vue'
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import tools from '../../libs/tools'
import API from '../../config/api'
import sessionStorage from '@2dfire/utils/sessionStorage'
import InfoSwitch from '../../components/info-switch'
import errorToast from '../../libs/errorToast'
import {
    inputAddStaffIsOk
} from '../../libs/rules'
import Loading from '../../components/loading.vue'

  export default {
    name: "add-staff",
    data() {
        return {
            addType: this.$route.query.addType,
            isShowDeleteButton: false,
            employeeId: '',
            extraActionVos: [],
            originalPram: '',  // 用于保存初始表单内容，监听表单变化
            simpleUserInfo: this.$route.query.simpleUserInfo,
            loading: false,
        }
    },
    components: {
        Picker,
        InfoSwitch,
        Loading,
    },
    methods: {
        ...mapActions(['modifyShowSaveButton', 'changeInfo']),
        gotoRankManage() {  // 跳转到职级管理页面
            this.$router.push({path: '/rank/rankmanagelist'})
        },
        carryDiffOpt() {  // 根据类型选择是添加员工还是展示员工信息
            let self = this
            if(self.addType === true || self.addType === undefined) {  // 添加员工
                tools.clearStaffInfo(self.staffInfo)  // 清空staffinfo中的数据
                self.getExtraActionSettings()

            } else {
                if(self.staffInfo.isSupper === 0) {  // 非admin展示删除按钮
                    self.isShowDeleteButton = true
                }
                self.changeInfo({type: 'addStaffTitle', value: self.staffInfo.userName})
                self.getExtraActionSettings()
            }
        },
        getExtraActionSettings() {  // 获取员工配置项
            let self = this
            API.getExtraActionSettings({
                opEntityId: sessionStorage.getItem('entityId'),
                opUserId: self.simpleUserInfo.userId
            }).then(data => {
                tools.paramToExtraActionValue(data, self.extraActionInfo)
                self.extraActionVos = data
                self.originalPram = JSON.stringify(self.staffInfo) + JSON.stringify(self.extraActionInfo)
            })
        },
        deleteStaff() {  // 删除员工
        let self = this
            self.$confirm({
                content: '确认要删除“' + self.simpleUserInfo.name +'” 吗？',
                confirm: () => {
                    self.loading = true
                    API.deleteEmployee({
                        entityId: sessionStorage.getItem('entityId'),
                        employeeId: self.simpleUserInfo.employeeId
                }).then(data => {
                    self.loading = false
                    if(data === true) {  // 修改成功
                        window.history.back()  // 连退两个页面
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
            if(self.originalPram !== '' && self.originalPram != (JSON.stringify(self.staffInfo) + JSON.stringify(self.extraActionInfo))) {
                self.modifyShowSaveButton(true)
            } else {
                self.modifyShowSaveButton(false)
            }
        },
        updateInfo() {  // 更新员工信息
            let self = this
            if(!self.checkInfo()) {
                return false
            }

            self.loading = true
            tools.extraActionValueToParam(self.extraActionInfo, self.extraActionVos)
            API.updateEmployee({
                employeeId: self.simpleUserInfo.employeeId,
                newMobile: self.staffInfo.mobile,
                newName: self.staffInfo.userName,
                newRoleId: self.staffInfo.roleId,
                extraActionVoList: JSON.stringify(self.extraActionVos)
            }).then(data => {
                self.loading = false
                if(Object.keys(data).length > 0) {
                    window.history.back() 
                } else {
                    errorToast.show('保存失败')
                }
            }).catch(e => {
                self.loading = false
            })
        },
        createInfo() {  // 创建员工信息
            let self = this
            if(!self.checkInfo()) {
                return false
            }

            self.loading = true
            tools.extraActionValueToParam(self.extraActionInfo, self.extraActionVos)
            API.createEmployee({
                userName: self.staffInfo.userName,
                mobile: self.staffInfo.mobile,
                roleName: self.staffInfo.roleName,
                roleId: self.staffInfo.roleId,     
                extraActionVoList: JSON.stringify(self.extraActionVos)
            }).then(data => {
                self.loading = false
                if(Object.keys(data).length > 0) {
                    window.history.back() 
                } else {
                   errorToast.show('保存失败')
                }
            }).catch(e => {
                self.loading = false
            })
        },
        checkInfo() {  // 检查表单内容是否合法
            const self = this;
            
            for (let i = 0, leg = self.StaffInfoFirst.length; i < leg; i++) {
                let key = self.StaffInfoFirst[i];
                const ret = inputAddStaffIsOk(self.staffInfo[key], key);
                if (!ret.data) {
                    errorToast.show(ret.message);
                    return false;
                }
            }
            for (let i = 0, leg = self.extraActionsInfoFirst.length; i < leg; i++) {
                let key = self.extraActionsInfoFirst[i];
                const ret = inputAddStaffIsOk(self.extraActionInfo[key], key);
                if (!ret.data) {
                    if((key === 'maxLimitSubZero') && (!self.extraActionInfo.limitSubZero)) {  // 不限制收银结账时不验证最大去零额度
                        
                    }
                    else {
                        errorToast.show(ret.message);
                        return false;
                    }
                }
            }

            return true;
        }
    },
    computed: {
        ...mapState([
                'picker',
                'staffInfo',
                'extraActionInfo',
                'clickedSaveButton',
            ]),
        ...mapGetters([
            "StaffInfoFirst",
            "extraActionsInfoFirst",
        ]),
        canEdit() {  // 当是超级管理员时权限设置不可点击选择
            let self = this
            if(self.addType === false && self.staffInfo.roleId === '0') {
                return false
            } else {
                return true
            }
        },
    },
    created() {
        this.carryDiffOpt()
    },
    watch: {
        staffInfo: {
            handler(newName, oldName) {
                this.showSaveButtonOrNormal()
            },
            deep: true,
            immediate: true
        },
        extraActionInfo: {
            handler(newName, oldName) {
                this.showSaveButtonOrNormal()
            },
            deep: true,
            immediate: true
        },
        clickedSaveButton: {
            handler(newName, oldName) {
                if(newName) {  // 点击了保存按钮
                    this.changeInfo({type: 'clickedSaveButton', value: false})
                    if(this.addType === true || this.addType === undefined) {
                        this.createInfo()
                    } else {
                        this.updateInfo()
                    }
                }
            },
            deep: true,
            immediate: true
        },
    }
  }
</script>

<style lang="less" scoped>
    .add-staff-wrap {
        height: 100%;
    }

    .shelves {
        padding-left: 0;
        padding-top: 14px;
        padding-bottom: 14px;
    }

    .bottom-opt-wrapper {
        height: 316px;

        .delete {
            margin-top: 72px;
        }
    }
</style>
