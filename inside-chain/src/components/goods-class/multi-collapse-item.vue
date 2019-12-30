<template>
    <div ref="table">
        <div class="table">
            <div class="table-body" v-for="(list,index) in cols">
                <div class="table table-header" v-if="!!titles && index==0 && (deep==0)">
                    <!--<div class="table-cell td-item"></div>-->
                    <div class="table-cell td-item" v-for="title in titles">
                        {{title.name}}
                    </div>
                </div>
                <div class="table">
                    <!--<div class="table-cell td-item" :style="'padding-left:'+deep*5+'px'">-->

                    <!--</div>-->
                    <div class="table-cell td-item" v-for="(title,index) in titles" :key="index">
                        <span v-if="index==0" :style="'padding-left:'+deep*20+'px'">
                            <div class="icon-wrap" @click="toggle(list)"
                                 :class="{transparent:(deep>=3), 'plus':!!list.isOpen || !list.list}">
                                <div class="line"></div>
                                <div class="line v-line"></div>
                            </div>
                            {{list.item[title.id]}}
                            <!--: {{list.id }}-->
                        </span>
                        <span v-else>
                            <!--{{index}} {{item}}-->
                            <span v-if="title.type!='operate'">
                                {{list.item[title.id]}}
                            </span>
                            <span v-else>
                                    <span v-for="(opt,id) in title.operates" :key="id" class="span-opt">
                                        <span
                                            v-if="list.item && list.item[title.id] && list.item[title.id][id] &&  !!list.item[title.id][id].disabled">
                                             <button class="btn-operate"
                                                     v-if="list.item[title.id][id].disableType=='hidden'" hidden>
                                                {{opt.name}}
                                            </button>
                                            <button class="btn-operate"
                                                    v-else-if="list.item[title.id][id].disableType=='transparent'"
                                                    transparent>
                                                {{opt.name}}
                                            </button>
                                             <button class="btn-operate" v-else disabled
                                                     @click="operate(id,list,parent)">
                                                {{opt.name}}
                                                 <!--{{disableType}}-->
                                            </button>
                                        </span>

                                    <span v-else>
                                        <button class="btn-operate" @click="operate(id,list,parent)">
                                        {{opt.name}}
                                     </button>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
                <div v-if="list.list && !!list.isOpen">
                    <multiCollapseItem :cols="list.list" :deep="parseInt(deep)+1" :titles=titles
                                       :disableType="disableType" @collapse-operate="collapseOperate"
                                       :parent="list"></multiCollapseItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    /**
     * 多层折叠面板嵌套
     * @param res
     * @author
     *  titles 定义表头数据
     *  cols定义body数据
     *  disableType 操作无效的显示方式  可以是hidden 或默认的disabled
     *  每一行记录对应的操作，可以设置操作有效性，disabled 属性 。
     *  每一行记录另需要设置下一个子项是否展开，isOpen属性
     *
     *  输入数据结构如下：
     */
    // const theData = {
    //     disableType:'hidden',
    //     titles:[{
    //         id:1,
    //         type:'content',
    //         name:'分类名称'//must content
    //     },{
    //         id:2,
    //         type:'content',
    //         name:'名称'
    //     },{
    //         id:3,
    //         type:'operate',
    //         name:'操作',
    //         operates:{
    //             1:{
    //                 name:'删除',
    //             },
    //             2:{
    //                 name:'更改'
    //             }
    //         }
    //     }],
    //     cols:[
    //         {
    //             id:11,
    //             item:{
    //                 1:'商品分类',
    //                 2:'商品名称',
    //                 3:'操作'
    //             },
    //             isOpen:true,
    //             list:[
    //                 {
    //                     id:111,
    //                     item:{
    //                         1:'商品分类',
    //                         2:'商品名称',
    //                         3:{
    //                             1:{
    //                                 disabled:true,
    //                             },
    //                             2:{
    //
    //                             }
    //                         }
    //                     },
    //                     isOpen:true,
    //                     list:[
    //                         {
    //                             id:1111,
    //                             item:{
    //                                 1:'商品分类',
    //                                 2:'商品名称',
    //                                 3:'操作'
    //                             },
    //                             isOpen:true
    //                         },
    //                         {
    //                             id:11111,
    //                             item:{
    //                                 1:'商品分类',
    //                                 2:'商品名称',
    //                                 3:'操作'
    //                             },
    //                             isOpen:true
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             id:12,
    //             item:{
    //                 1:'商品分类',
    //                 2:'商品名称',
    //                 3:'操作'
    //             },
    //             isOpen:false,
    //             list:[
    //                 {
    //                     id:121,
    //                     item:{
    //                         1:'商品分类',
    //                         2:'商品名称',
    //                         3:'操作'
    //                     },
    //                     isOpen:false,
    //                     list:[
    //                         {
    //                             id:1211,
    //                             item:{
    //                                 1:'商品分类',
    //                                 2:'商品名称',
    //                                 3:'操作'
    //                             },
    //                             isOpen:false
    //                         },
    //                         {
    //                             id:12111,
    //                             item:{
    //                                 1:'商品分类',
    //                                 2:'商品名称',
    //                                 3:'操作'
    //                             },
    //                             isOpen:false
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //     ]
    // }
    export default {
        name: "multiCollapseItem",
        props: {
            cols: {//输入的列表项

            },
            titles: {//输入的表头项

            },
            deep: {//深度 默认0
                type: [Number, String],
            },
            disableType: {//hidden  or default
                type: String
            },
            parent: {}
        },
        methods: {
            toggle(list) {
                if (!list.list) {
                    list.isOpen = true
                    return;
                }
                list.isOpen = !list.isOpen
                console.log('list-----', list)
                this.$nextTick(function () {
                    // DOM 现在更新了
                    // `this` 绑定到当前实例
                    this.resizeWidthAll()
                })

            },
            resizeWidth() {
                if (this.$refs.table) {
                    if (this.deep == 0) {
                        let tabCells = this.$refs.table.querySelectorAll('.td-item')
                        if (!this.titles) return
                        let len = this.titles.length;
                        for (let i = 0; i < tabCells.length; i++) {
                            tabCells[i].style.width = tabCells[i % len].clientWidth + 'px';
                        }
                    }
                }
            },
            resizeWidthAll() {
                if (this.$refs.table) {
                    let tabCells = this.$refs.table.querySelectorAll('.td-item')
                    if (!this.titles) return
                    let len = this.titles.length;
                    for (let i = 0; i < tabCells.length; i++) {
                        tabCells[i].style.width = tabCells[i % len].clientWidth + 'px';
                    }
                }
            },

            operate(optId, list, parent) {
                this.$emit('collapse-operate', {
                    optId: optId,
                    item: list,
                    parent: parent,
                    deep: this.deep,
                })
            },
            collapseOperate(data) {
                this.$emit('collapse-operate', data)
            }
        },

        updated() {
            this.resizeWidth()
        },

        mounted() {
            var self = this;
            this.resizeWidth()
            window.onresize = function () {
                self.resizeWidth()
            }
            console.log('cols', this.cols)
            console.log('this.titles', this.titles)
        },
        destroyed() {
            window.onresize = ''
        }
    }
