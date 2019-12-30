<template>
       <div class="multi-list">
           <multiCollapseItem :cols="cols" deep="0" :titles="titles" :disableType="disableType" @collapse-operate="collapseOperate"></multiCollapseItem>
       </div>
</template>

<script>
    /**
     * 多层折叠面板嵌套
     * @param res
     * @author
     *   titles 定义表头数据
     *  cols定义body数据
     *  disableType 操作无效的显示方式  可以是hidden 或默认的disabled
     *  每一行记录对应的操作，可以设置操作有效性，disabled 属性 。
     *  每一行记录另需要设置下一个子项是否展开，isOpen属性
     *
     *
     *   输入数据结构如下，传递到下一层 multi-collapse-item
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
    import multiCollapseItem from '@/components/goods-class/multi-collapse-item';
    export default {
        name: "multiCollapseList",
        props:['cols','titles','disableType'],
        components:{
            multiCollapseItem:multiCollapseItem,
        },
        methods:{
            collapseOperate(data){
                this.$emit('collapse-operate',data)
            }
        },

    }
</script>

<style scoped>
    .multi-list{
        border-left:1px solid #EEEEEE ;
        border-right:1px solid #EEEEEE;
    }
</style>
