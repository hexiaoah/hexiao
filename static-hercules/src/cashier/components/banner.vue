<template>
    <div class="banner-wrap swiper-container swiper-container-horizontal">
        <swiper :options="option" ref="mySwiper">
            <swiper-slide v-for="(item,index) in lists" :key="index">
                <a v-click="{name:'banner-'+item.name, info:loggerInfo}" @click="jump(item.url)"><img class="pic" :src="item.img" alt=""></a>
            </swiper-slide>
        </swiper>
        <div class="pages swiper-pagination"></div>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import "swiper/dist/css/swiper.css";

    export default {
        props: ["lists",'logger-info'],
        data() {
            return {
                option: {
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    notNextTick: true,
                    loop: false,
                    pagination: {
                        el: ".swiper-pagination",
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active"
                    }
                }
            };
        },
        methods: {
            jump(i) {
                window.location.href = i;
            }
        },
        computed: {
            isHigh() {
                return this.higher || false;
            },
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    };
</script>
<style lang="scss" scoped>
    .banner-wrap {
        width: 100%;
        height: 240px;
        position: relative;
    }

    .pic {
        width: 100%;
        height: 240px;
    }

    .high {
        height: 320px;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets.pages {
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        .swiper-pagination-bullet{
            margin: 0 4px;
        }
    }
</style>
