
<template>
    <div class="swiper-wrapper">
        
        <swiper :options="swiperOption"  v-if="bannerLists.length>1">
            <swiper-slide v-for="(item,index) in bannerLists" :key="index">
                <img :src="item.recommendUrl" alt="" class="banner" @click="toDetail(item.recommendJumpUrl, item.sort)">
            </swiper-slide>
            <div class="swiper-pagination pages" slot="pagination"></div>
        </swiper>
        <div class="banner-one" v-else>
            <img :src="bannerLists[0].recommendUrl" alt="" @click="toDetail(bannerLists[0].recommendJumpUrl, bannerLists[0].sort)" class="banner">
            <div class="more">更多产品<br/>敬请期待</div>
        </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
    props: {
        bannerObj: {
            type:Object,
            default(){
                return {}
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            bannerLists: this.bannerObj.advertUrl,
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 0,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    methods: {
        // 跳转详情
        toDetail(newUrl, sort) {
            const { name } = this.bannerObj
            this.$emit('on-tap', { newUrl, sort, name })
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper-wrapper{
    height:320px;
    .swiper-slide,.banner-one {
        width:528px;
        .banner{
            width:506px;
            height:320px;
            border-radius:12px;
            box-shadow: 0 8px 12px 0 #CCC;
        }
    }
    .banner-one{
        width:100%;
        font-size:0;
        .more{
            display: inline-block;
            width:160px;
            height:316px;
            border-radius:16px;
            background:#f0f0f0;
            box-shadow: 0 8px 12px 0 #CCC;
            -webkit-writing-mode: vertical-rl;
            writing-mode: vertical-rl;
            font-size:28px;
            color:#c3c3c3;
            text-align: center;
            margin-left:20px;
            padding-right:42px;
            line-height:38px;
        }
    }
    .swiper-pagination {
        bottom:12px;
        display: inline-block;
        padding:0 8px;
        height:24px;
        line-height:24px;
        width:auto;
        left:50%;
        transform: translateX(-50%);
        background:rgba(255,255,255,0.5);
        border-radius:16px;
        font-size:0;
    }
    .swiper-pagination{
        /deep/{
            .swiper-pagination-bullet{
                width:8px;
                height:8px;
                background:#d8d8d8;
                margin:0 6px;
                opacity: 1;
                vertical-align: top;
                margin-top:8px;
            }
            .swiper-pagination-bullet-active{
                width:12px;
                height:12px;
                background:#4A4A4A;
                margin-top:6px;
            }
        }
    } 
}

</style>