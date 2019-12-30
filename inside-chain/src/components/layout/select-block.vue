<script>
    /**
     -- zeqi@2dfire

     @props:
     type
     1: 类型1，左右显示
     2: 居中显示

     @events:
     on-tap: 点击选中
     on-cancel: 点击取消

     @select-block props:
     active: true 选中

     可选择的灰色块，内嵌base-block
     */

    import BaseBlock from './base-block.vue'

    export default {
        props: ["item"],
        data() {
            return {}
        },
        components: {
            BaseBlock
        },
        computed: {},
        methods:{
//            点击
            tapOne(){
                this.$emit('on-tap', this.item)
            },
//            取消
            cancelOne(){
                this.$emit('on-cancel', this.item)
            },
        },
        created() {

        }
    }
</script>

<template>
    <div class="sblock">
        <div :class="{'active': item.active}" v-show="item.active" @click="tapOne"></div>
        <div class="cancel" v-show="item.active" @click="cancelOne"></div>
        <BaseBlock :type="2" class="block" @on-tap="tapOne">
            {{item.name}}
        </BaseBlock>
    </div>
</template>

<style lang="scss" scoped>
    .sblock {
        cursor: pointer;

    }

    .active {
        border: 1px dotted #D83F3F ;
        position: absolute;
        height:40px;
        width: calc(100% - 10px);
    }

    .cancel {
        width: 20px;
        height: 20px;
        display: block;
        font-size: 0;

        position: absolute;
        right: 0;
        margin-top: -10px;

        background-image: url("https://assets.2dfire.com/frontend/f104e641a1f3cef7320b4a3d464291a0.png");
        background-size: cover;
    }


</style>

