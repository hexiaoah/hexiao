<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <div class="groupManage">
            <div class="tab-wrap">
                <a v-for="item in tabData"
                :class="{'active': item.path === currentPath || (item.children && item.children.indexOf(currentPath) >= 0) }"
                @click="jump(item)">
                    {{item.name}}
                </a>
                <Poptip trigger="hover" width="300" :content="content"  placement="right-start">
                    <span class="title-mes">?</span>
                </Poptip>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
//可创建类别便于分组进行分类：例如可创建类别【门店位置】，用于归类机场店分组、火车站店分组、景区店分组等
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import emuGoodsTabs from "@/const/emu-groups-lib.js"
    import settingTabs from "@/components/tabs/third-tab"
export default {
    components:{
        crumbBar,
        Crumb,
        settingTabs
    },
    created() {
        this.$store.dispatch("leftNav/setNav", 15);
        this.currentPath = '/' + window.location.hash.split("\/")[1].split("?")[0]
    },
    data() {
        return {
            tabData:emuGoodsTabs,
            currentPath:'',
            content:'可创建类别便于分组进行分类：例如可创建类别【门店位置】，用于归类机场店分组、火车站店分组、景区店分组等'
        }
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
.groupManage{
    padding: 30px 30px ;
        .tab-wrap {
            color: #999999;
            font-size: 14px;
            background-color: #ffffff;
            min-height: 60px;
            box-shadow:  0 1px 0 0 rgba(0, 0, 0, 0.06);
            padding: 26px 30px 20px;
            margin-bottom: 20px;
            .title-mes{
                display: inline-block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 18px;
                border:1px solid #cccccc;
                border-radius: 100%;
                cursor: pointer;
            }
            /deep/ .ivu-poptip{
                margin-left: -40px;
                .ivu-poptip-body-content-inner{
                    white-space: pre-wrap;
                    padding: 10px;
                }
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

