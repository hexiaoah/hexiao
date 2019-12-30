<script>
    /**
     -- zeqi@2dfire

     @props:
     title：卡片标题

     @event:
     on-tap: 点击卡片，冒泡

     列表页用卡片容器
     */

    import imgBox from '../img/img-box.vue'

    export default {
        props: ["title","image","type","status","desc","statusText"],
        methods: {
            clickCard() {
                this.$emit('on-tap')
            }
        },
        components: {
            imgBox
        }
    }
</script>

<template>
<div class="card">
    <div class="card-body">
        <div @click="clickCard" class="card-title">
            <span class="main-title oneline"  @click="clickCard">{{title}}</span>
            <span v-if="statusText" :class="{'card-tip':true,'card-tip-close':status == '2'}">{{statusText}}
            <slot name="titleBtn"></slot>
            </span>

        </div>
        <div class="card-img-wrap"  @click="clickCard">
            <!--<img :src="image" class="card-img" alt="IMAGE">-->
            <imgBox :src="image" :border="1" class="card-img"></imgBox>

            <img v-if="type" :src="type" class="card-label" alt="">
            <!-- <span class="card-img-desc">{{desc}}</span> -->
        </div>
        <div class="card-content"  @click="clickCard">
            <slot name="content">

            </slot>
            <div class="fl-clear"></div>
        </div>
        <div class="fl-clear"></div>
    </div>
    <div class="fl-clear"></div>
    <div class="card-footer"  @click="clickCard">
        <slot name="footer">

        </slot>
    </div>
</div>
</template>

<style lang="scss" scoped>
    .card {
        width: 100%;
        background-color: #FFFFFF;
        cursor: pointer;
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
        transition: box-shadow 0.3s;
    }

    .card:hover {
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }

    .card-body {
        padding: 16px;
        padding-bottom: 10px;
        .card-title {
            font-size: 16px;
            color: #3C4144;
            line-height: 100%;

            margin-bottom: 12px;
        }
        .main-title {
            width: calc(100% - 60px);
        }
        .card-tip {
            font-size: 12px;
            padding: 0 5px;
            min-width: 50px;
            text-align: center;
            color: #49C070;
            float: right;
            border: 1px solid #49C070;
            border-radius: 4px;
        }
        .card-tip-close{
            color: #D83F3F;
            border-color: #D83F3F;
        }
        .card-img-wrap {
            float: left;
            width: 128px;
            height: auto;
            padding-left: 5px;

            margin-right: 20px;

            font-size: 0;
        }
        .card-img {
            width: 128px;
            height: 128px;
            border-radius: 5px;
        }
        .card-img-desc {
            font-size: 12px;
            color: #333333;

            display: inline-block;
            width: 100%;
            text-align: center;
            margin-top: 10px;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .card-label {
            width: 30px;
            height: 32px;

            position: absolute;
            margin-top: -131px;
            margin-left: 5px;
        }
        .card-content {
            float: left;
            width: calc(100% - 150px);
            font-size: 12px;
            color: #666666;
            letter-spacing: 0;
            line-height: 24px;
        }
    }

    .card-footer {
        width: 100%;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        /*line-height: 48px;*/
        border-top: 1px solid #DEDEDE;
        padding: 12px 20px;
    }
</style>

