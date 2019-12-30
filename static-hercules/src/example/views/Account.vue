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
                this.account = "嵌套view";
            }
        }
    }
</script>

<template>
    <div>
      <div id="account" class="wrapper-account">
        <div class="account">{{ account }}</div>
      </div>
      <ul class="nav nav-tabs">
        <li>
          <a v-link="{ name: 'news'}">News</a>
        </li>
        <li>
          <a v-link="{ name: 'message'}">Message</a>
        </li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<!-- view 样式要使用 wrapper- + 同ID名 的class名包裹css样式 防止样式冲突 -->
<style src="./account.scss" lang="scss" scoped></style>

