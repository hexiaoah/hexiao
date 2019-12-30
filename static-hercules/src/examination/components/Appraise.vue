<template>
    <div class="appraise-wrapper">
        <div class="section-main border-t border-b">
            <span class="hint">体检结果是否对您有帮助？</span>
            <span class="icon-wrapper useful" :class="radioChange==='GOOD'?' z-active':''" @click="change('GOOD')">
                    <i class="icon"></i> 有用
                </span>

            <span class="icon-wrapper useless" :class="radioChange==='BAD'?' z-active':''" @click="change('BAD')">
                   <i class="icon"></i>  没用
                </span>

        </div>
        <appraise-alert :showAlert="showAlert" @hideAlert="hideAlert"></appraise-alert>
    </div>
</template>

<script>
    import AppraiseAlert from './AppraiseAlert'
    import {feedback} from '../config/api'
    import {fixedBody, looseBody} from 'base/utils/unit.js'
    import errorToast from 'src/ocean/libs/errorToast'

    export default {
        name: 'result',
        props: {
            appraise: {
                request: true
            }
        },
        data() {
            return {
                radioChange: this.appraise,
                showAlert: false,
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            change(val) {
                val=this.radioChange === val?'NONE':val
                let self = this;
                feedback({
                    appraise: val
                }).then((ret) => {
                    self.radioChange =val;
                    if (val === 'BAD') {
                        fixedBody()
                        self.showAlert = true
                    }

                }).catch((result) => {
                    errorToast.show(result.result.message)
                });
            },
            hideAlert() {
                this.showAlert = false
            }
        },
        components: {AppraiseAlert},
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .appraise-wrapper {
        margin: 72px 0 320px 0;
    }

    .section-main {
        font-size: 26px;
        color: #333333;
        letter-spacing: 0.09px;
        text-align: justify;
        line-height: 108px;
        padding: 0 0 0 20px;
    }
    .icon {
        display: inline-block;
        width: 44px;
        height: 108px;
        transition: .2s;
        vertical-align: top;
        margin: auto 20px auto 40px;
    }

    .useful .icon {
        background: url("https://assets.2dfire.com/frontend/da46be40213361a7eb38a79797ffa469.png") no-repeat center,
        url("https://assets.2dfire.com/frontend/bbe1649a9d6b325222b0f2cfae4be9ed.png") no-repeat center;
        background-size: 100%, 0;
        margin-top: -4px;
    }

    .useful.z-active .icon {
        background: url("https://assets.2dfire.com/frontend/bbe1649a9d6b325222b0f2cfae4be9ed.png") no-repeat center;
        background-size: 100%;
    }

    .useless .icon {
        background: url("https://assets.2dfire.com/frontend/6dee962d8a02ab3e1e9dcd4ed9d27c3e.png") no-repeat center,
        url("https://assets.2dfire.com/frontend/4c48cc6e7425c82a8054b924529b7613.png") no-repeat center;
        background-size: 100%, 0;
        margin-top: 4px;
    }

    .useless.z-active .icon {
        background: url("https://assets.2dfire.com/frontend/4c48cc6e7425c82a8054b924529b7613.png") no-repeat center;
        background-size: 100%;
    }


</style>
