<template>
    <div class="wrap">
        <Headers></Headers>
        <section class="main-wrap">
            <SideBar :list="list"></SideBar>
            <div class="right-wrap appManager">
                <router-view></router-view>
            </div>
        </section>
        <Footers></Footers>
        <Modal></Modal>
    </div>
</template>

<script>
    import Cookie from "@2dfire/utils/cookie";
    import Tool from "@/base/tools";
    import _i from "@/i18n/index";
    import API from "@/config/api";
    import Requester from "@/base/requester";

    let pageData = {
        state: {
            token: "",
            showModal: false,
            showName: true
        },
        modalData: {
            type: "",
            footer: false
        },
//        开发者侧边导航栏
        dev_list: [
            {name:  _i("SIDEBAR.SERVICE.APP"), path: "app", icon: "icon-app"},
            {name: _i("SIDEBAR.SERVICE.RIGHT"), path: "right", icon: "icon-right"},
            {name: _i("SIDEBAR.SERVICE.VERIFY"), path: "verify", icon: "icon-verify"},
            {name: _i("SIDEBAR.SERVICE.FEEDBACK"), path: "feedback", icon: "icon-feedback"},
            {name: _i("SIDEBAR.SERVICE.LOG"), path: "log", icon: "icon-log"},
            {name: _i("SIDEBAR.SERVICE.PWD"), path: "pwd", icon: "icon-pwd"},
        ],
//        非连锁商户侧边导航栏
        merchant_list: [
            {name:  _i("SIDEBAR.SERVICE.APP"), path: "app", icon: "icon-app"},
            {name: _i("SIDEBAR.SERVICE.DEVELOPER"), path: "developer", icon: "icon-developer"},
            {name: _i("SIDEBAR.SERVICE.RIGHT"), path: "right", icon: "icon-right"},
            {name: _i("SIDEBAR.SERVICE.MERCHANT"), path: "merchant", icon: "icon-merchant"},
            {name: _i("SIDEBAR.SERVICE.FEEDBACK"), path: "feedback", icon: "icon-feedback"},
            // {name: _i("SIDEBAR.SERVICE.LOG"), path: "mclog", icon: "icon-log"},
        ],
//        连锁商户侧边导航栏
        chain_list: [
            {name:  _i("SIDEBAR.SERVICE.APP"), path: "app", icon: "icon-app"},
            {name: _i("SIDEBAR.SERVICE.DIRECT.LIST"), path: "direct", icon: "icon-direct"},
            {name: _i("SIDEBAR.SERVICE.RIGHT"), path: "right", icon: "icon-right"},
            {name: _i("SIDEBAR.SERVICE.MERCHANT"), path: "merchant", icon: "icon-merchant"},
            {name: _i("SIDEBAR.SERVICE.FEEDBACK"), path: "feedback", icon: "icon-feedback"},
            // {name: _i("SIDEBAR.SERVICE.LOG"), path: "mclog", icon: "icon-log"},
        ],
        list: []
    };
    export default {
        data() {
            return pageData;
        },
        components: {
            Headers: require("@/components/header.vue"),
            Footers: require("@/components/footer.vue"),
            SideBar: require("@/components/sidebar.vue")
        },
        methods: {
            loginInit() {
                //		开发者/商户登录后 sidebar不一样
                const authJoinType = Cookie.getItem("authJoinType");
                if (authJoinType == "DEV") {
                    //  开发者
                    pageData.list = pageData.dev_list;
                } else if (authJoinType == "SHOP") {
                    // 商户登录
//        从其他页面跳入（首页、文档中心、FAQ）或 从其他页面直接输入路由
                    if (this.$route.meta.role == "dev") {
                        this.$router.replace({
                            path: '/server_developer'
                        })
                    }
                    pageData.list = pageData.merchant_list;
                }
                else if (authJoinType == "CHAIN") {
                    // 连锁登录
                    if (this.$route.meta.role == "dev") {
                        this.$router.replace({
                            path: '/server_direct'
                        })
                    }
                    pageData.list = pageData.chain_list;
                }
            }
        },
        created() {
            let self = this;
            this.loginInit()
            self.$Message.config({
                top: 80,
                duration: 2
            });
        }
    };
</script>
<style lang="scss" scoped>
    .wrap {
        height: 100%;
        // padding-bottom: 115px;
    }

    .main-wrap {
        width: 100%;
        overflow: hidden;
        overflow-y: auto;
        min-height:calc(100% - 50px)
        // height: 100%;
    }

    .right-wrap {
        margin-left: 298px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 50px;
    }
</style>

<style lang="less" src="../../theme/default.less"></style>
<style lang="scss" src="../../style/common.scss"></style>



