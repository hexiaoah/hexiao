<template>
    <div class="example-wrapper ">
        <div class="mask" v-show="examplePhoto.isShow"></div>
        <div :class="['img', {active: examplePhoto.isShow}]">
            <img :src="examplePhoto.img"/>
            <i @click="closeMask" class="close_btn"></i>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {fixedBody, looseBody} from 'base/utils/unit.js'

    export default {
        name: 'ShopImgExample',
        props: {},
        data() {
            return {
                isMaskShow: false
            }
        },
        computed: {...mapState(["examplePhoto"])},

        mounted() {
            this.preLoad();
        },
        methods: {
            ...mapActions(["changeExamplePhoto"]),
            closeMask() {
                looseBody()
                this.changeExamplePhoto({isShow:false,img:''})
            },
            preLoad(){
                let bigImg=['https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg',
                'https://assets.2dfire.com/frontend/2313581ddc14fcb956826ad1f51157c5.jpg',
                'https://assets.2dfire.com/frontend/0c8d3bba26edfbfda5b8b755e4091cba.jpg',
                'https://assets.2dfire.com/frontend/556194d4757031c8696d41bfbb5c89fa.jpg'];
                let images = []
                for(let i=0; i<bigImg.length; i++){
                    images[i] = new Image()
                    images[i].src = bigImg[i]
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .example-wrapper {
        /*margin-left: 15px;*/
        .title {
            display: inline-block;
        }
        .example {
            padding: 12px 0;
            font-size: 15PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 20px;
        }

        .imgexample-wrapper {
            padding-right: 15px;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;

            li {
                width: 70px;
                height: 70px;
                background-color: #000000;
                border-radius: 4px;
                margin-bottom: 10px;
                background-size: 210px 140px;
                position: relative;
                z-index: 2;
                background-image: url('https://assets.2dfire.com/frontend/1f918012dc894a76e6a26dd4a72af374.png');

                &:nth-of-type(1) {
                    background-position: 0 0;
                }

                &:nth-of-type(2) {
                    background-position: -70px 0;
                }

                &:nth-of-type(3) {
                    background-position: 0 -70px;
                }

                &:nth-of-type(4) {
                    background-position: -140px 0;
                }

                &:nth-of-type(5) {
                    background-position: -70px -70px;
                }
            }
        }
    }

    .mask {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.50);
        z-index: 99;
    }

    .img {
        position: fixed;
        top: 0;
        transform: translate3d(0, -500px, 0);
        left: 15px;
        /*margin: auto;*/
        transition: all 0.5s ease-in-out;
        opacity: 0;
        z-index: 200;

        &.active {
            opacity: 1;
            transform: translate3d(0, 40px, 0);
        }

        img {
            width: 345px;
        }

        i {
            width: 28px;
            height: 28px;
            display: block;
            background-size: cover;
            margin: auto;
            margin-top: 20px;
            background-image: url(https://assets.2dfire.com/frontend/e75949af05318a3d2fef56e45f69c54e.png);
        }
    }

</style>

