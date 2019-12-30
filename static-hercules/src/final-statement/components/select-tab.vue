<template>
    <div class="select-tab" @click="handleClick" :class="{'selected':!!text,'upward':upward}">
        <span>{{text||defaultText}}</span><i class="icon"></i>
    </div>
</template>

<script>
    export default {
        name: "select-tab",
        props: {
            text: {
                type: String,
                default() {
                    return ''
                }
            },
            upward: {
                type: Boolean,
                default() {
                    return false
                }
            },
            defaultText: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select-tab {
        height: 100%;
        span{
            display: inline-block;
            max-width: 300px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
           vertical-align: middle;
        }
        .icon {
            display: inline-block;
            width: 20px;
            height: 16px;
            vertical-align: middle;
            margin-left: 10px;
            background: url("https://assets.2dfire.com/frontend/6fb5bc03423e9171e4cb179df7cc3ffc.png") no-repeat;
            background-size: 100%;
           
        }
        &.selected {
                color: #0088ff;    
                .icon{
                    background: url("https://assets.2dfire.com/frontend/fc1073a107ab96266fbc651b8d2251cf.png") no-repeat;
                    background-size: 100%;
                }                         
        }
        &.upward{
            .icon {
                background: url("https://assets.2dfire.com/frontend/80d2ca6242bfc2716b9600e853793de6.png") no-repeat; background-size: 100%;
            }
        }
    }
</style>