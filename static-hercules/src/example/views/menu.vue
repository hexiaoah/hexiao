<script>
    module.exports = {
        data: function () {
            return {
                list: [
                    "list item",
                    "list item",
                    "list item",
                    "list item"
                ]
            }
        },
        methods: {
            addItem: function () {
                this.list.push("new item");
            }
        },
        components: {
            'head-tab': require('../components/headTab.vue')
        },
        route: {
//          vue-router 推荐 当页面切换时 在route函数中处理数据请求
            data(transition){
                console.log("param");
            }
        }
    }
</script>

<template>
    <div id="menu" class="wrapper-menu">
        <ul>
            <li v-for="item in list" track-by="$index">
                {{ item }}
            </li>
        </ul>

        <button class="btn" @click="addItem">add item</button>
    </div>
</template>

<!-- view 样式要使用 wrapper- + 同ID名 的class名包裹css样式 防止样式冲突 -->
<style src="./menu.scss" lang="scss" scoped></style>

