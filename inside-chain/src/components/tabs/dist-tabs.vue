<template>
    <div class="tab-wrap">
        <a v-for="item in tabs" :class="{'active':item.active}" @click="jump(item)">
            {{item.name}}
        </a>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import distTabsModules from '@/store/modules/components/dist-tabs'

    export default {
        computed: mapGetters({
            tabs: "distTabs/list"
        }),
        methods: {
//            跳转点击的path，默认带入所有query
            jump(item) {
                let self = this;
                let query = self.$route.query
                let params = {
                    item: item,
                    query: query
                }
                this.$store.dispatch("distTabs/jump", params);
            }
        },
        created() {
            //            动态注册module
            let { distTabs={} } = this.$store.state

            if(Object.keys(distTabs).length <= 0) {
                this.$store.registerModule('distTabs', distTabsModules)
            }

            this.$store.dispatch("distTabs/setTab");
        }
    };
</script>
<style lang="scss" scoped>
    .tab-wrap {
        /*height: 20px;*/
        /*line-height: 20px;*/
        padding: 6px 0 0;
        color: #999999;
        font-size: 14px;
        a.active {
            color: #D83F3F;
            /*box-shadow: 0 6px #ffffff, 0 10px #D83F3F;*/
            padding-bottom: 4px;
            border-bottom: solid 4px #D83F3F;
            vertical-align: top;
        }
        a {
            display: inline-block;
            vertical-align: middle;
            font-size: 14px;
            color: #999999;
            margin-right: 50px;
            &:last-child {
                margin-right: 0px;
            }
        }
    }
</style>
