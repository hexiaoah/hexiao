<!--
    树形选择组件
    created by zeqi

    @props
         tree: 数据 array

         结构如下
         [
            {
                name: '节点显示名称',
                ...,
                selected: 是否选中 //true||false,
                disabled: 是否可以选中 //true||false,
                children: [{}...] //子节点
            },
            ...
         ]

     @event
        z-change:
            返回当前选中的节点信息

-->

<template>
    <div>
        <SelectNode @emitChange="emitNodeChange" :data='tree'></SelectNode>
    </div>
</template>
<script>
    import SelectNode from './node-select.vue'
    export default {
        name: 'select-tree',
        components: {
            SelectNode
        },
        methods: {
            emitNodeChange(e){
                this.$emit('z-change', e)
            },
        },
        props:['tree'],
    }
</script>
