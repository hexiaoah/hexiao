<!--
    授权页面（pc）用 顶部
-->
<template>
    <div class="header" id="open-header">
        <nav>
            <div class="nav-bar">
                <img src="../images/logo.png" class="logo" alt="logo">
                <span>{{header.title}}</span>
            </div>
        </nav>
    </div>
</template>
<script>
    import _i from "@/i18n/index";

    let pageData = {
        header: {
            title: _i('AUTH.HEADER.TITLE')
        }
    };


    export default {
        data() {
            return pageData;
        },
        methods: {
        },
        components: {
        },
        created() {
        }
    };
</script>
<style lang="scss" scoped>
    .header {
        height: 70px;
        line-height: 70px;
        background: #232323;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 0;
        padding: 0 30px;
        font-weight: bold;
        .nav-bar {
            text-align: center;
        }
    }
    .logo{
        width: 41px;
        height: 40px;
        position: relative;
        top: 12px;
        margin-right: 15px;
    }

</style>

