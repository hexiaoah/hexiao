<script>
    module.exports = {
        data: function () {
            return {
                news: "这是内容"
            }
        },
        route: {
//          vue-router 推荐 当页面切换时 在route函数中处理数据请求
            data(transition){
                this.news = "这是news内容";
            }
        }
    }
</script>

<template>
    <div id="account-news" class="wrapper-account-news">
        <p class="news">{{ news }}</p>
    </div>
</template>

<!-- view 样式要使用 wrapper- + 同ID名 的class名包裹css样式 防止样式冲突 -->
<style src="./news.scss" lang="scss" scoped></style>

