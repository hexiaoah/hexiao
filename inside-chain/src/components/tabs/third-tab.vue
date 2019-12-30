<template>
    <div>
        <div class="tab-wrap">
            <a v-for="item in tabData"
            :class="{'active': item.path === currentPath || (item.children && item.children.indexOf(currentPath) >= 0) }"
            @click="jump(item)">
                {{item.name}}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'third-tab',
        props: {
            tabData: {
                type: Array,
                default: null
            }
        },
        computed: {
            currentPath(){
                return '/' + window.location.hash.split("\/")[1].split("?")[0]
            }
        },
        methods: {
            jump(item){
                if (!!item.path) {
                    let query = this.$route.query
                    this.$router.push({
                        path: item.path,
                        query: query
                    })
                }
                else {
                    this.$Message.info(
                        '正在开发中，敬请期待。如有需要，请在二维火掌柜APP进行操作'
                    )
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .tab-wrap {
        padding: 6px 0 0;
        color: #999999;
        font-size: 14px;

        a {
            display: inline-block;
            /*vertical-align: middle;*/
            font-size: 14px;
            color: #999999;
            margin-right: 50px;

            &.active {
                color: #D83F3F;
                padding-bottom: 4px;
                /*vertical-align: top;*/
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>

