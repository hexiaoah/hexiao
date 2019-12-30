<template>
    <ul>
        <li class="node-li" :class="{'nochildren':!a.children, 'hasChildren':a.children}" v-for='a in data'>

            <span class="arrow" :class="{'expand': !a.expand}" v-if="a.children" @click="emitExpand(a)"></span>

            <span class="title" :class="{'active': a.active, 'expand-title': !a.children}" @click="emitClick(a)">
                  {{a.branchName}}
            </span>
            <tree-node class="node" @emitExpand="nodeExpand" @emitClick="nodeClick" :data='a.children' v-if='a.expand'></tree-node>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'tree-node',
        props:['data'],
        methods: {
            emitExpand(e) {
                this.nodeExpand(e)
            },
            nodeExpand(e) {
                this.$emit('emitExpand',e)
            },
            emitClick(e) {
                this.nodeClick(e)
            },
            nodeClick(e) {
                this.$emit('emitClick',e)
            }
        },
        data(){
            return {
                show:false
            }
        }
    }
</script>
<style scoped="">


    .node {
        padding-left: 15px;
    }

    .arrow {
        cursor: pointer;
        display: inline-block;
        width: 9px;
        height: 5px;
        background-image: url("https://assets.2dfire.com/frontend/4bc5abe585bb1a97cc9f64c0be6c3e60.png");
        background-size: cover;
        margin-right: 3px;
        vertical-align: middle;
        transition: all 0.3s;
    }

    .expand {
        transform: rotate(-90deg);
    }

    .title {
        padding-left: 15px;
        cursor: pointer;
    }
    .title:hover {
        color: #cb4a4d;
    }

    .expand-title {
        /*padding-left: 15px;*/
        display: inline-block;
    }

    .active {
        padding: 2px 3px;
        padding-left: 3px;
        border-radius: 2px;
        background: #ffa7a2;
    }

    .node-li {
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .nochildren {
        padding-left: 0px;
    }
    .hasChildren .nochildren {
        padding-left: 15px;
    }

    .hasChildren .title {
        padding-left: 0px;

    }
    .hasChildren .active {

        padding-left: 3px ;

    }
    ul {
        list-style: none;
    }
</style>
