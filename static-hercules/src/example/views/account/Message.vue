<script>
    module.exports = {
        data: function () {
            return {
                massage: "这是内容"
            }
        },
        route: {
//          vue-router 推荐 当页面切换时 在route函数中处理数据请求
            data(transition){
                this.massage = "这是message内容";
            }
        }
    }
</script>

<template>
    <div id="account-message" class="wrapper-account-message">
        <p class="message">{{ massage }}</p>
    </div>
</template>

<style src="./message.scss" lang="scss" scoped></style>

