<template>
    <ul>
        <li class="node-li" :class="{'nochildren':!a.children, 'hasChildren':a.children}" v-for='a in data'>

            <Checkbox v-model="a.selected" @on-change="emitChange(a)" :disabled="a.disabled">
                <span class="title" :class="{'active': a.active, 'expand-title': !a.children}">
                  {{a.name}}
            </span>
            </Checkbox>

            <node-select class="node" @emitChange="nodeChange" :data='a.children'></node-select>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'node-select',
        props:['data'],
        methods: {
            emitChange(e) {
                this.nodeChange(e)
            },
            nodeChange(e) {
                this.$emit('emitChange',e)
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
        padding-left: 17px;
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
        /*padding-left: 15px;*/
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
