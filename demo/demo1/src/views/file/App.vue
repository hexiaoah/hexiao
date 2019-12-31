<template>
    <div class="wrap">
        <Headers></Headers>
        <section class="main-wrap">
            <SideBar :list="list"></SideBar>
            <div class="right-wrap">
                <router-view></router-view>
            </div>
        </section>
        <Footers></Footers>
        <Modal></Modal>
    </div>
</template>

<script>

    import _i from '@/i18n/index'

    let pageData = {
        list: [
            {
                name: _i('SIDEBAR.DOCS.GUIDE'),
                path: "guide",
                showSub: false,
                icon: "icon-enter",
                list: [
                    {name: _i('SIDEBAR.DOCS.START'), path: "start"},
                    {name: _i('SIDEBAR.DOCS.FLOW'), path: "flow"},
                ]
            },
            {
                name: _i('SIDEBAR.DOCS.DEV'),
                path: "dev",
                showSub: false,
                icon: "icon-dev",
                list: [
                    {name: _i('SIDEBAR.DOCS.AUTH.ENTERPRISE'), path: "ent"},
                    {name: _i('SIDEBAR.DOCS.MESSAGE'), path: "message"},
                ]
            },
            {
                name: _i('SIDEBAR.DOCS.SCHEME'),
                path: "scheme",
                showSub: false,
                icon: "icon-dev",
                list: [
                    {name: _i('SIDEBAR.DOCS.DATA'), path: "data"},
                    {name: _i('SIDEBAR.DOCS.LEAGUER'), path: "leaguer"},
                    {name: _i('SIDEBAR.DOCS.COUPON'), path: "coupon"},
                    {name: _i('SIDEBAR.DOCS.PARCEL'), path: "parcel"},
                    {name: _i('SIDEBAR.DOCS.DISPATCHING'), path: "dispatching"},
                    {name: _i('SIDEBAR.DOCS.RECEIPT'), path: "receipt"},
                ]
            },
            {
                name: _i('SIDEBAR.DOCS.API'), path: "api", icon: "icon-api",
                url: "api.html"
            },
            {
                name: _i('SIDEBAR.DOCS.FAQ'), path: "faq", icon: "icon-faq",
            }
        ]
    }

    export default {
        data() {
            return pageData;
        },
        // name: "app",
        components: {
            Headers: require("@/components/header.vue"),
            Footers: require("@/components/footer.vue"),
            SideBar: require("@/components/sidebar.vue"),
        },
        created() {
            this.$Message.config({
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
        min-height: calc(100% - 50px)
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



