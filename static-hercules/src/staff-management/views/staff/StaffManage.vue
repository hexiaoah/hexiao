<template>
    <section class="staff-manage-wrap" >

        <fire-scroll v-show="isShow"
            class="fire-scroll"
            :data="userList||[]"
            :scroll-element-y="scrollElementY"
        >

            <div>
                <div class="top-wrapper">
                    <img class="top-image" src='https://assets.2dfire.com/frontend/a12af5ff080ea86e3f0c886274c76dc0.png' />
                    <div class="content">店家在此模块中可以对员工进行管理，添加员工后，员工就能登录门店进行工作。</div>
                </div>

                <user-content class="login-user input-main border-b-c border-t-c"
                    v-show="isShow && loginUser.id"
                    :key="loginUser.id"
                    :title="loginUser.name"
                    :rank="loginUser.roleName"
                    :mobile="loginUser.mobile"
                    :countryCode="loginUser.countryCode"
                    @clickNext="gotoDetail(loginUser.id)"></user-content>

                <div class="user-list main">
                    <div :class="'role-list role-id'+role.roleVO.id" v-for="role in userList" :key="role.roleVO.id" v-show="!!role.userVOList" :ref="role.roleVO.id">
                        <f-sub-title>{{role.roleVO.name}}</f-sub-title>
                            <ul class="input-main border-b-c">
                                <user-content class="border-b-c" v-for="user in role.userVOList"
                                    :key="user.id"
                                    :title="user.name"
                                    :mobile="user.mobile"
                                    :countryCode="user.countryCode"
                                    @clickNext="gotoDetail(user.id)"></user-content>
                            </ul>
                    </div>
                </div>
                
            </div>
        </fire-scroll>

        <div v-show="isShow">
            <bottom-opt-button 
                @help="clickHelp"
                @add="toAddStaff">
            </bottom-opt-button>          
            
            <f-slide
                :visible.sync="rankVisible"
                position="right"
                icon-text="职级"
                class="rank-slide"
            >
                <div class="title" slot="header" @click="navTo">
                    职级管理
                </div>
                <ul class="rank-list">
                    <li class="rank-item" v-for="role in userList" :key="role.roleVO.id" v-show="!!role.userVOList" @click="autoScroll(role.roleVO.id)">
                        {{role.roleVO.name}}
                    </li>
                </ul>
            </f-slide>

        </div>
       
    </section>
</template>

<script>
import BottomOptButton from "../../components/bottom-opt-button"
import errorToast from '../../libs/errorToast'
import API from '../../config/api'
import FireScroll from '../../components/fire-scroll'
import UserContent from '../../components/user-content'

  export default {
    name: "staff-manage",
    data() {
        return {
            rankVisible: false,
            isShow: false,
            userList: [],
            scrollElementY: '',
            loginUser: {},  // 当前登录的员工信息
        }
    },
    components: {
        BottomOptButton,
        FireScroll,
        UserContent
    },
    methods: {
        navTo() {
            this.$router.push({path: '/rank/rankmanagelist'})
        },
        getToken() {  // 获取token
            let token = this.$route.query.token
            sessionStorage.setItem('token', encodeURIComponent(token))
            this.getSessionMap()
        },
        getSessionMap() {  // 获取session信息
            API.getSessionMap({
            }).then(data => {
                let entityId = data.entityId
                let industry = data.industry
                sessionStorage.setItem('entityId', entityId)
                if(industry !== 0) {  // 零售店铺
                    errorToast.show('零售店铺不可进行此操作')
                } else {
                    this.getUserList();
                }
            })
        },
        getUserList() {  // 获取员工列表
            API.listAllShopUsers({
            }).then(data => {
                this.isShow = true
                this.userList = data
                this.getLoginUser(data)
            })     
        },
        getLoginUser(list) {  // 获取当前登录用户
            for(let i=0; i<list.length; i++) {
                let staff = list[i].userVOList
                if(staff != undefined && staff.length != 0) {
                    for(let j=0; j<staff.length; j++) {
                        let loginStatus = staff[j].loginStatus
                        if(loginStatus === true) {
                            this.loginUser = staff[j]
                            this.loginUser.roleName = list[i].roleVO.name
                            return
                        }
                    }
                }
            }
        },
        toAddStaff() {  // 添加员工
            this.$router.push({path: '/addstaff', query:{addType: true, simpleUserInfo: {}}})
        },
        clickHelp() {  // 点击帮助按钮
            this.$router.push({path: '/help', query:{helpType: 'staffManage'}})
        },
        autoScroll(areaId) {
            this.scrollElementY = ''
            this.scrollElementY = 'role-id' + areaId
            this.rankVisible = false          
        },
        gotoDetail(userId) {
            this.$router.push({path: '/staffinfo', query: {opUserId: userId}})
        }
    },
    created() {
        this.getToken();
    }
  }
</script>

<style lang="less" scoped>
    .staff-manage-wrap {
        height: 100%;

        .top-wrapper {
            padding: 0 30px;
            background-color: white;
            text-align: center;
            border-bottom: 1PX solid #cccccc;

            .top-image {
                height: 248px;
                width: 380px;
                margin: 40px auto;
            }
            
            .content {
                padding-bottom: 40px;
                font-size: 26px;
                color: #333333;
                text-align: left;
            }
        }

        .login-user {
            margin-top: 72px;
            padding-left: 30px;
        }

        .fire-scroll {
            height: 100%;
        }

        .user-list {
            padding-bottom: 176px;
            .role-list {
                margin-top: 72px;
            }
        }
       
        .rank-slide {
            font-size: 30px;
            .title {
                width: 512px;
                padding: 40px 30px 0;
                text-align: right;
                color: #0088FF;
            }
            .rank-list {
                margin-top: 24px;
                width: 100%;
                padding-left: 30px;
                .rank-item {
                    padding: 24px 0;
                    border-bottom: 1PX solid #e6e6e6;
                }
            }
        }
    }
</style>
