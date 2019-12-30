<template>
    <div class="headquartersStaff">
        <div class="navWarp">
            <a 
            v-for="item in navList"
            :class="{ navItem:true, active: currentPath === item.path }"
            @click="jump(item)">
                {{item.name}}
            </a>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            navList:[
                {path:'/chain_staff_list',name:'总部员工'},
                {path:'/chain_role_action',name:'职级与权限'},
                {path:'',name:'操作日志'},
            ],
            currentPath:''
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
    created () {
         this.currentPath = '/' + window.location.hash.split("\/")[1].split("?")[0]
         this.$store.dispatch("leftNav/setNav", 17);
    }
}
</script>

<style lang="scss" scoped>
.headquartersStaff{
    .navWarp{
        height: 60px;
        padding: 20px 30px;
        background-color: #ffffff;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
        .navItem{
            display: inline-block;
            padding-bottom: 4px;
            margin-right: 50px;
            font-size: 14px;
            color: #3A3A3A;
            border-bottom: 4px solid transparent;
        }
        .active{
            color: #D83F3F;
            border-bottom-color: #D83F3F;
        }
    }
    .content{
        padding: 30px;
        
    }
}
</style>

