<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">
            <p class="title">{{ pushTitle }}</p>
            <p class="desc">{{ pushDesc }}</p>
            <p class="title">{{ flowTitle }}</p>
            <p class="desc" v-html="flowDesc"></p>
            <img class="pic" src="../../../images/doc-message.png" alt="message">
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";

    let pageData = {
        pushTitle: _i('DOC.MESSAGE.PUSH.TITLE'),
        pushDesc: _i('DOC.MESSAGE.PUSH.DESC'),
        flowTitle: _i('DOC.MESSAGE.FLOW.TITLE'),
        flowDesc: _i('DOC.MESSAGE.FLOW.DESC')
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
        },
        methods: {
        },
        created() {
        }
    }
</script>

<style lang="scss" scoped="">
    .wrap {
        max-width: 1270px;
        text-align: left;
        padding: 20px 0 60px 0;

    }

    .title {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }

    .desc {
        font-size: 14px;
        color: #333333;
        line-height: 30px;

        margin-bottom: 10px;
    }

    .pic {
        width: 100%;
        max-width: 1270px;
        height: auto;
    }



</style>
