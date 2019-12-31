<template>
    <div class="wrap">
        <Headers></Headers>
        <section class="main-wrap">
            <div class="iframe-wrapper">
                <iframe id="iframeEl" name="iframeEl" width="100%" height="100%" frameborder="0" :src="iframeSrc"></iframe>
            </div>
        </section>
        <Footers></Footers>
    </div>
</template>

<script>
import { API_SRC } from "apiConfig";
export default {
    name: "",
    data() {
        return {
            iframeSrc: API_SRC
        };
    },
    components: {
        Headers: require("@/components/header.vue"),
        Footers: require("@/components/footer.vue"),
        // indexTitle: require("@/components/index-title.vue"),
        // OpenModal: require("@/components/open-modal.vue")
    }
};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
    .wrap {
        height: 100%;
    }

    .main-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin-top: -50px;
        padding-top: 100px;
        box-sizing: border-box;

        .iframe-wrapper {
            height: 100%;
            overflow-y: hidden;
        }
    }
</style>

<style lang="less" src="../../theme/default.less"></style>
<style lang="scss" src="../../style/common.scss"></style>
