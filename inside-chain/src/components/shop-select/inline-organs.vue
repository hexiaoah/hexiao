<script>
    /**
     -- zeqi@2dfire

     @props:

     */

    export default {
        props: ["data"],
        methods: {
            notLast(index) {
                let self =this;
                if(index < self.data.length - 1){
                    return true

                }else{
                    return false

                }
            },
            last(index) {
                let self =this;

                if(index == self.data.length - 1){
                    return true
                }
            }
        }
    }
</script>

<template>
    <div class="content-wrap">
        <span v-for="(item, index) in data">
            <span class="item" :class="{'last-item': last(index)}">
                {{item}}
            </span>
            <span class="item" v-if="notLast(index)">
                /
            </span>
        </span>

    </div>
</template>

<style lang="scss" scoped>
    .content-wrap {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        height: 22px;
        line-height: 22px;
    }

    .content-wrap:before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 20px;
        background-color: #d83f3f;
        border-radius: 3px;
        vertical-align: middle;
        margin-right: 10px;
    }

    .last-item{
        color: #333333;
    }

</style>

