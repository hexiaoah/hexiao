<template>
    <div class="crumb-wrap">
        <a class="unactive" @click="jump()">桌位管理</a><span class="second">{{second}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            second: String
        },
        methods: {
            jump() {
                let self = this;
                let entityId = self.$route.query.entityId
                self.$router.push({
                    path: '/shop_table_manage',
                    query: {
                        entityId
                    }
                })
            }
        },
        created() {

        }
    };
</script>
<style lang="scss" scoped>
    .crumb-wrap {
        height: 20px;
        line-height: 20px;
        color: #151515;
        font-size: 14px;
        a.unactive {
            color: #999;
        }
        a {
            display: inline-block;
            vertical-align: middle;
            color: #151515;
        }
        &:before {
            content: "";
            display: inline-block;
            width: 3px;
            height: 20px;
            background-color: #d83f3f;
            border-radius: 3px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    .second {
        padding-left: 20px;
        &:before {
            display: inline-block;
            position: relative;
            left: -10px;
            content: "/";
        }
    }
</style>