</script>

<style lang="scss" scoped>
    .icon-wrap {
        border: 1px solid #D83F3F;
        background: none;
        display: inline-block;
        width: 16px;
        height: 16px;
        text-align: center;
        color: #D83F3F;
        margin-right: 10px;
        line-height: 16px;
        cursor: pointer;
    }

    .line {
        background-color: #D83F3F;
        height: 2px;
        width: 10px;
        position: absolute;

        margin-top: 6px;
        margin-left: 2px;
    }

    .v-line {
        transform: rotate(-90deg);
        transition: all 0.3s;
    }

    .plus {
        .v-line {
            transform: rotate(0);
        }
    }

    .table {
        display: table;
        width: 100%;
        text-align: left;

    }

    .table-header {
        background: #dfdfdf;
        box-shadow: 0 1px 0 0 #EEEEEE;
        -webkit-box-shadow: 0 1px 0 0 #EEEEEE;
    }

    .table {
        display: table;
        width: 100%;
    }

    .table-cell {
        display: table-cell;
    }

    .table-body {
        width: 100%;
    }

    .table-body .table-cell {
        box-shadow: 0 1px 0 0 #EEEEEE;
        -webkit-box-shadow: 0 1px 0 0 #EEEEEE;
        height: 40px;
        vertical-align: middle;
        padding: 0 10px;
    }

    .table-header .table-cell {
        height: 40px;
        vertical-align: middle;
        padding: 0 10px;
    }

    .btn-operate {
        color: #68a7ff;
        border: none;
        background: none;
        margin: 0 15px 0 0;
        outline: none;
        cursor: pointer;
    }

    .btn-operate[disabled] {
        color: #aaa;
    }

    .btn-operate[transparent] {
        opacity: 0;
        color: #f00;
    }

    .span-opt button {
        position: relative;
    }

    .span-opt button:after {
        content: '';
        position: absolute;
        right: -7px;
        border-right: 1px solid #dedede;
        height: 12px;
        top: 50%;
        margin-top: -6px;
    }

    .span-opt:nth-last-child(1) button:after {
        display: none;
    }

    .transparent {
        opacity: 0;
    }
</style>
