<script>
    /**
     -- zeqi@2dfire

     @props:
     title：容器title 传入任意字符串即可
     border :1, 可显示卡片边框，并且覆盖卡片阴影

     带标题的卡片容器，默认带阴影，可选为1px细边框
     */

    export default {
        props: ["title", "border"],
        computed: {
            classes(){
                if(this.border === 1){
                    return ['border']
                }
            }
        },
        created() {

        }
    }
</script>

<template>
<div class="card" :class="classes">
    <div class="card-body">
        <div class="card-title oneline" v-if="title">
            <span>{{title}}</span>
        </div>
        <slot></slot>
        <div class="fl-clear"></div>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .card {
        width: 100%;
        background-color: #FFFFFF;
        /*cursor: pointer;*/
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
        transition: box-shadow 0.3s;
    }

    .card:hover {
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }

    .border {
        box-shadow: 0 0 0;
        border: 1px solid #E6E6E6;
        border-radius: 4px;
        &:hover {
            box-shadow: 0 0 0;
        }
    }

    .card-body {
        padding: 15px;
        padding-right: 10px;
        padding-bottom: 20px;
        .card-title {
            font-size: 18px;
            color: #3C4144;
            line-height: 100%;
            font-weight: bold;

            margin-bottom: 12px;
        }

    }
    .fl-clear {
        clear: both;
    }
</style>

