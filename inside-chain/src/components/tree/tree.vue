<template>
    <div>
        <treeNode @emitExpand="emitNodeExpand" @emitClick="emitNodeClick" :data='tree'></treeNode>
    </div>
</template>
<script>
    import treeNode from './node.vue'
    export default {
        name: 'tree-node',
        components: {
            treeNode
        },
        methods: {
            emitNodeExpand(e){
                this.$emit('z-expand', e)
            },
            emitNodeClick(e) {
                this.$emit('z-click', e)
            }
        },
        props:['tree'],
    }
</script>
