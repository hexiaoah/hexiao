<template>
    <div class="wrap">
        <!--pc端显示头-->
        <div class="pc">
            <Headers></Headers>
        </div>
        <section class="main-wrap">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    import Tool from "@/base/tools";
    import _i from "@/i18n/index";
    import Route from "@2dfire/utils/router";

    let pageData = {
        pc: true
    };
    export default {
        data() {
            return pageData;
        },
        components: {
            Headers: require("@/components/open-header.vue"),
            Footers: require("@/components/footer.vue"),
            SideBar: require("@/components/sidebar.vue")
        },
        methods: {
        },
        created() {

            let self = this;
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
    }

    .main-wrap {
        width: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
</style>

<style lang="less" src="../../theme/default.less"></style>
<style lang="scss" src="../../style/common.scss"></style>
<style lang="scss" src="./style/auth.scss"></style>



