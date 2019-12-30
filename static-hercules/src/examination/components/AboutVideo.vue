<template>
    <div class="video-wrapper">
        <h2 class="h2">相关视频</h2>
        <ul class="section-main border-t border-b">
            <li class="list" v-for="(item,index) in video"  :key="index">
                <a :href="item.url" class="video" v-click="{name:'click_exam_item_detail_video',info:{video_name:item.title}}">
                    <div class="img">
                        <img :src="item.img">
                        <span class="time">{{item.time}}</span>
                    </div>
                    <div class="title text-1">{{item.title}}</div>
                    <div class="hint">
                        <span class="teacher text-1"> 讲师：{{item.teacher}}</span>
                        <span class="right text-1">{{item.browsing}}人看过</span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'result',
        props: {
            video: {
                request: true
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {

        },
        computed: {},
        methods: {}
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .section-main {
        /*padding: 0 15PX;*/
        overflow: hidden;
        padding-top: 20PX;
        .list {
            display: inline-block;
            float: left;
            margin: 0 0 20PX 0;
            width: 50%;
            box-sizing: border-box;
            &:nth-child(2n+1) {
                padding: 0 12.5PX 0 15PX;
            }
            &:nth-child(2n) {
                padding: 0 15PX 0 12.5PX;
            }
        }
        .img {
            position: relative;
            line-height: 0;
            height: 90PX;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(74, 74, 74, .5) url("https://assets.2dfire.com/frontend/0509a45425a48569f95b9a59dd29fd05.png") no-repeat center;
                background-size: 25PX;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .time {
                color: white;
                position: absolute;
                top: 0;
                right: 2PX;
                font-size: 10PX;
                letter-spacing: 0;
                text-align: right;
                line-height: 12PX;
            }
        }
        .title {
            margin: 5PX 0;
            font-size: 15PX;
            color: #4A4A4A;
            letter-spacing: 0;
            line-height: 20PX;
        }
        .hint {
            font-size: 10PX;
            color: #999999;
            letter-spacing: 0;
            line-height: 12PX;
            overflow: hidden;
            .teacher {
                display: inline-block;
                width: 50%;
            }
            .right {
                float: right;
                text-align: right;
            }
        }
    }
</style>
