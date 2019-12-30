<template>
    <div>
        <div class="top-wrapper">
            <img src="https://assets.2dfire.com/frontend/cff1084bcb4056781ff80e6bfb59de14.png" />
            <img class="sign-in-button" v-show="isTryOutShop" v-click="{name:'Active_Page_Button',info:'entityid=' + entityId}"  @click="gotoSignIn"
                src="https://assets.2dfire.com/frontend/45cb58289d4881f7a5b07725b1e99710.png" />
            <img class="sign-in-button" v-show="!isTryOutShop" src="https://assets.2dfire.com/frontend/4ac87903a94ce9a59c9a0eaec05f3478.png" />
        </div> 
        <div class="content-wrapper">
            <img src="https://assets.2dfire.com/frontend/09e45b627b1cc35991a54f416a4f0289.png" />
            <img class="qr-code" @click="downloadImage" src="https://assets.2dfire.com/frontend/aeb8d168589ca95d5f7d226c9a79ab25.png" />
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            qrCodeImage: "https://assets.2dfire.com/frontend/aeb8d168589ca95d5f7d226c9a79ab25.png",
            isTryOutShop: false,  // 是否是试用店铺或过期店铺
            entityId: this.$route.query.entityId,
        }
    },
    methods: {
        checkTryOutShopType() {
            let self = this
            let type = this.$route.query.trialShop
            if(type === 0) {
                self.showConfirm('当前店铺已为正式店铺！')
                self.isTryOutShop = false
            } else {
                self.isTryOutShop = true
            }
        },
        downloadImage() {  // 下载图片到native
            let self = this
            window.tdfire.downloadImage(this.qrCodeImage)
            window.downloadFinish = function(value) {
                if(value === 'success') {
                    self.$toast('保存成功')
                } else {
                    self.$toast('保存失败')
                }
            }
        },
        gotoSignIn() {  // 去签到
            if(this.isTryOutShop) {
                this.$router.push({path: './signin', query: {entityId: this.entityId}})
            }
        },
        showConfirm(context) {
            this.$alert({
                content: context,
                confirmText: '我知道了'
            })
        },

    },
    components: {
    },
    created() {
      document.title='活动详情';
      this.checkTryOutShopType();
    }
}
</script>
<style lang="scss" scoped>

    .top-wrapper{
        position: relative;

        .sign-in-button {
            position: absolute;
            padding-left: 100px;
            padding-right: 100px;
            bottom: -10px;
        }
    }

    .content-wrapper {
        position: relative;

        .qr-code {
            position: absolute;
            border: 6px solid #ffa153;
            border-radius: 25px;
            padding: 15px;
            width: 460px;
            height: 460px;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>

