<template>
    <div class="app">
        <router-view :base-data='baseData' keep-alive></router-view>
    </div>
</template>
<script>
    var getMenuList = require("./apis/getMenuList");
    module.exports = {
        data: function () {
            return {
                baseData: {
                    msg: "这里用于存放公共数据"
                }
            }
        },
        methods: {
            query: function () {
                var _this = this;
                getMenuList({
                    showLoading: false,
                    success: function (resp) {
                        _this.$set('baseData', {
                            msg: "这里用于存放公共数据"
                        });
                    },
                    error: function () {
                        console.log("this is en error")
                    }
                });
            }
        },
        created: function () {
//        TODO:     项目全局公用的状态和数据在这里处理 用于在不同的 view 间共享/传递 数据/状态
            this.query()
        }
    }
</script>
<style src="./styles/index.scss" lang="scss"></style>
