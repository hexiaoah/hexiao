<script>
    /**
     -- zeqi@2dfire

     @props:
     value: string 要验证的字符串
     max: number 限制的字符长度（默认20）

     @events:
     verify:

     验证长度，在临界值增减的时候触发
         是否是必须

     @desc:
     字符长度检查组件，超过max长度后，显示提示信息
//     不在ASCII码中的字符判断为两个字符，中文占两个字符
       不在ASCII码中的字符判断为两个字符，中文占一个字符

     */


    export default {
        name: "baseLengthVerify",
        props: ["value", "required"],
        data() {
            return {
//                输入合法
                success: true
            }
        },
        computed: {
            isrequired() {
                let self = this;
                if(!!self.required){
                    return true
                }
                return false
            },
            computedByteLen() {
                let self = this;
                console.log('value computedByteLen:',self.value)
                let inputLength =0;
                if(self.value==undefined){

                }else{
                    inputLength = self.value.length
                }

                if(inputLength == 0 && !!self.required){
                    if(self.success){
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '必填项，不能为空'
                }else {
                    if(!self.success){
                        self.$emit('verify', true)
                        self.success = true
                    }
                    return ''
                }
            }
        },
        created(){
            // let self = this;
            // if(!self.required){
            //     this.success = true
            //     // self.$emit('verify', true)
            // }else{
            //     this.success = false
            //     // self.$emit('verify', false)
            // }
        }
    };
</script>

<template>
    <div class="length-verify" v-show="computedByteLen">
        <p class="warning-text">
            {{computedByteLen}}
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .length-verify {
        width: 100%;
        padding: 5px 0;
    }
    .warning-text {
        color: #d83f3f;
    }
</style>

