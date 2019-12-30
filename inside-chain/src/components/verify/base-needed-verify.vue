<script>
    /**
     -- zeqi@2dfire

     @props:

     @events:
     verify:
        提交时必填验证

     @desc:

     */


    export default {
        name: "baseNeededVerify",
        props: ["value","need"],
        data() {
            return {
//                输入合法
                success: true
            }
        },
        computed: {
            show(){
                let self = this;
                if(self.value === '' && self.need){
                    return true
                }
                else {
                    return false
                }
            }
        }
    };
</script>

<template>
    <div class="needed-verify" v-show="show">
        <p class="warning-text">
            必填项，不能为空
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .needed-verify {
        width: 100%;
        padding: 10px 0 0;
    }
    .warning-text {
        height: 20px;
        line-height: 20px;
        color: #d83f3f;
    }
</style>

