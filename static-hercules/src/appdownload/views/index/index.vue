<template>
    <div class="download_background">
        <div class="download_cloudcash">
            <a href="http://app.appurl.cc/22675424" class="downloadTitle">立即下载</a>
        </div>
        <div class="download_manager">
            <a href="http://app.appurl.cc/79811570012" class="downloadTitle">立即下载</a>
        </div>
        <div class="download_chain">
            <a href="http://appurl.me/79811570112" class="downloadTitle">立即下载</a>
        </div>
    </div>
    
</template>
<script>
export default {
    data() {
    },
    methods: {
    },
    components: {
    },
    created() {
    }
}
</script>
<style lang="scss" scoped>
    .download_background{
        position:fixed;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        background-image: url("../../images/download_background.png");
        background-size: 100%;
        background-color: #CE3D37;
        background-repeat: no-repeat;
    }
    .download_cloudcash{
        background-image: url("../../images/download_cloudcash.png");
        background-size: 90%;
        width: 100%;
        height: 260px;
        margin-top: 180px;
        margin-left: 5%;
        background-repeat: no-repeat;
    }
    .download_manager{
        background-image: url("../../images/download_manager.png");
        background-size: 90%;
        width: 100%;
        height: 260px;
        margin-top: 44px;
        margin-left: 5%;
        background-repeat: no-repeat;      
    }
    .download_chain{
        background-image: url("../../images/download_chain.png");
        background-size: 90%;
        width: 100%;
        height: 260px;
        margin-top: 44px;
        margin-left: 5%;
        background-repeat: no-repeat;
    }
    .downloadTitle{
        color: #A0603E;
        font-size: 32px;
        text-align: center;
        margin-left: 53%;
        margin-top: 15%;
        display: inline-block;
    }
</style>

