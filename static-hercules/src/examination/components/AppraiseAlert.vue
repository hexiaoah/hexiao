<template>
    <div class="mask-wrapper " :class="showAlert?'z-show':'z-hide'">
        <div class="mask" @click="close"></div>
        <div class="mask-center">
            <div class="header">提意见</div>
            <div class="content border-t border-b border-l border-r">
                <textarea placeholder="亲，您觉得哪里不好呢？给我们提提意见吧~"
                          :value="val" @input="valChange($event)"></textarea>
                <div class="hint">{{valLeg}}/{{maxNum}}</div>
            </div>
            <div class="footer border-t">
                <span class="close border-r" @click="close">忽略</span>
                <span class="submit" :class="submitClass" @click="submit">提交</span>
            </div>
        </div>
    </div>
</template>

<script>
    import errorToast from 'src/ocean/libs/errorToast'
    import {feedback} from  '../config/api'
    import {fixedBody, looseBody} from 'base/utils/unit.js'

    export default {
        name: 'result',
        props: {
            showAlert: {
                request: true
            }
        },
        data() {
            return {
                maxNum: 200,
                val: ''
            }
        },
        created() {
        },
        methods: {
            valChange($event) {
                this.val = $event.target.value
                if (this.val.length > this.maxNum) {
                    this.val = this.val.slice(0, this.maxNum)
                }
            },
            close() {
                looseBody()
                this.$emit('hideAlert')
            },
            submit() {
                let self=this;
                if(!self.val){
                    return false;
                }
                feedback({
                    appraise:'BAD',
                    content:self.val
                }).then((ret)=>{
                    looseBody()
                    errorToast.show('提交成功')
                    self.val='';
                    self.$emit('hideAlert')
                }).catch((result)=>{
                    errorToast.show('提交失败')
                });
            }
        },
        computed: {
            valLeg() {
                return this.val.length
            },
            submitClass() {
                return this.val.length > 0 ? ' isOk' : ''
            },
        },
        components: {},
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .z-hide {
        .mask {
            opacity: 0;
            pointer-events: none;
        }
        .mask-center {
            transform: translateY(200%);
        }
    }

    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
        opacity: 1;
        transition: .2s opacity;
        pointer-events: auto;
    }

    .mask-center {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 540px;
        height: 448px;
        margin-top: -224px;
        margin-left: -270px;
        background: rgba(255, 255, 255, 0.90);
        border-radius: 26px;
        text-align: center;
        transition: .2s all;
        transform: translateY(0) translate3d(0, 0, 0);
    }

    .header {
        font-size: 30px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 36px;
        margin: 44px 30px 20px;
    }

    .content {
        background: #FFFFFF;
        margin: 0 auto;
        width: 480px;
        position: relative;
        line-height: 0;
        padding-bottom: 50px;
        textarea {
            width: 480px;
            height: 178px;
            padding: 30px 30px;
            outline: none;
            border: 0 solid #ddd;
            line-height: 40px;
            font-size: 26px;
            letter-spacing: 0;
            resize: none;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder,
        {
            color: #CCCCCC;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
            color: #CCCCCC;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
            color: #CCCCCC;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            color: #CCCCCC;
        }

        .hint {
            position: absolute;
            bottom: 20px;
            right: 20px;
            line-height: 28px;
            font-size: 22px;
            color: #999999;
            letter-spacing: 0;
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 90px;
        overflow: hidden;
        span {
            display: inline-block;
            width: 50%;
            box-sizing: border-box;
            font-size: 30px;
            color: #999999;
            transition: .2s;
        }
        .close {
            float: left;
            color: #0088FF;
        }
        .isOk {
            color: #0088FF;
        }
        .submit {
            float: right;
        }
    }

</style>
