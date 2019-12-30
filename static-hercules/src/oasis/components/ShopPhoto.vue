<template>
    <div :class="['photoinfo-wrapper',{'border-b': title !== '法人身份证'}]">
        <div class="title">
            <p class="name" v-if="title">{{title}}
                <span class="example" v-if="exampleImg&&title && !isview&&!imgSrc"
                      @click="showExample(exampleImg)">查看图片示例</span>
            </p>
            <p :class="['must', {active: isCanChoose}]" v-if="title && !isview&&!imgSrc">
                {{isCanChoose ? '选传' : '必传'}}</p>
        </div>
        <p :class="['content border-b', {'pt0': !title}]" v-if="content">{{content}}</p>
        <div class="camera-wrapper border-f" v-if="!isview" @click="getPhoto">
            <div class="camera" v-show="!imgSrc">
                <img src="https://assets.2dfire.com/frontend/3b308d2eadb900c53315c8530db321fd.png"/>
                <span>添加图片</span>
            </div>
            <p class="rule" v-show="!imgSrc">图片格式为png,bmp,jpeg,jpg,gif；需小于2MB 。</p>
            <div class="photoimg" :style="{backgroundImage: 'url(' + imgSrc + ')'}"></div>
            <i class="removeImg" v-show="imgSrc" @click="removeImg($event)"></i>
        </div>
        <div class="camera-wrapper border-f" v-else
             :style="{backgroundImage: 'url(' + imgSrc + ')'}">
        </div>
    </div>
</template>

<script>
    import {fixedBody, looseBody} from 'base/utils/unit.js'
    import {mapActions} from 'vuex'
    import {isAndroid, isIos} from '../libs/client'

    export default {
        name: 'ShopPhoto',
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: '',
                required: true
            },
            isview: {
                type: Boolean,
                default: false,
                required: true
            },
            imgSrc: {
                type: String,
                default: ''
            },
            imgName: {
                type: String
            },
            exampleImg:{
                type:String
            },
            isCanChoose: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            ...mapActions([
                'modifyShopInfo',
                'changeExamplePhoto'
            ]),
            getPhoto() {
                let self = this
                if (isIos) {
                    try {
                        window.tdfire.uploadImage('new');
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                else if (isAndroid) {
                    try {
                        window.tdfire.uploadImage();
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                window.getImageUrl = function (url) {
                    self.modifyShopInfo({type: self.imgName, value: url})
                }
            },
            removeImg($event) {
                $event.stopPropagation()
                this.modifyShopInfo({type: this.imgName, value: ''})
            },
            /**
             * 显示图片
             * */
            showExample(url) {
                console.log(url)
                fixedBody();
                this.changeExamplePhoto({img: url, isShow: true})
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .photoinfo-wrapper {
        margin-left: 15px;
        padding: 12px 0 10px;
    }
    .example{
        color: #0088FF;
        font-size: 14px;
        margin-left: 10px;
    }
    .title {
        font-size: 15PX;
        overflow: hidden;

        .name {
            color: #333333;
            letter-spacing: 0;
            line-height: 20px;
            float: left;
        }

        .must {
            color: #FF0033;
            letter-spacing: 0;
            line-height: 20px;
            float: right;
            margin-right: 15px;

            &.active {
                color: #CCCCCC;
            }
        }
    }

    .content {
        font-size: 13PX;
        color: #999999;
        letter-spacing: 0;
        line-height: 18px;
        padding: 10px 0;

        &.pt0 {
            padding-top: 0;
        }
    }

    .camera-wrapper {
        position: relative;
        width: 345px;
        height: 160px;
        background: rgba(204, 204, 204, 0.10);
        margin-top: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50%;
        //background-attachment: fixed;

        & > .photoimg {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 90;
            background-size: contain;
            background-position: 50%;
            background-repeat: no-repeat;
        }

        &:before {
            border-style: dashed;
        }

        .camera {
            padding-top: 52px;
            text-align: center;
            font-size: 0;

            img {
                width: 38px;
                height: 30px;
            }

            span {
                font-size: 15PX;
                color: #999999;
                line-height: 20px;
                vertical-align: 8px;
                margin-left: 13px;
            }
        }

        .removeImg {
            position: absolute;
            background-image: url(https://assets.2dfire.com/frontend/ae288cfb7ec950a88b43a9cb390cb973.png);
            background-position: 50%;
            background-size: cover;
            width: 16px;
            height: 16px;
            display: block;
            top: -7px;
            right: -7px;
            z-index: 90;
        }

        .rule {
            position: absolute;
            left: 15px;
            bottom: 10px;
            font-size: 10PX;
            color: #999999;
            letter-spacing: 0;
            line-height: 12px;
        }
    }
</style>

