<template>
    <table ref="mutiLevelList">
        <thead v-if="thead">
        <td v-for="parentTitle in thead.parent.titles" v-if="thead.parent && thead.parent.titles" class="text-left">
            {{parentTitle.name}}
        </td>
        <td v-for="childTitle in thead.child.titles" v-if="thead.child && thead.child.titles" class="text-left">
            {{childTitle.name}}
        </td>
        <td v-if="(!!thead.parent && thead.parent.hasOperation) || (!!thead.child && thead.child.hasOperation)"
            class="opt-width text-left">
            操作
        </td>
        </thead>
        <tbody v-for="list in tbody">
        <!--总分类的单行记录项-->
        <tr class="main-catogory">
            <!--总分类-->
            <!--<td>总分类{{list.id}}</td>-->
            <td v-for="(parentTitle,parentTitleKey) in thead.parent.titles" class="text-left"
                v-if="list.parent && list.parent.contents">
                    <span v-if="parentTitle.contentType!='operate'">
                        <span
                            v-if="list.parent.contents[parentTitleKey] && list.parent.contents[parentTitleKey].content">
                            {{list.parent.contents[parentTitleKey].content}}
                        </span>
                        <span v-else>  -  </span>
                    </span>

                <span v-else>
                        <span v-for="(opt,optKey) in parentTitle.operates" class="span-opt">
                            <span
                                v-if="list.parent.contents[parentTitleKey] && list.parent.contents[parentTitleKey].operates &&  list.parent.contents[parentTitleKey].operates[optKey] && !!list.parent.contents[parentTitleKey].operates[optKey].disable">
                                <button v-if="list.parent.contents[parentTitleKey].operates[optKey].disableType=='hidden'" class="btn-operate" hidden
                                        @click="operateActionsParent(optKey , list)">{{opt.name}}
                                </button>
                                <button v-else-if="list.parent.contents[parentTitleKey].operates[optKey].disableType=='hidden'" class="btn-operate" hidden
                                        @click="operateActionsParent(optKey , list)">{{opt.name}}
                                </button>
                                <button v-else class="btn-operate" disabled
                                        @click="operateActionsParent(optKey , list)">{{opt.name}}
                                </button>
                            </span>
                            <span v-else>
                                <button class="btn-operate"
                                        @click="operateActionsParent(optKey , list)">
                                        {{opt.name}}
                                </button>
                            </span>
                        </span>
                    </span>
            </td>
            <td v-for="(childTitle,childTitleKey) in thead.child.titles"></td>

            <!--默认操作项-->
            <td v-if="(!!thead.parent && thead.parent.hasOperation) || (!!thead.child && thead.child.hasOperation )"
                class="text-left opt-width">
                    <span v-if="!!thead.parent&& thead.parent.hasOperation"
                          v-for="(opt,optKey) in thead.parent.operations" class="span-opt">
                        <span
                            v-if="list.parent.operations && list.parent.operations[optKey] && !!list.parent.operations[optKey].disable ">
                                <button v-if="list.parent.operations[optKey].disableType=='hidden'" class="btn-operate" hidden
                                        @click="operateActionsParent(optKey , list )">{{opt.name}}
                                </button>
                                <button v-else-if="list.parent.operations[optKey].disableType=='transparent'" class="btn-operate" transparent>{{opt.name}}
                                </button>
                                <button v-else class="btn-operate" disabled
                                        @click="operateActionsParent(optKey , list)">{{opt.name}}
                                </button>
                        </span>
                        <span v-else>
                            <button class="btn-operate"
                                    @click="operateActionsParent(optKey ,list)">{{opt.name}}
                            </button>
                        </span>
                    </span>
            </td>
        </tr>

        <!--子类的单行记录项-->
        <tr class="sub-catogory" v-for="childItem in list.child">
            <!--<td>子分类{{childItem.id}}</td>-->
            <td v-for="(parentTitle,parentTitleKey) in thead.parent.titles"></td>
            <td v-for="(childTitle,childTitleKey) in thead.child.titles"
                v-if="childItem.contents && childItem.contents[childTitleKey]" class="text-left child-opt">
                    <span v-if="childTitle.contentType!='operate'">
                        {{childItem.contents[childTitleKey].content}}
                    </span>
                <span v-else>
                        <span v-for="(opt,optKey) in childTitle.operates" class="span-opt">
                            <span
                                v-if="childItem.contents[childTitleKey] && childItem.contents[childTitleKey].operates && childItem.contents[childTitleKey].operates[optKey] && !!childItem.contents[childTitleKey].operates[optKey].disable">
                                <!--<button v-if="disableType=='hidden'" class="btn-operate" hidden-->
                                        <!--@click="operateActionsChild(optKey  , childItem ,list)">{{opt.name}}-->
                                <!--</button>-->
                                <button v-if="childItem.contents[childTitleKey].operates[optKey].disableType=='transparent'"
                                        class="btn-operate"
                                        transparent>{{opt.name}}
                                </button>
                                <button v-else-if="childItem.contents[childTitleKey].operates[optKey].disableType=='hidden'"
                                        class="btn-operate"
                                        hidden>{{opt.name}}
                                </button>
                                <button v-else class="btn-operate" disabled
                                        @click="operateActionsChild(optKey  , childItem ,list)">{{opt.name}}
                                </button>
                            </span>
                            <span v-else>
                                <button class="btn-operate"
                                        @click="operateActionsChild(optKey  , childItem ,list)">{{opt.name}}
                                </button>
                            </span>
                        </span>
                    </span>
            </td>
            <td v-else></td>
            <td v-if="(!!thead.parent && thead.parent.hasOperation) || (!!thead.child && thead.child.hasOperation)"
                class=" text-left opt-width child-opt">
                <span v-if="!!thead.child && thead.child.hasOperation"
                      v-for="(opt,optKey) in thead.child.operations" class="span-opt">
                        <span
                            v-if="childItem.operations && childItem.operations[optKey] && !!childItem.operations[optKey].disable">
                                <button v-if="childItem.operations[optKey].disableType=='transparent'"
                                        class="btn-operate"
                                        transparent>{{opt.name}}
                                </button>
                                <button v-else-if="childItem.operations[optKey].disableType=='hidden'"
                                        class="btn-operate"
                                        hidden>{{opt.name}}
                                </button>
                                <button v-else class="btn-operate" disabled
                                        @click="operateActionsChild(optKey  , childItem ,list)">{{opt.name}}
                                </button>
                        </span>
                        <span v-else>
                            <button class="btn-operate"
                                    @click="operateActionsChild(optKey  , childItem ,list)">{{opt.name}}
                            </button>
                        </span>
                    </span>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    /**
     *
     * @param
     * thead:表头结构，对总类别及对应子对象的定义，分别是parent及child两个对象
     *       总类别和其子对象可以包含默认的操作，由hasOperation参数决定,默认这两个操作在表的同一列上
     *       当然，也可分别自定义操作,在表头记录对应的title中设置contentType为’operate‘即可。
     *       否则默认contentType是文字形式
     *
     *       默认每个子对象的操作都一致
     *       默认每个总类别的操作一致
     *
     *       期间的操作需要有且仅唯一的操作ID，以便对不同的操作特殊处理
     *
     * thbody:表列表内容，每一条记录包含总类别（parent)和对应子数据记录(child)
     *
     *        针对不同的总类，子类，操作可能有效性不一样，设置operate的disable属性
     *
     * disableType设置按钮无效的显示方式，隐藏或disabled
     *
     * @author
     *
     */
    // const theData = {
    //     disableType: 'hidden',//'default':
    //     thead: {//表头对总类别与子类别的信息定义
    //         parent: {
    //             titles: {
    //                 1: {
    //                     name: '商品分类',
    //                     contentType: 'text'
    //                 },
    //                 2: {
    //                     name: '分类操作',
    //                     contentType: 'operate',
    //                     operates: {
    //                         10: {
    //                             name: '自定义操作1',
    //                             function: function (item) {//item是一条子对象记录的信息，tbody[index].child
    //                             }
    //                         },
    //                     }
    //                 }
    //             },
    //             hasOperation: true,
    //             operations: {//对总类的操作，默认的操作，与child的默认操作在同一列上
    //                 11: {
    //                     name: '删除',
    //                     function: function (item) {//item是表一条记录的信息，tbody[index]
    //                     }
    //                 }
    //             },
    //         },
    //         child: {
    //             titles: {
    //                 1: {
    //                     name: '商品名称',
    //                     contentType: 'text'
    //                 },
    //                 2: {
    //                     name: '商品价格',
    //                     contentType: 'text'
    //                 },
    //                 3: {
    //                     name: '商品描述',
    //                     contentType: 'text'
    //                 },
    //                 4: {
    //                     name: '自定义操作chi',
    //                     contentType: 'operate',
    //                     operates: {
    //                         1: {
    //                             name: '自定义操作1',
    //                             function: function (item) {//item是一条子对象记录的信息，tbody[index].child
    //                                 console.log('自定义操作1', item)
    //                             }
    //                         },
    //                         2: {
    //                             name: '自定义操作2',
    //                             function: function (item) {//item是一条子对象记录的信息，tbody[index].child
    //                                 console.log('自定义操作2', item)
    //                             }
    //                         }
    //                     }
    //                 }
    //             },
    //             hasOperation: true,
    //             operations: {
    //                 12: {
    //                     name: '删除',
    //                     function: function (item) {//item是一条子对象记录的信息，tbody[index].child
    //                         console.log('删除', item)
    //                     }
    //                 },
    //
    //             }
    //         }
    //     },
    //     tbody: [
    //         {
    //             id: 11,
    //             parent: {
    //                 contents: {
    //                     1: {
    //                         content: '水果类'
    //                     },
    //                     2: {
    //                         operates: {
    //                             10: {
    //                                 disable: true
    //                             },
    //                         }
    //                     },
    //                 },
    //                 operations: {
    //                     11: {
    //                         disable: true
    //                     }
    //                 }
    //             },
    //             child: [
    //                 {
    //                     id: 111,
    //                     contents: {//child列表项
    //                         1: {
    //                             content: '商品名称1111'
    //                         },
    //                         2: {
    //                             content: '商品价格1112'
    //                         },
    //                         3: {
    //                             content: '商品描述1113'
    //                         },
    //                         4: {
    //                             operates: {
    //                                 1: {
    //                                     disable: false
    //                                 },
    //
    //                                 2: {
    //                                     disable: true,
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     operations: {
    //                         12: {
    //                             disable: true
    //                         }
    //                     }
    //                 },
    //                 {
    //                     id: 112,
    //                     contents: {
    //                         1: {
    //                             content: '商品名称1121'
    //                         },
    //                         2: {
    //                             content: '商品价格1122'
    //                         },
    //                         3: {
    //                             content: '商品描述1123'
    //                         },
    //                         4: {
    //                             operates: {}
    //                         }
    //                     }
    //                 },
    //             ]
    //         },
    //         {
    //             id: 12,
    //             parent: {
    //                 contents: {
    //                     1: {
    //                         content: '水果类'
    //                     },
    //                     2: {
    //                         operates: {
    //                             10: {
    //                                 // disable:true
    //                             },
    //                         }
    //                     },
    //                 },
    //                 operations: {
    //                     11: {
    //                         disable: false
    //                     }
    //                 }
    //             },
    //             child: [
    //                 {
    //                     id: 121,
    //                     contents: {//child列表项
    //                         1: {
    //                             content: '商品名称1211'
    //                         },
    //                         2: {
    //                             content: '商品价格1212'
    //                         },
    //                         3: {
    //                             content: '商品描述1213'
    //                         },
    //                         4: {
    //                             operates: {
    //                                 1: {
    //                                     disable: false
    //                                 },
    //
    //                                 2: {
    //                                     disable: true,
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     operations: {
    //                         12: {
    //                             disable: true
    //                         }
    //                     }
    //                 },
    //                 {
    //                     id: 122,
    //                     contents: {
    //                         1: {
    //                             content: '商品名称1121'
    //                         },
    //                         2: {
    //                             content: '商品价格1122'
    //                         },
    //                         3: {
    //                             content: '商品描述1123'
    //                         },
    //                         4: {
    //                             operates: {
    //                                 1: {
    //                                     disable: true
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 },
    //             ]
    //         },
    //     ]
    // }
    export default {
        name: "multiLevelList",
        props: ['thead', 'tbody', 'disableType'],
        methods: {
            //optId:操作的id，item:该操作传递的参数 ， 一般为对应单条记录
            //因此每个操作需要有唯一的操作id
            operateActionsParent(optId, item, childs) {
                this.$emit('on-operate', {
                    optId: optId,
                    isParent: true,//是父对象吗
                    item: item,
                    childs: childs
                })
            },

            operateActionsChild(optId, item, parentItem) {
                this.$emit('on-operate', {
                    optId: optId,
                    isParent: false,//是父对象吗
                    item: item,//上一级父对象
                    parent: parentItem
                })
            },
        },
    }
</script>

<style scoped>
    table {
        text-align: center;
        border-left: 1px solid #EEEEEE;
        border-right: 1px solid #EEEEEE;
    }

    table thead {
        background-color: #f1f1f1;
    }

    table tbody {
        box-shadow: 0 1px 0 0 #EEEEEE;
        -webkit-box-shadow: 0 1px 0 0 #EEEEEE;
    }

    table tr {
        /*box-shadow: 0 1px 0 0 #EEEEEE;*/
        /*-webkit-box-shadow: 0 1px 0 0 #EEEEEE;*/
        border: none;
    }

    table tbody td {
        height: 40px;
        padding: 0 10px;
        color: #333;
    }

    table thead td {
        height: 40px;
        padding: 0 10px;
        color: #333;
        max-width: 300px;
        min-width: 180px;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .btn-operate {
        color: #68a7ff;
        border: none;
        background: none;
        outline: none;
        margin-right: 15px;
    }

    .btn-operate[disabled] {
        color: #aaa;
    }

    td.opt-width {
        width: 180px;
    }

    .span-opt button {
        position: relative;
        cursor: pointer;
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

    .btn-operate[transparent] {
        display: inline-block;
        opacity: 0;
    }

    .child-opt{
        border-top: 1px solid #EEEEEE;
        /*box-shadow: 0 1px 0 0 #EEEEEE;*/
        /*-webkit-box-shadow: 0 1px 0 0 #EEEEEE;*/
    }
</style>
