<script>
    /**
     -- zeqi@2dfire

     菜单内使用的小导航
     "菜单名"/当前功能名

     @props:
         menu: '左侧菜单名称'，
         second: '右侧功能名称'

     */
    export default {
        props: ["first", "second", "path"],
        name: "menuNav",
        computed: {
        },
        methods: {
            goBack() {
                let self = this;
                this.$router.push(
                    {
                        path: self.path,
                        query:{
                            plateEntityId: self.$route.query.plateEntityId
                        }
                    }
                );
            }
        },
        created() {
        }
    }
</script>

<template>
    <div class="menu-nav">
            <span class="first" @click="goBack">{{first}}</span>
        /
            <span class="second">
                {{second}}
            </span>
    </div>
</template>

<style lang="scss" scoped>
    .menu-nav {
        font-size: 14px;
        color: #3C4144;
        height: 20px;
        line-height: 20px;
    }

    .first {
        cursor: pointer;
    }

    .second{
        color: #999999;
    }

</style>

