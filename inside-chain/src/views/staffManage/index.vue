<template>
    <div class="staffManage">
        <div class="staffNav">
            <crumbBar class="mb-20px">
                <a v-for="item in tabData"
                :class="{'active': item.path === currentPath || (item.children && item.children.indexOf(currentPath) >= 0) }"
                @click="jump(item)">
                    {{item.name}}
                </a>
            </crumbBar>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    let tabData = [
        {
            // path:'/staff_list',
            path:'',
            name:'门店员工'
        },
        {
            path:'/role_list',
            name:'店员职级'
        }
    ]
    export default {
        components: {
            crumbBar,Crumb
        },
        data () {
            return {
                tabData,
                currentPath:'',
            }
        },
        created () {
            this.$store.dispatch("leftNav/setNav", 18);
            this.currentPath = '/' + window.location.hash.split("\/")[1].split("?")[0]
        },
        methods: {
            async jump(item){
                if (!!item.path) {
                    let query = this.$route.query
                    await this.$router.push({
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
        },
        updated() {
            this.currentPath = '/' + window.location.hash.split("\/")[1].split("?")[0]
        },
    }
</script>
<style lang="scss" scoped>
    .staffManage{
        padding: 30px;
        .staffNav{
            transition: box-shadow 0.3s;
            &:hover{
                box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
            }
            a {
                display: inline-block;
                font-size: 14px;
                color: #999999;
                margin-right: 50px;
                & :last-child {
                    margin-right: 0;
                }
            
                &.active {
                    color: #D83F3F;
                    padding-bottom: 4px;
                    border-bottom:4px solid #D83F3F
                }
            }
        }
    }
</style>


