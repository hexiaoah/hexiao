<script>
    module.exports = {
        data: function () {
            return {
                account: "这是内容"
            }
        },
        route: {
//          vue-router 推荐 当页面切换时 在route函数中处理数据请求
            data(transition){
                this.account = "accountUser";
            }
        }
    }
</script>

<template>
    <div id="account-user" class="wrapper-account-user">
        <div class="account">{{ account }}</div>
    </div>
</template>

<!-- view 样式要使用 wrapper- + 同ID名 的class名包裹css样式 防止样式冲突 -->
<style src="./accountUser.scss" lang="scss" scoped></style>

