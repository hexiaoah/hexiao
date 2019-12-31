<!--
    侧边栏组件 zeqi at 2017/11/01

    传入list，自动生成侧边栏并分析跳转。

    @params :
        list: [
                {
                    name: "菜单1"),
                    path: "menu1",
                    list: [
                        {name: "菜单1-1", path: "menu11"},
                        {name: "菜单1-2", path: "menu12"},
                    ]
                },
                {
                    name: "菜单2",
                    path: "menu2"
                },
                {
                    name: "菜单3",
                    path: "",
                    url: "http://open.2dfire.com/doc/"
                }
            ]
      支持三种方式侧边栏项：1. 有二级菜单 2.仅有一级菜单 3.菜单直接跳转(需要url参数，设置目标跳转链接)

-->


<template>
    <div class="sb-wrap">
        <div class="sb-list">
            <ul>
                <li class="sb-li" v-for="(item, key) in list" :key="key" :class="{'active':first==key && !item.list}">
                    <a :href="item.url" @click="jumpUrl(item.path,key,item)">
                        <span class="icon" :class="item.icon"></span>
                        {{item.name}}
                        <span class="arrow fl-right" :class="{'arrow-up': !item.showSub}" v-show="item.list"></span>
                    </a>
                    <div v-if="item.list && item.list.length>0 && item.showSub">
                        <ul class="sub-nav">
                            <li v-for="(subitem,keys) in item.list" :key="keys">
                                <a @click="jumpUrls(item.path,subitem.path,keys,key)"
                                   :class="{'active':subitem.path == subActive}">{{subitem.name}} </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Tool from "@/base/tools";

    export default {
        props: ["list"],
        data() {
            return {
                first: -1,
                second: -1,
                subActive: ''
            };
        },
        watch: {
            $route (to) {
                if(to.meta.requireRouter){
                    var path=to.path;
                    var list=this.list;
                    let s,name,item;
                    for (var i=0;i<list.length;i++) {
                        if(list[i].path==path.split('_')[1]){
                            s=i;
                            name=path.split('_')[1];
                            item=list[i];
                            item.showSub=false
                        }
                    }
                    this.jumpUrl(name,s,item)
                }
                this.setRouter()
            }
        },
        methods: {
            jumpUrl(name, i, item) {
                if (item.url) {
                    return null;
                }
                let router = Tool.getRouter(1);
                let self = this;
                this.first = i;

                if (item.list && item.list.length > 0) {
                    let s = Tool.getRouter(3);
                    item.list.map((v, i) => {
                        if (v.path == s) {
                            self.second = i;
                        }
                    });
                    item.showSub = !item.showSub;
                }
                else if (!item.list) {
                    this.subActive = "";
                    this.$router.replace({
                        path: "/" + router + "_" + name
                    });
                }
            }
            ,
            jumpUrls(second, name, j) {
                this.first = j;
                let f = Tool.getRouter(1);
                this.subActive = name;
                this.$router.replace({
                    path: "/" + f + "_" + second + "_" + name
                });
            }
            ,
            setRouter() {
                let self = this;
                let f = Tool.getRouter(2);
                let s = Tool.getRouter(3);
                this.subActive = s || '';
                self.list.map((v, i) => {
                    if (v.path == f) {
                        self.first = i;
                        if (v.list) {
                            v.list.map((v1, i1) => {
                                if (v1.path == s) {
                                    self.second = i1;
                                }
                            });
                        }
                    }
                });
            },

        },
        created() {
            this.setRouter();
        },
        mounted(){
            var path=this.$route.path;
            var list=this.list;
            let s,name,item;
            for (var i=0;i<list.length;i++) {
                if(list[i].path==path.split('_')[1]){
                    s=i;
                    name=path.split('_')[1];
                    item=list[i];
                }
            }
            this.jumpUrl(name,s,item)
        },

    }

</script>
<style lang="scss" scoped>
    // .sb-wrap {
    //     float: left;
    //     width: 288px;
    //     height: 100%;
    //     overflow: auto;
    //     overflow-x: hidden;
    //     overflow-y: hidden;
    //     background-color: #FFFFFF;
    // }
   .sb-wrap {
        /*position: fixed;*/
        width: 288px;
        height: 100%;
        top: 0;
        left:0;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: hidden;
        background-color: #FFFFFF;
    }

    .sb-list {
        position: absolute;
        top: 106px;
        left: 30px;
        /*bottom: 65px;*/
        width: 268px;
        border: 1px solid #DEDEDE;
        border-top: 2px solid #333333;

        .sb-li {
            /*height: 40px;*/
            line-height: 40px;
            font-size: 16px;
            color: #333333;
            padding-left: 30px;

            a {
                display: inline-block;
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #dedede;

                .icon {
                    width: 18px;
                    height: 18px;
                    display: inline-block;
                    /*background-color: #333333;*/
                    vertical-align: middle;
                    margin-right: 15px;
                    background-size: cover;
                }
            }
        }
    }

    .active {
        background: #f1f1f1;
        background-origin: border-box;

    }

    .arrow {
        width: 13px;
        height: 6px;
        margin-top: 18px;
        margin-right: 15px;
        background: url("../images/icon-arrow.png");
        background-size: cover;

        transition: all 0.3s;
    }

    .arrow-up {
        transform: rotate(180deg)
    }

    .sub-nav {
        li {
            a{
                padding-left: 50px;
            }
        }
    }
</style>


